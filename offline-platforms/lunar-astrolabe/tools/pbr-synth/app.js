import * as THREE from '../../vendor/three.module.js';

// DOM Elements
const canvas3D = document.getElementById('viewport-3d');
const canvas2D = document.getElementById('preview-2d');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const telemetryRes = document.getElementById('telemetry-res');
const infoRenderTime = document.getElementById('info-render-time');
const outputMeta = document.getElementById('output-meta');
const btnExportSingle = document.getElementById('btn-export-single');
const btnExportAll = document.getElementById('btn-export-all');
const tabButtons = document.querySelectorAll('.tab-btn');
const geomButtons = document.querySelectorAll('[data-geom]');
const btnToggleRotate = document.getElementById('btn-toggle-rotate');

// Parameter inputs
const paramStrength = document.getElementById('param-strength');
const paramKernel = document.getElementById('param-kernel');
const paramBlur = document.getElementById('param-blur');
const paramInvertY = document.getElementById('param-invert-y');
const paramHeightContrast = document.getElementById('param-height-contrast');
const paramInvertHeight = document.getElementById('param-invert-height');
const paramRoughness = document.getElementById('param-roughness');
const paramInvertRough = document.getElementById('param-invert-rough');
const paramAoStrength = document.getElementById('param-ao-strength');

// Value readouts
const valStrength = document.getElementById('val-strength');
const valBlur = document.getElementById('val-blur');
const valHeightContrast = document.getElementById('val-height-contrast');
const valRoughness = document.getElementById('val-roughness');
const valAoStrength = document.getElementById('val-ao-strength');

// State
let activeView = '3d';
let activeGeom = 'sphere';
let autoRotate = true;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let currentTextureSize = { width: 1024, height: 1024 };

// Canvas caches for generated PBR textures
const maps = {
  diffuse: document.createElement('canvas'),
  normal: document.createElement('canvas'),
  height: document.createElement('canvas'),
  roughness: document.createElement('canvas'),
  ao: document.createElement('canvas')
};

// -------------------------------------------------------------
// THREE.JS SETUP
// -------------------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 3.2);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas3D,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.2);
dirLight1.position.set(3, 4, 3);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x7dd3fc, 0.8);
dirLight2.position.set(-3, -2, -2);
scene.add(dirLight2);

// Specimen Meshes
const geometries = {
  sphere: new THREE.SphereGeometry(1, 64, 64),
  cube: new THREE.BoxGeometry(1.4, 1.4, 1.4, 32, 32, 32),
  plane: new THREE.PlaneGeometry(2, 2, 64, 64)
};

// Compute vertex tangents for normal mapping
for (const key of Object.keys(geometries)) {
  geometries[key].computeVertexNormals();
}

const material = new THREE.MeshStandardMaterial({
  roughness: 0.5,
  metalness: 0.1
});

const mesh = new THREE.Mesh(geometries.sphere, material);
scene.add(mesh);

// Texture loader wrappers
const textures = {
  map: new THREE.CanvasTexture(maps.diffuse),
  normalMap: new THREE.CanvasTexture(maps.normal),
  roughnessMap: new THREE.CanvasTexture(maps.roughness),
  aoMap: new THREE.CanvasTexture(maps.ao)
};

for (const t of Object.values(textures)) {
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
}

material.map = textures.map;
material.normalMap = textures.normalMap;
material.normalScale.set(1, 1);
material.roughnessMap = textures.roughnessMap;
material.aoMap = textures.aoMap;
material.aoMapIntensity = 1.0;
material.needsUpdate = true;

