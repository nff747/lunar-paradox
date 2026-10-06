import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  LogIn, 
  Menu,
  X
} from 'lucide-react';
import GatewayModal from './components/GatewayModal';
import ExploreModal from './components/ExploreModal';
import CommandDeckOS from './components/CommandDeckOS';
import CelestialMoonCanvas from './components/CelestialMoonCanvas';
import EcosystemLauncher, { BRANCHES } from './components/EcosystemLauncher';
import UniversalNexusConsole from './components/UniversalNexusConsole';
import BranchPortalModal from './components/BranchPortalModal';
import SocialWarningModal from './components/SocialWarningModal';
import LegalModal from './components/LegalModal';
import { DiscordIcon, XIcon, InstagramIcon } from './components/SocialIcons';
import { audioManager } from './utils/audio';

export default function App() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [gatewayInitialTab, setGatewayInitialTab] = useState('invite');
  const [exploreOpen, setExploreOpen] = useState(false);
  const [commandDeckOpen, setCommandDeckOpen] = useState(false);
  const [commandDeckSector, setCommandDeckSector] = useState('studio');
  const [selectedBranchForPortal, setSelectedBranchForPortal] = useState(null);
  const [socialWarningOpen, setSocialWarningOpen] = useState(false);
  const [socialWarningPlatform, setSocialWarningPlatform] = useState('X');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('terms');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const openLegal = (type) => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030108] text-[#f5f5f7] overflow-x-hidden md:overflow-hidden font-body flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO BACKGROUND + 3D CELESTIAL WEBGL MOON OVERLAY           */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030108]">
        {/* Zoomed-Out Space Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.0] md:scale-[0.98] opacity-75"
          style={{ filter: 'brightness(0.92) contrast(1.12)' }}
        >
          <source src="/lunar_bg_desktop_ultra.webm" type="video/webm" />
          <source src="/lunar_bg_1080p.mp4" type="video/mp4" />
        </video>

        {/* Real-time 3D Three.js Moon Canvas (centered to cover video moon, softened halo) */}
        <CelestialMoonCanvas />
        
        {/* Vignette blending edges into deep space */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(3,1,8,0.55) 75%, #030108 100%)' 
          }} 
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. APPLE-GRADE LIQUID GLASS TOP BAR                                       */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="cursor-pointer flex items-center gap-3 shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-base font-semibold tracking-[0.14em] text-white font-display">
            LUNAR PARADOX
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#636366]" />
          <span className="hidden sm:inline-block text-xs text-[#86868b] tracking-wide font-normal">
            Autonomous Spatial Systems
          </span>
        </div>

        {/* Center Navigation Capsule (Apple Liquid Glass) */}
        <nav className="hidden lg:flex items-center gap-1 liquid-glass px-2 py-1.5 rounded-full text-xs font-medium text-[#a1a1a6]">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="px-4 py-1 rounded-full text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'studio'))} 
            className="px-4 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Studio
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'forge'))} 
            className="px-4 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Forge
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'labs'))} 
            className="px-4 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Labs
          </button>
          <button 
            onClick={() => setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'vault'))} 
            className="px-4 py-1 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Vault
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <EcosystemLauncher 
            onSelectBranch={(b) => setSelectedBranchForPortal(b)}
            onOpenCommandOS={() => setCommandDeckOpen(true)}
          />

          {/* Sound Toggle (Apple minimalist icon button) */}
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full liquid-glass text-[#86868b] hover:text-white transition-all cursor-pointer"
            title={isAudioActive ? 'Mute Audio' : 'Play Ambient Audio'}
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Login Pill */}
          <button 
            onClick={() => openGatewayWithTab('invite')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-black" />
            <span>Login</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full liquid-glass text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Liquid Glass) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-40 p-5 liquid-glass rounded-2xl flex flex-col gap-3 text-sm">
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-left py-2 text-white font-medium"
          >
            Home (Stem Platform)
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'studio')); }} 
            className="text-left py-2 text-[#a1a1a6] hover:text-white flex items-center justify-between"
          >
            <span>Studio</span>
            <span className="text-xs text-[#86868b] font-mono">studio.lunarparadox.com</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'forge')); }} 
            className="text-left py-2 text-[#a1a1a6] hover:text-white flex items-center justify-between"
          >
            <span>Forge</span>
            <span className="text-xs text-[#86868b] font-mono">forge.lunarparadox.com</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'labs')); }} 
            className="text-left py-2 text-[#a1a1a6] hover:text-white flex items-center justify-between"
          >
            <span>Labs</span>
            <span className="text-xs text-[#86868b] font-mono">labs.lunarparadox.com</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); setSelectedBranchForPortal(BRANCHES.find(b => b.id === 'vault')); }} 
            className="text-left py-2 text-[#a1a1a6] hover:text-white flex items-center justify-between"
          >
            <span>Vault</span>
            <span className="text-xs text-[#86868b] font-mono">vault.lunarparadox.com</span>
          </button>
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <button 
              onClick={() => openGatewayWithTab('invite')} 
              className="text-xs text-[#86868b] hover:text-white py-1"
            >
              Access Passcode
            </button>
            <button 
              onClick={() => openGatewayWithTab('client')} 
              className="text-xs text-white font-medium py-1"
            >
              Direct Wire
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. THE STEM CORE: CELESTIAL VOID & APPLE SPOTLIGHT SEARCH CONSOLE          */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-4 pb-14 md:pb-18 max-w-4xl mx-auto w-full">
        
        {/* Open celestial area where 3D moon sits centered over the video background */}
        <div className="flex-1 w-full min-h-[300px] md:min-h-[380px] pointer-events-none" />

        {/* APPLE SPOTLIGHT / PERPLEXITY HYBRID SEARCH CONSOLE */}
        <UniversalNexusConsole
          onSelectBranch={(branch) => setSelectedBranchForPortal(branch)}
          onEnterParadox={() => handleEnterParadox('studio')}
          onOpenGateway={(tab) => openGatewayWithTab(tab)}
        />

      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER (CLEAN APPLE MONOCHROME GLASS)                                  */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
        <div className="flex items-center gap-3">
          <span>© 2026 Lunar Paradox, Inc.</span>
          <span className="text-[#3a3a3c]">•</span>
          <button 
            onClick={() => openLegal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </button>
          <span className="text-[#3a3a3c]">•</span>
          <button 
            onClick={() => openLegal('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-[#86868b]">
          <a 
            href="https://discord.gg/wBaJuSFaPw" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="Official Discord Server"
          >
            <DiscordIcon className="w-4 h-4 text-[#86868b] hover:text-[#5865F2]" />
          </a>
          <button 
            onClick={() => {
              setSocialWarningPlatform('X (Twitter)');
              setSocialWarningOpen(true);
            }} 
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title="X (Twitter) Notice"
          >
            <XIcon className="w-4 h-4 text-[#86868b] hover:text-white" />
          </button>
          <button 
            onClick={() => {
              setSocialWarningPlatform('Instagram');
              setSocialWarningOpen(true);
            }} 
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title="Instagram Notice"
          >
            <InstagramIcon className="w-4 h-4 text-[#86868b] hover:text-white" />
          </button>
        </div>
      </footer>

      {/* Modals & Subdomain Portals */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />

      <SocialWarningModal
        isOpen={socialWarningOpen}
        onClose={() => setSocialWarningOpen(false)}
        platform={socialWarningPlatform}
      />

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
