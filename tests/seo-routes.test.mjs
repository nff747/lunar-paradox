import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('home metadata is valid and avoids unsupported guarantees',()=>{
  const html=read('offline-platforms/lunar-syzygy/scene-source.html');
  const json=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(json);
  const data=JSON.parse(json[1]);
  assert.ok(data['@graph'].some(item=>item['@type']==='Organization'));
  assert.doesNotMatch(json[1],/60 FPS|air.gapped|zero.server|zero remote data|performance hardening sprint/i);
  const descriptions=[...html.matchAll(/<meta (?:name="description"|property="og:description"|name="twitter:description") content="([^"]*)">/g)].map(m=>m[1]);
  assert.equal(descriptions.length,3);
  assert.equal(new Set(descriptions).size,1);
});

test('product sitemap uses the canonical URL of each product page',()=>{
  const sitemap=read('sitemap-products.xml');
  const tools=['pbr-synth','optim-compressor','resonance-dsp','cipher-workbench'];
  const libraries=['hyper-splat-engine','neural-texture-engine','turbo-ring-ipc','spatial-glass-ui','tensor-cloth-wgsl','meshlet-culling-wgsl'];
  const games=['the-lazy-billionaire'];
  for(const id of [...tools,...libraries,...games]){
    const url=`https://products.lunarparadox.com/${id}`;
    const page=read(`offline-platforms/lunar-astrolabe/${tools.includes(id)?'tools':'products'}/${id}/index.html`);
    assert.ok(sitemap.includes(`<loc>${url}</loc>`),id);
    assert.ok(page.includes(`<link rel="canonical" href="${url}">`),id);
  }
  assert.doesNotMatch(sitemap,/<lastmod>/,'generation time is not a content modification date');
});

