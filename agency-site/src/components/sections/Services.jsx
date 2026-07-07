import React from 'react';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid';
import Card from '../ui/Card';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { services } from '../../data/services';
import * as Icons from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#09090D] relative scroll-mt-20">
      {/* Subtle styling background light */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[160px] bg-accent-gold/5 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Engineered to grow your practice, secured by default."
          subtitle="Our Capabilities"
          description="Most freelancers build basic pages and disappear. We deliver high-conversion digital architectures, hardened databases, and automated systems tailored specifically for local clinics and services."
        />

        <BentoGrid>
          {services.map((service, index) => {
            // Dynamically resolve icon component from lucide-react
            const IconComponent = Icons[service.iconName] || Icons.HelpCircle;
            const isHighlight = service.highlight;
            const cardGlow = service.accent === 'emerald' ? 'emerald' : 'gold';

            const delay = index * 0.1;

            const cardContent = (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-lg ${
                      service.accent === 'emerald' ? 'bg-accent-emerald/10 text-accent-emerald' : 'bg-accent-gold/10 text-accent-gold'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {isHighlight && (
                      <Badge variant={service.accent === 'emerald' ? 'emerald' : 'gold'}>
                        Specialty Core
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-text-primary mb-2">
                    {service.title}
                  </h3>
                  
                  <span className={`block text-xs font-semibold uppercase tracking-wider mb-4 ${
                    service.accent === 'emerald' ? 'text-accent-emerald' : 'text-accent-gold'
                  }`}>
                    {service.subtitle}
                  </span>

                  <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-white/5 pt-4 font-sans text-xs text-text-muted mt-auto">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        service.accent === 'emerald' ? 'bg-accent-emerald' : 'bg-accent-gold'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <BentoGridItem 
                key={service.id} 
                colSpan={service.colSpan}
                delay={delay}
              >
                {isHighlight ? (
                  <GlassCard glowColor={cardGlow} className="h-full" hoverGlow={true}>
                    {cardContent}
                  </GlassCard>
                ) : (
                  <Card className="h-full" hoverBorder={true}>
                    {cardContent}
                  </Card>
                )}
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </Container>
    </section>
  );
}
