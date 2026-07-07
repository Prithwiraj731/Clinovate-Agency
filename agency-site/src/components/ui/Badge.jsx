import React from 'react';

export default function Badge({ 
  children, 
  variant = 'gold', // 'gold' | 'emerald' | 'gray'
  className = '' 
}) {
  let badgeStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border ";

  if (variant === 'gold') {
    badgeStyle += "text-accent-gold bg-accent-gold/10 border-accent-gold/20";
  } else if (variant === 'emerald') {
    badgeStyle += "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20";
  } else {
    badgeStyle += "text-text-muted bg-white/5 border-white/10";
  }

  return (
    <span className={`${badgeStyle} ${className}`}>
      {children}
    </span>
  );
}