// -------------------------------------------------------------
// PROCEDURAL TEXTURE GENERATORS
// -------------------------------------------------------------
function generateProcedural(type) {
  const w = 1024, h = 1024;
  maps.diffuse.width = w;
  maps.diffuse.height = h;
  const ctx = maps.diffuse.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  if (type === 'lunar') {
    // Cratered basalt regolith
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        let n = Math.sin(x * 0.02) * Math.cos(y * 0.02) * 20;
        n += Math.sin(x * 0.05 + y * 0.04) * 15;
        n += (Math.random() - 0.5) * 35;
        // Crater rings
        const d1 = Math.hypot(x - 300, y - 400);
        if (d1 < 180) n += Math.sin(d1 * 0.1) * 30 * (1 - d1/180);
        const d2 = Math.hypot(x - 720, y - 680);
        if (d2 < 120) n += Math.sin(d2 * 0.15) * 25 * (1 - d2/120);

        const v = Math.max(30, Math.min(220, 110 + n));
        data[i] = v * 0.95;
        data[i + 1] = v;
        data[i + 2] = v * 1.05;
        data[i + 3] = 255;
      }
    }
  } else if (type === 'carbon') {
    // 2x2 Twill carbon weave
    const cellSize = 32;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const cellX = Math.floor(x / cellSize) % 4;
        const cellY = Math.floor(y / cellSize) % 4;
        const isHorizontal = ((cellX + cellY) % 4) < 2;
        const subPos = isHorizontal ? (x % cellSize) / cellSize : (y % cellSize) / cellSize;
        const dome = Math.sin(subPos * Math.PI);
        const threadNoise = (Math.random() - 0.5) * 12;
        const v = Math.floor(35 + dome * 75 + threadNoise);
        data[i] = v;
        data[i + 1] = v + 4;
        data[i + 2] = v + 8;
        data[i + 3] = 255;
      }
    }
  } else if (type === 'hex') {
    // Hexagonal solar plating
    const scale = 64;
    const s3 = Math.sqrt(3);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const qx = (s3/3 * x - 1/3 * y) / scale;
        const ry = (2/3 * y) / scale;
        const dist = Math.abs(Math.sin(qx * Math.PI) * Math.sin(ry * Math.PI));
        const border = dist < 0.15 ? 40 : 160 + (Math.sin(x*0.05)*15);
        data[i] = border * 0.6;
        data[i + 1] = border * 0.85;
        data[i + 2] = border * 1.1;
        data[i + 3] = 255;
      }
    }
  } else {
    // Obsidian crystalline basalt
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const facet = Math.abs(Math.sin(x * 0.015 + Math.cos(y * 0.02) * 2)) * 120;
        const grain = (Math.random() - 0.5) * 20;
        const v = Math.min(240, Math.max(20, facet + grain + 25));
        data[i] = v * 0.85;
        data[i + 1] = v * 0.88;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  recomputeMaps();
}

