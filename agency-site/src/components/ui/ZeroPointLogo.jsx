import React from 'react';

export default function ZeroPointLogo({ iconOnly = false, className = "h-7 w-auto" }) {
  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* ZEROPOINT Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
        >
          {/* Target outer dashed tracking orbit */}
          <circle cx="16" cy="16" r="14" stroke="#C9A227" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
          {/* Inner ring */}
          <circle cx="16" cy="16" r="9.5" stroke="#C9A227" strokeWidth="2.5" />
          {/* Glowing origin singularity point */}
          <circle cx="16" cy="16" r="3.8" fill="#00FF84" />
          {/* Cardinal coordinate crosshairs */}
          <line x1="16" y1="2" x2="16" y2="6" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="26" x2="16" y2="30" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="16" x2="6" y2="16" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="16" x2="30" y2="16" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {/* Ambient glow behind mark */}
        <div className="absolute inset-0 bg-accent-gold/25 blur-md rounded-full -z-10 group-hover:bg-accent-gold/45 transition-colors" />
      </div>

      {/* Typography */}
      {!iconOnly && (
        <span className="font-serif text-2xl font-black tracking-tight text-text-primary">
          ZERO<span className="text-accent-gold">POINT</span>
        </span>
      )}
    </div>
  );
}
