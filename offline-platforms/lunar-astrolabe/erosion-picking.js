// CPU counterpart of the visual rock mask. Raycasts otherwise hit invisible
// triangles discarded by the lunar material and block the rings behind them.
const fract=x=>x-Math.floor(x),mix=(a,b,t)=>a+(b-a)*t;
function hash(x,y,z){x=fract(x*.3183099+.17)*17;y=fract(y*.3183099+.31)*17;z=fract(z*.3183099+.53)*17;return fract(x*y*z*(x+y+z));}
function noise(x,y,z){const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z);let fx=fract(x),fy=fract(y),fz=fract(z);fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);fz=fz*fz*(3-2*fz);return mix(mix(mix(hash(ix,iy,iz),hash(ix+1,iy,iz),fx),mix(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),fx),fy),mix(mix(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),fx),mix(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),fx),fy),fz);}
export function visibleRockAt({x,y,z},amount){const mass=noise(x*5,y*5,z*5),islands=(noise(x*24,y*24,z*24)-.5)*.20+(noise(x*63,y*63,z*63)-.5)*.08+(mass-.5)*.11;let u=Math.max(0,Math.min(1,(y-.91)/(1.69-.91)));u=u*u*(3-2*u);const edge=y*.57+Math.sin(y*3.7+(mass-.5)*4+z*9)*.07+Math.sin(y*11.9+z*17)*.019+amount-.86*u+islands;return x<=edge;}
