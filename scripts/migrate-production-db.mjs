import { readFile } from 'node:fs/promises';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) throw new Error('Set DATABASE_URL (or POSTGRES_URL) before running the production migration.');
const pool = new Pool({ connectionString, max: 1 });
try {
  const migration = await readFile(new URL('../database/migrations/001_initial.sql', import.meta.url), 'utf8');
  await pool.query('BEGIN');
  try {
    await pool.query(migration);
    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
  const result = await pool.query('SELECT version FROM lunar_schema_migrations ORDER BY version');
  if (!result.rows.some(row => row.version === 1)) throw new Error('Migration did not register version 1.');
  console.log('Production database migration 1 is applied.');
} finally {
  await pool.end();
}
