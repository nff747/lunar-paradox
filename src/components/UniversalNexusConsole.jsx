import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Sliders, 
  FlaskConical, 
  ShieldCheck, 
  CornerDownLeft,
  X,
  Compass,
  Zap,
  Activity
} from 'lucide-react';
import { BRANCHES } from './EcosystemLauncher';

export default function UniversalNexusConsole({ 
  onSelectBranch, 
  onEnterParadox, 
  onOpenGateway 
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const consoleRef = useRef(null);

  // Global '/' shortcut to focus search, just like Google & GitHub
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dismiss on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (consoleRef.current && !consoleRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered ecosystem actions
  const getFilteredResults = () => {
    if (!query.trim()) {
      return [
        {
          id: 'b-studio',
          type: 'branch',
          title: 'Lunar Studio',
          subdomain: 'studio.lunarparadox.com',
          subtitle: 'Launch real-time 3D spatial scenes & generative engine',
          icon: Sparkles,
          branchId: 'studio',
          tag: 'Subdomain',
        },
        {
          id: 'b-forge',
          type: 'branch',
          title: 'Lunar Forge',
          subdomain: 'forge.lunarparadox.com',
          subtitle: 'Free color theory, WCAG contrast & token laboratory',
          icon: Sliders,
          branchId: 'forge',
          tag: 'Free Branch',
        },
        {
          id: 'b-labs',
          type: 'branch',
          title: 'Lunar Labs',
          subdomain: 'labs.lunarparadox.com',
          subtitle: 'Frontier neural models & experimental intelligence',
          icon: FlaskConical,
          branchId: 'labs',
          tag: 'R&D',
        },
        {
          id: 'b-vault',
          type: 'branch',
          title: 'Lunar Vault',
          subdomain: 'vault.lunarparadox.com',
          subtitle: 'Cryptographic asset registry & genesis collection',
          icon: ShieldCheck,
          branchId: 'vault',
          tag: 'Registry',
        },
      ];
    }

    const q = query.toLowerCase();
    const results = [];

    // Match branches
    BRANCHES.forEach(b => {
      if (b.name.toLowerCase().includes(q) || b.subdomain.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q)) {
        results.push({
          id: `branch-${b.id}`,
          type: 'branch',
          title: b.name,
          subdomain: b.subdomain,
          subtitle: b.desc,
          icon: b.icon,
          branchId: b.id,
          tag: 'Subdomain',
        });
      }
    });

    // Special quick actions
    if ('contrast color palette forge token lab'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'action-contrast',
        type: 'action',
        title: 'Launch Color & Contrast Matrix',
        subdomain: 'forge.lunarparadox.com/contrast',
        subtitle: 'Test APCA & WCAG AAA contrast ratio on dark OLED displays',
        icon: Sliders,
        branchId: 'forge',
        tag: 'Tool',
      });
    }

    if ('quote budget pricing agency studio 3d estimate'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'action-quote',
        type: 'action',
        title: 'Compute Studio Production Scope',
        subdomain: 'studio.lunarparadox.com/quote',
        subtitle: 'Interactive real-time production & engineering cost estimator',
        icon: Sparkles,
        branchId: 'studio',
        tag: 'Estimator',
      });
    }

    if ('status latency uptime nodes health ping telemetry'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'action-status',
        type: 'action',
        title: 'Network Telemetry: 42 Nodes Synchronized',
        subdomain: 'status.lunarparadox.com',
        subtitle: 'Dimension 00 consensus 98.4% // Edge latency 12ms',
        icon: Activity,
        branchId: 'status',
        tag: 'Telemetry',
      });
    }

    if ('login pass invite access key gateway auth'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'action-gateway',
        type: 'gateway',
        title: 'Authentication & Invitation Gateway',
        subdomain: 'auth.lunarparadox.com',
        subtitle: 'Enter invitation key or wire direct client request',
        icon: Zap,
        action: () => onOpenGateway('invite'),
        tag: 'Auth',
      });
    }

    // Fallback neural matrix query
    if (results.length === 0) {
      results.push({
        id: 'query-matrix',
        type: 'matrix',
        title: `Query Neural Matrix for "${query}"`,
        subdomain: 'labs.lunarparadox.com/neural',
        subtitle: 'Execute zero-shot synthesis across Lunar Paradox knowledge graph',
        icon: Compass,
        branchId: 'labs',
        tag: 'AI Synthesis',
      });
    }

    return results;
  };

  const results = getFilteredResults();

  // Keyboard navigation inside results
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        handleExecuteResult(selected);
      } else {
        handleFeelingParadoxical();
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  const handleExecuteResult = (item) => {
    setIsFocused(false);
    if (item.action) {
      item.action();
    } else if (item.branchId) {
      const branch = BRANCHES.find(b => b.id === item.branchId) || BRANCHES[0];
      onSelectBranch(branch);
    }
  };

  // "I'm Feeling Paradoxical" (Google's "I'm Feeling Lucky" homage)
  const handleFeelingParadoxical = () => {
    setIsFocused(false);
    const randomBranch = BRANCHES[Math.floor(Math.random() * 4)];
    onSelectBranch(randomBranch);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative z-40 px-2" ref={consoleRef}>
      
      {/* ========================================================================= */}
      {/* 1. THE STEM OMNIBAR (APPLE VISIONOS CONTAINER)                            */}
      {/* ========================================================================= */}
      <div 
        className={`relative w-full rounded-2xl md:rounded-3xl transition-all duration-300 ${
          isFocused
            ? 'bg-[#0b0a12] border-sky-400/50 shadow-[0_0_50px_rgba(56,189,248,0.25),0_20px_50px_rgba(0,0,0,0.95)]'
            : 'bg-[#100f18]/80 hover:bg-[#13121f]/95 border-white/[0.14] hover:border-white/[0.25] shadow-[0_10px_35px_rgba(0,0,0,0.7)]'
        } border`}
      >
        <div className="flex items-center px-4 md:px-5 py-3 md:py-3.5 gap-3">
          
          {/* Leading Icon */}
          <div className="text-slate-400 shrink-0">
            {isFocused ? (
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            ) : (
              <Search className="w-4 h-4 text-slate-400" />
            )}
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search ecosystem, launch branches, or type a command... (Press /)"
            className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-500 font-body outline-none tracking-wide"
          />

          {/* Clear button if text entered */}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Shortcut Keys Badge */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <kbd className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/10 rounded-md">
              /
            </kbd>
            <kbd className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/10 rounded-md">
              ⌘K
            </kbd>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. AUTOCOMPLETE RESULTS (INTEGRATED INSIDE THE BOX, 100% OPAQUE)          */}
        {/* ========================================================================= */}
        {isFocused && (
          <div className="border-t border-white/[0.08] p-2.5 bg-[#0b0a12] rounded-b-2xl md:rounded-b-3xl">
            
            <div className="px-3 py-1.5 text-[10px] font-mono text-[#86868b] uppercase tracking-wider flex items-center justify-between">
              <span>{query ? 'Matching Ecosystem Nodes' : 'Ecosystem Branches & Quick Launch'}</span>
              <span className="hidden sm:inline">Use ↑↓ keys • ↵ to select</span>
            </div>

            <div className="flex flex-col gap-1 mt-1 max-h-56 sm:max-h-64 overflow-y-auto">
              {results.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onMouseDown={() => handleExecuteResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-white/[0.12] border border-white/[0.2] text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                        : 'text-slate-300 hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-500/25 text-sky-300' : 'bg-white/[0.06] text-slate-400'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-heading font-semibold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">
                            ({item.subdomain})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                        {item.tag}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-3 h-3 text-sky-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions inside Autocomplete Box */}
            <div className="mt-2.5 pt-2.5 border-t border-white/[0.08] flex items-center justify-between px-2 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <button
                  onMouseDown={() => {
                    const match = results[0];
                    if (match) handleExecuteResult(match);
                  }}
                  className="px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Execute Search</span>
                </button>
                <button
                  onMouseDown={handleFeelingParadoxical}
                  className="px-3 py-1 rounded-full bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>Feeling Paradoxical</span>
                </button>
              </div>

              <div className="text-[#86868b] flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px]">ESC</kbd>
                <span>to close</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. GOOGLE-STYLE DUAL ACTION BUTTONS (ONLY VISIBLE WHEN NOT SEARCHING)     */}
      {/* ========================================================================= */}
      {!isFocused && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            
            {/* Button 1: Nexus Search */}
            <button
              onClick={() => {
                inputRef.current?.focus();
                setIsFocused(true);
              }}
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-xs font-heading font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Nexus Search</span>
            </button>

            {/* Button 2: I'm Feeling Paradoxical ✦ */}
            <button
              onClick={handleFeelingParadoxical}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/15 to-purple-500/15 hover:from-sky-500/25 hover:to-purple-500/25 border border-sky-400/20 hover:border-sky-400/40 text-xs font-heading font-medium text-sky-200 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.1)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>I'm Feeling Paradoxical ✦</span>
            </button>

          </div>

          {/* 4. QUICK SUBDOMAIN BRANCH PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-1">
            <span className="text-[10px] font-mono text-slate-400 font-medium uppercase mr-1 tracking-wider">
              Direct Branches:
            </span>
            
            {BRANCHES.slice(0, 4).map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBranch(b)}
                className="px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/[0.2] text-[11px] font-body text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white" />
                <span>{b.name.replace('Lunar ', '')}</span>
                <span className="text-[9px] text-slate-400 font-mono">↗</span>
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
