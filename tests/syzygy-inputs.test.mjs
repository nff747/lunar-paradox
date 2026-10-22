import fs from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RuptureController} from '../offline-platforms/lunar-syzygy/rupture-state.js';

const html=fs.readFileSync(new URL('../offline-platforms/lunar-syzygy/scene-source.html',import.meta.url),'utf8');
const handlers=html.slice(html.indexOf('function triggerWhoosh()'),html.indexOf('function motion()'));
const rejoin=html.slice(html.indexOf('function triggerRejoin()'),html.indexOf('let paused='));
class Control extends EventTarget{
 constructor(doc){super();this.doc=doc;this.tagName='BUTTON';this.attrs={};}
 setAttribute(k,v){this.attrs[k]=String(v);} getAttribute(k){return this.attrs[k];}
 setPointerCapture(){} focus(){this.doc.activeElement=this;}
}
function fixture(){
 const win=new EventTarget(),document=new EventTarget();document.body={tagName:'BODY',dataset:{route:'realms'}};document.activeElement=document.body;document.hidden=false;
 const gate=new Control(document),rejoinButton=new Control(document),rupture=new RuptureController();
 const ctx=vm.createContext({window:win,document,CustomEvent,performance,console,rupture,pieces:[],$:s=>s==='#trigger'?gate:rejoinButton,addEventListener:win.addEventListener.bind(win),THREE:{MathUtils:{clamp:(n,a,b)=>Math.max(a,Math.min(b,n))}},pointer:{x:0,y:0,set(){}},pointerImpulse:{},pointerAt:0});
 vm.runInContext('let holding=false,contextLost=false,holdRevealed=false,spatialSuspended=false,lastMaterialAudioAt=0,heroTravelTarget=1,isLatchedOpen=false,returnTriggerFocus=false;\n'+rejoin+'\n'+handlers+'\nthis.readHolding=()=>holding;',ctx);
 return {win,document,gate,rupture,ctx};
}
function send(target,type,fields={}){const e=new Event(type,{cancelable:true});for(const [k,v]of Object.entries(fields))Object.defineProperty(e,k,{value:v});target.dispatchEvent(e);return e;}
test('pointer cancellation, window blur, page hide and navigation release the actual handler',()=>{for(const kind of ['pointercancel','blur','hidden','route']){const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});assert(f.ctx.readHolding());if(kind==='pointercancel')send(f.gate,'pointercancel');if(kind==='blur')send(f.win,'blur');if(kind==='hidden'){f.document.hidden=true;send(f.document,'visibilitychange');}if(kind==='route')send(f.document,'lunar:route');assert(!f.ctx.readHolding());}});
test('keyboard and pointer sources release independently',()=>{const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});send(f.win,'keydown',{code:'Space'});send(f.gate,'pointerup');assert(f.ctx.readHolding());send(f.win,'keyup',{code:'Space'});assert(!f.ctx.readHolding());});
test('forms, company routes and consumed events cannot charge the scene',()=>{for(const mode of ['form','company','consumed']){const f=fixture();if(mode==='form')f.document.activeElement={tagName:'INPUT'};if(mode==='company')f.document.body.dataset.companyRoute='commission';const e=new Event('keydown',{cancelable:true});Object.defineProperty(e,'code',{value:'Space'});if(mode==='consumed')e.preventDefault();f.win.dispatchEvent(e);assert(!f.ctx.readHolding());}});
test('Enter/assistive click can activate without a prolonged press; normal pointer click cannot double activate',()=>{const f=fixture();send(f.gate,'click',{detail:1});assert.equal(f.rupture.state,'JOINED');send(f.gate,'click',{detail:0});assert.equal(f.rupture.state,'CHARGING');});
test('navigation cancels an accessible automatic charge before commitment',()=>{const f=fixture();send(f.gate,'click',{detail:0});for(let i=0;i<20;i++)f.rupture.update(.016);assert(f.rupture.automatic);send(f.document,'lunar:route');assert(!f.rupture.automatic);for(let i=0;i<90;i++)f.rupture.update(.016);assert.equal(f.rupture.state,'JOINED');assert.equal(f.rupture.cycles,0);});
test('R respects text/company focus and Escape never resets a committed scene',()=>{for(const mode of ['form','company','escape']){const f=fixture();f.rupture.activate();for(let i=0;i<90;i++)f.rupture.update(.016);vm.runInContext('isLatchedOpen=true;',f.ctx);if(mode==='form')f.document.activeElement={tagName:'TEXTAREA'};if(mode==='company')f.document.body.dataset.companyRoute='commission';send(f.win,'keydown',{code:mode==='escape'?'Escape':'KeyR'});assert.equal(f.rupture.state,'RUPTURE');}const f=fixture();f.rupture.activate();for(let i=0;i<90;i++)f.rupture.update(.016);vm.runInContext('isLatchedOpen=true;',f.ctx);send(f.win,'keydown',{code:'KeyR'});assert.equal(f.rupture.state,'REJOINING');});
