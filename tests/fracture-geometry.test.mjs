import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildFracturedMoon} from '../offline-platforms/lunar-syzygy/fracture-geometry.js';

const cut=buildFracturedMoon();
const key=p=>p.map(v=>Math.abs(v)<1e-6?'0.000000':v.toFixed(6)).join(',');
function inspect(geometries){
  let volume=0,triangles=0,minArea=Infinity;const edges=new Map();
  for(const g of geometries){
    for(const a of Object.values(g.attributes))assert(a.array.every(Number.isFinite));
    const pos=g.attributes.position,idx=g.index.array;
    const point=i=>[pos.getX(i),pos.getY(i),pos.getZ(i)];
    for(let n=0;n<idx.length;n+=3){
      const [a,b,c]=[point(idx[n]),point(idx[n+1]),point(idx[n+2])];
      const ab=b.map((v,i)=>v-a[i]),ac=c.map((v,i)=>v-a[i]),cross=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
      const area=Math.hypot(...cross)/2;assert(area>1e-10,'degenerate triangle');minArea=Math.min(minArea,area);triangles++;
      volume+=(a[0]*(b[1]*c[2]-b[2]*c[1])-a[1]*(b[0]*c[2]-b[2]*c[0])+a[2]*(b[0]*c[1]-b[1]*c[0]))/6;
      for(const [x,y] of [[a,b],[b,c],[c,a]]){const aa=key(x),bb=key(y),k=aa<bb?aa+'|'+bb:bb+'|'+aa;const e=edges.get(k)||{count:0,balance:0};e.count++;e.balance+=aa<bb?1:-1;edges.set(k,e);}
    }
  }
  return {volume,triangles,minArea,openEdges:[...edges.values()].filter(e=>e.count!==2).length,wrongWinding:[...edges.values()].filter(e=>e.count===2&&e.balance!==0).length};
}
test('primary bodies and each removed slab form individually closed finite solids',()=>{
  for(let i=0;i<2;i++){const r=inspect([cut.shells[i].geometry,cut.walls[i].geometry]);assert.equal(r.openEdges,0,`primary ${i}: ${JSON.stringify(r)}`);assert.equal(r.wrongWinding,0);assert(r.volume>0);}
  for(const slab of cut.slabs){const r=inspect([slab.exterior,slab.interior]);assert.equal(r.openEdges,0,`slab ${slab.id}: ${JSON.stringify(r)}`);assert.equal(r.wrongWinding,0,`slab ${slab.id}`);assert(r.volume>0);}
});
test('the complete partition conserves the joined sphere volume without duplicate slabs',()=>{
  const geometries=[...cut.shells,...cut.walls].map(x=>x.geometry).concat(cut.slabs.flatMap(s=>[s.exterior,s.interior]));
  const r=inspect(geometries),analytic=4/3*Math.PI*1.5**3;
  assert(Math.abs(r.volume-analytic)/analytic<.002,JSON.stringify({actual:r.volume,analytic}));
  const wholePrimary=inspect([...cut.shells,...cut.walls].map(x=>x.geometry)).volume;
  const slabs=inspect(cut.slabs.flatMap(s=>[s.exterior,s.interior])).volume;
  assert(slabs>.005,'slabs must occupy real volume');assert(wholePrimary<analytic-slabs*.8,'parents must vacate slab volume');
});
test('all exterior vertices remain on the spherical envelope and pole caps are closed',()=>{
  for(const g of [...cut.shells.map(s=>s.geometry),...cut.slabs.map(s=>s.exterior)]){
    const p=g.attributes.position;for(let i=0;i<p.count;i++)assert(Math.abs(Math.hypot(p.getX(i),p.getY(i),p.getZ(i))-1.5)<3e-7);
  }
  for(const side of [-1,1]){const p=cut.shells.find(s=>s.side===side).geometry.attributes.position;let found=false;for(let i=0;i<p.count;i++)if(p.getX(i)===side*1.5&&p.getY(i)===0&&p.getZ(i)===0)found=true;assert(found);}
});
