import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { MessageSquare, PhoneCall, Bot, ShieldCheck, CheckCircle2, User, Send } from 'lucide-react';

export default function CaseStudies() {
  const [messages, setMessages] = useState([
    { sender: 'user', text: "Hi, do you have any open slots for a couples massage this Friday?" },
    { sender: 'ai', text: "Hello! Let me check the schedule for Aura Wellness Spa. 🌸\n\nYes, we have two slots available this Friday:\n1. 2:00 PM with therapist Elena\n2. 5:30 PM with therapist Marcus\n\nWould either of these work for you?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const demoPrompts = [
    "Book the 5:30 PM slot for John Doe.",
    "Do you offer deep tissue massage?",
    "Where is the clinic located?"
  ];

  const handlePromptClick = async (promptText) => {
    if (isTyping) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    let aiResponse = "";
    if (promptText.includes("5:30 PM")) {
      aiResponse = "Perfect! I've reserved the Friday 5:30 PM slot for John Doe. I've sent a calendar link to your scheduling panel and logged it in Google Sheets. You're all set! 📅✨";
    } else if (promptText.includes("deep tissue")) {
      aiResponse = "Yes, we do! Our Deep Tissue therapy is highly recommended for muscle tension relief. It is AED 350 for 60 minutes. Would you like me to find a slot for that?";
    } else {
      aiResponse = "Aura Wellness Spa is located in City Walk, Phase 2, Dubai. We have dedicated free basement parking for our clients. 📍";
    }

    setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
  };

  return (
    <section id="case-studies" className="py-24 bg-bg relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="Proven in practice. Tried and tested."
          subtitle="Case Studies & Demos"
          description="We build working automation systems, not just static layouts. Look at our recent deployments and try the live receptionist simulator below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Case Study 1 (Dental Clinic - Voice AI) */}
          <div className="lg:col-span-5 flex">
            <Card className="w-full flex flex-col justify-between" hoverBorder={true}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-accent-gold/10 text-accent-gold">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <Badge variant="gold">Voice AI Active</Badge>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-accent-gold">Dental Clinic Case Study</span>
                <h3 className="text-3xl font-bold font-serif text-text-primary mt-2 mb-4">
                  Revive Dental Care
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
                  Deployed a premium custom React site integrated with a Vapi-powered AI voice receptionist. The voice agent answers after-hours patient calls, screens dental emergencies, and logs bookings directly to Google Calendar.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent-emerald w-5 h-5 shrink-0" />
                    <span className="text-sm text-text-primary">98% customer calls handled automatically</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent-emerald w-5 h-5 shrink-0" />
                    <span className="text-sm text-text-primary">Zero missed bookings after clinic hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent-emerald w-5 h-5 shrink-0" />
                    <span className="text-sm text-text-primary">Full patient record protection via custom RLS</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex flex-wrap gap-2 mt-auto">
                <span className="text-xs font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded">React</span>
                <span className="text-xs font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded">Vapi.ai Voice</span>
                <span className="text-xs font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded">Site Shield</span>
              </div>
            </Card>
          </div>

          {/* Right Side: Case Study 2 + Interactive Simulator (Aura Spa - WhatsApp AI) */}
          <div className="lg:col-span-7 flex">
            <GlassCard glowColor="gold" className="w-full flex flex-col justify-between" hoverGlow={true}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                
                {/* Text Content */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-accent-gold/10 text-accent-gold rounded">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <Badge variant="emerald">WhatsApp Integration</Badge>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-gold">Spa Operations Build</span>
                    <h3 className="text-2xl font-bold font-serif text-text-primary mt-1 mb-3">
                      Aura Wellness Spa
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                      A WordPress frontend hardened against security attacks, backed by a dual-channel WhatsApp receptionist built via n8n workflows and Gemini API.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-text-muted mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                      <span>+35% appointment conversion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                      <span>Google Sheets booking synchronization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                      <span>Hardened WordPress Core</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Phone Simulator */}
                <div className="md:col-span-7 flex flex-col bg-[#0b0b0f] border border-white/5 rounded-xl overflow-hidden min-h-[300px] max-h-[420px]">
                  
                  {/* Phone Header */}
                  <div className="bg-bg-surface px-4 py-3 border-b border-white/5 flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-accent-gold/10 border border-accent-gold/25 rounded-full flex items-center justify-center text-accent-gold">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-text-primary">Aura Booking Agent</span>
                      <span className="block text-[9px] text-accent-emerald font-mono leading-none">online & synchronized</span>
                    </div>
                  </div>

                  {/* Message Log */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                          msg.sender === 'user' 
                            ? 'bg-accent-gold text-bg font-semibold rounded-br-none' 
                            : 'bg-white/5 border border-white/5 text-text-primary rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    
                    {/* Simulated typing bubble */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white/5 border border-white/5 text-text-muted rounded-lg rounded-bl-none p-3 flex gap-1 items-center">
                            <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Footer (Interactive prompt selectors) */}
                  <div className="p-3 bg-bg-surface border-t border-white/5">
                    <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-2 font-mono">
                      Test the AI chatbot. Tap below:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {demoPrompts.map((promptText, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePromptClick(promptText)}
                          disabled={isTyping}
                          className="text-left text-xs bg-bg hover:bg-bg/60 border border-white/5 hover:border-accent-gold/25 px-2.5 py-1.5 rounded text-text-primary hover:text-accent-gold font-sans font-medium transition-all truncate"
                        >
                          {promptText}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </GlassCard>
          </div>

        </div>
      </Container>
    </section>
  );
}
