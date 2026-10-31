// DOM Elements
const btnPlay = document.getElementById('btn-master-play');
const paramMasterGain = document.getElementById('param-master-gain');
const canvasLissajous = document.getElementById('canvas-lissajous');
const canvasSpectrum = document.getElementById('canvas-spectrum');
const valPeakDb = document.getElementById('val-peak-db');
const btnRecordWav = document.getElementById('btn-record-wav');
const recordLabel = document.getElementById('record-label');

// Oscillators inputs
const paramOsc1Wave = document.getElementById('param-osc1-wave');
const paramOsc1Freq = document.getElementById('param-osc1-freq');
const valOsc1Freq = document.getElementById('val-osc1-freq');

const paramOsc2Wave = document.getElementById('param-osc2-wave');
const paramOsc2Ratio = document.getElementById('param-osc2-ratio');
const valOsc2Ratio = document.getElementById('val-osc2-ratio');

const paramBinauralPreset = document.getElementById('param-binaural-preset');
const paramBinauralGain = document.getElementById('param-binaural-gain');
const valBinauralBeat = document.getElementById('val-binaural-beat');

const paramNoiseGain = document.getElementById('param-noise-gain');
const valNoiseGain = document.getElementById('val-noise-gain');

// Filter & LFO inputs
const paramFilterCutoff = document.getElementById('param-filter-cutoff');
const valFilterCutoff = document.getElementById('val-filter-cutoff');
const paramFilterQ = document.getElementById('param-filter-q');
const valFilterQ = document.getElementById('val-filter-q');
const paramLfoRate = document.getElementById('param-lfo-rate');
const valLfoRate = document.getElementById('val-lfo-rate');

// Additional DOM Elements for Patches & Stereo Widener
const paramStereoSpread = document.getElementById('param-stereo-spread');
const valStereoStatus = document.getElementById('val-stereo-status');
const btnSavePatch = document.getElementById('btn-save-patch');
const btnExportPatches = document.getElementById('btn-export-patches');
const btnImportPatches = document.getElementById('btn-import-patches');
const patchFileInput = document.getElementById('patch-file-input');
const presetsContainer = document.getElementById('presets-container');

// State
let isPlaying = false;
let isRecording = false;
let recordBufferLeft = [];
let recordBufferRight = [];
let recordSampleCount = 0;
const MAX_RECORD_SECONDS = 10;

// Web Audio Graph
let audioCtx = null;
let masterGain = null;
let limiter = null;
let mainFilter = null;
let lfoOsc = null;
let lfoGain = null;

let osc1 = null;
let osc1Gain = null;

let osc2 = null;
let osc2Gain = null;

let oscBinL = null;
let oscBinR = null;
let pannerL = null;
let pannerR = null;
let binGain = null;

let noiseNode = null;
let noiseGain = null;

// Stereo Widening / Phase Matrix Nodes
let stereoSplitter = null;
let stereoMerger = null;
let widenerDelay = null;
let dryGainL = null;
let dryGainR = null;
let wetGainR = null;

let analyserL = null;
let analyserR = null;
let splitter = null;

