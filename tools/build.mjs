import {updateContentSecurity} from './content-security.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {versionHostedAssets} from './hosted-assets.mjs';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Sync canonical content module and offline snapshots from published-content.js
const publishedRaw = await fs.readFile(path.join(root, 'published-content.js'), 'utf8');
const jsonStr = publishedRaw.replace(/^[\s\S]*?window\.LUNAR_PUBLISHED_CONTENT\s*=\s*/, '').replace(/;\s*$/, '');
const canonicalCode = `/* Generated from published-content.js - do not edit directly */\nexport const CANONICAL_CONTENT = ${jsonStr.trim()};\n`;
await fs.writeFile(path.join(root, 'lib', 'canonical-content.js'), canonicalCode);
for(const name of ['syzygy','gravity','astrolabe']){
  await fs.copyFile(path.join(root, 'published-content.js'), path.join(root, 'offline-platforms', 'lunar-'+name, 'published-content.js'));
}

// Run product landing pages generator
execFileSync(process.execPath, [path.join(root, 'tools', 'generate-product-pages.mjs')], {stdio: 'inherit'});

const all=['syzygy','gravity','astrolabe'];
const selected=process.argv.includes('--scene')?process.argv[process.argv.indexOf('--scene')+1]:null;
if(selected&&!all.includes(selected))throw Error('Unknown scene');
const names=selected?[selected]:all;
const manifest={sourceContract:'offline-platforms/lunar-<scene>/scene-source.html + adjacent modules/assets',scenes:{}};
for(const name of names){
  const src=path.join(root,'offline-platforms','lunar-'+name);
  const hostedRoot=path.join(root,'build','hosted');
  const dest=name==='syzygy'?hostedRoot:path.join(hostedRoot,'lunar-'+name);
  const staging=await fs.mkdtemp(path.join(root,`build-${name}-`));
  try{
    for(const entry of await fs.readdir(src,{withFileTypes:true})){
      if(entry.isDirectory()&&['assets','vendor','tools','products'].includes(entry.name))await fs.cp(path.join(src,entry.name),path.join(staging,entry.name),{recursive:true});
      else if(entry.isFile()&&/\.(js|css)$/.test(entry.name))await fs.copyFile(path.join(src,entry.name),path.join(staging,entry.name));
    }
    let html=await fs.readFile(path.join(src,'scene-source.html'),'utf8');
    const base=name==='syzygy'?'/':name==='gravity'?'/labs/':'/products/';
    html=html.replace('<head>','<head><base href="'+base+'">');
    const versioned=await versionHostedAssets(src,staging,html);html=versioned.html;
    if(name==='syzygy'){
      await fs.mkdir(path.join(staging,'lunar-syzygy'),{recursive:true});
      await fs.writeFile(path.join(staging,'lunar-syzygy','index.html'),html);
    }else{
      await fs.writeFile(path.join(staging,'index.html'),html);
    }
    // A Syzygy-only rebuild replaces the hosted root. Preserve its sibling
    // platform exports so updating the hero cannot remove Labs or Products.
    if(selected==='syzygy')for(const sibling of ['lunar-gravity','lunar-astrolabe']){
      const existing=path.join(hostedRoot,sibling);
      if(await fs.stat(existing).catch(()=>null))await fs.cp(existing,path.join(staging,sibling),{recursive:true});
    }
    await fs.mkdir(path.dirname(dest),{recursive:true});
    // Only generated build paths may be replaced; canonical source/private data are untouched.
    await fs.rm(dest,{recursive:true,force:true});
    await fs.rename(staging,dest);
    const entryRel=name==='syzygy'?path.join('lunar-syzygy','index.html'):'index.html';
    manifest.scenes[name]={codeVersion:versioned.version,sourceSha256:crypto.createHash('sha256').update(html).digest('hex'),entry:path.relative(root,path.join(dest,entryRel))};
    if(!process.argv.includes('--hosted-only')){
      const offline=path.join(root,'build','offline','lunar-'+name);
      await fs.mkdir(offline,{recursive:true});
      execFileSync(process.execPath,[path.join(root,'tools','build-scene.mjs'),src,offline],{stdio:'inherit'});
      // Offline exports build from the unmodified canonical source; the hosted
      // copy gets its deployment-specific base URL above.
      for(const file of await fs.readdir(src))if(/\.(js|css)$/.test(file))await fs.copyFile(path.join(src,file),path.join(offline,file));
      const toolsSrc=path.join(src,'tools');
      if(await fs.stat(toolsSrc).then(s=>s.isDirectory()).catch(()=>false))await fs.cp(toolsSrc,path.join(offline,'tools'),{recursive:true});
    }
  }finally{await fs.rm(staging,{recursive:true,force:true});}
}
if(!selected||selected==='syzygy'){
  const hostedRoot=path.join(root,'build','hosted');
  for(const file of ['robots.txt','sitemap.xml','privacy.html','LICENSE','NOTICE','dde56fa386cb4658a58b46b8ee03020a.txt']) {
    const srcFile = path.join(root, file);
    if(await fs.stat(srcFile).catch(()=>null)) {
      await fs.copyFile(srcFile, path.join(hostedRoot, file));
    }
  }
  for(const asset of ['favicon.ico','favicon.svg','og-image.png','site.webmanifest']) {
    const srcAsset = path.join(root, 'assets', asset);
    if(await fs.stat(srcAsset).catch(()=>null)) {
      await fs.copyFile(srcAsset, path.join(hostedRoot, asset));
    }
  }
  // Subdomain robots, sitemaps, and IndexNow keys (Products & Labs only)
  const subdomainSitemaps = {
    'lunar-astrolabe': 'sitemap-products.xml',
    'lunar-gravity': 'sitemap-labs.xml'
  };
  for(const [plat, sitemapFile] of Object.entries(subdomainSitemaps)){
    const platDir = path.join(hostedRoot, plat);
    if(await fs.stat(platDir).catch(()=>null)) {
      await fs.copyFile(path.join(root, 'robots.txt'), path.join(platDir, 'robots.txt'));
      await fs.copyFile(path.join(root, sitemapFile), path.join(platDir, 'sitemap.xml'));
      const indexNowKey = 'dde56fa386cb4658a58b46b8ee03020a.txt';
      if(await fs.stat(path.join(root, indexNowKey)).catch(()=>null)) {
        await fs.copyFile(path.join(root, indexNowKey), path.join(platDir, indexNowKey));
      }
      for(const asset of ['favicon.ico','favicon.svg','og-image.png','site.webmanifest']) {
        const srcAsset = path.join(root, 'assets', asset);
        if(await fs.stat(srcAsset).catch(()=>null)) {
          await fs.copyFile(srcAsset, path.join(platDir, asset));
        }
      }
    }
  }
}
await updateContentSecurity(root);
await fs.mkdir(path.join(root,'build'),{recursive:true});
await fs.writeFile(path.join(root,'build','manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
