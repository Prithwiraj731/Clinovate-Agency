import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hoverBorder = true,
  onClick
}) {
  const cardVariants = {
    initial: { y: 0, scale: 1 },
    hover: { 
      y: -4, 
      scale: 1.01,
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const interactiveProps = onClick ? {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }
  } : {};

  return (
    <motion.div
      initial="initial"
      whileHover={hoverBorder ? "hover" : "initial"}
      variants={cardVariants}
      {...interactiveProps}
      className={`bg-bg-surface border border-white/[0.03] rounded-xl p-6 md:p-8 transition-all duration-300 ${
        hoverBorder ? 'hover:border-accent-gold/20' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
