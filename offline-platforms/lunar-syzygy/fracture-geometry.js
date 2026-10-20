import * as THREE from './vendor/three.module.js';

const fract=n=>n-Math.floor(n);
export function scalarNoise(x,y,z){
 const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z);
 let fx=x-ix,fy=y-iy,fz=z-iz;fx*=fx*(3-2*fx);fy*=fy*(3-2*fy);fz*=fz*(3-2*fz);
 const hash=(a,b,c)=>{a=fract(a*.3183099+.1)*17;b=fract(b*.3183099+.1)*17;c=fract(c*.3183099+.1)*17;return fract(a*b*c*(a+b+c));},mix=(a,b,t)=>a+(b-a)*t;
 return mix(mix(mix(hash(ix,iy,iz),hash(ix+1,iy,iz),fx),mix(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),fx),fy),mix(mix(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),fx),mix(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),fx),fy),fz);
}
export function fissureCPU(y,z){return(scalarNoise(y*2.15,z*2.15,11.7)-.5)*.34+(scalarNoise(y*7.3,z*7.3,4.1)-.5)*.080+(scalarNoise(y*31,z*31,2.9)-.5)*.026+Math.sin(y*1.8+z*.45)*.075;}
export const fractureFieldGLSL=`float fissure(vec3 p){return(noise(vec3(p.yz*2.15,11.7))-.5)*.34+(noise(vec3(p.yz*7.3,4.1))-.5)*.080+(noise(vec3(p.yz*31.,2.9))-.5)*.026+sin(p.y*1.8+p.z*.45)*.075;}`;

// The cut is solved on the sphere itself: x=f(y,z), x²+y²+z²=R².
// Both halves reuse identical boundary samples. Closing never deforms a sphere
// into a wavy ridge, and the opposing cut faces have complementary topography.
export function buildFracturedMoon(radius=1.5,angular=256,surfaceSteps=80,wallSteps=48){
 const boundary=[];
 for(let j=0;j<=angular;j++){
  const a=j/angular*Math.PI*2;let x=0;
  for(let i=0;i<24;i++){const r=Math.sqrt(Math.max(0,radius*radius-x*x));x=fissureCPU(Math.sin(a)*r,Math.cos(a)*r);}
  const r=Math.sqrt(radius*radius-x*x);boundary.push({x,y:Math.sin(a)*r,z:Math.cos(a)*r,a});
 }
 // Close exactly, including Float32 roundoff at the periodic endpoint.
 boundary[angular]={...boundary[0],a:Math.PI*2};
 function finish(p,n,uv,index,rim){
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(index);
  if(n)g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));else g.computeVertexNormals();
  if(rim)g.setAttribute('aRim',new THREE.Float32BufferAttribute(rim,1));g.computeBoundingSphere();return g;
 }
 function triangle(index,p,a,b,c,outward){
  const ax=p[b*3]-p[a*3],ay=p[b*3+1]-p[a*3+1],az=p[b*3+2]-p[a*3+2],bx=p[c*3]-p[a*3],by=p[c*3+1]-p[a*3+1],bz=p[c*3+2]-p[a*3+2];
  const nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx;if(nx*nx+ny*ny+nz*nz<1e-20)return;
  const orientation=outward===0?nx*(p[a*3]+p[b*3]+p[c*3])+ny*(p[a*3+1]+p[b*3+1]+p[c*3+1])+nz*(p[a*3+2]+p[b*3+2]+p[c*3+2]):nx*outward;
  index.push(a,orientation<0?c:b,orientation<0?b:c);
 }
 const shells=[],walls=[];
 for(const side of [-1,1]){
  const p=[],n=[],uv=[],index=[],stride=angular+1;
  for(let r=0;r<=surfaceSteps;r++)for(let j=0;j<=angular;j++){
   const b=boundary[j],t=r/surfaceSteps,phi=THREE.MathUtils.lerp(Math.asin(b.x/radius),side*Math.PI/2,t),x=radius*Math.sin(phi),d=radius*Math.cos(phi),y=d*Math.sin(b.a),z=d*Math.cos(b.a);
   p.push(x,y,z);n.push(x/radius,y/radius,z/radius);uv.push(fract(Math.atan2(z,-x)/(Math.PI*2)),Math.asin(THREE.MathUtils.clamp(y/radius,-1,1))/Math.PI+.5);
  }
  for(let r=0;r<surfaceSteps;r++)for(let j=0;j<angular;j++){const a=r*stride+j,b=a+stride;triangle(index,p,a,b,a+1,0);triangle(index,p,b,b+1,a+1,0);}
  // Repeat the texture at its longitude seam instead of interpolating across
  // an entire atlas inside a narrow triangle.
  const duplicates=new Map();for(let i=0;i<index.length;i+=3){const ids=index.slice(i,i+3),us=ids.map(id=>uv[id*2]);if(Math.max(...us)-Math.min(...us)>.5)for(let k=0;k<3;k++){const id=ids[k];if(uv[id*2]>=.5)continue;if(!duplicates.has(id)){const next=p.length/3;p.push(...p.slice(id*3,id*3+3));n.push(...n.slice(id*3,id*3+3));uv.push(uv[id*2]+1,uv[id*2+1]);duplicates.set(id,next);}index[i+k]=duplicates.get(id);}}
  shells.push({side,geometry:finish(p,n,uv,index)});

  const wp=[fissureCPU(0,0),0,0],wuv=[.5,.5],rim=[0],wi=[];
  for(let r=1;r<=wallSteps;r++)for(let j=0;j<=angular;j++){
   const b=boundary[j],s=r/wallSteps,y=b.y*s,z=b.z*s,bed=scalarNoise(y*4.1+z*.8,z*5.8,3.4),shelves=(Math.floor(bed*9)/9-.5)*.135,rough=((scalarNoise(y*2.3,z*2.3,5.1)-.5)*.24+shelves+(scalarNoise(y*19,z*17,8.7)-.5)*.070+(scalarNoise(y*57,z*61,1.2)-.5)*.028)*(1-s**12);
   wp.push(fissureCPU(y,z)+rough,y,z);wuv.push(y/(radius*2)+.5,z/(radius*2)+.5);rim.push(s);
  }
  for(let j=0;j<angular;j++)triangle(wi,wp,0,1+j,2+j,-side);
  for(let r=0;r<wallSteps-1;r++)for(let j=0;j<angular;j++){const a=1+r*stride+j,b=a+stride;triangle(wi,wp,a,b,a+1,-side);triangle(wi,wp,b,b+1,a+1,-side);}
  walls.push({side,geometry:finish(wp,null,wuv,wi,rim)});
 }
 return{shells,walls,boundary};
}
