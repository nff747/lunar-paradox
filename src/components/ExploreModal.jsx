import React from 'react';
import { X, Globe, Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose, onOpenGateway }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl glass-card border border-purple-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono-accent text-purple-400 tracking-widest uppercase">The Manifesto</span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white mt-1">Inside The Lunar Paradox</h2>
          <p className="text-sm text-slate-400 mt-1">
            Why ordinary digital presence fails the new generation—and how the Paradox changes everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Edge Velocity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hosted globally across 300+ edge locations. Sub-50ms latency ensures instant immersion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Dimensional UI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesized liquid chrome physics and reactive glassmorphism tuned for Gen-Z attention spans.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">High Conversion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered funnel from invitation watermark directly to client signed contracts.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-purple-300 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Ready to commission your experience?</p>
              <p className="text-[11px] text-slate-400">Exclusive client onboarding windows are currently open.</p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenGateway('client');
            }}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl glass-button font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            Apply for Access <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
