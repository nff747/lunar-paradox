import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RuptureController} from '../offline-platforms/lunar-syzygy/rupture-state.js';
function run(s,n,options={}){for(let i=0;i<n;i++)s.update(1/60,options);}

test('hold immediately drives strain and an early release unloads to joined',()=>{
  const s=new RuptureController();run(s,35,{holding:true});
  assert.equal(s.state,'CHARGING');assert(s.drive>0&&s.drive<1);
  const before=s.drive;run(s,12,{holding:true});assert(s.drive>before);
  run(s,120);assert.equal(s.state,'JOINED');assert.equal(s.drive,0);assert.equal(s.cycles,0);
});

test('full hold latches open until an explicit graceful rejoin action',()=>{
  const s=new RuptureController();run(s,90,{holding:true});
  assert.equal(s.state,'HELD_OPEN');assert.equal(s.drive,1);assert.equal(s.cycles,1);
  assert.equal(s.committed,true);assert.equal(s.canInspect,true);
  run(s,90);assert.equal(s.state,'HELD_OPEN');assert.equal(s.drive,1);
  assert.equal(s.rejoin(),true);run(s,24);assert.equal(s.state,'REJOINING');assert(s.drive>0&&s.drive<1);
  run(s,90);assert.equal(s.state,'JOINED');assert.equal(s.drive,0);assert.equal(s.committed,false);
});

test('a second complete hold is counted only after the first release',()=>{
  const s=new RuptureController();run(s,90,{holding:true});assert(s.rejoin());run(s,90);run(s,90,{holding:true});
  assert.equal(s.cycles,2);assert.equal(s.state,'HELD_OPEN');
});

test('pause and large frame gaps never fast-forward strain',()=>{
  const s=new RuptureController();run(s,60,{holding:true,paused:true});assert.equal(s.charge,0);
  s.update(60,{holding:true});assert(s.charge<.05);
});

test('accessible activation runs once; reduced motion resolves immediately',()=>{
  const s=new RuptureController();assert(s.activate());run(s,73);assert.equal(s.state,'HELD_OPEN');
  run(s,90);assert.equal(s.state,'HELD_OPEN');assert(s.activate());assert.equal(s.state,'REJOINING');run(s,90);assert.equal(s.state,'JOINED');
  const r=new RuptureController();r.activate();r.update(.016,{reduced:true});assert.equal(r.state,'HELD_OPEN');
  assert(r.activate());r.update(.016,{reduced:true});assert.equal(r.state,'JOINED');
});