// -------------------------------------------------------------
// PBR MAP SYNTHESIS KERNELS (100% Client-Side)
// -------------------------------------------------------------
function recomputeMaps() {
  const startTime = performance.now();
  const w = maps.diffuse.width;
  const h = maps.diffuse.height;
  currentTextureSize = { width: w, height: h };
  telemetryRes.textContent = `DIM: ${w} × ${h}`;
  outputMeta.textContent = `${w} × ${h} PNG / 32-BIT RGBA`;

  // Allocate all maps to matching dimensions
  for (const key of ['normal', 'height', 'roughness', 'ao']) {
    maps[key].width = w;
    maps[key].height = h;
  }

  const diffCtx = maps.diffuse.getContext('2d');
  const srcData = diffCtx.getImageData(0, 0, w, h).data;

  // 1. Compute Height (Luminance)
  const heightData = new Float32Array(w * h);
  const heightContrast = parseFloat(paramHeightContrast.value);
  const invertHeight = paramInvertHeight.checked;

  for (let i = 0; i < srcData.length; i += 4) {
    // Rec. 709 luminance
    let luma = (0.299 * srcData[i] + 0.587 * srcData[i + 1] + 0.114 * srcData[i + 2]) / 255;
    luma = Math.pow(luma, 1.0 / heightContrast);
    if (invertHeight) luma = 1.0 - luma;
    heightData[i / 4] = luma;
  }

  // Draw Height Map
  const heightCtx = maps.height.getContext('2d');
  const heightImgData = heightCtx.createImageData(w, h);
  for (let idx = 0; idx < heightData.length; idx++) {
    const val = Math.floor(heightData[idx] * 255);
    const p = idx * 4;
    heightImgData.data[p] = val;
    heightImgData.data[p + 1] = val;
    heightImgData.data[p + 2] = val;
    heightImgData.data[p + 3] = 255;
  }
  heightCtx.putImageData(heightImgData, 0, 0);

  // 2. Compute Normal Map via Sobel or Scharr Gradient
  const normalCtx = maps.normal.getContext('2d');
  const normalImgData = normalCtx.createImageData(w, h);
  const strength = parseFloat(paramStrength.value);
  const kernel = paramKernel.value;
  const invertY = paramInvertY.checked;

  for (let y = 0; y < h; y++) {
    const yAbove = (y > 0 ? y - 1 : h - 1) * w;
    const yCenter = y * w;
    const yBelow = (y < h - 1 ? y + 1 : 0) * w;

    for (let x = 0; x < w; x++) {
      const xLeft = x > 0 ? x - 1 : w - 1;
      const xRight = x < w - 1 ? x + 1 : 0;

      let dx = 0, dy = 0;

      if (kernel === 'scharr') {
        // Scharr 3x3 high-angular accuracy
        dx = (heightData[yAbove + xRight] * 3 + heightData[yCenter + xRight] * 10 + heightData[yBelow + xRight] * 3) -
             (heightData[yAbove + xLeft] * 3 + heightData[yCenter + xLeft] * 10 + heightData[yBelow + xLeft] * 3);
        dy = (heightData[yBelow + xLeft] * 3 + heightData[yBelow + x] * 10 + heightData[yBelow + xRight] * 3) -
             (heightData[yAbove + xLeft] * 3 + heightData[yAbove + x] * 10 + heightData[yAbove + xRight] * 3);
      } else {
        // Standard Sobel 3x3
        dx = (heightData[yAbove + xRight] + 2 * heightData[yCenter + xRight] + heightData[yBelow + xRight]) -
             (heightData[yAbove + xLeft] + 2 * heightData[yCenter + xLeft] + heightData[yBelow + xLeft]);
        dy = (heightData[yBelow + xLeft] + 2 * heightData[yBelow + x] + heightData[yBelow + xRight]) -
             (heightData[yAbove + xLeft] + 2 * heightData[yAbove + x] + heightData[yAbove + xRight]);
      }

      dx *= strength;
      dy *= strength;
      if (invertY) dy = -dy;

      // Vector normalize: (dx, dy, 1.0)
      const len = Math.hypot(dx, dy, 1.0);
      const nx = dx / len;
      const ny = dy / len;
      const nz = 1.0 / len;

      const p = (yCenter + x) * 4;
      normalImgData.data[p] = Math.floor(((nx + 1) * 0.5) * 255);
      normalImgData.data[p + 1] = Math.floor(((ny + 1) * 0.5) * 255);
      normalImgData.data[p + 2] = Math.floor(((nz + 1) * 0.5) * 255);
      normalImgData.data[p + 3] = 255;
    }
  }
  normalCtx.putImageData(normalImgData, 0, 0);

  // 3. Compute Roughness Map
  const roughCtx = maps.roughness.getContext('2d');
  const roughImgData = roughCtx.createImageData(w, h);
  const baseRough = parseFloat(paramRoughness.value);
  const invertRough = paramInvertRough.checked;

  for (let idx = 0; idx < heightData.length; idx++) {
    let r = baseRough + (heightData[idx] - 0.5) * 0.4;
    r = Math.max(0.02, Math.min(0.98, r));
    if (invertRough) r = 1.0 - r; // Glossiness export
    const val = Math.floor(r * 255);
    const p = idx * 4;
    roughImgData.data[p] = val;
    roughImgData.data[p + 1] = val;
    roughImgData.data[p + 2] = val;
    roughImgData.data[p + 3] = 255;
  }
  roughCtx.putImageData(roughImgData, 0, 0);

  // 4. Compute Ambient Occlusion Map (Cavity detector)
  const aoCtx = maps.ao.getContext('2d');
  const aoImgData = aoCtx.createImageData(w, h);
  const aoStrength = parseFloat(paramAoStrength.value);

  for (let y = 0; y < h; y++) {
    const yCenter = y * w;
    const yAbove = (y > 1 ? y - 2 : 0) * w;
    const yBelow = (y < h - 2 ? y + 2 : h - 1) * w;
    for (let x = 0; x < w; x++) {
      const xLeft = x > 1 ? x - 2 : 0;
      const xRight = x < w - 2 ? x + 2 : w - 1;
      const centerH = heightData[yCenter + x];
      const avgH = (heightData[yAbove + x] + heightData[yBelow + x] + heightData[yCenter + xLeft] + heightData[yCenter + xRight]) * 0.25;
      const diff = avgH - centerH;
      const ao = Math.max(0.0, Math.min(1.0, 1.0 - diff * aoStrength * 2.0));
      const val = Math.floor(ao * 255);
      const p = (yCenter + x) * 4;
      aoImgData.data[p] = val;
      aoImgData.data[p + 1] = val;
      aoImgData.data[p + 2] = val;
      aoImgData.data[p + 3] = 255;
    }
  }
  aoCtx.putImageData(aoImgData, 0, 0);

  // Update Three.js texture pipeline
  for (const key of Object.keys(textures)) {
    textures[key].needsUpdate = true;
  }

  // Update 2D view if active
  if (activeView !== '3d') {
    render2DPreview(activeView);
  }

  const duration = (performance.now() - startTime).toFixed(1);
  infoRenderTime.textContent = `TIME: ${duration} ms`;
}

