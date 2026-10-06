import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Terminal, Cpu, Wrench, Shield, Sparkles, Check, Copy, 
  ArrowRight, RefreshCw, Send, CheckCircle2,
  Volume2, VolumeX, Code2, Palette, Type, Sliders, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

// ============================================================================
// COLOR THEORY & MATHEMATICAL HARMONY ENGINE
// ============================================================================

// Hex to RGB
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  return [
    parseInt(clean.slice(0, 2), 16) || 0,
    parseInt(clean.slice(2, 4), 16) || 0,
    parseInt(clean.slice(4, 6), 16) || 0,
  ];
}

// RGB to Hex
function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map(x => clamp(x).toString(16).padStart(2, '0')).join('');
}

// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// HSL to Hex
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}

// Relative Luminance & WCAG Contrast
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrastRatio(hex1, hex2) {
  try {
    const [r1, g1, b1] = hexToRgb(hex1);
    const [r2, g2, b2] = hexToRgb(hex2);
    const l1 = getLuminance(r1, g1, b1);
    const l2 = getLuminance(r2, g2, b2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  } catch (e) {
    return '1.00';
  }
}

// Generates Harmonic Color Theory Sets (Complementary, Analogous, Triadic, Monochromatic)
function generateColorHarmonies(baseHex) {
  const [r, g, b] = hexToRgb(baseHex);
  const [h, s, l] = rgbToHsl(r, g, b);

  return {
    base: baseHex,
    complementary: hslToHex(h + 180, s, l),
    analogousLeft: hslToHex(h - 30, s, l),
    analogousRight: hslToHex(h + 30, s, l),
    triadic1: hslToHex(h + 120, s, l),
    triadic2: hslToHex(h + 240, s, l),
    monochrome: [
      hslToHex(h, Math.max(10, s * 0.7), 92),
      hslToHex(h, s, 70),
      hslToHex(h, s, 50),
      hslToHex(h, s, 30),
      hslToHex(h, Math.min(100, s * 1.2), 12),
    ]
  };
}

// SVG Clean & Minify String
function optimizeSvgString(raw) {
  if (!raw || !raw.trim()) return '';
  let svg = raw;
  svg = svg.replace(/<\?xml[\s\S]*?\?>/gi, '');
  svg = svg.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');
  svg = svg.replace(/xmlns:sketch="[^"]*"/gi, '');
  svg = svg.replace(/xmlns:inkscape="[^"]*"/gi, '');
  svg = svg.replace(/xmlns:sodipodi="[^"]*"/gi, '');
  svg = svg.replace(/xmlns:i="[^"]*"/gi, '');
  svg = svg.replace(/sodipodi:[a-z0-9-]+="[^"]*"/gi, '');
  svg = svg.replace(/inkscape:[a-z0-9-]+="[^"]*"/gi, '');
  svg = svg.replace(/sketch:[a-z0-9-]+="[^"]*"/gi, '');
  svg = svg.replace(/\s+(id|class)=""/gi, '');
  svg = svg.replace(/>\s+</g, '><');
  svg = svg.replace(/\s{2,}/g, ' ');
  return svg.trim();
}

function svgToJsx(svg) {
  if (!svg) return '';
  return svg
    .replace(/class=/g, 'className=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=');
}

// ============================================================================
// APPLE PRO COMMAND DECK OS (HIG 2026 DESIGN SYSTEM)
// ============================================================================

export default function CommandDeckOS({ isOpen, onClose, initialSector = 'studio' }) {
  const [activeSector, setActiveSector] = useState(initialSector);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [latency, setLatency] = useState(21);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(17 + Math.floor(Math.random() * 6));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation: 1-4, ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '1' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        changeSector('studio', 0);
      } else if (e.key === '2' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        changeSector('forge', 1);
      } else if (e.key === '3' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        changeSector('labs', 2);
      } else if (e.key === '4' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        changeSector('vault', 3);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const changeSector = (sector, idx) => {
    setActiveSector(sector);
    if (soundEnabled) audioManager.playSectorShift(idx);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-3xl animate-fade-in select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[94vh] max-h-[920px] rounded-3xl bg-[#0c0c10]/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] flex flex-col overflow-hidden text-[#f5f5f7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================================= */}
        {/* APPLE PRO TOP WINDOW BAR                                          */}
        {/* ================================================================= */}
        <header className="flex-shrink-0 px-4 sm:px-6 py-3 border-b border-white/[0.07] bg-[#121216]/60 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Window Dots & Monolith Brand */}
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-white/[0.08]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 cursor-pointer hover:opacity-100 transition-opacity" onClick={onClose} />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-xs tracking-wider text-white">
                LUNAR PARADOX
              </span>
              <span className="text-[10px] font-mono text-[#86868b]">
                OS 2.6
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/[0.08] text-[10px] font-mono text-[#86868b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span>{latency}ms EDGE</span>
            </div>
          </div>

          {/* Center: Apple Segmented Pill Dock */}
          <nav className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {[
              { id: 'studio', label: 'Studio', key: '1' },
              { id: 'forge', label: 'Forge', key: '2' },
              { id: 'labs', label: 'Labs', key: '3' },
              { id: 'vault', label: 'Vault', key: '4' },
            ].map((tab, idx) => {
              const isActive = activeSector === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => changeSector(tab.id, idx)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-heading font-medium tracking-normal transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-white text-black shadow-sm font-semibold' 
                      : 'text-[#86868b] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`hidden md:inline-block text-[9px] px-1 rounded ${isActive ? 'bg-black/10 text-black' : 'text-[#6e6e73]'}`}>
                    {tab.key}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right: Sound Toggle + ESC Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) audioManager.playTick();
              }}
              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors border border-white/[0.08] cursor-pointer"
              title={soundEnabled ? 'Acoustics Active' : 'Acoustics Muted'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors border border-white/[0.08] cursor-pointer text-[10px] font-mono"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
              <span className="hidden sm:inline">esc</span>
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* MAIN WORKSTATION VIEWPORT                                         */}
        {/* ================================================================= */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
          {activeSector === 'studio' && <SectorStudio soundEnabled={soundEnabled} />}
          {activeSector === 'forge' && <SectorForge soundEnabled={soundEnabled} />}
          {activeSector === 'labs' && <SectorLabs soundEnabled={soundEnabled} />}
          {activeSector === 'vault' && <SectorVault soundEnabled={soundEnabled} onOpenStudio={() => changeSector('studio', 0)} />}
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// SECTOR 01: LUNAR STUDIO (APPLE PRO HARDWARE CONFIGURATOR & INTAKE)
// ============================================================================

function SectorStudio({ soundEnabled }) {
  const [selectedScopes, setSelectedScopes] = useState([
    '3d_spatial',
    'fullstack_app'
  ]);
  const [velocity, setVelocity] = useState('flagship');
  const [clientForm, setClientForm] = useState({
    name: '',
    contact: '',
    overview: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('LPX-CLNT-9821');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const scopeOptions = [
    { id: '3d_spatial', title: '3D WebGL & Spatial Experience', basePrice: 12000, desc: 'Real-time shaders, liquid chrome optics, 120 FPS performance' },
    { id: 'fullstack_app', title: 'High-Performance Web Platform', basePrice: 9500, desc: 'React 19, TypeScript, Edge API microservices, sub-50ms latency' },
    { id: 'design_system', title: 'Avant-Garde Design System', basePrice: 6500, desc: 'Design tokens, dark titanium materials, fluid typography scales' },
    { id: 'edge_infra', title: 'Sub-50ms Global Infrastructure', basePrice: 4500, desc: 'Cloudflare Workers, zero cold-start edge databases, global CDN' },
    { id: 'ai_interactive', title: 'Generative AI & Audio Synthesis', basePrice: 8000, desc: 'Client-side procedural audio, real-time generative interfaces' },
  ];

  const velocityTiers = [
    { id: 'sprint', label: '2-Week Sprint', multiplier: 1.25, time: '10–14 Days', desc: 'Accelerated delivery' },
    { id: 'flagship', label: 'Flagship Build', multiplier: 1.0, time: '4–6 Weeks', desc: 'Custom craftsmanship' },
    { id: 'retainer', label: 'Quarterly Retainer', multiplier: 0.85, time: 'Continuous', desc: 'Dedicated engineering' },
  ];

  const calculatedEstimate = useMemo(() => {
    let base = 5000;
    selectedScopes.forEach(s => {
      const match = scopeOptions.find(o => o.id === s);
      if (match) base += match.basePrice;
    });
    const mult = velocityTiers.find(v => v.id === velocity)?.multiplier || 1.0;
    const finalPrice = Math.round(base * mult);
    return {
      min: (finalPrice * 0.9).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      max: (finalPrice * 1.15).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      time: velocityTiers.find(v => v.id === velocity)?.time || '4–6 Weeks'
    };
  }, [selectedScopes, velocity]);

  const toggleScope = (id) => {
    if (soundEnabled) audioManager.playTick();
    setSelectedScopes(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(item => item !== id) : prev)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientForm.contact.trim()) return;
    setIsSubmitting(true);
    if (soundEnabled) audioManager.playSuccess();

    try {
      const payload = {
        name: clientForm.name,
        contact: clientForm.contact,
        overview: clientForm.overview,
        scopes: selectedScopes,
        velocity,
        estimateRange: `${calculatedEstimate.min} - ${calculatedEstimate.max}`,
      };
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch(err) {
      console.log('Lead queued:', err);
    } finally {
      const randTicket = `LPX-PRO-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(randTicket);
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Apple Pro Section Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1">
          LUNAR STUDIO // BESPOKE DIGITAL COMMISSION
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight">
          Bespoke Creative Engineering
        </h2>
        <p className="text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed">
          We design and build category-defining spatial web flagships, 3D applications, and edge platforms for founders and brands that value technical excellence.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/[0.1] text-center space-y-4 max-w-lg mx-auto shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-white text-black mx-auto flex items-center justify-center">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-white">Project Brief Transmitted</h3>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Your project parameters have been received. Our founding design partners will follow up with you directly within 12 hours.
          </p>
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <span className="text-[#86868b]">TRACKING PASSCODE:</span>
            <span className="text-white font-semibold">{ticketId}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(ticketId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-[#86868b] hover:text-white ml-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[#86868b] hover:text-white hover:underline pt-2 cursor-pointer transition-colors"
          >
            Configure another scope
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Apple Grouped Inset Selectors */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider block mb-3">
                1. Project Capabilities
              </label>
              <div className="space-y-2">
                {scopeOptions.map((opt) => {
                  const isChecked = selectedScopes.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleScope(opt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-white/[0.08] border-white/[0.2] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]' 
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isChecked ? 'bg-white text-black' : 'border border-white/25'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-heading font-medium text-white">{opt.title}</div>
                          <div className="text-[11px] text-[#86868b] mt-0.5">{opt.desc}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#86868b] whitespace-nowrap">
                        +${(opt.basePrice / 1000).toFixed(1)}k
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Velocity Picker */}
            <div>
              <label className="text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider block mb-3">
                2. Timeline Velocity
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {velocityTiers.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setVelocity(t.id);
                      if (soundEnabled) audioManager.playTick();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      velocity === t.id 
                        ? 'bg-white/[0.08] border-white/[0.22] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-[#86868b] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="text-xs font-heading font-semibold text-white">{t.label}</div>
                    <div className="text-[10px] text-[#86868b] font-mono mt-0.5">{t.time}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Dynamic Summary Card & Transmission */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
                <span>ESTIMATED INVESTMENT</span>
                <span className="text-[#30d158] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                  REAL-TIME
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight">
                {calculatedEstimate.min} <span className="text-lg font-normal text-[#6e6e73]">–</span> {calculatedEstimate.max}
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/[0.08] text-[#86868b]">
                <span>ESTIMATED DURATION:</span>
                <span className="text-white font-medium">{calculatedEstimate.time}</span>
              </div>
            </div>

            {/* Direct Intake Form */}
            <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
              <div className="text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider">
                Direct Client Transmission
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your Name / Organization"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Contact (Email, Discord, or Telegram) *"
                  value={clientForm.contact}
                  onChange={(e) => setClientForm({ ...clientForm, contact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  placeholder="Tell us about the project goals..."
                  value={clientForm.overview}
                  onChange={(e) => setClientForm({ ...clientForm, overview: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full apple-action-btn text-xs font-heading font-semibold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    <span>Transmit Project Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SECTOR 02: LUNAR FORGE (APPLE DEVELOPER UTILITIES & LEGIT COLOR THEORY)
// ============================================================================

function SectorForge({ soundEnabled }) {
  const [activeTool, setActiveTool] = useState('chroma'); // 'chroma' | 'svg' | 'clamp'

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="border-b border-white/[0.08] pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1">
            LUNAR FORGE // DEVELOPER LABORATORY
          </span>
          <h2 className="text-3xl font-heading font-semibold text-white tracking-tight">
            Developer & Design Instruments
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-1">
            Pure client-side utilities. Zero tracking. Computed instantaneously on hardware.
          </p>
        </div>

        {/* Apple Segmented Tool Switcher */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          {[
            { id: 'chroma', label: 'Color Theory & WCAG', icon: Palette },
            { id: 'svg', label: 'SVG Minifier', icon: Code2 },
            { id: 'clamp', label: 'Fluid Clamp()', icon: Type },
          ].map((tool) => {
            const Icon = tool.icon;
            const isCurrent = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  if (soundEnabled) audioManager.playTick();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-white text-black font-semibold shadow-sm' 
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTool === 'chroma' && <AppleColorTheoryTool soundEnabled={soundEnabled} />}
      {activeTool === 'svg' && <AppleSvgOptimizerTool soundEnabled={soundEnabled} />}
      {activeTool === 'clamp' && <AppleFluidClampTool soundEnabled={soundEnabled} />}
    </div>
  );
}

// TOOL 1: APPLE COLOR THEORY & HARMONY ENGINE (LEGIT COLOR THEORY)
function AppleColorTheoryTool({ soundEnabled }) {
  const [baseHex, setBaseHex] = useState('#0071e3'); // Apple System Blue as default
  const [bgDarkHex, setBgDarkHex] = useState('#000000');
  const [copiedType, setCopiedType] = useState(null);

  // Computed Color Harmonies
  const harmonies = useMemo(() => generateColorHarmonies(baseHex), [baseHex]);
  const contrastRatio = useMemo(() => calculateContrastRatio(baseHex, bgDarkHex), [baseHex, bgDarkHex]);
  
  const isAAA = parseFloat(contrastRatio) >= 7.0;
  const isAANormal = parseFloat(contrastRatio) >= 4.5;
  const isAALarge = parseFloat(contrastRatio) >= 3.0;

  // Apple System Palette for reference
  const applePalette = [
    { name: 'System Blue', hex: '#0071e3' },
    { name: 'Indigo', hex: '#5e5ce6' },
    { name: 'Purple', hex: '#bf5af2' },
    { name: 'Pink', hex: '#ff375f' },
    { name: 'Orange', hex: '#ff9f0a' },
    { name: 'Mint', hex: '#63e6e2' },
    { name: 'Green', hex: '#30d158' },
    { name: 'Starlight Silver', hex: '#e5e5ea' },
  ];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (soundEnabled) audioManager.playSuccess();
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upper Grid: Inputs + WCAG Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Color Parameters */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
          <div className="text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider">
            Chromatic Input & Luminance
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs text-[#86868b] block mb-1.5">Dominant Subject Hex</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={baseHex}
                  onChange={(e) => setBaseHex(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={baseHex}
                  onChange={(e) => setBaseHex(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#86868b] block mb-1.5">Background Canvas Hex</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={bgDarkHex}
                  onChange={(e) => setBgDarkHex(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={bgDarkHex}
                  onChange={(e) => setBgDarkHex(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>

          {/* Apple Color Preset Palette */}
          <div className="pt-3 border-t border-white/[0.08]">
            <span className="text-[10px] font-mono text-[#86868b] block mb-2">APPLE SYSTEM HUES:</span>
            <div className="flex flex-wrap gap-2">
              {applePalette.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setBaseHex(p.hex);
                    if (soundEnabled) audioManager.playTick();
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-xs text-[#f5f5f7] border border-white/[0.06] cursor-pointer transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                  <span className="text-[11px]">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time WCAG & APCA Scorecard */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
              <span>WCAG CONTRAST COMPLIANCE</span>
              <span className="font-semibold text-white">{contrastRatio} : 1</span>
            </div>
            <div className="text-4xl sm:text-5xl font-heading font-semibold text-white tracking-tight mt-1">
              {contrastRatio}:1
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className={`p-2.5 rounded-2xl text-center border ${
                isAAA ? 'bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]' : 'bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]'
              }`}>
                <div className="text-[10px] font-mono font-bold">AAA</div>
                <div className="text-[9px] mt-0.5">{isAAA ? 'PASS (7.0+)' : 'FAIL'}</div>
              </div>
              <div className={`p-2.5 rounded-2xl text-center border ${
                isAANormal ? 'bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]' : 'bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]'
              }`}>
                <div className="text-[10px] font-mono font-bold">AA NORMAL</div>
                <div className="text-[9px] mt-0.5">{isAANormal ? 'PASS (4.5+)' : 'FAIL'}</div>
              </div>
              <div className={`p-2.5 rounded-2xl text-center border ${
                isAALarge ? 'bg-[#30d158]/10 border-[#30d158]/30 text-[#30d158]' : 'bg-[#ff453a]/10 border-[#ff453a]/30 text-[#ff453a]'
              }`}>
                <div className="text-[10px] font-mono font-bold">AA LARGE</div>
                <div className="text-[9px] mt-0.5">{isAALarge ? 'PASS (3.0+)' : 'FAIL'}</div>
              </div>
            </div>
          </div>

          {/* Real Optical Preview Pill */}
          <div 
            className="p-4 rounded-2xl border border-white/[0.08]"
            style={{ backgroundColor: bgDarkHex, color: baseHex }}
          >
            <div className="text-sm font-heading font-semibold">Human Interface Typography Sample</div>
            <div className="text-xs opacity-80 mt-0.5">
              Testing perceived contrast and optical sharpness against pure canvas black.
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Color Theory Harmonies (Itten / Munsell Principles) */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-heading font-medium text-white">
              Derived Chromatic Harmonies (Color Wheel Equations)
            </div>
            <div className="text-[11px] text-[#86868b]">
              Calculated using mathematical hue rotations across 360° HSL chromatic space.
            </div>
          </div>
          <button
            onClick={() => handleCopy(`:root {\n  --color-base: ${harmonies.base};\n  --color-complement: ${harmonies.complementary};\n  --color-analog-1: ${harmonies.analogousLeft};\n  --color-analog-2: ${harmonies.analogousRight};\n  --color-triad-1: ${harmonies.triadic1};\n  --color-triad-2: ${harmonies.triadic2};\n}`, 'css')}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white border border-white/[0.08] cursor-pointer flex items-center gap-1.5"
          >
            {copiedType === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>COPY HARMONY TOKENS</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Complementary */}
          <div 
            onClick={() => { setBaseHex(harmonies.complementary); if (soundEnabled) audioManager.playTick(); }}
            className="p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: harmonies.complementary }} />
              <span className="text-[10px] font-mono text-[#86868b]">180° COMPLEMENT</span>
            </div>
            <div className="text-xs font-mono font-medium text-white">{harmonies.complementary}</div>
          </div>

          {/* Analogous Left */}
          <div 
            onClick={() => { setBaseHex(harmonies.analogousLeft); if (soundEnabled) audioManager.playTick(); }}
            className="p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: harmonies.analogousLeft }} />
              <span className="text-[10px] font-mono text-[#86868b]">-30° ANALOGOUS</span>
            </div>
            <div className="text-xs font-mono font-medium text-white">{harmonies.analogousLeft}</div>
          </div>

          {/* Analogous Right */}
          <div 
            onClick={() => { setBaseHex(harmonies.analogousRight); if (soundEnabled) audioManager.playTick(); }}
            className="p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: harmonies.analogousRight }} />
              <span className="text-[10px] font-mono text-[#86868b]">+30° ANALOGOUS</span>
            </div>
            <div className="text-xs font-mono font-medium text-white">{harmonies.analogousRight}</div>
          </div>

          {/* Triadic */}
          <div 
            onClick={() => { setBaseHex(harmonies.triadic1); if (soundEnabled) audioManager.playTick(); }}
            className="p-3.5 rounded-2xl border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all bg-black/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: harmonies.triadic1 }} />
              <span className="text-[10px] font-mono text-[#86868b]">120° TRIADIC</span>
            </div>
            <div className="text-xs font-mono font-medium text-white">{harmonies.triadic1}</div>
          </div>
        </div>

        {/* Monochromatic Luma Ramp */}
        <div className="pt-2">
          <div className="text-[10px] font-mono text-[#86868b] mb-1.5">5-STOP MONOCHROMATIC LUMA SCALE:</div>
          <div className="grid grid-cols-5 h-8 rounded-xl overflow-hidden border border-white/[0.08]">
            {harmonies.monochrome.map((hex, i) => (
              <div 
                key={i} 
                style={{ backgroundColor: hex }} 
                className="cursor-pointer flex items-center justify-center group"
                onClick={() => { setBaseHex(hex); if (soundEnabled) audioManager.playTick(); }}
                title={`Select ${hex}`}
              >
                <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-black font-bold">
                  {hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TOOL 2: APPLE SVG OPTIMIZER
function AppleSvgOptimizerTool({ soundEnabled }) {
  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" viewBox="0 0 100 100" class="hero-logo" id="lunar-icon">
  <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
  <title>Lunar Eclipse Badge</title>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#86868b" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad1)" stroke="#ffffff" stroke-width="1.5" />
  <path d="M 50 15 A 35 35 0 0 0 50 85 A 25 25 0 0 1 50 15 Z" fill="#0c0c10" opacity="0.85" />
</svg>`;

  const [inputSvg, setInputSvg] = useState(sampleSvg);
  const [copiedType, setCopiedType] = useState(null);

  const optimizedSvg = useMemo(() => optimizeSvgString(inputSvg), [inputSvg]);
  const reactJsx = useMemo(() => svgToJsx(optimizedSvg), [optimizedSvg]);

  const originalSize = new Blob([inputSvg]).size;
  const newSize = new Blob([optimizedSvg]).size;
  const savings = originalSize > 0 ? Math.round(((originalSize - newSize) / originalSize) * 100) : 0;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (soundEnabled) audioManager.playSuccess();
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Telemetry Bar */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-[#86868b]">INPUT: <strong className="text-white">{originalSize} B</strong></span>
          <span className="text-[#86868b]">OPTIMIZED: <strong className="text-white">{newSize} B</strong></span>
          <span className="text-[#30d158] font-semibold">REDUCTION: {savings > 0 ? `-${savings}%` : '0%'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(optimizedSvg, 'svg')}
            className="px-3.5 py-1.5 rounded-full bg-white text-black font-heading font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:bg-[#e5e5ea]"
          >
            {copiedType === 'svg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Clean SVG</span>
          </button>
          <button
            onClick={() => handleCopy(reactJsx, 'jsx')}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-heading font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-white/[0.08]"
          >
            {copiedType === 'jsx' ? <Check className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            <span>Copy React JSX</span>
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b]">
            <span>RAW SVG INPUT</span>
            <button 
              onClick={() => setInputSvg(sampleSvg)}
              className="text-white hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
          <textarea
            value={inputSvg}
            onChange={(e) => setInputSvg(e.target.value)}
            className="w-full h-64 p-3.5 rounded-2xl bg-[#08080c] border border-white/[0.08] text-xs font-mono text-[#f5f5f7] focus:outline-none focus:border-white/30 resize-none custom-scrollbar"
            placeholder="Paste raw SVG code..."
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b]">
            <span>OUTPUT PREVIEW</span>
            <span className="text-[#30d158]">CLIENT RUNTIME</span>
          </div>
          <div className="h-64 rounded-2xl bg-[#08080c] border border-white/[0.08] flex flex-col overflow-hidden">
            <div className="h-28 bg-[#101014] border-b border-white/[0.08] flex items-center justify-center p-3">
              {optimizedSvg ? (
                <div 
                  className="w-20 h-20 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: optimizedSvg }}
                />
              ) : (
                <span className="text-xs text-[#6e6e73] font-mono">No valid SVG</span>
              )}
            </div>
            <textarea
              readOnly
              value={optimizedSvg}
              className="flex-1 p-3.5 bg-transparent text-xs font-mono text-[#86868b] focus:outline-none resize-none custom-scrollbar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// TOOL 3: APPLE FLUID CLAMP CALCULATOR
function AppleFluidClampTool({ soundEnabled }) {
  const [minWidth, setMinWidth] = useState(390);
  const [maxWidth, setMaxWidth] = useState(1440);
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(48);
  const [simulatedWidth, setSimulatedWidth] = useState(800);
  const [copied, setCopied] = useState(false);

  const clampFormula = useMemo(() => {
    const slope = (maxSize - minSize) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minSize;
    const preferredVw = (slope * 100).toFixed(2);
    const preferredRem = (yAxisIntersection / 16).toFixed(3);
    const minRem = (minSize / 16).toFixed(3);
    const maxRem = (maxSize / 16).toFixed(3);

    return `clamp(${minRem}rem, ${preferredRem}rem + ${preferredVw}vw, ${maxRem}rem)`;
  }, [minWidth, maxWidth, minSize, maxSize]);

  const currentCalculatedPx = useMemo(() => {
    if (simulatedWidth <= minWidth) return minSize;
    if (simulatedWidth >= maxWidth) return maxSize;
    const progress = (simulatedWidth - minWidth) / (maxWidth - minWidth);
    return Math.round(minSize + progress * (maxSize - minSize));
  }, [minWidth, maxWidth, minSize, maxSize, simulatedWidth]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
          <div className="text-xs font-heading font-medium text-[#86868b] uppercase tracking-wider">
            Screen & Typographic Boundaries
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-[#86868b] mb-1">
                <span>Minimum Viewport (Mobile)</span>
                <span className="font-mono text-white font-medium">{minWidth}px</span>
              </div>
              <input
                type="range"
                min="320"
                max="600"
                value={minWidth}
                onChange={(e) => setMinWidth(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#86868b] mb-1">
                <span>Maximum Viewport (Desktop)</span>
                <span className="font-mono text-white font-medium">{maxWidth}px</span>
              </div>
              <input
                type="range"
                min="1024"
                max="1920"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#86868b] mb-1">
                <span>Min Size</span>
                <span className="font-mono text-white font-medium">{minSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="32"
                value={minSize}
                onChange={(e) => setMinSize(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#86868b] mb-1">
                <span>Max Size</span>
                <span className="font-mono text-white font-medium">{maxSize}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="96"
                value={maxSize}
                onChange={(e) => setMaxSize(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-[#86868b] mb-1">GENERATED CSS CLAMP()</div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-white break-all select-all">
              font-size: {clampFormula};
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#86868b]">
                <span>SIMULATED VIEWPORT:</span>
                <span className="text-[#30d158] font-semibold">{simulatedWidth}px (Font: {currentCalculatedPx}px)</span>
              </div>
              <input
                type="range"
                min="320"
                max="1920"
                value={simulatedWidth}
                onChange={(e) => setSimulatedWidth(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#08080c] border border-white/[0.08] overflow-hidden flex items-center justify-center min-h-[110px]">
            <div 
              className="font-heading font-semibold text-white text-center transition-all leading-tight"
              style={{ fontSize: `${currentCalculatedPx}px` }}
            >
              LUNAR PARADOX
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`font-size: ${clampFormula};`);
              setCopied(true);
              if (soundEnabled) audioManager.playSuccess();
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full py-3 rounded-full bg-white text-black font-heading font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer hover:bg-[#e5e5ea] flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Clamp() CSS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTOR 03: LUNAR LABS (APPLE PRO PRODUCT SUITE & EARLY ACCESS)
// ============================================================================

function SectorLabs({ soundEnabled }) {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [queueSpot, setQueueSpot] = useState(342);

  const saasProducts = [
    {
      id: 'shader_studio',
      name: 'Lunar Shader Studio',
      tag: 'WEBGPU / WEBGL',
      status: 'Private Beta',
      desc: 'Node-based visual shader synthesizer for web engineers. Export directly to React Three Fiber or raw WGSL.',
      features: ['Real-time raymarching nodes', 'Procedural lunar noise maps', 'Zero-dependency bundle output']
    },
    {
      id: 'spatial_audio',
      name: 'Spatial Audio Engine',
      tag: 'WEB AUDIO API',
      status: 'Developer Preview',
      desc: 'Sub-millisecond procedural soundscapes and micro-acoustics. Zero external audio file download overhead.',
      features: ['Synthesized haptic clicks', 'Spatial room acoustics', 'Hardware-timed scheduling']
    },
    {
      id: 'quantum_tokens',
      name: 'Quantum Design System',
      tag: 'CSS / TAILWIND',
      status: 'Open Access',
      desc: 'Human Interface design system engineered with variable typography, fluid clamp() scales, and optical materials.',
      features: ['Tailwind v4 ready', 'WCAG AAA contrast modes', 'VisionOS frosted materials']
    }
  ];

  const handleJoin = (e) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    if (soundEnabled) audioManager.playSuccess();
    setQueueSpot(Math.floor(180 + Math.random() * 300));
    setWaitlistJoined(true);
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1">
          LUNAR LABS // SOFTWARE SUITE
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight">
          Tools for Creative Engineers
        </h2>
        <p className="text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed">
          We develop proprietary software and developer toolkits engineered to empower spatial designers and web technologists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {saasProducts.map((p) => (
          <div 
            key={p.id}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white border border-white/[0.08]">
                  {p.tag}
                </span>
                <span className="text-[10px] font-mono text-[#30d158] font-medium">
                  ● {p.status}
                </span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white">
                {p.name}
              </h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                {p.desc}
              </p>
              <ul className="space-y-1.5 pt-3 border-t border-white/[0.08]">
                {p.features.map((feat, idx) => (
                  <li key={idx} className="text-[11px] text-[#f5f5f7] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  const el = document.getElementById('waitlist-anchor');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  if (soundEnabled) audioManager.playTick();
                }}
                className="w-full py-2.5 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-heading font-semibold transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Request Access</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div 
        id="waitlist-anchor"
        className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center space-y-4 max-w-xl mx-auto shadow-2xl"
      >
        <Sparkles className="w-6 h-6 text-white mx-auto" />
        <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white tracking-tight">
          Join Lunar Labs Early Access
        </h3>
        <p className="text-xs text-[#86868b] max-w-md mx-auto leading-relaxed">
          Receive priority notification for developer beta releases, private test keys, and documentation.
        </p>

        {waitlistJoined ? (
          <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-xs font-mono">
            🎉 ACCESS RESERVED: You are spot <strong className="text-white">#{queueSpot}</strong> in priority queue.
          </div>
        ) : (
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter email address..."
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              className="flex-1 w-full px-4 py-2.5 rounded-full bg-black/50 border border-white/[0.08] text-xs text-white placeholder-[#6e6e73] focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-heading font-semibold text-xs transition-all cursor-pointer hover:bg-[#e5e5ea]"
            >
              Request Access
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SECTOR 04: LUNAR VAULT (APPLE EDITORIAL PRODUCTION CASE STUDIES)
// ============================================================================

function SectorVault({ soundEnabled, onOpenStudio }) {
  const caseStudies = [
    {
      id: 'aura_spatial',
      client: 'AURA // SPATIAL',
      category: 'Luxury E-Commerce & 3D Configurator',
      metric: '+280% Dwell Time',
      metricSub: '4m 12s average session duration',
      latency: '24ms Edge Delivery',
      stack: ['React 19', 'Three.js', 'WebGL 2.0', 'Cloudflare Edge'],
      summary: 'Engineered an interactive 3D configurator featuring real-time refraction and specular caustics, driving unprecedented buyer conversion.'
    },
    {
      id: 'synapse_protocol',
      client: 'SYNAPSE // PROTOCOL',
      category: 'Decentralized Generative AI Canvas',
      metric: '850K+ Active Nodes',
      metricSub: '99.98% consensus uptime',
      latency: '18ms Global Latency',
      stack: ['Vite', 'Web Workers', 'Web Audio API', 'Tailwind'],
      summary: 'Interactive spatial node network handling concurrent generative visual synthesis across 300+ global edge locations without frame drops.'
    },
    {
      id: 'chrono_horology',
      client: 'CHRONO // HOROLOGY',
      category: 'Swiss Haute Horlogerie 3D Platform',
      metric: '100/100 Lighthouse',
      metricSub: 'Sub-second mobile First Contentful Paint',
      latency: '32ms Asset Stream',
      stack: ['Three.js', 'Lanczos Video Compression', 'Edge CDN'],
      summary: 'High-precision tourbillon timepiece exploration with synthesized tick micro-acoustics and microscopic zoom fidelity.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-white/[0.08] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#86868b] uppercase tracking-widest block mb-1">
            LUNAR VAULT // PROVEN PRODUCTION WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight">
            Production Engineering
          </h2>
          <p className="text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed">
            Every engagement delivers verifiable performance: sub-50ms latency, zero layout shifts, and industry-defining visual clarity.
          </p>
        </div>

        <button
          onClick={() => {
            onOpenStudio();
            if (soundEnabled) audioManager.playTick();
          }}
          className="px-5 py-2.5 rounded-full bg-white text-black font-heading font-semibold text-xs transition-all cursor-pointer hover:bg-[#e5e5ea] flex items-center gap-1.5"
        >
          <span>Commission a Project</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      <div className="space-y-5">
        {caseStudies.map((cs) => (
          <div 
            key={cs.id}
            className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">
                  {cs.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-0.5">
                  {cs.client}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-base sm:text-xl font-heading font-semibold text-white">
                  {cs.metric}
                </div>
                <div className="text-[10px] font-mono text-[#86868b]">
                  {cs.metricSub}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              {cs.summary}
            </p>

            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-1.5">
                {cs.stack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[10px] text-[#f5f5f7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-[#86868b] text-[11px]">
                ● {cs.latency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