function initAudio() {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();

  // 1. Master Output Safety Chain: Filter -> DynamicsCompressor (Limiter) -> MasterGain -> Destination
  limiter = audioCtx.createDynamicsCompressor();
  limiter.threshold.setValueAtTime(-3.0, audioCtx.currentTime); // -3dB
  limiter.knee.setValueAtTime(0, audioCtx.currentTime);         // Hard knee
  limiter.ratio.setValueAtTime(20.0, audioCtx.currentTime);     // 20:1 compression
  limiter.attack.setValueAtTime(0.002, audioCtx.currentTime);   // 2ms ultra-fast clamp
  limiter.release.setValueAtTime(0.05, audioCtx.currentTime);   // 50ms smooth recovery

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(parseFloat(paramMasterGain.value), audioCtx.currentTime);

  // 2. Resonant Filter
  mainFilter = audioCtx.createBiquadFilter();
  mainFilter.type = 'lowpass';
  mainFilter.frequency.setValueAtTime(parseFloat(paramFilterCutoff.value), audioCtx.currentTime);
  mainFilter.Q.setValueAtTime(parseFloat(paramFilterQ.value), audioCtx.currentTime);

  // 3. Filter LFO
  lfoOsc = audioCtx.createOscillator();
  lfoOsc.type = 'sine';
  lfoOsc.frequency.setValueAtTime(parseFloat(paramLfoRate.value), audioCtx.currentTime);
  lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(150, audioCtx.currentTime);
  lfoOsc.connect(lfoGain);
  lfoGain.connect(mainFilter.frequency);
  lfoOsc.start();

  // 4. Oscillators
  // Node 1 (Fundamental)
  osc1 = audioCtx.createOscillator();
  osc1.type = paramOsc1Wave.value;
  osc1.frequency.setValueAtTime(parseFloat(paramOsc1Freq.value), audioCtx.currentTime);
  osc1Gain = audioCtx.createGain();
  osc1Gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
  osc1.connect(osc1Gain);
  osc1Gain.connect(mainFilter);
  osc1.start();

  // Node 2 (Harmonic Overtone)
  osc2 = audioCtx.createOscillator();
  osc2.type = paramOsc2Wave.value;
  const f2 = parseFloat(paramOsc1Freq.value) * parseFloat(paramOsc2Ratio.value);
  osc2.frequency.setValueAtTime(f2, audioCtx.currentTime);
  osc2Gain = audioCtx.createGain();
  osc2Gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  osc2.connect(osc2Gain);
  osc2Gain.connect(mainFilter);
  osc2.start();

  // Node 3 (Binaural Pair: Left and Right Detuned)
  const baseFreq = parseFloat(paramOsc1Freq.value);
  const beat = parseFloat(paramBinauralPreset.value);
  oscBinL = audioCtx.createOscillator();
  oscBinL.type = 'sine';
  oscBinL.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);

  oscBinR = audioCtx.createOscillator();
  oscBinR.type = 'sine';
  oscBinR.frequency.setValueAtTime(baseFreq + beat, audioCtx.currentTime);

  pannerL = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
  pannerR = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
  if (pannerL && pannerR) {
    pannerL.pan.setValueAtTime(-1, audioCtx.currentTime);
    pannerR.pan.setValueAtTime(1, audioCtx.currentTime);
  }

  binGain = audioCtx.createGain();
  binGain.gain.setValueAtTime(parseFloat(paramBinauralGain.value), audioCtx.currentTime);

  if (pannerL && pannerR) {
    oscBinL.connect(pannerL);
    oscBinR.connect(pannerR);
    pannerL.connect(binGain);
    pannerR.connect(binGain);
  } else {
    oscBinL.connect(binGain);
    oscBinR.connect(binGain);
  }
  binGain.connect(mainFilter);
  oscBinL.start();
  oscBinR.start();

  // Node 4 (Cosmic Noise Generator)
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
  }
  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;
  noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(parseFloat(paramNoiseGain.value), audioCtx.currentTime);
  noiseNode.connect(noiseGain);
  noiseGain.connect(mainFilter);
  noiseNode.start();

  // Stereo Widener Stage (Haas acoustic phase decorrelation)
  // Splits filter output into L & R, passes R through a micro 12ms delay to open stereo field
  stereoSplitter = audioCtx.createChannelSplitter(2);
  stereoMerger = audioCtx.createChannelMerger(2);
  widenerDelay = audioCtx.createDelay(0.05);
  widenerDelay.delayTime.setValueAtTime(0.012, audioCtx.currentTime); // 12ms phase offset
  
  dryGainL = audioCtx.createGain();
  dryGainR = audioCtx.createGain();
  wetGainR = audioCtx.createGain();
  
  const isWidenerOn = paramStereoSpread ? paramStereoSpread.checked : true;
  dryGainL.gain.setValueAtTime(1.0, audioCtx.currentTime);
  dryGainR.gain.setValueAtTime(isWidenerOn ? 0.2 : 1.0, audioCtx.currentTime);
  wetGainR.gain.setValueAtTime(isWidenerOn ? 0.8 : 0.0, audioCtx.currentTime);

  mainFilter.connect(stereoSplitter);
  stereoSplitter.connect(dryGainL, 0);
  stereoSplitter.connect(dryGainR, 1);
  stereoSplitter.connect(widenerDelay, 1);
  widenerDelay.connect(wetGainR);

  dryGainL.connect(stereoMerger, 0, 0); // Left channel
  dryGainR.connect(stereoMerger, 0, 1); // Right channel (dry)
  wetGainR.connect(stereoMerger, 0, 1); // Right channel (delayed phase)

  // Visualizer Splitter & Analysers tap from stereoMerger
  splitter = audioCtx.createChannelSplitter(2);
  analyserL = audioCtx.createAnalyser();
  analyserR = audioCtx.createAnalyser();
  analyserL.fftSize = 1024;
  analyserR.fftSize = 1024;

  stereoMerger.connect(splitter);
  splitter.connect(analyserL, 0);
  splitter.connect(analyserR, 1);

  // Connect stereo stage into limiter -> masterGain -> destination
  stereoMerger.connect(limiter);
  limiter.connect(masterGain);
  masterGain.connect(audioCtx.destination);

  // In-browser WAV recorder tap
  const recorderNode = audioCtx.createScriptProcessor(4096, 2, 2);
  recorderNode.onaudioprocess = (e) => {
    if (!isRecording) return;
    const left = e.inputBuffer.getChannelData(0);
    const right = e.inputBuffer.getChannelData(1);
    recordBufferLeft.push(new Float32Array(left));
    recordBufferRight.push(new Float32Array(right));
    recordSampleCount += left.length;

    if (recordSampleCount >= audioCtx.sampleRate * MAX_RECORD_SECONDS) {
      stopRecording();
    }
  };
  masterGain.connect(recorderNode);
  recorderNode.connect(audioCtx.destination);
}

