import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LOCATION_DESTINATIONS } from '../data/realEstateData';
import { MapPin, ExternalLink, Briefcase, GraduationCap, ShoppingBag, HeartPulse, Plane, Trophy, Clock, Layers, Compass } from 'lucide-react';

export default function LocationSection() {
  const [selectedDestination, setSelectedDestination] = useState(LOCATION_DESTINATIONS[0]);
  const [mapMode, setMapMode] = useState('roadmap'); // 'roadmap' | 'satellite'

  const iconMap = {
    MapPin: MapPin,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    ShoppingBag: ShoppingBag,
    HeartPulse: HeartPulse,
    Plane: Plane,
    Trophy: Trophy
  };

  const IconSelected = iconMap[selectedDestination.icon] || MapPin;

  // Construct realistic Google Maps embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedDestination.geoQuery
  )}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=15&ie=UTF8&iwloc=&output=embed`;

  // External direct directions link
  const externalGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedDestination.geoQuery
  )}`;

  return (
    <section id="location" className="py-28 md:py-36 bg-brand-ivory border-t border-brand-stone/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
                Strategic Position
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal leading-[1.08]">
              Connected To <br />
              <span className="italic font-normal text-brand-bronze-dark">What Matters</span>
            </h2>
          </div>

          <p className="text-sm font-light text-brand-charcoal-light max-w-md leading-relaxed">
            Positioned in an elevated green belt, offering quiet seclusion while remaining effortlessly connected to primary financial, educational, and international transportation corridors.
          </p>
        </motion.div>

        {/* Interactive Google Maps & Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column - Live Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden border border-brand-stone shadow-elevated bg-brand-cream aspect-[4/3] flex flex-col justify-between group">
              {/* Live Google Maps Iframe */}
              <iframe
                title="Greenwood Estates Google Map Location"
                src={mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0 transition-opacity duration-500"
                loading="lazy"
                allowFullScreen
              />

              {/* Top Bar Header Overlay */}
              <div className="relative z-10 p-5 bg-brand-cream/90 backdrop-blur-md border-b border-brand-stone/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-charcoal text-brand-cream border border-brand-bronze flex items-center justify-center shrink-0">
                    <IconSelected className="w-4 h-4 text-brand-bronze" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-bronze-dark font-semibold block">
                      {selectedDestination.category}
                    </span>
                    <h4 className="font-serif text-lg text-brand-charcoal font-medium leading-none">
                      {selectedDestination.name}
                    </h4>
                  </div>
                </div>

                {/* Map Mode Selector (Roadmap vs Satellite) */}
                <div className="flex items-center gap-1 bg-brand-ivory p-1 rounded-full border border-brand-stone text-[10px] font-semibold uppercase tracking-wider">
                  <button
                    onClick={() => setMapMode('roadmap')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      mapMode === 'roadmap'
                        ? 'bg-brand-charcoal text-white'
                        : 'text-brand-charcoal-muted hover:text-brand-charcoal'
                    }`}
                  >
                    Map
                  </button>
                  <button
                    onClick={() => setMapMode('satellite')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      mapMode === 'satellite'
                        ? 'bg-brand-charcoal text-white'
                        : 'text-brand-charcoal-muted hover:text-brand-charcoal'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              {/* Bottom Info Bar & External Google Maps Button */}
              <div className="relative z-10 p-5 bg-brand-cream/95 backdrop-blur-md border-t border-brand-stone/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal">
                    <Clock className="w-3.5 h-3.5 text-brand-bronze" />
                    <span>{selectedDestination.distance} Estimated Drive</span>
                    <span className="text-brand-stone">|</span>
                    <span className="text-brand-charcoal-muted font-normal">{selectedDestination.coords}</span>
                  </div>
                  <div className="text-[11px] text-brand-charcoal-muted font-light">
                    {selectedDestination.desc}
                  </div>
                </div>

                <a
                  href={externalGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-charcoal text-brand-cream hover:bg-brand-bronze hover:text-brand-charcoal text-[10px] uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
                >
                  <span>Open In Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Destination List Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-bronze-dark">
                Nearby Proximity Destinations
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-brand-charcoal-muted font-mono">
                Click To Focus Map
              </span>
            </div>

            <div className="space-y-3">
              {LOCATION_DESTINATIONS.map((dest, idx) => {
                const IconComponent = iconMap[dest.icon] || MapPin;
                const isSelected = selectedDestination.id === dest.id;

                return (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onClick={() => setSelectedDestination(dest)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-cream border-brand-bronze shadow-soft-luxury scale-[1.02]'
                        : 'bg-brand-cream/50 border-brand-stone/60 hover:bg-brand-cream hover:border-brand-stone'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-brand-bronze text-brand-charcoal shadow-sm'
                            : 'bg-brand-ivory text-brand-charcoal-muted border border-brand-stone'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-serif text-base font-medium text-brand-charcoal leading-snug">
                          {dest.name}
                        </div>
                        <div className="text-[11px] text-brand-charcoal-muted font-light line-clamp-1">
                          {dest.desc}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2">
                      <span className="font-mono text-xs font-bold text-brand-bronze-dark block">
                        {dest.distance}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-brand-charcoal-muted">
                        {dest.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
