import React from 'react';

// Black Hole / Gravitational Eclipse Icon for "THE ECLIPSE PROTOCOL"
export function BlackHoleIcon() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-md animate-pulse"></div>
      
      {/* Gravitational accretion ring */}
      <div 
        className="absolute w-12 h-12 rounded-full border border-purple-300/60 shadow-[0_0_15px_rgba(192,132,252,0.8)]"
        style={{
          background: 'radial-gradient(circle, rgba(10,5,25,1) 35%, rgba(139,92,246,0.5) 75%, rgba(220,180,255,0.9) 100%)'
        }}
      ></div>

      {/* Event Horizon (Black Void) */}
      <div className="relative w-6 h-6 rounded-full bg-black shadow-[inset_0_0_8px_rgba(0,0,0,1)] border border-purple-950"></div>

      {/* Accretion lens flare */}
      <div className="absolute w-14 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent rotate-[-25deg] blur-[0.5px]"></div>
    </div>
  );
}

// Kinetic Paradox Vortex Icon for "GEN-Z PARADOX"
export function VortexIcon() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer rotating glow */}
      <div className="absolute inset-1 rounded-full bg-purple-600/20 blur-sm"></div>

      {/* Stylized kinetic paradox cross arrows */}
      <svg className="w-12 h-12 text-purple-300" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="21" stroke="rgba(192,132,252,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Core dynamic arrows forming the paradox loop */}
        <path 
          d="M14 24C14 18.4772 18.4772 14 24 14M24 14L20 10M24 14L20 18" 
          stroke="url(#purpleGlow)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M34 24C34 29.5228 29.5228 34 24 34M24 34L28 38M24 34L28 30" 
          stroke="url(#purpleGlow)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Diagonal crossover vectors */}
        <path d="M17 17L31 31M31 17L17 31" stroke="rgba(230,220,255,0.85)" strokeWidth="2" strokeLinecap="round" />

        <defs>
          <linearGradient id="purpleGlow" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3e8ff" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Liquid Chrome Sphere Cluster for "1.4M+ VOID USERS"
export function ChromeSphereCluster() {
  return (
    <div className="relative w-16 h-12 flex items-center justify-center">
      {/* Large central chrome orb */}
      <div 
        className="w-9 h-9 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.8)] relative"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #cbd5e1 25%, #64748b 55%, #1e1b4b 85%, #0f172a 100%)',
          boxShadow: '0 0 14px rgba(220, 210, 255, 0.45), inset -2px -2px 5px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.9)'
        }}
      >
        {/* Specular highlight */}
        <div className="absolute top-1.5 left-2 w-2.5 h-1.5 rounded-full bg-white/90 blur-[0.4px] rotate-[-30deg]"></div>
      </div>

      {/* Orbiting small chrome orb 1 */}
      <div 
        className="absolute top-1 right-2 w-4 h-4 rounded-full shadow-md"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #cbd5e1 30%, #475569 70%, #090d16 100%)',
          boxShadow: '0 0 8px rgba(220, 210, 255, 0.35)'
        }}
      >
        <div className="absolute top-0.5 left-1 w-1 h-0.5 rounded-full bg-white/90"></div>
      </div>

      {/* Orbiting small chrome orb 2 */}
      <div 
        className="absolute bottom-1 left-2 w-3.5 h-3.5 rounded-full shadow-md"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #cbd5e1 30%, #475569 70%, #090d16 100%)',
          boxShadow: '0 0 6px rgba(220, 210, 255, 0.35)'
        }}
      ></div>
    </div>
  );
}

// 3D Fluid Mercury Sculpture for "DIMENSIONAL CREATION"
export function DimensionalSculpture() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div 
        className="w-11 h-11 rounded-[38%_62%_63%_37%/41%_44%_56%_59%] animate-pulse"
        style={{
          background: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #e2e8f0 20%, #94a3b8 45%, #475569 70%, #1e1b4b 95%)',
          boxShadow: '0 0 20px rgba(200, 180, 255, 0.5), inset -3px -3px 8px rgba(0,0,0,0.8), inset 3px 3px 6px rgba(255,255,255,0.95)',
          transform: 'rotate(-15deg)',
          animation: 'floatSlow 6s ease-in-out infinite'
        }}
      >
        {/* Specular fluid light lines */}
        <div className="absolute top-2 left-2 w-4 h-2 rounded-full bg-white/90 blur-[0.5px]"></div>
        <div className="absolute bottom-2.5 right-2 w-3 h-1.5 rounded-full bg-white/70 blur-[0.5px]"></div>
      </div>
    </div>
  );
}

// Glowing Upward Satisfaction Chart for "98% SATISFACTION"
export function ChartIcon() {
  return (
    <div className="relative w-16 h-12 flex items-center justify-center">
      <svg className="w-14 h-10 overflow-visible" viewBox="0 0 60 40" fill="none">
        {/* Diagonal trajectory line with glow */}
        <path 
          d="M4 32 L20 25 L34 28 L54 8" 
          stroke="rgba(240, 235, 255, 0.95)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="drop-shadow-[0_0_8px_rgba(192,132,252,0.85)]"
        />
        {/* Arrow head */}
        <path 
          d="M44 8 H54 V18" 
          stroke="rgba(240, 235, 255, 0.95)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="drop-shadow-[0_0_8px_rgba(192,132,252,0.85)]"
        />

        {/* Speed trail bars underneath */}
        <line x1="12" y1="36" x2="24" y2="24" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="36" x2="38" y2="24" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="36" x2="52" y2="24" stroke="rgba(168,85,247,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
