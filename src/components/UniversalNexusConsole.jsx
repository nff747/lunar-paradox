import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  CornerDownLeft,
  X,
  Sparkles,
  Sliders,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import { BRANCHES } from './EcosystemLauncher';

const BRANCH_ICONS = {
  studio: Sparkles,
  forge: Sliders,
  labs: FlaskConical,
  vault: ShieldCheck,
};

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

  // Global '/' shortcut to focus search
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

  const getFilteredResults = () => {
    if (!query.trim()) {
      return [
        {
          id: 'b-studio',
          title: 'Lunar Studio',
          subdomain: 'studio.lunarparadox.com',
          desc: 'Spatial 3D experiences, generative web systems, and creative engineering.',
          branchId: 'studio',
        },
        {
          id: 'b-forge',
          title: 'Lunar Forge',
          subdomain: 'forge.lunarparadox.com',
          desc: 'Color harmony matrix, WCAG 2.1 accessibility auditing, and token laboratory.',
          branchId: 'forge',
        },
        {
          id: 'b-labs',
          title: 'Lunar Labs',
          subdomain: 'labs.lunarparadox.com',
          desc: 'Frontier AI models, neural interfaces, and autonomous agent systems.',
          branchId: 'labs',
        },
        {
          id: 'b-vault',
          title: 'Lunar Vault',
          subdomain: 'vault.lunarparadox.com',
          desc: 'Production case studies, verified benchmarks, and flagship releases.',
          branchId: 'vault',
        },
      ];
    }

    const q = query.toLowerCase();
    const results = [];

    BRANCHES.forEach(b => {
      if (b.name.toLowerCase().includes(q) || b.subdomain.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q)) {
        results.push({
          id: `branch-${b.id}`,
          title: b.name,
          subdomain: b.subdomain,
          desc: b.desc,
          branchId: b.id,
        });
      }
    });

    if ('contrast color palette forge token wcag'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-contrast',
        title: 'Color & Contrast Validator',
        subdomain: 'forge.lunarparadox.com/contrast',
        desc: 'Audit APCA and WCAG AAA contrast ratios for OLED dark surfaces.',
        branchId: 'forge',
      });
    }

    if ('quote budget estimate pricing cost scope'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-quote',
        title: 'Project Scope & Budget Estimator',
        subdomain: 'studio.lunarparadox.com/estimator',
        desc: 'Calculate enterprise timelines and architecture investments.',
        branchId: 'studio',
      });
    }

    if ('status latency uptime health ping'.split(' ').some(k => q.includes(k))) {
      results.push({
        id: 'tool-status',
        title: 'Global Edge Status',
        subdomain: 'status.lunarparadox.com',
        desc: 'Global node uptime: 99.98% across all regions.',
        branchId: 'status',
      });
    }

    if (results.length === 0) {
      results.push({
        id: 'query-search',
        title: `Search for "${query}"`,
        subdomain: 'docs.lunarparadox.com',
        desc: 'Search API specifications, architecture guides, and components.',
        branchId: 'docs',
      });
    }

    return results;
  };

  const results = getFilteredResults();

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
    <div className="w-full max-w-[560px] mx-auto relative z-40 px-4" ref={consoleRef}>
      
      {/* Apple Spotlight / Perplexity Search Container */}
      <div 
        className={`w-full transition-all duration-300 ease-out ${
          isFocused
            ? 'liquid-glass rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)]'
            : 'liquid-glass rounded-2xl hover:border-white/[0.18] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Search Input Row */}
        <div className="flex items-center px-5 py-3.5 gap-3">
          
          <Search className={`w-[18px] h-[18px] shrink-0 transition-colors ${
            isFocused ? 'text-white' : 'text-[#86868b]'
          }`} />

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
            placeholder="Search Lunar Paradox..."
            className="w-full bg-transparent text-[15px] text-white placeholder-[#636366] font-normal outline-none tracking-[-0.01em]"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-[#636366] hover:text-white rounded-full hover:bg-white/[0.1] transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-mono text-[#636366] bg-white/[0.06] border border-white/[0.08] rounded-md shrink-0">
            ⌘K
          </kbd>

        </div>

        {/* Results Dropdown */}
        {isFocused && (
          <div className="border-t border-white/[0.08]">
            
            <div className="px-5 py-2 text-[10px] font-medium text-[#636366] uppercase tracking-widest">
              {query ? 'Results' : 'Explore'}
            </div>

            <div className="pb-2">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = BRANCH_ICONS[item.branchId] || Search;
                return (
                  <div
                    key={item.id}
                    onMouseDown={() => handleExecuteResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3.5 px-5 py-2.5 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-white/[0.08]'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-white/[0.12] text-white' : 'bg-white/[0.05] text-[#86868b]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#636366] font-mono truncate">
                          {item.subdomain}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#86868b] truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>

                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#636366] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
