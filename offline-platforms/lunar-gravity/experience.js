/* Gravity routes operate the live scene and measured runtime. Hash navigation
   works with both the local server and a standalone offline document. */
(()=>{
'use strict';
const routes=new Set(['explore','observatory','telemetry','archive','simulation']);
const nodeDescriptions=[
 ['The ceiling','Trace the reflected landscape across the rippled surface.'],
 ['Monolith inversion','Follow the suspended basalt’s broken planes and narrow ledges.'],
 ['Liquid current','Follow the rising droplets toward their ceiling contacts.'],
 ['Crater basin','Survey the lunar terrain from a low grazing view.'],
 ['Basalt fault','Inspect the fractured foreground column and its rough surface.'],
 ['Field horizon','Read the architecture against the distant fog horizon.']
];
let mounted=false,route='explore',lastTelemetry=null,archiveGeneration=0,interval;
const finite=(v,n=2)=>Number.isFinite(Number(v))?Number(v).toFixed(n):'—';
const time=v=>{v=Math.max(0,Number(v)||0);return String(Math.floor(v/60)).padStart(2,'0')+':'+String(Math.floor(v%60)).padStart(2,'0');};
const element=(tag,attrs={},value)=>{const el=document.createElement(tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);if(value!==undefined)el.textContent=value;return el;};
const back='<a class="gx-back" href="#/explore">← <span>RETURN TO THE FIELD</span></a>';
const nodeMarkup=()=>nodeDescriptions.map(([title,copy],i)=>'<button class="gx-node" data-focus="'+i+'" aria-pressed="false"><span class="gx-node-label"><span>'+title+'</span><span class="gx-number">0'+(i+1)+' ↗</span></span><p>'+copy+'</p></button>').join('');
function go(value){const next=routes.has(value)?value:'explore';if(location.hash==='#/'+next)render();else location.hash='/'+next;}
function mount(){
 if(mounted||!window.__lunarDebug)return;mounted=true;
 const main=element('main',{id:'gravity-experience',hidden:'', 'aria-label':'Gravity field workspace'});
 main.innerHTML=[
 '<section class="gx-page spatial" data-page="observatory" hidden aria-labelledby="gx-observatory-title">',
 '<div class="gx-annotation"><strong>Spatial observatory</strong><span>SIX SPATIAL INSPECTIONS<br>DRAG THE FIELD TO CHANGE YOUR VIEW</span></div>',
 '<div class="gx-sheet">'+back+'<p class="gx-kicker">Observatory / Inverted architecture</p><h1 class="gx-heading" id="gx-observatory-title" tabindex="-1">A world<br>in suspension.</h1><p class="gx-copy">A liquid sky. A cratered ground. Choose a survey target to move closer.</p>',
 '<div class="gx-actions"><button class="gx-button secondary" data-action="ocean">ENTER THE OCEAN ↗</button></div>',nodeMarkup(),'<p class="gx-fieldnote">Drag to explore beyond a target. Reset returns to the opening view.</p><div class="gx-actions"><button class="gx-button secondary" data-action="reset">RESET OBSERVATION ↺</button><a class="gx-button" href="#/simulation">OPERATE THE FIELD ↗</a></div></div></section>',
 '<section class="gx-page gx-full" data-page="telemetry" hidden aria-labelledby="gx-telemetry-title">',
 '<div class="gx-topline">'+back+'<span class="gx-live" data-storage-status>LOCAL RUNTIME</span></div><p class="gx-kicker">Telemetry / Instrument station</p>',
 '<div class="gx-intro"><h1 class="gx-heading" id="gx-telemetry-title" tabindex="-1">Read the field.</h1><p class="gx-copy">Read the current, camera and rendering performance as the field evolves.</p></div>',
 '<div class="gx-metrics"><div class="gx-metric"><label>RENDER RATE</label><strong data-read="fps">—</strong><small>FPS</small></div><div class="gx-metric"><label>LAST FRAME INTERVAL</label><strong data-read="frame">—</strong><small>ms</small></div><div class="gx-metric"><label>LIQUID BODIES</label><strong data-read="droplets">—</strong><small>instanced</small></div><div class="gx-metric"><label>CEILING CONTACTS</label><strong data-read="contacts">—</strong><small>events</small></div></div>',
 '<div class="gx-instruments"><div><h2 class="gx-section-title">FRAME INTERVAL / ROLLING WINDOW <span data-read="frame-window">90 renderer intervals</span></h2><svg class="gx-chart" viewBox="0 0 640 150" preserveAspectRatio="none" aria-label="Measured renderer frame intervals"><path data-frame-path/></svg><div class="gx-chart-label"><span>OLDEST</span><span data-read="frame-scale">SCALE: —</span><span>LATEST</span></div>',
 '<hr class="gx-rule"><h2 class="gx-section-title">WORLD CAMERA MATRIX <span>4 × 4</span></h2><pre class="gx-matrix" data-read="matrix">Waiting for renderer…</pre><details class="gx-method"><summary>About these readings</summary><p>The camera matrix and frame intervals come from this running scene. Frame intervals include browser scheduling and rendering work, rather than an isolated GPU timing query. These are local measurements.</p></details></div>',
 '<div><h2 class="gx-section-title">SCENE / CURRENT STATE <span data-read="motion">—</span></h2><dl class="gx-readout"><dt>Timeline</dt><dd data-read="timeline">—</dd><dt>Camera X / Y / Z</dt><dd data-read="xyz">—</dd><dt>Draw calls / triangles</dt><dd data-read="draws">—</dd><dt>Active impact ripples</dt><dd data-read="ripples">—</dd><dt>Reflection updates</dt><dd data-read="reflections">—</dd><dt>Pixel ratio</dt><dd data-read="dpr">—</dd></dl>',
 '<h2 class="gx-section-title" style="margin-top:28px">FIELD PARAMETERS <span>SI UNITS</span></h2><dl class="gx-readout"><dt>Upward acceleration</dt><dd data-read="g">—</dd><dt>Flight time</dt><dd data-read="flight">—</dd><dt>Mercury density</dt><dd data-read="density">—</dd><dt>Surface tension</dt><dd data-read="tension">—</dd><dt>Micro-wave modes</dt><dd data-read="modes">—</dd></dl><details class="gx-method"><summary>Surface and trajectory model</summary><p>The surface uses finite-depth gravity-capillary waves. Droplets follow constant-acceleration trajectories and excite damped contact waves. This real-time model approximates an inverted liquid field; it does not solve full fluid dynamics.</p></details></div></div></section>',
 '<section class="gx-page spatial gx-archive-page" data-page="archive" hidden aria-labelledby="gx-archive-title"><div class="gx-annotation"><strong>Observation archive</strong><span>YOUR SAVED POINTS OF VIEW<br>THE FIELD REMAINS LIVE</span></div><div class="gx-sheet gx-archive-sheet"><div class="gx-topline">'+back+'<span class="gx-live" data-storage-status>LOCAL ARCHIVE</span></div><p class="gx-kicker">Archive / Observation records</p><div class="gx-intro"><h1 class="gx-heading" id="gx-archive-title" tabindex="-1">Keep a<br>point of view.</h1><p class="gx-copy">Keep a camera position and moment in the field. Restore it to continue your observation.</p></div>',
 '<label class="gx-name-field">OBSERVATION NAME <input data-observation-name type="text" maxlength="80" placeholder="e.g. Ceiling reflection / north transect" autocomplete="off"></label><div class="gx-actions"><button class="gx-button" data-action="save">SAVE CURRENT OBSERVATION +</button><button class="gx-button secondary" data-action="sessions">VIEW / SOUND ↗</button><button class="gx-button secondary" data-action="refresh">REFRESH RECORDS ↺</button></div><p class="gx-message" data-archive-message role="status"></p><div class="gx-archive-list" data-saved-list></div><details class="gx-method"><summary>Where observations are kept</summary><p>Records remain on this device. The local launcher uses SQLite; direct offline opening uses browser storage. Clearing browser data can remove browser-only records. Each observation stores scene settings rather than a rendered image.</p></details></div></section>',
 '<section class="gx-page spatial" data-page="simulation" hidden aria-labelledby="gx-simulation-title"><div class="gx-sheet gx-sim-sheet">'+back+'<p class="gx-kicker">Simulation / Field operations</p><h1 class="gx-heading" id="gx-simulation-title" tabindex="-1">Control the<br>inversion.</h1><p class="gx-copy">Choose a moment. Set the pace. Survey the inversion.</p><div class="gx-actions"><button class="gx-button" data-action="play">PAUSE MOTION Ⅱ</button><button class="gx-button secondary" data-action="reset">RESET ↺</button></div>',
 '<label class="gx-control"><span>FIELD TIMELINE <output data-sim-time>04:12</output></span><input data-sim-timeline type="range" min="0" max="600" step=".1" value="252" aria-label="Field timeline"></label><label class="gx-control"><span>PLAYBACK RATE <output data-sim-speed>1.00×</output></span><input data-sim-rate type="range" min=".5" max="3" step=".05" value="1" aria-label="Field playback rate"></label><label class="gx-control"><span>INSPECTION TARGET</span><select class="gx-select" data-sim-focus><option value="">Choose a survey target</option>',
 nodeDescriptions.map(([name],i)=>'<option value="'+i+'">0'+(i+1)+' / '+name+'</option>').join(''),'</select></label><div class="gx-actions"><button class="gx-button secondary" data-action="zoom-in">ZOOM +</button><button class="gx-button secondary" data-action="zoom-out">ZOOM −</button><button class="gx-button secondary" data-action="orbit">ORBIT ◎</button></div><div class="gx-actions"><button class="gx-button secondary" data-action="sound">TOGGLE SONIFICATION ♫</button><button class="gx-button secondary" data-action="save">SAVE VIEW +</button></div><p class="gx-message" data-sim-message role="status"></p><p class="gx-fieldnote">Space pauses · drag to orbit · scroll to zoom.</p></div></section>'
 ].join('');
 document.body.append(main);document.querySelector('#archive-panel')?.remove();document.querySelector('.brand').href=window.lunarCompany?.brandHref||'#/explore';
 document.querySelectorAll('.nav [data-route],footer [data-route]').forEach(button=>button.onclick=()=>go(button.dataset.route==='simulation'&&route==='simulation'?'explore':button.dataset.route));
 main.addEventListener('click',event=>{
  const focus=event.target.closest('[data-focus]');if(focus){window.__lunarDebug.focusNode(Number(focus.dataset.focus));update();return;}
  const action=event.target.closest('[data-action]')?.dataset.action;if(!action)return;
  if(['reset','play','zoom-in','zoom-out','orbit','sound'].includes(action)){document.getElementById(action)?.click();update();}
  if(action==='ocean')document.querySelector('#ocean-focus').click();
  if(action==='sessions')document.dispatchEvent(new CustomEvent('lunar:open-sessions'));
  if(action==='refresh')refreshArchive();if(action==='save')save();
 });
 main.querySelector('[data-sim-timeline]').addEventListener('input',event=>{restore({timeline:Number(event.target.value)});update();});
 main.querySelector('[data-sim-rate]').addEventListener('input',event=>{restore({speed:Number(event.target.value)});update();});
 main.querySelector('[data-sim-focus]').addEventListener('change',event=>{if(event.target.value!=='')window.__lunarDebug.focusNode(Number(event.target.value));update();});
 window.addEventListener('hashchange',render);window.addEventListener('lunar:telemetry',event=>{if(event.detail?.scene==='gravity'){lastTelemetry=event.detail;update();}});
 window.addEventListener('lunar:sessions',()=>{if(route==='archive')refreshArchive();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&route!=='explore'&&!document.querySelector('.lp-session:not([hidden])')){event.preventDefault();go('explore');}});
 const startReadouts=()=>{clearInterval(interval);interval=setInterval(()=>{if(!document.hidden)update();},500);};startReadouts();window.addEventListener('pagehide',()=>clearInterval(interval));window.addEventListener('pageshow',()=>{startReadouts();update();});
 if(!location.hash&&!window.lunarCompany?.isCompanyHash())history.replaceState(null,'','#/explore');render(false);
}
function restore(settings){window.dispatchEvent(new CustomEvent('lunar:restore',{detail:{settings:{scene:'gravity',...settings}}}));}
function render(focus=true){
 if(window.lunarCompany?.isCompanyHash()){route='explore';document.getElementById('gravity-experience').hidden=true;document.body.dataset.route='explore';window.__lunarDebug.setSimulation(false);return;}
 const requested=location.hash.replace(/^#\/?/,'').split('?')[0];route=routes.has(requested)?requested:'explore';if(!routes.has(requested))history.replaceState(null,'','#/explore');
 const main=document.getElementById('gravity-experience');if(!main)return;main.hidden=route==='explore';document.body.dataset.route=route;
 main.querySelectorAll('[data-page]').forEach(page=>{page.hidden=page.dataset.page!==route;});
 document.querySelectorAll('.nav [data-route]').forEach(button=>{const active=button.dataset.route===route;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
 window.__lunarDebug.setSimulation(route==='simulation');document.title=(route==='explore'?'Gravity anomaly':route[0].toUpperCase()+route.slice(1))+' / Lunar Paradox';
 document.dispatchEvent(new CustomEvent('lunar:route',{detail:{route,scene:'gravity'}}));window.dispatchEvent(new Event('resize'));
 if(route==='archive')refreshArchive();if(focus){if(route!=='explore')main.querySelector('[data-page="'+route+'"] h1')?.focus({preventScroll:true});else document.querySelector('#view-explore')?.focus({preventScroll:true});}update();
}
function update(){
 if(!mounted)return;const debug=window.__lunarDebug;if(!debug)return;const snapshot=debug.getSnapshot(),stats=debug.stats||{},t=debug.getTelemetry?.()||{},data=document.body.dataset;
 const read=(name,value)=>document.querySelectorAll('#gravity-experience [data-read="'+name+'"]').forEach(el=>el.textContent=value);
 read('fps',stats.frames>0?finite(stats.fps,0):'—');read('frame',finite(t.frameMs));read('droplets',t.dropletCount??stats.dropletCount??'—');read('contacts',t.contacts??'—');read('timeline',time(snapshot.timeline)+' / 10:00');read('motion',snapshot.paused?'PAUSED':'RUNNING');
 read('xyz',(t.cameraPosition||[]).map(v=>finite(v)).join(' / ')||'—');read('draws',(stats.drawCalls??'—')+' / '+(stats.triangles??'—').toLocaleString());read('ripples',t.activeRipples??'—');read('reflections',t.reflectionUpdates??'—');read('dpr',finite(debug.renderer?.getPixelRatio(),2));
 read('g',finite(t.fieldAcceleration,2)+' m/s²');read('flight',finite(t.flightTime,3)+' s');read('density',finite(t.fluid?.density,1)+' kg/m³');read('tension',finite(t.fluid?.surfaceTension,3)+' N/m');read('modes',t.fluid?.spectralModes??'—');
 const matrix=t.cameraMatrix;if(matrix?.length===16)read('matrix',[0,1,2,3].map(row=>[0,1,2,3].map(col=>finite(matrix[col*4+row],4).padStart(10)).join('  ')).join('\n'));
 if(route==='telemetry'&&t.frameSamples?.length){const samples=t.frameSamples.slice(t.frameIndex).concat(t.frameSamples.slice(0,t.frameIndex)).filter(v=>v>0&&Number.isFinite(v)),max=Math.max(33.34,...samples),path=samples.map((v,i)=>(i?'L':'M')+(i/Math.max(1,samples.length-1)*640).toFixed(2)+','+(148-v/max*140).toFixed(2)).join(' ');document.querySelector('[data-frame-path]').setAttribute('d',path);read('frame-scale','0–'+finite(max,1)+' ms');read('frame-window',samples.length+' renderer intervals');}
 document.querySelectorAll('[data-focus]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.focus)+1===Number(t.focusedNode))));
 const targetMenu=document.querySelector('[data-sim-focus]');if(document.activeElement!==targetMenu)targetMenu.value=snapshot.focusedNode>0?String(snapshot.focusedNode-1):'';
 const slider=document.querySelector('[data-sim-timeline]'),rate=document.querySelector('[data-sim-rate]');if(document.activeElement!==slider)slider.value=snapshot.timeline;if(document.activeElement!==rate)rate.value=snapshot.speed;
 document.querySelector('[data-sim-time]').textContent=time(snapshot.timeline);document.querySelector('[data-sim-speed]').textContent=finite(snapshot.speed,2)+'×';document.querySelector('[data-action=play]').textContent=snapshot.paused?'RESUME MOTION ▶':'PAUSE MOTION Ⅱ';
 const connection=lastTelemetry?.backend;document.querySelectorAll('[data-storage-status]').forEach(el=>el.textContent=connection?.connected?'LOCAL SERVER / CONNECTED':data.sessionStorage==='sqlite'?'SQLITE / THIS DEVICE':'LOCAL RUNTIME / THIS DEVICE');
}
async function save(){
 const buttons=[...document.querySelectorAll('#gravity-experience [data-action=save]')];buttons.forEach(button=>button.disabled=true);const message=document.querySelector(route==='archive'?'[data-archive-message]':'[data-sim-message]');
 try{if(typeof window.lunarSessions?.save!=='function')throw new Error('Storage is starting. Try again in a moment.');await window.lunarSessions.save(route==='archive'?document.querySelector('[data-observation-name]').value.trim()||undefined:undefined);message.textContent='Observation saved on this device.';if(route==='archive')await refreshArchive();}
 catch(error){message.textContent=error.message||'The observation could not be saved.';}finally{buttons.forEach(button=>button.disabled=false);}
}
async function refreshArchive(){
 const generation=++archiveGeneration,list=document.querySelector('[data-saved-list]'),message=document.querySelector('[data-archive-message]');if(!list)return;
 try{
  if(typeof window.lunarSessions?.list!=='function'){list.replaceChildren();const empty=element('div',{class:'gx-empty'});empty.append(element('h3',{},'Your observation records'),element('p',{class:'gx-copy'},'The local archive is connecting. Your scene remains available.'));list.append(empty);return;}
  const result=await window.lunarSessions.list();if(generation!==archiveGeneration||route!=='archive')return;const entries=Array.isArray(result)?result:result?.sessions||[];list.replaceChildren();
  if(!entries.length){const empty=element('div',{class:'gx-empty'});empty.append(element('span',{class:'gx-number'},'00 / NO RECORDS'),element('h3',{},'Begin with this point of view.'),element('p',{class:'gx-copy'},'Save the field as it stands, or enter the simulation to find a different perspective.'));list.append(empty);}
  entries.forEach((record,index)=>{
   const row=element('article',{class:'gx-saved'}),number=element('span',{class:'gx-number'},String(index+1).padStart(2,'0')),copy=element('div'),settings=record.state||record.settings||{},when=new Date(record.created||record.created_at);
   copy.append(element('h3',{},record.name||'Gravity observation'),element('p',{},(Number.isNaN(when.getTime())?'Local observation':when.toLocaleString())+' · '+time(settings.timeline)+' · '+finite(settings.speed,2)+'×'));
   const actions=element('div',{class:'gx-actions'}),open=element('button',{class:'gx-button secondary','aria-label':'Restore '+(record.name||'observation')},'RESTORE ↗'),remove=element('button',{class:'gx-button secondary','aria-label':'Delete '+(record.name||'observation')},'DELETE');
   open.onclick=async()=>{try{if(window.lunarSessions.restore)await window.lunarSessions.restore(record.id);else restore(settings);go(routes.has(settings.route)&&settings.route!=='archive'?settings.route:'simulation');}catch(error){message.textContent=error.message;}};
   remove.onclick=async()=>{remove.disabled=true;try{if(!window.lunarSessions.remove)throw new Error('Observation storage is not ready. Try again shortly.');await window.lunarSessions.remove(record.id);message.textContent='Observation removed.';if(window.lunarSessions.undoRemove){const undo=element('button',{class:'gx-button secondary'},'UNDO');undo.onclick=async()=>{undo.disabled=true;try{await window.lunarSessions.undoRemove(record.id);message.textContent='Observation restored.';await refreshArchive();}catch(error){message.textContent=error.message;undo.disabled=false;}};message.append(' ',undo);}refreshArchive();}catch(error){message.textContent=error.message;remove.disabled=false;}};
   actions.append(open,remove);row.append(number,copy,actions);list.append(row);
  });
 }catch(error){message.textContent='Archive unavailable: '+(error.message||'storage error');}
}
window.addEventListener('lunar:scene-ready',mount);mount();if(!mounted){let attempts=0;const ready=setInterval(()=>{mount();if(mounted||++attempts>1200)clearInterval(ready);},100);}
})();
