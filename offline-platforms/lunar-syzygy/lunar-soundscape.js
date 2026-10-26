// Cinematic sonification, deliberately quieter at rest. Six spatial event voices;
// the diffuse tension bed is stereo. All signal paths share DC removal/limiting.
export class LunarSoundscape {
  constructor(context){
    this.context=context;this.voices=new Set();this.seed=532901;
    const a=context;this.master=a.createGain();this.master.gain.value=1;
    const high=a.createBiquadFilter();high.type='highpass';high.frequency.value=28;
    this.limiter=a.createDynamicsCompressor();this.limiter.threshold.value=-9;
    this.limiter.knee.value=8;this.limiter.ratio.value=16;this.limiter.attack.value=.003;this.limiter.release.value=.24;
    this.master.connect(high).connect(this.limiter).connect(a.destination);
    this.bed=a.createGain();this.bed.gain.value=.006;this.bed.connect(this.master);
    this.tones=[];
    // Octave harmonics translate weight to small speakers without a loud sine drone.
    for(const [frequency,level] of [[38,.22],[76,.14],[114,.07],[307,.015]]){
      const osc=a.createOscillator(),gain=a.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=level;
      osc.connect(gain).connect(this.bed);osc.start();this.tones.push({osc,frequency});
    }
    const noise=a.createBufferSource();noise.buffer=this.noise(4);noise.loop=true;
    this.stress=a.createBiquadFilter();this.stress.type='bandpass';this.stress.frequency.value=150;this.stress.Q.value=.65;
    this.air=a.createGain();this.air.gain.value=.002;noise.connect(this.stress).connect(this.air).connect(this.master);noise.start();
  }
  random(){this.seed=this.seed*16807%2147483647;return (this.seed-1)/1073741823-1;}
  noise(seconds){const a=this.context,b=a.createBuffer(1,Math.ceil(a.sampleRate*seconds),a.sampleRate),v=b.getChannelData(0);let brown=0;for(let i=0;i<v.length;i++){const white=this.random();brown=(brown+.018*white)/1.018;v[i]=white*.42+brown*2.6;}return b;}
  update(charge,impact,opening){
    const now=this.context.currentTime;
    this.bed.gain.setTargetAtTime(.006+charge*.07+impact*.025,now,.09);
    this.air.gain.setTargetAtTime(.002+charge**2*.065+impact*.035+opening*.006*(.75+.25*Math.sin(now*.37)),now,.08);
    this.stress.frequency.setTargetAtTime(150+charge**2*1500+impact*420+opening*140,now,.09);
    for(const {osc,frequency} of this.tones)osc.frequency.setTargetAtTime(frequency*(1+charge*.055-opening*.018),now,.10);
  }
  event(kind,position,energy=.2,mass=.02){
    const a=this.context;if(a.state!=='running'&&typeof a.startRendering!=='function')return false;
    // Preserve room for the main rupture/closure instead of letting chip tails steal it.
    if(this.voices.size>=(kind==='chip'?4:6))return false;
    const chip=kind==='chip',closure=kind==='closure',duration=chip?.28:closure?1.6:2.7,now=a.currentTime;
    const source=a.createBufferSource(),buffer=this.noise(duration),samples=buffer.getChannelData(0);
    const fundamental=chip?Math.max(220,Math.min(1200,400*(.003/Math.max(.0001,mass))**.16)):closure?57:43;
    for(let i=0;i<samples.length;i++){
      const t=i/a.sampleRate;
      // Distributed bursts: an initial crack, then rubble strikes with separate decays.
      let rock=Math.exp(-t*(chip?55:24));
      if(!chip)for(const [delay,weight] of [[.055,.50],[.17,.33],[.32,.18],[.58,.11]])rock+=t>delay?weight*Math.exp(-(t-delay)*32):0;
      const body=chip?0:(Math.sin(2*Math.PI*fundamental*t)+.42*Math.sin(2*Math.PI*fundamental*2.03*t)+.20*Math.sin(2*Math.PI*fundamental*4.07*t))*Math.exp(-t*(closure?5.2:3.4))*(1-Math.exp(-t*140));
      samples[i]=samples[i]*rock*.48+body*.30;
    }
    source.buffer=buffer;const low=a.createBiquadFilter();low.type='lowpass';low.frequency.value=chip?5400:2400;low.Q.value=.5;
    const gain=a.createGain(),pan=a.createPanner();pan.panningModel='HRTF';pan.refDistance=6.65;pan.rolloffFactor=.55;pan.maxDistance=40;
    pan.positionX.value=position.x;pan.positionY.value=position.y;pan.positionZ.value=position.z;
    const level=Math.max(.025,Math.min(chip?.10:.58,Math.sqrt(Math.max(.001,energy))*(chip?.18:.65)));
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level,now+.004);gain.gain.setTargetAtTime(.00001,now+.04,duration/5);
    source.connect(low).connect(gain).connect(pan).connect(this.master);this.voices.add(source);
    source.onended=()=>{this.voices.delete(source);for(const node of [source,low,gain,pan])node.disconnect();};source.start(now);return true;
  }
}
