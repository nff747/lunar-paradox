import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Sliders, 
  FlaskConical, 
  ShieldCheck, 
  FileCode2, 
  Activity, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Terminal
} from 'lucide-react';

export const BRANCHES = [
  {
    id: 'studio',
    name: 'Lunar Studio',
    subdomain: 'studio.lunarparadox.com',
    desc: 'Spatial 3D, generative visual engines & cinematic direction.',
    icon: Sparkles,
    badge: 'AGENCY & CORE',
    badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    color: 'from-amber-500/20 to-orange-500/10',
    status: 'Operational',
  },
  {
    id: 'forge',
    name: 'Lunar Forge',
    subdomain: 'forge.lunarparadox.com',
    desc: 'Free design utilities, color science, WCAG contrast & token lab.',
    icon: Sliders,
    badge: 'FREE TOOLS',
    badgeColor: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
    color: 'from-purple-500/20 to-indigo-500/10',
    status: 'Open Access',
  },
  {
    id: 'labs',
    name: 'Lunar Labs',
    subdomain: 'labs.lunarparadox.com',
    desc: 'Frontier AI models, neural interfaces & experimental synthesis.',
    icon: FlaskConical,
    badge: 'RESEARCH BETA',
    badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    color: 'from-emerald-500/20 to-teal-500/10',
    status: 'Invite Only',
  },
  {
    id: 'vault',
    name: 'Lunar Vault',
    subdomain: 'vault.lunarparadox.com',
    desc: 'Cryptographic design assets, certified tokens & flagship archive.',
    icon: ShieldCheck,
    badge: 'VERIFIED',
    badgeColor: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
    color: 'from-sky-500/20 to-blue-500/10',
    status: 'Protected',
  },
  {
    id: 'docs',
    name: 'Developer Docs',
    subdomain: 'docs.lunarparadox.com',
    desc: 'Protocol specifications, SDK integration & headless API specs.',
    icon: FileCode2,
    badge: 'v2.6 SPEC',
    badgeColor: 'text-slate-300 border-white/20 bg-white/5',
    color: 'from-slate-500/20 to-zinc-500/10',
    status: 'Public',
  },
  {
    id: 'status',
    name: 'Mesh Telemetry',
    subdomain: 'status.lunarparadox.com',
    desc: 'Distributed node ping, edge latency & dimension consensus.',
    icon: Activity,
    badge: '99.98% UP',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    color: 'from-emerald-500/20 to-cyan-500/10',
    status: 'All Nodes Live',
  },
];

export default function EcosystemLauncher({ onSelectBranch, onOpenCommandOS }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Ecosystem Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border text-xs font-medium cursor-pointer ${
          isOpen
            ? 'bg-zinc-800 text-white border-zinc-700'
            : 'bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700'
        }`}
        title="Lunar Paradox Ecosystem"
      >
        <span>Ecosystem</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

      {/* Floating Apple VisionOS Glass Popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-[340px] sm:w-[420px] max-h-[85vh] overflow-y-auto z-50 p-3 sm:p-4 rounded-3xl bg-[#0b0a12]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_25px_65px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] px-2">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#86868b] uppercase">
                The Stem & Branches
              </div>
              <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Ecosystem Subdomains</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
            </div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenCommandOS) onOpenCommandOS();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>
          </div>

          {/* Grid of Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BRANCHES.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.id}
                  data-branch-id={b.id}
                  onClick={() => {
                    setIsOpen(false);
                    onSelectBranch(b);
                  }}
                  className="group relative p-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.2] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-xl bg-white/[0.06] flex items-center justify-center text-slate-200 group-hover:text-white group-hover:bg-white/[0.12] transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${b.badgeColor}`}>
                        {b.badge}
                      </span>
                    </div>

                    {/* Branch Title & Subdomain */}
                    <div className="font-heading font-semibold text-xs text-white group-hover:text-cyan-200 transition-colors flex items-center gap-1">
                      <span>{b.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] font-mono text-[#86868b] group-hover:text-slate-400 truncate mb-1">
                      {b.subdomain}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                      {b.desc}
                    </p>
                  </div>

                  {/* Micro action prompt */}
                  <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-slate-500 group-hover:text-slate-300">
                    <span>{b.status}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.08] px-2 flex items-center justify-between text-[10px] text-[#86868b] font-mono">
            <span>Stem Platform: lunarparadox.com</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Mesh Synchronized
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
