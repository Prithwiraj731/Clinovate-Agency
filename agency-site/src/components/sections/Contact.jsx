import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabaseClient';
import { sendEmail } from '../../lib/emailjs';
import { Mail, MapPin, MessageCircle, Calendar, ArrowRight, Loader, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessType: 'clinic',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const businessTypes = [
    { value: 'clinic', label: 'Medical / Dental Clinic' },
    { value: 'cafe', label: 'Café / Restaurant' },
    { value: 'service', label: 'Other Local Service' },
    { value: 'enterprise', label: 'Enterprise / Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // 1. Log lead to Supabase
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: form.name,
          email: form.email,
          business_type: form.businessType,
          message: form.message,
          source: 'contact_form',
          scanned_url: ''
        }
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }

      // 2. Send email via EmailJS wrapper
      const emailResult = await sendEmail({
        from_name: form.name,
        from_email: form.email,
        business_type: form.businessType,
        message: form.message
      });

      if (emailResult.status !== 200) {
        throw new Error("Email sending failed");
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        businessType: 'clinic',
        message: ''
      });

    } catch (err) {
      console.error("Submission failed:", err);
      // We will still display success locally if Supabase worked in mock mode, but standard failure falls here
      setErrorMsg("Something went wrong with form submission. Please try again or reach out directly via WhatsApp.");
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg relative overflow-hidden scroll-mt-20">
      {/* Light glow effects */}
      <div className="absolute right-0 bottom-1/4 w-[350px] h-[350px] rounded-full blur-[130px] bg-accent-gold/5 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Secure your launch. Book a consultation."
          subtitle="Get In Touch"
          description="Ready to upgrade your web presence and lock down vulnerabilities? Drop us a line or schedule an appointment directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Booking & Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct Connect Options */}
            <div className="space-y-4">
              <div className="p-6 bg-bg-surface/50 border border-white/5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-accent-gold/10 text-accent-gold rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-text-primary mb-1">Direct Inquiries</h4>
                  <p className="text-sm text-text-muted font-sans">contact@clinovate.agency</p>
                </div>
              </div>

              <div className="p-6 bg-bg-surface/50 border border-white/5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-accent-gold/10 text-accent-gold rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-text-primary mb-1">HQ Location</h4>
                  <p className="text-sm text-text-muted font-sans">West Bengal, India</p>
                </div>
              </div>
            </div>

            {/* Calendar Booking & WhatsApp triggers */}
            <GlassCard glowColor="gold" className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Calendar className="text-accent-gold w-5 h-5" />
                  <h4 className="font-serif font-bold text-lg text-text-primary">Instant Scheduling</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                  Prefer a video call? Pick a convenient time slot for a free 20-minute secure architecture audit. We'll map your requirements and run a visual scan.
                </p>
              </div>

              <div className="space-y-3 mt-auto">
                {/* Scheduling panel booking link */}
                <Button 
                  data-cal-namespace="custom-meeting"
                  data-cal-link="prithwi1016/custom-meeting"
                  data-cal-config='{"layout":"month_view"}'
                  onClick={() => {
                    setTimeout(() => {
                      const iframe = document.querySelector('iframe[src*="cal.com"]');
                      if (!iframe) {
                        window.open('https://cal.com/prithwi1016/custom-meeting', '_blank');
                      }
                    }, 800);
                  }}
                  variant="primary" 
                  magnetic={true} 
                  className="w-full text-xs py-3 gap-2"
                >
                  <Calendar className="w-4 h-4" /> Schedule Discovery Call
                </Button>

                {/* WhatsApp Click-to-Chat */}
                <Button 
                  onClick={() => window.open('https://wa.me/919832199064?text=Hi%20Clinovate%2C%20I%20want%20to%20audit%20my%20website%20security.', '_blank')}
                  variant="secondary" 
                  magnetic={true} 
                  className="w-full text-xs py-3 gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </Button>
              </div>
            </GlassCard>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="gold" className="p-8 md:p-10 h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <CheckCircle className="w-16 h-16 text-accent-emerald mx-auto mb-6" />
                    <h3 className="text-2xl font-bold font-serif text-text-primary mb-2">Message Transmitted</h3>
                    <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed font-sans">
                      Thank you for reaching out. We have logged your request securely. A senior partner will contact you within 12 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-text-primary mb-1">Submit an Inquiry</h3>
                      <p className="text-xs text-text-muted font-sans">Submit your parameters to receive a custom scoping estimate.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted font-mono" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Dr. Sarah Chen"
                          className="px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/40 focus:border-accent-gold/40 text-sm font-sans"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted font-mono" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="e.g. sarah@myclinic.com"
                          className="px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/40 focus:border-accent-gold/40 text-sm font-sans"
                        />
                      </div>

                      {/* Business Type Select */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted font-mono" htmlFor="businessType">
                          Industry / Business Type
                        </label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={form.businessType}
                          onChange={handleInputChange}
                          className="px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-gold/40 focus:border-accent-gold/40 text-sm font-sans"
                        >
                          {businessTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-bg-surface text-text-primary">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message Input */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted font-mono" htmlFor="message">
                          Tell Us About Your Project *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={handleInputChange}
                          placeholder="What goals are you looking to achieve? Mention security scope or AI receptionist if interested."
                          className="px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/40 focus:border-accent-gold/40 text-sm font-sans resize-none"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-xs text-red-500 font-sans mt-2">
                          {errorMsg}
                        </p>
                      )}

                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          magnetic={true} 
                          disabled={status === 'sending'}
                          className="w-full text-sm py-3.5 gap-2"
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" /> Transmission In Progress...
                            </>
                          ) : (
                            <>
                              Submit Project Parameters <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </GlassCard>
          </div>

        </div>
      </Container>
    </section>
  );
}
