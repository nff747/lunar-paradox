import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';

// A scene-wide code fingerprint keeps inline imports, import maps and nested
// module imports on one Three.js instance. Canonical/offline sources are intact.
export function versionCode(source,version){
  if(!/^[a-f0-9]{12}$/.test(version))throw Error('Invalid build fingerprint');
  return source.replace(/(["'])((?:\.{1,2}\/|three\/addons\/)[^"'?#\s]+\.(?:js|css))\1/g,(_,quote,url)=>quote+url+'?v='+version+quote);
}
export async function versionHostedAssets(source,staging,html){
  const code=[];
  async function walk(folder){for(const item of (await fs.readdir(folder,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const file=path.join(folder,item.name);if(item.isDirectory())await walk(file);else if(/\.(js|css)$/.test(item.name))code.push(path.relative(staging,file));}}
  await walk(staging);
  const digest=createHash('sha256').update(html);
  for(const name of code)digest.update(name).update(await fs.readFile(path.join(staging,name)));
  const version=digest.digest('hex').slice(0,12);
  for(const name of code){const file=path.join(staging,name);await fs.writeFile(file,versionCode(await fs.readFile(file,'utf8'),version));}
  return {html:versionCode(html,version),version};
}
