import {Vector3} from './vendor/three.module.js';

// CPU counterpart of the vertex shader's rigid half-body pose. Opening is
// uniform over each body; the jagged cut lives in the precomputed geometry.
export function fracturePoint(point,side,opening,_damage=0,target=new Vector3()){
  // Distinct angular response while keeping the pair's translation balanced.
  // Left mass releases early; the heavier-looking right mass follows with a
  // short delay. Each axis settles at its own rate, so it does not hinge.
  const phase=(start,end)=>{const t=Math.max(0,Math.min(1,(opening-start)/(end-start)));return t*t*(3-2*t);};
  const yaw=side<0?-.23*phase(0,.86):.27*phase(.08,1);
  const roll=side<0?.065*phase(.12,1):-.095*phase(0,.84);
  const pitch=side<0?-.065*phase(.04,.94):.085*phase(.16,1);
  const pivotX=side<0?-.5625:.5625;
  let x=point.x-pivotX,y=point.y,z=point.z;
  [x,z]=[x*Math.cos(yaw)-z*Math.sin(yaw),x*Math.sin(yaw)+z*Math.cos(yaw)];
  [x,y]=[x*Math.cos(roll)-y*Math.sin(roll),x*Math.sin(roll)+y*Math.cos(roll)];
  [y,z]=[y*Math.cos(pitch)-z*Math.sin(pitch),y*Math.sin(pitch)+z*Math.cos(pitch)];
  return target.set(
    x+pivotX+side*opening*.54,
    y-side*opening*.09,
    z+side*opening*.28,
  );
}

// Shared rigid pose for exterior rock, interior walls, slabs and their normals.
// CPU particle birth uses the identical transform above.
export const fracturePoseGLSL=`
vec3 rotateFracture(vec3 q,float side){
  float yaw=side<0.?-.23*smoothstep(0.,.86,uParadox):.27*smoothstep(.08,1.,uParadox);
  float roll=side<0.?.065*smoothstep(.12,1.,uParadox):-.095*smoothstep(0.,.84,uParadox);
  float pitch=side<0.?-.065*smoothstep(.04,.94,uParadox):.085*smoothstep(.16,1.,uParadox);
  q.xz=vec2(q.x*cos(yaw)-q.z*sin(yaw),q.x*sin(yaw)+q.z*cos(yaw));
  q.xy=vec2(q.x*cos(roll)-q.y*sin(roll),q.x*sin(roll)+q.y*cos(roll));
  q.yz=vec2(q.y*cos(pitch)-q.z*sin(pitch),q.y*sin(pitch)+q.z*cos(pitch));
  return q;
}
vec3 fractureNormal(vec3 n,vec3 p,float side){return rotateFracture(n,side);}
vec3 fracture(vec3 p,float side){
  vec3 pivot=vec3(side*.5625,0.,0.);
  return rotateFracture(p-pivot,side)+pivot+vec3(side*.54,-side*.09,side*.28)*uParadox;
}`;
