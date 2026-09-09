import React from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import Button from '../ui/Button';
import SecurityScanWidget from '../widgets/SecurityScanWidget';
import { ShieldCheck, Calendar, ArrowDown } from 'lucide-react';

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 1.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Premium dark-theme background lighting effects */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={glowVariants}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] bg-accent-gold pointer-events-none -z-10"
      />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={glowVariants}
        className="absolute top-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[140px] bg-accent-emerald pointer-events-none -z-10"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Top Announcement Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 sm:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald shadow-[0_0_8px_#10b981]"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase text-text-primary">
            Client Solutions & Full-Stack Engineering
          </span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-text-primary leading-[1.08] max-w-5xl mb-5 sm:mb-6 px-1"
        >
          I build <span className="text-accent-gold italic font-serif font-normal">secure</span>, revenue-generating digital systems.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-text-muted max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans font-normal px-2"
        >
          A premium web development, WordPress, and security engineering service for clinics, high-growth startups, and businesses. Stop losing clients to missed calls and unprotected websites.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-14 sm:mb-20 w-full max-w-md sm:max-w-none"
        >
          <Button href="#contact" variant="primary" magnetic={true} className="w-full sm:w-auto py-3 px-6 text-sm">
            Book Free Consultation <Calendar className="w-4 h-4" />
          </Button>
          <Button href="#scan-widget" variant="secondary" magnetic={true} className="w-full sm:w-auto py-3 px-6 text-sm">
            Test Website Security <ShieldCheck className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Lead Magnet Scan Widget Container */}
        <motion.div
          id="scan-widget"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="w-full mb-10 sm:mb-12 scroll-mt-24"
        >
          <SecurityScanWidget />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 sm:mt-8"
        >
          <a href="#services" className="text-text-muted hover:text-accent-gold transition-colors flex flex-col items-center gap-1.5 group">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono font-medium group-hover:text-accent-gold transition-colors">Discover My Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-accent-gold" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
