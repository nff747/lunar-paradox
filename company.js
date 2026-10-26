/* Company destinations and a local publishing workflow. The scene renderer remains independent. */
(()=>{'use strict';
const scene=document.body.dataset.scene,kind=scene==='gravity'?'experiments':'products';
const landing=scene==='syzygy'?'realms':scene==='gravity'?'labs':'products';
const local=['localhost','127.0.0.1',''].includes(location.hostname),key='lunar-company-content:v1';
const empty=()=>structuredClone(window.LUNAR_PUBLISHED_CONTENT||{revision:0,experiments:[],products:[],contactEmail:''});
let content=empty(),server=false,editing=null,collection=kind,notice='',busy=false,filter='',request=0;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!!u.hostname&&!/[\s]/.test(v);}catch{return false;}};
const route=()=>location.hash.replace(/^#\/?/,'').split('?')[0];
const owns=()=>/^(home|studio|commission|estimate|applications|labs|products|manage|experiment\/[-\w]+|product\/[-\w]+)$/.test(route());
window.lunarCompany={isCompanyHash:owns,get brandHref(){return href('syzygy','realms');}};
function href(target,hash){if(target===scene)return '#/'+hash;if(location.protocol==='file:'){const source=location.pathname.includes('/dist/');return new URL((source?'../../lunar-'+target+'/dist/':'../lunar-'+target+'/')+'index.html#/'+hash,location.href).href;}return '/platforms/'+target+'/index.html#/'+hash;}
const link=(target,hash,text,cls='lc-link')=>`<a class="${cls}" href="${esc(href(target,hash))}">${text}</a>`;
function download(name,value){const url=URL.createObjectURL(new Blob([typeof value==='string'?value:JSON.stringify(value,null,2)],{type:typeof value==='string'?'text/plain;charset=utf-8':'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
function validate(value){if(!value||!Number.isInteger(value.revision)||value.revision<0||!Array.isArray(value.experiments)||!Array.isArray(value.products)||typeof value.contactEmail!=='string')throw Error('Invalid publisher document.');for(const k of ['experiments','products']){if(value[k].length>100)throw Error('At most 100 records per collection.');const ids=new Set();for(const r of value[k]){const limits={id:80,title:120,summary:300,body:6000,category:60,image:500,actionUrl:500,actionLabel:60,stage:40,status:20};if(Object.keys(r).length!==Object.keys(limits).length||Object.entries(limits).some(([n,max])=>typeof r[n]!=='string'||r[n].length>max)||!/^[-\w]+$/.test(r.id)||ids.has(r.id)||!['draft','published','archived'].includes(r.status))throw Error('Invalid record.');ids.add(r.id);if(r.status==='published'&&(!r.title.trim()||!r.summary.trim()||!r.body.trim()))throw Error('Publishing requires a title, summary and content.');if((r.image&&!safe(r.image))||(r.actionUrl&&!safe(r.actionUrl)))throw Error('Links must be complete HTTPS URLs.');if(!!r.actionUrl!==!!r.actionLabel)throw Error('An action needs its label and URL.');}}if(value.contactEmail&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.contactEmail)||value.contactEmail.length>254))throw Error('Enter a valid contact email.');return value;}
async function api(path,method='GET',value){const r=await fetch('/api/'+path,{method,headers:value?{'Content-Type':'application/json'}:undefined,body:value?JSON.stringify(value):undefined,signal:AbortSignal.timeout(4000)});const json=await r.json();if(!r.ok)throw Error(json.error||'The request failed.');return json;}
async function load(admin=false){const ticket=++request;try{if(location.protocol!=='file:'){const value=await api(admin?'publisher':'content');if(ticket!==request)return;const validated=validate(value);if(!admin){const fallback=empty();if((!validated.products||!validated.products.length)&&fallback.products?.length)validated.products=fallback.products;if((!validated.experiments||!validated.experiments.length)&&fallback.experiments?.length)validated.experiments=fallback.experiments;if(!validated.contactEmail&&fallback.contactEmail)validated.contactEmail=fallback.contactEmail;}content=validated;server=true;return;}}catch(error){if(server)throw error;}try{const stored=JSON.parse(localStorage.getItem(key)||'null');const fallback=empty();if(stored&&!admin){if((!stored.products||!stored.products.length)&&fallback.products?.length)stored.products=fallback.products;if((!stored.experiments||!stored.experiments.length)&&fallback.experiments?.length)stored.experiments=fallback.experiments;}content=validate(stored||fallback);}catch{content=empty();}server=false;}
async function save(next){validate(next);if(server)content=await api('publisher','PUT',next);else{const current=JSON.parse(localStorage.getItem(key)||'null')||empty();if(current.revision!==next.revision)throw Error('Publisher changed in another tab. Reload before saving.');localStorage.setItem(key+':previous',JSON.stringify(current));next.revision++;localStorage.setItem(key,JSON.stringify(next));content=next;}}
const host=document.createElement('main');host.id='lunar-company';host.hidden=true;host.setAttribute('aria-label','Lunar Paradox company');document.body.append(host);
const nav=document.createElement('nav');nav.className='lc-nav';nav.setAttribute('aria-label','Company navigation');nav.innerHTML=link('gravity','labs','<span>01 /</span> LABS')+link('syzygy','studio','<span>02 /</span> STUDIO')+link('astrolabe','products','<span>03 /</span> PRODUCTS')+(scene==='syzygy'?'<a class="lc-enter" href="#/home">ENTER ↗</a>':'')+'<button type="button" id="lc-tools" aria-expanded="false" aria-controls="lc-menu">CONTROLS ≡</button>';document.body.append(nav);
const menu=document.createElement('section');menu.id='lc-menu';menu.hidden=true;menu.setAttribute('aria-label','Scene controls');
const tools=scene==='syzygy'?[['simulation','Fracture Controls'],['data','Measurements & Telemetry']]:scene==='gravity'?[['simulation','Field Controls'],['telemetry','Measurements & Stream'],['archive','Saved Camera Views']]:[['simulation','Sequence Controls'],['data','Measurements'],['archive','Saved Views']];
menu.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff15;padding-bottom:8px;margin-bottom:10px;"><p class="lc-eyebrow" style="margin:0;">CONTROLS // 3D SCENE</p><button type="button" data-close style="border:0;background:none;color:#aaa;font-size:18px;cursor:pointer;" aria-label="Close controls">×</button></div>'+tools.map(([r,n])=>`<a href="#/${r}">${n}</a>`).join('')+'<button type="button" data-settings style="margin-top:6px;">Audio & Rendering</button>'+(local?'<div style="border-top:1px solid #ffffff15;margin-top:10px;padding-top:8px;"><a href="#/manage" style="font-size:11px;opacity:0.8;">Local Publisher</a><a href="#/applications" style="font-size:11px;opacity:0.8;">Review Desk</a></div>':'');
document.body.append(menu);
const toggle=document.getElementById('lc-tools');function close(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');}toggle.onclick=()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));if(!menu.hidden)menu.querySelector('a')?.focus();};menu.addEventListener('click',e=>{if(e.target.closest('a,[data-close]'))close();if(e.target.closest('[data-settings]')){close();toggle.focus();document.dispatchEvent(new CustomEvent('lunar:open-sessions'));}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){e.preventDefault();e.stopImmediatePropagation();close();toggle.focus();}});document.addEventListener('pointerdown',e=>{if(!menu.contains(e.target)&&e.target!==toggle)close();});
const back=()=>`<a class="lc-back" href="#/${landing}">← Home</a>`;
function recordMarkup(r,detail=false){return `<article class="lc-record">${r.image&&safe(r.image)?`<img src="${esc(r.image)}" alt="${esc(r.title)}" loading="lazy">`:''}<div class="lc-record-meta"><span class="lc-cat">${esc(r.category)}</span>${r.stage?`<span class="lc-stage-badge">${esc(r.stage)}</span>`:''}</div><h${detail?1:2}>${esc(r.title)}</h${detail?1:2}><p>${esc(r.summary)}</p>${detail?'<div class="lc-prose">'+r.body.split(/\n\s*\n/).map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>':''}${detail?(r.actionUrl&&safe(r.actionUrl)?`<a class="lc-button" href="${esc(r.actionUrl)}" target="_blank" rel="noopener noreferrer">${esc(r.actionLabel)} ↗</a>`:''):`<a href="#/${collection==='experiments'?'experiment':'product'}/${esc(r.id)}" class="lc-button">DISCOVER ↗</a>`}</article>`;}
function catalogue(name){
  collection=name;
  const items=content[name].filter(r=>r.status==='published');
  const categories=[...new Set(items.map(r=>r.category).filter(Boolean))];
  if(!categories.includes(filter)) filter='';
  const lab=name==='experiments';
  const ctaLabel = lab ? 'PROPOSE A COLLABORATION ↗' : 'GET LAUNCH NOTIFICATIONS ↗';
  const statusLine = items.length > 0 
    ? `<p class="lc-catalogue-status">${items.length} verified ${lab ? 'experiments' : 'releases'}</p>`
    : `<p class="lc-catalogue-status" style="color:#bfa7db;font-weight:500;">Q4 2026 Release Track · Pipeline Active</p>`;
  const emptyNotice = items.length === 0 
    ? `<div class="lc-empty-state" style="margin:24px 0;padding:20px;border:1px solid #ffffff18;background:#0d111788;border-radius:4px;">
         <p style="font-size:13px;line-height:1.6;color:#c0c4ce;margin:0 0 12px 0;">
           ${lab ? 'Active investigations in non-planar continuum mechanics and hydrodynamic surface dispersion. Pre-print documentation under review.' : 'Hardware and spatial interface tools currently in private testing. Public releases and open-source packages debut Q4 2026.'}
         </p>
         <span style="font-size:11px;color:#9b99a8;letter-spacing:0.04em;">STATUS: IN BENCHMARK VERIFICATION</span>
       </div>` 
    : '';
  return `<section class="lc-intro lc-catalogue-intro lc-${lab?'labs':'products'}">
    <p class="lc-eyebrow">LUNAR PARADOX / ${lab?'RESEARCH & LABS':'SPATIAL RELEASES'}</p>
    <h1 tabindex="-1">${lab?'Labs':'Products'}</h1>
    ${statusLine}
    ${emptyNotice}
    ${link('syzygy','commission', ctaLabel)}
  </section>${!items.length?'':`<section class="lc-collection" aria-label="${lab?'Published experiments':'Published products'}"><div class="lc-hologram-rail" aria-hidden="true"><div class="lc-hologram-thumb" title="Scroll indicator"><span class="lc-chevron-indicator">&gt;</span></div></div><div class="lc-collection-head"><h2>${lab?'Experiments':'Releases'}</h2>${categories.length>1?`<label>Browse by interest<select data-filter><option value="">All interests</option>${categories.map(c=>`<option ${c===filter?'selected':''}>${esc(c)}</option>`).join('')}</select></label>`:''}</div><p class="lc-small" role="status"><span class="lc-live-pulse"></span> ${items.filter(r=>!filter||r.category===filter).length} loaded</p><div class="lc-records">${items.filter(r=>!filter||r.category===filter).map(r=>recordMarkup(r)).join('')}</div></section>`}`;
}

function home(){return `<section class="lc-intro lc-brand-intro"><p class="lc-eyebrow">LUNAR PARADOX / APPLIED TECHNOLOGY</p><h1 tabindex="-1">We explore what<br>technology can become.</h1><p class="lc-deck">Applied technology laboratory and product studio exploring AI, computing, interactive systems and emerging technology.</p><div class="lc-actions">${link('gravity','labs','EXPLORE THE LAB ↗','lc-button')}<a href="#/studio" class="lc-button lc-secondary">WORK WITH US ↗</a></div><div class="lc-realms"><div><span>01 / EXPERIMENTATION</span><p>Research · Exploration · R&amp;D</p></div><div><span>02 / APPLICATION</span><p>Products · Engineering · Client work</p></div></div></section>`;}
function studio(){
  return back()+`<section class="lc-studio">
    <p class="lc-eyebrow">STUDIO / TECHNICAL DIRECTION & BESPOKE WEBGL</p>
    <h1 tabindex="-1" style="letter-spacing:-0.03em;word-spacing:0.12em;">Work with Lunar Paradox.</h1>
    <p class="lc-deck" style="color:#d6d5dc;font-size:15px;line-height:1.7;">We engineer high-impact real-time WebGL shaders, spatial interactive interfaces, and continuum mechanics simulations for forward-looking design agencies and product teams.</p>
    
    <!-- Differentiator Funding Model Block -->
    <div class="lc-funding-model" style="margin:20px 0 28px 0;padding:16px 20px;background:linear-gradient(90deg,#21132866,#131a2466);border-left:3px solid #b77bee;border-radius:0 4px 4px 0;">
      <p style="margin:0;font-size:12px;letter-spacing:0.04em;color:#e8def2;font-weight:600;">THE OPERATING MODEL</p>
      <p style="margin:4px 0 0 0;font-size:13px;line-height:1.5;color:#bfb8cc;">Client technical direction directly funds sovereign laboratory research. Lab discoveries directly feed open-source tools and production shaders.</p>
    </div>

    <div class="lc-offers">
      <article>
        <span>01</span>
        <h2>Technical Direction Spikes</h2>
        <p>3-day bounded investigations resolving complex shader math, 60 FPS bottlenecks, or interactive mechanics before full client builds.</p>
      </article>
      <article>
        <span>02</span>
        <h2>Spatial & WebGL Runtimes</h2>
        <p>Production-grade Three.js scenes, GPU instancing, non-planar topological fractures, and custom glsl pipelines.</p>
      </article>
      <article>
        <span>03</span>
        <h2>Continuum Physics Solvers</h2>
        <p>Bespoke mathematical modeling for brand reveals, liquid metals, and interactive gravitational mechanics.</p>
      </article>
    </div>

    <!-- Numbered Process -->
    <div class="lc-process" style="margin:30px 0;">
      <h2>How we begin</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:14px;">
        <div style="padding:14px;background:#ffffff08;border:1px solid #ffffff12;border-radius:4px;">
          <strong style="color:#f5e6c8;font-size:12px;">STEP 01</strong>
          <h3 style="margin:6px 0;font-size:14px;">Define Objective</h3>
          <p style="margin:0;font-size:12px;color:#a9a7b5;line-height:1.5;">Identify the core visual hurdle, target hardware tier, and performance budget.</p>
        </div>
        <div style="padding:14px;background:#ffffff08;border:1px solid #ffffff12;border-radius:4px;">
          <strong style="color:#f5e6c8;font-size:12px;">STEP 02</strong>
          <h3 style="margin:6px 0;font-size:14px;">3-Day Spike</h3>
          <p style="margin:0;font-size:12px;color:#a9a7b5;line-height:1.5;">Execute bounded prototype or performance optimization with flamegraph benchmarks.</p>
        </div>
        <div style="padding:14px;background:#ffffff08;border:1px solid #ffffff12;border-radius:4px;">
          <strong style="color:#f5e6c8;font-size:12px;">STEP 03</strong>
          <h3 style="margin:6px 0;font-size:14px;">Production Delivery</h3>
          <p style="margin:0;font-size:12px;color:#a9a7b5;line-height:1.5;">Integrate battle-tested pull-request code directly into client repo with zero tech debt.</p>
        </div>
      </div>
    </div>

    <!-- Selected Proof & Case Studies -->
    <div class="lc-proof" style="margin:28px 0;">
      <h2>Selected Technical Proof</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px;">
        <div style="padding:14px;background:#ffffff06;border:1px solid #ffffff10;border-radius:4px;">
          <small style="color:#b48eff;font-weight:600;">GRAVITATIONAL CLEAVAGE RIG</small>
          <h3 style="margin:4px 0 8px 0;font-size:14px;">Asymmetric Planetary Fracture</h3>
          <p style="margin:0;font-size:12px;color:#9b9aa6;line-height:1.5;">Continuum cohesive zone model with 6 detachable slabs and real-time P95 &le; 16.6ms cadence.</p>
        </div>
        <div style="padding:14px;background:#ffffff06;border:1px solid #ffffff10;border-radius:4px;">
          <small style="color:#ffd185;font-weight:600;">HYDRODYNAMIC INVERSION</small>
          <h3 style="margin:4px 0 8px 0;font-size:14px;">Inverted Mercury Chasm</h3>
          <p style="margin:0;font-size:12px;color:#9b9aa6;line-height:1.5;">Finite-depth dispersion waves and screen-space planar reflection probe running in Three.js.</p>
        </div>
      </div>
    </div>

    <div style="margin-top:24px;">
      <a href="#/commission" class="lc-button" style="font-weight:600;letter-spacing:0.04em;">START A TECHNICAL CONVERSATION ↗</a>
    </div>
  </section>`;
}
function commission(){return window.lunarCommission.markup("commission");}
function fields(record){return `<input type="hidden" name="id" value="${esc(record.id)}"><label>Title<input name="title" maxlength="120" value="${esc(record.title)}"></label><label>One-sentence description<textarea name="summary" maxlength="300" rows="2">${esc(record.summary)}</textarea></label><label>Content<textarea name="body" maxlength="6000" rows="6">${esc(record.body)}</textarea></label><div class="lc-form-grid"><label>Interest / category<input name="category" maxlength="60" value="${esc(record.category)}"></label><label>Release label <span>optional</span><input name="stage" maxlength="40" value="${esc(record.stage)}"></label></div><label>Preview image HTTPS URL <span>optional</span><input name="image" type="url" maxlength="500" value="${esc(record.image)}"></label><div class="lc-form-grid"><label>Action label <span>optional</span><input name="actionLabel" maxlength="60" value="${esc(record.actionLabel)}"></label><label>Action HTTPS URL <span>optional</span><input name="actionUrl" type="url" maxlength="500" value="${esc(record.actionUrl)}"></label></div><label>Publication state<select name="status">${['draft','published','archived'].map(v=>`<option ${record.status===v?'selected':''}>${v}</option>`).join('')}</select></label><div class="lc-actions"><button class="lc-button" type="submit">SAVE RECORD</button><button class="lc-button lc-secondary" type="button" data-preview>PREVIEW</button><button class="lc-link" type="button" data-cancel>CLOSE EDITOR</button></div>`;}
function manage(){if(!local)return '<h1>Publisher unavailable</h1><p>Use the private local launcher to manage content.</p>';return back()+`<section class="lc-manage"><p class="lc-eyebrow">LOCAL PUBLISHER / PRIVATE WORKSPACE</p><h1 tabindex="-1">Publish with<br>something to say.</h1><p class="lc-deck">Drafts stay out of the public collection. Preview a record, then publish it when its content and destinations are ready.</p><div class="lc-actions"><button class="lc-button lc-secondary" data-kind="experiments" aria-pressed="${collection==='experiments'}">EXPERIMENTS</button><button class="lc-button lc-secondary" data-kind="products" aria-pressed="${collection==='products'}">PRODUCTS</button><button class="lc-button" data-new>NEW RECORD +</button></div><p class="lc-notice" role="status">${esc(notice)}</p><div class="lc-editor-list">${content[collection].map(r=>`<button type="button" data-edit="${esc(r.id)}"><strong>${esc(r.title||'Untitled draft')}</strong><span>${esc(r.status)} ↗</span></button>`).join('')}</div>${editing?`<form id="lc-editor">${fields(editing)}</form><section id="lc-preview" aria-label="Draft preview" hidden></section>`:''}<details><summary>CONTACT & BACKUP</summary><form id="lc-contact"><label>Public company contact email <span>leave blank until ready</span><input name="contactEmail" type="email" maxlength="254" value="${esc(content.contactEmail)}"></label><button class="lc-button lc-secondary">SAVE CONTACT</button></form><div class="lc-actions"><button class="lc-button lc-secondary" data-backup>EXPORT CONTENT ↓</button><button class="lc-button lc-secondary" data-static>EXPORT PUBLIC SNAPSHOT ↓</button><label class="lc-button lc-secondary">MERGE BACKUP<input type="file" data-import accept="application/json" hidden></label></div><p class="lc-small">The local launcher stores content on this device. This editor has no public hosting or remote authentication setup.</p></details><details><summary>LOCALLY SAVED COMMISSION BRIEFS</summary><div data-briefs><p class="lc-small">Open this section to read briefs saved through the local launcher.</p></div></details></section>`;}
function render(focus=false){close();nav.querySelectorAll('a').forEach(a=>{if(a.href===location.href)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});const r=route(),active=owns();host.hidden=!active;document.body.classList.toggle('company-open',active);document.body.dataset.companyRoute=active?r:'';requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));if(!active)return;document.title=({home:'Lunar Paradox — Applied technology',labs:'Labs — Lunar Paradox',products:'Products — Lunar Paradox',studio:'Studio — Lunar Paradox',commission:'Apply — Lunar Paradox',estimate:'Application & estimate — Lunar Paradox',applications:'Application review — Lunar Paradox',manage:'Local publisher — Lunar Paradox'}[r]||'Discover — Lunar Paradox');host.className='lc-page lc-page-'+r.split('/')[0];if(r==='home')host.innerHTML=home();else if(r==='studio')host.innerHTML=studio();else if(r==='commission')host.innerHTML=commission();else if(r==='estimate'||r==='applications')host.innerHTML=window.lunarCommission.markup(r);else if(r==='manage')host.innerHTML=manage();else if(r==='labs'||r==='products')host.innerHTML=catalogue(r==='labs'?'experiments':'products');else{collection=r.startsWith('experiment/')?'experiments':'products';const record=content[collection].find(x=>x.id===r.split('/')[1]&&x.status==='published');host.innerHTML=back()+'<section class="lc-detail">'+(record?recordMarkup(record,true):'<h1 tabindex="-1">This entry is not published.</h1>')+'</section>';}
if(focus){host.scrollTop=0;host.querySelector('h1')?.focus({preventScroll:true});}bind();}
function readEditor(){const value=Object.fromEntries(new FormData(host.querySelector('#lc-editor')));return value;}
async function mutate(fn){if(busy)return;busy=true;host.querySelectorAll('button').forEach(b=>b.disabled=true);try{const next=structuredClone(content);fn(next);await save(next);notice='Saved. Public collections include published records only.';editing=null;render();}catch(e){notice=e.message;let n=host.querySelector('.lc-notice');if(n)n.textContent=notice;}finally{busy=false;host.querySelectorAll('button').forEach(b=>b.disabled=false);}}
function bind(){window.lunarCommission?.bind(host);const collectionNode=host.querySelector('.lc-collection');if(collectionNode){const rail=collectionNode.querySelector('.lc-hologram-rail');const thumb=rail?.querySelector('.lc-hologram-thumb');if(rail&&thumb){const updateThumb=()=>{const maxScroll=collectionNode.scrollHeight-collectionNode.clientHeight;if(maxScroll<=0){rail.style.display='none';return;}rail.style.display='flex';const progress=Math.max(0,Math.min(1,collectionNode.scrollTop/maxScroll));const railH=rail.clientHeight-thumb.clientHeight;thumb.style.transform=`translate3d(0,${progress*railH}px,0)`;};collectionNode.addEventListener('scroll',updateThumb,{passive:true});updateThumb();requestAnimationFrame(updateThumb);let dragging=false,startY=0,startScroll=0;thumb.onpointerdown=e=>{e.preventDefault();dragging=true;startY=e.clientY;startScroll=collectionNode.scrollTop;thumb.setPointerCapture?.(e.pointerId);thumb.classList.add('dragging');const onMove=ev=>{if(!dragging)return;const maxScroll=collectionNode.scrollHeight-collectionNode.clientHeight;const railH=rail.clientHeight-thumb.clientHeight;if(railH>0)collectionNode.scrollTop=startScroll+((ev.clientY-startY)/railH)*maxScroll;};const onUp=ev=>{dragging=false;thumb.classList.remove('dragging');try{thumb.releasePointerCapture?.(ev.pointerId);}catch{}window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);};window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',onUp);};rail.onclick=e=>{if(e.target.closest('.lc-hologram-thumb'))return;const rect=rail.getBoundingClientRect();const clickY=e.clientY-rect.top;const maxScroll=collectionNode.scrollHeight-collectionNode.clientHeight;const railH=rail.clientHeight-thumb.clientHeight;if(railH>0)collectionNode.scrollTop=Math.max(0,Math.min(1,(clickY-thumb.clientHeight/2)/railH))*maxScroll;};}}host.querySelector('[data-filter]')?.addEventListener('change',e=>{filter=e.target.value;render();});host.querySelector('#lc-brief')?.addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const value=Object.fromEntries(new FormData(form));download('lunar-paradox-project-brief.txt',['LUNAR PARADOX / PROJECT BRIEF','Prepared: '+new Date().toISOString(),'', 'Name: '+value.name,'Email: '+value.email,'Interest: '+value.type,'','What I would like to achieve:',value.goal,'','Timing: '+(value.timing||'To discuss'),'Budget: '+(value.budget||'To discuss')].join('\n'));const status=form.querySelector('[data-brief-status]');status.textContent='Brief downloaded. No message has been sent.';if(server){try{await api('briefs','POST',value);status.textContent+=' A copy was saved in this device’s publisher.';}catch{status.textContent+=' A local copy could not be saved; keep your download.';}}});
if(route()!=='manage'||!local)return;
host.querySelectorAll('[data-kind]').forEach(b=>b.onclick=()=>{collection=b.dataset.kind;editing=null;notice='';render();});host.querySelector('[data-new]')?.addEventListener('click',()=>{editing={id:crypto.randomUUID(),title:'',summary:'',body:'',category:'',image:'',actionUrl:'',actionLabel:'',stage:'',status:'draft'};render();host.querySelector('[name=title]')?.focus();});host.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{editing=structuredClone(content[collection].find(r=>r.id===b.dataset.edit));render();});host.querySelector('[data-cancel]')?.addEventListener('click',()=>{editing=null;render();});
host.querySelector('#lc-editor')?.addEventListener('submit',e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;const record=readEditor();mutate(next=>{const i=next[collection].findIndex(r=>r.id===record.id);if(i<0)next[collection].push(record);else next[collection][i]=record;});});host.querySelector('[data-preview]')?.addEventListener('click',()=>{const preview=host.querySelector('#lc-preview');preview.hidden=false;preview.innerHTML='<p class="lc-eyebrow">PRIVATE DRAFT PREVIEW</p>'+recordMarkup(readEditor(),true);preview.scrollIntoView({behavior:'instant',block:'nearest'});});host.querySelector('#lc-contact')?.addEventListener('submit',e=>{e.preventDefault();if(e.currentTarget.reportValidity())mutate(next=>next.contactEmail=e.currentTarget.elements.contactEmail.value.trim());});host.querySelector('[data-backup]')?.addEventListener('click',()=>download('lunar-paradox-content.json',content));host.querySelector('[data-static]')?.addEventListener('click',()=>{const published=structuredClone(content);published.revision=0;for(const k of ['experiments','products'])published[k]=published[k].filter(r=>r.status==='published');download('published-content.js','window.LUNAR_PUBLISHED_CONTENT='+JSON.stringify(published).replace(/</g,'\\u003c')+';\n');});host.querySelector('[data-import]')?.addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;if(file.size>262144){notice='Backup exceeds 256 KB.';render();return;}try{const imported=validate(JSON.parse(await file.text()));await mutate(next=>{for(const k of ['experiments','products']){const map=new Map(next[k].map(r=>[r.id,r]));for(const r of imported[k])if(!map.has(r.id))map.set(r.id,r);next[k]=[...map.values()];}if(!next.contactEmail)next.contactEmail=imported.contactEmail;});}catch(error){notice=error.message;render();}});
const briefs=host.querySelector('[data-briefs]');briefs?.closest('details').addEventListener('toggle',async e=>{if(!e.target.open)return;try{if(!server)throw Error('Brief history requires the local launcher.');const result=await api('briefs');briefs.innerHTML=result.briefs.map(b=>`<article class="lc-brief-item"><h2>${esc(b.name)}</h2><p>${esc(b.email)} / ${esc(b.type)}</p><p>${esc(b.goal)}</p><p>${esc(b.timing)} ${esc(b.budget)}</p></article>`).join('')||'<p class="lc-small">No briefs saved on this device.</p>';}catch(error){briefs.textContent=error.message;}});
}
// One cancellable director: rapid navigation never queues obsolete entrances.
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let journey=0,animations=[],shownRoute=route();
function stopMotion(){animations.forEach(a=>a.cancel());animations=[];host.style.removeProperty('opacity');host.style.removeProperty('transform');}
function play(el,frames,options){if(!el?.animate||motion.matches)return null;const a=el.animate(frames,options);animations.push(a);return a;}
// Reading pages follow real scroll. Short collection landings use a reversible
// virtual dolly; wheel over editable controls and reduced-motion mode stay native.
let travel=0;
function setTravel(value){const cinematic=/^(home|studio|labs|products|experiment\/|product\/)/.test(route());travel=cinematic?Math.max(0,Math.min(1,value)):0;document.body.dataset.companyTravel=String(motion.matches?0:travel);}
function syncReading(){const extent=host.scrollHeight-host.clientHeight;if(extent>8)setTravel(host.scrollTop/extent);}
host.addEventListener('scroll',syncReading,{passive:true});
document.addEventListener('wheel',e=>{
 if(!owns()||motion.matches||route()==='manage'||e.ctrlKey||e.target.closest('input,textarea,select,details,.lc-collection,#lc-active-testbench,.lc-testbench,.lc-hologram-rail'))return;
 if(host.scrollHeight-host.clientHeight>8)return;
 if(!['home','labs','products'].includes(route()))return;
 e.preventDefault();e.stopPropagation();setTravel(travel+e.deltaY*(e.deltaMode===1?.018:.00065));
},{passive:false,capture:true});
document.addEventListener('keydown',e=>{
 if(!owns()||motion.matches||!['home','labs','products'].includes(route())||host.scrollHeight-host.clientHeight>8||e.target.closest('input,textarea,select,button,a,[contenteditable],.lc-collection,#lc-active-testbench,.lc-testbench,.lc-hologram-rail'))return;
 const steps={ArrowDown:.08,ArrowUp:-.08,PageDown:.25,PageUp:-.25};
 if(e.key in steps){e.preventDefault();setTravel(travel+steps[e.key]);}
});
let touchY=null;
document.addEventListener('touchstart',e=>{touchY=e.touches.length===1?e.touches[0].clientY:null;},{passive:true});
document.addEventListener('touchmove',e=>{if(touchY===null||!owns()||motion.matches||!['home','labs','products'].includes(route())||host.scrollHeight-host.clientHeight>8||e.target.closest?.('.lc-collection,#lc-active-testbench,.lc-testbench,.lc-hologram-rail'))return;const y=e.touches[0]?.clientY;if(Number.isFinite(y)){setTravel(travel+(touchY-y)*.0015);touchY=y;}},{passive:true});
function enter(){
 if(motion.matches)return;
 const groups=[host.querySelector('.lc-back'),host.querySelector('.lc-eyebrow'),host.querySelector('h1'),host.querySelector('.lc-deck'),host.querySelector('.lc-actions, .lc-intro>.lc-link'),host.querySelector('.lc-realms, .lc-offers, form, .lc-records, .lc-public-empty')].filter(Boolean);
 groups.forEach((el,i)=>play(el,[{opacity:0,transform:'translate3d(0,18px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:520,delay:Math.min(i*65,300),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
}
async function navigate(){
 const ticket=++journey, destination=route();stopMotion();
 if(scene==='syzygy'&&destination==='mission')history.replaceState(null,'','#/home');
 if(destination!==shownRoute&&!host.hidden&&!motion.matches){
  const exit=play(host,[{opacity:1,transform:'translate3d(0,0,0)'},{opacity:0,transform:'translate3d(0,-8px,0)'}],{duration:140,easing:'ease-in',fill:'forwards'});
  if(exit)await exit.finished.catch(()=>{});
 }
 if(ticket!==journey)return;
 if(route()==='manage'&&local){try{await load(true);}catch(error){notice=error.message;}}
 if(ticket!==journey)return;
 stopMotion();setTravel(0);render(true);shownRoute=route();enter();
}
motion.addEventListener('change',()=>{stopMotion();setTravel(0);document.body.style.removeProperty('--hold-reveal');});
window.addEventListener('hashchange',navigate);document.body.classList.add('company-ready');const brand=document.querySelector('header .brand');if(brand&&scene!=='syzygy'){brand.removeAttribute('data-route');brand.setAttribute('aria-label','Lunar Paradox home');brand.href=href('syzygy','realms');}if(scene==='syzygy'&&route()==='mission')history.replaceState(null,'','#/home');if(!location.hash)history.replaceState(null,'','#/'+landing);render();load(route()==='manage'&&local).then(()=>{if(!host.contains(document.activeElement))render();});
window.addEventListener('lunar:spatial',e=>{
 if(scene!=='syzygy')return;
 const p=Math.max(0,Math.min(1,Number(e.detail?.charge)||0));
 document.body.style.setProperty('--hold-reveal',route()==='realms'&&!motion.matches?String(p):'0');
});
})();
