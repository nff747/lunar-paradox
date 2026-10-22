import {Vector3} from './vendor/three.module.js';

// CPU counterpart of the vertex shader's rigid half-body pose. Opening is
// uniform over each body; the jagged cut lives in the precomputed geometry.
export function fracturePoint(point,side,opening,_damage=0,target=new Vector3()){
  const yaw=(side<0?-.092:.068)*opening;
  const roll=(side<0?.034:-.021)*opening;
  const pitch=side*opening*.015;
  const pivotX=side<0?-.5625:.5625;
  let x=point.x-pivotX,y=point.y,z=point.z;
  [x,z]=[x*Math.cos(yaw)-z*Math.sin(yaw),x*Math.sin(yaw)+z*Math.cos(yaw)];
  [x,y]=[x*Math.cos(roll)-y*Math.sin(roll),x*Math.sin(roll)+y*Math.cos(roll)];
  [y,z]=[y*Math.cos(pitch)-z*Math.sin(pitch),y*Math.sin(pitch)+z*Math.cos(pitch)];
  return target.set(
    x+pivotX+side*opening*.22,
    y-side*opening*.025,
    z+side*opening*.035,
  );
}