// Stereo Widener Toggle
if (paramStereoSpread) {
  paramStereoSpread.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    valStereoStatus.textContent = enabled ? 'STEREO WIDENER ON' : 'STEREO WIDENER OFF';
    valStereoStatus.style.color = enabled ? 'var(--accent-cyan)' : 'var(--text-muted)';
    if (audioCtx && dryGainR && wetGainR) {
      dryGainR.gain.setTargetAtTime(enabled ? 0.2 : 1.0, audioCtx.currentTime, 0.02);
      wetGainR.gain.setTargetAtTime(enabled ? 0.8 : 0.0, audioCtx.currentTime, 0.02);
    }
  });
}

// -------------------------------------------------------------
// PLAY / PAUSE TRANSPORT
// -------------------------------------------------------------
btnPlay.addEventListener('click', async () => {
  if (!audioCtx) initAudio();
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }

  const telemetryDsp = document.getElementById('telemetry-dsp');
  const telemetryLimiter = document.getElementById('telemetry-limiter');

  if (isPlaying) {
    masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
    btnPlay.textContent = '▶ START SYNTHESIZER';
    btnPlay.classList.remove('playing');
    isPlaying = false;
    if (telemetryDsp) telemetryDsp.textContent = 'DSP: PAUSED';
    if (telemetryLimiter) telemetryLimiter.textContent = 'COMPRESSOR: STANDBY';
  } else {
    const targetGain = Math.min(0.8, parseFloat(paramMasterGain.value));
    masterGain.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05);
    btnPlay.textContent = '■ PAUSE AUDIO ENGINE';
    btnPlay.classList.add('playing');
    isPlaying = true;
    if (telemetryDsp) telemetryDsp.textContent = `DSP: ${(audioCtx.sampleRate / 1000).toFixed(1)} kHz / 32-BIT`;
    if (telemetryLimiter) telemetryLimiter.textContent = 'COMPRESSOR: ENGAGED';
  }
});

// Master gain slider with acoustic clamp
paramMasterGain.addEventListener('input', (e) => {
  if (!audioCtx || !masterGain) return;
  const clamped = Math.min(0.8, Math.max(0.0, parseFloat(e.target.value)));
  if (isPlaying) {
    masterGain.gain.setTargetAtTime(clamped, audioCtx.currentTime, 0.02);
  }
});

// -------------------------------------------------------------
// PARAMETER ADJUSTMENTS
// -------------------------------------------------------------
function updateOscillators() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const f1 = parseFloat(paramOsc1Freq.value);
  valOsc1Freq.textContent = `${f1} Hz`;
  osc1.frequency.setTargetAtTime(f1, now, 0.02);
  osc1.type = paramOsc1Wave.value;

  const ratio = parseFloat(paramOsc2Ratio.value);
  valOsc2Ratio.textContent = `${ratio}×`;
  osc2.frequency.setTargetAtTime(f1 * ratio, now, 0.02);
  osc2.type = paramOsc2Wave.value;

  const beat = parseFloat(paramBinauralPreset.value);
  valBinauralBeat.textContent = `${beat} Hz`;
  oscBinL.frequency.setTargetAtTime(f1, now, 0.02);
  oscBinR.frequency.setTargetAtTime(f1 + beat, now, 0.02);
  binGain.gain.setTargetAtTime(parseFloat(paramBinauralGain.value), now, 0.02);

  const noiseG = parseFloat(paramNoiseGain.value);
  valNoiseGain.textContent = `${Math.round(noiseG * 250)}%`;
  noiseGain.gain.setTargetAtTime(noiseG, now, 0.02);
}

