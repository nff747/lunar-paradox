// DOM Elements
const canvasOrig = document.getElementById('canvas-original');
const canvasOptWrapper = document.getElementById('canvas-optimized-wrapper');
const canvasOpt = document.getElementById('canvas-optimized');
const canvasContainer = document.getElementById('canvas-container');
const splitHandle = document.getElementById('split-handle');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');

// Inputs
const paramFormat = document.getElementById('param-format');
const paramQuality = document.getElementById('param-quality');
const paramScale = document.getElementById('param-scale');
const paramStripExif = document.getElementById('param-strip-exif');
const paramGrayscale = document.getElementById('param-grayscale');
const valQuality = document.getElementById('val-quality');

// Telemetry & metrics
const metricOrigSize = document.getElementById('metric-orig-size');
const metricOptSize = document.getElementById('metric-opt-size');
const metricReduction = document.getElementById('metric-reduction');
const metricTime = document.getElementById('metric-time');
const telemetrySavings = document.getElementById('telemetry-savings');
const telemetrySpeed = document.getElementById('telemetry-speed');
const indicatorDims = document.getElementById('indicator-dims');
const btnDownload = document.getElementById('btn-download');

// State
let originalBlob = null;
let optimizedBlob = null;
let originalFileSize = 0;
let optimizedFileSize = 0;
let splitPosition = 0.5; // 0 to 1
let isDraggingHandle = false;

// Format helpers
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  return (kb / 1024).toFixed(2) + ' MB';
}

