import {createHash} from 'node:crypto';
import {cleanApplication,cleanPricing} from './production-validation.js';
const uuid=value=>typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export async function prepareLegacyDatabase(client){
 const {rows}=await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='lunar_applications'");
 if(!rows.some(row=>row.column_name==='access_key')||rows.some(row=>row.column_name==='document'))return;
 await client.query('CREATE SCHEMA IF NOT EXISTS lunar_legacy');
 await client.query('REVOKE ALL ON SCHEMA lunar_legacy FROM PUBLIC');
 for(const table of ['lunar_estimates','lunar_applications','lunar_pricing']){
   const found=await client.query('SELECT to_regclass($1) AS present,to_regclass($2) AS archived',['public.'+table,'lunar_legacy.'+table]);
   if(found.rows[0].archived)throw new Error('A legacy archive already exists; manual reconciliation required.');
   if(found.rows[0].present){
     // Fixed internal identifiers, never user input. Original rows remain intact.
     await client.query(`ALTER TABLE public.${table} SET SCHEMA lunar_legacy`);
     await client.query(`ALTER TABLE lunar_legacy.${table} ENABLE ROW LEVEL SECURITY`);
     await client.query(`REVOKE ALL ON TABLE lunar_legacy.${table} FROM PUBLIC`);
   }
 }
 await client.query(`DO $$ DECLARE r text; t text; BEGIN FOREACH r IN ARRAY ARRAY['anon','authenticated'] LOOP IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname=r) THEN EXECUTE format('REVOKE ALL ON SCHEMA lunar_legacy FROM %I',r); FOREACH t IN ARRAY ARRAY['lunar_applications','lunar_estimates','lunar_pricing'] LOOP IF to_regclass('lunar_legacy.'||t) IS NOT NULL THEN EXECUTE format('REVOKE ALL ON TABLE lunar_legacy.%I FROM %I',t,r); END IF; END LOOP; END IF; END LOOP; END $$;`);
}

export async function importLegacyDatabase(client){
 const done=await client.query('SELECT version FROM lunar_schema_migrations WHERE version=3');
 if(done.rowCount)return;
 const archived=await client.query("SELECT to_regclass('lunar_legacy.lunar_applications') AS present");
 if(!archived.rows[0].present)return;
 const apps=await client.query('SELECT * FROM lunar_legacy.lunar_applications');
 for(const row of apps.rows){
   if(!uuid(row.id)||!['pending','accepted','declined'].includes(row.status)||typeof row.access_key!=='string'||row.access_key.length<32)throw new Error('A legacy application needs manual reconciliation; no changes committed.');
   const document=cleanApplication(Object.fromEntries(['name','email','type','goal','timing','budget'].map(key=>[key,row[key]??''])));
   await client.query('INSERT INTO lunar_applications(id,created_at,status,access_hash,document,note) VALUES($1,COALESCE($2::timestamptz,now()),$3,$4,$5::jsonb,$6) ON CONFLICT(id) DO NOTHING',[row.id,row.created,row.status,createHash('sha256').update(row.access_key).digest('hex'),JSON.stringify(document),row.note??'']);
 }
 const hasPricing=await client.query("SELECT to_regclass('lunar_legacy.lunar_pricing') AS present");
 if(hasPricing.rows[0].present){
  const prices=await client.query('SELECT revision,currency,items FROM lunar_legacy.lunar_pricing ORDER BY revision DESC,id DESC LIMIT 1');
  if(prices.rowCount){const pricing=cleanPricing(prices.rows[0]);await client.query('INSERT INTO lunar_pricing(singleton,document) VALUES(true,$1::jsonb) ON CONFLICT(singleton) DO NOTHING',[JSON.stringify(pricing)]);}
 }
 const hasEstimates=await client.query("SELECT to_regclass('lunar_legacy.lunar_estimates') AS present");
 if(hasEstimates.rows[0].present){
  const estimates=await client.query('SELECT * FROM lunar_legacy.lunar_estimates');
  for(const row of estimates.rows){
   if(!uuid(row.id)||!uuid(row.application_id))throw new Error('A legacy estimate needs manual reconciliation; no changes committed.');
   const created=row.created?new Date(row.created).toISOString():new Date().toISOString();
   const document={id:row.id,created,applicationId:row.application_id,pricingRevision:row.pricing_revision,currency:row.currency,lines:row.lines,low:row.low,high:row.high,terms:row.terms};
   await client.query('INSERT INTO lunar_estimates(id,application_id,created_at,document) VALUES($1,$2,$3,$4::jsonb) ON CONFLICT(id) DO NOTHING',[row.id,row.application_id,created,JSON.stringify(document)]);
  }
 }
 console.log('Legacy import verified:',apps.rowCount,'applications. Original records preserved in private lunar_legacy schema.');
}
