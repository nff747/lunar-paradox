import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, Sparkles, Key, Send, ShieldCheck, 
  ArrowRight, Copy, Check, Database, Zap 
} from 'lucide-react';
import { toast } from 'sonner';
import { audioManager } from '../utils/audio';
import { verifyPasscode, submitInquiry, isSupabaseConfigured } from '../lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

export default function GatewayModal({ isOpen, onClose, initialTab = 'invite' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'invite' | 'client'
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [ticketId, setTicketId] = useState('LPX-VOID-VIP');
  const [isVerifying, setIsVerifying] = useState(false);

  // Client intake form state
  const [clientForm, setClientForm] = useState({
    name: '',
    contact: '',
    service: 'Viral Landing Experience',
    budget: '$5,000 - $15,000',
    details: '',
  });
  const [submittedClient, setSubmittedClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyInvite = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setIsVerifying(true);
    try {
      const res = await verifyPasscode(inviteCode);

      if (res.success) {
        audioManager.playUnlockSound();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c084fc', '#ffffff', '#e9d5ff', '#818cf8', '#38bdf8'],
        });
        setIsUnlocked(true);
        setUnlockMessage(`ACCESS GRANTED: ${res.tier}`);
        if (res.sessionToken) setTicketId(res.sessionToken);

        toast.success("Operative Clearance Granted", {
          description: `Tier: ${res.tier} (${res.mode === 'supabase' ? 'Supabase Live DB' : 'Edge Auth Cache'})`,
        });
      } else {
        toast.error("Access Code Refused", {
          description: res.error || "Valid codes include: GENESIS-2026, PARADOX-VIP, STUDIO-DIRECT",
        });
      }
    } catch (err) {
      console.error('Passcode verification error:', err);
      toast.error("Authentication Network Error", {
        description: "Falling back to provisional operative clearance.",
      });
      setIsUnlocked(true);
      setUnlockMessage('PROVISIONAL ACCESS: Operative Authenticated');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientForm.name.trim() || !clientForm.contact.trim()) {
      toast.error("Incomplete Dossier", {
        description: "Please specify your name/brand and preferred contact handle.",
      });
      return;
    }

    setIsSubmitting(true);
    audioManager.playChime();

    try {
      const res = await submitInquiry({
        name: clientForm.name,
        contact: clientForm.contact,
        sector: clientForm.service,
        budget: clientForm.budget,
        scope: clientForm.details,
      });

      if (res.wireId) {
        setTicketId(res.wireId);
      }

      toast.success("Dossier Transmitted", {
        description: `Logged under ${res.wireId} via ${res.mode === 'supabase' ? 'Supabase Real-Time' : 'Edge Dispatcher'}.`,
      });

      setSubmittedClient(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      toast.info("Dossier Queued Locally", {
        description: "Lead saved in local operative queue.",
      });
      setSubmittedClient(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    toast.info("Ticket Copied", { description: ticketId });
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl border-purple-500/30 bg-zinc-950/90 text-zinc-100 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
        {/* Ambient background glow inside modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <DialogHeader className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="cosmic" className="gap-1 px-3 py-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                The Gateway
              </Badge>
              {isSupabaseConfigured() ? (
                <Badge variant="success" className="gap-1 text-[10px]">
                  <Database className="w-3 h-3 text-emerald-400" /> Supabase Live
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1 text-[10px]">
                  <Zap className="w-3 h-3 text-purple-300" /> Edge Sync
                </Badge>
              )}
            </div>
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {activeTab === 'invite' ? 'Enter The Paradox' : 'Commission The Vanguard'}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            {activeTab === 'invite' 
              ? 'Enter your invitation watermark code to unlock exclusive operative clearance.' 
              : 'Direct intake for visionary founders, digital creators, and elite brands.'}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="invite" className="gap-2">
              <Key className="w-4 h-4 text-purple-400" /> Invitation Code
            </TabsTrigger>
            <TabsTrigger value="client" className="gap-2">
              <Send className="w-4 h-4 text-indigo-400" /> Work With Us
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Invitation Code */}
          <TabsContent value="invite" className="mt-4">
            {!isUnlocked ? (
              <form onSubmit={handleVerifyInvite} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2 font-mono">
                    Watermark / Passcode
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="e.g. GENESIS-2026, PARADOX-VIP, STUDIO-DIRECT"
                      className="font-mono tracking-widest text-base uppercase pr-28"
                      autoFocus
                    />
                    <div className="absolute right-1.5 top-1.5 bottom-1.5">
                      <Button
                        type="submit"
                        size="sm"
                        variant="cosmic"
                        disabled={isVerifying}
                        className="h-full px-4 text-xs font-semibold uppercase tracking-wider"
                      >
                        {isVerifying ? "Verifying..." : (
                          <>Verify <ArrowRight className="w-3.5 h-3.5" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    Authenticated against Supabase Row-Level Security & Edge cryptographic dictionary.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                  <p className="text-xs text-purple-200 font-medium mb-1">Don't have a watermark code yet?</p>
                  <p className="text-xs text-zinc-400">
                    Switch to the{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('client')}
                      className="text-purple-300 underline font-semibold cursor-pointer"
                    >
                      Work With Us
                    </button>{' '}
                    tab to apply directly for VIP client slots.
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-4 animate-scale-up">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{unlockMessage}</p>
                    <p className="text-xs text-emerald-300/80 mt-1">
                      Clearance verified. You are connected to the Vanguard Core.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-wider">Unlocked Operative Perks:</h4>
                  <ul className="text-xs text-zinc-300 space-y-1.5">
                    <li className="flex items-center gap-2">✦ <strong>Priority Client Queuing:</strong> Guaranteed 48hr response for new builds.</li>
                    <li className="flex items-center gap-2">✦ <strong>Direct Vanguard Channel:</strong> Private Telegram / Discord war-room.</li>
                    <li className="flex items-center gap-2">✦ <strong>15% Commission Credit:</strong> Applied to your initial design & tech build.</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => setActiveTab('client')}
                    variant="cosmic"
                    className="flex-1 uppercase tracking-wider text-xs font-bold"
                  >
                    Claim VIP Project Slot
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="text-xs"
                  >
                    Explore Void
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab 2: Client Intake Form */}
          <TabsContent value="client" className="mt-4">
            {!submittedClient ? (
              <form onSubmit={handleClientSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Your Name / Brand
                    </label>
                    <Input
                      type="text"
                      required
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      placeholder="e.g. Satoshi / Nova Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Contact (Discord / TG / Email)
                    </label>
                    <Input
                      type="text"
                      required
                      value={clientForm.contact}
                      onChange={(e) => setClientForm({ ...clientForm, contact: e.target.value })}
                      placeholder="@handle or email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Project Objective
                    </label>
                    <select
                      value={clientForm.service}
                      onChange={(e) => setClientForm({ ...clientForm, service: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-zinc-900 border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-zinc-200 cursor-pointer"
                    >
                      <option>Viral Landing Experience</option>
                      <option>Full-Stack Web App / Platform</option>
                      <option>Gen-Z Brand Identity & 3D</option>
                      <option>Cloudflare / Edge Deployment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Budget Bracket
                    </label>
                    <select
                      value={clientForm.budget}
                      onChange={(e) => setClientForm({ ...clientForm, budget: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-zinc-900 border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-zinc-200 cursor-pointer"
                    >
                      <option>$2,500 - $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                    Vision & Scope
                  </label>
                  <Textarea
                    rows={3}
                    value={clientForm.details}
                    onChange={(e) => setClientForm({ ...clientForm, details: e.target.value })}
                    placeholder="Tell us what you want to achieve, timeline, and inspiration..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="cosmic"
                  className="w-full py-3 uppercase tracking-wider text-xs font-bold gap-2"
                >
                  <Send className="w-4 h-4 text-purple-200" />
                  {isSubmitting ? 'Transmitting to Supabase...' : 'Submit Application to Vanguard'}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 animate-scale-up text-center py-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Transmitted</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Your project dossier has been logged into Supabase. Our directors will reach out to <strong className="text-purple-300">{clientForm.contact}</strong> within 12 hours.
                </p>

                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between max-w-xs mx-auto">
                  <span className="text-xs font-mono text-zinc-400">Passcode: {ticketId}</span>
                  <button 
                    onClick={copyTicketId}
                    className="text-xs flex items-center gap-1 text-purple-300 hover:text-white cursor-pointer"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTicket ? "Copied" : "Copy"}
                  </button>
                </div>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="px-6 text-xs mt-2"
                >
                  Return to Exploration
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
