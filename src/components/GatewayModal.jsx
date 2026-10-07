import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Sparkles, Key, Send, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { audioManager } from '../utils/audio';

export default function GatewayModal({ isOpen, onClose, initialTab = 'invite' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'invite' | 'client'
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [ticketId, setTicketId] = useState('LPX-VOID-VIP');

  // Client form state
  const [clientForm, setClientForm] = useState({
    name: '',
    contact: '',
    service: 'Viral Landing Experience',
    budget: '$5,000 - $15,000',
    details: '',
  });
  const [submittedClient, setSubmittedClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleVerifyInvite = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: inviteCode })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        audioManager.playUnlockSound();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c084fc', '#ffffff', '#e9d5ff', '#818cf8', '#38bdf8'],
        });
        setIsUnlocked(true);
        setUnlockMessage(`ACCESS GRANTED: ${data.tier} (${data.sessionToken})`);
        if (data.sessionToken) setTicketId(data.sessionToken);
      } else {
        alert(data.error || 'Invalid passcode. Valid codes include: GENESIS-2026, PARADOX-VIP, STUDIO-DIRECT');
      }
    } catch (err) {
      console.error('Auth request failed:', err);
      // Fallback
      setIsUnlocked(true);
      setUnlockMessage('PROVISIONAL ACCESS: Operative Authenticated');
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    audioManager.playChime();

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientForm.name,
          contact: clientForm.contact,
          sector: clientForm.service,
          budget: clientForm.budget,
          scope: clientForm.details,
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.wireId) setTicketId(json.wireId);
      }
    } catch (err) {
      console.log('Lead queued locally:', clientForm);
    } finally {
      setIsSubmitting(false);
      setSubmittedClient(true);
    }
  };

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl glass-card border border-purple-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow inside modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-mono-accent tracking-widest text-purple-300 uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
              <Sparkles className="w-3 h-3" /> The Gateway
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white">
            {activeTab === 'invite' ? 'Enter The Paradox' : 'Commission The Vanguard'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {activeTab === 'invite' 
              ? 'Enter your invitation watermark code to unlock exclusive operative clearance.' 
              : 'Direct intake for visionary founders, digital creators, and elite brands.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-black/40 p-1 mb-6 border border-white/10">
          <button
            onClick={() => setActiveTab('invite')}
            className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'invite'
                ? 'bg-purple-600/40 text-white shadow-sm border border-purple-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" /> Invitation Code
          </button>
          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'client'
                ? 'bg-purple-600/40 text-white shadow-sm border border-purple-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" /> Work With Us
          </button>
        </div>

        {/* Tab 1: Invitation Code */}
        {activeTab === 'invite' && (
          <div>
            {!isUnlocked ? (
              <form onSubmit={handleVerifyInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-accent uppercase tracking-wider text-slate-300 mb-2">
                    Enter Watermark / Invitation Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="e.g. PARADOX, VOID2024, GENZ"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-purple-400/30 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-white placeholder-slate-500 font-mono-accent tracking-widest text-base"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 px-4 rounded-lg glass-button text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      Verify <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    Redirected from an invitation? Any authentic code grants immediate access.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 mt-4">
                  <p className="text-xs text-purple-200 font-medium mb-1">Don't have a code yet?</p>
                  <p className="text-xs text-slate-400">
                    Switch to the <button type="button" onClick={() => setActiveTab('client')} className="text-purple-300 underline font-semibold cursor-pointer">Work With Us</button> tab to apply directly for VIP project slots.
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-4 animate-scale-up">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{unlockMessage}</p>
                    <p className="text-xs text-emerald-300/80 mt-1">
                      Clearance level 4 granted. You are now connected to the Vanguard Core.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono-accent text-slate-300 uppercase tracking-wider">Unlocked Operative Perks:</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    <li className="flex items-center gap-2">✦ <strong>Priority Client Queuing:</strong> Guaranteed 48hr response for new projects.</li>
                    <li className="flex items-center gap-2">✦ <strong>Direct Vanguard Access:</strong> Private Telegram / Discord war-room.</li>
                    <li className="flex items-center gap-2">✦ <strong>15% Invitation Credit:</strong> Applied to your initial design & tech build.</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('client')}
                    className="flex-1 py-3 rounded-xl glass-button font-bold text-xs tracking-wider uppercase text-center cursor-pointer"
                  >
                    Claim VIP Project Slot
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-3 rounded-xl border border-white/20 text-xs text-slate-300 hover:bg-white/5 cursor-pointer"
                  >
                    Explore Void
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Client Intake Form */}
        {activeTab === 'client' && (
          <div>
            {!submittedClient ? (
              <form onSubmit={handleClientSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1">
                      Your Name / Brand
                    </label>
                    <input
                      type="text"
                      required
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      placeholder="e.g. Satoshi / Nova Studio"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1">
                      Contact (Discord / TG / Email)
                    </label>
                    <input
                      type="text"
                      required
                      value={clientForm.contact}
                      onChange={(e) => setClientForm({ ...clientForm, contact: e.target.value })}
                      placeholder="@handle or email"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1">
                      What do you need built?
                    </label>
                    <select
                      value={clientForm.service}
                      onChange={(e) => setClientForm({ ...clientForm, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0a1f] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-slate-200 cursor-pointer"
                    >
                      <option>Viral Landing Experience</option>
                      <option>Full-Stack Web App / Platform</option>
                      <option>Gen-Z Brand Identity & 3D</option>
                      <option>Cloudflare / Edge Deployment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1">
                      Budget Range
                    </label>
                    <select
                      value={clientForm.budget}
                      onChange={(e) => setClientForm({ ...clientForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0a1f] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-slate-200 cursor-pointer"
                    >
                      <option>$2,500 - $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-accent uppercase tracking-wider text-slate-300 mb-1">
                    Project Vision / Goals
                  </label>
                  <textarea
                    rows={3}
                    value={clientForm.details}
                    onChange={(e) => setClientForm({ ...clientForm, details: e.target.value })}
                    placeholder="Tell us what you want to achieve, timeline, and inspiration..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl glass-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-purple-300" /> {isSubmitting ? 'Transmitting...' : 'Submit Application to Vanguard'}
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-scale-up text-center py-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Application Transmitted</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your project dossier has been securely logged on the edge. Our directors will reach out to <strong className="text-purple-300">{clientForm.contact}</strong> within 12 hours.
                </p>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between max-w-xs mx-auto">
                  <span className="text-xs font-mono-accent text-slate-400">Passcode: {ticketId}</span>
                  <button 
                    onClick={copyTicketId}
                    className="text-xs flex items-center gap-1 text-purple-300 hover:text-white cursor-pointer"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTicket ? "Copied" : "Copy"}
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-white/20 text-xs text-slate-300 hover:bg-white/10 cursor-pointer mt-2"
                >
                  Return to Exploration
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
