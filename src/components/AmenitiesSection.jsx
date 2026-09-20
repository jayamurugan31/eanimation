import React, { useState } from 'react';
import { AMENITIES_DATA } from '../data/realEstateData';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function AmenitiesSection() {
  const [activeAmenityId, setActiveAmenityId] = useState(AMENITIES_DATA[0].id);

  const activeAmenity = AMENITIES_DATA.find((a) => a.id === activeAmenityId) || AMENITIES_DATA[0];

  return (
    <section id="amenities" className="py-28 md:py-36 bg-brand-ivory border-t border-brand-stone/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
                Lifestyle & Wellness
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal leading-[1.08]">
              Resort Amenities <br />
              <span className="italic font-normal text-brand-bronze-dark">Integrated In Nature</span>
            </h2>
          </div>

          <p className="text-sm font-light text-brand-charcoal-light max-w-md leading-relaxed">
            12+ dedicated private amenities designed for physical rejuvenation, mental stillness, social communion, and eco-conscious living.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {AMENITIES_DATA.map((amenity) => (
            <button
              key={amenity.id}
              onClick={() => setActiveAmenityId(amenity.id)}
              className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 shrink-0 border ${
                activeAmenityId === amenity.id
                  ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal shadow-soft-luxury'
                  : 'bg-brand-cream text-brand-charcoal-light border-brand-stone hover:border-brand-bronze'
              }`}
            >
              {amenity.title}
            </button>
          ))}
        </div>

        {/* Active Amenity Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center bg-brand-cream p-8 md:p-12 rounded-3xl border border-brand-stone/60 shadow-elevated">
          {/* Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-soft-luxury border border-brand-stone/40">
              <img
                src={activeAmenity.image}
                alt={activeAmenity.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-cream/90 backdrop-blur-md border border-brand-stone text-[10px] uppercase tracking-widest font-semibold text-brand-bronze-dark">
                {activeAmenity.category}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-bronze font-semibold">
                Featured Amenity
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-light">
                {activeAmenity.title}
              </h3>
            </div>

            <p className="text-sm font-light text-brand-charcoal-light leading-relaxed">
              {activeAmenity.desc}
            </p>

            {/* Specifications */}
            <div className="space-y-3 pt-4 border-t border-brand-stone/60">
              <p className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold">
                Facility Specifications
              </p>
              <ul className="space-y-2.5">
                {activeAmenity.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-brand-charcoal-light">
                    <div className="w-5 h-5 rounded-full bg-brand-bronze/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-brand-bronze-dark" />
                    </div>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
