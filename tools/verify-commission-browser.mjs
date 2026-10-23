// Real browser + API + PostgreSQL test. Runs only on the local disposable DB.
import axe from 'axe-core';
import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';import {once} from 'node:events';import {randomBytes} from 'node:crypto';import assert from 'node:assert/strict';
import handler from '../api/[...path].js';import {createDatabasePool,databaseOptions} from '../lib/database.js';
const url=new URL(databaseOptions().config.connectionString);if(process.env.LUNAR_DATABASE_TEST!=='disposable'||!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/lunar_backend_test')throw Error('Use only a disposable local lunar_backend_test database.');
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url))),staticRoot=path.join(root,'build/hosted'),out=path.join(root,'evidence','commission-journey');await fs.mkdir(out,{recursive:true});
process.env.LUNAR_OWNER_KEY=randomBytes(32).toString('hex');process.env.LUNAR_RATE_LIMIT_SECRET=randomBytes(32).toString('hex');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/home/n1khy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{if(req.url.startsWith('/api/')){req.headers['x-forwarded-proto']='http';return handler(req,res);}try{const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const p=path.resolve(staticRoot,'.'+(route==='/'?'/lunar-syzygy/index.html':route));if(!p.startsWith(staticRoot+path.sep))throw Error();const bytes=await fs.readFile(p);res.setHeader('Content-Type',types[path.extname(p)]||'application/octet-stream');res.end(bytes);}catch{res.statusCode=404;res.end('Not found');}});
server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
const api=async(route,method,body)=>{const r=await fetch(base+'/api/'+route,{method,headers:{'Content-Type':'application/json','X-Lunar-Owner':process.env.LUNAR_OWNER_KEY},body:body?JSON.stringify(body):undefined});const value=await r.json();if(!r.ok)throw Error(route+': '+r.status);return value;};
const db=createDatabasePool(),browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-gpu','--ignore-gpu-blocklist']});let application;
try{
 await db.query('TRUNCATE lunar_applications,lunar_estimates,lunar_pricing,lunar_company_content,lunar_briefs,lunar_api_limits CASCADE');
 await api('pricing','PUT',{revision:0,currency:'GBP',items:[{id:'fixture-build',label:'Spatial experience',unit:'milestone',low:100000,high:200000},{id:'fixture-discovery',label:'Technical investigation',unit:'day',low:50000,high:80000}]});
 const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(base+'/#/commission');await page.waitForFunction(()=>window.__lunarDebug?.ready,null,{timeout:90000});
 await page.screenshot({path:out+'/application-desktop.png'});await page.addScriptTag({content:axe.source});const accessibility=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('#lunar-company'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,impact:x.impact,help:x.help,nodes:x.nodes.length}));});if(accessibility.length)throw Error('Application accessibility: '+JSON.stringify(accessibility));
 await page.getByLabel('Your name',{exact:true}).fill('Browser verification');await page.getByLabel('Email',{exact:true}).fill('browser@example.test');await page.getByLabel('What would a successful project achieve?').fill('Disposable browser journey verification');
 // Navigate away/back: a partially completed brief must survive within the tab.
 await page.evaluate(()=>location.hash='#/studio');await page.waitForSelector('a[href="#/commission"]');await page.evaluate(()=>location.hash='#/commission');await page.waitForSelector('#lc-application');assert.equal(await page.locator('[name=goal]').inputValue(),'Disposable browser journey verification');
 await page.getByRole('button',{name:'SUBMIT APPLICATION'}).click();await page.waitForSelector('.lc-access-receipt');
 application=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('lunar-application')));
 assert(application.id&&application.accessKey);await page.getByRole('link',{name:'CHECK APPLICATION',exact:false}).click();await page.waitForSelector('#lc-access');await page.getByRole('button',{name:'CHECK APPLICATION'}).click();await page.waitForSelector('#lc-application-result h2');assert.match(await page.locator('#lc-application-result').innerText(),/awaiting review/);
 await api('applications','PUT',{id:application.id,status:'accepted',note:'Disposable test approval'});await page.getByRole('button',{name:'CHECK APPLICATION'}).click();await page.waitForSelector('#lc-estimator');
 await page.getByRole('checkbox',{name:/Spatial experience/}).check();await page.locator('[data-quantity="fixture-build"]').fill('2');assert.match(await page.locator('[data-scope-total]').innerText(),/2,000.*4,000/);
 await page.getByRole('checkbox',{name:/Technical investigation/}).check();assert.match(await page.locator('[data-scope-total]').innerText(),/2,500.*4,800/);
 await page.getByRole('button',{name:'SAVE INDICATIVE ESTIMATE'}).click();await page.waitForSelector('#lc-estimate-result h2');assert.match(await page.locator('#lc-estimate-result').innerText(),/2,500.*4,800/);
 await page.screenshot({path:out+'/estimate-desktop.png'});const estimateAccessibility=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('#lunar-company'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,impact:x.impact,help:x.help,nodes:x.nodes.length}));});if(estimateAccessibility.length)throw Error('Estimate accessibility: '+JSON.stringify(estimateAccessibility));
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'DOWNLOAD ESTIMATE'}).click();const saved=await download;assert.match(saved.suggestedFilename(),/estimate/);
 await page.getByRole('button',{name:'FORGET ACCESS ON THIS TAB'}).click();assert.equal(await page.locator('[name=accessKey]').inputValue(),'');assert.equal(await page.evaluate(()=>sessionStorage.getItem('lunar-application')),null);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>location.hash='#/commission');await page.waitForSelector('#lc-application');await page.screenshot({path:out+'/application-mobile.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 if(errors.length)throw Error(errors.join('\n'));
 const result={recordedAt:new Date().toISOString(),backend:'disposable PostgreSQL, real API',draftRestore:true,privateReceipt:true,pendingGate:true,acceptedScope:true,liveRange:true,serverEstimate:true,download:true,forgetCredentials:true,mobileNoOverflow:true,accessibility:{applicationViolations:accessibility,estimateViolations:estimateAccessibility},errors};await fs.writeFile(out+'/browser-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{
 if(application)await db.query('DELETE FROM lunar_applications WHERE id=$1',[application.id]);await browser.close();await new Promise(resolve=>server.close(resolve));const pool=globalThis[Symbol.for('lunar.paradox.pg.pool')];if(pool){await pool.end();delete globalThis[Symbol.for('lunar.paradox.pg.pool')];}await db.end();
}
