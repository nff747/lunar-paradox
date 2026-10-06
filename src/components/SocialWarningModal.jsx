import React from 'react';
import { X } from 'lucide-react';
import { DiscordIcon } from './SocialIcons';

export default function SocialWarningModal({ 
  isOpen, 
  onClose, 
  platform = 'X' 
}) {
  if (!isOpen) return null;

  const isInstagram = platform.toLowerCase().includes('insta');
  const platformName = isInstagram ? 'Instagram' : 'X (Twitter)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose} 
      />

      {/* Liquid Glass Container */}
      <div className="relative w-full max-w-sm liquid-glass rounded-2xl overflow-hidden z-10">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-medium text-[#86868b] uppercase tracking-widest">Coming Soon</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/[0.1] text-[#86868b] hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight leading-tight">
            {platformName} is not active yet
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <p className="text-sm text-[#a1a1a6] leading-relaxed">
            Lunar Paradox does not currently operate official accounts on {platformName}. Any profile claiming to represent us on this platform is not affiliated with us.
          </p>
          <p className="text-sm text-[#a1a1a6] leading-relaxed mt-3">
            All official updates and community access are handled exclusively through our verified Discord server.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
          <a
            href="https://discord.gg/wBaJuSFaPw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all cursor-pointer"
          >
            <DiscordIcon className="w-4 h-4 text-black" />
            <span>Join Discord</span>
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#e5e5ea] text-xs font-medium transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
