import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  LogIn, 
  ArrowUpRight, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import GatewayModal from './components/GatewayModal';
import ExploreModal from './components/ExploreModal';
import CommandDeckOS from './components/CommandDeckOS';
import TiltCard from './components/TiltCard';
import CelestialMoonCanvas from './components/CelestialMoonCanvas';
import EcosystemLauncher, { BRANCHES } from './components/EcosystemLauncher';
import UniversalNexusConsole from './components/UniversalNexusConsole';
import BranchPortalModal from './components/BranchPortalModal';
import SocialWarningModal from './components/SocialWarningModal';
import { DiscordIcon, XIcon, InstagramIcon } from './components/SocialIcons';
import { audioManager } from './utils/audio';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [gatewayInitialTab, setGatewayInitialTab] = useState('invite');
  const [exploreOpen, setExploreOpen] = useState(false);
  const [commandDeckOpen, setCommandDeckOpen] = useState(false);
  const [commandDeckSector, setCommandDeckSector] = useState('studio');
  const [selectedBranchForPortal, setSelectedBranchForPortal] = useState(null);
  const [socialWarningOpen, setSocialWarningOpen] = useState(false);
  const [socialWarningPlatform, setSocialWarningPlatform] = useState('X');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1428914);
  const [activeMobileCard, setActiveMobileCard] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Global ⌘K / Ctrl+K listener for Command Deck OS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandDeckOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const protocols = [
    {
      id: 1,
      title: "THE ECLIPSE PROTOCOL",
      desc: "Harness the void. Unlock unprecedented creative dimensions.",
      telemetry: "PROTOCOL // 0x01",
      badge: "GENESIS",
      icon: "/black_hole_icon.png",
      onClick: () => handleEnterParadox('vault'),
    },
    {
      id: 2,
      title: "ACTIVE IN THE VOID",
      customStat: activeUsers.toLocaleString(),
      desc: "Entities synchronized across 42 dimensions",
      telemetry: "LIVE TELEMETRY",
      badge: "SYNCED",
      icon: "/sphere_cluster_icon.png",
      onClick: () => openGatewayWithTab('invite'),
    },
    {
      id: 3,
      title: "DIMENSIONAL CREATION",
      desc: "Tools built for the digital vanguard. Shaping reality.",
      telemetry: "DIMENSIONAL MATRIX",
      badge: "VANGUARD",
      icon: "/chrome_sculpture_raw.png",
      onClick: () => handleEnterParadox('forge'),
    },
    {
      id: 4,
      title: "GEN-Z PARADOX",
      desc: "Connect. Create. Evolve. The future is here.",
      telemetry: "SYNAPSE FLUX",
      badge: "NEXT-GEN",
      icon: "/vortex_icon.png",
      onClick: () => setExploreOpen(true),
    },
    {
      id: 5,
      title: "VERIFIED CONSENSUS",
      customStat: "98.4%",
      desc: "Client satisfaction across high-velocity drops",
      telemetry: "VERIFIED CONSENSUS",
      badge: "98%",
      icon: "/chart_icon.png",
      onClick: () => openGatewayWithTab('client'),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleSound = () => {
    const active = audioManager.toggleMute();
    setIsAudioActive(active);
  };

  const openGatewayWithTab = (tab) => {
    audioManager.playChime();
    setGatewayInitialTab(tab);
    setGatewayOpen(true);
    setMobileMenuOpen(false);
  };

  const handleEnterParadox = (sector = 'studio') => {
    audioManager.playSectorShift(0);
    setCommandDeckSector(sector);
    setCommandDeckOpen(true);
    setMobileMenuOpen(false);
  };

  // Parallax offsets
  const parallaxX = (mousePos.x - 0.5) * 22;
  const parallaxY = (mousePos.y - 0.5) * 22;

  return (
    <div className="relative min-h-screen w-full bg-[#030108] text-slate-100 overflow-x-hidden md:overflow-hidden font-body flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. REAL-TIME 3D CELESTIAL WEBGL ENGINE (THREE.JS 60FPS ANIMATED MOON)      */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030108]">
        <CelestialMoonCanvas mousePos={mousePos} />
        
        {/* Subtle cinematic edge vignette - Center is 100% luminous & unobstructed */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 60%, rgba(3,1,8,0.65) 85%, #030108 100%)' 
          }} 
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. HEADER NAVIGATION                                                      */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full px-6 md:px-12 pt-6 md:pt-7 pb-2 flex items-center justify-between gap-4">
        {/* Brand with Telemetry Badge */}
        <div className="cursor-pointer group flex items-center gap-3 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.16em] font-display text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]">
              LUNAR PARADOX
            </h1>
            <p className="text-[11px] md:text-sm text-slate-300 font-body font-normal tracking-wide mt-0.5">
              Step into the other side of light
            </p>
          </div>
          
          <div className="hidden 2xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono-accent text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>NODE // ACTIVE</span>
            <span className="text-purple-400/40">|</span>
            <span>CYCLE: 89.4%</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs md:text-sm tracking-widest font-heading font-semibold text-slate-300">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 text-white"
          >
            HOME
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'studio'))} 
            className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1"
          >
            <span>STUDIO</span>
            <span className="text-[10px] text-slate-500 font-mono">↗</span>
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'forge'))} 
            className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1.5"
          >
            <span>FORGE</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono-accent border border-purple-500/30">FREE</span>
            <span className="text-[10px] text-slate-500 font-mono">↗</span>
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'labs'))} 
            className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1"
          >
            <span>LABS</span>
            <span className="text-[10px] text-slate-500 font-mono">↗</span>
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'vault'))} 
            className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/40 pb-0.5 flex items-center gap-1"
          >
            <span>VAULT</span>
            <span className="text-[10px] text-slate-500 font-mono">↗</span>
          </button>

          {/* Ecosystem 9-Dot Launcher (Google / Apple Style) */}
          <EcosystemLauncher 
            onSelectBranch={(b) => setSelectedBranchForPortal(b)}
            onOpenCommandOS={() => setCommandDeckOpen(true)}
          />

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`btn-2026-hud px-3 py-1.5 rounded-full cursor-pointer flex items-center gap-2 text-xs font-mono transition-all ${
              isAudioActive 
                ? 'border-white/30 text-white bg-white/[0.1]' 
                : 'text-[#86868b]'
            }`}
            title="Toggle Ambient Audio"
          >
            {isAudioActive ? (
              <div className="flex items-end gap-[2px] h-3.5 px-0.5">
                <span className="w-[2px] bg-white rounded-full bar-1" />
                <span className="w-[2px] bg-white rounded-full bar-2" />
                <span className="w-[2px] bg-white rounded-full bar-3" />
                <span className="w-[2px] bg-white rounded-full bar-4" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#86868b]" />
            )}
            <span className="text-[10px] tracking-wider">{isAudioActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Login / Gateway Link */}
          <button 
            onClick={() => openGatewayWithTab('invite')}
            className="btn-2026-hud px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium cursor-pointer text-[#f5f5f7] hover:text-white"
          >
            <LogIn className="w-3.5 h-3.5 text-[#86868b]" />
            <span>LOGIN</span>
          </button>
        </nav>

        {/* Mobile Nav Buttons */}
        <div className="flex lg:hidden items-center gap-2.5 shrink-0">
          <EcosystemLauncher 
            onSelectBranch={(b) => setSelectedBranchForPortal(b)}
            onOpenCommandOS={() => setCommandDeckOpen(true)}
          />

          <button
            onClick={toggleSound}
            className={`btn-2026-hud p-2.5 rounded-full text-xs cursor-pointer ${
              isAudioActive ? 'border-purple-400/60 text-purple-200' : ''
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-2026-hud p-2.5 rounded-full text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 z-40 p-4 bg-black/95 backdrop-blur-2xl border-b border-purple-500/30 flex flex-col gap-2 text-xs font-mono-accent">
          <button onClick={() => { setMobileMenuOpen(false); }} className="text-left py-2 text-slate-300 hover:text-white">HOME (STEM PLATFORM)</button>
          <button onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'studio')); }} className="text-left py-2 text-slate-200 hover:text-white flex items-center justify-between">
            <span>01 STUDIO (studio.lunarparadox.com)</span>
            <span className="text-[10px] text-amber-300 font-bold">AGENCY ↗</span>
          </button>
          <button onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'forge')); }} className="text-left py-2 text-slate-200 hover:text-white flex items-center justify-between">
            <span>02 FORGE (forge.lunarparadox.com)</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">FREE TOOLS ↗</span>
          </button>
          <button onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'labs')); }} className="text-left py-2 text-slate-200 hover:text-white flex items-center justify-between">
            <span>03 LABS (labs.lunarparadox.com)</span>
            <span className="text-[10px] text-emerald-400">R&D BETA ↗</span>
          </button>
          <button onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'vault')); }} className="text-left py-2 text-slate-200 hover:text-white flex items-center justify-between">
            <span>04 VAULT (vault.lunarparadox.com)</span>
            <span className="text-[10px] text-sky-400">REGISTRY ↗</span>
          </button>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button onClick={() => openGatewayWithTab('invite')} className="text-left py-1 text-slate-400 hover:text-white">ACCESS PASSCODE</button>
            <button onClick={() => openGatewayWithTab('client')} className="text-left py-1 text-purple-300 font-semibold">DIRECT WIRE</button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. THE STEM CORE: CELESTIAL VOID & UNIVERSAL NEXUS CONSOLE                */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-4 md:px-12 max-w-7xl mx-auto w-full pb-6 md:pb-10">
        
        {/* Open celestial void showcasing radiant 3D animated Three.js moon */}
        <div className="flex-1 w-full min-h-[300px] md:min-h-[380px] pointer-events-none" />

        {/* Minimalist Apple Pro Telemetry Strip */}
        <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono text-[#86868b] tracking-wider uppercase mb-5 text-center px-4 py-1.5 rounded-full bg-[#121216]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
            <span className="text-white font-medium">{activeUsers.toLocaleString()}</span> ENTITIES IN VOID
          </span>
          <span className="text-white/20">•</span>
          <span className="hidden sm:inline text-[#86868b]">
            DIMENSION 00 // ACTIVE
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="text-[#86868b]">
            <span className="text-white font-medium">98.4%</span> CONSENSUS
          </span>
        </div>

        {/* GOOGLE-STYLE CENTRAL STEM SEARCH & ACTION MATRIX */}
        <UniversalNexusConsole
          onSelectBranch={(branch) => setSelectedBranchForPortal(branch)}
          onEnterParadox={() => handleEnterParadox('studio')}
          onOpenGateway={(tab) => openGatewayWithTab(tab)}
        />

        {/* Subtext Protocol Info */}
        <div className="flex items-center gap-2 mt-4 text-[9px] md:text-[10px] font-mono text-[#86868b] tracking-widest text-center">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>STEM PLATFORM // DIRECT SUBDOMAIN MESH v2.6 // PRESS ⌘K ANYWHERE</span>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 5. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-6 md:px-14 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>© 2026 Lunar Paradox</span>
          <span className="text-white/20">•</span>
          <span className="text-[10px] font-mono text-slate-500">Node: US-EAST-01 (Active)</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 text-slate-400">
          <a 
            href="https://discord.gg/wBaJuSFaPw" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="Official Discord Server"
          >
            <DiscordIcon className="w-4 h-4 text-slate-400 hover:text-[#5865F2]" />
          </a>
          <button 
            onClick={() => {
              setSocialWarningPlatform('X (Twitter)');
              setSocialWarningOpen(true);
            }} 
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title="X (Twitter) Notice"
          >
            <XIcon className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          <button 
            onClick={() => {
              setSocialWarningPlatform('Instagram');
              setSocialWarningOpen(true);
            }} 
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title="Instagram Notice"
          >
            <InstagramIcon className="w-4 h-4 text-slate-400 hover:text-pink-400" />
          </button>
        </div>
      </footer>

      {/* Social Warning & Scam Advisory Modal */}
      <SocialWarningModal
        isOpen={socialWarningOpen}
        onClose={() => setSocialWarningOpen(false)}
        platform={socialWarningPlatform}
      />

      {/* Modals & Subdomain Portals */}
      <BranchPortalModal
        branch={selectedBranchForPortal}
        isOpen={!!selectedBranchForPortal}
        onClose={() => setSelectedBranchForPortal(null)}
        onLaunchSandbox={(sectorId) => handleEnterParadox(sectorId)}
      />

      <CommandDeckOS
        isOpen={commandDeckOpen}
        onClose={() => setCommandDeckOpen(false)}
        initialSector={commandDeckSector}
      />

      <GatewayModal 
        isOpen={gatewayOpen} 
        onClose={() => setGatewayOpen(false)} 
        initialTab={gatewayInitialTab}
      />

      <ExploreModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onOpenGateway={(tab) => openGatewayWithTab(tab)}
      />

    </div>
  );
}
