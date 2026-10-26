// Optional frame-time governor. It never changes a manually selected quality.
(()=>{'use strict';
class FrameBudget {
 constructor(maximum=1.8){this.maximum=maximum;this.scale=maximum;this.slow=0;this.fast=0;this.changed=-Infinity;}
 sample(samples,now){if(samples.length<60||samples.some(x=>!Number.isFinite(x)||x<=0))return null;const sorted=[...samples].sort((a,b)=>a-b),median=sorted[Math.floor(sorted.length*.5)],p90=sorted[Math.floor(sorted.length*.9)];
 this.slow=median>23&&p90>28?this.slow+1:0;this.fast=median<17.5&&p90<20?this.fast+1:0;
 if(now-this.changed<8000)return null;
 let next=this.scale;if(this.slow>=2)next=Math.max(.75,this.scale-.20);else if(this.fast>=8)next=Math.min(this.maximum,this.scale+.10);
 if(Math.abs(next-this.scale)<.001)return null;this.scale=Number(next.toFixed(2));this.changed=now;this.slow=this.fast=0;return{scale:this.scale,median,p90};}
}
let frame=0,controller=null;
function stop(){cancelAnimationFrame(frame);frame=0;controller=null;}
function start(apply){stop();const maximum=Math.min(Math.max(devicePixelRatio,1),1.8);controller=new FrameBudget(maximum);apply(maximum);let previous=0,warmup=performance.now()+3000,samples=[];
 function tick(now){frame=requestAnimationFrame(tick);if(!controller)return;if(document.hidden||!document.hasFocus()||document.body.dataset.paused==='true'||document.body.dataset.graphicsContext==='lost'){samples=[];previous=0;warmup=now+1500;return;}const dt=now-previous;previous=now;if(now<warmup||dt<=0||dt>250){samples=[];return;}samples.push(dt);if(samples.length<90)return;const decision=controller.sample(samples,now);samples=[];if(!decision)return;apply(decision.scale);document.body.dataset.adaptiveScale=String(decision.scale);window.dispatchEvent(new CustomEvent('lunar:render-budget',{detail:decision}));}
 frame=requestAnimationFrame(tick);
}
window.LunarAdaptiveGraphics=Object.freeze({FrameBudget,start,stop});
})();
