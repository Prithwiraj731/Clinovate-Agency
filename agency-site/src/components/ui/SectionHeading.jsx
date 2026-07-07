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
    ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20' 
    : 'text-accent-gold bg-accent-gold/10 border-accent-gold/20';

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`max-w-3xl mb-16 ${isLeft ? 'text-left' : 'mx-auto text-center'}`}
    >
      {subtitle && (
        <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border ${badgeColor} mb-4`}>
          {subtitle}
        </span>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight mb-6">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg md:text-xl text-text-muted leading-relaxed font-sans font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
}
