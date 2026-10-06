import React, { useState, useRef } from 'react';

export default function TiltCard({ 
  children, 
  className = '', 
  onClick, 
  telemetry = null,
  badge = null
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`);
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer transition-all duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Iridescent Prismatic Border & Glow */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: isHovered 
            ? `radial-gradient(circle 180px at ${spotlight.x}% ${spotlight.y}%, rgba(216, 180, 254, 0.8), rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)`
            : 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(255, 255, 255, 0.05), rgba(59, 130, 246, 0.15))',
        }}
      />

      {/* Card Body with Glass Refraction */}
      <div className="relative w-full h-full rounded-2xl bg-[#090615]/50 backdrop-blur-2xl border border-white/10 p-4 sm:p-5 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:border-purple-300/40 group-hover:shadow-[0_12px_40px_rgba(147,51,234,0.25)] transition-all">
        
        {/* Dynamic Light Spotlight on surface */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-0"
          style={{
            background: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, rgba(255, 255, 255, 0.12), transparent 80%)`,
            opacity: spotlight.opacity,
          }}
        />

        {/* Telemetry Header HUD */}
        {(telemetry || badge) && (
          <div className="flex items-center justify-between text-[10px] font-mono-accent tracking-wider text-purple-300/70 mb-2 pb-1 border-b border-white/5">
            {telemetry && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                {telemetry}
              </span>
            )}
            {badge && (
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30 text-[9px] uppercase font-bold">
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Subtle Corner Crosshairs */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-white/20 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-white/20 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-white/20 pointer-events-none" />
      </div>
    </div>
  );
}
