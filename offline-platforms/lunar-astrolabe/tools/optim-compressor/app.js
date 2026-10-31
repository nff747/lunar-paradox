try { performance.mark('optim:init-start'); } catch (_) {}
import { recordFunnelStep, recordToolFeedback, setupToolAnalytics } from '../telemetry-client.js';

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
const paramGrayscale = document.getElementById('param-grayscale');
const valQuality = document.getElementById('val-quality');

// Telemetry & metrics
const metricOrigSize = document.getElementById('metric-orig-size');
const originalLabel = document.getElementById('original-label');
const metricOptSize = document.getElementById('metric-opt-size');
const metricReduction = document.getElementById('metric-reduction');
const metricTime = document.getElementById('metric-time');
const telemetrySavings = document.getElementById('telemetry-savings');
const telemetrySpeed = document.getElementById('telemetry-speed');
const indicatorDims = document.getElementById('indicator-dims');
const btnDownload = document.getElementById('btn-download');
const sourceStatus = document.getElementById('source-status');
const qualityNote = document.getElementById('quality-note');

// SSIM & Magnifier Loupe elements
const metricSsim = document.getElementById('metric-ssim');
const metricSsimRating = document.getElementById('metric-ssim-rating');
const btnToggleLoupe = document.getElementById('btn-toggle-loupe');
const magnifierLoupe = document.getElementById('magnifier-loupe');
const canvasLoupe = document.getElementById('canvas-loupe');
const loupeTag = document.getElementById('loupe-tag');
let loupeActive = false;

// State
let originalBlob = null;
let optimizedBlob = null;
let originalFileSize = 0;
let latestTranscodeId = 0;
let latestSourceId = 0;
let activePreviewUrl = null;
let optimizedFileSize = 0;
let splitPosition = 0.5; // 0 to 1
let isDraggingHandle = false;
let sourceDescription = 'Sample image';
let sourceIsSample = true;

function pending(message) {
  optimizedBlob = null;
  btnDownload.disabled = true;
  sourceStatus.textContent = message;
  for (const el of [metricOrigSize, metricOptSize, metricReduction, metricTime, metricSsim, metricSsimRating]) el.textContent = '—';
  telemetrySavings.textContent = 'PROCESSING';
  telemetrySpeed.textContent = 'SPEED: —';
}
function updateQualityControl() {
  const png = paramFormat.value === 'image/png';
  paramQuality.disabled = png;
  qualityNote.textContent = png ? 'PNG encoding ignores the quality slider. Resizing and grayscale still alter the image.' : 'Quality applies to JPEG and WebP.';
}

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
  const sourceId = ++latestSourceId;
  ++latestTranscodeId;
  sourceDescription = 'Sample image';
  sourceIsSample = true;
  originalLabel.textContent = 'Sample PNG';
  pending('Preparing a sample image…');
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
    if (sourceId !== latestSourceId) return;
    if (!blob) { sourceStatus.textContent = 'Could not prepare the sample image. Try another sample.'; return; }
    originalBlob = blob;
    originalFileSize = blob.size;
    transcode();
  }, 'image/png');
}

// -------------------------------------------------------------
// TRANSCODING ENGINE
// -------------------------------------------------------------
async function transcode() {
  const currentReqId = ++latestTranscodeId;
  updateQualityControl();
  pending('Processing image…');
  const startTime = performance.now();
  const scale = parseFloat(paramScale.value);
  const quality = parseInt(paramQuality.value, 10) / 100;
  const format = paramFormat.value;
  const isGrayscale = paramGrayscale.checked;

  const targetW = Math.max(1, Math.round(canvasOrig.width * scale));
  const targetH = Math.max(1, Math.round(canvasOrig.height * scale));

  indicatorDims.textContent = `WORKING: ${canvasOrig.width}×${canvasOrig.height} → EXPORT: ${targetW}×${targetH}`;

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
    if (currentReqId !== latestTranscodeId) return;
    if (!blob || blob.type !== format) { sourceStatus.textContent = 'This browser could not encode the selected format. Try another format.'; return; }

    // Revoke previous preview object URL to prevent memory leaks
    if (activePreviewUrl) {
      URL.revokeObjectURL(activePreviewUrl);
      activePreviewUrl = null;
    }
    const previewUrl = URL.createObjectURL(blob);
    activePreviewUrl = previewUrl;

    // Load into optimized preview canvas
    const img = new Image();
    img.onload = () => {
      if (currentReqId !== latestTranscodeId) {
        URL.revokeObjectURL(previewUrl);
        if (activePreviewUrl === previewUrl) {
          activePreviewUrl = null;
        }
        return;
      }
      canvasOpt.width = canvasOrig.width;
      canvasOpt.height = canvasOrig.height;
      const optCtx = canvasOpt.getContext('2d');
      optCtx.drawImage(img, 0, 0, canvasOrig.width, canvasOrig.height);
      optimizedBlob = blob;
      optimizedFileSize = blob.size;
      btnDownload.disabled = false;
      sourceStatus.textContent = `${sourceDescription} ready. Compare the result and download when satisfied.`;
      updateSplitView();

      const duration = (performance.now() - startTime).toFixed(1);
      updateTelemetry(duration);
    };
    img.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      if (activePreviewUrl === previewUrl) {
        activePreviewUrl = null;
      }
      if (currentReqId === latestTranscodeId) sourceStatus.textContent = 'Could not preview the encoded image. Try another format.';
    };
    img.src = previewUrl;
  }, format, quality);
}

