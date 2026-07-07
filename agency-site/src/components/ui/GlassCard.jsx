import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = '', 
  glowColor = 'none', // 'gold' | 'emerald' | 'none'
  hoverGlow = true
}) {
  let cardStyle = "relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300 ";
  
  if (glowColor === 'emerald') {
    cardStyle += "glass-card-emerald ";
  } else if (glowColor === 'gold') {
    cardStyle += "glass-card-gold ";
  } else {
    cardStyle += "glass-card ";
  }

  const hoverVariants = {
    initial: { y: 0, scale: 1 },
    hover: { 
      y: -6, 
      scale: 1.01,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover={hoverGlow ? "hover" : "initial"}
      variants={hoverVariants}
      className={`${cardStyle} ${className}`}
    >
      {/* Background radial gradient glow blob */}
      {glowColor !== 'none' && (
        <div 
          className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30 ${
            glowColor === 'emerald' ? 'bg-accent-emerald' : 'bg-accent-gold'
          }`}
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
