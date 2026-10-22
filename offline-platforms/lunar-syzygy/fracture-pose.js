import {Vector3} from './vendor/three.module.js';
import {scalarNoise} from './fracture-field.js';
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};

// CPU counterpart of fracture() in the material. Used only at release/reset,
// so fragment birth inherits the pose and velocity of its actual parent edge.
export function fracturePoint(point,side,opening,damage,target=new Vector3()){
  const threshold=.08+.30*Math.abs(point.y/1.5)+.06*scalarNoise(point.y*5,point.z*5,7);
  const amount=opening*smooth(threshold-.08,threshold+.08,damage);
  const yaw=(side<0?-.092:.068)*amount,roll=(side<0?.034:-.021)*amount,pitch=side*amount*.015;
  const px=side<0?-.18:.14,py=side<0?.05:-.04,pz=side<0?.12:-.09;
  let x=point.x-px,y=point.y-py,z=point.z-pz;
  [x,z]=[x*Math.cos(yaw)-z*Math.sin(yaw),x*Math.sin(yaw)+z*Math.cos(yaw)];
  [x,y]=[x*Math.cos(roll)-y*Math.sin(roll),x*Math.sin(roll)+y*Math.cos(roll)];
  [y,z]=[y*Math.cos(pitch)-z*Math.sin(pitch),y*Math.sin(pitch)+z*Math.cos(pitch)];
  return target.set(x+px+(side<0?-.22:.18)*amount,y+py+(side<0?.045:-.032)*amount,z+pz+(side<0?-.14:-.09)*amount);
}
