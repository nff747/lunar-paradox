import {operationsRoute,OperationsError} from '../lib/operations.js';
import {AdminAuthError,adminSession,adminRoute} from '../lib/admin-auth.js';
import {clientAddress} from '../lib/request-security.js';
import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { createDatabasePool, DatabaseConfigurationError } from '../lib/database.js';
import {
  cleanApplication, cleanApplicationCredentials, cleanBrief, cleanContent,
  cleanEstimateSelection, cleanPricing, InputError,
} from '../lib/production-validation.js';
import { CANONICAL_CONTENT } from '../lib/canonical-content.js';

export const config = { api: { bodyParser: false } };

const MAX_BODY = 262144;
const globalKey = Symbol.for('lunar.paradox.pg.pool');

class ApiError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function pool() {
  if (!globalThis[globalKey]) {
    try { globalThis[globalKey] = createDatabasePool(); }
    catch (error) {
      if (error instanceof DatabaseConfigurationError) throw new ApiError(503, error.message);
      throw error;
    }
  }
  return globalThis[globalKey];
}

async function assertSchema(db) {
  try {
    const result = await db.query('SELECT version FROM lunar_schema_migrations WHERE version = 5');
    if (!result.rowCount) throw new ApiError(503, 'The production database migration has not been applied.');
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error?.code === '42P01') throw new ApiError(503, 'The production database migration has not been applied.');
    throw error;
  }
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) throw new ApiError(415, 'Use application/json.');
  const stated = Number(req.headers['content-length'] || 0);
  if (stated > MAX_BODY) throw new ApiError(413, 'Request body is too large.');
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > MAX_BODY) throw new ApiError(413, 'Request body is too large.');
    chunks.push(chunk);
  }
  if (!length) throw new ApiError(400, 'A JSON body is required.');
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new ApiError(400, 'Invalid JSON body.'); }
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto']?.split(',')[0]?.trim() || 'https';
  let parsed;
  try { parsed = new URL(origin); } catch { throw new ApiError(403, 'Cross-origin requests are not allowed.'); }
  if (parsed.host !== host || parsed.protocol !== `${protocol}:`) throw new ApiError(403, 'Cross-origin requests are not allowed.');
}

function ownerAuthorized(req) {
  const expected = process.env.LUNAR_OWNER_KEY || '';
  const supplied = req.headers['x-lunar-owner'] || '';
  if (expected.length < 32) throw new ApiError(503, 'Production owner access is not configured.');
  const a = Buffer.from(expected);
  const b = Buffer.from(typeof supplied === 'string' ? supplied : '');
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new ApiError(401, 'Owner key is incorrect.');
}

function addressHash(req) {
  const secret = process.env.LUNAR_RATE_LIMIT_SECRET || '';
  if (secret.length < 32) throw new ApiError(503, 'Production request protection is not configured.');
  const forwarded = clientAddress(req);
  return createHmac('sha256', secret).update(String(forwarded)).digest('hex');
}

async function rateLimit(db, req, route, limit, windowMs, identity) {
  const subject = identity ? createHmac('sha256',process.env.LUNAR_RATE_LIMIT_SECRET).update(identity).digest('hex') : addressHash(req);
  const { rows } = await db.query(
    `INSERT INTO lunar_api_limits (route, subject_hash, window_started, hits)
     VALUES ($1, $2, now(), 1)
     ON CONFLICT (route, subject_hash) DO UPDATE SET
       window_started = CASE WHEN lunar_api_limits.window_started <= now() - ($3 * interval '1 millisecond') THEN now() ELSE lunar_api_limits.window_started END,
       hits = CASE WHEN lunar_api_limits.window_started <= now() - ($3 * interval '1 millisecond') THEN 1 ELSE lunar_api_limits.hits + 1 END
     RETURNING hits`, [route, subject, windowMs]);
  if (rows[0].hits > limit) throw new ApiError(429, 'Too many requests. Please wait and try again.');
  if (Math.random() < 0.005) await db.query("DELETE FROM lunar_api_limits WHERE window_started < now() - interval '2 days'");
}

