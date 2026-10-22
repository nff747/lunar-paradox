import fs from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RuptureController} from '../offline-platforms/lunar-syzygy/rupture-state.js';

const html=fs.readFileSync(new URL('../offline-platforms/lunar-syzygy/scene-source.html',import.meta.url),'utf8');
const handlers=html.slice(html.indexOf('function triggerWhoosh()'),html.indexOf('function motion()'));
class Control extends EventTarget{
 constructor(doc){super();this.doc=doc;this.tagName='BUTTON';this.attrs={};}
 setAttribute(k,v){this.attrs[k]=String(v);} getAttribute(k){return this.attrs[k];}
 setPointerCapture(){} focus(){this.doc.activeElement=this;}
}
function fixture(){
 const win=new EventTarget(),document=new EventTarget();document.body={tagName:'BODY',dataset:{route:'realms'}};document.activeElement=document.body;document.hidden=false;
 const gate=new Control(document),rupture=new RuptureController();
 const ctx=vm.createContext({window:win,document,CustomEvent,performance,console,rupture,$:()=>gate,addEventListener:win.addEventListener.bind(win),THREE:{MathUtils:{clamp:(n,a,b)=>Math.max(a,Math.min(b,n))}},pointer:{x:0,y:0,set(){}},pointerImpulse:{},pointerAt:0});
 vm.runInContext('let holding=false,contextLost=false,holdRevealed=false,spatialSuspended=false,lastMaterialAudioAt=0;\n'+handlers+'\nthis.readHolding=()=>holding;this.addRouteHold=()=>beginHold("mission");',ctx);
 return {win,document,gate,rupture,ctx};
}
function send(target,type,fields={}){const e=new Event(type,{cancelable:true});for(const [k,v]of Object.entries(fields))Object.defineProperty(e,k,{value:v});target.dispatchEvent(e);return e;}
test('pointer cancellation, window blur, page hide and navigation release the actual handler',()=>{for(const kind of ['pointercancel','blur','hidden','route']){const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});assert(f.ctx.readHolding());if(kind==='pointercancel')send(f.gate,'pointercancel');if(kind==='blur')send(f.win,'blur');if(kind==='hidden'){f.document.hidden=true;send(f.document,'visibilitychange');}if(kind==='route')send(f.document,'lunar:route');assert(!f.ctx.readHolding());}});
test('keyboard and pointer sources release independently',()=>{const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});send(f.win,'keydown',{code:'Space'});send(f.gate,'pointerup');assert(f.ctx.readHolding());send(f.win,'keyup',{code:'Space'});assert(!f.ctx.readHolding());});
test('forms, company routes and consumed events cannot charge the scene',()=>{for(const mode of ['form','company','consumed']){const f=fixture();if(mode==='form')f.document.activeElement={tagName:'INPUT'};if(mode==='company')f.document.body.dataset.companyRoute='commission';const e=new Event('keydown',{cancelable:true});Object.defineProperty(e,'code',{value:'Space'});if(mode==='consumed')e.preventDefault();f.win.dispatchEvent(e);assert(!f.ctx.readHolding());}});
test('Enter/assistive activation charges once, then activates explicit rejoin while latched',()=>{const f=fixture();send(f.gate,'click',{detail:1});assert.equal(f.rupture.state,'JOINED');send(f.gate,'click',{detail:0});assert.equal(f.rupture.state,'CHARGING');for(let i=0;i<90;i++)f.rupture.update(.016);assert.equal(f.rupture.state,'HELD_OPEN');send(f.gate,'click',{detail:0});assert.equal(f.rupture.state,'REJOINING');});
test('navigation cancels an accessible automatic charge and the scene returns to joined',()=>{const f=fixture();send(f.gate,'click',{detail:0});for(let i=0;i<20;i++)f.rupture.update(.016);assert(f.rupture.automatic);send(f.document,'lunar:route');assert(!f.rupture.automatic);for(let i=0;i<90;i++)f.rupture.update(.016);assert.equal(f.rupture.state,'JOINED');assert.equal(f.rupture.cycles,0);});
test('a hold-to-open release stays latched and a later tap deliberately rejoins',()=>{const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});for(let i=0;i<90;i++)f.rupture.update(.016,{holding:f.ctx.readHolding()});assert.equal(f.rupture.state,'HELD_OPEN');send(f.gate,'pointerup');send(f.gate,'click',{detail:1});assert.equal(f.rupture.state,'HELD_OPEN');send(f.win,'keydown',{code:'KeyR'});assert.equal(f.rupture.state,'HELD_OPEN');send(f.gate,'pointerdown',{button:0,pointerId:2});send(f.gate,'pointerup');send(f.gate,'click',{detail:1});assert.equal(f.rupture.state,'REJOINING');});
test('explicit rejoin clears route-owned holds and Space remains a native button activation',()=>{const f=fixture();send(f.gate,'pointerdown',{button:0,pointerId:1});f.ctx.addRouteHold();for(let i=0;i<90;i++)f.rupture.update(.016,{holding:f.ctx.readHolding()});send(f.gate,'pointerup');assert(f.ctx.readHolding());send(f.gate,'pointerdown',{button:0,pointerId:2});send(f.gate,'pointerup');send(f.gate,'click',{detail:1});assert(!f.ctx.readHolding());assert.equal(f.rupture.state,'REJOINING');const event=send(f.win,'keydown',{code:'Space'});assert.equal(event.defaultPrevented,false);});
test('fracture actuator begins responding from the first increment of hold strain',()=>{assert.match(html,/load=THREE\.MathUtils\.clamp\(actuatorStrain,0,1\),drive=load/);assert(!html.includes('actuatorStrain-s.criticalStrain'));});
