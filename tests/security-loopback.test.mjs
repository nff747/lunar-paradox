import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { readFile, readdir } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { createHash, randomBytes } from 'node:crypto';

test('synthetic loopback probes enforce origin, access and request limits', async () => {
  const pg = new PGlite();
  const key = Symbol.for('lunar.paradox.pg.pool');
  const previousPool = globalThis[key];
  const previous = Object.fromEntries(['VERCEL', 'LUNAR_OWNER_KEY', 'LUNAR_RATE_LIMIT_SECRET'].map(k => [k, process.env[k]]));
  let server;
  try {
    await pg.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
    for (const file of (await readdir(new URL('../database/migrations/', import.meta.url))).filter(f => f.endsWith('.sql')).sort()) {
      await pg.exec(await readFile(new URL('../database/migrations/' + file, import.meta.url), 'utf8'));
    }
    const wrap = target => ({
      async query(sql, args) { const result = await target.query(sql, args); return { ...result, rowCount: result.rows.length || result.affectedRows || 0 }; },
      async connect() { return { ...wrap(target), release() {} }; },
    });
    globalThis[key] = wrap(pg);
    delete process.env.VERCEL;
    process.env.LUNAR_OWNER_KEY = 'synthetic-owner-key-never-production-123456';
    process.env.LUNAR_RATE_LIMIT_SECRET = 'synthetic-rate-secret-never-production-123456';
    const { default: handler } = await import('../api/[...path].js');
    server = createServer((req, res) => handler(req, res));
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const base = `http://127.0.0.1:${server.address().port}`;
    const fixture = { name: 'Synthetic tester', email: 'tester@example.test', type: 'commission', goal: 'Synthetic security test', timing: '', budget: '' };
    const call = (path, options = {}) => fetch(base + '/api/' + path, options);
    const post = (value, headers = {}) => ({ method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(value) });

    for (const route of ['applications', 'briefs', 'pricing', 'publisher', 'operations']) {
      assert.equal((await call(route)).status, 401, route);
    }
    assert.equal((await call('apply', post(fixture, { Origin: 'https://attacker.example' }))).status, 403);
    assert.equal((await call('apply', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' })).status, 415);
    assert.equal((await call('apply', post({ ...fixture, extra: 'unexpected' }))).status, 400);
    const created = await call('apply', post(fixture));
    assert.equal(created.status, 201);
    const { id, accessKey } = await created.json();
    assert.equal((await call('application-access', post({ id, accessKey: 'x'.repeat(43) }))).status, 403);
    assert.equal((await call('estimate', post({ id, accessKey, selection: [] }))).status, 403);
    const stored = await pg.query('SELECT access_hash FROM lunar_applications WHERE id = $1', [id]);
    assert.notEqual(stored.rows[0].access_hash, accessKey);
    assert.equal((await call('apply', post({ ...fixture, goal: 'x'.repeat(270000) }))).status, 413);
    const attempts = [];
    for (let i = 0; i < 7; i++) {
      attempts.push((await call('apply', post(fixture, { 'x-real-ip': `192.0.2.${i + 1}`, 'x-forwarded-for': `192.0.2.${i + 1}` }))).status);
    }
    assert.equal(attempts.at(-1), 429, 'caller-controlled IP headers must not bypass the local rate limit');

    const token = randomBytes(32).toString('base64url');
    const csrf = randomBytes(32).toString('base64url');
    const hash = value => createHash('sha256').update(value).digest('hex');
    await pg.query("INSERT INTO lunar_admin_sessions(session_hash, csrf_hash, principal, expires_at) VALUES ($1, $2, $3, now() + interval '20 minutes')", [hash(token), hash(csrf), 'hello@lunarparadox.com']);
    const cookie = `lunar-admin=${token}`;
    assert.equal((await call('applications', { headers: { Cookie: cookie } })).status, 200);
    const pricing = { revision: 0, currency: 'GBP', items: [] };
    assert.equal((await call('pricing', { ...post(pricing, { Cookie: cookie }), method: 'PUT' })).status, 403);
    assert.equal((await call('pricing', { ...post(pricing, { Cookie: cookie, 'X-Lunar-Csrf': csrf }), method: 'PUT' })).status, 200);
    assert.equal((await call('admin/logout', post({}, { Cookie: cookie, 'X-Lunar-Csrf': csrf }))).status, 200);
    assert.equal((await call('applications', { headers: { Cookie: cookie } })).status, 401);

    await pg.query('DELETE FROM lunar_api_limits');
    const burst = await Promise.all(Array.from({ length: 32 }, (_, i) =>
      call('apply', post(fixture, { 'x-forwarded-for': `192.0.2.${i + 1}` }))
    ));
    const statuses = burst.map(response => response.status);
    console.log('Loopback burst: 32 requests; HTTP 201:', statuses.filter(status => status === 201).length, '; HTTP 429:', statuses.filter(status => status === 429).length);
    assert.equal(statuses.filter(status => status === 201).length, 5);
    assert.equal(statuses.filter(status => status === 429).length, 27);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    if (previousPool === undefined) delete globalThis[key]; else globalThis[key] = previousPool;
    for (const [name, value] of Object.entries(previous)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
    await pg.close();
  }
});
