// One-time, private deployment bootstrap. Never changes an existing user's password.
const email='hello@lunarparadox.com',password=process.env.LUNAR_ADMIN_BOOTSTRAP_PASSWORD;
if(!password){console.log('Administrator bootstrap skipped: no bootstrap password configured.');process.exit(0);}
if(password.length<32)throw Error('Bootstrap password is too short.');
const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY;
if(!url||!key||new URL(url).protocol!=='https:'||!new URL(url).hostname.endsWith('.supabase.co'))throw Error('Administrator bootstrap provider is not configured.');
async function request(route,body){const r=await fetch(new URL('/auth/v1/admin/'+route,url),{method:body?'POST':'GET',headers:{apikey:key,Authorization:'Bearer '+key,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Administrator bootstrap provider operation failed: '+r.status);return r.json();}
let existing=false;for(let page=1;page<=100;page++){const data=await request('users?page='+page+'&per_page=100');if((data.users||[]).some(u=>u.email?.toLowerCase()===email)){existing=true;break;}if((data.users||[]).length<100)break;if(page===100)throw Error('Administrator search exceeded its safe page bound.');}
if(!existing)await request('users',{email,password,email_confirm:true,app_metadata:{lunar_role:'owner'}});
console.log(JSON.stringify({administrator:email,status:existing?'existing-account-preserved':'account-created',mfaEnrollmentStillRequired:true,noEmailSent:true}));
