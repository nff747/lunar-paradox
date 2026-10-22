import * as THREE from './vendor/three.module.js';

const fract = n => n - Math.floor(n);

export function scalarNoise(x, y, z) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  let fx = x - ix, fy = y - iy, fz = z - iz;
  fx *= fx * (3 - 2 * fx);
  fy *= fy * (3 - 2 * fy);
  fz *= fz * (3 - 2 * fz);
  const hash = (a, b, c) => {
    a = fract(a * 0.3183099 + 0.1) * 17;
    b = fract(b * 0.3183099 + 0.1) * 17;
    c = fract(c * 0.3183099 + 0.1) * 17;
    return fract(a * b * c * (a + b + c));
  };
  const mix = (a, b, t) => a + (b - a) * t;
  return mix(
    mix(
      mix(hash(ix, iy, iz), hash(ix + 1, iy, iz), fx),
      mix(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), fx),
      fy
    ),
    mix(
      mix(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), fx),
      mix(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), fx),
      fy
    ),
    fz
  );
}

// Non-planar, asymmetric 3D tectonic cleavage path
export function fissureCPU(y, z) {
  return (
    (scalarNoise(y * 2.15, z * 2.15, 11.7) - 0.5) * 0.34 +
    (scalarNoise(y * 7.3, z * 7.3, 4.1) - 0.5) * 0.080 +
    (scalarNoise(y * 31, z * 31, 2.9) - 0.5) * 0.026 +
    Math.sin(y * 1.8 + z * 0.45) * 0.075 +
    Math.cos(y * 3.4 - z * 1.2) * 0.042 // Asymmetry bias
  );
}

export const fractureFieldGLSL = `
float fissure(vec3 p) {
  return (noise(vec3(p.yz * 2.15, 11.7)) - 0.5) * 0.34 +
         (noise(vec3(p.yz * 7.3, 4.1)) - 0.5) * 0.080 +
         (noise(vec3(p.yz * 31.0, 2.9)) - 0.5) * 0.026 +
         sin(p.y * 1.8 + p.z * 0.45) * 0.075 +
         cos(p.y * 3.4 - p.z * 1.2) * 0.042;
}
`;

