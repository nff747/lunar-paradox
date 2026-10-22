// Bundle live Three.js code and source textures into a self-contained HTML file.
import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const [sourceArg,targetArg]=process.argv.slice(2);
if(!sourceArg||!targetArg)throw Error('Usage: node build-standalone.mjs SOURCE_DIST TARGET_DIR');
const source=path.resolve(sourceArg),target=path.resolve(targetArg);
const sourceFilename=(await fs.stat(path.join(source,'scene-source.html')).catch(()=>null))?'scene-source.html':'index.html';
const originalHtml=await fs.readFile(path.join(source,sourceFilename),'utf8');
let html=originalHtml;
// Cloud analytics and persistence are hosted-only integrations. Standalone
// files use the existing local session bridge and must not require a network.
html=html.replace(/<script\b[^>]*src=["']\.\/(?:firebase-config|supabase-client)\.js["'][^>]*><\/script>/gi,'');
const match=html.match(/<script\b(?=[^>]*\btype=["']module["'])(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/i);
if(!match)throw Error('Expected one scene ES module');
const assets={};
const mime={'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.ttf':'font/ttf','.woff2':'font/woff2','.svg':'image/svg+xml'};
async function walk(directory){for(const item of await fs.readdir(directory,{withFileTypes:true})){const filename=path.join(directory,item.name);if(item.isDirectory())await walk(filename);else if(mime[path.extname(filename)])assets[path.relative(source,filename).split(path.sep).join('/')]=`data:${mime[path.extname(filename)]};base64,${(await fs.readFile(filename)).toString('base64')}`;}}
await walk(path.join(source,'assets'));
const imports=[];
let code=match[1].replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*/gm,value=>{imports.push(value);return ''});
// TextureLoader still decodes real textures into GPU memory. Only transport is
// embedded; there is no screenshot background or baked animation.
const prelude=`import * as __OfflineTHREE from './vendor/three.module.js';
const __offlineAssets=${JSON.stringify(Object.fromEntries(Object.entries(assets).filter(([name])=>!name.startsWith('assets/fonts/'))))};
const __originalTextureLoad=__OfflineTHREE.TextureLoader.prototype.load;
__OfflineTHREE.TextureLoader.prototype.load=function(url,...args){return __originalTextureLoad.call(this,__offlineAssets[String(url).replace(/^\\.\\//,'')]||url,...args)};\n`;
const result=await build({stdin:{contents:imports.join('\n')+'\n'+prelude+'\n(async()=>{\n'+code+'\n})().catch(error=>{console.error(error);const node=document.createElement("pre");node.style="position:fixed;inset:25%;z-index:99;background:#090b11;color:#eee;padding:25px";node.textContent="WebGL startup failed: "+error.message;document.body.append(node)});',resolveDir:source,sourcefile:'lunar-standalone.js'},bundle:true,write:false,format:'iife',target:'es2022',minify:true,alias:{three:path.join(source,'vendor/three.module.js')},legalComments:'inline'});
const inline=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
html=html.replace(match[0],()=>'<script>'+inline+'</script>');
html=html.replace(/<script\s+type=["']importmap["'][^>]*>[\s\S]*?<\/script>/gi,'');
const fontLink=/<link\b[^>]*href=["']\.\/assets\/fonts\/fonts\.css["'][^>]*>/i;
let fonts=await fs.readFile(path.join(source,'assets/fonts/fonts.css'),'utf8');
fonts=fonts.replace(/url\(['"]?([^'"\)]+)['"]?\)/g,(all,url)=>{const resolved='assets/fonts/'+url.replace(/^\.\//,'');return assets[resolved]?`url('${assets[resolved]}')`:all});
html=html.replace(fontLink,()=>'<style>'+fonts+'</style>');
html=html.replace(/@import\s+url\(['"]?\.\/assets\/fonts\/fonts\.css['"]?\)\s*;/g,()=>fonts);
html=html.replace(/url\(['"]?(\.\/assets\/[^'"\)]+)['"]?\)/g,(all,url)=>assets[url.slice(2)]?`url('${assets[url.slice(2)]}')`:all);
const bridge=await fs.readFile(path.join(source,'session-client.js'),'utf8');
// A source preview can include the separate bridge; exported HTML inlines it.
html=html.replace(/<script[^>]*src=["']\.\/session-client\.js["'][^>]*><\/script>/g,'');
html=html.replace('</body>',()=>'<script>'+bridge.replace(/<\/script/gi,'<\\/script')+'</script></body>');
// Route UI remains a separate editable file; the offline export inlines it.
for(const linked of [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](\.\/[^"']+)["'][^>]*>/gi)]){
  const cssPath=path.resolve(source,linked[1]);if(!cssPath.startsWith(source+path.sep))throw Error('Stylesheet escapes source');
  const css=await fs.readFile(cssPath,'utf8');html=html.replace(linked[0],()=>'<style>'+css+'</style>');
}
const routeScripts=[];
for(const linked of [...html.matchAll(/<script\b[^>]*src=["'](\.\/[^"']+)["'][^>]*><\/script>/gi)]){
  const jsPath=path.resolve(source,linked[1]);if(!jsPath.startsWith(source+path.sep))throw Error('Script escapes source');
  routeScripts.push({module:/\btype=["']module["']/.test(linked[0]),code:(await fs.readFile(jsPath,'utf8')).replace(/<\/script/gi,'<\\/script')});html=html.replace(linked[0],'');
}
html=html.replace('</body>',()=>routeScripts.map(({module,code})=>'<script'+(module?' type="module"':'')+'>'+code+'</script>').join('')+'</body>');
await fs.mkdir(target,{recursive:true});
await fs.writeFile(path.join(target,'index.html'),html);
await fs.writeFile(path.join(target,'scene-source.html'),originalHtml);
const dependencies={};
async function dependencyWalk(dir){for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const file=path.join(dir,entry.name);if(entry.isDirectory())await dependencyWalk(file);else if(entry.isFile()&&entry.name!=='BUILD.json'&&!(sourceFilename==='scene-source.html'&&entry.name==='index.html')){const rel=path.relative(source,file).split(path.sep).join('/');dependencies[rel]=crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');}}}
await dependencyWalk(source);
await fs.writeFile(path.join(target,'BUILD.json'),JSON.stringify({format:'standalone-live-webgl',sourceSha256:crypto.createHash('sha256').update(originalHtml).digest('hex'),htmlSha256:crypto.createHash('sha256').update(html).digest('hex'),dependencies,embeddedTextureAndFontCount:Object.keys(assets).length,bundledEngine:'Three.js r170'},null,2));
console.log(JSON.stringify({output:path.join(target,'index.html'),bytes:Buffer.byteLength(html),embeddedAssets:Object.keys(assets).length}));
