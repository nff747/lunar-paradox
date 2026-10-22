import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

for(const scene of ['syzygy','gravity','astrolabe']){
 const source=fs.readFileSync(new URL(`../offline-platforms/lunar-${scene}/company.js`,import.meta.url),'utf8');
 const code=source.slice(source.indexOf('function catalogue(name){'),source.indexOf('function home()'));
 function render(records){const ctx=vm.createContext({content:{experiments:records,products:records},filter:'',collection:'',link:()=>'<a href="#/commission">Contact</a>',recordMarkup:r=>`<article>${r.title}</article>`,esc:v=>String(v).replaceAll('<','&lt;')});vm.runInContext(code+';this.output=catalogue("products");',ctx);return ctx.output;}
 test(`${scene}: unpublished collection contains no fake programme or empty card`,()=>{const html=render([]);assert.match(html,/<h1[^>]*>Products/);assert.doesNotMatch(html,/Q4|private testing|Pipeline Active|0 published|lc-empty|verified|<article|<select/);});
 test(`${scene}: only published records appear without ornamental filler`,()=>{const html=render([{status:'draft',title:'PRIVATE_DRAFT',category:'AI'},{status:'published',title:'Real release',category:'Tools'}]);assert.match(html,/Real release/);assert.doesNotMatch(html,/PRIVATE_DRAFT|<select/);});
}
