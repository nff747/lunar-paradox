// Brief scene-native captions, driven by actual scene state. No loading copy,
// invented scientific readings or business placeholders. Never steals focus.
export function createSceneCue(){
 const node=document.createElement('p');node.className='cinematic-cue';node.setAttribute('role','status');node.setAttribute('aria-live','polite');node.setAttribute('aria-atomic','true');
 const index=document.createElement('span'),title=document.createElement('span');index.className='cue-index';index.setAttribute('aria-hidden','true');index.textContent='LUNAR PARADOX / THE DIVIDE';title.className='cue-title';node.append(index,title);document.body.append(node);
 let previous='',animation=null;
 let hideTimer=0;
 return text=>{if(!text||text===previous)return;previous=text;animation?.cancel();clearTimeout(hideTimer);title.textContent=text;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){node.style.opacity='1';hideTimer=setTimeout(()=>{node.style.opacity='0';},4200);return;}
 if(document.body.dataset.companyRoute){node.style.opacity='0';return;}
 node.style.opacity='0';animation=node.animate([{opacity:0,transform:'translateY(12px)',offset:0},{opacity:1,transform:'translateY(0)',offset:.18},{opacity:1,transform:'translateY(0)',offset:.74},{opacity:0,transform:'translateY(-6px)',offset:1}],{duration:4200,easing:'ease',fill:'none'});
 };
}
