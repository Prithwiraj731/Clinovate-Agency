import React from 'react';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Sparkles, Calendar, Quote, Shield } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      {/* Subtle styling radial glow in background */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full blur-[140px] bg-accent-gold/5 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Your success story. Built by ZEROPOINT."
          subtitle="Case Studies"
          description="I am actively onboarding select clinic partners. Read about my Partner Program opportunity below."
        />

        <div className="max-w-4xl mx-auto">
          <GlassCard glowColor="gold" className="p-6 sm:p-10 md:p-12 text-center relative overflow-hidden">
            {/* Quote marks in background */}
            <Quote className="absolute -top-6 -left-6 w-32 h-32 text-white/[0.02] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-full bg-accent-gold/10 text-accent-gold mb-5 sm:mb-6 border border-accent-gold/20 shadow-[0_0_15px_rgba(201,162,39,0.15)]">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
              </div>

              <Badge variant="gold" className="mb-4 inline-block">
                ZEROPOINT Partner Program
              </Badge>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary tracking-tight mb-4">
                Be my next success case study.
              </h3>
              
              <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-sans">
                As an engineer specializing in secure, automated digital infrastructure, I am selecting my first <strong>three clinic partners</strong> to receive dedicated development terms, prioritized onboarding, and special pricing offsets in exchange for a detailed launch case study.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-xl mx-auto mb-8 font-sans">
                <div className="p-4 bg-bg/50 border border-white/5 rounded-lg flex items-start gap-2.5">
                  <Shield className="text-accent-emerald w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-text-primary">100% Secure</span>
                    <span className="text-[10px] text-text-muted leading-none">Full Site Shield install</span>
                  </div>
                </div>
                
                <div className="p-4 bg-bg/50 border border-white/5 rounded-lg flex items-start gap-2.5">
                  <Sparkles className="text-accent-gold w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-text-primary">Priority Ops</span>
                    <span className="text-[10px] text-text-muted leading-none">Direct n8n/AI integrations</span>
                  </div>
                </div>

                <div className="p-4 bg-bg/50 border border-white/5 rounded-lg flex items-start gap-2.5">
                  <Quote className="text-accent-gold w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-text-primary">Offset Rate</span>
                    <span className="text-[10px] text-text-muted leading-none">Exclusive launch pricing</span>
                  </div>
                </div>
              </div>

              <Button href="#contact" variant="primary" magnetic={true}>
                Apply for Partner Pricing <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
