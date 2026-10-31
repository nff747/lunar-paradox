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
 // Irregular fractured bands and pockets break up the flat cut face.
 float strata=sin((vP.y+vP.z*.24+bed*.13)*86.);
 float aggregate=fbm(vP*vec3(57.,71.,63.));
 float fractured=fbm(vP*vec3(27.,37.,31.)+bed*2.4);
 float relief=bed*.007+aggregate*.0034+strata*.0005+fractured*.002;
 vec3 dx=dFdx(P),dy=dFdy(P),rx=cross(dy,geometric),ry=cross(geometric,dx);
 float determinant=dot(dx,rx);
 vec3 gradient=sign(determinant)*(dFdx(relief)*rx+dFdy(relief)*ry);
 vec3 N=normalize(abs(determinant)*geometric-gradient);
 float radial=clamp(vRim,0.,1.),side=step(0.,uSide);
 vec3 L=normalize(mix(uSolarView,uColdView,side));
 vec3 bounce=normalize(mix(uColdView,uSolarView,side));
 float direct=max(dot(N,L),0.),viewFill=pow(max(dot(N,V),0.),2.);
 float pocket=(.30+.70*smoothstep(.18,.76,bed))*(.72+.28*smoothstep(.26,.7,fractured));
 vec3 stone=mix(vec3(.032,.031,.030),vec3(.122,.113,.100),smoothstep(.23,.75,aggregate*.72+fractured*.28));
 stone=mix(stone,stone*vec3(.75,.79,.88),side);
 vec3 color=stone*pocket*(.22+direct*2.8+viewFill*.18)*(.78+strata*.10);
 // Low-energy cross-canyon bounce reveals the broken walls without flattening them.
 color+=stone*pocket*max(dot(N,bounce),0.)*mix(vec3(.30,.22,.13),vec3(.16,.12,.27),side);
 // Soft indirect illumination from the opposing mass lifts the canyon wall
 // without turning the fracture into a uniformly emissive surface.
 float canyonFill=(.16+.34*pow(max(dot(N,V),0.),1.3))*(.55+.45*fractured);
 color+=stone*pocket*canyonFill*mix(vec3(.90,.66,.39),vec3(.45,.36,.72),side);
 // Sparse inclusions catch the grazing source; the entire cut is not metallic.
 float mineral=smoothstep(.69,.87,aggregate)*pow(max(dot(N,normalize(L+V)),0.),22.);
 color+=vec3(.14,.12,.087)*mineral*direct;
 float veins=pow(1.-abs(fbm(vP*vec3(12.,21.,17.))*2.-1.),30.);
 float heatDecay=.16+.84*exp(-max(0.,uBurstAge-.3)*.58);
 float interior=1.-smoothstep(.35,.96,radial);
 vec3 heat=mix(vec3(1.30,.42,.10),vec3(.27,.075,.46),side);
 color+=heat*veins*interior*(heatDecay*.30+uImpact*.85);
 float edge=pow(radial,54.)*smoothstep(.46,.76,bed);
 color+=mix(vec3(.22,.13,.045),vec3(.027,.019,.043),side)*edge;
 gl_FragColor=vec4(color,1.);
}`;}
