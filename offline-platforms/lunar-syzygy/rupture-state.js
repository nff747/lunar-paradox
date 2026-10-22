const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));

// Hold charges the fracture to failure, where it remains latched open until
// the user deliberately activates rejoin. The fracture solver owns motion.
export class RuptureController {
  constructor(){this.state='JOINED';this.charge=0;this.automatic=false;this.cycles=0;this.wasAtFailure=false;}
  activate(){if(this.committed)return this.rejoin();if(this.automatic)return false;this.automatic=true;this.state='CHARGING';return true;}
  cancel(immediate=false){this.automatic=false;if(immediate&&!this.committed){this.charge=0;this.state='JOINED';this.wasAtFailure=false;}}
  rejoin(){if(!this.committed||this.state==='REJOINING')return false;this.automatic=false;this.state='REJOINING';return true;}
  update(seconds,{holding=false,paused=false,reduced=false}={}){
    // Foreground frame time drives gestures. Ignore long suspension gaps, but
    // do not turn a 1.2s hold into dozens of frames on a slower GPU.
    const dt=paused||!Number.isFinite(seconds)||seconds>2?0:Math.max(0,seconds),active=holding||this.automatic;
    if(this.state==='REJOINING'){
      this.charge=reduced?0:clamp(this.charge-dt/2.4);
      if(this.charge===0){this.state='JOINED';this.wasAtFailure=false;}
    }else if(this.committed){this.charge=1;this.state='HELD_OPEN';}
    else if(active){
      this.charge=reduced?1:clamp(this.charge+dt/1.2);
      if(this.charge===1){this.state='HELD_OPEN';this.wasAtFailure=true;this.cycles++;this.automatic=false;}
      else this.state='CHARGING';
    }else{
      this.charge=reduced?0:clamp(this.charge-dt/.85);
      this.state=this.charge>0?'REJOINING':'JOINED';
      if(this.charge===0){this.automatic=false;this.wasAtFailure=false;}
    }
    return this.state;
  }
  get drive(){return this.charge;}
  get committed(){return this.state==='HELD_OPEN'||this.state==='REJOINING'&&this.wasAtFailure;}
  get canInspect(){return this.state==='HELD_OPEN';}
  get rejoinCharge(){return this.charge;}
}
