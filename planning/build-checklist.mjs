import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const draftRoot = path.dirname(fileURLToPath(import.meta.url));
const deliveryRoot = '/home/n1khy/Downloads/lunar paradox';
const plansRoot = '/home/n1khy/Documents/plans';
const masterPath = path.join(deliveryRoot, 'FINAL-PRODUCT-CHECKLIST.md');
const canvasPath = '/home/n1khy/.cursor/projects/empty-window/canvases/lunar-paradox-final-product.canvas.tsx';
const names = { F: 'Foundation', D: 'Design and journeys', V: 'Scenes, assets and audio', P: 'Company and backend', Q: 'Verification and delivery', O: 'Commercial preparation', Z: 'Final acceptance' };

if (process.argv.includes('--assemble')) {
  if (fs.existsSync(masterPath)) throw new Error('Master exists; edit it directly, then regenerate views without --assemble.');
  const read = name => fs.readFileSync(path.join(draftRoot, name), 'utf8');
  const body = name => {
    let text = read(name);
    text = text.slice(text.indexOf('\n## ') + 1);
    if (name === 'validation.md') text = text.split('\n## Inspected sources used')[0];
    return text.trim();
  };
  const text = [read('charter.md').trim(), read('foundation.md').trim(), body('visuals.md'), body('product.md'), body('validation.md'), read('completion.md').trim()].join('\n\n') + '\n';
  fs.writeFileSync(masterPath, text);
}

