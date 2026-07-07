import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import { faqs } from '../../data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#09090D] relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="Common questions. Straight answers."
          subtitle="Frequently Asked Questions"
          description="Everything you need to know about our custom development scopes, clinical database security, and AI integrations."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            
            return (
              <div 
                key={idx}
                className="border border-white/5 bg-bg-surface/40 backdrop-blur rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-gold/20"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                    <span className="font-serif text-base md:text-lg font-bold text-text-primary">
                      {faq.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded bg-white/5 text-text-muted shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-white/5 bg-bg/25"
                    >
                      <div className="p-5 md:p-6 text-sm text-text-muted leading-relaxed font-sans font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