// -------------------------------------------------------------
// 2D PREVIEW HANDLER
// -------------------------------------------------------------
function render2DPreview(mapType) {
  const source = maps[mapType];
  if (!source) return;
  canvas2D.width = source.width;
  canvas2D.height = source.height;
  const ctx = canvas2D.getContext('2d');
  ctx.drawImage(source, 0, 0);
}

// -------------------------------------------------------------
// USER INPUT & FILE DROP
// -------------------------------------------------------------
dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files?.length) {
    handleFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files?.length) {
    handleFile(fileInput.files[0]);
  }
});

function handleFile(file) {
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      // Memory protection: clamp to max 4096px
      let w = img.width;
      let h = img.height;
      if (w > 4096 || h > 4096) {
        const aspect = w / h;
        if (w > h) { w = 4096; h = Math.round(4096 / aspect); }
        else { h = 4096; w = Math.round(4096 * aspect); }
      }
      maps.diffuse.width = w;
      maps.diffuse.height = h;
      const ctx = maps.diffuse.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      recomputeMaps();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Preset Buttons
document.querySelectorAll('.btn-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    generateProcedural(btn.dataset.preset);
  });
});

// Parameter change listeners with real-time feedback
paramStrength.addEventListener('input', (e) => {
  valStrength.textContent = `${e.target.value}×`;
  recomputeMaps();
});

paramKernel.addEventListener('change', () => recomputeMaps());

paramBlur.addEventListener('input', (e) => {
  valBlur.textContent = `${e.target.value} px`;
  recomputeMaps();
});

paramInvertY.addEventListener('change', () => recomputeMaps());

paramHeightContrast.addEventListener('input', (e) => {
  valHeightContrast.textContent = `${e.target.value}×`;
  recomputeMaps();
});

paramInvertHeight.addEventListener('change', () => recomputeMaps());

paramRoughness.addEventListener('input', (e) => {
  valRoughness.textContent = e.target.value;
  material.roughness = parseFloat(e.target.value);
  recomputeMaps();
});

paramInvertRough.addEventListener('change', () => recomputeMaps());

paramAoStrength.addEventListener('input', (e) => {
  valAoStrength.textContent = `${e.target.value}×`;
  recomputeMaps();
});

// View Tabs
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeView = btn.dataset.view;

    if (activeView === '3d') {
      canvas3D.style.display = 'block';
      canvas2D.style.display = 'none';
      document.getElementById('viewport-hint').textContent = 'Drag to rotate specimen · Scroll to zoom';
    } else {
      canvas3D.style.display = 'none';
      canvas2D.style.display = 'block';
      render2DPreview(activeView);
      document.getElementById('viewport-hint').textContent = `Inspecting 2D ${activeView.toUpperCase()} texture (${currentTextureSize.width}×${currentTextureSize.height})`;
    }
  });
});

// Geometry switch
geomButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    geomButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeGeom = btn.dataset.geom;
    mesh.geometry = geometries[activeGeom];
  });
});

// Auto-rotate toggle
btnToggleRotate.addEventListener('click', () => {
  autoRotate = !autoRotate;
  btnToggleRotate.textContent = `Auto-Spin: ${autoRotate ? 'ON' : 'OFF'}`;
  btnToggleRotate.classList.toggle('active', autoRotate);
});

// -------------------------------------------------------------
// MOUSE ORBIT CONTROLS
// -------------------------------------------------------------
canvas3D.addEventListener('pointerdown', (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

window.addEventListener('pointerup', () => { isDragging = false; });

canvas3D.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;
  mesh.rotation.y += deltaX * 0.008;
  mesh.rotation.x += deltaY * 0.008;
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

canvas3D.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.position.z = Math.max(1.5, Math.min(6.0, camera.position.z + e.deltaY * 0.002));
}, { passive: false });

// -------------------------------------------------------------
// EXPORT SYSTEM (Pure Client-Side Zero-Dependency ZIP Writer)
// -------------------------------------------------------------
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// Single map download
btnExportSingle.addEventListener('click', () => {
  const mapKey = activeView === '3d' ? 'normal' : activeView;
  const source = maps[mapKey];
  source.toBlob((blob) => {
    downloadBlob(blob, `pbr_${mapKey}.png`);
  }, 'image/png');
});

