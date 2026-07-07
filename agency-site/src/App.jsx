import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Layout & Sections
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import WhyUs from './components/sections/WhyUs';
import Process from './components/sections/Process';
import SecuritySection from './components/sections/SecuritySection';
import CaseStudies from './components/sections/CaseStudies';
import Pricing from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

// Privacy & Terms Pages
import PrivacyPolicy from './components/sections/PrivacyPolicy';
import TermsOfService from './components/sections/TermsOfService';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'privacy' | 'terms'
  const [cursorHidden, setCursorHidden] = useState(true);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for the spring custom cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for tracking delay
  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 25, mass: 0.5 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 25, mass: 0.5 });

  useEffect(() => {
    (async function () {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi({"namespace":"custom-meeting"});
        cal("ui", {
          "styles":{"branding":{"brandColor":"#0B0B0F"}},
          "hideEventTypeDetails":false,
          "layout":"month_view"
        });
      } catch (e) {
        console.error("Cal.com embed loading error:", e);
      }
    })();
  }, []);

  useEffect(() => {
    // Detect touch device
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    if (hasTouch) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorHidden) setCursorHidden(false);
    };

    const handleMouseLeave = () => setCursorHidden(true);
    const handleMouseEnter = () => setCursorHidden(false);

    // Track when hovering over interactive elements
    const handleHoverStart = () => setCursorHovered(true);
    const handleHoverEnd = () => setCursorHovered(false);

    const setupInteractiveListeners = () => {
      const targets = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
      targets.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Setup listener scan for dynamically rendered DOM nodes
    const observer = new MutationObserver(setupInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    setupInteractiveListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorHidden, mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden selection:bg-accent-gold/30 selection:text-white">
      {/* Ambient noise grain texture overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor (hidden on touchscreens or when offscreen) */}
      {!isTouchDevice && !cursorHidden && (
        <>
          {/* Inner Dot */}
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-gold pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
            style={{ x: mouseX, y: mouseY }}
            animate={{ scale: cursorHovered ? 1.5 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {/* Outer Ring */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-gold/30 pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2"
            style={{ x: cursorSpringX, y: cursorSpringY }}
            animate={{ 
              scale: cursorHovered ? 1.3 : 1,
              backgroundColor: cursorHovered ? 'rgba(201, 162, 39, 0.05)' : 'rgba(201, 162, 39, 0)',
              borderColor: cursorHovered ? 'rgba(201, 162, 39, 0.6)' : 'rgba(201, 162, 39, 0.3)'
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        </>
      )}

      {/* Website Core Layout */}
      <Navbar onNavigate={setCurrentView} />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <Services />
            <WhyUs />
            <Process />
            <SecuritySection />
            <CaseStudies />
            <Pricing />
            <Testimonials />
            <FAQ />
            <Contact />
          </>
        )}
        {currentView === 'privacy' && <PrivacyPolicy onNavigate={setCurrentView} />}
        {currentView === 'terms' && <TermsOfService onNavigate={setCurrentView} />}
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
