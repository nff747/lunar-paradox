import { readFile, readdir } from 'node:fs/promises';
import { createDatabasePool } from '../lib/database.js';
import { prepareLegacyDatabase, importLegacyDatabase } from '../lib/legacy-database.js';

const pool = createDatabasePool(process.env, { migration: true });
let client;
try {
  client = await pool.connect();
  await client.query('BEGIN');
  try {
    // Pin the transaction to one connection, including on pooled providers.
    await client.query('SELECT pg_advisory_xact_lock(173531679, 0)');
    await prepareLegacyDatabase(client);
    const folder = new URL('../database/migrations/', import.meta.url);
    const files = (await readdir(folder)).filter(name => /^\d+_[\w-]+\.sql$/.test(name)).sort();
    for (const filename of files) {
      if (filename.startsWith('003_')) await importLegacyDatabase(client);
      await client.query(await readFile(new URL(filename, folder), 'utf8'));
    }
    const { rows } = await client.query('SELECT version FROM lunar_schema_migrations ORDER BY version');
    for (const filename of files) if (!rows.some(row => row.version === Number(filename.split('_')[0]))) throw new Error('Migration version was not registered.');
    await client.query('COMMIT');
    console.log('Database migrations applied and verified:', rows.map(row => row.version).join(', '));
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
} catch (error) {
  console.error('Database migration failed:', error?.code || error?.name || 'unknown');
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