paramOsc1Freq.addEventListener('input', updateOscillators);
paramOsc1Wave.addEventListener('change', updateOscillators);
paramOsc2Ratio.addEventListener('change', updateOscillators);
paramOsc2Wave.addEventListener('change', updateOscillators);
paramBinauralPreset.addEventListener('change', updateOscillators);
paramBinauralGain.addEventListener('input', updateOscillators);
paramNoiseGain.addEventListener('input', updateOscillators);

// Filter & LFO controls
paramFilterCutoff.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  valFilterCutoff.textContent = `${val} Hz`;
  if (mainFilter) mainFilter.frequency.setTargetAtTime(val, audioCtx.currentTime, 0.02);
});

paramFilterQ.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  valFilterQ.textContent = val.toFixed(1);
  if (mainFilter) mainFilter.Q.setTargetAtTime(val, audioCtx.currentTime, 0.02);
});

paramLfoRate.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  valLfoRate.textContent = `${val.toFixed(2)} Hz`;
  if (lfoOsc) lfoOsc.frequency.setTargetAtTime(val, audioCtx.currentTime, 0.02);
});

// -------------------------------------------------------------
// PRESETS & PATCH MANAGER (Local Storage & JSON Export/Import)
// -------------------------------------------------------------
const defaultPresets = {
  mare: {
    name: 'Mare Tranquillitatis',
    f1: 55, w1: 'sine', ratio: 1.5, w2: 'triangle',
    beat: '4.5', binGain: 0.3, noiseGain: 0.12, cutoff: 420, q: 4.5, lfo: 0.12
  },
  solar: {
    name: 'Solar Wind Flare',
    f1: 110, w1: 'sawtooth', ratio: 2.0, w2: 'sine',
    beat: '10.0', binGain: 0.25, noiseGain: 0.25, cutoff: 1600, q: 8.0, lfo: 0.45
  },
  pulsar: {
    name: 'Neutron Pulsar',
    f1: 42, w1: 'triangle', ratio: 3.0, w2: 'sawtooth',
    beat: '2.0', binGain: 0.4, noiseGain: 0.08, cutoff: 280, q: 11.0, lfo: 1.2
  },
  void: {
    name: 'Deep Void Stasis',
    f1: 65, w1: 'sine', ratio: 2.0, w2: 'sine',
    beat: '4.5', binGain: 0.35, noiseGain: 0.05, cutoff: 650, q: 2.0, lfo: 0.05
  }
};

let activePatches = { ...defaultPresets };

