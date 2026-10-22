import * as THREE from './vendor/three.module.js';
import { fissureCPU, scalarNoise } from './fracture-field.js';

// A real partition: each exterior and fault-wall triangle belongs to exactly one
// body. Matching cap faces close both the slab and its vacated primary socket.
export function buildFracturedMoon(radius=1.5, angular=256, surfaceSteps=80, wallSteps=48) {
  const boundary=[];
  for(let j=0;j<=angular;j++){
    const a=j/angular*Math.PI*2;let x=0;
    for(let k=0;k<30;k++){const d=Math.sqrt(Math.max(0,radius*radius-x*x));x=fissureCPU(Math.sin(a)*d,Math.cos(a)*d);}
    const d=Math.sqrt(Math.max(0,radius*radius-x*x));boundary.push({x,y:Math.sin(a)*d,z:Math.cos(a)*d,a});
  }
  boundary[angular]={...boundary[0],a:Math.PI*2};
  const defs=[];
  for(const side of [-1,1])for(let i=0;i<9;i++){
    const start=(i+.18+(side>0?.13:0))*Math.PI*2/9;
    defs.push([side,start,.19+(.5+.5*Math.sin(i*7.13+side))*.18]);
  }
  const depth=Math.max(2,Math.round(surfaceSteps*.14)),inner=Math.round(wallSteps*.86);
  const sectors=defs.map(([side,a,len],id)=>({id,side,start:Math.round(a/(Math.PI*2)*angular),end:Math.round((a+len)/(Math.PI*2)*angular),depth,inner,exterior:sink(),interior:sink()}));
  const shells=[],walls=[],slabs=[];
  function sink(){return {p:[],uv:[],n:[],rim:[]};}
  function point(x,y,z,rim=1){return {v:new THREE.Vector3(x,y,z),rim};}
  function sphericalUV(p){const n=p.v.clone().normalize();return [((Math.atan2(n.z,-n.x)/(Math.PI*2))%1+1)%1,Math.asin(THREE.MathUtils.clamp(n.y,-1,1))/Math.PI+.5];}
  function emit(out,a,b,c,toward,outer=false){
    const normal=new THREE.Vector3().subVectors(b.v,a.v).cross(new THREE.Vector3().subVectors(c.v,a.v));
    if(normal.lengthSq()<1e-20)return;
    if(normal.dot(toward)<0){[b,c]=[c,b];normal.negate();}normal.normalize();
    const vertices=[a,b,c],uv=outer?vertices.map(sphericalUV):vertices.map(p=>[p.v.y/(radius*2)+.5,p.v.z/(radius*2)+.5]);
    if(outer&&Math.max(...uv.map(v=>v[0]))-Math.min(...uv.map(v=>v[0]))>.5)for(const v of uv)if(v[0]<.5)v[0]+=1;
    vertices.forEach((p,i)=>{out.p.push(...p.v);out.n.push(...(outer?p.v.clone().normalize():normal));out.uv.push(...uv[i]);out.rim.push(p.rim);});
  }
  function finish(out,interior=false){
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(out.p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(out.n,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(out.uv,2));if(interior)g.setAttribute('aRim',new THREE.Float32BufferAttribute(out.rim,1));g.setIndex(Array.from({length:out.p.length/3},(_,i)=>i));g.computeBoundingSphere();return g;
  }
  function owner(side,j){return sectors.find(s=>s.side===side&&j>=s.start&&j<s.end);}
  function profile(side,j){
    const sector=sectors.find(s=>s.side===side&&j>=s.start&&j<=s.end);
    if(!sector)return {shell:.015,wall:.985};
    const t=(j-sector.start)/(sector.end-sector.start),arch=Math.pow(Math.max(0,Math.sin(t*Math.PI)),.65);
    // Tapered, eroded tear outlines rather than rectangular constant-depth
    // slots. Both sides of every cap share these exact remapped vertices.
    const erosion=scalarNoise(j*.79,sector.id*1.9,8.1)-.5;
    return {shell:.015+arch*(.045+(sector.id%3)*.012+erosion*.025),wall:.985-arch*(.065+(sector.id%2)*.02+erosion*.025)};
  }
  for(const side of [-1,1]){
    const outer=sink(),inside=sink(),sphere=[],wall=[],profiles=boundary.map((b,j)=>profile(side,j));
    for(let r=0;r<=surfaceSteps;r++){
      sphere[r]=boundary.map((b,j)=>{
        if(r===surfaceSteps)return point(side*radius,0,0);
        const cut=profiles[j].shell;
        const fraction=r<=depth?r/depth*cut:cut+(r-depth)/(surfaceSteps-depth)*(1-cut);
        const phi=THREE.MathUtils.lerp(Math.asin(b.x/radius),side*Math.PI/2,fraction),d=radius*Math.cos(phi);
        return point(radius*Math.sin(phi),d*Math.sin(b.a),d*Math.cos(b.a));
      });
      sphere[r][angular]=point(...sphere[r][0].v);
    }
    for(let r=0;r<=wallSteps;r++){
      wall[r]=boundary.map((b,j)=>{
        const cut=profiles[j].wall;
        const s=r<=inner?r/inner*cut:cut+(r-inner)/(wallSteps-inner)*(1-cut),y=b.y*s,z=b.z*s,bed=scalarNoise(y*4.1+z*.8,z*5.8,3.4),shelves=(Math.floor(bed*9)/9-.5)*.135;
        const rough=((scalarNoise(y*2.3,z*2.3,5.1)-.5)*.24+shelves+(scalarNoise(y*19,z*17,8.7)-.5)*.070+(scalarNoise(y*57,z*61,1.2)-.5)*.028)*(1-s**12);
        return r===0?point(fissureCPU(0,0),0,0,0):r===wallSteps?point(b.x,b.y,b.z,1):point(fissureCPU(y,z)+rough,y,z,s);
      });
      wall[r][angular]=point(...wall[r][0].v,wall[r][0].rim);
    }
    for(let r=0;r<surfaceSteps;r++)for(let j=0;j<angular;j++){
      const candidate=owner(side,j),slab=candidate&&r<candidate.depth?candidate:null,out=slab?slab.exterior:outer;
      const a=sphere[r][j],b=sphere[r+1][j],c=sphere[r][j+1],d=sphere[r+1][j+1];
      emit(out,a,b,c,a.v,true);emit(out,b,d,c,b.v,true);
    }
    for(let r=0;r<wallSteps;r++)for(let j=0;j<angular;j++){
      const candidate=owner(side,j),slab=candidate&&r>=candidate.inner?candidate:null,out=slab?slab.interior:inside;
      const a=wall[r][j],b=wall[r+1][j],c=wall[r][j+1],d=wall[r+1][j+1],normal=new THREE.Vector3(-side,0,0);
      emit(out,a,b,c,normal);emit(out,b,d,c,normal);
    }
    for(const slab of sectors.filter(s=>s.side===side)){
      const depth=slab.depth,inner=slab.inner;
      const mid=Math.round((slab.start+slab.end)/2);
      slab.center=new THREE.Vector3().add(sphere[0][mid].v).add(sphere[depth][mid].v).add(wall[inner][mid].v).multiplyScalar(1/3);
      function cut(a,b,c,direction){
        emit(inside,a,b,c,direction);emit(slab.interior,a,b,c,direction.negate());
      }
      // Inner shelf: exact shared boundary between primary rock and removed slab.
      for(let j=slab.start;j<slab.end;j++){
        const a=sphere[depth][j],b=sphere[depth][j+1],c=wall[inner][j],d=wall[inner][j+1];
        // Preserve the shared boundary orientation even on concave rough caps;
        // a centroid-facing test can incorrectly flip individual triangles.
        const n1=new THREE.Vector3().subVectors(b.v,a.v).cross(new THREE.Vector3().subVectors(c.v,a.v)).multiplyScalar(side);
        const n2=new THREE.Vector3().subVectors(d.v,b.v).cross(new THREE.Vector3().subVectors(c.v,b.v)).multiplyScalar(side);
        cut(a,b,c,n1);cut(b,d,c,n2);
      }
      // Angular side caps follow the curved exterior and rough fault wall.
      for(const j of [slab.start,slab.end]){
        const loop=[];for(let r=0;r<=depth;r++)loop.push(sphere[r][j]);for(let r=inner;r<wallSteps;r++)loop.push(wall[r][j]);
        const a=boundary[j].a,profile=loop.map(p=>new THREE.Vector2(p.v.x,p.v.y*Math.sin(a)+p.v.z*Math.cos(a)));
        const outward=new THREE.Vector3(0,Math.cos(a),-Math.sin(a)).multiplyScalar(j===slab.start?1:-1);
        for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(profile,[]))cut(loop[a],loop[b],loop[c],outward.clone());
      }
      const angle=boundary[mid].a;
      slabs.push({id:slab.id,side,center:slab.center,delay:.07+(1.5-slab.center.y)/3*.68,drift:new THREE.Vector3(side*(.16+.055*(slab.id%3)),Math.sin(angle)*(.18+(slab.id%2)*.09),Math.cos(angle)*(.32+(slab.id%3)*.14)),turn:new THREE.Vector3(side*.31,(slab.id%2?1:-1)*.43,Math.sin(angle)*.24),exterior:finish(slab.exterior),interior:finish(slab.interior,true)});
    }
    shells.push({side,geometry:finish(outer)});walls.push({side,geometry:finish(inside,true)});
  }
  return {shells,walls,slabs,boundary,partition:{angular,surfaceSteps,wallSteps,shellDepth:depth,wallInner:inner,sectors:sectors.map(({id,side,start,end})=>({id,side,start,end}))}};
}
