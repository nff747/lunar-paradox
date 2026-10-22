import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const scratch=await fs.mkdtemp(path.join(os.tmpdir(),'lunar-rebuild-'));
const scenes=['syzygy','gravity','astrolabe'];
try{
  await fs.mkdir(path.join(scratch,'tools'));
  for(const file of ['package.json','package-lock.json','tools/build.mjs','tools/build-scene.mjs'])await fs.copyFile(path.join(root,file),path.join(scratch,file));
  for(const scene of scenes){
    const src=path.join(root,'offline-platforms','lunar-'+scene),dst=path.join(scratch,'offline-platforms','lunar-'+scene);await fs.mkdir(dst,{recursive:true});
    for(const item of await fs.readdir(src,{withFileTypes:true}))if((item.isDirectory()&&['assets','vendor'].includes(item.name))||(item.isFile()&&(/\.(js|css)$/.test(item.name)||item.name==='scene-source.html')))await fs.cp(path.join(src,item.name),path.join(dst,item.name),{recursive:true});
  }
  execFileSync('npm',['ci','--offline','--no-audit','--no-fund'],{cwd:scratch,stdio:'pipe'});
  execFileSync(process.execPath,['tools/build.mjs'],{cwd:scratch,stdio:'pipe'});
  const results=[];
  for(const scene of scenes){
    const file=path.join('build','offline','lunar-'+scene,'BUILD.json');
    const a=JSON.parse(await fs.readFile(path.join(root,file),'utf8')),b=JSON.parse(await fs.readFile(path.join(scratch,file),'utf8'));
    if(a.htmlSha256!==b.htmlSha256||JSON.stringify(a.dependencies)!==JSON.stringify(b.dependencies))throw Error('Rebuild mismatch: '+scene);
    results.push({scene,htmlSha256:a.htmlSha256,dependencyFiles:Object.keys(a.dependencies).length,match:true});
  }
  const receipt={recordedAt:new Date().toISOString(),freshDirectory:true,offlineNpmInstall:true,oldWorkspaceAccessRequired:false,results};
  const evidence=path.join(root,'evidence','F005');await fs.mkdir(evidence,{recursive:true});await fs.writeFile(path.join(evidence,'isolated-rebuild.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
}finally{await fs.rm(scratch,{recursive:true,force:true});}
