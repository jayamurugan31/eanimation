import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectHighlights() {
  const stats = [
    {
      value: '24',
      label: 'Premium Residences',
      detail: 'Ultra-exclusive private sanctuary'
    },
    {
      value: '65%',
      label: 'Open Green Landscape',
      detail: 'Preserved native canopy forest'
    },
    {
      value: '24/7',
      label: 'Concierge & Security',
      detail: 'Biometric estate protection'
    },
    {
      value: '12+',
      label: 'Lifestyle Amenities',
      detail: 'Dedicated wellness & club spaces'
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory border-y border-brand-stone/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`space-y-2 group ${
                idx !== stats.length - 1 ? 'lg:border-r lg:border-brand-stone/60 lg:pr-8' : ''
              }`}
            >
              <div className="font-serif text-4xl sm:text-6xl font-light text-brand-charcoal group-hover:text-brand-bronze-dark transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-charcoal">
                {stat.label}
              </div>
              <div className="text-xs text-brand-charcoal-muted font-light">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
