import React from 'react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { Shield, ArrowLeft, Terminal, ClipboardList, AlertCircle } from 'lucide-react';

export default function TermsOfService({ onNavigate }) {
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
            <ClipboardList className="w-3.5 h-3.5" /> Site Shield Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-text-muted font-sans">
            Last Updated: July 2026 | Clinovate Digital Agency Framework
          </p>
        </div>

        {/* Content body */}
        <div className="text-left space-y-8 font-sans text-sm text-text-muted leading-relaxed">
          
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <ClipboardList className="w-4.5 h-4.5 text-accent-gold" /> 1. Acceptance of Conditions
            </h3>
            <p>
              By accessing this website, submitting lead requests, or using our visual security analyzers, you agree to comply with these Terms of Service. These terms outline the relationship between Clinovate and our clinic/business partners.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Terminal className="w-4.5 h-4.5 text-accent-gold" /> 2. Scope of Architecture & Services
            </h3>
            <p>
              Clinovate provides custom React development, WordPress build optimization, performance marketing, database configurations, and n8n/Gemini/Vapi AI automation setups. Specific project scopes are governed under separately signed Project Contracts, which detail payments, delivery phases, and timelines.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-accent-gold" /> 3. Data & Intellectual Property Ownership
            </h3>
            <p>
              We believe in complete freedom for our clinical partners. Once final payments for a project are made:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs">
              <li>
                You retain 100% ownership of your site source repositories, Gutenberg themes, custom databases, and assets.
              </li>
              <li>
                You hold direct account control over all AI receptionist configurations (Vapi.ai) and webhook databases (n8n workflows).
              </li>
              <li>
                We do not enforce licensing lock-ins. We help you move all accounts under your direct billing profiles.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <AlertCircle className="w-4.5 h-4.5 text-accent-gold" /> 4. Security Disclaimer
            </h3>
            <p>
              While our custom **Site Shield** hardening mitigates industry threats (implementing OWASP CSP configs, strict database RLS parameters, and HSTS protection), no system is entirely impenetrable. We are not liable for security breaches arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs">
              <li>
                User credential leakage or insecure password sharing on client accounts.
              </li>
              <li>
                Unauthorized modifications made to the database, source repositories, or serverless routes by external parties after project delivery.
              </li>
              <li>
                Downtime caused by hosting CDNs, Supabase backend outages, or third-party email API disruptions.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <ClipboardList className="w-4.5 h-4.5 text-accent-gold" /> 5. Resolution & Law
            </h3>
            <p>
              These conditions shall be interpreted under the laws of West Bengal, India. Any disputes arising from these terms will be settled amicably through technical mediation before pursuing legal coordinates.
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