// CRC32 table for ZIP generator
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  CRC_TABLE[i] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Lightweight PKZIP standard container builder
function createZip(entries) {
  const parts = [];
  const centralDir = [];
  let offset = 0;

  for (const file of entries) {
    const nameBytes = new TextEncoder().encode(file.name);
    const dataBytes = file.data;
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    // Local file header (30 bytes + name length)
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(localHeader.buffer);
    view.setUint32(0, 0x04034b50, true); // signature
    view.setUint16(4, 20, true);         // version needed
    view.setUint16(6, 0, true);          // flags
    view.setUint16(8, 0, true);          // compression (0 = store)
    view.setUint16(10, 0, true);         // mod time
    view.setUint16(12, 0, true);         // mod date
    view.setUint32(14, crc, true);       // crc-32
    view.setUint32(18, size, true);      // compressed size
    view.setUint32(22, size, true);      // uncompressed size
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);         // extra field len
    localHeader.set(nameBytes, 30);

    parts.push(localHeader, dataBytes);

    // Central directory record (46 bytes + name length)
    const cd = new Uint8Array(46 + nameBytes.length);
    const cdView = new DataView(cd.buffer);
    cdView.setUint32(0, 0x02014b50, true);
    cdView.setUint16(4, 20, true);
    cdView.setUint16(6, 20, true);
    cdView.setUint16(8, 0, true);
    cdView.setUint16(10, 0, true);
    cdView.setUint16(12, 0, true);
    cdView.setUint16(14, 0, true);
    cdView.setUint32(16, crc, true);
    cdView.setUint32(20, size, true);
    cdView.setUint32(24, size, true);
    cdView.setUint16(28, nameBytes.length, true);
    cdView.setUint16(30, 0, true);
    cdView.setUint16(32, 0, true);
    cdView.setUint16(34, 0, true);
    cdView.setUint16(36, 0, true);
    cdView.setUint32(38, 0, true);
    cdView.setUint32(42, offset, true);
    cd.set(nameBytes, 46);

    centralDir.push(cd);
    offset += localHeader.length + size;
  }

  const cdOffset = offset;
  let cdSize = 0;
  for (const cd of centralDir) {
    parts.push(cd);
    cdSize += cd.length;
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true);
  eocdView.setUint16(6, 0, true);
  eocdView.setUint16(8, entries.length, true);
  eocdView.setUint16(10, entries.length, true);
  eocdView.setUint32(12, cdSize, true);
  eocdView.setUint32(16, cdOffset, true);
  eocdView.setUint16(20, 0, true);
  parts.push(eocd);

  return new Blob(parts, { type: 'application/zip' });
}

// Convert canvas to ArrayBuffer
function canvasToBuffer(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      blob.arrayBuffer().then(buf => resolve(new Uint8Array(buf)));
    }, 'image/png');
  });
}

btnExportAll.addEventListener('click', async () => {
  btnExportAll.textContent = 'Compressing PBR Bundle...';
  btnExportAll.disabled = true;

  try {
    const files = [
      { name: 'diffuse.png', data: await canvasToBuffer(maps.diffuse) },
      { name: 'normal.png', data: await canvasToBuffer(maps.normal) },
      { name: 'height.png', data: await canvasToBuffer(maps.height) },
      { name: 'roughness.png', data: await canvasToBuffer(maps.roughness) },
      { name: 'ao.png', data: await canvasToBuffer(maps.ao) },
      { 
        name: 'manifest.txt',
        data: new TextEncoder().encode(
          `LUNAR PARADOX — PBR SYNTHESIZER EXPORT\nGenerated: ${new Date().toISOString()}\nResolution: ${currentTextureSize.width}x${currentTextureSize.height}\nKernel: ${paramKernel.value}\nStrength: ${paramStrength.value}\nFormat: Standard PBR (Diffuse, Normal, Height, Roughness, AO)\n100% In-Browser Execution`
        )
      }
    ];

    const zipBlob = createZip(files);
    downloadBlob(zipBlob, `lunar_pbr_bundle_${Date.now()}.zip`);
  } catch (err) {
    console.error('Export failed:', err);
    alert('Export error: ' + err.message);
  } finally {
    btnExportAll.textContent = '⤓ Export PBR Set (.ZIP)';
    btnExportAll.disabled = false;
  }
});

// -------------------------------------------------------------
// RENDER LOOP & RESIZE
// -------------------------------------------------------------
function resizeRenderer() {
  const container = document.getElementById('canvas-wrapper');
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (w && h) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
}

window.addEventListener('resize', resizeRenderer);

function animate() {
  requestAnimationFrame(animate);
  if (autoRotate && !isDragging) {
    mesh.rotation.y += 0.004;
  }
  if (activeView === '3d') {
    renderer.render(scene, camera);
  }
}

// Initial kickoff
generateProcedural('lunar');
resizeRenderer();
animate();
