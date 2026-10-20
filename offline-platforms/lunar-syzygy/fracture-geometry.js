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

export function buildFracturedMoon(radius = 1.5, angular = 256, surfaceSteps = 80, wallSteps = 48) {
  const boundary = [];
  for (let j = 0; j <= angular; j++) {
    const a = (j / angular) * Math.PI * 2;
    let x = 0;
    for (let i = 0; i < 24; i++) {
      const r = Math.sqrt(Math.max(0, radius * radius - x * x));
      x = fissureCPU(Math.sin(a) * r, Math.cos(a) * r);
    }
    const r = Math.sqrt(radius * radius - x * x);
    boundary.push({ x, y: Math.sin(a) * r, z: Math.cos(a) * r, a });
  }
  boundary[angular] = { ...boundary[0], a: Math.PI * 2 };

  function finish(p, n, uv, index, rim) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(index);
    if (n) g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
    else g.computeVertexNormals();
    if (rim) g.setAttribute('aRim', new THREE.Float32BufferAttribute(rim, 1));
    g.computeBoundingSphere();
    return g;
  }

  function triangle(index, p, a, b, c, outward) {
    const ax = p[b * 3] - p[a * 3], ay = p[b * 3 + 1] - p[a * 3 + 1], az = p[b * 3 + 2] - p[a * 3 + 2];
    const bx = p[c * 3] - p[a * 3], by = p[c * 3 + 1] - p[a * 3 + 1], bz = p[c * 3 + 2] - p[a * 3 + 2];
    const nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    if (nx * nx + ny * ny + nz * nz < 1e-20) return;
    const orientation = outward === 0
      ? nx * (p[a * 3] + p[b * 3] + p[c * 3]) + ny * (p[a * 3 + 1] + p[b * 3 + 1] + p[c * 3 + 1]) + nz * (p[a * 3 + 2] + p[b * 3 + 2] + p[c * 3 + 2])
      : nx * outward;
    index.push(a, orientation < 0 ? c : b, orientation < 0 ? b : c);
  }

  const shells = [], walls = [];
  for (const side of [-1, 1]) {
    const p = [], n = [], uv = [], index = [], stride = angular + 1;
    for (let r = 0; r <= surfaceSteps; r++) {
      for (let j = 0; j <= angular; j++) {
        const b = boundary[j], t = r / surfaceSteps;
        // Asymmetric angular expansion: side 1 and side -1 have distinct tectonic depth
        const phiSpan = side < 0 ? Math.PI * 0.48 : Math.PI * 0.52;
        const phi = THREE.MathUtils.lerp(Math.asin(b.x / radius), side * phiSpan, t);
        const x = radius * Math.sin(phi);
        const d = radius * Math.cos(phi);
        const y = d * Math.sin(b.a);
        const z = d * Math.cos(b.a);
        p.push(x, y, z);
        n.push(x / radius, y / radius, z / radius);
        uv.push(fract(Math.atan2(z, -x) / (Math.PI * 2)), Math.asin(THREE.MathUtils.clamp(y / radius, -1, 1)) / Math.PI + 0.5);
      }
    }
    for (let r = 0; r < surfaceSteps; r++) {
      for (let j = 0; j < angular; j++) {
        const a = r * stride + j, b = a + stride;
        triangle(index, p, a, b, a + 1, 0);
        triangle(index, p, b, b + 1, a + 1, 0);
      }
    }

    const duplicates = new Map();
    for (let i = 0; i < index.length; i += 3) {
      const ids = index.slice(i, i + 3), us = ids.map(id => uv[id * 2]);
      if (Math.max(...us) - Math.min(...us) > 0.5) {
        for (let k = 0; k < 3; k++) {
          const id = ids[k];
          if (uv[id * 2] >= 0.5) continue;
          if (!duplicates.has(id)) {
            const next = p.length / 3;
            p.push(...p.slice(id * 3, id * 3 + 3));
            n.push(...n.slice(id * 3, id * 3 + 3));
            uv.push(uv[id * 2] + 1, uv[id * 2 + 1]);
            duplicates.set(id, next);
          }
          index[i + k] = duplicates.get(id);
        }
      }
    }
    shells.push({ side, geometry: finish(p, n, uv, index) });

    // Interior mineral walls
    const wp = [fissureCPU(0, 0), 0, 0], wuv = [0.5, 0.5], rim = [0], wi = [];
    for (let r = 1; r <= wallSteps; r++) {
      for (let j = 0; j <= angular; j++) {
        const b = boundary[j], s = r / wallSteps, y = b.y * s, z = b.z * s;
        const bed = scalarNoise(y * 4.1 + z * 0.8, z * 5.8, 3.4);
        const shelves = (Math.floor(bed * 9) / 9 - 0.5) * 0.135;
        const rough = (
          (scalarNoise(y * 2.3, z * 2.3, 5.1) - 0.5) * 0.24 +
          shelves +
          (scalarNoise(y * 19, z * 17, 8.7) - 0.5) * 0.070 +
          (scalarNoise(y * 57, z * 61, 1.2) - 0.5) * 0.028
        ) * (1 - s ** 12);
        wp.push(fissureCPU(y, z) + rough, y, z);
        wuv.push(y / (radius * 2) + 0.5, z / (radius * 2) + 0.5);
        rim.push(s);
      }
    }
    for (let j = 0; j < angular; j++) triangle(wi, wp, 0, 1 + j, 2 + j, -side);
    for (let r = 0; r < wallSteps - 1; r++) {
      for (let j = 0; j < angular; j++) {
        const a = 1 + r * stride + j, b = a + stride;
        triangle(wi, wp, a, b, a + 1, -side);
        triangle(wi, wp, b, b + 1, a + 1, -side);
      }
    }
    walls.push({ side, geometry: finish(wp, null, wuv, wi, rim) });
  }

  // 6 Detachable Perimeter Slabs that break off from the fracture boundary
  const slabs = [];
  const slabSectors = [
    { a: 0.35, len: 0.45, side: -1, offset: [0.08, 0.04, 0.06] },
    { a: 1.85, len: 0.38, side: -1, offset: [0.06, -0.05, 0.04] },
    { a: 3.45, len: 0.42, side: -1, offset: [0.09, 0.02, -0.05] },
    { a: 0.95, len: 0.40, side: 1, offset: [-0.07, 0.05, 0.04] },
    { a: 2.60, len: 0.46, side: 1, offset: [-0.08, -0.03, 0.05] },
    { a: 4.80, len: 0.35, side: 1, offset: [-0.06, 0.04, -0.04] }
  ];

  for (let sIdx = 0; sIdx < slabSectors.length; sIdx++) {
    const sec = slabSectors[sIdx];
    const sp = [], sn = [], suv = [], sidx = [];
    const slabAngular = 16, slabRadSteps = 8;
    const stride = slabAngular + 1;
    for (let r = 0; r <= slabRadSteps; r++) {
      for (let j = 0; j <= slabAngular; j++) {
        const angle = sec.a + (j / slabAngular) * sec.len;
        const radFrac = r / slabRadSteps;
        const d = radius * (1.0 - radFrac * 0.12);
        const y = d * Math.sin(angle);
        const z = d * Math.cos(angle);
        const baseFissure = fissureCPU(y, z);
        const x = baseFissure + sec.side * (radFrac * 0.16 + (sIdx % 2 === 0 ? 0.02 : -0.01));
        sp.push(x, y, z);
        sn.push(sec.side * 0.7, y / radius, z / radius);
        suv.push(fract(Math.atan2(z, -x) / (Math.PI * 2)), Math.asin(THREE.MathUtils.clamp(y / radius, -1, 1)) / Math.PI + 0.5);
      }
    }
    for (let r = 0; r < slabRadSteps; r++) {
      for (let j = 0; j < slabAngular; j++) {
        const a = r * stride + j, b = a + stride;
        triangle(sidx, sp, a, b, a + 1, sec.side);
        triangle(sidx, sp, b, b + 1, a + 1, sec.side);
      }
    }
    slabs.push({
      id: sIdx,
      side: sec.side,
      offset: sec.offset,
      geometry: finish(sp, sn, suv, sidx)
    });
  }

  return { shells, walls, slabs, boundary };
}
