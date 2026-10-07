import React, { useState } from 'react';
import { X, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type = 'terms' }) {
  const [activeTab, setActiveTab] = useState(type);

  // Sync tab with prop whenever opened
  React.useEffect(() => {
    setActiveTab(type);
  }, [type, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose} 
      />

      {/* Liquid Glass Container */}
      <div className="relative w-full max-w-2xl bg-[#0d0e13]/95 border border-white/[0.12] shadow-[0_30px_90px_rgba(0,0,0,0.85)] rounded-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        
        {/* Header & Tabs */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#86868b] hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#86868b] hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/[0.1] text-[#86868b] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 text-xs text-[#a1a1a6] leading-relaxed">
          {activeTab === 'terms' ? (
            <>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                  LAST UPDATED: OCTOBER 2026 // SPEC v2.6
                </div>
                <h3 className="text-base font-semibold text-white">Lunar Paradox Platform Terms of Service</h3>
                <p className="mt-2 text-[#86868b]">
                  Please read these Terms of Service carefully before accessing or using the Lunar Paradox platform, ecosystem subdomains (studio, forge, labs, vault, docs, status), or proprietary spatial APIs.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">1. Ecosystem Architecture & Scope</h4>
                <p>
                  Lunar Paradox operates on a decentralized "Stem & Branches" model. The root domain (lunarparadox.com) serves as the primary coordination platform ("Stem"), connecting users to specialized autonomous subdomains ("Branches"). By browsing, connecting wallets, or querying the platform, you agree to bound compliance across all branch endpoints.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Proprietary Spatial Assets & IP</h4>
                <p>
                  All 3D models, procedural shaders, Three.js celestial algorithms, color science frameworks (APCA & WCAG matrices), neural model checkpoints, and interface tokens are proprietary intellectual property of Lunar Paradox, Inc. and its licensors.
                </p>
                <p>
                  Free utilities made accessible on <span className="text-white font-mono">forge.lunarparadox.com</span> are licensed for personal and commercial design prototyping under the Lunar Open Access License. Automated bulk scraping, neural model weight redistribution, or decompilation of platform shaders is strictly prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3. Enterprise Engagements & Direct Wire</h4>
                <p>
                  Client requests executed through the Direct Wire channel or Enterprise Passcode are subject to tailored Master Services Agreements (MSA) and formal Statements of Work (SOW). Production assets, design tokens, and source repositories delivered via Lunar Studio are transferred per the specific terms of signed client contracts.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">4. Frontier Research & Beta Disclaimers</h4>
                <p>
                  Experimental neural engines and autonomous prototypes released under <span className="text-white font-mono">labs.lunarparadox.com</span> are distributed "as is" without representations or warranties of any kind. Users assume full responsibility when integrating frontier synthesis workflows into third-party production pipelines.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">5. Limitation of Liability</h4>
                <p>
                  To the maximum extent permitted by applicable law, Lunar Paradox, Inc. and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from network latency, cryptographic asset transfer errors, or third-party edge node disruptions.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">6. Governing Law & Dispute Resolution</h4>
                <p>
                  These Terms are governed by and construed in accordance with the laws of Delaware, United States, without regard to conflict of law principles. Any dispute arising under these Terms shall be resolved via binding arbitration administered by the American Arbitration Association (AAA).
                </p>
              </section>
            </>
          ) : (
            <>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1">
                  PRIVACY ARCHITECTURE // ZERO TRACKING SPECIFICATION
                </div>
                <h3 className="text-base font-semibold text-white">Lunar Paradox Privacy Policy</h3>
                <p className="mt-2 text-[#86868b]">
                  Lunar Paradox adheres to strict zero-surveillance design principles. We do not monetize personal data, harvest private credentials, or deploy third-party advertising trackers.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">1. Zero Personal Data Harvesting</h4>
                <p>
                  We do not collect names, phone numbers, or credit card records on the public platform. When you visit our stem or branch domains, no cross-site surveillance cookies or ad-tech pixels (e.g., Meta Pixel, Google Analytics tracking) are loaded or executed.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Local-Only Device Persistence</h4>
                <p>
                  Audio preferences (sound on/off), visual theme toggles, and recent search cache entries are stored strictly inside your browser's local sandbox using <span className="text-white font-mono">localStorage</span>. This data never traverses our edge servers and can be wiped instantly by clearing browser cache.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3. Transport Security & Direct Wire Queries</h4>
                <p>
                  Inquiries submitted through Enterprise Direct Wire or Genesis Passcode portals are encrypted in transit using industry-standard TLS 1.3 cryptographic protocols. Submissions are processed through hardened backend relays with zero third-party disclosure.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">4. Anti-Scam Advisory & Verified Channels</h4>
                <p>
                  Lunar Paradox does not maintain official communication accounts or direct messaging on X (Twitter) or Instagram. Any unsolicited communication purporting to sell genesis passes or requesting private keys on external social platforms is fraudulent. All verified announcements are published exclusively on our official platform and verified Discord server.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">5. Privacy Rights & Compliance</h4>
                <p>
                  Under GDPR, CCPA, and global privacy standards, you have the right to request deletion of any inquiry correspondence submitted through our enterprise portals. For formal privacy or data protection inquiries, contact our compliance team via our verified Discord server or official enterprise registry.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <span className="text-[11px] text-[#636366] font-mono">
            Lunar Paradox Global Mesh • Verified Protocol
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
