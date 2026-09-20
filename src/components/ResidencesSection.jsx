import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESIDENCES_DATA } from '../data/realEstateData';
import ResidenceModal from './ResidenceModal';
import { ArrowUpRight, Bed, Bath, Maximize2, Layers } from 'lucide-react';

export default function ResidencesSection({ onOpenEnquire }) {
  const [selectedResidence, setSelectedResidence] = useState(null);

  return (
    <section id="residences" className="py-28 md:py-36 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-8 border-b border-brand-stone/60"
        >
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
                Architectural Collection
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal leading-[1.08]">
              Sanctuaries Crafted <br />
              <span className="italic font-normal text-brand-bronze-dark">For Distinction</span>
            </h2>
          </div>

          <p className="text-sm font-light text-brand-charcoal-light max-w-md leading-relaxed">
            Each Greenwood residence is an individual architectural masterpiece—blending expansive double-height ceilings, raw natural stone, and private outdoor greenery.
          </p>
        </motion.div>

        {/* Residence Cards - Large Editorial Layouts */}
        <div className="space-y-24">
          {RESIDENCES_DATA.map((res, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 md:p-12 rounded-3xl bg-brand-ivory/60 border border-brand-stone/60 hover:border-brand-bronze/40 transition-all duration-500 shadow-soft-luxury"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-elevated border border-brand-stone/40 bg-brand-stone/30">
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent"></div>

                    {/* Tag */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-cream/90 backdrop-blur-md border border-brand-stone text-[10px] uppercase tracking-widest font-semibold text-brand-bronze-dark">
                      {res.tag}
                    </div>

                    <div className="absolute bottom-6 left-6 font-serif text-3xl font-light text-white">
                      {res.price}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-3xl font-light text-brand-bronze">
                      {res.number}
                    </span>
                    <span className="w-12 h-[1px] bg-brand-stone"></span>
                    <span className="text-xs uppercase tracking-widest text-brand-charcoal-muted font-medium">
                      {res.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-light">
                    {res.title}
                  </h3>

                  <p className="text-sm font-light text-brand-charcoal-light leading-relaxed">
                    {res.description}
                  </p>

                  {/* Spec Strip */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-stone/60">
                    <div className="flex items-center gap-3">
                      <Maximize2 className="w-4 h-4 text-brand-bronze" />
                      <span className="text-xs font-semibold text-brand-charcoal">{res.sqft}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bed className="w-4 h-4 text-brand-bronze" />
                      <span className="text-xs font-semibold text-brand-charcoal">{res.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bath className="w-4 h-4 text-brand-bronze" />
                      <span className="text-xs font-semibold text-brand-charcoal">{res.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-brand-bronze" />
                      <span className="text-xs font-semibold text-brand-charcoal">{res.floors}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => setSelectedResidence(res)}
                      className="group/btn inline-flex items-center gap-3 bg-brand-charcoal text-brand-cream hover:bg-brand-bronze hover:text-brand-charcoal text-xs uppercase tracking-widest font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
                    >
                      <span>Explore Residence & Plans</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Inspector Component */}
      {selectedResidence && (
        <ResidenceModal
          residence={selectedResidence}
          onClose={() => setSelectedResidence(null)}
          onOpenEnquire={onOpenEnquire}
        />
      )}
    </section>
  );
}
