import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  stepRefs.current = [];

  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP ScrollTrigger animation for the progress line
    const scrollAnimation = gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom 70%',
          scrub: true
        }
      }
    );

    // Animating individual nodes along the timeline
    stepRefs.current.forEach((stepEl) => {
      gsap.fromTo(stepEl.querySelector('.timeline-dot'),
        { backgroundColor: 'rgb(21, 21, 28)', borderColor: 'rgba(245, 245, 240, 0.1)' },
        {
          backgroundColor: '#C9A227',
          borderColor: '#C9A227',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 55%',
            end: 'top 45%',
            scrub: true
          }
        }
      );
    });

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const steps = [
    {
      num: "01",
      title: "Discover & Position",
      description: "We audit your current traffic, reviews, and security flaws. We map out a bespoke patient acquisition funnel and clarify clinic-specific positioning.",
      details: ["Vulnerability report", "Conversion mapping", "Positioning framework"]
    },
    {
      num: "02",
      title: "Premium UX Design",
      description: "We draft custom Figma layouts using our Midnight & Gold color scheme. No templates. Every design is built to feel luxurious, distinct, and premium.",
      details: ["Custom wireframes", "Tailored mobile layout", "UX path planning"]
    },
    {
      num: "03",
      title: "High-Performance Build",
      description: "We build your platform in React with Vite and Tailwind. This ensures lightning-fast page loading and robust responsiveness across all devices.",
      details: ["Sub-second loading", "Clean semantic structure", "React component mapping"]
    },
    {
      num: "04",
      title: "Site Shield Hardening",
      description: "Our core differentiator. We configure edge firewalls, disable vulnerable vectors, and write Supabase Row Level Security policies to lock down data.",
      details: ["HSTS & CSP headers setup", "Supabase RLS configured", "Cloudflare edge shielding"]
    },
    {
      num: "05",
      title: "Launch & Automate",
      description: "We connect your custom AI voice receptionist or WhatsApp booking workflows. We activate analytics and GBP optimization to launch customer inflow.",
      details: ["AI reception integrations", "SEO console submissions", "Review requests active"]
    }
  ];

  return (
    <section id="process" className="py-24 bg-[#09090D] relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="Our technical blueprint to launch."
          subtitle="The Process"
          description="How we construct secure, high-conversion systems. Every phase is meticulously planned, verified, and locked down."
        />

        <div ref={containerRef} className="relative max-w-5xl mx-auto mt-20">
          
          {/* Main Timeline Line (Background Track) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2" />
          
          {/* Animated GSAP Progress Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-gold -translate-x-1/2 origin-top"
            style={{ transformScaleY: 0 }}
          />

          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  ref={addToRefs}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div className="timeline-dot absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-bg-surface border-2 border-white/10 -translate-x-1/2 z-20 transition-colors duration-300" />

                  {/* Step Card Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <GlassCard glowColor="none" className="p-6 md:p-8 hover:border-accent-gold/15 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-serif text-3xl font-bold text-accent-gold/45">
                            {step.num}
                          </span>
                          <h4 className="text-xl font-bold font-serif text-text-primary">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
                          {step.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {step.details.map((detail, dIdx) => (
                            <span 
                              key={dIdx} 
                              className="text-[10px] font-mono text-text-muted bg-white/5 border border-white/5 px-2.5 py-1 rounded"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  </div>

                  {/* Spacer for horizontal layout on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
