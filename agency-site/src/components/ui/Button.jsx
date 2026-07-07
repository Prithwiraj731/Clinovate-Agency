import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  type = 'button',
  magnetic = false,
  className = '',
  disabled = false
}) {
  const ref = useRef(null);
  
  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic response
  const springX = useSpring(x, { stiffness: 120, damping: 12, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 12, mass: 0.8 });

  const handleMouseMove = (e) => {
    if (!magnetic || disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and scale effect (max offset 12px)
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base styles
  let btnStyle = "relative inline-flex items-center justify-center px-6 py-3 font-sans font-semibold rounded-lg overflow-hidden transition-colors duration-300 z-10 select-none ";
  
  // Variant styles
  if (variant === 'primary') {
    btnStyle += "bg-accent-gold text-bg font-bold shadow-lg shadow-accent-gold/10 hover:bg-[#b08e20] active:scale-95";
  } else if (variant === 'secondary') {
    btnStyle += "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 active:scale-95";
  } else if (variant === 'emerald') {
    btnStyle += "bg-accent-emerald text-bg font-bold shadow-lg shadow-accent-emerald/10 hover:bg-[#0e9f6e] active:scale-95";
  } else if (variant === 'emerald-outline') {
    btnStyle += "border border-accent-emerald/40 text-accent-emerald hover:bg-accent-emerald/10 active:scale-95";
  } else if (variant === 'text') {
    btnStyle = "inline-flex items-center text-accent-gold hover:text-white transition-colors duration-200 group font-sans font-semibold ";
  }

  const content = (
    <span className="flex items-center gap-2">
      {children}
    </span>
  );

  // If simple text variant, render normal motion anchor/button
  if (variant === 'text') {
    if (href) {
      if (href.startsWith('#')) {
        return (
          <a href={href} onClick={onClick} className={`${btnStyle} ${className}`}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} className={`${btnStyle} ${className}`}>
          {children}
        </a>
      );
    }
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${btnStyle} ${className}`}>
        {children}
      </button>
    );
  }

  // Magnetic interactive motion container
  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: magnetic ? { x: springX, y: springY } : {},
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: `${btnStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
  };

  if (href) {
    if (href.startsWith('#')) {
      return (
        <motion.a 
          {...motionProps} 
          href={href} 
          onClick={onClick}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.a 
        {...motionProps} 
        href={href}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      {...motionProps} 
      type={type} 
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
