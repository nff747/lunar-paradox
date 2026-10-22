import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('search metadata exposes only useful, canonical public pages',()=>{
  const robots=read('robots.txt');
  const sitemap=read('sitemap.xml');
  assert.match(robots,/Sitemap: https:\/\/lunarparadox\.com\/sitemap\.xml/);
  assert.match(sitemap,/<loc>https:\/\/lunarparadox\.com\/<\/loc>/);
  assert.match(sitemap,/<loc>https:\/\/lunarparadox\.com\/studio<\/loc>/);
  assert.doesNotMatch(sitemap,/gravity|astrolabe|products|offline-platforms/);
  for(const [scene,url,indexability] of [['syzygy','https://lunarparadox.com/','index,follow'],['gravity','https://lunarparadox.com/labs','noindex,follow'],['astrolabe','https://lunarparadox.com/products','noindex,follow']]){
    const html=read(`offline-platforms/lunar-${scene}/scene-source.html`);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`),scene);
    assert.ok(html.includes(`<meta name="robots" content="${indexability}">`),scene);
    assert.match(html,/<meta name="description" content="[^"]{40,}"/);
    assert.doesNotMatch(html,/<meta name="keywords"/i);
  }
});

test('canonical redirects do not leave legacy scene aliases as rewrites',()=>{
  const config=JSON.parse(read('vercel.json'));
  const redirect=(source)=>config.redirects.find(item=>item.source===source);
  assert.equal(config.outputDirectory,'build/hosted');
  assert.equal(config.buildCommand,'npm run build -- --hosted-only');
  for(const [oldPath,newPath] of [['/gravity','/labs'],['/astrolabe','/products'],['/index.html','/'],['/studio.html','/studio']]){
    assert.equal(redirect(oldPath)?.destination,newPath,oldPath);
    assert.equal(redirect(oldPath)?.permanent,true,oldPath);
  }
  assert.equal(config.rewrites.find(x=>x.source==='/labs')?.destination,'/lunar-gravity/index.html');
  assert.equal(config.rewrites.find(x=>x.source==='/products')?.destination,'/lunar-astrolabe/index.html');
  assert.ok(!config.rewrites.some(x=>['/gravity','/astrolabe'].includes(x.source)));
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
  for(const [scene,entry,base] of [['syzygy','build/hosted/index.html','/'],['gravity','build/hosted/lunar-gravity/index.html','/labs/'],['astrolabe','build/hosted/lunar-astrolabe/index.html','/products/']]){
    const html=read(entry);
    assert.ok(Buffer.byteLength(html)<200_000,`${scene} shell should not inline the texture pack`);
    assert.ok(html.includes(`<base href="${base}">`),scene);
    assert.ok(fs.existsSync(path.join(root,'build/hosted',scene==='syzygy'?'assets':`lunar-${scene}/assets`)),`${scene} assets`);
  }
  assert.match(read('build/hosted/studio.html'),/<title>Studio — Lunar Paradox<\/title>/);
  assert.match(read('build/hosted/studio.html'),/href="https:\/\/lunarparadox\.com\/studio"/);
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
  assert.match(company,/START A TECHNICAL CONVERSATION/);
});
