const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};

// One authored shot, in seconds after the hold commits. The actuator, crack
// front, mass release, dust and camera have distinct timings. No free orbit.
export const RUPTURE_DURATION=6.2;
export const REJOIN_DURATION=2.4;
const shots=[
  [0,    0,    0,    1,    35, 0,    0,    0],
  [.52, -.10, .04,  .975,  33, 0,   .03, -.002],
  [.90, -.22, .08,  1.09,  38, 0,   .02, -.014],
  [1.8,  .55, .24,  1.22,  38, 0,   .02,  .008],
  [3.5, 1.65, .48,  1.17,  35, .04, .07,  .013],
  [6.2, 1.35, .28,  1.10,  35, .02, .03,  .003],
];
export function sampleRuptureShot(age,out=new Float64Array(7)){
  const t=Math.max(0,Math.min(RUPTURE_DURATION,age));
  let i=0;while(i<shots.length-2&&t>shots[i+1][0])i++;
  const a=shots[Math.max(0,i-1)],b=shots[i],c=shots[i+1],d=shots[Math.min(shots.length-1,i+2)];
  const duration=c[0]-b[0],u=clamp((t-b[0])/duration),u2=u*u,u3=u2*u;
  for(let k=1;k<8;k++){
    const m0=(c[k]-a[k])/(c[0]-a[0]),m1=(d[k]-b[k])/(d[0]-b[0]);
    out[k-1]=(2*u3-3*u2+1)*b[k]+(u3-2*u2+u)*duration*m0+(-2*u3+3*u2)*c[k]+(u3-u2)*duration*m1;
  }
  return out;
}

export class CinematicRupture {
  constructor(){this.cycle=0;this.age=-1;this.returnAge=-1;this.returnFrom=null;this.drive=0;this.crack=0;this.impact=0;this.cameraAge=0;this.cameraWeight=0;this.timeScale=1;this.ready=false;this.stage='JOINED';}
  update(seconds,{charge=0,cycles=0,state='JOINED',paused=false,reduced=false}={}){
    const dt=paused||!Number.isFinite(seconds)||seconds>2?0:Math.max(0,seconds);
    if(cycles!==this.cycle){this.cycle=cycles;this.age=0;this.returnAge=-1;this.returnFrom=null;}
    if(this.age<0){
      const strain=state==='CHARGING'?charge:0;
      this.drive=.008*strain*strain;this.crack=strain*.12;this.cameraWeight=0;this.cameraAge=0;
      this.impact=0;this.ready=false;this.stage=strain>0?'STRAIN':'JOINED';this.timeScale=1;return this;
    }
    if(state==='REJOINING'||this.returnAge>=0){
      if(this.returnAge<0){this.returnAge=0;this.returnFrom={drive:this.drive,crack:this.crack,cameraAge:this.cameraAge,cameraWeight:this.cameraWeight};}
      this.returnAge+=dt;const f=reduced?1:smooth(0,REJOIN_DURATION,this.returnAge),from=this.returnFrom;
      this.drive=from.drive*(1-f);this.crack=from.crack*(1-f);this.cameraWeight=from.cameraWeight*(1-f);this.cameraAge=from.cameraAge;
      this.impact=0;this.ready=false;this.timeScale=1;this.stage='REJOINING';
      if(f===1){this.age=-1;this.returnAge=-1;this.returnFrom=null;this.drive=0;this.crack=0;this.cameraWeight=0;this.stage='JOINED';}
      return this;
    }
    this.age=reduced?RUPTURE_DURATION:Math.min(RUPTURE_DURATION,this.age+dt);
    const t=this.age,release=Math.max(0,t-.62);
    this.drive=Math.min(1,.008+.025*smooth(0,.62,t)+.61*(1-Math.exp(-release*4.5))+.357*smooth(1.1,5.5,t));
    this.crack=smooth(0,.85,t);this.impact=reduced?0:Math.exp(-(((t-.76)/.15)**2))*.72;
    this.cameraAge=t;this.cameraWeight=reduced?0:1;this.timeScale=.32+.68*smooth(.9,2.4,t);
    this.ready=t>=RUPTURE_DURATION;this.stage=t<.62?'NUCLEATION':t<1.3?'RUPTURE':this.ready?'HELD_OPEN':'AFTERMATH';
    return this;
  }
  // Crack front propagates from the north pole. Each real crust slab releases
  // after its own front arrival, then coasts rather than easing in lockstep.
  slabProgress(slab){
    if(this.age<0)return 0;
    const arrival=.34+(1.5-slab.center.y)/3*.68+(slab.id%3)*.035;
    const elapsed=Math.max(0,this.age-arrival);
    const progress=(1-Math.exp(-elapsed*1.7))*.64+Math.min(.36,elapsed*.065);
    return Math.max(0,Math.min(1,progress))*(this.returnAge>=0?1-smooth(0,REJOIN_DURATION,this.returnAge):1);
  }
}
