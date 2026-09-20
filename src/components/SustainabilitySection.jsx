import React from 'react';
import { SUSTAINABILITY_HIGHLIGHTS } from '../data/realEstateData';
import { TreePine, Sun, Droplets, Zap, ShieldCheck, Leaf } from 'lucide-react';

export default function SustainabilitySection() {
  const iconMap = {
    TreePine: TreePine,
    Sun: Sun,
    Droplets: Droplets,
    Zap: Zap
  };

  return (
    <section className="py-28 md:py-36 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
              Environmental Engineering
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal leading-[1.08]">
            Responsible Design <br />
            <span className="italic font-normal text-brand-bronze-dark">Built For Generations</span>
          </h2>
          <p className="text-sm font-light text-brand-charcoal-light leading-relaxed">
            Sustainability at Greenwood Estates is not an afterthought—it is embedded into every foundation stone, solar grid, and bio-filtration waterway.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUSTAINABILITY_HIGHLIGHTS.map((item, index) => {
            const IconComp = iconMap[item.icon] || Leaf;

            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-brand-ivory border border-brand-stone/60 shadow-soft-luxury hover:border-brand-bronze/40 transition-all duration-300 space-y-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green-soft border border-brand-green-muted/20 flex items-center justify-center text-brand-green-muted transition-colors duration-300 group-hover:bg-brand-bronze group-hover:text-brand-charcoal">
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-light text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-charcoal-muted leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eco Architectural Image & Quote Banner */}
        <div className="mt-16 rounded-3xl overflow-hidden relative aspect-[21/9] min-h-[300px] border border-brand-stone shadow-elevated">
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop"
            alt="Sustainable Villa Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/50 to-transparent p-8 md:p-14 flex flex-col justify-center max-w-xl text-white">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-bronze-light mb-2">
              IGBC Platinum Certified Concept
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-light leading-snug mb-4">
              "Net-zero carbon footprint goal across all common amenities."
            </h3>
            <p className="text-xs text-white/80 font-light">
              Designed in collaboration with international bioclimatic engineering specialists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
