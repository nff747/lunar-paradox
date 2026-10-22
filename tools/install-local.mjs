// Install only verified generated HTML/manifests. Never replace scene source,
// user data, credentials, existing archives or remote deployments.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const names=['syzygy','gravity','astrolabe'];
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const items=[];
for(const name of names){
  const built=path.join(root,'build','offline','lunar-'+name),target=path.join(root,'offline-platforms','lunar-'+name);
  const manifest=JSON.parse(await fs.readFile(path.join(built,'BUILD.json'),'utf8')),html=await fs.readFile(path.join(built,'index.html'));
  if(hash(await fs.readFile(path.join(target,'scene-source.html')))!==manifest.sourceSha256||hash(html)!==manifest.htmlSha256)throw Error('Stale or invalid build: '+name);
  if(!manifest.dependencies)throw Error('Missing complete dependency receipt: '+name);
  for(const [relative,expected]of Object.entries(manifest.dependencies)){
    const file=relative==='index.html'?'scene-source.html':relative;
    if(hash(await fs.readFile(path.join(target,file)))!==expected)throw Error('Source changed after build: '+name+'/'+file);
  }
  items.push({name,built,target,html,manifest});
}
const backup=path.join(root,'.local-backups','install-'+Date.now());await fs.mkdir(backup,{recursive:true,mode:0o700});
for(const item of items){
  const previous=path.join(backup,item.name);await fs.mkdir(previous,{mode:0o700});
  for(const filename of ['index.html','BUILD.json']){
    const dest=path.join(item.target,filename);try{await fs.copyFile(dest,path.join(previous,filename));await fs.chmod(path.join(previous,filename),0o600);}catch(err){if(err.code!=='ENOENT')throw err;}
    const stage=dest+'.staged';await fs.copyFile(path.join(item.built,filename),stage);await fs.rename(stage,dest);
  }
}
const rootEntry=path.join(root,'index.html');await fs.copyFile(rootEntry,path.join(backup,'root-index.html'));await fs.chmod(path.join(backup,'root-index.html'),0o600);
await fs.writeFile(rootEntry+'.staged',items[0].html);await fs.rename(rootEntry+'.staged',rootEntry);
console.log(JSON.stringify({installed:items.map(x=>({scene:x.name,sourceSha256:x.manifest.sourceSha256,htmlSha256:x.manifest.htmlSha256})),backup,rootEntry:'Generated from canonical Syzygy; no external deployment performed'},null,2));