// -------------------------------------------------------------
// PROCEDURAL TEST IMAGES
// -------------------------------------------------------------
function generatePreset(preset) {
  const w = 1200, h = 800;
  canvasOrig.width = w;
  canvasOrig.height = h;
  const ctx = canvasOrig.getContext('2d');

  if (preset === 'nebula') {
    // Rich orbital nebula
    const grad = ctx.createRadialGradient(w * 0.4, h * 0.45, 50, w * 0.5, h * 0.5, w * 0.7);
    grad.addColorStop(0, '#ff7799');
    grad.addColorStop(0.3, '#7928ca');
    grad.addColorStop(0.6, '#0070f3');
    grad.addColorStop(1, '#05070d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stars & cosmic dust
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 2.0;
      const alpha = Math.random() * 0.8 + 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (preset === 'crust') {
    // High-frequency surface crust
    const imgData = ctx.createImageData(w, h);
    const d = imgData.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const n1 = Math.sin(x * 0.03) * Math.cos(y * 0.03);
        const n2 = Math.sin(x * 0.08 + y * 0.06);
        const v = Math.floor(128 + n1 * 60 + n2 * 40 + (Math.random() - 0.5) * 30);
        d[i] = Math.max(10, Math.min(245, v * 0.9));
        d[i + 1] = Math.max(10, Math.min(245, v));
        d[i + 2] = Math.max(10, Math.min(245, v * 1.1));
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  } else if (preset === 'blueprint') {
    // Futuristic vector blueprint
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(160, 120, w - 320, h - 240);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 140, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '14px ui-monospace, monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('LUNAR SYSTEM SCHEMATIC // REV 2.4', 180, 160);
  } else {
    // Smooth celestial gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#022c22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // Estimate uncompressed RAW / PNG baseline size
  canvasOrig.toBlob((blob) => {
    originalBlob = blob;
    originalFileSize = blob.size;
    transcode();
  }, 'image/png');
}

// -------------------------------------------------------------
// TRANSCODING ENGINE
// -------------------------------------------------------------
async function transcode() {
  const startTime = performance.now();
  const scale = parseFloat(paramScale.value);
  const quality = parseInt(paramQuality.value, 10) / 100;
  const format = paramFormat.value;
  const isGrayscale = paramGrayscale.checked;

  const targetW = Math.round(canvasOrig.width * scale);
  const targetH = Math.round(canvasOrig.height * scale);

  indicatorDims.textContent = `ORIGINAL: ${canvasOrig.width}×${canvasOrig.height} → OPT: ${targetW}×${targetH}`;

  // Offscreen canvas for processing
  const offscreen = document.createElement('canvas');
  offscreen.width = targetW;
  offscreen.height = targetH;
  const ctx = offscreen.getContext('2d');

  if (isGrayscale) {
    ctx.filter = 'grayscale(100%)';
  }
  ctx.drawImage(canvasOrig, 0, 0, targetW, targetH);

  // Encode to target format blob in RAM
  offscreen.toBlob((blob) => {
    if (!blob) return;
    optimizedBlob = blob;
    optimizedFileSize = blob.size;

    // Load into optimized preview canvas
    const img = new Image();
    img.onload = () => {
      canvasOpt.width = canvasOrig.width;
      canvasOpt.height = canvasOrig.height;
      const optCtx = canvasOpt.getContext('2d');
      optCtx.drawImage(img, 0, 0, canvasOrig.width, canvasOrig.height);
      updateSplitView();

      const duration = (performance.now() - startTime).toFixed(1);
      updateTelemetry(duration);
    };
    img.src = URL.createObjectURL(blob);
  }, format, quality);
}

function updateTelemetry(durationMs) {
  metricOrigSize.textContent = formatBytes(originalFileSize);
  metricOptSize.textContent = formatBytes(optimizedFileSize);

  const diff = originalFileSize - optimizedFileSize;
  const percent = originalFileSize > 0 ? ((diff / originalFileSize) * 100).toFixed(1) : 0;

  metricReduction.textContent = `${percent > 0 ? '-' : '+'}${Math.abs(percent)}%`;
  metricTime.textContent = `${durationMs} ms`;

  telemetrySavings.textContent = `SAVED: ${formatBytes(Math.max(0, diff))} (${percent}%)`;
  telemetrySpeed.textContent = `SPEED: ${durationMs} ms`;
}

// -------------------------------------------------------------
// SPLIT CURTAIN DRAG LOGIC
// -------------------------------------------------------------
function updateSplitView() {
  const containerW = canvasContainer.clientWidth;
  if (!containerW) return;
  const splitPx = containerW * splitPosition;

  splitHandle.style.left = `${splitPx}px`;

  // Right curtain shows the optimized version
  const rightWidth = containerW - splitPx;
  canvasOptWrapper.style.width = `${rightWidth}px`;
  canvasOpt.style.transform = `translateX(${rightWidth - containerW}px)`;
}

splitHandle.addEventListener('pointerdown', (e) => {
  isDraggingHandle = true;
  splitHandle.setPointerCapture(e.pointerId);
});

window.addEventListener('pointerup', () => {
  isDraggingHandle = false;
});

window.addEventListener('pointermove', (e) => {
  if (!isDraggingHandle) return;
  const rect = canvasContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  splitPosition = Math.max(0.02, Math.min(0.98, x / rect.width));
  updateSplitView();
});

window.addEventListener('resize', () => {
  updateSplitView();
});

// -------------------------------------------------------------
// USER INPUT LISTENERS
// -------------------------------------------------------------
paramQuality.addEventListener('input', (e) => {
  valQuality.textContent = `${e.target.value}%`;
  transcode();
});

paramFormat.addEventListener('change', () => transcode());
paramScale.addEventListener('change', () => transcode());
paramGrayscale.addEventListener('change', () => transcode());
paramStripExif.addEventListener('change', () => transcode());

// Presets
document.querySelectorAll('.btn-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    generatePreset(btn.dataset.preset);
  });
});

// Dropzone & File upload
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
    loadFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files?.length) {
    loadFile(fileInput.files[0]);
  }
});

function loadFile(file) {
  if (!file.type.startsWith('image/')) return;
  originalFileSize = file.size;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Memory safety cap
      let w = img.width, h = img.height;
      if (w > 4096 || h > 4096) {
        const aspect = w / h;
        if (w > h) { w = 4096; h = Math.round(4096 / aspect); }
        else { h = 4096; w = Math.round(4096 * aspect); }
      }
      canvasOrig.width = w;
      canvasOrig.height = h;
      const ctx = canvasOrig.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      transcode();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Download optimized asset
btnDownload.addEventListener('click', () => {
  if (!optimizedBlob) return;
  const ext = paramFormat.value === 'image/webp' ? 'webp' :
              paramFormat.value === 'image/jpeg' ? 'jpg' : 'png';
  const url = URL.createObjectURL(optimizedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `optimized_${Date.now()}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
});

// Kick off with default nebula preset
generatePreset('nebula');
