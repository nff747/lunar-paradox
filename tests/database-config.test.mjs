import test from 'node:test';
import assert from 'node:assert/strict';
import {databaseOptions, DatabaseConfigurationError} from '../lib/database.js';

test('Supabase uses verified TLS TCP while Neon retains its own transport',()=>{
  const supabase=databaseOptions({POSTGRES_URL:'postgresql://user:password@aws-0.eu-west-2.pooler.supabase.com:6543/postgres?sslmode=require'});
  assert.equal(supabase.driver,'postgres');
  assert.equal(supabase.config.ssl.rejectUnauthorized,true);
  assert.match(supabase.config.ssl.ca,/BEGIN CERTIFICATE/);
  assert.equal(new URL(supabase.config.connectionString).searchParams.get('sslmode'),null);
  assert.equal(databaseOptions({DATABASE_URL:'postgres://user:password@ep-test.neon.tech/db'}).driver,'neon');
  assert.equal(databaseOptions({DATABASE_URL:'postgres://user:password@neon.tech.attacker.test/db'}).driver,'postgres');
});
test('migrations prefer direct URLs without changing runtime connection selection',()=>{
  const env={DATABASE_URL:'postgres://u:p@pool.test/app',POSTGRES_URL_NON_POOLING:'postgres://u:p@direct.test/app'};
  assert.equal(new URL(databaseOptions(env).config.connectionString).hostname,'pool.test');
  assert.equal(new URL(databaseOptions(env,{migration:true}).config.connectionString).hostname,'direct.test');
});
test('redacted, malformed and insecure remote connection strings fail without exposing credentials',()=>{
  for(const value of ['', '[SENSITIVE]', 'http://user:secret@example.test/db','postgres://u:secret@db.test/db?sslmode=disable']){
    assert.throws(()=>databaseOptions({DATABASE_URL:value}),error=>error instanceof DatabaseConfigurationError&&!error.message.includes('secret'));
  }
  assert.equal(new URL(databaseOptions({DATABASE_URL:'postgres://u:p@127.0.0.1:5432/test'}).config.connectionString).hostname,'127.0.0.1');
});

test('legacy browser Supabase bridge does not expose shared private tables or URL access keys', async()=>{
  const {readFile}=await import('node:fs/promises');
  for(const name of ['supabase-client.js',...['syzygy','gravity','astrolabe'].map(scene=>`offline-platforms/lunar-${scene}/supabase-client.js`)]){
    const source=await readFile(new URL('../'+name,import.meta.url),'utf8');
    assert(!source.includes('/rest/v1/'));
    assert(!source.includes('access_key=eq.'));
    assert.match(source,/LunarSupabase = null/);
  }
});
