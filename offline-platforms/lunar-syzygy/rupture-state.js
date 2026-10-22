const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));

// The gate is a reversible, press-and-hold actuator: applied strain follows
// the user's hold, and unloads on release. The fracture solver owns motion.
export class RuptureController {
  constructor(){this.state='JOINED';this.charge=0;this.automatic=false;this.cycles=0;this.wasAtFailure=false;}
  activate(){if(this.automatic)return false;this.automatic=true;this.state='CHARGING';return true;}
  cancel(immediate=false){this.automatic=false;if(immediate){this.charge=0;this.state='JOINED';this.wasAtFailure=false;}}
  rejoin(){return false;}
  update(seconds,{holding=false,paused=false,reduced=false}={}){
    const dt=paused?0:clamp(Number.isFinite(seconds)?seconds:0,0,.05),active=holding||this.automatic;
    this.charge=reduced?(active?1:0):clamp(this.charge+(active?dt/1.2:-dt/.85));
    this.state=active?(this.charge>=1?'HELD_OPEN':'CHARGING'):(this.charge>0?'REJOINING':'JOINED');
    const atFailure=this.charge>=1;
    if(atFailure&&!this.wasAtFailure)this.cycles++;
    this.wasAtFailure=atFailure;
    if(this.automatic&&atFailure)this.automatic=false;
    if(!active&&this.charge===0)this.automatic=false;
    return this.state;
  }
  get drive(){return this.charge;}
  get committed(){return false;}
  get canInspect(){return this.charge>=.95;}
  get rejoinCharge(){return this.charge;}
}
