import test from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { readFile, readdir } from 'node:fs/promises';
import { cleanTelemetryEvent, operationsRoute } from '../lib/operations.js';
import { recordFunnelStep, recordToolFeedback } from '../offline-platforms/lunar-astrolabe/tools/telemetry-client.js';

test('tool events stay off until opted in and stop after withdrawal', () => {
  const oldStorage = globalThis.localStorage, oldNavigator = globalThis.navigator, oldFetch = globalThis.fetch;
  const values = new Map(); const sent = [];
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: k => values.get(k) ?? null } });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { sendBeacon: (url, body) => { sent.push({ url, body }); return true; } } });
  try {
    recordFunnelStep('pbr-synth', 'view'); recordToolFeedback('pbr-synth', true);
    assert.equal(sent.length, 0);
    values.set('lunar-tool-analytics-v1', 'enabled');
    recordFunnelStep('pbr-synth', 'view'); recordToolFeedback('pbr-synth', true);
    assert.equal(sent.length, 2);
    values.set('lunar-tool-analytics-v1', 'disabled');
    recordFunnelStep('pbr-synth', 'export');
    assert.equal(sent.length, 2);
  } finally {
    for (const [name, value] of [['localStorage', oldStorage], ['navigator', oldNavigator], ['fetch', oldFetch]]) {
      if (value === undefined) delete globalThis[name]; else Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    }
  }
});

test('telemetry fails closed when migration 007 has not been applied', async () => {
  const pg = new PGlite();
  try {
    await pg.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
    const dir = new URL('../database/migrations/', import.meta.url);
    for (const file of (await readdir(dir)).filter(f => f.endsWith('.sql') && !f.startsWith('007_')).sort()) {
      await pg.exec(await readFile(new URL(file, dir), 'utf8'));
    }
    const db = { async query(sql, args) { const result = await pg.query(sql, args); return { ...result, rowCount: result.rows.length || result.affectedRows || 0 }; } };
    let consumed = false;
    for (const [path, method] of [['/telemetry/event', 'POST'], ['/operations/tool-funnels', 'GET']]) {
      await assert.rejects(() => operationsRoute({ db, req: { lunarAdmin: { roles: ['review'] } }, path, method, readBody: async () => { consumed = true; }, rateLimit: async () => {}, content: {} }), error => error.status === 503 && /migration 007/.test(error.message));
    }
    assert.equal(consumed, false);
  } finally { await pg.close(); }
});

test('telemetry validation enforces strict zero-knowledge whitelist', () => {
  assert.equal(cleanTelemetryEvent({ toolId: 'optim-compressor', step: 'view' }).step, 'view');
  assert.equal(cleanTelemetryEvent({ toolId: 'pbr-synth', step: 'complete' }).step, 'complete');
  assert.equal(cleanTelemetryEvent({ type: 'feedback', toolId: 'optim-compressor', helpful: true }).helpful, true);

  // Rejects unapproved fields or arbitrary payloads (preventing PII leakage)
  assert.throws(() => cleanTelemetryEvent({ toolId: 'optim-compressor', step: 'view', filename: 'secret.png' }));
  assert.throws(() => cleanTelemetryEvent({ toolId: 'optim-compressor', step: 'view', userKey: '123' }));
  assert.throws(() => cleanTelemetryEvent({ toolId: 'unknown-tool', step: 'view' }));
  assert.throws(() => cleanTelemetryEvent({ toolId: 'optim-compressor', step: 'invalid_step' }));
  assert.throws(() => cleanTelemetryEvent({ type: 'feedback', toolId: 'optim-compressor', helpful: 'yes' }));
});

