import React from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Globe, 
  Terminal,
  Cpu
} from 'lucide-react';

export default function BranchPortalModal({ 
  branch, 
  isOpen, 
  onClose, 
  onLaunchSandbox 
}) {
  if (!isOpen || !branch) return null;

  const Icon = branch.icon || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Apple VisionOS Portal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d0d14]/95 border border-white/[0.16] shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl bg-gradient-to-br from-sky-400 to-purple-600"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-all cursor-pointer border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Subdomain Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#86868b] uppercase">
                ECOSYSTEM BRANCH
              </span>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${branch.badgeColor || 'text-purple-300 border-purple-500/30 bg-purple-500/10'}`}>
                {branch.badge || 'ACTIVE'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
              {branch.name}
            </h2>
          </div>
        </div>

        {/* Destination Subdomain Pill */}
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/[0.08] mb-5 font-mono text-xs text-sky-200">
          <div className="flex items-center gap-2 truncate">
            <Globe className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-slate-400">Target URL:</span>
            <span className="text-white font-medium truncate">https://{branch.subdomain}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 shrink-0 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-body">
          {branch.desc}
        </p>

        {/* Branch Specs / Telemetry */}
        <div className="grid grid-cols-2 gap-2.5 mb-7 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-[10px] text-[#86868b] uppercase">Subdomain Routing</div>
            <div className="text-slate-200 font-semibold mt-0.5 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>Dedicated Cluster</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-[10px] text-[#86868b] uppercase">Edge Latency</div>
            <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>12ms // Global Mesh</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Primary: Open Subdomain */}
          <a
            href={`https://${branch.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              // In local development, prevent actual navigation if subdomains aren't DNS configured yet
              // But open or provide feedback
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-full bg-white text-black hover:bg-slate-200 font-heading font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          >
            <span>LAUNCH SUBDOMAIN</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </a>

          {/* Secondary: Explore Local Sandbox */}
          <button
            onClick={() => {
              onClose();
              if (onLaunchSandbox) onLaunchSandbox(branch.id);
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Sandbox Preview</span>
          </button>

        </div>

      </div>

    </div>
  );
}
