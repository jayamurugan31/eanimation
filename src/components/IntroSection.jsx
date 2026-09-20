import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, TreePine, Sparkles } from 'lucide-react';

export default function IntroSection() {
  const pillars = [
    {
      title: 'Architectural Integrity',
      desc: 'Clean lines, raw natural stone, and organic wood finishes crafted by award-winning residential masters.',
      icon: Compass
    },
    {
      title: 'Preserved Nature',
      desc: '65% of the total acreage remains pristine old-growth forest, integrated seamlessly into private living spaces.',
      icon: TreePine
    },
    {
      title: 'Privacy & Security',
      desc: 'Private gated access, subterranean multi-bay garages, and 24/7 biometric estate concierge.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="intro" className="py-28 md:py-36 bg-brand-cream relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
            Philosophical Vision
          </span>
        </motion.div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Large Typography Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 space-y-8"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-brand-charcoal">
              Where Architecture <br />
              <span className="italic font-normal text-brand-bronze-dark">Meets Nature</span>
            </h2>

            <p className="text-base sm:text-lg font-light text-brand-charcoal-light leading-relaxed">
              Greenwood Estates is designed around the idea that a home should feel connected to nature, thoughtfully planned and built for the way modern families live. Every element is crafted to invite morning light, soft breezes, and quiet peace into your everyday life.
            </p>

            <div className="pt-2 border-t border-brand-stone/60 space-y-6">
              {pillars.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-ivory border border-brand-stone flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-brand-bronze/10 group-hover:border-brand-bronze">
                      <IconComp className="w-4 h-4 text-brand-bronze-dark" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-brand-charcoal font-medium mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Architectural Editorial Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-brand-stone/50 bg-brand-stone/20 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Greenwood Estates Architectural Exterior"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Architectural Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 sm:bottom-8 sm:-left-8 bg-brand-cream border border-brand-stone p-6 rounded-xl shadow-soft-luxury max-w-xs space-y-2 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-bronze" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-bronze-dark">
                    Biophilic Design
                  </span>
                </div>
                <p className="font-serif text-lg text-brand-charcoal leading-snug">
                  "Architecture is the learned game, correct and magnificent, of forms assembled in the sun."
                </p>
              </motion.div>

              {/* Decorative Corner Accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-bronze/40 rounded-tr-2xl pointer-events-none hidden sm:block"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
