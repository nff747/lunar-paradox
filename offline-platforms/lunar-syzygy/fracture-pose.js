import {Vector3} from './vendor/three.module.js';

// CPU counterpart of the vertex shader's rigid half-body pose. Opening is
// uniform over each body; the jagged cut lives in the precomputed geometry.
export function fracturePoint(point,side,opening,_damage=0,target=new Vector3()){
  const turn=opening*opening*(3-2*opening);
  const yaw=(side<0?-.23:.27)*turn;
  const roll=(side<0?.065:-.095)*turn;
  const pitch=(side<0?-.065:.085)*turn;
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
  float turn=uParadox*uParadox*(3.-2.*uParadox);
  float yaw=(side<0.?-.23:.27)*turn;
  float roll=(side<0.?.065:-.095)*turn;
  float pitch=(side<0.?-.065:.085)*turn;
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
