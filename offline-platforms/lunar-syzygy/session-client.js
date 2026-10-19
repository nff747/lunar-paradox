/* Local scene persistence. The renderer remains independent of this service. */
(() => {
  let path;try{path=decodeURIComponent(location.pathname)}catch{path=location.pathname}
  const declaredScene=document.body.dataset.scene;
  let scene = ['syzygy','gravity','astrolabe'].includes(declaredScene)?declaredScene:path.includes('gravity') ? 'gravity' : path.includes('astrolabe') ? 'astrolabe' : 'syzygy';
  let mode = 'browser', ready = false, restoring = false, lastSave = 0, interacted=false;
  const playbackControl='#motion,#play,#playPause,#enter,#enterSimulation,#slower,#faster,#speed,[data-motion],[data-speed],[data-control],[data-command],[data-hold],[data-sim-speed],[data-sim-zoom],[data-action="play"],[data-action="phase"],[data-action="reference"]';
  document.addEventListener('pointerdown',event=>{if(!ready&&event.target.closest?.(playbackControl))interacted=true},true);
  document.addEventListener('keydown',event=>{if(!ready&&(event.target.closest?.(playbackControl)||(event.code==='Space'&&scene!=='syzygy'&&!/INPUT|SELECT|TEXTAREA/.test(event.target.tagName))))interacted=true},true);
  let state = {quality: 'ultra', volume: .35, speed: scene==='astrolabe'?2.3:1, paused: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false};
  let sessions = [], trash = [], panel, status, returnFocus, pendingSettings, saving, measuring=false;
  let bootPromise, cancelMeasurement;
  const inertBefore=new Map();
  let backend={connected:false,source:'browser',uptimeSeconds:null,sessionCount:0}, stream, lastRuntimePost=0, posting=false;
  const key = () => `lunar-paradox:${scene}:v3`;
  const routes={syzygy:['realms','mission','data','simulation'],gravity:['explore','observatory','telemetry','archive','simulation'],astrolabe:['explore','astrolabe','simulation','data','archive']};
  function cleanState(value){
    if(!value||typeof value!=='object'||Array.isArray(value))return {};
    const clean={},limits={volume:[0,1],paradox:[0,1],speed:[.1,5],timeline:[0,600],phase:[1,4],focusedNode:[0,6],simulationTime:[0,1e9],dissolve:[-2,2]};
    for(const [field,item] of Object.entries(value)){
      if(limits[field]){const [min,max]=limits[field];if(typeof item==='number'&&Number.isFinite(item)&&item>=min&&item<=max&&(!['phase','focusedNode'].includes(field)||Number.isInteger(item)))clean[field]=item;}
      else if(field==='quality'&&['ultra','high','balanced'].includes(item))clean[field]=item;
      else if(field==='paused'&&typeof item==='boolean')clean[field]=item;
      else if(field==='route'&&routes[scene].includes(item))clean[field]=item;
      else if(field==='camera'&&item&&typeof item==='object'&&Object.keys(item).length===3){const axes={azimuth:[-10000,10000],elevation:[-Math.PI/2,Math.PI/2],distance:[.1,100]};if(Object.entries(axes).every(([axis,[min,max]])=>typeof item[axis]==='number'&&Number.isFinite(item[axis])&&item[axis]>=min&&item[axis]<=max))clean[field]={...item};}
    }return clean;
  }
  function cleanRecords(value){return Array.isArray(value)?value.filter(item=>item&&typeof item.id==='string'&&item.id.length&&typeof item.name==='string'&&item.name.trim()&&typeof item.created==='string'&&Number.isFinite(Date.parse(item.created))&&item.state&&typeof item.state==='object'&&!Array.isArray(item.state)).map(item=>({...item,name:item.name.slice(0,80),state:cleanState(item.state)})).slice(0,30):[];}
  function localRead(){try{const value=JSON.parse(localStorage.getItem(key())||'{}');return {state:cleanState(value?.state),sessions:cleanRecords(value?.sessions),trash:cleanRecords(value?.trash)}}catch{return {state:{},sessions:[],trash:[]}}}
  function localWrite(value={state,sessions,trash}){try{localStorage.setItem(key(),JSON.stringify(value));return true}catch{return false}}
  function commitArchive(nextSessions,nextTrash){if(!localWrite({state,sessions:nextSessions,trash:nextTrash}))throw new Error('Browser storage is unavailable. The saved views were not changed.');sessions=nextSessions;trash=nextTrash;}
  async function api(route, method='GET', body){
    const response = await fetch('/api/' + route + '?scene='+encodeURIComponent(scene), {method,signal:AbortSignal.timeout(4000),headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
    const result = await response.json();
    if(!response.ok)throw new Error(result.error || 'Local storage request failed');
    return result;
  }
  function notice(text){if(status)status.textContent=text;document.body.dataset.sessionStatus=text;}
  function applyQuality(quality){
    const renderer=window.__lunarDebug?.renderer;
    if(renderer){const cap={ultra:2.5,high:1.6,balanced:1}[quality]||2.5;const scale=quality==='ultra'?Math.min(Math.max(devicePixelRatio,1.5),cap):Math.min(devicePixelRatio,cap);renderer.setPixelRatio(scale);const composer=window.__lunarDebug?.composer;if(composer){composer.setPixelRatio(scale);}window.dispatchEvent(new Event('resize'));}
    window.dispatchEvent(new CustomEvent('lunar:quality',{detail:quality}));
  }
  function describeRenderer(){
    const renderer=window.__lunarDebug?.renderer;if(!renderer)return;
    const gl=renderer.getContext(),info=gl.getExtension('WEBGL_debug_renderer_info');
    document.body.dataset.graphicsDevice=String(gl.getParameter(info?info.UNMASKED_RENDERER_WEBGL:gl.RENDERER));
    document.body.dataset.graphicsApi=String(gl.getParameter(gl.VERSION));
  }
  function restore(settings){
    restoring=true;state={...state,...settings};applyQuality(state.quality);
    window.dispatchEvent(new CustomEvent('lunar:volume',{detail:state.volume}));
    window.dispatchEvent(new CustomEvent('lunar:restore',{detail:{settings}}));
    setTimeout(()=>restoring=false,250);
  }
  function sample(){
    const data=document.body.dataset, timeline=document.querySelector('#timeline');
    const value={...state};
    const snapshot=cleanState(window.__lunarDebug?.getSnapshot?.());Object.assign(value,snapshot);
    const missing=field=>snapshot[field]===undefined;
    if(missing('paused')&&(data.paused==='true'||data.paused==='false'))value.paused=data.paused==='true';
    const pauseCommand=document.querySelector('#playPause,#play,#motion')?.getAttribute('aria-label')||'';
    if(missing('paused')&&/^(Play|Resume)/i.test(pauseCommand))value.paused=true;
    if(missing('paused')&&/^Pause/i.test(pauseCommand))value.paused=false;
    if(missing('timeline')&&timeline&&Number.isFinite(Number(timeline.value)))value.timeline=Number(timeline.value);
    if(missing('phase')&&data.phase&&Number(data.phase)>=1&&Number(data.phase)<=4)value.phase=Number(data.phase);
    if(missing('paradox')&&data.paradox)value.paradox=Number(data.paradox);
    if(missing('route')&&data.route)value.route=data.route;
    return value;
  }
  function serializableState(value){return cleanState(value);}
  async function persist(){
    if(!ready||restoring)return;
    state={...state,...sample()};
    const settings=serializableState(state);delete settings.paradox;delete settings.camera;
    if(mode!=='sqlite'){if(!localWrite())notice('This tab only: browser storage is unavailable');return}
    pendingSettings=settings;
    if(saving)return saving;
    saving=(async()=>{while(pendingSettings){const next=pendingSettings;pendingSettings=null;try{await api('settings','PUT',next)}catch(error){notice(error.message)}}})().finally(()=>saving=null);
    return saving;
  }
  function emitSessions(){window.dispatchEvent(new CustomEvent('lunar:sessions',{detail:{sessions:sessions.map(item=>({...item})),mode}}));}
  async function sceneReady(){await bootPromise;if(typeof window.__lunarDebug?.getSnapshot==='function')return;await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>{window.removeEventListener('lunar:ready',done);reject(new Error('The 3D scene is still starting. Try again when it is visible.'))},30000);function done(){clearTimeout(timeout);resolve()}window.addEventListener('lunar:ready',done,{once:true})});}
  async function listSessions(){await bootPromise;if(mode==='sqlite')sessions=(await api('sessions')).sessions;return sessions.map(item=>({...item}));}
  async function saveSnapshot(label){
    await sceneReady();
    const now=new Date(),name=typeof label==='string'&&label.trim()?label.trim().slice(0,80):`${scene.toUpperCase()} / ${now.toLocaleTimeString()}`,saved=serializableState(sample());
    try{
      let item;if(mode==='sqlite'){item=(await api('sessions','POST',{name,state:saved})).session;sessions.unshift(item)}
      else{item={id:crypto.randomUUID(),name,created:now.toISOString(),state:saved};commitArchive([item,...sessions].slice(0,30),trash)}
      notice('Scene snapshot saved locally');renderSessions();emitSessions();return item;
    }catch(error){notice(error.message);throw error}
  }
  async function restoreSnapshot(id){await sceneReady();let item=sessions.find(item=>item.id===id);if(!item){await listSessions();item=sessions.find(item=>item.id===id)}if(!item)throw new Error('Saved view not found');restore(item.state);if(item.state.route)location.hash='#/'+item.state.route;notice('Saved view and timeline restored');return item;}
  async function removeSnapshot(id){await bootPromise;const item=sessions.find(item=>item.id===id);if(!item)throw new Error('Saved view not found');const next=sessions.filter(item=>item.id!==id),removed=[...trash,item].slice(-30);if(mode==='sqlite'){await api('sessions/'+encodeURIComponent(id),'DELETE',{});sessions=next;trash=removed}else commitArchive(next,removed);renderSessions();emitSessions();return true;}
  async function undoRemove(id){await bootPromise;const item=trash.find(item=>item.id===id),removed=trash.filter(item=>item.id!==id);if(mode==='sqlite'){await api('sessions/'+encodeURIComponent(id)+'/restore','POST',{});sessions=(await api('sessions')).sessions;trash=removed}else if(item)commitArchive([item,...sessions].slice(0,30),removed);else throw new Error('Removed view not found');renderSessions();emitSessions();return true;}

  function renderSessions(){
    const list=panel?.querySelector('[data-session-list]');if(!list)return;list.replaceChildren();
    if(!sessions.length){const item=document.createElement('p');item.textContent='No saved scenes. Save a snapshot to return to a phase later.';list.append(item)}
    for(const item of sessions){
      const row=document.createElement('button');row.type='button';row.className='lp-snapshot';
      row.textContent=`${item.name} · ${new Date(item.created).toLocaleDateString()}`;
      row.addEventListener('click',()=>{restoreSnapshot(item.id).then(closeSessions).catch(error=>notice(error.message))});list.append(row);
    }
  }
  function closeSessions(){
    if(!panel)return;panel.hidden=true;
    for(const [node,value] of inertBefore){if(node.isConnected)node.inert=value}inertBefore.clear();
    if(returnFocus?.isConnected)returnFocus.focus();
  }
  function syncSceneControls(){
    if(!panel)return;
    const motion=panel.querySelector('[data-motion]'),sound=panel.querySelector('[data-sound]'),speed=panel.querySelector('[data-speed]'),source=document.querySelector('#audio,#sound,#audioToggle');
    if(motion)motion.textContent=sample().paused?'Resume motion':'Pause motion';
    if(sound){sound.disabled=!source;sound.textContent=source?.getAttribute('aria-pressed')==='true'?'Mute scene sound':'Enable scene sound';}
    if(speed&&document.activeElement!==speed){speed.value=state.speed;panel.querySelector('[data-speed-value]').textContent=Number(state.speed).toFixed(2)+'×';}
  }
  async function measureFrames(durationMs=8000,fractureSequence=false){
    if(measuring)return;
    const output=panel?.querySelector('[data-performance-result]');
    if(!ready||typeof window.__lunarDebug?.getSnapshot!=='function'){if(output)output.textContent='The scene is still starting. Try again when it is visible.';return;}
    if(fractureSequence&&(scene!=='syzygy'||sample().paused)){
      if(output)output.textContent='Resume the scene before running the fracture sequence.';return;
    }
    measuring=true;
    if(fractureSequence){
      closeSessions();
      if(location.hash!=='#/realms'){await new Promise(resolve=>{window.addEventListener('hashchange',()=>requestAnimationFrame(resolve),{once:true});location.hash='/realms';});}
    }
    const started=performance.now(),samples=[],visibility={visible:0,hidden:0};
    const initial={quality:state.quality,width:innerWidth,height:innerHeight,pixelRatio:window.__lunarDebug?.renderer?.getPixelRatio()};
    const observed={maximumOpening:0,maximumActiveFragments:0,openingSamples:0,closedSamples:0,fullyOpenSamples:0,pausedSamples:0,fractureEventsStart:Number(document.body.dataset.fractureEvents)||0,healingResetsStart:Number(document.body.dataset.healingResets)||0},buttons=[...panel.querySelectorAll('[data-measure]')],cancel=panel.querySelector('[data-cancel-measure]');
    let previous=started,previousVisibility=document.visibilityState,raf,finished=false,drive=false,lastObservation=-Infinity,changed=false;
    buttons.forEach(button=>button.disabled=true);cancel.hidden=false;
    if(output)output.textContent=fractureSequence?'Measuring four fracture and rejoin cycles over 60 seconds…':'Measuring '+(durationMs/1000)+' seconds of browser frame pacing…';
    function hold(active){if(drive===active)return;drive=active;window.dispatchEvent(new CustomEvent('lunar:hold',{detail:{active}}));}
    function finish(reason='complete'){
      if(finished)return;finished=true;measuring=false;cancelAnimationFrame(raf);clearTimeout(timer);hold(false);cancelMeasurement=undefined;observed.fractureEventsEnd=Number(document.body.dataset.fractureEvents)||0;observed.healingResetsEnd=Number(document.body.dataset.healingResets)||0;
      const sorted=[...samples].sort((a,b)=>a-b),elapsed=samples.reduce((sum,value)=>sum+value,0),percentile=p=>sorted.length?sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))]:null;
      const result={requestedSeconds:durationMs/1000,scene,...initial,mode:fractureSequence?'fracture-and-rejoin':'current-scene',status:reason,settingsChanged:changed,foregroundIntervals:samples.length,foregroundSeconds:Number((visibility.visible/1000).toFixed(2)),hiddenSeconds:Number((visibility.hidden/1000).toFixed(2)),fps:elapsed?Number((samples.length*1000/elapsed).toFixed(1)):null,p50ms:percentile(.5),p95ms:percentile(.95),over33ms:samples.filter(value=>value>33.34).length,...(fractureSequence?{observed}:{} )};
      document.body.dataset.frameMeasurement=JSON.stringify(result);
      if(output)output.textContent=samples.length>=30?`${reason==='complete'?'':'Stopped · '}${result.fps} FPS · median ${result.p50ms.toFixed(1)} ms · p95 ${result.p95ms.toFixed(1)} ms · ${result.over33ms} frames above 33 ms${result.hiddenSeconds?' · background time excluded':''}${changed?' · view settings changed':''}`:`Only ${samples.length} foreground intervals. Keep this page visible and measure again.`;
      buttons.forEach(button=>button.disabled=false);cancel.hidden=true;
    }
    function frame(now){
      const visible=document.visibilityState==='visible'&&previousVisibility==='visible',delta=now-previous;
      visibility[visible?'visible':'hidden']+=delta;if(visible&&delta>0)samples.push(delta);
      changed=changed||innerWidth!==initial.width||innerHeight!==initial.height||state.quality!==initial.quality||window.__lunarDebug?.renderer?.getPixelRatio()!==initial.pixelRatio;
      if(fractureSequence){
        // Exercise the production cohesive solver and ejecta, never a surrogate.
        hold(visible&&(now-started)%15000<10000);
        if(visible&&now-lastObservation>=100){lastObservation=now;const view=window.__lunarDebug?.getSnapshot?.()||{},data=document.body.dataset;observed.maximumOpening=Math.max(observed.maximumOpening,Number(view.paradox??data.paradox)||0);observed.maximumActiveFragments=Math.max(observed.maximumActiveFragments,Number(data.activeEjecta)||0);observed.openingSamples++;const opening=Number(view.paradox??data.paradox)||0;if(opening<.001)observed.closedSamples++;if(opening>.98)observed.fullyOpenSamples++;if(view.paused)observed.pausedSamples++;}
      }
      previous=now;previousVisibility=document.visibilityState;
      if(now-started>=durationMs)finish();else raf=requestAnimationFrame(frame);
    }
    cancelMeasurement=()=>finish('cancelled');cancel.onclick=cancelMeasurement;
    const timer=setTimeout(()=>finish(),durationMs+500);raf=requestAnimationFrame(frame);
  }
  async function showSessions(){
    await bootPromise;
    if(!panel){
      const css=document.createElement('style');css.textContent=`.lp-session{position:fixed;z-index:60;right:18px;top:76px;width:min(352px,calc(100vw - 36px));max-height:calc(100vh - 160px);overflow:auto;padding:22px;background:#080a0ff2;border:1px solid #74717c66;color:#d7d5db;font:11px/1.6 monospace;box-shadow:0 12px 80px #000a;backdrop-filter:blur(18px)}.lp-session[hidden]{display:none}.lp-diagnostics{margin-top:18px;border-top:1px solid #7774;padding-top:12px}.lp-diagnostics summary{cursor:pointer;font-size:10px;letter-spacing:.08em}.lp-diagnostics[open] summary{margin-bottom:10px}.lp-session h2{font:500 13px monospace;letter-spacing:.15em}.lp-session button,.lp-session select{font:10px monospace;color:#ddd;background:#1b1d23;border:1px solid #69656e88;padding:8px;margin:4px 3px 4px 0;cursor:pointer}.lp-session label{display:block;margin:12px 0}.lp-session input{width:100%;accent-color:#b79dd4}.lp-session .lp-close{position:absolute;right:8px;top:6px;font-size:20px;background:none;border:0}.lp-session .lp-snapshot{display:block;width:100%;text-align:left}.lp-session small{display:block;color:#9b96a2}.lp-session-status{font-size:10px;color:#b9a7ce;min-height:16px}.lp-session-toolbar{margin-top:16px;border-top:1px solid #7774;padding-top:8px}.lp-session-toolbar button{font:9px monospace;border:1px solid #7775;background:#12141b;color:#bbb;padding:7px;cursor:pointer}`;document.head.append(css);
      panel=document.createElement('section');panel.className='lp-session';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','View and sound settings');
      panel.innerHTML='<button class="lp-close" aria-label="Close settings">×</button><h2>VIEW / SOUND</h2><small data-storage></small><label>GRAPHICS <select aria-label="Graphics quality"><option value="ultra">ULTRA · maximum resolution</option><option value="high">HIGH · 1.6× resolution cap</option><option value="balanced">BALANCED · native CSS resolution</option></select></label><button data-sound>Enable scene sound</button><label>SOUND LEVEL<input aria-label="Sonification volume" type="range" min="0" max="1" step=".01"></label><p class="lp-session-status" role="status"></p>';
      css.textContent+='.lp-session select{display:inline-block;max-width:100%}';
      document.body.append(panel);status=panel.querySelector('[role=status]');
      panel.querySelector('[data-sound]').onclick=()=>{document.querySelector('#audio,#sound,#audioToggle')?.click();setTimeout(syncSceneControls,200)};
      const performanceSection=document.createElement('details');performanceSection.className='lp-diagnostics';performanceSection.innerHTML='<summary>PERFORMANCE DIAGNOSTICS</summary><button data-measure>Measure frame pacing (8 s)</button><button data-measure data-sustained>Measure sustained pacing (60 s)</button><button data-cancel-measure hidden>Cancel measurement</button><small data-performance-result aria-live="polite">Background intervals are excluded.</small>';panel.append(performanceSection);performanceSection.querySelector('[data-measure]').onclick=()=>measureFrames();performanceSection.querySelector('[data-sustained]').onclick=()=>measureFrames(60000);
      if(scene==='syzygy'){const stress=document.createElement('button');stress.setAttribute('data-measure','');stress.textContent='Measure fracture sequence (60 s)';stress.onclick=()=>measureFrames(60000,true);performanceSection.querySelector('[data-cancel-measure]').before(stress);const note=document.createElement('small');note.textContent='The sequence opens Realms and runs four 10-second holds and 5-second releases. Escape cancels.';performanceSection.append(note);}
      panel.querySelector('.lp-close').onclick=closeSessions;
      panel.querySelector('select').onchange=event=>{state.quality=event.target.value;applyQuality(state.quality);persist();notice('Graphics resolution updated')};
      panel.querySelector('input').oninput=event=>{state.volume=Number(event.target.value);window.dispatchEvent(new CustomEvent('lunar:volume',{detail:state.volume}));persist()};
    }
    panel.querySelector('[data-storage]').textContent='PREFERENCES / THIS DEVICE';
    panel.querySelector('select').value=state.quality;panel.querySelector('input').value=state.volume;
    syncSceneControls();returnFocus=document.activeElement;panel.hidden=false;panel.querySelector('.lp-close').focus();
    for(const node of document.body.children){if(node!==panel&&!['SCRIPT','STYLE','LINK'].includes(node.tagName)){if(!inertBefore.has(node))inertBefore.set(node,node.inert);node.inert=true}}
  }
  function attachDataToolbar(){
    const host=document.querySelector('#panel-content');if(!host||host.querySelector('.lp-session-toolbar'))return;
    const bar=document.createElement('div');bar.className='lp-session-toolbar';
    const button=document.createElement('button');button.textContent='SESSION / GRAPHICS / SAVED SCENES';button.onclick=showSessions;bar.append(button);host.append(bar);
  }
  document.addEventListener('click',event=>{
    const archive=event.target.closest('#navArchive,#view-archive');
    if(archive&&!archive.hasAttribute('data-route')){event.preventDefault();event.stopImmediatePropagation();showSessions();return}
    if(event.target.closest('[data-panel="data"]:not([data-route])'))setTimeout(attachDataToolbar,0);
  },true);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&measuring&&(!panel||panel.hidden)){event.preventDefault();cancelMeasurement?.();return;}if(panel&&!panel.hidden){event.stopPropagation();if(event.key==='Escape'){event.preventDefault();closeSessions()}else if(event.key==='Tab'){const controls=[...panel.querySelectorAll('button,input,select,summary,[tabindex]')].filter(node=>{const closed=node.closest('details:not([open])');return !node.disabled&&!node.closest('[hidden]')&&node.getClientRects().length&&(!closed||(node.tagName==='SUMMARY'&&node.parentElement===closed))}),first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}}},true);
  document.addEventListener('lunar:state',event=>{
    if(restoring)return;
    const value=event.detail||{};
    for(const field of ['paused','speed','timeline','phase','paradox','camera','focusedNode'])if(value[field]!==undefined)state[field]=value[field];
    document.body.dataset.sessionStorage=mode;
    if(panel&&!panel.hidden)syncSceneControls();
    if(ready&&Date.now()-lastSave>3000){lastSave=Date.now();persist()}
  });
  async function boot(){
    const chapterMenu=document.querySelector('#menu'),chapters=document.querySelector('.chapters');
    if(chapterMenu&&chapters){const mobileStyle=document.createElement('style');mobileStyle.textContent='.lp-mobile-session{display:none}@media(max-width:760px){.menu-open .lp-mobile-session{display:block;margin:12px 0 4px;padding:8px 10px;font:10px monospace;color:#ddd;border:1px solid #7776;background:#12141b}}';document.head.append(mobileStyle);const entry=document.createElement('button');entry.className='lp-mobile-session';entry.textContent='ARCHIVE / GRAPHICS';entry.onclick=showSessions;chapters.append(entry);}
    if(location.protocol==='http:'&&['127.0.0.1','localhost'].includes(location.hostname)){
      try{const health=await api('health');if(health.storage==='sqlite'){scene=health.scene;mode='sqlite';const result=await api('settings');state={...state,...result.settings}}}catch{}
    }
    if(mode!=='sqlite'){const local=localRead();state={...state,...local.state};sessions=Array.isArray(local.sessions)?local.sessions:[];trash=Array.isArray(local.trash)?local.trash:[]}
    document.body.dataset.sessionStorage=mode;
    // Wait until the scene exposes its renderer. Restoring settings never opens a
    // panel, starts sound without a gesture, or splits the hero automatically.
    const started=Date.now(),timer=setInterval(()=>{
      if(window.__lunarDebug?.renderer&&typeof window.__lunarDebug.getSnapshot==='function'){clearInterval(timer);ready=true;describeRenderer();restore({quality:state.quality,volume:state.volume,...(!interacted?{speed:state.speed,paused:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?true:state.paused}:{})});document.body.dataset.sessionReady='true';window.dispatchEvent(new Event('lunar:ready'))}
      else if(Date.now()-started>30000){clearInterval(timer);ready=true}
    },200);
    startStream();
    window.addEventListener('pagehide',()=>{cancelMeasurement?.();localWrite();stream?.close();stream=undefined;backend.connected=false});
    window.addEventListener('pageshow',event=>{if(event.persisted)startStream()});
  }
  function startStream(){
    if(mode!=='sqlite'||typeof EventSource!=='function'||stream)return;
    stream=new EventSource('/api/events?scene='+encodeURIComponent(scene));
    stream.addEventListener('runtime',event=>{try{backend={...JSON.parse(event.data),connected:true};document.body.dataset.backendConnected='true'}catch{}});
    stream.onerror=()=>{backend.connected=false;document.body.dataset.backendConnected='false'};
  }

  function runtimeTick(){
    if(!ready||document.hidden)return;
    const data=document.body.dataset,renderer={};for(const field of ['fps','drawCalls','triangles','pixelRatio','renderedFrames'])renderer[field]=Number(data[field])||0;
    const snapshot=serializableState(sample()),packet={scene,now:Date.now(),renderer,snapshot,backend:{...backend,mode,connected:mode==='sqlite'&&backend.connected}};
    document.body.dataset.browserFocused=String(document.hasFocus());document.body.dataset.browserVisibility=document.visibilityState;
    document.body.dataset.telemetrySource=mode==='sqlite'?'measured-browser-and-local-server':'measured-browser';
    window.dispatchEvent(new CustomEvent('lunar:telemetry',{detail:packet}));
    if(mode==='sqlite'&&!posting&&Date.now()-lastRuntimePost>=1000){posting=true;lastRuntimePost=Date.now();api('runtime','POST',{...renderer,snapshot}).then(()=>{backend.connected=true}).catch(()=>{backend.connected=false}).finally(()=>posting=false)}
  }
  document.addEventListener('lunar:route',event=>{if(event.detail?.scene===scene&&typeof event.detail.route==='string'){state.route=event.detail.route;persist()}});
  document.addEventListener('lunar:open-sessions',()=>showSessions().catch(error=>notice(error.message)));
  window.addEventListener('lunar:open-sessions',event=>{if(event.target===window)showSessions().catch(error=>notice(error.message))});
  window.lunarSessions={open:showSessions,save:saveSnapshot,list:listSessions,restore:restoreSnapshot,remove:removeSnapshot,undoRemove,get mode(){return mode},get ready(){return ready}};
  window.LunarService=Object.freeze({get status(){return {...backend,mode}},sample:()=>serializableState(sample())});
  setInterval(runtimeTick,500);bootPromise=boot();
})();
