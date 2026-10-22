import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from '../offline-platforms/lunar-syzygy/vendor/three.module.js';
import {fracturePoint} from '../offline-platforms/lunar-syzygy/fracture-pose.js';
test('undeformed parent positions are preserved on both sides',()=>{for(const side of [-1,1])for(const p of [new Vector3(0,.7,1.2),new Vector3(.1,-.8,.6)])assert(fracturePoint(p,side,0,0).distanceTo(p)<1e-12);});
test('local parent motion separates the sides and contributes continuous finite release velocity',()=>{const p=new Vector3(0,.6,1.2),a=fracturePoint(p,-1,.4,1),b=fracturePoint(p,1,.4,1);assert(a.x<b.x);for(const side of [-1,1]){const v=fracturePoint(p,side,.401,1).sub(fracturePoint(p,side,.4,1)).divideScalar(.001);assert(v.toArray().every(Number.isFinite));assert(v.length()>0&&v.length()<2);}});
test('position sampling can reuse a scratch vector and returns exactly home at rejoin',()=>{const p=new Vector3(.05,1.1,.7),scratch=new Vector3();assert.equal(fracturePoint(p,1,1,1,scratch),scratch);assert(fracturePoint(p,1,0,0,scratch).distanceTo(p)<1e-12);});
