import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  CornerDownLeft,
  X,
  ArrowUpRight
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

  // Global '/' shortcut to focus search, just like Linear & GitHub
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

  // Professional Ecosystem Index
  const getFilteredResults = () => {
    if (!query.trim()) {
      return [
        {
          id: 'b-studio',
          category: 'Platforms',
          title: 'Lunar Studio',
          subdomain: 'studio.lunarparadox.com',
          desc: 'Spatial 3D experiences, generative web systems, and creative engineering.',
          branchId: 'studio',
          badge: 'Platform',
        },
        {
          id: 'b-forge',
          category: 'Developer Tools',
          title: 'Lunar Forge',
          subdomain: 'forge.lunarparadox.com',
          desc: 'Color harmony matrix, WCAG 2.1 accessibility auditing, and token laboratory.',
          branchId: 'forge',
          badge: 'Tools',
        },
        {
          id: 'b-labs',
          category: 'Research',
          title: 'Lunar Labs',
          subdomain: 'labs.lunarparadox.com',
          desc: 'Frontier AI models, neural interfaces, and autonomous agent systems.',
          branchId: 'labs',
          badge: 'R&D',
        },
        {
          id: 'b-vault',
          category: 'Archive',
          title: 'Lunar Vault',
          subdomain: 'vault.lunarparadox.com',
          desc: 'Production case studies, verified benchmarks, and flagship releases.',
          branchId: 'vault',
          badge: 'Registry',
        },
      ];
    }

    const q = query.toLowerCase();
    const results = [];

    BRANCHES.forEach(b => {
      if (b.name.toLowerCase().includes(q) || b.subdomain.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q)) {
        results.push({
          id: `branch-${b.id}`,
          category: 'Platforms',
          title: b.name,
          subdomain: b.subdomain,
          desc: b.desc,
          branchId: b.id,
          badge: 'Platform',
        });
      }
    });

    if ('contrast color palette forge token wcag'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-contrast',
        category: 'Developer Tools',
        title: 'Color & Contrast Validator',
        subdomain: 'forge.lunarparadox.com/contrast',
        desc: 'Audit APCA and WCAG AAA contrast ratios for OLED dark surfaces.',
        branchId: 'forge',
        badge: 'Utility',
      });
    }

    if ('quote budget estimate pricing cost scope'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-quote',
        category: 'Services',
        title: 'Project Scope & Budget Estimator',
        subdomain: 'studio.lunarparadox.com/estimator',
        desc: 'Calculate enterprise timelines and architecture investments.',
        branchId: 'studio',
        badge: 'Estimator',
      });
    }

    if ('status latency uptime health ping'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-status',
        category: 'Infrastructure',
        title: 'Global Edge Status',
        subdomain: 'status.lunarparadox.com',
        desc: 'Global node uptime: 99.98% across all regions.',
        branchId: 'status',
        badge: 'Status',
      });
    }

    if (results.length === 0) {
      results.push({
        id: 'query-search',
        category: 'Search',
        title: `Search documentation for "${query}"`,
        subdomain: 'docs.lunarparadox.com',
        desc: 'Search API specifications, architecture guides, and components.',
        branchId: 'docs',
        badge: 'Docs',
      });
    }

    return results;
  };

  const results = getFilteredResults();

  // Keyboard navigation
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
      if (selected) handleExecuteResult(selected);
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  const handleExecuteResult = (item) => {
    setIsFocused(false);
    if (item.branchId) {
      const branch = BRANCHES.find(b => b.id === item.branchId) || BRANCHES[0];
      onSelectBranch(branch);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center relative z-40 px-3" ref={consoleRef}>
      
      {/* ========================================================================= */}
      {/* PROFESSIONAL MINIMALIST SEARCH BAR (LINEAR / APPLE STYLE)                 */}
      {/* ========================================================================= */}
      <div 
        className={`w-full transition-all duration-200 ${
          isFocused
            ? 'rounded-t-xl bg-[#0e1015] border-x border-t border-zinc-700 shadow-2xl'
            : 'rounded-xl bg-[#0c0d11]/90 hover:bg-[#111317] border border-zinc-800 hover:border-zinc-700 shadow-lg'
        }`}
      >
        <div className="flex items-center px-4 py-3 gap-3">
          
          {/* Minimalist Search Icon */}
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />

          {/* Clean Input */}
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
            placeholder="Search ecosystem, platforms, or tools... (Press /)"
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 font-normal outline-none tracking-normal"
          />

          {/* Clear button */}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Clean Keyboard Shortcut */}
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded">
              ⌘K
            </kbd>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CLEAN INTEGRATED RESULTS (ZERO BLEED-THROUGH, PURE SOLID ZINC TONES)      */}
        {/* ========================================================================= */}
        {isFocused && (
          <div className="border-t border-zinc-800 bg-[#0e1015] rounded-b-xl overflow-hidden">
            
            <div className="px-4 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between border-b border-zinc-800/60">
              <span>{query ? 'Results' : 'Suggested Platforms'}</span>
              <span>↑↓ Navigate • ↵ Select • Esc Close</span>
            </div>

            <div className="flex flex-col py-1 max-h-60 overflow-y-auto">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onMouseDown={() => handleExecuteResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-zinc-800/80 text-white'
                        : 'text-zinc-300 hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-100">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {item.subdomain}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        {item.badge}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* CLEAN SUBDOMAIN SHORTCUTS (NO PILL OVERLOAD, MINIMALIST TEXT LINKS)        */}
      {/* ========================================================================= */}
      {!isFocused && (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-xs text-zinc-400">
          <span className="text-zinc-600 font-mono text-[11px]">Branches:</span>
          {BRANCHES.slice(0, 4).map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectBranch(b)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium text-xs"
            >
              <span>{b.name.replace('Lunar ', '')}</span>
              <span className="text-[10px] text-zinc-600 font-mono">↗</span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
