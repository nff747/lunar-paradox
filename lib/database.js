import pg from 'pg';
import { readFileSync } from 'node:fs';
import { Pool as NeonPool } from '@neondatabase/serverless';

export class DatabaseConfigurationError extends Error {}

// Supabase speaks PostgreSQL over TCP; Neon's WebSocket transport is specific
// to Neon. Never send another provider's credentials to a Neon proxy.
export function databaseOptions(env = process.env, { migration = false } = {}) {
  const value = migration
    ? env.DATABASE_MIGRATION_URL || env.POSTGRES_URL_NON_POOLING || env.DATABASE_URL || env.POSTGRES_URL
    : env.DATABASE_URL || env.POSTGRES_URL;
  if (!value || value === '[SENSITIVE]') throw new DatabaseConfigurationError('The production database is not configured.');
  let url;
  try { url = new URL(value); } catch { throw new DatabaseConfigurationError('The production database configuration is invalid.'); }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || !url.pathname.slice(1)) throw new DatabaseConfigurationError('The production database configuration is invalid.');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (!local && url.searchParams.get('sslmode') === 'disable') throw new DatabaseConfigurationError('Remote database connections require TLS.');
  const driver = /(?:^|\.)neon\.tech$/i.test(url.hostname) ? 'neon' : 'postgres';
  // Verify the server certificate for remote TCP connections. A supplied root
  // certificate remains supported by node-postgres's connection-string parser.
  if (!local && driver === 'postgres') url.searchParams.set('sslmode', 'verify-full');
  let ssl;
  if (!local && /(?:^|\.)supabase\.(?:co|com)$/i.test(url.hostname) && !url.searchParams.has('sslrootcert')) {
    // Supabase supplies its own CA. Remove sslmode from the URL so pg's URL
    // parser cannot override this explicit, hostname-verified TLS configuration.
    url.searchParams.delete('sslmode');
    ssl = { ca: readFileSync(new URL('../database/certs/supabase-prod-ca-2021.crt', import.meta.url), 'utf8'), rejectUnauthorized: true };
  }
  return { driver, config: { connectionString: url.toString(), ...(ssl ? { ssl } : {}), max: 2, idleTimeoutMillis: 5000, connectionTimeoutMillis: 5000, query_timeout: 10000 } };
}

export function createDatabasePool(env = process.env, options) {
  const { driver, config } = databaseOptions(env, options);
  const pool = driver === 'neon' ? new NeonPool(config) : new pg.Pool(config);
  // Idle connection errors must not crash a serverless process or log secrets.
  pool.on('error', error => console.error('Lunar database idle connection error:', error?.code || 'connection_error'));
  return pool;
}
