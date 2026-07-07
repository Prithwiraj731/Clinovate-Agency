import React from 'react';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr ${className}`}>
      {children}
    </div>
  );
}

export function BentoGridItem({ 
  children, 
  colSpan = 'md:col-span-1', 
  className = '',
  delay = 0 
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
      className={`${colSpan} ${className}`}
    >
      {children}
    </motion.div>
  );
}
