// Runs only against an explicitly designated disposable database. Never seeds
// example customers/prices/products into the actual production database.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {randomBytes} from 'node:crypto';
import {once} from 'node:events';
import {createDatabasePool, databaseOptions} from '../lib/database.js';
import handler from '../api/[...path].js';

if(process.env.LUNAR_DATABASE_TEST!=='disposable')throw Error('Set LUNAR_DATABASE_TEST=disposable with an isolated test DATABASE_URL.');
const testUrl=new URL(databaseOptions().config.connectionString);
if(!['127.0.0.1','localhost','[::1]'].includes(testUrl.hostname)||testUrl.pathname!=='/lunar_backend_test')throw Error('Verification requires a local database named lunar_backend_test.');
process.env.LUNAR_OWNER_KEY=randomBytes(32).toString('hex');process.env.LUNAR_RATE_LIMIT_SECRET=randomBytes(32).toString('hex');
const db=createDatabasePool();
const server=createServer((req,res)=>{req.headers['x-forwarded-proto']='http';handler(req,res);});
server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
const call=async(path,method='GET',body,owner=false)=>{const res=await fetch(base+'/api/'+path,{method,headers:{'Content-Type':'application/json',...(owner?{'X-Lunar-Owner':process.env.LUNAR_OWNER_KEY}:{})},body:body?JSON.stringify(body):undefined});return {status:res.status,body:await res.json()};};
const checks=[];const check=(name)=>{checks.push(name);console.log('PASS',name);};
try{
 await db.query('TRUNCATE lunar_applications, lunar_estimates, lunar_pricing, lunar_company_content, lunar_briefs, lunar_api_limits CASCADE');
 assert.equal((await call('health')).status,200);check('migrated schema health');
 const created=await call('apply','POST',{name:'Disposable verification',email:'verification@example.test',type:'commission',goal:'Integration test only',budget:'',timing:''});assert.equal(created.status,201);const credentials={id:created.body.id,accessKey:created.body.accessKey};
 assert.equal((await call('application-access','POST',credentials)).body.application.status,'pending');
 assert.equal((await call('estimate','POST',{...credentials,selection:[{id:'test',quantity:1}]})).status,403);
 assert.equal((await call('application-access','POST',{...credentials,accessKey:'incorrect'.repeat(6)})).status,403);check('private application access and approval gate');
 assert.equal((await call('applications')).status,401);
 const price={revision:0,currency:'GBP',items:[{id:'test',label:'Disposable test',unit:'unit',low:10000,high:20000}]};
 const race=await Promise.all([call('pricing','PUT',price,true),call('pricing','PUT',price,true)]);assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);check('first-save rate card concurrency');
 assert.equal((await call('applications','PUT',{id:credentials.id,status:'accepted',note:'Disposable verification'},true)).status,200);
 const access=await call('application-access','POST',credentials);assert.equal(access.body.pricing.items.length,1);
 const estimate=await call('estimate','POST',{...credentials,selection:[{id:'test',quantity:2}]});assert.equal(estimate.status,201);assert.equal(estimate.body.low,20000);assert.equal(estimate.body.high,40000);
 assert.equal((await call('estimate','POST',{...credentials,selection:[{id:'test',quantity:2,low:1}]})).status,400);check('approved estimates use only server-owned prices');
 const record={id:'verification',title:'Disposable test',summary:'Test only',body:'Test only',category:'',image:'',actionUrl:'',actionLabel:'',stage:'',status:'draft'};
 const content={revision:0,experiments:[record],products:[],contactEmail:''};
 const publishRace=await Promise.all([call('publisher','PUT',content,true),call('publisher','PUT',content,true)]);assert.deepEqual(publishRace.map(r=>r.status).sort(),[200,409]);
 assert.equal((await call('content')).body.experiments.length,0);check('draft isolation and first-save publisher concurrency');
 const brief=await call('briefs','POST',{name:'Test',email:'verification@example.test',type:'research',goal:'Disposable test',timing:'',budget:''});assert.equal(brief.status,201);assert.equal((await call('briefs','GET',undefined,true)).body.briefs.length,1);assert.equal((await call('briefs/'+brief.body.id,'DELETE',undefined,true)).status,200);check('brief persistence and owner-only deletion');
 assert.equal((await call('applications/'+credentials.id,'DELETE',undefined,true)).status,200);assert.equal(Number((await db.query('SELECT count(*) FROM lunar_estimates')).rows[0].count),0);check('application deletion cascades to estimates');
 const security=await db.query("SELECT c.relname,c.relrowsecurity,has_table_privilege('anon',c.oid,'SELECT') AS can_read,has_table_privilege('authenticated',c.oid,'INSERT') AS can_write FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relname LIKE 'lunar_%' AND c.relkind='r'");
 assert.equal(security.rows.length,7);assert(security.rows.every(r=>r.relrowsecurity&&!r.can_read&&!r.can_write));check('all seven API tables deny browser roles and enable RLS');
 console.log(JSON.stringify({status:'passed',checks:checks.length}));
}finally{
 await new Promise(resolve=>server.close(resolve));
 const pool=globalThis[Symbol.for('lunar.paradox.pg.pool')];if(pool){await pool.end();delete globalThis[Symbol.for('lunar.paradox.pg.pool')];}
 await db.end();
}