const iso = value => new Date(value).toISOString();
const json = value => JSON.stringify(value);
function assertId(value) {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) throw new ApiError(400, 'Invalid record ID.');
  return value;
}

async function applicationAccess(db, credentials) {
  const value = cleanApplicationCredentials(credentials);
  const { rows } = await db.query('SELECT id, created_at, status, access_hash, document, note FROM lunar_applications WHERE id = $1', [value.id]);
  const row = rows[0];
  const actual = createHash('sha256').update(value.accessKey).digest();
  const expected = row ? Buffer.from(row.access_hash, 'hex') : Buffer.alloc(actual.length);
  if (!row || actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new ApiError(403, 'Application ID or access key is incorrect.');
  return { id: row.id, created: iso(row.created_at), status: row.status, ...row.document, note: row.note };
}

async function createEstimate(db, value) {
  const credentials = cleanApplicationCredentials({ id: value.id, accessKey: value.accessKey });
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT id, status, access_hash FROM lunar_applications WHERE id = $1 FOR UPDATE', [credentials.id]);
    const app = rows[0];
    const actual = createHash('sha256').update(credentials.accessKey).digest();
    const expected = app ? Buffer.from(app.access_hash, 'hex') : Buffer.alloc(actual.length);
    if (!app || actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new ApiError(403, 'Application ID or access key is incorrect.');
    if (app.status !== 'accepted') throw new ApiError(403, 'An accepted application is required before estimating.');
    const rate = await client.query('SELECT document FROM lunar_pricing WHERE singleton = true FOR SHARE');
    const pricing = rate.rows[0]?.document || { revision: 0, currency: 'GBP', items: [] };
    const lines = cleanEstimateSelection(value.selection, pricing);
    const now = new Date().toISOString();
    const result = {
      id: randomUUID(), created: now, applicationId: app.id, pricingRevision: pricing.revision,
      currency: pricing.currency, lines,
      low: lines.reduce((sum, line) => sum + line.lowTotal, 0),
      high: lines.reduce((sum, line) => sum + line.highTotal, 0),
      terms: 'Indicative estimate only. Scope, availability, third-party costs and applicable taxes require a final written quote. No booking or payment is made.',
    };
    await client.query('INSERT INTO lunar_estimates (id, application_id, document) VALUES ($1, $2, $3::jsonb)', [result.id, result.applicationId, json(result)]);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch {}
    throw error;
  } finally { client.release(); }
}

async function handle(req, res) {
  // Vercel's raw Node runtime does not always populate catch-all query params.
  // Parse the actual URL as a fallback; validation below still rejects encoded
  // separators and malformed escapes before touching the database.
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  const rawPath = req.query?.path ?? req.query?.['...path'] ?? (pathname.startsWith('/api/') ? pathname.slice(5) : '');
  const segments = Array.isArray(rawPath) ? rawPath : typeof rawPath === 'string' ? rawPath.split('/') : [];
  let decodedSegments;
  try { decodedSegments = segments.map(decodeURIComponent); }
  catch { throw new ApiError(400, 'Invalid API path.'); }
  if (decodedSegments.some(segment => segment.includes('/') || segment.includes('\\') || segment === '.' || segment === '..' || segment.includes('\0'))) throw new ApiError(400, 'Invalid API path.');
  const path = `/${decodedSegments.join('/')}`.replace(/\/+$/, '') || '/';
  const method = req.method || 'GET';
  if (path === '/health' && method === 'GET') {
    const db = pool();
    await assertSchema(db);
    await db.query('SELECT 1');
    if(process.env.VERCEL==='1'){if(!(process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL)||!(process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))throw new ApiError(503,'Administrator identity provider is not configured.');}
    else if ((process.env.LUNAR_OWNER_KEY || '').length < 32) throw new ApiError(503, 'Local owner access is not configured.');
    if ((process.env.LUNAR_RATE_LIMIT_SECRET || '').length < 32) throw new ApiError(503, 'Production request protection is not configured.');
    return send(res, 200, { status: 'ready', storage: 'postgres' });
  }
  sameOrigin(req);
  const db = pool();
  await assertSchema(db);

  if(path.startsWith('/admin/')){
    if(['/admin/session','/admin/logout'].includes(path)){let who;try{who=await adminSession(db,req);}catch(error){if(path!=='/admin/logout'){await rateLimit(db,req,'owner-failures',30,60000);throw error;}}if(who)await rateLimit(db,req,'admin-session',120,60000,'admin:'+who.principal);}
    else await rateLimit(db,req,'admin-auth',20,10*60*1000);
    const result=await adminRoute(path,req,res,db,method==='POST'?await readBody(req):undefined);return send(res,200,result);
  }

  if (path === '/content' && method === 'GET') {
    const { rows } = await db.query('SELECT document FROM lunar_company_content WHERE singleton = true');
    const content = rows[0]?.document;
    const fallback = CANONICAL_CONTENT;
    const experiments = (content?.experiments?.length ? content.experiments : fallback.experiments).filter(item => item.status === 'published');
    const products = (content?.products?.length ? content.products : fallback.products).filter(item => item.status === 'published');
    return send(res, 200, {
      revision: content?.revision ?? fallback.revision,
      contactEmail: content?.contactEmail ?? fallback.contactEmail,
      experiments,
      products
    });
  }

  const protectedRoute = path.startsWith('/operations') ||
    (['/applications', '/pricing', '/publisher'].includes(path) && ['GET', 'PUT'].includes(method)) ||
    (path === '/briefs' && method === 'GET') ||
    ((path.startsWith('/applications/') || path.startsWith('/briefs/')) && method === 'DELETE');
  if (protectedRoute) {
    try {
      try{req.lunarAdmin=await adminSession(db,req);}
      catch(error){if(error.status!==401||req.headers.cookie?.includes('lunar-admin=')||(process.env.VERCEL==='1'&&process.env.LUNAR_ALLOW_LEGACY_OWNER!=='true'))throw error;ownerAuthorized(req);req.lunarAdmin={principal:'local-owner',roles:['review','pricing','publish','delete']};}
    }
    catch(error){await rateLimit(db, req, 'owner-failures', 30, 60 * 1000);throw error;}
    const role=method==='DELETE'?'delete':path==='/pricing'?'pricing':path==='/publisher'?'publish':'review';
    if(!req.lunarAdmin.roles.includes(role))throw new ApiError(403,'Your administrator role does not permit this action.');
    await rateLimit(db, req, 'owner-api', 120, 60 * 1000, 'owner:'+req.lunarAdmin.principal);
    await db.query('INSERT INTO lunar_admin_audit(principal,action,target,outcome) VALUES($1,$2,$3,$4)',[req.lunarAdmin.principal,method+' '+path.split('/').slice(0,2).join('/'),path.split('/')[2]||'','attempt']);
  }

  if(path.startsWith('/operations')||path==='/product-reviews'){const result=await operationsRoute({db,req,path,method,readBody,rateLimit,content:CANONICAL_CONTENT});return send(res,200,result);}

  if ((path === '/applications' || path === '/pricing') && method === 'GET') {
    if (path === '/pricing') {
      const { rows } = await db.query('SELECT document FROM lunar_pricing WHERE singleton = true');
      return send(res, 200, rows[0]?.document || { revision: 0, currency: 'GBP', items: [] });
    }
    const [apps, estimates] = await Promise.all([
      db.query('SELECT id, created_at, status, document, note FROM lunar_applications ORDER BY created_at DESC LIMIT 200'),
      db.query('SELECT document FROM lunar_estimates ORDER BY created_at DESC LIMIT 200'),
    ]);
    return send(res, 200, { applications: apps.rows.map(row => ({ id: row.id, created: iso(row.created_at), status: row.status, ...row.document, note: row.note })), estimates: estimates.rows.map(row => row.document) });
  }

  if (path === '/publisher' && method === 'GET') {
    const { rows } = await db.query('SELECT document FROM lunar_company_content WHERE singleton = true');
    return send(res, 200, rows[0]?.document || CANONICAL_CONTENT);
  }

  if (path === '/briefs' && method === 'GET') {
    const { rows } = await db.query('SELECT id, created_at, document FROM lunar_briefs ORDER BY created_at DESC LIMIT 100');
    return send(res, 200, { briefs: rows.map(row => ({ id: row.id, created: iso(row.created_at), ...row.document })) });
  }

  if (path === '/apply' && method === 'POST') {
    await rateLimit(db, req, 'apply', 5, 10 * 60 * 1000);
    await rateLimit(db,req,'apply-global',100,10*60*1000,'global-submission-budget');
    const application = cleanApplication(await readBody(req));
    const token = req.headers['idempotency-key'];
    if (token !== undefined && (typeof token !== 'string' || !/^[a-zA-Z0-9_-]{32,128}$/.test(token))) throw new InputError('Invalid submission token');
    const requestHash = token ? createHash('sha256').update(token).digest('hex') : null;
    const accessKey = token ? createHmac('sha256', process.env.LUNAR_RATE_LIMIT_SECRET).update('application-access-v1:'+token).digest('base64url') : randomBytes(32).toString('base64url');
    const accessHash = createHash('sha256').update(accessKey).digest('hex');
    const inserted = await db.query("INSERT INTO lunar_applications (id, status, access_hash, document, request_hash) VALUES ($1, 'pending', $2, $3::jsonb, $4) ON CONFLICT (request_hash) DO NOTHING RETURNING id,created_at,status", [randomUUID(), accessHash, json(application), requestHash]);
    let row = inserted.rows[0];
    if (!row) {
      const previous = await db.query('SELECT id,created_at,status,access_hash,document FROM lunar_applications WHERE request_hash=$1', [requestHash]);
      row = previous.rows[0];
      if (!row || row.access_hash !== accessHash || !Object.keys(application).every(key => row.document[key] === application[key])) throw new ApiError(409, 'This submission token was already used. Check your existing application before submitting a different brief.');
    }
    return send(res, 201, { id: row.id, accessKey, status: row.status, created: iso(row.created_at) });
  }

  if (path === '/application-access' && method === 'POST') {
    await rateLimit(db, req, 'application-access', 15, 10 * 60 * 1000);
    const application = await applicationAccess(db, await readBody(req));
    if (application.status === 'accepted') {
      const { rows } = await db.query('SELECT document FROM lunar_pricing WHERE singleton = true');
      return send(res, 200, { application, pricing: rows[0]?.document || { revision: 0, currency: 'GBP', items: [] } });
    }
    return send(res, 200, { application });
  }

  if (path === '/estimate' && method === 'POST') {
    await rateLimit(db, req, 'estimate', 20, 10 * 60 * 1000);
    return send(res, 201, await createEstimate(db, await readBody(req)));
  }

  if (path === '/briefs' && method === 'POST') {
    await rateLimit(db, req, 'briefs', 3, 10 * 60 * 1000);
    const brief = cleanBrief(await readBody(req));
    const id = randomUUID();
    const { rows } = await db.query('INSERT INTO lunar_briefs (id, document) VALUES ($1, $2::jsonb) RETURNING created_at', [id, json(brief)]);
    return send(res, 201, { id, created: iso(rows[0].created_at) });
  }

  if (path === '/applications' && method === 'PUT') {
    const value = await readBody(req);
    if (!value || Object.keys(value).sort().join(',') !== 'id,note,status' || !['pending', 'accepted', 'declined'].includes(value.status) || typeof value.note !== 'string' || value.note.length > 1000) throw new InputError('Invalid application decision');
    assertId(value.id);
    const { rowCount } = await db.query("WITH changed AS (UPDATE lunar_applications SET status=$2,note=$3 WHERE id=$1 RETURNING id) INSERT INTO lunar_admin_audit(principal,action,target,outcome) SELECT $4,'application.review',id::text,'success' FROM changed RETURNING id", [value.id,value.status,value.note.trim(),req.lunarAdmin.principal]);
    if (!rowCount) throw new ApiError(404, 'Application not found.');
    return send(res, 200, { saved: true });
  }

  if (path === '/pricing' && method === 'PUT') {
    const value = cleanPricing(await readBody(req));
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(173531679, 1)');
      const current = await client.query('SELECT document FROM lunar_pricing WHERE singleton = true FOR UPDATE');
      const revision = current.rows[0]?.document.revision || 0;
      if (value.revision !== revision) throw new ApiError(409, 'Pricing changed. Reload before saving.');
      const result = { ...value, revision: revision + 1 };
      await client.query('INSERT INTO lunar_pricing (singleton, document) VALUES (true, $1::jsonb) ON CONFLICT (singleton) DO UPDATE SET document = EXCLUDED.document', [json(result)]);
      await client.query("INSERT INTO lunar_admin_audit(principal,action,outcome) VALUES($1,$2,'success')",[req.lunarAdmin.principal,method+' '+path]);
      await client.query('COMMIT');
      return send(res, 200, result);
    } catch (error) { try { await client.query('ROLLBACK'); } catch {} throw error; }
    finally { client.release(); }
  }

  if (path === '/publisher' && method === 'PUT') {
    const value = cleanContent(await readBody(req));
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(173531679, 2)');
      const current = await client.query('SELECT revision FROM lunar_company_content WHERE singleton = true FOR UPDATE');
      const revision = current.rows[0]?.revision || 0;
      if (value.revision !== revision) throw new ApiError(409, 'Publisher changed in another tab. Reload before saving.');
      const result = { ...value, revision: revision + 1 };
      await client.query('INSERT INTO lunar_company_content (singleton, revision, document) VALUES (true, $1, $2::jsonb) ON CONFLICT (singleton) DO UPDATE SET revision = EXCLUDED.revision, document = EXCLUDED.document', [result.revision, json(result)]);
      await client.query("INSERT INTO lunar_admin_audit(principal,action,outcome) VALUES($1,$2,'success')",[req.lunarAdmin.principal,method+' '+path]);
      await client.query('COMMIT');
      return send(res, 200, result);
    } catch (error) { try { await client.query('ROLLBACK'); } catch {} throw error; }
    finally { client.release(); }
  }

  if (/^\/applications\/[^/]+$/.test(path) && method === 'DELETE') {
    const id = assertId(path.split('/')[2]);
    const { rowCount } = await db.query("WITH changed AS (DELETE FROM lunar_applications WHERE id=$1 RETURNING id) INSERT INTO lunar_admin_audit(principal,action,target,outcome) SELECT $2,'application.delete',id::text,'success' FROM changed RETURNING id", [id,req.lunarAdmin.principal]);
    if (!rowCount) throw new ApiError(404, 'Application not found.');
    return send(res, 200, { deleted: true });
  }

  if (/^\/briefs\/[^/]+$/.test(path) && method === 'DELETE') {
    const id = assertId(path.split('/')[2]);
    const { rowCount } = await db.query("WITH changed AS (DELETE FROM lunar_briefs WHERE id=$1 RETURNING id) INSERT INTO lunar_admin_audit(principal,action,target,outcome) SELECT $2,'brief.delete',id::text,'success' FROM changed RETURNING id", [id,req.lunarAdmin.principal]);
    if (!rowCount) throw new ApiError(404, 'Brief not found.');
    return send(res, 200, { deleted: true });
  }

  const known = ['/health', '/content', '/applications', '/pricing', '/publisher', '/briefs', '/apply', '/application-access', '/estimate'];
  if (known.includes(path)) throw new ApiError(405, 'Method not allowed.');
  throw new ApiError(404, 'Unknown API route.');
}

export default async function handler(req, res) {
  try {
    await handle(req, res);
  } catch (error) {
    if (res.writableEnded) return;
    if (error instanceof InputError) return send(res, 400, { error: error.message });
    if (error instanceof ApiError || error instanceof AdminAuthError || error instanceof OperationsError) return send(res, error.status, { error: error.message });
    if(error?.code==='23503')return send(res,409,{error:'This record is linked to retained business records and cannot be deleted.'});
    console.error('Lunar API request failed:', error?.code || error?.name || 'unknown');
    return send(res, 503, { error: 'The service is temporarily unavailable. Please try again later.' });
  }
}