// -------------------------------------------------------------
// SSIM (STRUCTURAL SIMILARITY INDEX) CALCULATOR
// -------------------------------------------------------------
function calculateSSIM(origCtx, optCtx, width, height) {
  if (width < 8 || height < 8) return null;
  const stepX = Math.max(4, Math.floor(width / 60));
  const stepY = Math.max(4, Math.floor(height / 45));

  const origData = origCtx.getImageData(0, 0, width, height).data;
  const optData = optCtx.getImageData(0, 0, width, height).data;

  const C1 = 6.5025;  // (0.01 * 255)^2
  const C2 = 58.5225; // (0.03 * 255)^2

  let totalSsim = 0;
  let blocks = 0;

  for (let y = 0; y <= height - 8; y += stepY) {
    for (let x = 0; x <= width - 8; x += stepX) {
      let meanX = 0, meanY = 0;

      for (let dy = 0; dy < 8; dy++) {
        const row = (y + dy) * width;
        for (let dx = 0; dx < 8; dx++) {
          const idx = (row + (x + dx)) * 4;
          meanX += 0.299 * origData[idx] + 0.587 * origData[idx + 1] + 0.114 * origData[idx + 2];
          meanY += 0.299 * optData[idx] + 0.587 * optData[idx + 1] + 0.114 * optData[idx + 2];
        }
      }
      meanX /= 64;
      meanY /= 64;

      let varX = 0, varY = 0, covXY = 0;
      for (let dy = 0; dy < 8; dy++) {
        const row = (y + dy) * width;
        for (let dx = 0; dx < 8; dx++) {
          const idx = (row + (x + dx)) * 4;
          const lx = 0.299 * origData[idx] + 0.587 * origData[idx + 1] + 0.114 * origData[idx + 2];
          const ly = 0.299 * optData[idx] + 0.587 * optData[idx + 1] + 0.114 * optData[idx + 2];
          const diffX = lx - meanX;
          const diffY = ly - meanY;
          varX += diffX * diffX;
          varY += diffY * diffY;
          covXY += diffX * diffY;
        }
      }
      varX /= 63;
      varY /= 63;
      covXY /= 63;

      const num = (2 * meanX * meanY + C1) * (2 * covXY + C2);
      const den = (meanX * meanX + meanY * meanY + C1) * (varX + varY + C2);
      totalSsim += den > 0 ? (num / den) : 1.0;
      blocks++;
    }
  }

  return blocks > 0 ? Math.max(0.0, Math.min(1.0, totalSsim / blocks)) : null;
}

function updateTelemetry(durationMs) {
  if (!sourceIsSample) recordFunnelStep('optim-compressor', 'complete');
  if (!window.__optimReadyMarked) {
    window.__optimReadyMarked = true;
    try {
      performance.mark('optim:ready');
      performance.measure('optim:time-to-usable', 'optim:init-start', 'optim:ready');
    } catch (_) {}
  }
  metricOrigSize.textContent = formatBytes(originalFileSize);
  metricOptSize.textContent = formatBytes(optimizedFileSize);

  const diff = originalFileSize - optimizedFileSize;
  const percent = originalFileSize > 0 ? ((diff / originalFileSize) * 100).toFixed(1) : 0;

  metricReduction.textContent = `${percent > 0 ? '-' : percent < 0 ? '+' : ''}${Math.abs(percent)}%`;
  metricTime.textContent = `${durationMs} ms`;

  telemetrySavings.textContent = diff >= 0 ? `SAVED: ${formatBytes(diff)} (${percent}%)` : `LARGER: ${formatBytes(-diff)} (${Math.abs(percent)}%)`;
  telemetrySpeed.textContent = `SPEED: ${durationMs} ms`;

  // Compute SSIM
  if (canvasOrig.width && canvasOrig.height) {
    const ssimVal = calculateSSIM(canvasOrig.getContext('2d'), canvasOpt.getContext('2d'), canvasOrig.width, canvasOrig.height);
    metricSsim.textContent = ssimVal === null ? 'Unavailable' : ssimVal.toFixed(3);
    metricSsimRating.textContent = ssimVal === null ? 'Image too small' : 'Inspect visually';
  }
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
  if (!file.type.startsWith('image/')) { sourceStatus.textContent = 'Choose a supported image file.'; return; }
  recordFunnelStep('optim-compressor', 'start');
  sourceIsSample = false;
  const sourceId = ++latestSourceId;
  ++latestTranscodeId;
  pending('Opening image…');
  originalLabel.textContent = 'Original file';

  const reader = new FileReader();
  reader.onload = (e) => {
    if (sourceId !== latestSourceId) return;
    const img = new Image();
    img.onload = () => {
      if (sourceId !== latestSourceId) return;
      originalFileSize = file.size;
      // Memory safety cap
      let w = img.width, h = img.height;
      const resized = w > 4096 || h > 4096;
      if (w > 4096 || h > 4096) {
        const aspect = w / h;
        if (w > h) { w = 4096; h = Math.round(4096 / aspect); }
        else { h = 4096; w = Math.round(4096 * aspect); }
      }
      canvasOrig.width = w;
      canvasOrig.height = h;
      const ctx = canvasOrig.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      sourceDescription = resized ? `Image limited to ${w} × ${h} pixels` : 'Your image';
      transcode();
    };
    img.onerror = () => {
      recordFunnelStep('optim-compressor', 'error');
      if (sourceId === latestSourceId) sourceStatus.textContent = 'Could not open this image. Try a different file.';
    };
    img.src = e.target.result;
  };
  reader.onerror = () => { if (sourceId === latestSourceId) sourceStatus.textContent = 'Could not read this file. Try again.'; };
  reader.readAsDataURL(file);
}

