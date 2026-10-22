import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import {
  cleanApplication, cleanApplicationCredentials, cleanBrief, cleanContent,
  cleanEstimateSelection, cleanPricing, InputError,
} from '../lib/production-validation.js';

const require = createRequire(import.meta.url);

test('hosted application validation accepts only bounded required fields', () => {
  const valid = { name: 'Test', email: 'test@example.test', type: 'commission', goal: 'Build a useful platform', timing: '', budget: '' };
  assert.deepEqual(cleanApplication(valid), valid);
  assert.throws(() => cleanApplication({ ...valid, extra: 'ignored?' }), InputError);
  assert.throws(() => cleanApplication({ ...valid, email: 'invalid' }), InputError);
  assert.throws(() => cleanApplication({ ...valid, goal: '' }), InputError);
  assert.deepEqual(cleanBrief(valid), valid);
});

test('public content validation rejects unsafe links, duplicate IDs and unfinished published records', () => {
  const empty = { revision: 0, experiments: [], products: [], contactEmail: '' };
  assert.deepEqual(cleanContent(empty), empty);
  const record = { id: 'lab-1', title: 'Experiment', summary: 'Summary', body: 'Details', category: '', image: '', actionUrl: '', actionLabel: '', stage: '', status: 'published' };
  assert.deepEqual(cleanContent({ ...empty, experiments: [record] }).experiments, [record]);
  assert.throws(() => cleanContent({ ...empty, experiments: [{ ...record, image: 'javascript:alert(1)' }] }), InputError);
  assert.throws(() => cleanContent({ ...empty, experiments: [{ ...record, title: '' }] }), InputError);
  assert.throws(() => cleanContent({ ...empty, experiments: [record, record] }), InputError);
});

test('pricing and estimate selections can use only configured server-owned ranges', () => {
  const pricing = cleanPricing({ revision: 1, currency: 'GBP', items: [{ id: 'build', label: 'Build', unit: 'sprint', low: 350000, high: 1500000 }] });
  assert.deepEqual(cleanEstimateSelection([{ id: 'build', quantity: 2 }], pricing), [{ ...pricing.items[0], quantity: 2, lowTotal: 700000, highTotal: 3000000 }]);
  assert.throws(() => cleanEstimateSelection([{ id: 'invented', quantity: 2 }], pricing), InputError);
  assert.throws(() => cleanEstimateSelection([{ id: 'build', quantity: 0 }], pricing), InputError);
  assert.throws(() => cleanPricing({ revision: 1, currency: 'GBP', items: [{ id: 'build', label: 'Build', unit: 'sprint', low: 1500000, high: 350000 }] }), InputError);
});

test('applicant access credentials must be a UUID and high-entropy key', () => {
  const credentials = { id: '110e8400-e29b-41d4-a716-446655440000', accessKey: 'a'.repeat(43) };
  assert.deepEqual(cleanApplicationCredentials(credentials), credentials);
  assert.throws(() => cleanApplicationCredentials({ id: 'not-a-uuid', accessKey: 'a'.repeat(43) }), InputError);
  assert.throws(() => cleanApplicationCredentials({ id: 'zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz', accessKey: 'a'.repeat(43) }), InputError);
  assert.throws(() => cleanApplicationCredentials({ id: '00000000-0000-0000-0000-000000000000', accessKey: 'a'.repeat(43) }), InputError);
  assert.throws(() => cleanApplicationCredentials({ id: credentials.id, accessKey: 'weak' }), InputError);
});

test('health fails closed with a clear setup status when no hosted database is configured', async () => {
  const beforeDatabase = process.env.DATABASE_URL;
  const beforePostgres = process.env.POSTGRES_URL;
  process.env.DATABASE_URL = '';
  process.env.POSTGRES_URL = '';
  try {
    const { default: handler } = await import('../api/[...path].js');
    const headers = {};
    const response = { setHeader: (key, value) => { headers[key] = value; }, end: value => { response.body = JSON.parse(value); response.writableEnded = true; } };
    await handler({ method: 'GET', query: { path: ['health'] }, headers: {}, socket: {} }, response);
    assert.equal(response.statusCode, 503);
    assert.match(response.body.error, /database is not configured/i);
    assert.equal(headers['Cache-Control'], 'no-store, max-age=0');
  } finally {
    if (beforeDatabase === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = beforeDatabase;
    if (beforePostgres === undefined) delete process.env.POSTGRES_URL; else process.env.POSTGRES_URL = beforePostgres;
  }
});

test('malformed encoded API paths return a client error instead of a service failure', async () => {
  const { default: handler } = await import('../api/[...path].js');
  const response = { setHeader() {}, end(value) { this.body = JSON.parse(value); this.writableEnded = true; } };
  await handler({ method: 'GET', query: { path: ['applications%2F123'] }, headers: {}, socket: {} }, response);
  assert.equal(response.statusCode, 400);
  assert.match(response.body.error, /invalid api path/i);
});
