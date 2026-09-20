import React, { useState } from 'react';
import { Volume2, VolumeX, Leaf, Sun, Feather, TreePine } from 'lucide-react';

export default function NatureLifestyle() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative py-32 md:py-44 bg-brand-charcoal text-white overflow-hidden">
      {/* Background Image with Parallax & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop"
          alt="Greenwood Preserved Canopy Forest"
          className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-brand-charcoal/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl space-y-8">
          {/* Tag & Ambient Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-bronze animate-ping"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze">
                Biophilic Sanctuary
              </span>
            </div>

            {/* Sound Toggle (Conceptual Audio Experience) */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-md transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-brand-bronze" /> : <Volume2 className="w-3.5 h-3.5 text-brand-bronze" />}
              <span>{isMuted ? 'Ambient Forest Audio: Off' : 'Ambient Forest Audio: Playing'}</span>
            </button>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-brand-cream leading-[1.08]">
            Designed Around <br />
            <span className="italic font-normal text-brand-bronze-light">A Better Way To Live</span>
          </h2>

          <p className="text-base sm:text-xl font-light text-white/80 leading-relaxed max-w-2xl">
            Imagine waking up to filtered morning light through high forest canopies, walking along private cobblestone trails, and taking in air that is naturally purified by thousands of native pine and cedar trees.
          </p>

          {/* Environmental Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/15">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-bronze">
                <Sun className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Natural Sunlight</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Optimized building orientation captures max solar warmth in winter while providing shade in summer.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-bronze">
                <TreePine className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">65% Green Cover</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                More than half of the estate grounds are permanently preserved as protected natural forest.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-bronze">
                <Feather className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Acoustic Peace</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Thick forest buffer zones filter out urban noise, creating a quiet sanctuary for your family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
