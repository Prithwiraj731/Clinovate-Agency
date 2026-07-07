import React from 'react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { Shield, ArrowLeft, Lock, FileText, Eye } from 'lucide-react';

export default function PrivacyPolicy({ onNavigate }) {
  return (
    <section className="pt-32 pb-24 bg-bg relative min-h-screen">
      {/* Background glow styling */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[160px] bg-accent-gold/5 pointer-events-none" />

      <Container className="max-w-4xl relative z-10">
        
        {/* Navigation back */}
        <div className="mb-10 text-left">
          <Button 
            onClick={() => { onNavigate('home'); window.scrollTo({top:0}); }} 
            variant="text" 
            className="flex items-center gap-2 group text-accent-gold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Homepage
          </Button>
        </div>

        {/* Title */}
        <div className="text-left border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 mb-4 text-xs font-mono text-accent-gold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Site Shield Secure Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted font-sans">
            Last Updated: July 2026 | Clinovate Digital Architecture Hardening
          </p>
        </div>

        {/* Content body */}
        <div className="text-left space-y-8 font-sans text-sm text-text-muted leading-relaxed">
          
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Eye className="w-4.5 h-4.5 text-accent-gold" /> 1. Overview
            </h3>
            <p>
              At Clinovate, we build secure systems and treat data protection as a fundamental technical requirement, not an afterthought. This Privacy Policy details how we collect, store, and shield parameters gathered via our marketing website, instant security scanners, and booking workflows.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-accent-gold" /> 2. Information Collected
            </h3>
            <p>
              We gather variables under two explicit flows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs">
              <li>
                <strong>Instant Security Analyzer Logs:</strong> When you input a domain URL to run our Site Shield inspection, our edge functions fetch header variables (CSP, HSTS, X-Frame-Options) to calculate a score. We store the scanned domain name and generated metrics to evaluate local market vulnerability statistics.
              </li>
              <li>
                <strong>Project Consultation Parameters:</strong> When submitting booking inquiries or contacting our partners, we collect your name, business name, email coordinates, industry verticals, and custom messages.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-accent-gold" /> 3. Database Security & RLS
            </h3>
            <p>
              Unlike standard freelancers, we do not store customer coordinates in open databases. All entries are written directly to database layers shielded by **Supabase Row Level Security (RLS) policies**. The public anonymous API keys are restricted to write-only permissions. Anonymous queries can never retrieve, update, or compromise submitted leads.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-accent-gold" /> 4. Data Retention & Transfers
            </h3>
            <p>
              Clinovate retains client parameters only as long as necessary to complete project contracts or coordinate consultation audits. We do not sell, rent, or lease leads to third-party marketing companies. If you decide to transition your operations, we transfer 100% database ownership and credentials directly to you.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-accent-gold" /> 5. Technical Rights
            </h3>
            <p>
              You have the right to request deletion of your scanned domain records or contact entries at any time. To purge your files from our staging databases, contact us at <strong>contact@clinovate.agency</strong>.
            </p>
          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <Button 
            onClick={() => { onNavigate('home'); window.scrollTo({top:0}); }} 
            variant="primary" 
            magnetic={true}
          >
            Return to Homepage
          </Button>
        </div>

      </Container>
    </section>
  );
}
