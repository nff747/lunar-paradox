/* Routes are product destinations. All scene controls act on the mounted renderer. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const routes = new Set(['explore','astrolabe','simulation','data','archive']);
  const archiveActions = new Set(['archive-save','restore','remove','undo']);
  const ringNames = ['The instrument / brass','The lattice / holographic','The orbit / reference'];
  const notes = [
    'The engraved ring anchors the instrument. A slow, bounded precession tips its plane beneath the crescent while the calibrated edge continues its own rotation.',
    'The luminous lattice turns against the engraved ring. Follow its front and rear arcs to read the depth between them.',
    'The outer trajectory describes the widest plane. Its restrained line keeps the shadow open while the orbital markers trace their path.'
  ];
  let route='explore', selectedRing=0, isolated=false, latest=null, sessionItems=[], archiveBusy=false, removedId=null, listRequest=0,studyStep=-1,captureBusy=false;
  const desk=document.createElement('section');
  desk.className='route-desk';desk.hidden=true;desk.setAttribute('aria-label','Astrolabe instrument desk');
  document.body.append(desk);
  const esc=value=>String(value??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const num=(value,digits=2)=>Number.isFinite(Number(value))?Number(value).toFixed(digits):'—';
  const clock=value=>Number.isFinite(value)?String(Math.floor(value/60)).padStart(2,'0')+':'+String(Math.floor(value%60)).padStart(2,'0'):'—';
  const engine=()=>window.__lunarDebug;
  const snapshot=()=>({...latest?.snapshot,...engine()?.getSnapshot?.()});
  const metrics=()=>engine()?.getMetrics?.()||latest?.renderer||{};
  const notice=text=>{const n=desk.querySelector('[data-notice]');if(n)n.textContent=text;};
  function presentCapture(captured){
    const control=desk.querySelector('[data-action="capture"]');if(!control)return;
    desk.querySelector('[data-capture-result]')?.remove();
    const result=document.createElement('div');result.className='capture-result';result.dataset.captureResult='true';result.setAttribute('aria-label','Captured 3D viewport');
    const save=document.createElement('a');save.className='capture-save';save.textContent='SAVE PNG';save.href=captured.png;save.download='ouroboros-view-'+Math.round(captured.snapshot.timeline)+'s.png';
    const preview=document.createElement('details'),summary=document.createElement('summary'),image=document.createElement('img');
    summary.textContent='PREVIEW';image.src=captured.png;image.alt='Captured Ouroboros 3D viewport';image.width=captured.width;image.height=captured.height;
    preview.append(summary,image);result.append(save,preview);
    control.closest('.route-grid').insertAdjacentElement('afterend',result);
    notice('Captured '+captured.width+' × '+captured.height+' / current 3D viewport. Select SAVE PNG to keep it.');
  }
  const button=(action,text,extra='')=>`<button type="button" data-action="${action}" ${extra}>${text}</button>`;
  const fields=rows=>`<dl>${rows.map(([label,id])=>`<div class="route-row"><dt>${label}</dt><dd data-readout="${id}">—</dd></div>`).join('')}</dl>`;
  const studies=[
    {title:'The engraved frame',views:[
      {title:'Read the metal',phase:1,time:0,camera:{azimuth:-.26,elevation:.16,distance:7.8},isolate:true},
      {title:'Turn the plane',phase:1,time:42,camera:{azimuth:.42,elevation:.32,distance:8.5},isolate:true},
      {title:'Return to alignment',phase:4,time:252,camera:{azimuth:0,elevation:0,distance:7.7},isolate:false}
    ]},
    {title:'The luminous lattice',views:[
      {title:'Read the lattice',phase:3,time:300,camera:{azimuth:.20,elevation:.10,distance:7.9},isolate:true},
      {title:'Cross the shadow',phase:3,time:318,camera:{azimuth:.62,elevation:.24,distance:8.6},isolate:true},
      {title:'Return to alignment',phase:4,time:252,camera:{azimuth:0,elevation:0,distance:7.7},isolate:false}
    ]},
    {title:'The outer trajectory',views:[
      {title:'Read the orbit',phase:4,time:252,camera:{azimuth:0,elevation:.27,distance:8.6},isolate:true},
      {title:'Reveal its inclination',phase:4,time:292,camera:{azimuth:.68,elevation:.31,distance:9.0},isolate:true},
      {title:'Return to alignment',phase:4,time:252,camera:{azimuth:0,elevation:0,distance:7.7},isolate:false}
    ]}
  ];
  function applyStudyView(ringIndex,viewIndex){
    const view=studies[ringIndex]?.views[viewIndex],api=engine();if(!view||!api)return false;
    selectedRing=ringIndex;studyStep=viewIndex;
    api.pause();api.setPhase(view.phase);api.setTime(view.time);api.setCamera(view.camera);api.inspectRing(ringIndex,view.isolate);
    isolated=view.isolate;latest=null;sync();return true;
  }
  const headings={
    astrolabe:['01 / THE INSTRUMENT','Geometry of<br>the shadow.','Three planes, one moving shadow. Select an orbit to read its motion, then turn the instrument in your hands.'],
    simulation:['02 / EXPERIMENT DESK','Time becomes<br>an instrument.','Move through ten minutes of celestial motion. Set the pace, find an alignment and keep an observation.'],
    data:['03 / LIVE DIAGNOSTICS','Read the<br>observatory.','A live reading of the instrument: its position, geometry and cadence.'],
    archive:['04 / OBSERVATION LOG','Keep a<br>point in time.','Give an alignment a name. Return to the same camera, chapter and moment.']
  };
  function content(name){
    if(name==='astrolabe')return `<p class="route-section-title"><span>OBJECT STUDIES</span><span>03 PLANES</span></p><ol class="ring-list">${ringNames.map((label,i)=>`<li>${button('ring',`<span>0${i+1}</span><span>${label}</span><small>↗</small>`,`data-ring="${i}" aria-pressed="${i===selectedRing}"`)}</li>`).join('')}</ol><p class="ring-note" data-ring-note>${notes[selectedRing]}</p><section class="spatial-study" aria-label="Guided spatial study"><div class="route-section-title"><span data-study-title>${studies[selectedRing].title}</span><span data-study-count>03 VIEWS</span></div><h2 data-study-view>Surface. Depth. Context.</h2><p>Move through three camera positions, then keep the view that reveals the instrument.</p><div class="route-grid">${button('study-next','BEGIN STUDY','class="route-primary"')}${button('study-context','FULL CONTEXT')}</div></section><div class="route-grid study-outputs">${button('capture','CAPTURE VIEW')}${button('save-view','KEEP OBSERVATION')}</div><details class="route-details"><summary>MANUAL INSPECTION</summary><div class="route-grid" style="margin-top:14px">${button('isolate',isolated?'RESTORE ALL PLANES':'ISOLATE SELECTED',`aria-pressed="${isolated}"`)}${button('all-rings','SHOW ALL PLANES')}</div><div class="route-grid" style="margin-top:8px">${button('camera-front','FRONT / ALIGNMENT')}${button('camera-oblique','OBLIQUE / DEPTH')}</div><p class="route-section-title">MATERIAL PHASE</p><div class="route-chapters">${[1,2,3,4].map(i=>button('phase',`0${i}`,`data-phase="${i}" aria-pressed="false"`)).join('')}</div><p class="route-caption">01 Origin · 02 Eclipse · 03 Geometry · 04 Shadow.</p></details><details class="route-details"><summary>PLANE MEASUREMENTS</summary>${fields([['LOCAL SPIN','ring-spin'],['LOCAL PRECESSION','ring-precession'],['QUATERNION / XYZW','ring-quaternion']])}</details>`;
    if(name==='simulation')return `<div class="route-section-title"><span>SEQUENCE / 00:00—10:00</span><span data-readout="timeline">—</span></div><svg class="route-wave" data-live-wave viewBox="0 0 600 50" preserveAspectRatio="none" aria-label="Audio waveform or labeled score preview"></svg><p class="route-caption" data-readout="wave-mode">Score preview · enable audio for a measured waveform.</p><label class="route-field">TIMELINE <output data-readout="timeline-exact">—</output><input data-control="timeline" type="range" min="0" max="600" step=".1" value="252" aria-label="Experiment timeline"></label><div class="route-grid">${button('play','PAUSE SEQUENCE','class="route-primary"')}${button('reference','REFERENCE / 04:12')}</div><div class="route-chapters">${[1,2,3,4].map(i=>button('phase',`0${i}`,`data-phase="${i}" aria-pressed="false"`)).join('')}</div><label class="route-field">TIME SCALE <output data-readout="speed">—</output><input data-control="speed" type="range" min=".1" max="5" step=".1" value="2.3" aria-label="Sequence speed"></label><div class="route-grid">${button('audio','ENABLE AUDIO','aria-pressed="false"')}${button('reset-camera','RESET CAMERA')}</div><label class="route-field">AUDIO OUTPUT <output data-readout="volume">—</output><input data-control="volume" type="range" min="0" max="1" step=".01" value=".35" aria-label="Audio volume"></label><p class="route-caption">A spatial score follows the instrument’s motion.</p>${fields([['OBSERVED CHAPTERS','visited'],['CAMERA / AZIMUTH','azimuth'],['CAMERA / ELEVATION','elevation']])}<div class="route-grid">${button('capture','CAPTURE VIEW')}${button('save-view','KEEP OBSERVATION')}</div>`;
    if(name==='data')return `<div class="route-ready" data-readout="connection">INITIALIZING LOCAL RENDERER</div>${fields([['RENDERED FRAMES / SEC','fps'],['DRAW CALLS / FRAME','drawCalls'],['TRIANGLES / FRAME','triangles'],['GEOMETRIES / TEXTURES','resources'],['PIXEL RATIO','pixelRatio'],['ROCK / WIRE VERTICES','vertices'],['TIMELINE / PHASE','time-phase'],['CAMERA / AZIMUTH','azimuth'],['CAMERA / ELEVATION','elevation'],['CAMERA / DISTANCE','distance']])}<article class="route-model"><h2>01 / Independent gyroscopes</h2><p>Three clocks drive opposing spin and a slow, bounded sway of each orbital plane.</p><code class="route-formula">q(t) = q₀ · qᵧ(A sin(ωₚt)) · q𝓏(ωₛt)</code></article><article class="route-model"><h2>02 / Eccentric orbital markers</h2><p>Eccentric trajectories carry the small orbital markers.</p><code class="route-formula">E − e sin(E) = M</code></article><article class="route-model"><h2>03 / Eclipse emission</h2><p>A luminous shell falls away from the eclipsed disk, with a directional gold limb.</p><code class="route-formula">T(s) = exp(−∫ σₜ ds)</code></article><details class="route-details"><summary>MEASUREMENT &amp; MODEL NOTES</summary><p>Render values are measured in this browser. Geometry and texture counts describe renderer resources, not memory bytes. Coordinates use scene units. Orbital motion is authored with Kepler trajectories; eclipse light uses sampled emission, raster shadows and bloom. These readings describe the instrument rather than an external astronomical feed.</p></details><div class="route-grid">${button('export','EXPORT LIVE STATE')}${button('graphics','VIEW / SOUND')}</div>`;
    return `<div class="route-ready" data-readout="storage-mode">LOCAL OBSERVATION STORAGE</div><p class="route-section-title">CURRENT OBSERVATION</p>${fields([['SEQUENCE / CHAPTER','time-phase'],['TIME SCALE','speed'],['VIEW / AZIMUTH','azimuth']])}<label class="route-field" for="observation-name">OBSERVATION NAME</label><input id="observation-name" type="text" maxlength="80" placeholder="Shadow alignment / study 01" autocomplete="off"><div class="route-grid" style="margin-top:10px">${button('archive-save','SAVE OBSERVATION','class="route-primary"')}${button('export','EXPORT STATE')}</div><p class="route-section-title"><span>SAVED VIEWS</span><span data-session-count>—</span></p><div data-session-list><p class="archive-empty">Reading the local observation log…</p></div><div data-undo ${removedId?'':'hidden'}>${button('undo','UNDO LAST REMOVAL','class="route-wide"')}</div><p class="route-caption">Saved on this device. Restore an observation or export its coordinates and sequence state.</p><p>${button('graphics','VIEW / SOUND','class="route-mini-link"')}</p>`;
  }
  function render(name,focus=false){
    route=name;document.body.dataset.route=name;document.body.classList.toggle('product-route',name!=='explore');
    document.body.classList.remove('simulation','data-focus','menu-open');
    const menu=$('#menu');if(menu){menu.removeAttribute('aria-expanded');menu.setAttribute('aria-label',name==='explore'?'Open instrument controls':'Return to explore');}
    document.querySelectorAll('header [data-route]').forEach(link=>{if(link.dataset.route===name)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    desk.hidden=name==='explore';
    const enter=$('#enterSimulation');if(enter)enter.textContent=name==='simulation'?'RETURN TO EXPLORE':'ENTER SIMULATION';
    if(name!=='explore'){
      const [eyebrow,title,intro]=headings[name];
      desk.innerHTML=`<div class="route-topline"><span>OUROBOROS / OBSERVATORY 003</span><a class="route-return" href="#/explore" data-route="explore">↗ RETURN TO ORBIT</a></div><p class="route-eyebrow">${eyebrow}</p><h1 tabindex="-1">${title}</h1><p class="route-intro">${intro}</p>${content(name)}<p class="route-notice" data-notice role="status" aria-live="polite"></p>`;
      if(focus)desk.querySelector('h1')?.focus({preventScroll:true});
      desk.scrollTop=0;
      if(name==='archive')loadSessions();
    }else if(focus){$('#navExplore')?.focus({preventScroll:true});}
    document.dispatchEvent(new CustomEvent('lunar:route',{detail:{route:name,scene:'astrolabe'}}));
    requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
    sync();
  }
  function fromHash(){const raw=location.hash.replace(/^#\/?/,'').split('?')[0];return routes.has(raw)?raw:'explore';}
  window.addEventListener('hashchange',()=>render(fromHash(),true));
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[data-route],button[data-route]');if(!link)return;
    const next=link.dataset.route;if(!routes.has(next))return;event.preventDefault();
    if(location.hash==='#/'+next)render(next,true);else location.hash='/'+next;
  });
  const read=(id,value)=>desk.querySelectorAll(`[data-readout="${id}"]`).forEach(n=>{n.textContent=value;});
  function sync(){
    if(desk.hidden)return;
    const api=engine(),s=snapshot(),m=metrics(),ready=!!api;
    if(Number.isInteger(s.focusedNode)&&s.focusedNode>=0&&s.focusedNode<=3){isolated=s.focusedNode>0;if(isolated&&selectedRing!==s.focusedNode-1){selectedRing=s.focusedNode-1;studyStep=-1;}}
    const ring=s.rings?.[selectedRing],isolate=desk.querySelector('[data-action="isolate"]');
    if(isolate){isolate.setAttribute('aria-pressed',String(isolated));isolate.textContent=isolated?'RESTORE ALL PLANES':'ISOLATE SELECTED';}
    desk.querySelectorAll('[data-ring]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.ring)===selectedRing)));
    const ringNote=desk.querySelector('[data-ring-note]');if(ringNote)ringNote.textContent=notes[selectedRing];
    const studyTitle=desk.querySelector('[data-study-title]'),studyCount=desk.querySelector('[data-study-count]'),studyView=desk.querySelector('[data-study-view]'),studyNext=desk.querySelector('[data-action="study-next"]');
    if(studyTitle)studyTitle.textContent=studies[selectedRing].title;
    if(studyCount)studyCount.textContent=studyStep<0?'03 VIEWS':String(studyStep+1).padStart(2,'0')+' / 03';
    if(studyView)studyView.textContent=studyStep<0?'Surface. Depth. Context.':studies[selectedRing].views[studyStep].title;
    if(studyNext)studyNext.textContent=studyStep<0?'BEGIN STUDY':studyStep===2?'RESTART STUDY':'NEXT VIEW';

    desk.querySelectorAll('[data-action]:not([data-action="export"]):not([data-action="graphics"])').forEach(b=>b.disabled=!ready||(archiveBusy&&archiveActions.has(b.dataset.action)));
    const capture=desk.querySelector('[data-action="capture"]');if(capture){capture.disabled=!ready||captureBusy||document.body.dataset.graphicsContext==='lost';capture.textContent=captureBusy?'CAPTURING…':'CAPTURE VIEW';}

    read('timeline',clock(s.timeline));read('timeline-exact',num(s.timeline,1)+' s');read('speed',num(s.speed)+' ×');read('volume',num((s.volume??.35)*100,0)+' %');
    read('time-phase',clock(s.timeline)+' / '+String(s.phase??'—').padStart(2,'0'));
    read('azimuth',num(s.camera?.azimuth,4)+' rad');read('elevation',num(s.camera?.elevation,4)+' rad');read('distance',num(s.camera?.distance,3)+' u');
    read('visited',(s.visitedChapters?.length??document.body.dataset.visitedNodes??'—')+' / 4 inspected');
    read('ring-spin',num(ring?.spinRate,3)+' rad/s');read('ring-precession',num(ring?.precessionRate,3)+' rad/s');read('ring-quaternion',ring?.quaternion?.map(x=>num(x,2)).join(' / ')||'—');
    const play=desk.querySelector('[data-action="play"]');if(play)play.textContent=s.paused?'RESUME SEQUENCE':'PAUSE SEQUENCE';
    const sound=desk.querySelector('[data-action="audio"]');if(sound){sound.disabled=!ready||document.body.dataset.audioBusy==='true';sound.textContent=s.audioEnabled?(s.audioState==='running'?'MUTE AUDIO':'RESUME AUDIO'):'ENABLE AUDIO';sound.setAttribute('aria-pressed',String(!!s.audioEnabled&&s.audioState==='running'));}
    desk.querySelectorAll('[data-phase]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.phase)===s.phase)));
    for(const [key,value] of Object.entries({timeline:s.timeline,speed:s.speed,volume:s.volume})){const input=desk.querySelector(`[data-control="${key}"]`);if(input&&document.activeElement!==input&&Number.isFinite(value))input.value=value;}
    const wave=desk.querySelector('[data-live-wave]');if(wave&&api?.getWaveform)wave.innerHTML=api.getWaveform();
    read('wave-mode',s.audioEnabled&&s.audioState==='running'?'Measured waveform / Web Audio analyser':'Score preview / enable audio for measured waveform');
    read('fps',num(m.fps??api?.fps,0));read('drawCalls',num(m.drawCalls??m.calls,0));read('triangles',num(m.triangles,0));
    read('resources',num(m.geometries,0)+' / '+num(m.textures,0));read('pixelRatio',num(m.pixelRatio));
    read('vertices',num(m.vertices,0)+' / '+num(m.wireVertices,0));
    read('connection',ready?'LIVE RENDERER / '+(latest?.backend?.connected?'LOCAL SERVICE CONNECTED':'DEVICE SESSION'):'INITIALIZING RENDERER');
    read('storage-mode',window.lunarSessions?.mode==='sqlite'?'ON DEVICE / OBSERVATION LOG':'THIS BROWSER / OBSERVATION LOG');
  }
  async function loadSessions(){
    const request=++listRequest;
    try{if(!window.lunarSessions?.list){setTimeout(()=>{if(route==='archive')loadSessions();},500);return;}const items=await window.lunarSessions.list();if(request!==listRequest)return;sessionItems=items;drawSessions();sync();}
    catch(error){if(request!==listRequest||route!=='archive')return;notice(error.message);const list=desk.querySelector('[data-session-list]');if(list)list.innerHTML='<p class="archive-empty">Observation storage is currently unavailable. Export the current state to keep a local copy.</p>';}
  }
  function drawSessions(){
    if(route!=='archive')return;
    const list=desk.querySelector('[data-session-list]');if(!list)return;
    const focused=list.contains(document.activeElement)?{id:document.activeElement.dataset.id,action:document.activeElement.dataset.action}:null;
    const restoreFocus=()=>{if(!focused)return;const target=[...list.querySelectorAll('[data-id]')].find(b=>b.dataset.id===focused.id&&b.dataset.action===focused.action)||list.querySelector('[data-action=restore]')||desk.querySelector('[data-action=undo]');target?.focus({preventScroll:true});};
    desk.querySelector('[data-session-count]').textContent=String(sessionItems.length).padStart(2,'0');
    if(!sessionItems.length){list.innerHTML='<p class="archive-empty">No observations yet.<br>Set a phase and camera angle, then save your first view above.</p>';restoreFocus();return;}
    list.innerHTML=sessionItems.map(item=>`<article class="archive-entry"><h2>${esc(item.name)}</h2><p>${esc(new Date(item.created).toLocaleString())}<br>${clock(item.state?.timeline)} / CHAPTER ${esc(item.state?.phase??'—')} / ${num(item.state?.speed)}×</p><div class="route-grid">${button('restore','RESTORE OBSERVATION',`data-id="${esc(item.id)}"`)}${button('remove','REMOVE',`data-id="${esc(item.id)}" aria-label="Remove ${esc(item.name)}"`)}</div></article>`).join('');restoreFocus();
  }
  desk.addEventListener('input',event=>{
    const api=engine(),input=event.target;if(!api)return;const value=Number(input.value);
    if(input.dataset.control==='timeline')api.setTime(value);
    if(input.dataset.control==='speed')api.setSpeed(value);
    if(input.dataset.control==='volume')api.setVolume(value);
    latest=null;sync();
  });
  desk.addEventListener('click',async event=>{
    const b=event.target.closest('[data-action]');if(!b)return;
    const action=b.dataset.action,api=engine();if(archiveBusy&&archiveActions.has(action))return;if(!api&&!['graphics','export'].includes(action))return;
    try{
      if(action==='ring'){selectedRing=Number(b.dataset.ring);studyStep=-1;api.inspectRing(selectedRing,isolated);desk.querySelectorAll('[data-ring]').forEach(n=>n.setAttribute('aria-pressed',String(Number(n.dataset.ring)===selectedRing)));desk.querySelector('[data-ring-note]').textContent=notes[selectedRing];}
      if(action==='study-next'){applyStudyView(selectedRing,studyStep<0||studyStep===2?0:studyStep+1);}
      if(action==='study-context'){applyStudyView(selectedRing,2);}
      if(action==='isolate'){isolated=!isolated;api.inspectRing(selectedRing,isolated);b.setAttribute('aria-pressed',String(isolated));b.textContent=isolated?'RESTORE ALL PLANES':'ISOLATE SELECTED';}
      if(action==='all-rings'){isolated=false;api.showAllRings();const n=desk.querySelector('[data-action="isolate"]');n.textContent='ISOLATE SELECTED';n.setAttribute('aria-pressed','false');}
      if(action==='camera-front')api.setCamera({azimuth:0,elevation:0,distance:7.7});
      if(action==='camera-oblique')api.setCamera({azimuth:.56,elevation:.28,distance:9});
      if(action==='phase')api.setPhase(Number(b.dataset.phase));
      if(action==='play')api.paused?api.resume():api.pause();
      if(action==='reference'){isolated=false;api.pause();api.setPhase(4);api.setTime(252);api.showAllRings();api.setCamera({azimuth:0,elevation:0,distance:7.7});}
      if(action==='reset-camera')api.setCamera({azimuth:0,elevation:0,distance:7.7});
      if(action==='audio')await api.toggleAudio();
      if(action==='save-view'){location.hash='/archive';return;}
      if(action==='capture'){
        if(captureBusy)return;captureBusy=true;const captureRoute=route;desk.querySelector('[data-capture-result]')?.remove();sync();
        try{const captured=await api.captureView();if(route===captureRoute)presentCapture(captured);}
        finally{captureBusy=false;sync();}
      }
      if(action==='graphics')document.dispatchEvent(new CustomEvent('lunar:open-sessions'));
      if(action==='export'){if(!api)throw Error('The renderer has not initialized yet.');const data={format:'lunar-observation-v1',scene:'astrolabe',created:new Date().toISOString(),route,snapshot:api.getSnapshot(),renderer:api.getMetrics()};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ouroboros-observation-'+Date.now()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notice('Live observation exported as JSON.');}
      if(archiveActions.has(action)){
        if(!window.lunarSessions)throw Error('Observation storage is still initializing.');
        archiveBusy=true;sync();
        if(action==='archive-save'){await window.lunarSessions.save(desk.querySelector('#observation-name').value.trim()||'Ouroboros / '+clock(api.time));notice('Observation saved on this device.');}
        if(action==='restore'){await window.lunarSessions.restore(b.dataset.id);notice('Saved observation restored.');}
        if(action==='remove'){await window.lunarSessions.remove(b.dataset.id);removedId=b.dataset.id;const undo=desk.querySelector('[data-undo]');if(undo)undo.hidden=false;notice('Observation removed. Undo is available below.');}
        if(action==='undo'&&removedId){await window.lunarSessions.undoRemove(removedId);removedId=null;const undo=desk.querySelector('[data-undo]');if(undo)undo.hidden=true;notice('Observation restored to the log.');}
        await loadSessions();archiveBusy=false;if(action==='remove'&&route==='archive'&&!desk.querySelector('[data-action=restore]')){sync();desk.querySelector('[data-action=undo]')?.focus({preventScroll:true});}
      }
      latest=null;sync();
    }catch(error){archiveBusy=false;notice(error.message||'This action could not be completed.');sync();}
  });
  window.addEventListener('lunar:telemetry',event=>{if(event.detail?.scene==='astrolabe'){latest=event.detail;sync();}});
  window.addEventListener('lunar:sessions',event=>{if(Array.isArray(event.detail?.sessions)){++listRequest;sessionItems=event.detail.sessions;drawSessions();sync();}});
  // A local fallback keeps file:// controls/readouts independent of the service.
  setInterval(()=>{if(!latest)sync();},500);
  render(fromHash());
})();
