import React from 'react';
import { 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { DiscordIcon, XIcon, InstagramIcon } from './SocialIcons';

export default function SocialWarningModal({ 
  isOpen, 
  onClose, 
  platform = 'X' 
}) {
  if (!isOpen) return null;

  const isInstagram = platform.toLowerCase().includes('insta');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Apple VisionOS Alert Container */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0e0d16] border border-amber-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.12)] p-6 sm:p-7 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Ambient Warm Amber Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-all cursor-pointer border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon + Platform Badge */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-400/90 uppercase font-semibold">
                SECURITY ADVISORY
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 font-bold">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide flex items-center gap-2 mt-0.5">
              <span>{isInstagram ? 'Instagram' : 'X (Twitter)'} is Not Live Yet</span>
              {isInstagram ? (
                <InstagramIcon className="w-4 h-4 text-pink-400" />
              ) : (
                <XIcon className="w-4 h-4 text-slate-300" />
              )}
            </h3>
          </div>
        </div>

        {/* Official Warning Card */}
        <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/25 mb-4 text-xs leading-relaxed text-amber-200/90">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Beware of Scammers & Impersonators</span>
          </div>
          <p className="text-[12px] text-slate-300 leading-normal">
            Lunar Paradox <strong className="text-white">does not currently operate official accounts</strong> on {isInstagram ? 'Instagram' : 'X (Twitter)'}. Any profile claiming to represent us, selling access, or sending DMs on these platforms is fraudulent.
          </p>
        </div>

        {/* Verification Clarification */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6 text-xs text-slate-400">
          <div className="text-[10px] font-mono uppercase text-[#86868b] tracking-wider mb-1">
            Verified Communication Channel
          </div>
          <div className="text-slate-200 text-xs leading-relaxed">
            All official drops, genesis invitations, and announcements are exclusively handled via our platform and verified Discord server.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://discord.gg/wBaJuSFaPw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-heading font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(88,101,242,0.4)]"
          >
            <DiscordIcon className="w-4 h-4 text-white" />
            <span>JOIN VERIFIED DISCORD</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>

    </div>
  );
}
