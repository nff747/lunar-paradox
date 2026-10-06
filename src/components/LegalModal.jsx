import React from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type = 'terms' }) {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose} 
      />

      {/* Liquid Glass Container */}
      <div className="relative w-full max-w-lg liquid-glass rounded-2xl overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h2 className="text-base font-semibold text-white tracking-tight">
            {isTerms ? 'Terms of Service' : 'Privacy Policy'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/[0.1] text-[#86868b] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          {isTerms ? (
            <div className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed">
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">1. Platform Usage</h3>
                <p>By accessing lunarparadox.com and associated subdomains (studio, forge, labs, vault), you agree to comply with our platform terms and applicable laws.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">2. Intellectual Property</h3>
                <p>All 3D models, shader code, design systems, and visual tokens are proprietary assets of Lunar Paradox. Unauthorized reproduction or distribution is prohibited.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">3. Enterprise Governance</h3>
                <p>Direct wire requests and enterprise engagements are subject to mutual service agreements executed between parties.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">4. Acceptable Use</h3>
                <p>Users may not attempt to reverse-engineer, scrape, or redistribute platform tools, assets, or proprietary algorithms without written consent.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed">
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">1. Zero Tracking</h3>
                <p>Lunar Paradox does not track, collect, or sell personal user information. We do not use third-party analytics or advertising trackers.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">2. Local Storage</h3>
                <p>Audio preferences and UI settings are stored locally on your device using browser localStorage. This data never leaves your machine.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">3. Security</h3>
                <p>All client submissions and communications are protected by TLS 1.3 encryption. Enterprise wire requests are processed through secured channels.</p>
              </section>
              <section>
                <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">4. Contact</h3>
                <p>For privacy inquiries, reach us through our verified Discord server or enterprise contact channels.</p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
