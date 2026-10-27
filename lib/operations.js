import {randomUUID, createHash} from 'node:crypto';
import {InputError} from './production-validation.js';
export class OperationsError extends Error {constructor(status,message){super(message);this.status=status;}}
const fail=(status,message)=>{throw new OperationsError(status,message);};
export const STATES={project:['draft','scoped','awaiting_deposit','funded','active','review','accepted','handed_over','cancelled'],task:['todo','in_progress','blocked','review','done','cancelled'],invoice:['draft','issued','part_paid','paid','void'],expense:['draft','approved','paid','rejected'],research:['proposed','approved','active','paused','closed','rejected'],release:['draft','review','published','withdrawn'],person:['active','inactive']};
export const WORKFLOW={project:{draft:['scoped','cancelled'],scoped:['awaiting_deposit','cancelled'],awaiting_deposit:['funded','cancelled'],funded:['active','cancelled'],active:['review','cancelled'],review:['active','accepted','cancelled'],accepted:['handed_over'],handed_over:[],cancelled:[]},invoice:{draft:['issued','void'],issued:['part_paid','paid','void'],part_paid:['paid'],paid:[],void:[]},expense:{draft:['approved','rejected'],approved:['paid','rejected'],paid:[],rejected:[]},research:{proposed:['approved','rejected'],approved:['active','closed'],active:['paused','closed'],paused:['active','closed'],closed:[],rejected:[]},release:{draft:['review'],review:['draft','published'],published:['withdrawn'],withdrawn:['draft']}};
const fields=['kind','title','status','owner','due','parentId','applicationId','currency','amount','received','budget','note','reference'];
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function cleanOperation(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==fields.length||fields.some(k=>!Object.hasOwn(value,k)))throw new InputError('Invalid operation fields.');
 const out={};for(const [key,max] of Object.entries({kind:20,title:180,status:30,owner:120,due:10,parentId:36,applicationId:36,currency:3,note:6000,reference:500})){if(typeof value[key]!=='string'||value[key].length>max)throw new InputError('Invalid '+key);out[key]=value[key].trim();}
 if(!Object.hasOwn(STATES,out.kind)||!STATES[out.kind].includes(out.status)||!out.title)throw new InputError('Choose a valid work type, title and state.');
 if(out.due&&(!/^\d{4}-\d{2}-\d{2}$/.test(out.due)||!Number.isFinite(Date.parse(out.due))||new Date(out.due).toISOString().slice(0,10)!==out.due))throw new InputError('Invalid due date.');
 for(const k of ['parentId','applicationId'])if(out[k]&&!uuid.test(out[k]))throw new InputError('Invalid '+k);
 if(!['GBP','USD','EUR','INR'].includes(out.currency))throw new InputError('Invalid currency.');
 for(const k of ['amount','received','budget']){if(!Number.isSafeInteger(value[k])||value[k]<0||value[k]>1e11)throw new InputError('Amounts must be non-negative minor currency units.');out[k]=value[k];}
 if(out.kind==='project'&&['scoped','awaiting_deposit','funded','active','review','accepted','handed_over'].includes(out.status)&&!(out.amount>0&&out.budget>0&&out.budget<=out.amount))throw new InputError('Record the agreed fee and required cleared deposit before approving scope.');
 if(out.kind==='invoice'&&(out.amount===0&&['issued','part_paid','paid'].includes(out.status)||out.received>out.amount||out.status==='paid'&&out.received!==out.amount||out.status==='part_paid'&&!(out.received>0&&out.received<out.amount)||['draft','issued','void'].includes(out.status)&&out.received!==0))throw new InputError('Invoice state must match recorded cleared receipts.');
 if((out.received>0||out.kind==='expense'&&out.status==='paid')&&!out.reference)throw new InputError('Record a payment reference before recording money received or paid.');
 if(out.kind==='expense'&&['approved','paid'].includes(out.status)&&out.amount===0)throw new InputError('An approved expense must have a positive amount.');
 if(out.kind!=='invoice'&&out.received!==0)throw new InputError('Only invoices record customer receipts.');
 return out;
}
export function validateTransition(before,next){
 if(!before){const initial={project:'draft',task:'todo',invoice:'draft',expense:'draft',research:'proposed',release:'draft',person:'active'};if(next.status!==initial[next.kind])throw new InputError('New records must start in '+initial[next.kind]+'.');return;}
 if(before.kind!==next.kind)throw new InputError('A record cannot change its work type.');
 if(before.applicationId!==next.applicationId||before.parentId!==next.parentId||before.currency!==next.currency)throw new InputError('Linked records and currency cannot be changed after creation.');
 const paths=WORKFLOW;
 if(before.status!==next.status&&paths[next.kind]&&!paths[next.kind][before.status]?.includes(next.status))throw new InputError('That state change needs its preceding human approval.');
 if(before.kind==='invoice'&&before.received>next.received)throw new InputError('Recorded receipts cannot be reduced here. Reconcile corrections separately.');
 if(before.kind==='project'&&before.status!=='draft'&&(before.amount!==next.amount||before.budget!==next.budget))throw new InputError('Approved fees and funding requirements need a separate scope amendment, not a silent rewrite.');
 if(before.kind==='expense'&&['approved','paid'].includes(before.status)&&before.amount!==next.amount)throw new InputError('Approved expense amounts cannot be rewritten.');
 if(before.kind==='invoice'&&before.status!=='draft'&&before.amount!==next.amount)throw new InputError('Issued invoice amounts cannot be rewritten.');
 if(['scoped','accepted','handed_over'].includes(next.status)&&next.kind==='project'&&!next.reference)throw new InputError('Record the scope or client approval reference.');
 if(next.kind==='research'&&next.status==='active'&&next.budget===0)throw new InputError('Approve a research spending limit first.');
}
export function summarize(records,today=new Date().toISOString().slice(0,10)){
 const money={};const reminders=[];
 for(const record of records){const d=record.document||record;
 if(['invoice','expense'].includes(d.kind)){const bucket=money[d.currency]??={invoiced:0,recordedReceipts:0,outstanding:0,paidExpenses:0};if(d.kind==='invoice'&&!['draft','void'].includes(d.status)){bucket.invoiced+=d.amount;bucket.recordedReceipts+=d.received;bucket.outstanding+=d.amount-d.received;}if(d.kind==='expense'&&d.status==='paid')bucket.paidExpenses+=d.amount;}
 if(d.due&&d.due<today&&!['done','paid','void','rejected','closed','inactive','handed_over','cancelled','withdrawn','published'].includes(d.status))reminders.push({id:record.id,title:d.title,due:d.due,reason:d.kind==='invoice'?'Payment follow-up needed':'Overdue work needs review'});
 if(d.kind==='task'&&d.status==='blocked')reminders.push({id:record.id,title:d.title,reason:'Resolve or reassign blocked work'});
 }
 return{money,reminders,automation:'Reminders are calculated from saved records. No approvals, payments, publishing or messages are automatic.'};
}
function requireRole(req,role){if(!req.lunarAdmin?.roles.includes(role))fail(403,'Your administrator role does not permit this action.');}
export function cleanReview(value){
 const keys=['productId','author','email','quote','version','consent','website'];if(!value||Object.keys(value).length!==keys.length||keys.some(k=>!Object.hasOwn(value,k)))throw new InputError('Invalid feedback fields.');
 const result={};for(const [k,max] of Object.entries({productId:80,author:120,email:254,quote:2000,version:60,website:200})){if(typeof value[k]!=='string'||value[k].length>max)throw new InputError('Invalid '+k);result[k]=value[k].trim();}
 if(!/^[-\w]+$/.test(result.productId)||!result.author||!result.quote||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)||value.consent!==true||result.website)throw new InputError('Provide feedback, your name and email, and permission to publish your words.');
 return{...result,consent:true};
}
export async function operationsRoute({db,req,path,method,readBody,rateLimit,content}){
 if(!path.startsWith('/operations')&&!path.startsWith('/product-reviews'))return null;
 const schema=await db.query('SELECT version FROM lunar_schema_migrations WHERE version=6');if(!schema.rowCount)fail(503,'Operations setup is pending. Apply database migration 006.');
 if(path==='/product-reviews'&&method==='GET'){
  const productId=new URL(req.url,'https://local.test').searchParams.get('productId');if(!productId||!/^[-\w]{1,80}$/.test(productId))throw new InputError('Choose a product.');
  await rateLimit(db,req,'public-reviews',120,60000);
  const {rows}=await db.query("SELECT id,product_id,author,quote,version,created_at FROM lunar_product_reviews WHERE product_id=$1 AND status='published' ORDER BY created_at DESC LIMIT 50",[productId]);return{reviews:rows.map(r=>({id:r.id,productId:r.product_id,author:r.author,quote:r.quote,version:r.version,date:new Date(r.created_at).toISOString().slice(0,10),status:'published'}))};
 }
 if(path==='/product-reviews'&&method==='POST'){
  await rateLimit(db,req,'review-submit',5,3600000);const value=cleanReview(await readBody(req));
  const {rows}=await db.query('SELECT document FROM lunar_company_content WHERE singleton=true');const products=rows[0]?.document?.products?.length?rows[0].document.products:content.products;
  if(!products.some(p=>p.id===value.productId&&p.status==='published'))fail(404,'That product is not published.');
  const digest=createHash('sha256').update(value.productId+'\0'+value.email.toLowerCase()+'\0'+value.quote).digest('hex');
  await db.query("INSERT INTO lunar_product_reviews(id,product_id,author,email,quote,version,consent,status,submission_hash) VALUES($1,$2,$3,$4,$5,$6,true,'pending',$7) ON CONFLICT(submission_hash) DO NOTHING",[randomUUID(),value.productId,value.author,value.email,value.quote,value.version,digest]);return{message:'Thank you. Your feedback is pending human review. Your email will not be published.'};
 }
 requireRole(req,'review');
 if(path==='/operations'&&method==='GET'){
  const finance=req.lunarAdmin.roles.includes('pricing');
  const {rows}=await db.query("SELECT id,revision,document,created_at,updated_at FROM lunar_operations WHERE $1::boolean OR document->>'kind' NOT IN('invoice','expense') ORDER BY updated_at DESC LIMIT 300",[finance]);
  const counts=await db.query("SELECT count(*)::text AS count FROM lunar_operations WHERE $1::boolean OR document->>'kind' NOT IN('invoice','expense')",[finance]);
  const totals=finance?await db.query("SELECT document->>'currency' AS currency,COALESCE(sum(CASE WHEN document->>'kind'='invoice' AND document->>'status' NOT IN('draft','void') THEN (document->>'amount')::bigint ELSE 0 END),0)::text AS invoiced,COALESCE(sum(CASE WHEN document->>'kind'='invoice' AND document->>'status' NOT IN('draft','void') THEN (document->>'received')::bigint ELSE 0 END),0)::text AS receipts,COALESCE(sum(CASE WHEN document->>'kind'='expense' AND document->>'status'='paid' THEN (document->>'amount')::bigint ELSE 0 END),0)::text AS expenses FROM lunar_operations WHERE document->>'kind' IN('invoice','expense') GROUP BY document->>'currency'"):{rows:[]};
  const money=Object.fromEntries(totals.rows.map(r=>[r.currency,{invoiced:Number(r.invoiced),recordedReceipts:Number(r.receipts),outstanding:Number(r.invoiced)-Number(r.receipts),paidExpenses:Number(r.expenses)}]));
  const attention=await db.query("SELECT id,document->>'title' AS title,document->>'due' AS due,document->>'kind' AS kind,document->>'status' AS status FROM lunar_operations WHERE ($1::boolean OR document->>'kind' NOT IN('invoice','expense')) AND ((document->>'due'<>'' AND document->>'due'<$2 AND document->>'status' NOT IN('done','paid','void','rejected','closed','inactive','handed_over','cancelled','withdrawn','published')) OR (document->>'kind'='task' AND document->>'status'='blocked')) ORDER BY document->>'due' LIMIT 200",[finance,new Date().toISOString().slice(0,10)]);
  const reminders=attention.rows.map(r=>({id:r.id,title:r.title,due:r.due,reason:r.status==='blocked'?'Resolve or reassign blocked work':r.kind==='invoice'?'Payment follow-up needed':'Overdue work needs review'}));
  const apps=await db.query('SELECT id,status,document,created_at FROM lunar_applications ORDER BY created_at DESC LIMIT 200');
  return{records:rows.map(r=>{let nextStates=[r.document.status,...(WORKFLOW[r.document.kind]?.[r.document.status]||STATES[r.document.kind])].filter((v,i,a)=>a.indexOf(v)===i);if(!finance&&r.document.kind==='project')nextStates=nextStates.filter(v=>v===r.document.status||!['scoped','awaiting_deposit','funded'].includes(v));return{...r,nextStates};}),recordCount:Number(counts.rows[0].count),applications:apps.rows.map(r=>({id:r.id,status:r.status,name:r.document.name,type:r.document.type})),roles:req.lunarAdmin.roles,money,reminders,automation:summarize([]).automation};
 }
 if(path==='/operations/reviews'&&method==='GET'){requireRole(req,'publish');const {rows}=await db.query('SELECT id,product_id,author,email,quote,version,status,created_at FROM lunar_product_reviews ORDER BY created_at DESC LIMIT 200');return{reviews:rows};}
 if(/^\/operations\/reviews\/[\w-]+$/.test(path)&&method==='PUT'){
  requireRole(req,'publish');const id=path.split('/')[3];if(!uuid.test(id))throw new InputError('Invalid review.');const value=await readBody(req);if(Object.keys(value).length!==1||!['pending','published','rejected'].includes(value.status))throw new InputError('Choose a moderation state.');
  const result=await db.query("WITH changed AS(UPDATE lunar_product_reviews SET status=$2,moderated_by=$3,moderated_at=now() WHERE id=$1 AND consent=true RETURNING id) INSERT INTO lunar_admin_audit(principal,action,target,outcome) SELECT $3,'review.'||$2,id::text,'success' FROM changed RETURNING id",[id,value.status,req.lunarAdmin.principal]);if(!result.rowCount)fail(404,'Review not found.');return{saved:true};
 }
 if(path==='/operations/records'&&method==='POST'||/^\/operations\/records\/[\w-]+$/.test(path)&&method==='PUT'){
  const body=await readBody(req),expectedRevision=body.revision;const value=cleanOperation(body.record);if(Object.keys(body).some(k=>!['record','revision','requestId'].includes(k)))throw new InputError('Invalid save request.');
  if(['invoice','expense'].includes(value.kind))requireRole(req,'pricing');if(value.kind==='release')requireRole(req,'publish');if(value.kind==='research')requireRole(req,'pricing');
  const id=method==='POST'?body.requestId:path.split('/')[3];if(!uuid.test(id))throw new InputError('Invalid operation ID.');
  const client=await db.connect();try{await client.query('BEGIN');await client.query('SELECT pg_advisory_xact_lock(173531679, 6)');
   if(method==='POST'){const existing=await client.query('SELECT id,revision,document,created_at,updated_at FROM lunar_operations WHERE id=$1',[id]);if(existing.rowCount){if(fields.some(k=>existing.rows[0].document[k]!==value[k]))fail(409,'This save request has already been used.');await client.query('COMMIT');return{record:existing.rows[0]};}}
   let before;if(method==='PUT'){if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw new InputError('Reload this record before saving.');const old=await client.query('SELECT document,revision FROM lunar_operations WHERE id=$1 FOR UPDATE',[id]);if(!old.rowCount)fail(404,'Record not found.');if(old.rows[0].revision!==expectedRevision)fail(409,'This record changed. Reload before saving.');before=old.rows[0].document;}
   if(value.kind==='project'&&(['scoped','awaiting_deposit','funded'].includes(value.status)||(before&&(before.amount!==value.amount||before.budget!==value.budget))))requireRole(req,'pricing');
   validateTransition(before,value);
   if(value.kind==='project'&&!before){if(!value.applicationId)throw new InputError('Projects must link to an accepted application.');const app=await client.query('SELECT status FROM lunar_applications WHERE id=$1 FOR SHARE',[value.applicationId]);if(app.rows[0]?.status!=='accepted')throw new InputError('Accept the application before creating a project.');}
   if(value.parentId){const parent=await client.query('SELECT document FROM lunar_operations WHERE id=$1 FOR SHARE',[value.parentId]);if(!parent.rowCount||!['project','research'].includes(parent.rows[0].document.kind))throw new InputError('Link to an existing project or research programme.');if(['invoice','expense'].includes(value.kind)&&parent.rows[0].document.currency!==value.currency)throw new InputError('Use the linked programme currency.');}
   if(['invoice','expense'].includes(value.kind)&&!value.parentId)throw new InputError('Link financial records to a project or research programme.');
   if(value.kind==='project'&&value.status==='funded'){const receipt=await client.query("SELECT COALESCE(sum((document->>'received')::bigint),0)::text AS cleared FROM lunar_operations WHERE document->>'parentId'=$1 AND document->>'kind'='invoice' AND document->>'status' IN('part_paid','paid') AND document->>'currency'=$2",[id,value.currency]);if(Number(receipt.rows[0].cleared)<value.budget)throw new InputError('Record the required cleared customer receipt before funding the project.');}
   if(value.kind==='research'){const costs=await client.query("SELECT COALESCE(sum((document->>'amount')::bigint),0)::text AS committed FROM lunar_operations WHERE document->>'parentId'=$1 AND document->>'kind'='expense' AND document->>'status' IN('approved','paid')",[id]);if(Number(costs.rows[0].committed)>value.budget)throw new InputError('The budget cannot be reduced below committed research costs.');}
   if(value.kind==='expense'&&['approved','paid'].includes(value.status)){const parent=await client.query('SELECT document FROM lunar_operations WHERE id=$1',[value.parentId]);if(parent.rows[0].document.kind==='research'){const totals=await client.query("SELECT COALESCE(sum((document->>'amount')::bigint),0)::text AS committed FROM lunar_operations WHERE document->>'parentId'=$1 AND document->>'kind'='expense' AND document->>'status' IN('approved','paid') AND id<>$2",[value.parentId,id]);if(Number(totals.rows[0].committed)+value.amount>parent.rows[0].document.budget)throw new InputError('This exceeds the research spending limit. Human budget approval is required.');}}
   const saved=await client.query('INSERT INTO lunar_operations(id,revision,document) VALUES($1,0,$2::jsonb) ON CONFLICT(id) DO UPDATE SET document=EXCLUDED.document,revision=lunar_operations.revision+1,updated_at=now() RETURNING id,revision,document,created_at,updated_at',[id,JSON.stringify(value)]);
   await client.query("INSERT INTO lunar_admin_audit(principal,action,target,outcome) VALUES($1,$2,$3,'success')",[req.lunarAdmin.principal,'operations.'+value.kind+'.'+value.status,id]);await client.query('COMMIT');return{record:saved.rows[0]};
  }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
 }
 fail(405,'Unsupported operations request.');
}
