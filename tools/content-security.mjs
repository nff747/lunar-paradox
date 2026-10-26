import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';
export async function updateContentSecurity(root){
  const hostedDir = path.join(root, 'build/hosted');
  async function findHtml(dir) {
    let out = [];
    try {
      const entries = await fs.readdir(dir, {withFileTypes: true});
      for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) out = out.concat(await findHtml(full));
        else if (ent.isFile() && ent.name.endsWith('.html')) out.push(full);
      }
    } catch(e) { if (e.code !== 'ENOENT') throw e; }
    return out;
  }
  const htmlFiles = await findHtml(hostedDir);
  const hashes = new Set();
  for(const fullPath of htmlFiles){
    const html = await fs.readFile(fullPath, 'utf8');
    for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
      if(/\bsrc\s*=/i.test(match[1])||!match[2].trim())continue;
      hashes.add("'sha256-"+createHash('sha256').update(match[2]).digest('base64')+"'");
    }
  }
 const policy=["default-src 'self'","script-src 'self' blob: "+[...hashes].sort().join(' '),"style-src 'self' 'unsafe-inline'","img-src 'self' https: data: blob:","font-src 'self' data:","connect-src 'self'","worker-src 'self' blob:","media-src 'self' blob: data:","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'self'","upgrade-insecure-requests"].join('; ');
 const configPath=path.join(root,'vercel.json'),config=JSON.parse(await fs.readFile(configPath,'utf8'));const global=config.headers.find(item=>item.source==='/(.*)');let header=global.headers.find(h=>h.key==='Content-Security-Policy');
 if(process.env.VERCEL==='1'){if(header?.value!==policy)throw Error('CSP hashes are stale. Run the full local build and include vercel.json in the reviewed release.');}
 else{if(header)header.value=policy;else global.headers.push({key:'Content-Security-Policy',value:policy});await fs.writeFile(configPath,JSON.stringify(config,null,2)+'\n');}
 return policy;
}