function loadCustomPatches() {
  try {
    const saved = localStorage.getItem('lunar_dsp_patches');
    if (saved) {
      const parsed = JSON.parse(saved);
      activePatches = { ...defaultPresets, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load local patches', err);
  }
  renderPresetButtons();
}

function renderPresetButtons() {
  if (!presetsContainer) return;
  presetsContainer.innerHTML = '';
  Object.keys(activePatches).forEach((key, idx) => {
    const p = activePatches[key];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn-preset ${idx === 0 ? 'active' : ''}`;
    btn.dataset.preset = key;
    btn.textContent = p.name || key;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyPreset(p);
    });
    presetsContainer.appendChild(btn);
  });
}

function applyPreset(p) {
  paramOsc1Freq.value = p.f1;
  paramOsc1Wave.value = p.w1;
  paramOsc2Ratio.value = p.ratio;
  paramOsc2Wave.value = p.w2;
  paramBinauralPreset.value = p.beat;
  paramBinauralGain.value = p.binGain;
  paramNoiseGain.value = p.noiseGain;
  paramFilterCutoff.value = p.cutoff;
  valFilterCutoff.textContent = `${p.cutoff} Hz`;
  paramFilterQ.value = p.q;
  valFilterQ.textContent = p.q.toFixed(1);
  paramLfoRate.value = p.lfo;
  valLfoRate.textContent = `${p.lfo.toFixed(2)} Hz`;

  if (audioCtx) {
    updateOscillators();
    mainFilter.frequency.setTargetAtTime(p.cutoff, audioCtx.currentTime, 0.02);
    mainFilter.Q.setTargetAtTime(p.q, audioCtx.currentTime, 0.02);
    lfoOsc.frequency.setTargetAtTime(p.lfo, audioCtx.currentTime, 0.02);
  }
}

if (btnSavePatch) {
  btnSavePatch.addEventListener('click', () => {
    const patchName = prompt('Enter a name for this custom sound patch:', `Patch ${Object.keys(activePatches).length + 1}`);
    if (!patchName) return;
    const id = `custom_${Date.now()}`;
    activePatches[id] = {
      name: patchName,
      f1: parseFloat(paramOsc1Freq.value),
      w1: paramOsc1Wave.value,
      ratio: parseFloat(paramOsc2Ratio.value),
      w2: paramOsc2Wave.value,
      beat: paramBinauralPreset.value,
      binGain: parseFloat(paramBinauralGain.value),
      noiseGain: parseFloat(paramNoiseGain.value),
      cutoff: parseFloat(paramFilterCutoff.value),
      q: parseFloat(paramFilterQ.value),
      lfo: parseFloat(paramLfoRate.value)
    };
    try {
      localStorage.setItem('lunar_dsp_patches', JSON.stringify(activePatches));
    } catch (e) {}
    renderPresetButtons();
    const newBtn = presetsContainer.querySelector(`[data-preset="${id}"]`);
    if (newBtn) {
      document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
      newBtn.classList.add('active');
    }
  });
}

if (btnExportPatches) {
  btnExportPatches.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activePatches, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `lunar_sound_patches_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

if (btnImportPatches && patchFileInput) {
  btnImportPatches.addEventListener('click', () => patchFileInput.click());
  patchFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        activePatches = { ...activePatches, ...imported };
        localStorage.setItem('lunar_dsp_patches', JSON.stringify(activePatches));
        renderPresetButtons();
      } catch (err) {
        alert('Invalid JSON patch file.');
      }
    };
    reader.readAsText(file);
  });
}

loadCustomPatches();

// -------------------------------------------------------------
// VISUALIZERS (Lissajous & FFT Spectrum)
// -------------------------------------------------------------
const ctxLissajous = canvasLissajous.getContext('2d');
const ctxSpectrum = canvasSpectrum.getContext('2d');

function resizeCanvases() {
  canvasLissajous.width = canvasLissajous.clientWidth * window.devicePixelRatio;
  canvasLissajous.height = canvasLissajous.clientHeight * window.devicePixelRatio;
  canvasSpectrum.width = canvasSpectrum.clientWidth * window.devicePixelRatio;
  canvasSpectrum.height = canvasSpectrum.clientHeight * window.devicePixelRatio;
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

const timeDataL = new Float32Array(512);
const timeDataR = new Float32Array(512);
const freqData = new Uint8Array(256);

// Multi-trace phosphor decay history buffer
const PHOSPHOR_TRACE_COUNT = 4;
const traceHistory = [];

function drawVisualizers() {
  requestAnimationFrame(drawVisualizers);

  const wL = canvasLissajous.width;
  const hL = canvasLissajous.height;
  const wS = canvasSpectrum.width;
  const hS = canvasSpectrum.height;

  // 1. Lissajous Scope (X=Left, Y=Right) with Phosphor Decay
  ctxLissajous.fillStyle = 'rgba(7, 9, 14, 0.35)';
  ctxLissajous.fillRect(0, 0, wL, hL);

  if (analyserL && analyserR && isPlaying) {
    analyserL.getFloatTimeDomainData(timeDataL);
    analyserR.getFloatTimeDomainData(timeDataR);

    // Push snapshot into phosphor trace history
    traceHistory.unshift({
      l: new Float32Array(timeDataL),
      r: new Float32Array(timeDataR)
    });
    if (traceHistory.length > PHOSPHOR_TRACE_COUNT) {
      traceHistory.pop();
    }

    const cx = wL / 2;
    const cy = hL / 2;
    const scale = Math.min(wL, hL) * 0.42;

    // Render historical phosphor trails back to front
    for (let t = traceHistory.length - 1; t >= 0; t--) {
      const trace = traceHistory[t];
      const isLead = (t === 0);
      const alpha = isLead ? 0.95 : (0.28 / (t + 1));
      
      ctxLissajous.strokeStyle = isLead ? '#38bdf8' : `rgba(56, 189, 248, ${alpha.toFixed(2)})`;
      ctxLissajous.lineWidth = (isLead ? 1.75 : 1.0) * window.devicePixelRatio;
      ctxLissajous.beginPath();

      for (let i = 0; i < trace.l.length; i++) {
        const x = cx + trace.l[i] * scale;
        const y = cy - trace.r[i] * scale;
        if (i === 0) ctxLissajous.moveTo(x, y);
        else ctxLissajous.lineTo(x, y);
      }
      ctxLissajous.stroke();
    }
  } else {
    // Subtle resting circle
    ctxLissajous.strokeStyle = '#1e293b';
    ctxLissajous.lineWidth = 1;
    ctxLissajous.beginPath();
    ctxLissajous.arc(wL / 2, hL / 2, Math.min(wL, hL) * 0.35, 0, Math.PI * 2);
    ctxLissajous.stroke();
  }

  // 2. FFT Spectral Bars
  ctxSpectrum.fillStyle = 'rgba(7, 9, 14, 0.3)';
  ctxSpectrum.fillRect(0, 0, wS, hS);

  if (analyserL && isPlaying) {
    analyserL.getByteFrequencyData(freqData);

    let maxVal = 0;
    const barCount = 64;
    const barWidth = (wS / barCount);

    for (let i = 0; i < barCount; i++) {
      const val = freqData[i * 2];
      if (val > maxVal) maxVal = val;
      const barHeight = (val / 255) * hS * 0.85;

      const grad = ctxSpectrum.createLinearGradient(0, hS - barHeight, 0, hS);
      grad.addColorStop(0, '#a78bfa');
      grad.addColorStop(1, '#38bdf8');
      ctxSpectrum.fillStyle = grad;
      ctxSpectrum.fillRect(i * barWidth, hS - barHeight, barWidth - 1, barHeight);
    }

    const peakDb = maxVal > 0 ? (20 * Math.log10(maxVal / 255)).toFixed(1) : '-96.0';
    valPeakDb.textContent = `${peakDb} dB`;
  } else {
    valPeakDb.textContent = 'NOT MEASURED';
  }
}

drawVisualizers();

// -------------------------------------------------------------
// LOSSLESS WAV RECORDER & EXPORTER
// -------------------------------------------------------------
btnRecordWav.addEventListener('click', () => {
  if (!audioCtx || !isPlaying) {
    alert('Please start the audio engine first before recording.');
    return;
  }
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
});

function startRecording() {
  recordBufferLeft = [];
  recordBufferRight = [];
  recordSampleCount = 0;
  isRecording = true;
  btnRecordWav.classList.add('recording');
  recordLabel.textContent = 'Recording 10s... (Click to Finish)';
}

function stopRecording() {
  if (!isRecording) return;
  isRecording = false;
  btnRecordWav.classList.remove('recording');
  recordLabel.textContent = 'Record 16-bit WAV (10s)';

  // Combine Float32 chunks
  const totalSamples = recordSampleCount;
  const leftChannel = new Float32Array(totalSamples);
  const rightChannel = new Float32Array(totalSamples);

  let offset = 0;
  for (let i = 0; i < recordBufferLeft.length; i++) {
    leftChannel.set(recordBufferLeft[i], offset);
    rightChannel.set(recordBufferRight[i], offset);
    offset += recordBufferLeft[i].length;
  }

  // Encode to 16-bit PCM RIFF WAVE
  const wavBlob = encodeWAV([leftChannel, rightChannel], audioCtx.sampleRate);
  const url = URL.createObjectURL(wavBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lunar_resonance_${Date.now()}.wav`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function encodeWAV(channels, sampleRate) {
  const numChannels = channels.length;
  const length = channels[0].length;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = length * blockAlign;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF Chunk Descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // fmt sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);             // Subchunk1Size
  view.setUint16(20, 1, true);              // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);             // BitsPerSample

  // data sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write interleaved PCM samples
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = Math.max(-1, Math.min(1, channels[ch][i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}
