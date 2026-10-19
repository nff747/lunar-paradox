// Execute the original deterministic Canvas2D fracture path generator against
// an SVG recorder, then rasterize it offline. UV geometry and PRNG are unchanged.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const source=path.resolve(process.argv[2]||'outputs/lunar-syzygy/dist');
const html=await fs.readFile(path.join(source,'index.html'),'utf8');
const existing=path.resolve('work/runtime/syzygy-fault-generator-source.js');
let code;
const start=html.indexOf("const faultCanvas=document.createElement('canvas');"),end=html.indexOf('const fractureTexture=',start);
if(start>=0&&end>start){code=html.slice(start,end);await fs.writeFile(existing,code);}
else code=await fs.readFile(existing,'utf8');
const elements=[],gradients=[];
let strokes=0,hotnodes=0,currentPath=[],currentScale=[1,1];
function paint(color){
  if(typeof color==='object')return 'url(#'+color.id+')';
  if(color==='#000')return '#000000';
  const values=color.match(/[\d.]+/g)?.map(Number);
  return values?'rgb('+values.slice(0,3).join(',')+')':color;
}
const ctx={
  fillStyle:'#000',strokeStyle:'#000',lineWidth:1,lineJoin:'miter',
  scale(x,y){currentScale=[currentScale[0]*x,currentScale[1]*y];},
  beginPath(){currentPath=[];},
  moveTo(x,y){currentPath.push('M'+x+','+y);},
  lineTo(x,y){currentPath.push('L'+x+','+y);},
  stroke(){elements.push('<path d="'+currentPath.join(' ')+'" fill="none" stroke="'+paint(this.strokeStyle)+'" stroke-width="'+this.lineWidth+'" stroke-linejoin="'+this.lineJoin+'" transform="scale('+currentScale.join(' ')+')"/>');strokes++;},
  fillRect(x,y,w,h){if(typeof this.fillStyle==='object')hotnodes++;elements.push('<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+paint(this.fillStyle)+'" transform="scale('+currentScale.join(' ')+')"/>');},
  createRadialGradient(x0,y0,r0,x1,y1,r1){
    const gradient={id:'g'+gradients.length,x0,y0,r0,x1,y1,r1,stops:[],addColorStop(offset,color){this.stops.push({offset,color});}};gradients.push(gradient);return gradient;
  }
};
const canvas={width:4096,height:2048,getContext:()=>ctx};
vm.runInNewContext(code,{document:{createElement:()=>canvas},Math},{timeout:10000});
const defs=gradients.map(g=>'<radialGradient id="'+g.id+'" gradientUnits="userSpaceOnUse" cx="'+g.x1+'" cy="'+g.y1+'" r="'+g.r1+'" fx="'+g.x0+'" fy="'+g.y0+'">'+g.stops.map(s=>'<stop offset="'+s.offset+'" stop-color="'+paint(s.color)+'" stop-opacity="'+(s.color.includes('/ 0')?'0':'1')+'"/>').join('')+'</radialGradient>').join('');
const svg='<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="2048" viewBox="0 0 4096 2048"><defs>'+defs+'</defs>'+elements.join('')+'</svg>';
const svgPath=path.resolve('work/runtime/syzygy-fault-field.svg'),output=path.join(source,'assets/fault-field.png');await fs.writeFile(svgPath,svg);
execFileSync('convert',['-background','black',svgPath,'-depth','8','-strip','-define','png:color-type=2',output],{timeout:120000,maxBuffer:2048*1024});
const raw=execFileSync('convert',[output,'-depth','8','rgb:-'],{maxBuffer:4096*2048*3+1024});
let nonzeroRed=0,nonzeroGreen=0,maxRed=0,maxGreen=0,redSum=0,greenSum=0;
for(let i=0;i<raw.length;i+=3){const red=raw[i],green=raw[i+1];if(red)nonzeroRed++;if(green)nonzeroGreen++;maxRed=Math.max(maxRed,red);maxGreen=Math.max(maxGreen,green);redSum+=red;greenSum+=green;if(raw[i+2])throw Error('Unexpected blue field contribution');}
if(strokes<10000||!hotnodes||!nonzeroRed||!nonzeroGreen)throw Error('Empty or incomplete fracture field');
const metadata={schema:'lunar-fault-field.v1',width:4096,height:2048,channels:{red:'embedded angular mineral fracture mask',green:'sparse branch junction energy sites',blue:'unused'},generator:'Original seeded fractureBranch Canvas2D geometry recorded as SVG paths/radial gradients; rasterized offline by ImageMagick',seed:194357,paths:strokes,hotnodes,nonzeroRed,nonzeroGreen,maxRed,maxGreen,redSum,greenSum,sourceSha256:crypto.createHash('sha256').update(code).digest('hex'),pngSha256:crypto.createHash('sha256').update(await fs.readFile(output)).digest('hex'),note:'Path topology, per-segment color, width, PRNG calls and gradient geometry preserved. SVG raster antialiasing can differ slightly from browser Canvas2D.'};
await fs.writeFile(path.join(source,'assets/fault-field.json'),JSON.stringify(metadata,null,2)+'\n');console.log(JSON.stringify(metadata,null,2));
