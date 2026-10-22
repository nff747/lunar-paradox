// One-time, bounded reconciliation of unsupported catalogue copy across the
// existing per-scene company controllers; no publisher records are modified.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const catalogue=String.raw`function catalogue(name){
  collection=name;
  const items=content[name].filter(r=>r.status==='published');
  const categories=[...new Set(items.map(r=>r.category).filter(Boolean))];
  if(!categories.includes(filter))filter='';
  const lab=name==='experiments';
  return \`<section class="lc-intro lc-catalogue-intro lc-\${lab?'labs':'products'}">
    <p class="lc-eyebrow">LUNAR PARADOX / \${lab?'RESEARCH':'PRODUCTS'}</p>
    <h1 tabindex="-1">\${lab?'Labs':'Products'}</h1>
    \${items.length?'<p class="lc-catalogue-status">Published '+(lab?'experiments':'products')+'</p>':''}
    \${link('syzygy','commission',lab?'PROPOSE A COLLABORATION ↗':'WORK WITH US ↗')}
  </section>\${!items.length?'':\`<section class="lc-collection" aria-label="\${lab?'Published experiments':'Published products'}"><div class="lc-collection-head"><h2>\${lab?'Experiments':'Products'}</h2>\${categories.length>1?\`<label>Browse by interest<select data-filter><option value="">All interests</option>\${categories.map(c=>\`<option \${c===filter?'selected':''}>\${esc(c)}</option>\`).join('')}</select></label>\`:''}</div><div class="lc-records">\${items.filter(r=>!filter||r.category===filter).map(r=>recordMarkup(r)).join('')}</div></section>\`}
  \`;
}`.replaceAll('\\`','`').replaceAll('\\${','${');
for(const scene of ['syzygy','gravity','astrolabe']){
  const file=path.join(root,'offline-platforms','lunar-'+scene,'company.js');
  let source=fs.readFileSync(file,'utf8');
  const start=source.indexOf('function catalogue(name){'),end=source.indexOf('function home()',start);
  if(start<0||end<0)throw Error('Catalogue boundary missing');
  source=source.slice(0,start)+catalogue+'\n\n'+source.slice(end);
  source=source.replace(/<div class="lc-funding-model"[\s\S]*?<\/div>/g,'');
  source=source.replace('3-day bounded investigations resolving complex shader math, 60 FPS bottlenecks, or interactive mechanics before full client builds.','Scoped prototype and performance investigations, with deliverables and target devices agreed before work begins.');
  source=source.replace('Integrate battle-tested pull-request code directly into client repo with zero tech debt.','Deliver documented source and agreed integration support.');
  source=source.replace('Continuum Physics Solvers','Simulation & visual systems');
  source=source.replace('Bespoke mathematical modeling for brand reveals, liquid metals, and interactive gravitational mechanics.','Art-directed simulations and custom rendering for interactive experiences.');
  source=source.replace("return '/platforms/'+target+'/index.html#/'+hash;", "return (local?'/platforms/'+target+'/index.html':({syzygy:'/',gravity:'/labs',astrolabe:'/products'}[target]))+'#/'+hash;");
  fs.writeFileSync(file,source);
}
