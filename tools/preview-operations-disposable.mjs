// Synthetic loopback validation only. Nothing here connects to the user's database.
import {PGlite} from '@electric-sql/pglite';import {readdir,readFile} from 'node:fs/promises';
const pg=new PGlite();for(const file of (await readdir(new URL('../database/migrations/',import.meta.url))).filter(f=>f.endsWith('.sql')).sort())await pg.exec(await readFile(new URL('../database/migrations/'+file,import.meta.url),'utf8'));
const query=async(sql,args)=>{const result=await pg.query(sql,args);return{...result,rowCount:result.rows.length||result.affectedRows||0};};const db={query,connect:async()=>({query,release(){}})};
globalThis[Symbol.for('lunar.paradox.pg.pool')]=db;
process.env.LUNAR_OWNER_KEY='disposable-operations-ui-test-key-2026-only';process.env.LUNAR_RATE_LIMIT_SECRET='disposable-rate-limit-secret-2026-local-only';delete process.env.VERCEL;
process.argv.push('--import-only');const {previewServer}=await import('./preview-api.mjs');previewServer().listen(8840,'127.0.0.1',()=>console.log('DISPOSABLE TEST DATABASE ONLY: http://127.0.0.1:8840/operations'));
