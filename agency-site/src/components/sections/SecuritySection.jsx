import React from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { Shield, Check, Terminal, Lock, Activity, Server } from 'lucide-react';

export default function SecuritySection() {
  const baselineChecklist = [
    "Enforce HTTPS with HSTS headers (preloaded)",
    "Strict CSP (Content-Security-Policy) & X-Frame-Options",
    "Client + Server-side input sanitization & validation",
    "Strict API Rate Limiting on endpoints and contact forms",
    "Row Level Security (RLS) configured on every database table",
    "Secrets hidden server-side (no frontend environment leakage)",
    "Vulnerability scanning (automated npm audit & Dependabot)"
  ];

  const wordpressChecklist = [
    "Disable XML-RPC (disables brute-force pingback exploits)",
    "Rename default admin login URL & limit login attempts",
    "Deploy active malware scanning & file integrity monitors",
    "Automated managed updates for core, plugins, and themes",
    "Independent hourly/daily offsite encrypted backups"
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 } 
    }
  };

  return (
    <section id="security" className="py-24 bg-bg relative overflow-hidden scroll-mt-20">
      {/* Intense Emerald Glowing Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] bg-accent-emerald/10 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Bank-grade shield. Built-in, not an add-on."
          subtitle="Site Shield Security"
          accent="emerald"
          description="A compromised website is the fastest way to lose patient trust and search engine rankings. We build clinical-grade security into your project from the first line of code."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Shield Positioning and Maintain & Protect Retainer */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard glowColor="emerald" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-accent-emerald w-7 h-7" />
                <h3 className="text-2xl font-bold font-serif text-text-primary">Site Shield Philosophy</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
                Most web agencies build sites with default templates and ignore database safety rules, vulnerable login gateways, and frame headers. Clinovate hardens the hosting edge, the browser interface, and database layers so your practice remains fully compliant and protected against attacks.
              </p>
              
              <div className="flex items-center gap-2 p-3 bg-accent-emerald/5 border border-accent-emerald/10 rounded-lg">
                <Terminal className="text-accent-emerald w-5 h-5 shrink-0" />
                <span className="text-xs font-mono text-text-primary">
                  Headers validated against OWASP standards.
                </span>
              </div>
            </GlassCard>

            <GlassCard glowColor="emerald" className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-accent-emerald w-6 h-6" />
                <h4 className="text-lg font-bold font-serif text-text-primary">Maintain & Protect Retainer</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed mb-4 font-sans">
                Positioned as automated insurance to shield your daily operations. We check configurations, monitor certificates, and review files to prevent downtime before it impacts clients.
              </p>
              
              <ul className="space-y-2.5 text-xs text-text-muted font-sans mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  Monthly audit logs and vulnerability summaries
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  24/7 uptime monitoring with instant sms logs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  Quarterly system-wide pentesting checkpoints
                </li>
              </ul>
              
              <div className="bg-bg/40 border border-white/5 p-3 rounded-lg flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted font-mono">Response SLA</span>
                <span className="text-xs font-mono font-bold text-accent-emerald bg-accent-emerald/15 px-2.5 py-0.5 rounded">4-Hour Recovery</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Checklists (Baseline + WordPress Hardening) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Baseline Security Checklist */}
            <GlassCard glowColor="emerald" className="p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Shield className="text-accent-emerald w-6 h-6" />
                  <h3 className="text-xl font-bold font-serif text-text-primary">Baseline Security (Standard)</h3>
                </div>
                <Badge variant="emerald">Every Build</Badge>
              </div>

              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={listVariants}
                className="space-y-3.5"
              >
                {baselineChecklist.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={itemVariants}
                    className="flex items-start gap-3 text-sm text-text-primary font-sans"
                  >
                    <Check className="w-4.5 h-4.5 text-accent-emerald shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>

            {/* WordPress-Specific Hardening Checklist */}
            <GlassCard glowColor="emerald" className="p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Server className="text-accent-emerald w-6 h-6" />
                  <h3 className="text-xl font-bold font-serif text-text-primary">WordPress-Specific Hardening</h3>
                </div>
                <Badge variant="gray">Optional</Badge>
              </div>

              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={listVariants}
                className="space-y-3.5"
              >
                {wordpressChecklist.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={itemVariants}
                    className="flex items-start gap-3 text-sm text-text-primary font-sans"
                  >
                    <Check className="w-4.5 h-4.5 text-accent-emerald shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>
          </div>

        </div>
      </Container>
    </section>
  );
}