test('aggregate telemetry records funnel steps and calculates conversion rates in PostgreSQL', async () => {
  const pg = new PGlite();
  const wrap = target => ({
    async query(sql, args) {
      const result = await target.query(sql, args);
      return { ...result, rowCount: result.rows.length || result.affectedRows || 0 };
    },
    async connect() { return { ...wrap(target), release() {} }; }
  });
  const db = wrap(pg);

  try {
    await pg.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
    const migrationDir = new URL('../database/migrations/', import.meta.url);
    const files = (await readdir(migrationDir)).filter(f => f.endsWith('.sql')).sort();
    for (const file of files) {
      await pg.exec(await readFile(new URL(file, migrationDir), 'utf8'));
    }

    const invokePublic = (body) => operationsRoute({
      db,
      req: { url: '/api/telemetry/event', method: 'POST', socket: { remoteAddress: '127.0.0.1' } },
      path: '/telemetry/event',
      method: 'POST',
      readBody: async () => body,
      rateLimit: async () => {},
      content: {}
    });

    // Ingest simulated funnel events for optim-compressor
    await invokePublic({ toolId: 'optim-compressor', step: 'view' });
    await invokePublic({ toolId: 'optim-compressor', step: 'view' });
    await invokePublic({ toolId: 'optim-compressor', step: 'start' });
    await invokePublic({ toolId: 'optim-compressor', step: 'complete' });
    await invokePublic({ toolId: 'optim-compressor', step: 'export' });
    await invokePublic({ type: 'feedback', toolId: 'optim-compressor', helpful: true });

    // Verify raw counts in database
    const metricsRow = await db.query("SELECT tool_id, step, count FROM lunar_tool_funnel_metrics WHERE tool_id='optim-compressor'");
    assert.equal(metricsRow.rows.length, 4);
    await pg.exec('SET ROLE anon');
    await assert.rejects(() => pg.query('SELECT * FROM lunar_tool_funnel_metrics'), /permission denied/);
    await assert.rejects(() => pg.query('SELECT * FROM lunar_tool_feedback'), /permission denied/);
    await pg.exec('RESET ROLE');

    // Query admin funnels report with admin auth
    const adminReq = {
      url: '/api/operations/tool-funnels',
      method: 'GET',
      lunarAdmin: { principal: 'admin@lunarparadox.com', roles: ['review'] }
    };
    const report = await operationsRoute({
      db,
      req: adminReq,
      path: '/operations/tool-funnels',
      method: 'GET',
      rateLimit: async () => {},
      content: {}
    });

    assert.ok(Array.isArray(report.funnels));
    const optimFunnel = report.funnels.find(f => f.toolId === 'optim-compressor');
    assert.ok(optimFunnel);
    assert.equal(optimFunnel.views, 2);
    assert.equal(optimFunnel.starts, 1);
    assert.equal(optimFunnel.completions, 1);
    assert.equal(optimFunnel.exports, 1);
    assert.equal(optimFunnel.startRate, 0.5); // 1 / 2
    assert.equal(optimFunnel.completionRate, 1.0); // 1 / 1
    assert.equal(optimFunnel.exportRate, 1.0); // 1 / 1
    assert.equal(optimFunnel.feedback.helpful, 1);
    assert.equal(optimFunnel.satisfactionRate, 1.0);

    // Verify unauthenticated / non-review role rejection
    const unauthReq = {
      url: '/api/operations/tool-funnels',
      method: 'GET',
      lunarAdmin: { principal: 'guest@lunarparadox.com', roles: [] }
    };
    await assert.rejects(() => operationsRoute({
      db,
      req: unauthReq,
      path: '/operations/tool-funnels',
      method: 'GET',
      rateLimit: async () => {},
      content: {}
    }), /does not permit this action/);

    // Exploit verification: unsupported HTTP methods on public and operational routes fail closed (405)
    await assert.rejects(() => operationsRoute({
      db,
      req: { url: '/api/telemetry/event', method: 'GET' },
      path: '/telemetry/event',
      method: 'GET',
      rateLimit: async () => {},
      content: {}
    }), err => err.status === 405);

    await assert.rejects(() => operationsRoute({
      db,
      req: { url: '/api/product-reviews', method: 'DELETE' },
      path: '/product-reviews',
      method: 'DELETE',
      rateLimit: async () => {},
      content: {}
    }), err => err.status === 405);

    await assert.rejects(() => operationsRoute({
      db,
      req: adminReq,
      path: '/operations/tool-funnels',
      method: 'POST',
      readBody: async () => ({}),
      rateLimit: async () => {},
      content: {}
    }), err => err.status === 405);

    // Exploit verification: unknown operations subpath fails closed with 404
    await assert.rejects(() => operationsRoute({
      db,
      req: adminReq,
      path: '/operations/non-existent-subpath',
      method: 'GET',
      rateLimit: async () => {},
      content: {}
    }), err => err.status === 404);


  } finally {
    await pg.close();
  }
});