// Download optimized asset
btnDownload.addEventListener('click', () => {
  if (!optimizedBlob) return;
  if (!sourceIsSample) recordFunnelStep('optim-compressor', 'export');
  const ext = optimizedBlob.type === 'image/webp' ? 'webp' :
              optimizedBlob.type === 'image/jpeg' ? 'jpg' : 'png';
  const url = URL.createObjectURL(optimizedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `optimized_${Date.now()}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
});

// -------------------------------------------------------------
// 3X MAGNIFIER LOUPE INTERACTION
// -------------------------------------------------------------
btnToggleLoupe?.addEventListener('click', () => {
  loupeActive = !loupeActive;
  btnToggleLoupe.textContent = `🔍 3× Loupe: ${loupeActive ? 'ON' : 'OFF'}`;
  btnToggleLoupe.classList.toggle('active', loupeActive);
  magnifierLoupe.style.display = loupeActive ? 'block' : 'none';
});

function renderLoupe(relX, relY, rect) {
  magnifierLoupe.style.display = 'block';
  magnifierLoupe.style.left = `${relX}px`;
  magnifierLoupe.style.top = `${relY}px`;

  // Scale coordinates to source canvas
  const scaleX = canvasOrig.width / rect.width;
  const scaleY = canvasOrig.height / rect.height;
  const srcX = relX * scaleX;
  const srcY = relY * scaleY;

  // Determine which side of split cursor is on
  const splitPx = rect.width * splitPosition;
  const isOptimized = relX > splitPx;
  loupeTag.textContent = isOptimized ? 'OPTIMIZED (3×)' : 'ORIGINAL (3×)';
  loupeTag.style.color = isOptimized ? 'var(--accent-cyan)' : 'var(--text-main)';

  const lCtx = canvasLoupe.getContext('2d');
  lCtx.imageSmoothingEnabled = false;
  lCtx.clearRect(0, 0, 140, 140);

  const sampleSize = 46; // 46px -> 140px (~3x magnification)
  const sourceCanvas = isOptimized ? canvasOpt : canvasOrig;
  lCtx.drawImage(
    sourceCanvas,
    Math.max(0, Math.min(sourceCanvas.width - sampleSize, srcX - sampleSize / 2)),
    Math.max(0, Math.min(sourceCanvas.height - sampleSize, srcY - sampleSize / 2)),
    sampleSize, sampleSize,
    0, 0, 140, 140
  );
}

canvasContainer.addEventListener('pointermove', (e) => {
  if (!loupeActive) return;
  const rect = canvasContainer.getBoundingClientRect();
  const relX = e.clientX - rect.left;
  const relY = e.clientY - rect.top;

  if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) {
    magnifierLoupe.style.display = 'none';
    return;
  }
  renderLoupe(relX, relY, rect);
});

canvasContainer.addEventListener('pointerleave', () => {
  if (loupeActive) magnifierLoupe.style.display = 'none';
});

// Feedback handlers
const feedbackStrip = document.getElementById('feedback-strip');
const feedbackAck = document.getElementById('feedback-ack');
document.getElementById('feedback-yes')?.addEventListener('click', () => {
  recordToolFeedback('optim-compressor', true);
  if (feedbackStrip) feedbackStrip.style.display = 'none';
  if (feedbackAck) feedbackAck.style.display = 'inline-block';
});
document.getElementById('feedback-no')?.addEventListener('click', () => {
  recordToolFeedback('optim-compressor', false);
  if (feedbackStrip) feedbackStrip.style.display = 'none';
  if (feedbackAck) feedbackAck.style.display = 'inline-block';
});

// Pause loupe when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden && loupeActive) {
    magnifierLoupe.style.display = 'none';
  }
});

// Record initial view
setupToolAnalytics('optim-compressor');
recordFunnelStep('optim-compressor', 'view');

// Kick off with default nebula preset
generatePreset('nebula');
