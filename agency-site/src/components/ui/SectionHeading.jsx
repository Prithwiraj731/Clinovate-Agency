import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ 
  title, 
  subtitle, 
  description, 
  align = 'center',
  accent = 'gold' 
}) {
  const isLeft = align === 'left';
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const badgeColor = accent === 'emerald' 
    ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/25 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
    : 'text-accent-gold bg-accent-gold/10 border-accent-gold/25 shadow-[0_0_15px_rgba(201,162,39,0.15)]';

  const dotColor = accent === 'emerald' ? 'bg-accent-emerald' : 'bg-accent-gold';

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`max-w-3xl mb-12 sm:mb-16 ${isLeft ? 'text-left' : 'mx-auto text-center'}`}
    >
      {subtitle && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-mono font-medium tracking-widest uppercase rounded-full border ${badgeColor} mb-4 backdrop-blur-md`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
          <span>{subtitle}</span>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-text-primary tracking-tight leading-[1.15] mb-4 sm:mb-5">
        {title}
      </h2>
      
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans font-normal max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
