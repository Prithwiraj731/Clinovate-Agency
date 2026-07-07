import React from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { pricingTiers } from '../../data/pricing';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#09090D] relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="Predictable packaging. Premium results."
          subtitle="Packages & Pricing"
          description="Transparent service scopes tailored to your business growth. We help you choose the right tier, secure your operations, and automate bookings."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-12">
          {pricingTiers.map((tier, idx) => {
            const isPopular = tier.popular;
            
            const cardContent = (
              <div className="h-full flex flex-col justify-between">
                <div>
                  {/* Top indicators */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-serif font-bold text-text-primary">
                      {tier.name}
                    </span>
                    {isPopular && (
                      <Badge variant="emerald">Most Popular</Badge>
                    )}
                  </div>

                  {/* Pricing Tag */}
                  <div className="mb-6">
                    <span className="text-4xl font-serif font-bold text-text-primary">
                      {tier.price}
                    </span>
                    <span className="block text-xs uppercase tracking-wider text-text-muted mt-1 font-mono">
                      {tier.billing}
                    </span>
                  </div>

                  {/* Short description */}
                  <p className="text-sm text-text-muted leading-relaxed mb-8 font-sans">
                    {tier.description}
                  </p>

                  {/* Feature Lists */}
                  <ul className="space-y-4 mb-8 border-t border-white/5 pt-6 font-sans">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-text-muted leading-relaxed">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isPopular ? 'text-accent-emerald' : 'text-accent-gold'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button 
                    href="#contact" 
                    variant={isPopular ? 'emerald' : 'secondary'} 
                    magnetic={true} 
                    className="w-full text-sm py-3"
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </div>
            );

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                {isPopular ? (
                  <GlassCard glowColor="emerald" className="h-full border-accent-emerald/20 border-2" hoverGlow={true}>
                    {cardContent}
                  </GlassCard>
                ) : (
                  <Card className="h-full" hoverBorder={true}>
                    {cardContent}
                  </Card>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
