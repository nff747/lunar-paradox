/* Syzygy route controller. The scene owns physics; this module owns navigation
   and user intentions. All numbers below are sampled from that live scene. */
(() => {
  'use strict';
  const routes=new Set(['realms','mission','data','simulation']);
  const host=document.createElement('section');
  host.className='sx-route';host.hidden=true;host.setAttribute('aria-label','Syzygy experience');
  document.body.append(host);
  let current='realms',lastTelemetry=null,lastSampleAt=0,history=[],focusNext=false,lastRemoved=null;
  const select=s=>document.querySelector(s);
  const routeButton=(name,label,cls='sx-button')=>'<button type="button" class="'+cls+'" data-go="'+name+'">'+label+'</button>';
  const back='<button type="button" class="sx-back" data-go="realms"><span aria-hidden="true">↖</span><span>BACK TO REALMS</span></button>';
  const chart=()=>'<svg class="sx-chart" viewBox="0 0 600 160" preserveAspectRatio="none" role="img" aria-label="Measured opening and damage history"><path data-chart-opening d=""/><path class="secondary" data-chart-damage d=""/></svg>';
  const metric=(name,key,unit='')=>'<div class="sx-metric"><dt>'+name+'</dt><dd><span data-value="'+key+'">—</span> <small>'+unit+'</small></dd></div>';
  const templates={
    mission:()=>back+`<div class="sx-sheet"><p class="sx-kicker">02 / MISSION · INSIDE THE DIVIDE</p><h1 class="sx-title" tabindex="-1">Two realms.<br>One practice.</h1><p class="sx-lede">Enter the space between experimentation and application.</p><div class="sx-spatial-map" aria-label="Pillars inside the rift"><button type="button" class="sx-world-node" hidden data-world-pillar="lab" aria-label="Focus Lab"><i></i><span>01 / LAB</span></button><button type="button" class="sx-world-node" hidden data-world-pillar="studio" aria-label="Focus Studio"><i></i><span>02 / STUDIO</span></button><button type="button" class="sx-world-node" hidden data-world-pillar="products" aria-label="Focus Products"><i></i><span>03 / PRODUCTS</span></button></div><div class="sx-pillars" role="tablist" aria-label="Explore our practice"><button type="button" role="tab" id="sx-tab-lab" aria-selected="true" aria-controls="sx-pillar-lab" data-pillar="lab">01 / LAB</button><button type="button" role="tab" id="sx-tab-studio" aria-selected="false" aria-controls="sx-pillar-studio" tabindex="-1" data-pillar="studio">02 / STUDIO</button><button type="button" role="tab" id="sx-tab-products" aria-selected="false" aria-controls="sx-pillar-products" tabindex="-1" data-pillar="products">03 / PRODUCTS</button></div><section class="sx-pillar" role="tabpanel" id="sx-pillar-lab" aria-labelledby="sx-tab-lab" data-pillar-panel="lab"><p class="sx-kicker">EXPERIMENTATION</p><h2>Ask a better question.</h2><p>Load the interface. Follow the fragments. See how an idea behaves when you put it under pressure.</p><div class="sx-actions">${routeButton('simulation','TAKE CONTROL ↗','sx-button primary')}${routeButton('data','SEE THE RESPONSE')}</div></section><section class="sx-pillar" role="tabpanel" id="sx-pillar-studio" aria-labelledby="sx-tab-studio" data-pillar-panel="studio" hidden><p class="sx-kicker">APPLICATION</p><h2>Make it tangible.</h2><p>Shape, light, motion and sound become one spatial interface. Inspect it from your own point of view.</p><div class="sx-actions">${routeButton('simulation','ENTER THE WORKSPACE ↗','sx-button primary')}</div></section><section class="sx-pillar" role="tabpanel" id="sx-pillar-products" aria-labelledby="sx-tab-products" data-pillar-panel="products" hidden><p class="sx-kicker">THIS EXPERIENCE</p><h2>The Syzygy interface.</h2><p>An interactive world, a local archive and a record of what you observed. Save a view. Return with a new question.</p><div class="sx-actions">${routeButton('simulation','OPEN SYZYGY ↗','sx-button primary')}${routeButton('data','YOUR OBSERVATIONS')}</div></section><p class="sx-journey-status" aria-live="polite" data-journey-status>OPENING THE DIVIDE</p></div>`,
    data:()=>back+`<div class="sx-sheet"><p class="sx-kicker">03 / DATA · LIVE SESSION</p><div class="sx-data-header"><div><h1 class="sx-title" tabindex="-1">Read the fracture.</h1><p class="sx-lede">The world responds. These are your observations.</p></div><div class="sx-connection" data-connection><i></i><span data-backend>CHECKING STORAGE</span></div></div><dl class="sx-metrics">${metric('OPENING','opening','%')}${metric('FRAME RATE','fps','FPS')}${metric('DAMAGE','damage','%')}${metric('LIVE FRAGMENTS','fragments')}</dl><div class="sx-data-lower"><div><div class="sx-sectionhead"><h2>SEPARATION / DAMAGE</h2><span data-history-duration>WAITING FOR SAMPLES</span></div><div class="sx-chart-legend"><span>— OPENING</span><span>— DAMAGE</span></div>${chart()}<div class="sx-chart-labels"><span>OLDER</span><span>LIVE · 0–1</span></div></div></div><div class="sx-actions sx-data-actions">${routeButton('simulation','RETURN TO THE EXPERIMENT ↗','sx-button primary')}<button type="button" class="sx-button" data-export>EXPORT ↓</button><button type="button" class="sx-button" data-session-open>VIEW / SOUND</button></div><p class="sx-export-status" role="status" data-export-status></p><section class="sx-saved" aria-label="Saved workbench views"><div class="sx-saved-header"><h2>YOUR SAVED VIEWS</h2><button type="button" class="sx-button" data-save-view>SAVE THIS VIEW +</button></div><div class="sx-saved-list" data-saved-list><p class="sx-saved-empty">Opening your local archive…</p></div><p class="sx-saved-status" role="status" data-saved-status></p></section><details class="sx-diagnostics"><summary>INSTRUMENT DETAILS <span aria-hidden="true">+</span></summary><div class="sx-data-lower"><dl class="sx-specs"><div><dt>Opening velocity</dt><dd><span data-value="velocity">—</span> U/s</dd></div><div><dt>Fracture work</dt><dd><span data-value="fractureWork">—</span> E</dd></div><div><dt>Damping loss</dt><dd><span data-value="dissipatedWork">—</span> E</dd></div><div><dt>Energy residual</dt><dd><span data-value="energyResidual">—</span> E</dd></div><div><dt>Fracture events</dt><dd data-text="events">—</dd></div><div><dt>Rejoin cycles</dt><dd data-text="resets">—</dd></div></dl><dl class="sx-specs"><div><dt>Graphics API</dt><dd data-text="api">—</dd></div><div><dt>Triangles</dt><dd data-text="triangles">—</dd></div><div><dt>Draw calls</dt><dd data-text="drawCalls">—</dd></div><div><dt>Pixel ratio</dt><dd data-text="pixelRatio">—</dd></div><div><dt>Simulation time</dt><dd data-text="simTime">—</dd></div><div><dt>Storage</dt><dd data-text="storage">—</dd></div></dl></div><p class="sx-note">U / normalized length · E / normalized energy. The rolling chart retains up to 120 actual observations from this open page. Sound is an authored sonification.</p></details></div>`,
    simulation:()=>'<div class="sx-sim-heading">'+back+'<p class="sx-kicker">LIVE EXPERIMENT / 01</p><h1 tabindex="-1">The Syzygy<br>interface.</h1><p>Drag to orbit.<br>Scroll to inspect.<br>Hold to reveal the divide.</p></div><aside class="sx-dock" aria-label="Fracture controls"><p class="sx-kicker">FRACTURE / CONTROL</p><div class="sx-stage" data-stage>Joined.</div><div class="sx-progress" role="meter" aria-label="Interface opening" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><button type="button" class="sx-hold" data-hold aria-pressed="false">HOLD TO FRACTURE</button><p class="sx-mini">RELEASE TO REJOIN · SPACE / HOLD</p><div class="sx-control-grid"><button type="button" class="sx-button" data-command="release">REJOIN</button><button type="button" class="sx-button" data-command="pause">PAUSE</button><button type="button" class="sx-button" data-command="reset-view">RESET VIEW</button><button type="button" class="sx-button" data-command="sound">SOUND OFF</button></div><label>TIME SCALE <span data-speed-value>1.00×</span><input type="range" min=".25" max="3" step=".05" value="1" aria-label="Simulation time scale" data-sim-speed></label><label>VIEW DISTANCE <span data-zoom-value>1.00×</span><input type="range" min=".82" max="1.65" step=".01" value="1" aria-label="Camera distance" data-sim-zoom></label><dl class="sx-specs"><div><dt>OPENING</dt><dd><span data-value="opening">—</span>%</dd></div><div><dt>DAMAGE</dt><dd><span data-value="damage">—</span>%</dd></div><div><dt>LIVE EJECTA</dt><dd data-value="fragments">—</dd></div></dl></aside><div class="sx-sim-strip"><div><p class="sx-kicker">SESSION CLOCK / SIMULATION</p><strong data-text="simTime">00:00.0</strong></div>'+chart()+routeButton('data','VIEW OBSERVATIONS ↗')+'</div>'
  };
  function getRoute(){const value=location.hash.replace(/^#\/?/,'').split(/[?&]/)[0];return routes.has(value)?value:'realms';}
  function navigate(route){if(!routes.has(route))return;focusNext=true;if(getRoute()===route)renderRoute();else location.hash='/'+route;}
  function setHold(active){window.dispatchEvent(new CustomEvent('lunar:hold',{detail:{active}}));}
  function renderRoute(){
    if(window.lunarCompany?.isCompanyHash()){setHold(false);current='realms';host.hidden=true;document.body.dataset.route='realms';document.dispatchEvent(new CustomEvent('lunar:route',{detail:{route:'realms',scene:'syzygy'}}));return;}
    const previous=current,focusWasInside=host.contains(document.activeElement);setHold(false);current=getRoute();if(current!==previous&&focusWasInside)focusNext=true;document.body.dataset.route=current;host.hidden=current==='realms';
    host.className='sx-route sx-'+current;
    if(current!=='realms'){host.innerHTML=templates[current]();bindRoute();update();}
    else host.replaceChildren();
    document.querySelectorAll('button[data-route]').forEach(button=>{const active=button.dataset.route===current;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
    document.dispatchEvent(new CustomEvent('lunar:route',{detail:{route:current,scene:'syzygy'}}));
    if(focusNext){if(current==='realms')select('button[data-route="realms"]')?.focus();else host.querySelector('h1')?.focus({preventScroll:true});focusNext=false;}
    host.scrollTop=0;
  }
  function command(action){
    if(action==='sound'){select('#audio')?.click();setTimeout(update,150);return;}
    if(action==='release')setHold(false);
    window.dispatchEvent(new CustomEvent('lunar:command',{detail:{action}}));update();
  }
  function bindRoute(){
    const tabs=[...host.querySelectorAll('[data-pillar]')];
    function selectPillar(tab,focus=false){document.body.dataset.missionPillar=tab.dataset.pillar;window.dispatchEvent(new CustomEvent('lunar:mission-pillar',{detail:{pillar:tab.dataset.pillar}}));host.querySelectorAll('[data-world-pillar]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.worldPillar===tab.dataset.pillar)));for(const button of tabs){const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;}host.querySelectorAll('[data-pillar-panel]').forEach(panel=>panel.hidden=panel.dataset.pillarPanel!==tab.dataset.pillar);if(focus)tab.focus();}
    for(const tab of tabs){tab.addEventListener('click',()=>selectPillar(tab));tab.addEventListener('keydown',event=>{const index=tabs.indexOf(tab);let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectPillar(tabs[next],true);}});}

    if(tabs.length){selectPillar(tabs.find(tab=>tab.dataset.pillar===document.body.dataset.missionPillar)||tabs[0]);host.querySelectorAll('[data-world-pillar]').forEach(node=>node.addEventListener('click',()=>{const tab=tabs.find(button=>button.dataset.pillar===node.dataset.worldPillar);if(tab)selectPillar(tab);}));}
    host.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>navigate(button.dataset.go)));
    host.querySelectorAll('[data-command]').forEach(button=>button.addEventListener('click',()=>command(button.dataset.command)));
    const hold=host.querySelector('[data-hold]');
    if(hold){
      hold.addEventListener('pointerdown',event=>{if(event.button!==0||event.isPrimary===false)return;event.preventDefault();hold.focus({preventScroll:true});try{hold.setPointerCapture(event.pointerId);setHold(true);}catch{setHold(false);}});
      for(const name of ['pointerup','pointercancel','lostpointercapture','blur'])hold.addEventListener(name,()=>setHold(false));
      hold.addEventListener('keydown',event=>{if(event.code==='Space'||event.code==='Enter'){event.preventDefault();if(!event.repeat)setHold(true);}});
      hold.addEventListener('keyup',event=>{if(event.code==='Space'||event.code==='Enter'){event.preventDefault();setHold(false);}});
    }
    host.querySelector('[data-sim-speed]')?.addEventListener('input',event=>window.dispatchEvent(new CustomEvent('lunar:restore',{detail:{settings:{speed:Number(event.target.value)}}})));
    host.querySelector('[data-sim-zoom]')?.addEventListener('input',event=>window.dispatchEvent(new CustomEvent('lunar:restore',{detail:{settings:{zoom:Number(event.target.value)}}})));
    host.querySelector('[data-session-open]')?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('lunar:open-sessions')));
    host.querySelector('[data-export]')?.addEventListener('click',exportObservations);
    host.querySelector('[data-save-view]')?.addEventListener('click',async event=>{
      const button=event.currentTarget;button.disabled=true;
      try{if(!window.lunarSessions?.save)throw new Error('Local archive is still starting. Try again shortly.');await window.lunarSessions.save('SYZYGY / '+new Date().toLocaleTimeString());savedStatus('Current view saved on this device.');await refreshSessions();}
      catch(error){savedStatus(error.message);}finally{button.disabled=false;}
    });
    if(current==='data')refreshSessions();
  }
  function savedStatus(message,undo=false){
    const node=host.querySelector('[data-saved-status]');if(!node)return;node.textContent=message;
    if(undo&&lastRemoved){const button=document.createElement('button');button.type='button';button.className='sx-undo';button.textContent='UNDO REMOVE';button.onclick=async()=>{try{await window.lunarSessions.undoRemove(lastRemoved);lastRemoved=null;savedStatus('Saved view restored.');await refreshSessions();}catch(error){savedStatus(error.message);}};node.append(' ',button);}
  }
  async function refreshSessions(provided){
    const list=host.querySelector('[data-saved-list]');if(!list)return;
    try{
      if(!window.lunarSessions?.list){list.innerHTML='<p class="sx-saved-empty">The local archive is starting. Open saved views / settings above to access your scene snapshots.</p>';return;}
      const sessions=provided||await window.lunarSessions.list();if(current!=='data'||!list.isConnected)return;
      list.replaceChildren();
      if(!sessions.length){list.innerHTML='<p class="sx-saved-empty">No views saved yet. Set up the camera, pause or adjust the time scale, then save a view here.</p>';return;}
      for(const item of sessions){
        const row=document.createElement('div');row.className='sx-saved-row';
        const open=document.createElement('button');open.type='button';open.className='sx-open';
        const name=document.createElement('strong');name.textContent=item.name||'SYZYGY / SAVED VIEW';
        const date=document.createElement('small');const parsed=new Date(item.created);date.textContent=Number.isNaN(parsed.getTime())?'LOCAL SNAPSHOT':parsed.toLocaleString();open.append(name,date);
        open.onclick=async()=>{try{await window.lunarSessions.restore(item.id);savedStatus('View restored.');}catch(error){savedStatus(error.message);}};
        const remove=document.createElement('button');remove.type='button';remove.className='sx-remove';remove.textContent='REMOVE';remove.setAttribute('aria-label','Remove '+(item.name||'saved view'));
        remove.onclick=async()=>{try{await window.lunarSessions.remove(item.id);lastRemoved=item.id;savedStatus('View removed.',true);await refreshSessions();}catch(error){savedStatus(error.message);}};
        row.append(open,remove);list.append(row);
      }
    }catch(error){list.innerHTML='<p class="sx-saved-empty">Local archive could not be read. Your running scene is unaffected.</p>';savedStatus(error.message);}
  }
  function sample(){
    const debug=window.__lunarDebug,dataset=document.body.dataset;
    if(!debug?.ready)return null;
    const runtime=debug.getSnapshot?.()||{},physics=debug.getPhysicsSnapshot?.()||{};
    return {timestamp:new Date().toISOString(),elapsed:performance.now()/1000,opening:physics.opening??debug.paradox,damage:physics.damage,velocity:physics.openingVelocity,fractureWork:physics.fractureWork,dissipatedWork:physics.dissipatedWork,energyResidual:physics.energyResidual,events:physics.fractureEvents,resets:physics.externalRejoinResets,fragments:Number(dataset.activeEjecta)||0,fps:Number(dataset.fps)||debug.fps,triangles:debug.renderer?.info?.render?.triangles,drawCalls:debug.renderer?.info?.render?.calls,pixelRatio:debug.renderer?.getPixelRatio?.(),simTime:runtime.simulationTime??lastTelemetry?.snapshot?.simulationTime??Number(dataset.simulationTime),runtime};
  }
  const number=(value,digits=1)=>Number.isFinite(value)?value.toFixed(digits):'—';
  function clock(value){if(!Number.isFinite(value))return '—';const minutes=Math.floor(value/60);return String(minutes).padStart(2,'0')+':'+(value%60).toFixed(1).padStart(4,'0');}
  function update(){
    const row=sample();if(!row)return;
    const values={opening:number(row.opening*100),damage:number(row.damage*100),velocity:number(row.velocity,3),fractureWork:number(row.fractureWork,4),dissipatedWork:number(row.dissipatedWork,3),energyResidual:Number.isFinite(row.energyResidual)?row.energyResidual.toExponential(2):'—',fragments:row.fragments,fps:number(row.fps,0)};
    host.querySelectorAll('[data-value]').forEach(node=>node.textContent=values[node.dataset.value]??'—');
    const backend=lastTelemetry?.backend,connected=backend?.connected===true||document.body.dataset.sessionStorage==='sqlite';
    const text={api:document.body.dataset.graphicsApi||'WebGL2',triangles:Number.isFinite(row.triangles)?row.triangles.toLocaleString():'—',drawCalls:row.drawCalls??'—',pixelRatio:number(row.pixelRatio,2)+'×',simTime:clock(row.simTime),events:row.events??'—',resets:row.resets??'—',storage:connected?'ON DEVICE':'BROWSER STORAGE'};
    host.querySelectorAll('[data-text]').forEach(node=>node.textContent=text[node.dataset.text]??'—');
    const connection=host.querySelector('[data-connection]');if(connection)connection.dataset.connected=String(connected);
    const backendNode=host.querySelector('[data-backend]');if(backendNode)backendNode.textContent=connected?'LOCAL SESSION / CONNECTED':'OFFLINE / BROWSER STORAGE';
    const stage=host.querySelector('[data-stage]');if(stage)stage.textContent=row.opening>.98?'Separated.':row.opening>.01?(Number(row.velocity)<-.001?'Rejoining.':'Opening.'):'Joined.';
    const meter=host.querySelector('[role=meter]');if(meter){meter.setAttribute('aria-valuenow',number(row.opening*100,1));meter.querySelector('i').style.width=(Math.max(0,Math.min(1,row.opening))*100)+'%';}
    const pause=host.querySelector('[data-command="pause"]');if(pause){pause.textContent=row.runtime.paused?'RESUME':'PAUSE';pause.setAttribute('aria-pressed',String(!!row.runtime.paused));}
    const sound=host.querySelector('[data-command="sound"]');if(sound){const enabled=select('#audio')?.getAttribute('aria-pressed')==='true';sound.textContent=enabled?'SOUND ON':'SOUND OFF';sound.setAttribute('aria-pressed',String(enabled));}
    for(const [key,value] of [['speed',row.runtime.speed],['zoom',row.runtime.camera?.distance]]){const input=host.querySelector('[data-sim-'+key+']');if(input&&Number.isFinite(value)){if(document.activeElement!==input)input.value=String(value);host.querySelector('[data-'+key+'-value]').textContent=value.toFixed(2)+'×';}}
    for(const [field,selector] of [['opening','[data-chart-opening]'],['damage','[data-chart-damage]']]){
      const path=history.map((item,i)=>{const value=item[field];return Number.isFinite(value)?(i?'L':'M')+((120-history.length+i)/119*600).toFixed(2)+','+(158-Math.max(0,Math.min(1,value))*156).toFixed(2):'';}).join(' ');
      host.querySelectorAll(selector).forEach(node=>node.setAttribute('d',path));
    }
    const duration=host.querySelector('[data-history-duration]');if(duration)duration.textContent=history.length+' SAMPLES / '+number(history.length>1?history.at(-1).elapsed-history[0].elapsed:0,1)+' s';
  }
  function exportObservations(){
    const data={schema:'lunar-paradox.observations.v1',scene:'syzygy',recordedAt:new Date().toISOString(),units:{length:'normalized U',time:'s',energy:'normalized M U²/s²'},model:window.__lunarDebug?.getPhysicsSnapshot?.().model||null,history:history.map(({runtime,...row})=>row),current:sample()};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='syzygy-observations-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    const status=host.querySelector('[data-export-status]');if(status)status.textContent='Exported '+history.length+' measured observations. Save the JSON file in your browser download dialog.';
  }
  document.querySelectorAll('button[data-route]').forEach(button=>button.addEventListener('click',()=>navigate(button.dataset.route)));
  select('.brand')?.addEventListener('click',event=>{event.preventDefault();navigate('realms');});
  addEventListener('hashchange',renderRoute);
  addEventListener('keydown',event=>{if(event.key==='Escape'&&current!=='realms'&&!document.querySelector('.lp-session:not([hidden])')){setHold(false);navigate('realms');}});
  addEventListener('lunar:hold-state',event=>{const hold=host.querySelector('[data-hold]');if(hold)hold.setAttribute('aria-pressed',String(event.detail?.active===true));});
  addEventListener('blur',()=>setHold(false));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setHold(false);});
  addEventListener('lunar:spatial',event=>{if(current!=='mission')return;const state=event.detail;if(state?.route!=='mission')return;for(const point of state.points||[]){const node=host.querySelector('[data-world-pillar="'+point.id+'"]');if(!node)continue;node.hidden=!point.visible;if(point.visible){node.style.left=point.x+'px';node.style.top=point.y+'px';}}const status=host.querySelector('[data-journey-status]');if(status){const text=state.approach>.92?'INSIDE THE DIVIDE · SELECT A PILLAR':state.approach>.2?'APPROACHING THE RIFT':'OPENING THE DIVIDE';if(status.textContent!==text)status.textContent=text;}});
  addEventListener('lunar:sessions',event=>{if(current==='data')refreshSessions(event.detail?.sessions);});
  addEventListener('lunar:telemetry',event=>{if(event.detail?.scene==='syzygy')lastTelemetry=event.detail;});
  document.addEventListener('lunar:state',event=>{if(event.detail?.scene==='syzygy'){lastTelemetry={...lastTelemetry,snapshot:{...lastTelemetry?.snapshot,...event.detail}};}});
  setInterval(()=>{if(document.hidden||current==='realms')return;const now=performance.now();if(now-lastSampleAt>=450){const row=sample();if(row){history.push(row);if(history.length>120)history.shift();lastSampleAt=now;}}update();},500);
  if(!window.lunarCompany?.isCompanyHash()&&location.hash&&!/^#\/(realms|mission|data|simulation)$/.test(location.hash))historyReplace();
  function historyReplace(){window.history.replaceState(null,'','#/'+getRoute());}
  renderRoute();
})();
