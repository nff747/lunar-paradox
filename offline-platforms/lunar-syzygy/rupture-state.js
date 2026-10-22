const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));

// Intent/state is separate from the cohesive illustration and camera timeline.
// Commitment is one-way until an explicit rejoin; frame gaps cannot charge it.
export class RuptureController {
  constructor(){this.state='JOINED';this.charge=0;this.committed=false;this.automatic=false;this.rejoinCharge=0;this.cycles=0;}
  activate(){if(this.state==='JOINED'||this.state==='CHARGING'){this.automatic=true;this.state='CHARGING';return true;}return false;}
  cancel(immediate=false){if(this.committed)return;this.automatic=false;if(immediate){this.charge=0;this.state='JOINED';}}
  rejoin(){if(!this.committed||this.state==='REJOINING')return false;this.state='REJOINING';this.automatic=false;this.rejoinCharge=1;return true;}
  update(seconds,{holding=false,paused=false,reduced=false,opening=0,velocity=0}={}){
    const dt=paused?0:clamp(Number.isFinite(seconds)?seconds:0,0,.05);
    if(this.state==='JOINED'&&(holding||this.automatic))this.state='CHARGING';
    if(this.state==='CHARGING'){
      this.charge=clamp(this.charge+((holding||this.automatic)?dt/1.35:-dt/.70));
      if(this.charge>=1||(reduced&&this.automatic)){
        this.charge=1;this.committed=true;this.automatic=false;this.state='RUPTURE';this.cycles++;
      }else if(this.charge===0&&!holding&&!this.automatic)this.state='JOINED';
    }
    if(this.state==='RUPTURE'&&(reduced||(opening>=.995&&Math.abs(velocity)<.04)))this.state='SUSTAINED_OPEN';
    if(this.state==='REJOINING'){
      this.rejoinCharge=clamp(this.rejoinCharge-dt/.95);this.charge=this.rejoinCharge;
      if(reduced||(this.rejoinCharge===0&&opening<=.0001&&Math.abs(velocity)<.003)){
        this.state='JOINED';this.charge=0;this.committed=false;this.rejoinCharge=0;
      }
    }
    return this.state;
  }
  get drive(){return this.state==='REJOINING'?this.rejoinCharge:(this.committed?1:0);}
  get canInspect(){return this.state==='SUSTAINED_OPEN';}
}
