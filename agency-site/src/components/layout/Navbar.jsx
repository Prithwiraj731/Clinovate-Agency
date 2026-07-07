import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Container from './Container';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "Security", href: "#security" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ];

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      onNavigate('home');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-bg-surface/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="text-accent-gold w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent-gold/25 blur-md rounded-full -z-10 group-hover:bg-accent-gold/40 transition-colors" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">
                Clino<span className="text-accent-gold">vate</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-sm font-medium text-text-muted hover:text-accent-gold transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={(e) => handleLinkClick(e, '#contact')}
                variant="secondary" 
                magnetic={true} 
                className="py-2.5 px-5 text-sm"
              >
                Book Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[72px] left-0 w-full bg-bg-surface border-b border-white/5 z-40 lg:hidden overflow-hidden shadow-2xl"
          >
            <Container className="py-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-sans text-base font-medium text-text-muted hover:text-accent-gold py-2 border-b border-white/5 last:border-0 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <Button 
                onClick={(e) => handleLinkClick(e, '#contact')}
                variant="primary" 
                className="w-full"
              >
                Book Consultation
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
