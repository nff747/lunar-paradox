// Freshly exposed breccia: real displaced wall geometry supplies the silhouette;
// surface gradients add mineral relief without expanding or bending the body.
export function fractureInteriorFragment(noiseCode){return `
uniform float uSide,uTime,uParadox,uImpact,uBurstAge;
uniform vec3 uSolarView,uColdView;
varying float vRim;varying vec3 vP,vN,vView;
${noiseCode}
void main(){
 if(uParadox<.001)discard;
 vec3 V=normalize(vView),P=-vView;
 vec3 geometric=normalize(cross(dFdx(P),dFdy(P)));
 if(dot(geometric,V)<0.)geometric=-geometric;
 float bed=fbm(vP*vec3(7.,13.,9.));
 float strata=sin((vP.y+vP.z*.24+bed*.13)*86.);
 float aggregate=fbm(vP*vec3(57.,71.,63.));
 float relief=bed*.006+aggregate*.0024+strata*.00065;
 vec3 dx=dFdx(P),dy=dFdy(P),rx=cross(dy,geometric),ry=cross(geometric,dx);
 float determinant=dot(dx,rx);
 vec3 gradient=sign(determinant)*(dFdx(relief)*rx+dFdy(relief)*ry);
 vec3 N=normalize(abs(determinant)*geometric-gradient);
 float radial=clamp(vRim,0.,1.),side=step(0.,uSide);
 vec3 L=normalize(mix(uSolarView,uColdView,side));
 float direct=max(dot(N,L),0.),viewFill=pow(max(dot(N,V),0.),2.);
 float pocket=.32+.68*smoothstep(.18,.76,bed);
 vec3 stone=mix(vec3(.045,.042,.037),vec3(.115,.107,.094),smoothstep(.25,.73,aggregate));
 stone=mix(stone,stone*vec3(.75,.79,.88),side);
 vec3 color=stone*pocket*(.14+direct*1.95+viewFill*.12)*(.78+strata*.10);
 // Sparse inclusions catch the grazing source; the entire cut is not metallic.
 float mineral=smoothstep(.69,.87,aggregate)*pow(max(dot(N,normalize(L+V)),0.),22.);
 color+=vec3(.14,.12,.087)*mineral*direct;
 float veins=pow(1.-abs(fbm(vP*vec3(12.,21.,17.))*2.-1.),30.);
 float heatDecay=exp(-max(0.,uBurstAge-.3)*.58);
 float interior=1.-smoothstep(.35,.96,radial);
 vec3 heat=mix(vec3(1.8,.45,.07),vec3(.32,.065,.66),side);
 color+=heat*veins*interior*(heatDecay*.30+uImpact*.85);
 float edge=pow(radial,54.)*smoothstep(.46,.76,bed);
 color+=mix(vec3(.22,.13,.045),vec3(.027,.019,.043),side)*edge;
 gl_FragColor=vec4(color,1.);
}`;}