test('search metadata exposes only useful, canonical public pages',()=>{
  const robots=read('robots.txt');
  const sitemap=read('sitemap.xml');
  assert.match(robots,/Sitemap: https:\/\/lunarparadox\.com\/sitemap\.xml/);
  assert.match(robots,/Sitemap: https:\/\/products\.lunarparadox\.com\/sitemap\.xml/);
  assert.match(robots,/Sitemap: https:\/\/labs\.lunarparadox\.com\/sitemap\.xml/);
  assert.doesNotMatch(robots,/studio\.lunarparadox\.com/);
  assert.match(sitemap,/<loc>https:\/\/lunarparadox\.com\/<\/loc>/);
  assert.match(sitemap,/<loc>https:\/\/lunarparadox\.com\/privacy<\/loc>/);
  assert.match(sitemap,/<loc>https:\/\/products\.lunarparadox\.com\/<\/loc>/);
  assert.match(sitemap,/<loc>https:\/\/labs\.lunarparadox\.com\/<\/loc>/);
  assert.doesNotMatch(sitemap,/studio\.lunarparadox\.com/);
  assert.doesNotMatch(sitemap,/<loc>https:\/\/lunarparadox\.com\/(studio|labs|products)<\/loc>/);
  assert.doesNotMatch(sitemap,/lunar-gravity|lunar-astrolabe|offline-platforms/);
  assert.ok(fs.existsSync(path.join(root,'LICENSE')),'LICENSE must exist');
  assert.ok(fs.existsSync(path.join(root,'NOTICE')),'NOTICE must exist');
  assert.ok(fs.existsSync(path.join(root,'privacy.html')),'privacy.html must exist');
  assert.equal(read('2f14973382e9477eaff927a5e0820004.txt').trim(),'2f14973382e9477eaff927a5e0820004');
  for(const [scene,url] of [['syzygy','https://lunarparadox.com/'],['gravity','https://labs.lunarparadox.com/'],['astrolabe','https://products.lunarparadox.com/']]){
    const html=read(`offline-platforms/lunar-${scene}/scene-source.html`);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`),scene);
    assert.match(html,/<meta name="robots" content="index,\s*follow/i,scene);
    assert.match(html,/<meta name="description" content="[^"]{40,}"/);
  }
});

test('canonical redirects do not leave legacy scene aliases as rewrites',()=>{
  const config=JSON.parse(read('vercel.json'));
  const redirect=(source)=>config.redirects.find(item=>item.source===source);
  assert.equal(config.outputDirectory,'build/hosted');
  assert.equal(config.buildCommand,'npm run build -- --hosted-only');
  for(const [oldPath,newPath] of [
    ['/gravity','https://labs.lunarparadox.com'],
    ['/astrolabe','https://products.lunarparadox.com'],
    ['/index.html','/'],
    ['/studio.html','/#/studio'],
    ['/studio','/#/studio'],
    ['/labs','https://labs.lunarparadox.com'],
    ['/products','https://products.lunarparadox.com']
  ]){
    assert.equal(redirect(oldPath)?.destination,newPath,oldPath);
    assert.equal(redirect(oldPath)?.permanent,true,oldPath);
  }
  assert.ok(!config.rewrites.some(x=>['/gravity','/astrolabe','/studio','/labs','/products'].includes(x.source)));
});

test('Vercel deployment input retains the scripts required by its build command',()=>{
  const ignored=read('.vercelignore').split(/\r?\n/).map(line=>line.trim());
  assert.ok(!ignored.includes('tools/'),'build tools must be available in the deployment build context');
  assert.ok(fs.existsSync(path.join(root,'tools/build.mjs')));
  assert.ok(fs.existsSync(path.join(root,'tools/build-scene.mjs')));
  assert.equal(JSON.parse(read('vercel.json')).buildCommand,'npm run build -- --hosted-only');
});

test('clean Labs and Products entries do not add duplicate hash landing routes',()=>{
  for(const scene of ['gravity','astrolabe']){
    const company=read(`offline-platforms/lunar-${scene}/company.js`);
    assert.match(company,/const pathRoute=\(\)=>\{if\(location\.hash\)return '';/,scene);
    assert.match(company,/if\(!location\.hash&&!pathRoute\(\)\)history\.replaceState/,scene);
  }
  assert.match(read('offline-platforms/lunar-gravity/experience.js'),/if\(!location\.hash&&!window\.lunarCompany\?\.isCompanyHash\(\)\)/);
  for(const scene of ['syzygy','gravity','astrolabe']) assert.match(read(`offline-platforms/lunar-${scene}/company.js`),/if\(route&&target===scene&&current===route&&!location\.hash\)return route/,scene);
  assert.match(read('offline-platforms/lunar-syzygy/experience.js'),/isCompanyHash\(\)&&location\.hash&&/);
});

test('hosted HTML stays small and resolves per-scene modules and textures separately',()=>{
  for(const [scene,entry,base] of [['syzygy','build/hosted/lunar-syzygy/index.html','/'],['gravity','build/hosted/lunar-gravity/index.html','/labs/'],['astrolabe','build/hosted/lunar-astrolabe/index.html','/products/']]){
    const html=read(entry);
    assert.ok(Buffer.byteLength(html)<200_000,`${scene} shell should not inline the texture pack`);
    assert.ok(html.includes(`<base href="${base}">`),scene);
    assert.ok(fs.existsSync(path.join(root,'build/hosted',scene==='syzygy'?'assets':`lunar-${scene}/assets`)),`${scene} assets`);
  }
});

test('scene startup affordances do not print loading copy over the model',()=>{
  const syzygy=read('offline-platforms/lunar-syzygy/scene-source.html');
  const gravity=read('offline-platforms/lunar-gravity/scene-source.html');
  const astrolabe=read('offline-platforms/lunar-astrolabe/scene-source.html');
  assert.match(syzygy,/<div class="loading" id="loading" role="status" aria-label="Rendering 3D scene"><\/div>/);
  assert.match(gravity,/<div class="loading" id="loading" role="status" aria-label="Rendering 3D scene"><\/div>/);
  assert.match(astrolabe,/<div class="status" id="status" role="status" hidden><\/div>/);
});

test('Studio page does not present unverified technical proof claims',()=>{
  const company=read('offline-platforms/lunar-syzygy/company.js');
  assert.doesNotMatch(company,/Selected Technical Proof|cohesive zone model|P95|finite-depth dispersion|planar reflection probe/i);
  assert.match(company,/href="#\/commission"[^>]*>APPLY TO WORK WITH US/);
});

test('platform subdomains resolve their prefixed assets before the host catch-all',()=>{
 const config=JSON.parse(read('vercel.json'));
 for(const [host,prefix,folder] of [['labs.lunarparadox.com','labs','lunar-gravity'],['products.lunarparadox.com','products','lunar-astrolabe']]){
  const asset=config.rewrites.findIndex(rule=>rule.source===`/${prefix}/:path*`&&rule.has?.some(item=>item.value===host));
  const general=config.rewrites.findIndex(rule=>rule.source==='/:path*'&&rule.has?.some(item=>item.value===host));
  assert(asset>=0&&asset<general);assert.equal(config.rewrites[asset].destination,`/${folder}/:path*`);
 }
});
