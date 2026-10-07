import React, { useState, useMemo, useCallback } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ArrowLeftRight, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Sliders, 
  Code2, 
  Eye, 
  Grid3X3, 
  Zap, 
  Layers, 
  Sun, 
  Moon,
  Wand2
} from 'lucide-react';

// ============================================================================
// COLOR SCIENCE ALGORITHMS (WCAG 2.1 & APCA READABILITY ENGINE)
// ============================================================================

function parseHex(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
    hex: '#' + clean.toUpperCase()
  };
}

function rgbToHex(r, g, b) {
  const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (c) => clamp(c).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function sRGBtoLin(channel) {
  const v = channel / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linToSRGB(lin) {
  const v = lin <= 0.0031308 ? lin * 12.92 : 1.055 * Math.pow(lin, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(v * 255)));
}

function getRelativeLuminance(rgb) {
  if (!rgb) return 0;
  return 0.2126 * sRGBtoLin(rgb.r) + 0.7152 * sRGBtoLin(rgb.g) + 0.0722 * sRGBtoLin(rgb.b);
}

function calculateWCAGContrast(lum1, lum2) {
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return (l1 + 0.05) / (l2 + 0.05);
}

// APCA Perceptual Contrast Approximation (Lc)
function calculateAPCALc(txtRgb, bgRgb) {
  if (!txtRgb || !bgRgb) return 0;
  const Ytxt = getRelativeLuminance(txtRgb);
  const Ybg = getRelativeLuminance(bgRgb);

  // Clamping soft black floor
  const yTxtClamped = Ytxt > 0.022 ? Ytxt : Ytxt + Math.pow(0.022 - Ytxt, 1.414);
  const yBgClamped = Ybg > 0.022 ? Ybg : Ybg + Math.pow(0.022 - Ybg, 1.414);

  // Dark mode (light text on dark background)
  if (yTxtClamped >= yBgClamped) {
    const sTxt = Math.pow(yTxtClamped, 0.56);
    const sBg = Math.pow(yBgClamped, 0.62);
    const lc = (sTxt - sBg) * 1.14;
    return Math.round(lc * 100);
  } else {
    // Light mode (dark text on light bg)
    const sTxt = Math.pow(yTxtClamped, 0.62);
    const sBg = Math.pow(yBgClamped, 0.56);
    const lc = (sBg - sTxt) * 1.14;
    return -Math.round(lc * 100);
  }
}

// Curated Master Presets for Spatial & OLED Design
const PRESETS = [
  {
    name: 'OLED Pure Black',
    badge: 'True OLED',
    fg: '#F5F5F7',
    bg: '#000000',
    desc: 'Zero pixel power on OLED displays. Ultra-crisp Apple typography.'
  },
  {
    name: 'Obsidian Nebula',
    badge: 'Lunar Core',
    fg: '#80D8FF',
    bg: '#030108',
    desc: 'Deep cosmological void paired with ethereal lunar crescent cyan.'
  },
  {
    name: 'Apple Vision Slate',
    badge: 'VisionOS',
    fg: '#FFFFFF',
    bg: '#1C1C1E',
    desc: 'Signature frosted glass foundation used across VisionOS and iOS 18.'
  },
  {
    name: 'Titanium Minimal',
    badge: 'Industrial',
    fg: '#E5E5EA',
    bg: '#121214',
    desc: 'Deep matte metal finish with soft contrast for reduced eye strain.'
  },
  {
    name: 'Matrix Cyberpunk',
    badge: 'Terminal',
    fg: '#00FF66',
    bg: '#050E07',
    desc: 'Phosphor bio-luminescence on obsidian matrix floor.'
  },
  {
    name: 'Solar Starlight',
    badge: 'Warm OLED',
    fg: '#FFB800',
    bg: '#0A0704',
    desc: 'Warm amber photon emission, high legibility for nighttime reading.'
  }
];

export default function ForgeContrastLabModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Active State
  const [activeTab, setActiveTab] = useState('auditor'); // 'auditor' | 'matrix' | 'export'
  const [fgHex, setFgHex] = useState('#80D8FF');
  const [bgHex, setBgHex] = useState('#030108');
  const [copiedKey, setCopiedKey] = useState(null);
  const [visionFilter, setVisionFilter] = useState('normal'); // 'normal' | 'protanopia' | 'deuteranopia' | 'achromatopsia' | 'glare'

  // Parsed Color Computations
  const fgRgb = useMemo(() => parseHex(fgHex) || { r: 128, g: 216, b: 255, hex: '#80D8FF' }, [fgHex]);
  const bgRgb = useMemo(() => parseHex(bgHex) || { r: 3, g: 1, b: 8, hex: '#030108' }, [bgHex]);

  const fgLum = useMemo(() => getRelativeLuminance(fgRgb), [fgRgb]);
  const bgLum = useMemo(() => getRelativeLuminance(bgRgb), [bgRgb]);
  const contrastRatio = useMemo(() => calculateWCAGContrast(fgLum, bgLum), [fgLum, bgLum]);
  const apcaLc = useMemo(() => calculateAPCALc(fgRgb, bgRgb), [fgRgb, bgRgb]);

  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;
  const passesAALarge = contrastRatio >= 3.0;

  // Copy helper
  const handleCopy = useCallback((text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  }, []);

  // Swap Colors
  const handleSwap = () => {
    const temp = fgHex;
    setFgHex(bgHex);
    setBgHex(temp);
  };

  // Google-Style Instant Auto-Optimizer: Adjust foreground lightness to guarantee AAA (7.0:1)
  const handleAutoOptimizeAAA = () => {
    const bgL = getRelativeLuminance(bgRgb);
    // Needed light luminance to achieve 7.0:
    // (L1 + 0.05) / (L2 + 0.05) = 7.0 => L1 = 7.0 * (L2 + 0.05) - 0.05
    const targetLum = Math.min(1.0, 7.05 * (bgL + 0.05) - 0.05);
    
    // Scale current FG color channels towards white to match targetLum
    const currentLum = getRelativeLuminance(fgRgb);
    if (currentLum >= targetLum) return; // already AAA

    // Binary search for brightness multiplier or interpolation towards white
    let low = 0;
    let high = 1;
    let bestHex = fgHex;

    for (let i = 0; i < 15; i++) {
      const mid = (low + high) / 2;
      const r = Math.round(fgRgb.r + (255 - fgRgb.r) * mid);
      const g = Math.round(fgRgb.g + (255 - fgRgb.g) * mid);
      const b = Math.round(fgRgb.b + (255 - fgRgb.b) * mid);
      const l = getRelativeLuminance({ r, g, b });
      if (l >= targetLum) {
        bestHex = rgbToHex(r, g, b);
        high = mid;
      } else {
        low = mid;
      }
    }
    setFgHex(bestHex);
  };

  // APCA Assessment
  const apcaLevel = useMemo(() => {
    const absLc = Math.abs(apcaLc);
    if (absLc >= 90) return { label: 'Universal (Body + UI + Micro)', color: 'text-emerald-400', badge: 'Optimal Lc 90+' };
    if (absLc >= 75) return { label: 'Fluent Reading (Body Copy >= 14px)', color: 'text-sky-400', badge: 'Fluent Lc 75+' };
    if (absLc >= 60) return { label: 'Large Headings & Display Titles', color: 'text-indigo-400', badge: 'Display Lc 60+' };
    if (absLc >= 45) return { label: 'Large Bold UI / Non-Text Graphics', color: 'text-amber-400', badge: 'Caution Lc 45+' };
    return { label: 'Sub-Optimal Contrast / Invisible in Sunlight', color: 'text-rose-400', badge: 'Fail < 45' };
  }, [apcaLc]);

  // CSS Filter string for vision simulation
  const getSimFilter = () => {
    switch (visionFilter) {
      case 'achromatopsia':
        return 'grayscale(100%)';
      case 'protanopia':
        // Standard protanopia color matrix simulation
        return 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'p\'><feColorMatrix type=\'matrix\' values=\'0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0\'/></filter></svg>#p")';
      case 'deuteranopia':
        return 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'d\'><feColorMatrix type=\'matrix\' values=\'0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0\'/></filter></svg>#d")';
      case 'glare':
        return 'brightness(1.2) contrast(0.75)';
      default:
        return 'none';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      
      {/* Backdrop Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Apple Liquid Glass Panel */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0c0d14]/95 border border-white/[0.12] shadow-[0_25px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.18)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Subtle Ambient Top Radial */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${fgHex} 0%, transparent 70%)` }}
        />

        {/* ===================================================================== */}
        {/* MODAL HEADER (APPLE VISION OS NAVIGATION)                             */}
        {/* ===================================================================== */}
        <div className="relative px-6 py-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Zap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#86868b] uppercase">
                  LUNAR FORGE // DEVTOOLS
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FREE UTILITY
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
                OLED & Spatial Contrast Laboratory
              </h1>
            </div>
          </div>

          {/* Segmented Control Pill (Apple Style) */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-black/60 border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'auditor' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Live Auditor</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'matrix' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Palette Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'export' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Export Tokens</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#86868b] hover:text-white transition-all cursor-pointer border border-white/10"
            title="Close Laboratory"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden px-4 py-2 border-b border-white/[0.08] bg-black/40 gap-1.5 overflow-x-auto">
          {['auditor', 'matrix', 'export'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${
                activeTab === tab ? 'bg-white text-black' : 'text-[#86868b] bg-white/[0.04]'
              }`}
            >
              {tab === 'auditor' ? 'Auditor' : tab === 'matrix' ? 'Palette' : 'Export'}
            </button>
          ))}
        </div>

        {/* ===================================================================== */}
        {/* MODAL BODY (SCROLLABLE WORKSPACE)                                     */}
        {/* ===================================================================== */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">

          {/* ------------------------------------------------------------------- */}
          {/* TAB 1: LIVE AUDITOR & INTERACTIVE PREVIEW                           */}
          {/* ------------------------------------------------------------------- */}
          {activeTab === 'auditor' && (
            <div className="space-y-6">

              {/* Fast Presets Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-mono uppercase text-[#86868b] shrink-0 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Presets:
                </span>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFgHex(p.fg);
                      setBgHex(p.bg);
                    }}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                      fgHex.toUpperCase() === p.fg.toUpperCase() && bgHex.toUpperCase() === p.bg.toUpperCase()
                        ? 'border-white text-white bg-white/[0.12] shadow-sm'
                        : 'border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center -space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: p.bg }} />
                      <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: p.fg }} />
                    </div>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>

              {/* Top Controls Grid: Dual Color Inputs + Ratio Scoreboard */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* Left: Interactive Color Pickers (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Foreground Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">
                        Text / Foreground Color
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Lum: {(fgLum * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Color Preview & Native Picker */}
                      <label className="relative w-11 h-11 rounded-xl border border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-inner group">
                        <input
                          type="color"
                          value={fgHex}
                          onChange={(e) => setFgHex(e.target.value.toUpperCase())}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div 
                          className="w-full h-full group-hover:scale-105 transition-transform" 
                          style={{ backgroundColor: fgHex }} 
                        />
                      </label>

                      {/* Hex Text Input */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={fgHex}
                          maxLength={7}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (!val.startsWith('#') && val.length > 0) val = '#' + val;
                            setFgHex(val.toUpperCase());
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                          placeholder="#FFFFFF"
                        />
                      </div>

                      {/* Copy Hex */}
                      <button
                        onClick={() => handleCopy(fgHex, 'fg')}
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                        title="Copy Foreground Hex"
                      >
                        {copiedKey === 'fg' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Swap & Auto-Optimize Action Bar */}
                  <div className="flex items-center justify-between px-1">
                    <button
                      onClick={handleSwap}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
                      <span>Invert / Swap Colors</span>
                    </button>

                    <button
                      onClick={handleAutoOptimizeAAA}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 hover:from-sky-500/30 hover:to-purple-500/30 border border-sky-400/30 text-sky-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Adjust foreground luminance to hit WCAG AAA (7.0:1)"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Smart AAA Fix</span>
                    </button>
                  </div>

                  {/* Background Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">
                        Surface / Background Color
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Lum: {(bgLum * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Color Preview & Native Picker */}
                      <label className="relative w-11 h-11 rounded-xl border border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-inner group">
                        <input
                          type="color"
                          value={bgHex}
                          onChange={(e) => setBgHex(e.target.value.toUpperCase())}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div 
                          className="w-full h-full group-hover:scale-105 transition-transform" 
                          style={{ backgroundColor: bgHex }} 
                        />
                      </label>

                      {/* Hex Text Input */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={bgHex}
                          maxLength={7}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (!val.startsWith('#') && val.length > 0) val = '#' + val;
                            setBgHex(val.toUpperCase());
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                          placeholder="#000000"
                        />
                      </div>

                      {/* Copy Hex */}
                      <button
                        onClick={() => handleCopy(bgHex, 'bg')}
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                        title="Copy Background Hex"
                      >
                        {copiedKey === 'bg' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right: Real-Time Scorecard & Standards Compliance (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5">
                  
                  {/* Hero Contrast Ratio Metric */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-white/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#86868b]">
                        WCAG 2.1 Contrast Ratio
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
                          passesAAA ? 'text-emerald-400' : passesAA ? 'text-sky-400' : 'text-rose-400'
                        }`}>
                          {contrastRatio.toFixed(2)}:1
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {passesAAA ? 'AAA High Standard' : passesAA ? 'AA Compliant' : 'Insufficient Contrast'}
                        </span>
                      </div>
                    </div>

                    {/* APCA Perceptual Metric */}
                    <div className="sm:text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#86868b]">
                        APCA Perceptual Lc
                      </span>
                      <div className="flex sm:justify-end items-baseline gap-2 mt-1">
                        <span className={`text-2xl sm:text-3xl font-black font-mono ${apcaLevel.color}`}>
                          Lc {Math.abs(apcaLc)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {apcaLevel.badge}
                      </span>
                    </div>
                  </div>

                  {/* Standards Breakdown Badges */}
                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* Normal Text (AA) */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#86868b] uppercase">Body (AA)</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">≥ 4.5:1</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          passesAA 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {passesAA ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Text (AAA) */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#86868b] uppercase">OLED (AAA)</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">≥ 7.0:1</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          passesAAA 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {passesAAA ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>

                    {/* Large / Display (AA Large) */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#86868b] uppercase">Large Title</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">≥ 3.0:1</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          passesAALarge 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {passesAALarge ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* APCA Contextual Verdict */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 shrink-0 ${passesAAA ? 'text-emerald-400' : 'text-sky-400'}`} />
                    <p className="text-xs text-slate-300 font-body leading-relaxed">
                      <strong className="text-white">Recommendation:</strong> {apcaLevel.label}. {
                        bgHex === '#000000' 
                          ? 'OLED sub-pixels remain completely powered down (0.0 W).' 
                          : 'Spatial backdrop maintains soft ambient luminous depth.'
                      }
                    </p>
                  </div>

                </div>

              </div>

              {/* --------------------------------------------------------------- */}
              {/* INTERACTIVE UI COMPONENT PREVIEW CANVAS                         */}
              {/* --------------------------------------------------------------- */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white">
                      Live Component Sandbox
                    </span>
                    <span className="text-[10px] font-mono text-[#86868b]">
                      (Rendered in your selected colors)
                    </span>
                  </div>

                  {/* Vision Simulator Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-[10px] font-mono text-[#86868b] uppercase mr-1">Vision:</span>
                    {[
                      { id: 'normal', label: 'Standard' },
                      { id: 'achromatopsia', label: 'Monochrome' },
                      { id: 'protanopia', label: 'Protanopia' },
                      { id: 'glare', label: 'OLED Glare' }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setVisionFilter(f.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                          visionFilter === f.id
                            ? 'bg-white text-black font-semibold'
                            : 'bg-white/[0.05] text-slate-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* The Live Rendered Card Container */}
                <div 
                  className="w-full rounded-2xl p-6 sm:p-8 transition-all duration-150 border border-white/[0.1] shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundColor: bgHex,
                    color: fgHex,
                    filter: getSimFilter()
                  }}
                >
                  <div className="max-w-2xl space-y-4">
                    
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border"
                      style={{ 
                        borderColor: `${fgHex}33`, 
                        backgroundColor: `${fgHex}15` 
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fgHex }} />
                      <span>SPATIAL INTERFACE COMPONENT</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
                      Autonomous Design & Contrast Geometry
                    </h3>

                    {/* Body Paragraph */}
                    <p className="text-sm sm:text-base leading-relaxed opacity-90 font-body">
                      The quick brown fox jumps over the lazy dog. At high resolutions on OLED and micro-LED displays, relative luminance determines biological eye fatigue and reading comprehension.
                    </p>

                    {/* Metadata Sub-text */}
                    <p className="text-xs font-mono opacity-60">
                      Sample caption: 11px Inter • Latency: 4.2ms • APCA Perceptual Metric: Lc {Math.abs(apcaLc)}
                    </p>

                    {/* Interactive Buttons Showcase */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {/* Primary Button */}
                      <button
                        className="px-5 py-2.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all shadow-md cursor-pointer hover:opacity-90"
                        style={{
                          backgroundColor: fgHex,
                          color: bgHex
                        }}
                      >
                        PRIMARY ACTION CTA
                      </button>

                      {/* Secondary Outline Button */}
                      <button
                        className="px-5 py-2.5 rounded-full font-heading font-medium text-xs tracking-wider transition-all border cursor-pointer hover:bg-white/[0.05]"
                        style={{
                          borderColor: `${fgHex}44`,
                          color: fgHex
                        }}
                      >
                        SECONDARY OUTLINE
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* TAB 2: CURATED PALETTE MATRIX                                       */}
          {/* ------------------------------------------------------------------- */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Production Dark Mode Pairings</h3>
                  <p className="text-xs text-slate-400">Click any pairing to load into the active auditor.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRESETS.map((p, idx) => {
                  const pFgRgb = parseHex(p.fg);
                  const pBgRgb = parseHex(p.bg);
                  const pRatio = calculateWCAGContrast(getRelativeLuminance(pFgRgb), getRelativeLuminance(pBgRgb));
                  const pLc = calculateAPCALc(pFgRgb, pBgRgb);

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setFgHex(p.fg);
                        setBgHex(p.bg);
                        setActiveTab('auditor');
                      }}
                      className="p-5 rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group flex flex-col justify-between"
                      style={{ backgroundColor: p.bg }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20" style={{ color: p.fg }}>
                            {p.badge}
                          </span>
                          <span className="text-xs font-mono font-bold" style={{ color: p.fg }}>
                            {pRatio.toFixed(1)}:1
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold tracking-tight" style={{ color: p.fg }}>
                            {p.name}
                          </h4>
                          <p className="text-xs mt-1 opacity-70 line-clamp-2" style={{ color: p.fg }}>
                            {p.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono" style={{ color: p.fg }}>
                        <span>FG: {p.fg}</span>
                        <span>BG: {p.bg}</span>
                        <span className="opacity-80">Lc {Math.abs(pLc)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* TAB 3: TOKEN & CODE EXPORTER (GOOGLE DEVELOPER UTILITY)              */}
          {/* ------------------------------------------------------------------- */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Instant Design Tokens & CSS Code</h3>
                  <p className="text-xs text-slate-400">Zero-dependency copy-paste into Tailwind, Vanilla CSS, or W3C Design Tokens.</p>
                </div>
              </div>

              {/* Tailwind CSS Classes */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#86868b] uppercase">Tailwind CSS Classes</span>
                  <button
                    onClick={() => handleCopy(`bg-[${bgHex}] text-[${fgHex}] border-[${fgHex}]/15`, 't-classes')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedKey === 't-classes' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 't-classes' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 text-xs font-mono text-sky-300 overflow-x-auto">
                  {`bg-[${bgHex}] text-[${fgHex}] border-[${fgHex}]/15`}
                </pre>
              </div>

              {/* CSS Variables */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#86868b] uppercase">CSS Custom Properties (:root)</span>
                  <button
                    onClick={() => handleCopy(`:root {\n  --surface-bg: ${bgHex};\n  --text-primary: ${fgHex};\n  --border-subtle: ${fgHex}26;\n  --contrast-ratio: ${contrastRatio.toFixed(2)};\n}`, 'css-vars')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedKey === 'css-vars' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'css-vars' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 text-xs font-mono text-emerald-300 overflow-x-auto">
{`:root {
  --surface-bg: ${bgHex};
  --text-primary: ${fgHex};
  --border-subtle: ${fgHex}26;
  --contrast-ratio: ${contrastRatio.toFixed(2)};
}`}
                </pre>
              </div>

              {/* W3C Design Tokens JSON */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#86868b] uppercase">W3C Design Tokens (Figma / Tokens Studio)</span>
                  <button
                    onClick={() => handleCopy(JSON.stringify({
                      color: {
                        surface: { value: bgHex, type: "color" },
                        foreground: { value: fgHex, type: "color" }
                      },
                      accessibility: {
                        contrastRatio: `${contrastRatio.toFixed(2)}:1`,
                        wcagAAA: passesAAA,
                        apcaLc: apcaLc
                      }
                    }, null, 2), 'json-tokens')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedKey === 'json-tokens' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'json-tokens' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 text-xs font-mono text-purple-300 overflow-x-auto">
{JSON.stringify({
  color: {
    surface: { value: bgHex, type: "color" },
    foreground: { value: fgHex, type: "color" }
  },
  accessibility: {
    contrastRatio: `${contrastRatio.toFixed(2)}:1`,
    wcagAAA: passesAAA,
    apcaLc: apcaLc
  }
}, null, 2)}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* ===================================================================== */}
        {/* MODAL FOOTER (METRICS STRIP & SUBDOMAIN BADGE)                        */}
        {/* ===================================================================== */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#86868b]">
          <div className="flex items-center gap-3">
            <span>forge.lunarparadox.com</span>
            <span>•</span>
            <span className="text-slate-400">0ms Client-Side Math (Zero Compute)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-slate-200 font-semibold text-xs transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
