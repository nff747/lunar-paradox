// Bake the authored spherical crater function into a linear 16-bit RG height
// field. This is geometry/material data, never a rendered scene image.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const source=path.resolve(process.argv[2]||'outputs/lunar-syzygy/dist');
const html=await fs.readFile(path.join(source,'index.html'),'utf8');
const THREE=await import(pathToFileURL(path.join(source,'vendor/three.module.js')).href);
const expression=html.match(/const impacts=([^;]+);/s)?.[1];
if(!expression)throw Error('Authored impact definitions not found');
const impacts=vm.runInNewContext(expression,{THREE});
if(impacts.length!==24)throw Error('Expected the authored 24 craters');
const width=2048,height=1024,range=.08,channels=Buffer.alloc(width*height*4);
const analytic=(x,y,z)=>{
  const norm=1/Math.hypot(x,y,z);x*=norm;y*=norm;z*=norm;
  let sum=0;
  for(const crater of impacts){
    const q=Math.hypot(x-crater.x,y-crater.y,z-crater.z)/crater.w;
    if(q<1.65){
      const bowl=-Math.pow(Math.max(1-q*q,0),1.65);
      const rim=Math.exp(-Math.pow((q-1)*10,2))*.38;
      const peak=Math.exp(-q*q*70)*.10*(crater.w>=.075?1:0);
      sum+=(bowl+rim+peak)*crater.w*.15;
    }
  }
  return sum;
};
const directions=(u,v)=>{const azimuth=u*Math.PI*2,latitude=(v-.5)*Math.PI,c=Math.cos(latitude);return [-Math.cos(azimuth)*c,Math.sin(latitude),Math.sin(azimuth)*c];};
let min=Infinity,max=-Infinity;
for(let y=0;y<height;y++){
  const v=1-(y+.5)/height;
  for(let x=0;x<width;x++){
    const h=analytic(...directions((x+.5)/width,v));min=Math.min(min,h);max=Math.max(max,h);
    if(h<-.04||h>.04)throw Error('Height exceeds encoding range');
    const encoded=Math.round((h/range+.5)*65535),offset=(y*width+x)*4;
    channels[offset]=encoded>>8;channels[offset+1]=encoded&255;channels[offset+2]=0;channels[offset+3]=255;
  }
}
const output=path.join(source,'assets/impact-field.png'),raw=path.resolve('work/runtime/syzygy-impact-field.rgba');
await fs.writeFile(raw,channels);
execFileSync('convert',['-size',width+'x'+height,'-depth','8','rgba:'+raw,'-strip','-define','png:color-type=6',output]);
await fs.unlink(raw);
const decoded=execFileSync('convert',[output,'-depth','8','rgba:-'],{maxBuffer:width*height*4+1024});
if(decoded.length!==channels.length||!decoded.equals(channels))throw Error('PNG round trip changed height encoding bytes');

// TextureLoader defaults to flipY=true; the north-first PNG is therefore
// addressed by v=asin(y)/PI+.5. Pixel-center arithmetic matches GL_LINEAR.
function lookup(x,y,z){
  const length=Math.hypot(x,y,z);x/=length;y/=length;z/=length;
  const u=((Math.atan2(z,-x)/(2*Math.PI))%1+1)%1,v=Math.asin(Math.max(-1,Math.min(1,y)))/Math.PI+.5;
  const px=u*width-.5,py=(1-v)*height-.5,x0=Math.floor(px),y0=Math.floor(py),fx=px-x0,fy=py-y0;
  function texel(xx,yy){const i=(Math.max(0,Math.min(height-1,yy))*width+((xx%width+width)%width))*4;return ((channels[i]*256+channels[i+1])/65535-.5)*range;}
  return (texel(x0,y0)*(1-fx)+texel(x0+1,y0)*fx)*(1-fy)+(texel(x0,y0+1)*(1-fx)+texel(x0+1,y0+1)*fx)*fy;
}
let seed=152039;
const random=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646;};
const errors={sphere:{count:0,sumSquared:0,max:0},craterFocused:{count:0,sumSquared:0,max:0}};
function check(group,point){
  const expected=analytic(...point),actual=lookup(...point),error=Math.abs(actual-expected);
  if(!Number.isFinite(actual)||!Number.isFinite(expected))throw Error('Nonfinite field sample');
  group.count++;group.sumSquared+=error*error;group.max=Math.max(group.max,error);
}
for(let i=0;i<100000;i++){const y=random()*2-1,angle=random()*Math.PI*2,r=Math.sqrt(1-y*y);check(errors.sphere,[r*Math.cos(angle),y,r*Math.sin(angle)]);}
for(const crater of impacts){
  for(let i=0;i<2000;i++){
    const point=new THREE.Vector3(crater.x,crater.y,crater.z);
    const normal=point.clone().normalize(),tangent=new THREE.Vector3(0,1,0).cross(normal).normalize(),bitangent=normal.clone().cross(tangent).normalize();
    const angle=random()*Math.PI*2,radius=Math.sqrt(random())*crater.w*1.65;
    point.addScaledVector(tangent,Math.cos(angle)*radius).addScaledVector(bitangent,Math.sin(angle)*radius).normalize();
    check(errors.craterFocused,point.toArray());
  }
}
for(const group of Object.values(errors)){group.rms=Math.sqrt(group.sumSquared/group.count);delete group.sumSquared;if(group.max>.0004)throw Error('Bilinear crater field error exceeds 0.0004 U');}
const metadata={schema:'lunar-impact-field.v1',authoredCraterCount:impacts.length,width,height,encoding:'16-bit unsigned height = (R*256+G)/65535; physicalHeight=(encoded-0.5)*0.08',colorSpace:'linear / NoColorSpace',imageRows:'north to south',directionToUv:'u=fract(atan2(z,-x)/2PI), v=asin(y)/PI+0.5',filter:'linear; S repeat, T clamp; no mipmap',range:{min,max},definitionSha256:crypto.createHash('sha256').update(expression).digest('hex'),pngSha256:crypto.createHash('sha256').update(await fs.readFile(output)).digest('hex'),validation:errors};
await fs.writeFile(path.join(source,'assets/impact-field.json'),JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify(metadata,null,2));
