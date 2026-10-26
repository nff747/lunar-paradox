// Brief scene-native captions, driven by actual scene state. No loading copy,
// invented scientific readings or business placeholders. Never steals focus.
export function createSceneCue(){
 const node=document.createElement('p');node.className='cinematic-cue';node.setAttribute('role','status');node.setAttribute('aria-live','polite');node.setAttribute('aria-atomic','true');document.body.append(node);
 let previous='',animation=null;
 return text=>{if(!text||text===previous)return;previous=text;animation?.cancel();node.textContent=text;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){node.style.opacity='0';return;}
 if(document.body.dataset.companyRoute){node.style.opacity='0';return;}
 node.style.opacity='0';animation=node.animate([{opacity:0,transform:'translate(-50%,8px)',offset:0},{opacity:.85,transform:'translate(-50%,0)',offset:.14},{opacity:.85,transform:'translate(-50%,0)',offset:.72},{opacity:0,transform:'translate(-50%,-3px)',offset:1}],{duration:4200,easing:'ease',fill:'none'});
 };
}