const source = fs.readFileSync(masterPath, 'utf8');
const hash = crypto.createHash('sha256').update(source).digest('hex');
let section = '', task = null;
const tasks = [];
for (const line of source.split('\n')) {
  const heading = line.match(/^## (.+)$/);
  if (heading) section = heading[1];
  const match = line.match(/^- \[([ x])\] \*\*([FDVPQOZ]\d{3}) — (.+)\*\*$/);
  if (match) { task = { id: match[2], title: match[3], group: names[match[2][0]], prefix: match[2][0], section, status: match[1] === 'x' ? 'verified' : 'planned', do: '', accept: '', evidence: '' }; tasks.push(task); continue; }
  const field = line.match(/^  - (Do|Accept|Evidence): (.+)$/);
  if (field && task) task[field[1].toLowerCase()] = field[2];
  const status = line.match(/^  - Status: (planned|active|blocked|verified|approved exclusion)\s*$/);
  if (status && task) {
    if (task.status === 'verified' && status[1] !== 'verified') throw new Error(`${task.id}: checked box conflicts with status`);
    if (task.status !== 'verified' && status[1] === 'verified') throw new Error(`${task.id}: verification requires a checked box`);
    task.status = status[1];
  }
}
const ids = new Set();
for (const t of tasks) {
  if (ids.has(t.id)) throw new Error(`Duplicate task ${t.id}`);
  ids.add(t.id);
  for (const key of ['do', 'accept', 'evidence']) if (!t[key]) throw new Error(`${t.id} missing ${key}`);
}
if (tasks.length < 300) throw new Error('Incomplete task inventory');
const byGroup = Object.fromEntries(Object.keys(names).map(k => [k, tasks.filter(t => t.prefix === k).length]));
const data = { title: 'Lunar Paradox — final product checklist', edition: 1, assembled: '2026-10-20', master: masterPath, masterSha256: hash, taskCount: tasks.length, verifiedCount: tasks.filter(t => t.status === 'verified').length, byGroup, tasks };
const jsonPath = path.join(deliveryRoot, 'FINAL-PRODUCT-CHECKLIST.json');
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
const payload = JSON.stringify(data).replaceAll('<', '\\u003c');
const esc = x => String(x).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lunar Paradox — final product checklist</title><style>
:root{color-scheme:light dark;font-family:system-ui,sans-serif;background:#111416;color:#e6e8e9}*{box-sizing:border-box}body{margin:0}header,main{max-width:1200px;margin:auto;padding:24px}h1{font-size:26px;margin:8px 0 12px}p{line-height:1.6}a{color:#b8d5ed}.eyebrow{font-size:12px;letter-spacing:.1em;color:#a9b0b5}.summary{display:flex;gap:24px;flex-wrap:wrap;padding:16px 0}.summary strong{font-size:24px}.summary span{display:block;color:#adb4b9;font-size:13px}nav{display:flex;gap:12px;flex-wrap:wrap}.toolbar{display:grid;grid-template-columns:1fr 220px;gap:12px;position:sticky;top:0;background:#111416;padding:16px 0;z-index:2}input,select,button{font:inherit;padding:12px;background:#1e2326;color:inherit;border:1px solid #505a62;border-radius:3px}button{cursor:pointer}input:focus-visible,select:focus-visible,button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid #bad9f1;outline-offset:3px}.group{border-top:1px solid #465058;margin-top:24px}.group h2{font-size:21px}.task{border-top:1px solid #30383d;padding:15px 0}.task summary{cursor:pointer;font-weight:600;line-height:1.55}.id{font:12px ui-monospace,monospace;color:#a9bdca;margin-right:12px}.task dl{margin:16px 0 8px 26px;line-height:1.65}.task dt{font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:#b2bec7;margin:12px 0 3px}.task dd{margin:0;max-width:95ch}.section{font-size:12px;color:#9da9b1;margin:8px 0 0 26px}.notice{max-width:95ch;border-left:2px solid #7f9fb5;padding-left:16px}.muted{color:#aab3b9;font-size:13px}.flow{display:flex;gap:8px;flex-wrap:wrap;line-height:1.8}.flow span{border-bottom:1px solid #667987;padding:4px 0}#result{margin-top:8px}footer{border-top:1px solid #3b454c;padding:24px;font-size:12px;overflow-wrap:anywhere} @media(max-width:600px){header,main{padding:16px}.toolbar{grid-template-columns:1fr}.summary{gap:14px}h1{font-size:24px}.task dl{margin-left:8px}} @media print{.toolbar,nav,button{display:none}body{background:white;color:black}details::details-content{content-visibility:visible}details>*{display:block}header,main{max-width:none}.task{break-inside:avoid}}
</style></head><body><header><div class="eyebrow">LUNAR PARADOX / EXECUTION SPECIFICATION</div><h1>Final product checklist</h1><p>Three independent platforms. One source of execution decisions. Every task defines work, acceptance and evidence.</p><div class="summary"><div><strong>${data.taskCount}</strong><span>required checks and bounded decisions</span></div><div><strong>${data.verifiedCount}</strong><span>new final-product tasks verified</span></div><div><strong>8</strong><span>execution gates plus handover</span></div></div><p class="notice">This is the plan, not a claim of completion. Edit the master Markdown to record verified evidence, then regenerate this read-only view. Existing functionality must be rechecked before its task is closed. Optional decisions and hosted-only work have explicit scope in the master.</p><nav><a href="FINAL-PRODUCT-CHECKLIST.md">Complete master specification</a><a href="FINAL-PRODUCT-CHECKLIST.json">Structured checklist</a><button id="expand" type="button">Expand visible tasks</button><button id="collapse" type="button">Collapse visible tasks</button></nav><p class="muted">Assembled 20 October 2026 · source inspection dated 19 October · no product implementation performed by this planning exercise.</p></header><main><div class="flow" aria-label="Gate order"><span>0 Source/data custody</span> → <span>1 Art and contracts</span> → <span>2 Syzygy</span> → <span>3 Gravity</span> → <span>4 Astrolabe</span> → <span>5 Operations</span> → <span>6 Offline QA</span> → <span>7 Hosted release</span> → <span>8 Handover</span></div><div class="toolbar"><input id="search" type="search" aria-label="Search task ID, title, work, acceptance or evidence" placeholder="Search task ID, scene, issue or requirement"><select id="group" aria-label="Task group"><option value="">All task groups</option>${Object.entries(names).map(([k,v])=>`<option value="${k}">${esc(v)} (${byGroup[k]})</option>`).join('')}</select></div><p id="result" class="muted" role="status" aria-live="polite"></p><div id="tasks"></div></main><footer>Derived from ${esc(masterPath)}<br>Master SHA-256: ${hash}<br>Read the master for fixed contracts, dependencies, owner inputs, target budgets, exclusions and final release conditions.</footer><script id="data" type="application/json">${payload}</script><script>
const data=JSON.parse(document.getElementById('data').textContent);const search=document.getElementById('search'),group=document.getElementById('group'),host=document.getElementById('tasks');const escape=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function render(){const query=search.value.trim().toLowerCase();const matches=data.tasks.filter(t=>(!group.value||t.prefix===group.value)&&(!query||[t.id,t.title,t.section,t.do,t.accept,t.evidence].join(' ').toLowerCase().includes(query)));document.getElementById('result').textContent=matches.length+' of '+data.taskCount+' tasks shown · statuses come from the master document';let last='';host.innerHTML=matches.map(t=>{const heading=t.group!==last?'<div class="group"><h2>'+escape(t.group)+'</h2></div>':'';last=t.group;return heading+'<details class="task" id="'+t.id+'"><summary><span class="id">'+t.id+'</span>'+escape(t.title)+' <span class="muted">['+t.status+']</span></summary><p class="section">'+escape(t.section)+'</p><dl><dt>Work</dt><dd>'+escape(t.do)+'</dd><dt>Acceptance</dt><dd>'+escape(t.accept)+'</dd><dt>Evidence</dt><dd>'+escape(t.evidence)+'</dd></dl></details>';}).join('');if(!matches.length){const p=document.createElement('p');p.textContent='No checklist task matches this query. Clear the filter to review the complete scope.';host.append(p);}}
search.addEventListener('input',render);group.addEventListener('change',render);document.getElementById('expand').addEventListener('click',()=>host.querySelectorAll('details').forEach(d=>d.open=true));document.getElementById('collapse').addEventListener('click',()=>host.querySelectorAll('details').forEach(d=>d.open=false));render();if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el){el.open=true;el.scrollIntoView();}}
</script></body></html>`;
const renderedHtml = html
  .replace('new final-product tasks verified', 'tasks verified')
  .replace('Assembled 20 October 2026 · source inspection dated 19 October · no product implementation performed by this planning exercise.', 'Plan assembled 20 October 2026 · execution status last reconciled 21 October 2026.');
fs.writeFileSync(path.join(deliveryRoot, 'FINAL-PRODUCT-CHECKLIST.html'), renderedHtml);

const canvas = `import { H1, Text, TextInput, Select, CollapsibleSection, useState, useMemo, useHostTheme } from 'cursor/canvas';
const data = ${payload};
export default function FinalProductChecklist(){
 const theme=useHostTheme(); const [query,setQuery]=useState(''); const [group,setGroup]=useState('');
 const matches=useMemo(()=>data.tasks.filter(t=>(!group||t.prefix===group)&&[t.id,t.title,t.section,t.do,t.accept,t.evidence].join(' ').toLowerCase().includes(query.trim().toLowerCase())),[query,group]);
 const groups=Object.entries(${JSON.stringify(names)}).filter(([key])=>matches.some(t=>t.prefix===key));
 return <main style={{color:theme.text.primary,background:theme.bg.editor,padding:24,maxWidth:1200,margin:'auto'}}>
  <Text>LUNAR PARADOX / FINAL PRODUCT EXECUTION</Text><H1>One checklist for the final product</H1>
  <p style={{lineHeight:1.6,color:theme.text.secondary}}>Syzygy: brand and commissions. Gravity: Labs. Astrolabe: Products. Independent experiences with shared company services.</p>
  <div style={{display:'flex',gap:28,flexWrap:'wrap',padding:'16px 0'}}><div><strong style={{fontSize:24}}>{data.taskCount}</strong><div>tasks and bounded decisions</div></div><div><strong style={{fontSize:24}}>{data.verifiedCount}</strong><div>new tasks verified</div></div><div><strong style={{fontSize:24}}>8 + handover</strong><div>execution gates</div></div></div>
  <p style={{lineHeight:1.6,borderLeft:'2px solid '+theme.stroke.primary,paddingLeft:14,color:theme.text.secondary}}>Planning artifact, assembled 20 October 2026. All work requires its stated evidence. This read-only view cannot certify completion. The master Markdown contains scope, gate dependencies, input requirements, proposed budgets and release rules.</p>
  <div style={{display:'flex',gap:16,flexWrap:'wrap',padding:'12px 0'}}><a href={data.master} style={{color:theme.text.link}}>Open complete master specification</a><a href='/home/n1khy/Downloads/lunar paradox/FINAL-PRODUCT-CHECKLIST.html' style={{color:theme.text.link}}>Open standalone browser view</a></div>
  <div style={{display:'flex',gap:12,flexWrap:'wrap',padding:'12px 0'}}><TextInput type='search' value={query} onChange={setQuery} placeholder='Search task ID, scene, work or evidence' style={{minWidth:240,flex:1}}/><Select value={group} onChange={setGroup} options={[{value:'',label:'All groups'},...Object.entries(${JSON.stringify(names)}).map(([value,label])=>({value,label}))]} /></div>
  <p style={{fontSize:13,color:theme.text.tertiary}}>{matches.length} of {data.taskCount} tasks shown. Source SHA-256: {data.masterSha256.slice(0,16)}…</p>
  {groups.map(([key,label])=><section key={key} style={{borderTop:'1px solid '+theme.stroke.primary,marginTop:24,paddingTop:14}}><h2 style={{fontSize:20}}>{label}</h2>{matches.filter(t=>t.prefix===key).map(t=><CollapsibleSection key={t.id} title={t.id+' — '+t.title} trailing={<span style={{fontSize:12,color:theme.text.tertiary}}>{t.status}</span>}><div style={{maxWidth:'100ch',lineHeight:1.65,paddingBottom:18}}><p style={{fontSize:12,color:theme.text.tertiary}}>{t.section}</p><p><strong>Work. </strong>{t.do}</p><p><strong>Acceptance. </strong>{t.accept}</p><p><strong>Evidence. </strong>{t.evidence}</p></div></CollapsibleSection>)}</section>)}
 </main>;
}
`;
fs.writeFileSync(canvasPath, canvas);

for (const suffix of ['md','json','html']) {
  const name = 'FINAL-PRODUCT-CHECKLIST.' + suffix;
  const link = path.join(plansRoot, name);
  let exists = false;
  try { fs.lstatSync(link); exists = true; } catch (err) { if (err.code !== 'ENOENT') throw err; }
  if (exists) {
    if (!fs.lstatSync(link).isSymbolicLink() || fs.readlinkSync(link)!==path.join(deliveryRoot,name)) throw new Error('Refusing to overwrite unrelated plan file: '+link);
  } else fs.symlinkSync(path.join(deliveryRoot,name), link);
}
const validation = { taskCount:data.taskCount, groups:byGroup, uniqueIDs:ids.size, completeTaskFields:true, verifiedCount:data.verifiedCount, masterSha256:hash, masterBytes:Buffer.byteLength(source), words:source.split(/\s+/).filter(Boolean).length, outputs:[masterPath,jsonPath,path.join(deliveryRoot,'FINAL-PRODUCT-CHECKLIST.html'),canvasPath] };
fs.writeFileSync(path.join(draftRoot, 'plan-validation.json'), JSON.stringify(validation,null,2)+'\n');
console.log(JSON.stringify(validation,null,2));
