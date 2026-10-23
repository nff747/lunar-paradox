import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/home/n1khy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const out=path.join(root,'evidence','syzygy-experience');await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-gpu','--ignore-gpu-blocklist']});
const errors=[],network=[];
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
try{
 const start=Date.now();await page.goto(pathToFileURL(path.join(root,'offline-platforms/lunar-syzygy/index.html')).href,{waitUntil:'domcontentloaded',timeout:90000});
 await page.waitForFunction(()=>window.__lunarDebug?.ready&&document.body.dataset.sessionReady==='true',null,{timeout:90000});const startupMs=Date.now()-start;
 await page.waitForTimeout(1000);await page.screenshot({path:out+'/joined.png'});
 const trigger=page.locator('#trigger'),b=await trigger.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.waitForFunction(()=>window.__lunarDebug.getSnapshot().committed,null,{timeout:15000});await page.mouse.up();
 await page.waitForFunction(()=>window.__lunarDebug.getSnapshot().cinematicStage==='HELD_OPEN',null,{timeout:40000});await page.screenshot({path:out+'/open.png'});
 const before=await page.evaluate(()=>window.__lunarDebug.camera.position.toArray());await page.mouse.move(640,330);await page.mouse.wheel(0,1800);await page.waitForTimeout(2000);const after=await page.evaluate(()=>window.__lunarDebug.camera.position.toArray());
 if(Math.abs(before[2]-after[2])<.3)throw Error('Inspection rail did not dolly');await page.screenshot({path:out+'/inspection.png'});
 const pacing=await page.evaluate(()=>new Promise(resolve=>{const times=[];let previous=performance.now();const tick=now=>{times.push(now-previous);previous=now;if(times.length<180)requestAnimationFrame(tick);else{times.sort((a,b)=>a-b);resolve({samples:times.length,medianMs:times[90],p95Ms:times[171],over50Ms:times.filter(x=>x>50).length,device:document.body.dataset.graphicsDevice});}};requestAnimationFrame(tick);}));
 await trigger.click();await page.waitForFunction(()=>window.__lunarDebug.getSnapshot().cinematicStage==='JOINED'&&window.__lunarDebug.getSnapshot().paradox<.001,null,{timeout:30000});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(700);await page.screenshot({path:out+'/mobile.png'});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 const reduced=await browser.newPage({viewport:{width:900,height:700},reducedMotion:'reduce'});await reduced.goto(page.url());await reduced.waitForFunction(()=>window.__lunarDebug?.ready,null,{timeout:90000});const reducedState=await reduced.evaluate(()=>window.__lunarDebug.getSnapshot());if(!reducedState.paused)throw Error('Reduced-motion startup should be paused');await reduced.close();
 if(errors.length||network.length)throw Error(JSON.stringify({errors,network}));
 const receipt={recordedAt:new Date().toISOString(),startupMs,pacing,before,after,holdLatched:true,explicitRejoin:true,reducedMotionPaused:true,mobileWidth:390,errors,networkRequests:network.length};await fs.writeFile(out+'/browser-check.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt));
}finally{await browser.close();}
