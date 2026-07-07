import React from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { Check, X, Shield, Users } from 'lucide-react';

export default function WhyUs() {
  const comparisonRows = [
    {
      criteria: "Database Rules & RLS",
      freelancer: "Usually left open, database bypass is common",
      us: "Supabase Row Level Security (RLS) configured per table",
      icon: Shield
    },
    {
      criteria: "Security Headers",
      freelancer: "Unconfigured (exposes sites to XSS & clickjacking)",
      us: "Forced HTTPS + HSTS, CSP, and full header suite configured",
      icon: Shield
    },
    {
      criteria: "Automation & AI Integration",
      freelancer: "Templates only, no voice/chat integrations",
      us: "AI Voice (Vapi) & WhatsApp (n8n + Gemini) receptionists",
      icon: Users
    },
    {
      criteria: "Ongoing Backups & Audits",
      freelancer: "Relies on host backups only, manual updates",
      us: "Independent offsite backups + monthly audit reports",
      icon: Shield
    },
    {
      criteria: "Uptime Support Commitment",
      freelancer: "None. Hard to reach if site crashes",
      us: "24/7 monitoring with stated 4-hour incident response SLA",
      icon: Shield
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-bg relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="The agency upgrade your practice deserves."
          subtitle="Why Clinovate"
          description="Most freelancers pitch code. We deliver secure, hardened infrastructure that converts visitors and automates patient intake."
        />

        {/* Desktop View Table */}
        <div className="hidden md:block w-full overflow-hidden border border-white/5 rounded-2xl bg-bg-surface/50 backdrop-blur">
          <div className="grid grid-cols-3 bg-[#0e0e14] py-6 px-8 border-b border-white/5 font-serif text-lg font-bold text-text-primary">
            <div>Risk Area & Service</div>
            <div className="text-text-muted/70">Other Freelancer</div>
            <div className="text-accent-gold">Clinovate (Us)</div>
          </div>

          <div className="divide-y divide-white/5">
            {comparisonRows.map((row, idx) => {
              const RowIcon = row.icon;
              return (
                <div key={idx} className="grid grid-cols-3 py-6 px-8 items-center font-sans text-sm hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-3">
                    <RowIcon className="w-4 h-4 text-accent-gold shrink-0" />
                    <span className="font-semibold text-text-primary">{row.criteria}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-text-muted pr-4">
                    <X className="w-4.5 h-4.5 text-red-500/80 shrink-0" />
                    <span>{row.freelancer}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-text-primary pr-4 font-medium">
                    <Check className="w-5 h-5 text-accent-emerald shrink-0" />
                    <span>{row.us}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View Cards */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {comparisonRows.map((row, idx) => {
            const RowIcon = row.icon;
            return (
              <GlassCard key={idx} glowColor="gold" hoverGlow={false} className="p-6">
                <div className="flex items-center gap-2.5 mb-4 border-b border-white/5 pb-3">
                  <RowIcon className="w-5 h-5 text-accent-gold" />
                  <h4 className="font-serif font-bold text-base text-text-primary">
                    {row.criteria}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-red-500 font-semibold text-xs uppercase mb-1">
                      <X className="w-3.5 h-3.5" /> Other Freelancer
                    </div>
                    <p className="text-xs text-text-muted">
                      {row.freelancer}
                    </p>
                  </div>

                  <div className="bg-accent-emerald/5 border border-accent-emerald/10 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-accent-emerald font-semibold text-xs uppercase mb-1">
                      <Check className="w-3.5 h-3.5" /> Clinovate (Us)
                    </div>
                    <p className="text-xs text-text-primary font-medium">
                      {row.us}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
