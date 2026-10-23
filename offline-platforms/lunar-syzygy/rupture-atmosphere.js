import * as THREE from './vendor/three.module.js';
import {fissureCPU} from './fracture-field.js';

// Backlit particulate plumes originate on the fracture. This is a bounded GPU
// scattering approximation; the larger solid ejecta use the CPU integrator.
export function createRuptureAtmosphere(pixelRatio=1){
  let seed=618337;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
  const positions=[],velocities=[],delays=[],sizes=[],colors=[];
  for(let i=0;i<1800;i++){
    const angle=random()*Math.PI*2,radius=1.1+random()*.37,y=Math.sin(angle)*radius,z=Math.cos(angle)*radius;
    const side=random()<.5?-1:1;
    positions.push(fissureCPU(y,z)+side*.035,y,z);
    velocities.push(side*(.12+random()*.68),(random()-.5)*.36,(random()-.28)*.65);
    delays.push(.04+(1.5-y)/3*.78+random()*.13);
    sizes.push(.006+random()**3*.036);
    const warm=side<0,c=new THREE.Color(warm?.48:.32,warm?.43:.32,warm?.35:.35);
    c.multiplyScalar(.55+random()*.65);colors.push(c.r,c.g,c.b);
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('aVelocity',new THREE.Float32BufferAttribute(velocities,3));
  geometry.setAttribute('aDelay',new THREE.Float32BufferAttribute(delays,1));
  geometry.setAttribute('aSize',new THREE.Float32BufferAttribute(sizes,1));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const uniforms={uAge:{value:-1},uStrength:{value:0},uPixelRatio:{value:pixelRatio}};
  const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,vertexColors:true,
    vertexShader:`attribute vec3 aVelocity;attribute float aDelay,aSize;uniform float uAge,uStrength,uPixelRatio;varying vec3 vColor;varying float vOpacity,vSeed;void main(){float age=max(0.,uAge-aDelay);float alive=step(aDelay,uAge);vec3 p=position+aVelocity*age;p.y-=age*age*.004;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*(1.+age*.20)*800.*uPixelRatio/max(1.,-mv.z),.65,22.);vOpacity=alive*uStrength*(1.-exp(-age*14.))*exp(-age*.62)*.14;vColor=color;vSeed=aDelay*37.;}`,
    fragmentShader:`varying vec3 vColor;varying float vOpacity,vSeed;void main(){vec2 p=gl_PointCoord-.5;float r=dot(p,p);if(r>.25)discard;float grain=fract(sin(dot(gl_PointCoord+vSeed,vec2(12.9898,78.233)))*43758.5453);float soft=exp(-r*15.)*(1.-smoothstep(.12,.25,r));gl_FragColor=vec4(vColor,soft*vOpacity*(.65+grain*.35));}`});
  const points=new THREE.Points(geometry,material);points.frustumCulled=false;points.renderOrder=4;points.visible=false;
  return {points,update(age,strength,pixelRatio){uniforms.uAge.value=age;uniforms.uStrength.value=strength;uniforms.uPixelRatio.value=pixelRatio;points.visible=age>=0&&strength>.001;}};
}
