import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer({ onOpenEnquire }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-charcoal text-white pt-24 pb-12 border-t border-brand-charcoal-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-brand-bronze flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-brand-bronze rotate-45"></div>
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] font-medium block uppercase text-brand-cream">
                  Greenwood
                </span>
                <span className="text-[9px] tracking-[0.35em] block uppercase text-brand-bronze-light">
                  Estates
                </span>
              </div>
            </div>

            <p className="text-sm font-light text-white/70 max-w-sm leading-relaxed">
              "A Better Tomorrow Begins Here" — Greenwood Estates is a sanctuary of architectural distinction, natural harmony, and long-term residential legacy.
            </p>

            <div className="flex items-center gap-4 text-white/60">
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-bronze hover:text-brand-bronze transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-bronze hover:text-brand-bronze transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-bronze hover:text-brand-bronze transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze font-semibold">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs text-white/70 font-light uppercase tracking-widest">
              <li><a href="#residences" className="hover:text-brand-bronze transition-colors">Residences</a></li>
              <li><a href="#intro" className="hover:text-brand-bronze transition-colors">Philosophical Experience</a></li>
              <li><a href="#amenities" className="hover:text-brand-bronze transition-colors">Resort Amenities</a></li>
              <li><a href="#location" className="hover:text-brand-bronze transition-colors">Location Proximity</a></li>
              <li><a href="#gallery" className="hover:text-brand-bronze transition-colors">Visual Gallery</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze font-semibold">
              Sales Gallery & Concierge
            </p>
            <div className="space-y-3 text-xs text-white/70 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-bronze shrink-0 mt-0.5" />
                <span>01 Greenwood Boulevard, Forest Reserve Sector 44, Metro Area</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-bronze shrink-0" />
                <span>+1 (800) 555-GREEN (47336)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-bronze shrink-0" />
                <span>concierge@greenwoodestates.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquire()}
                className="px-6 py-2.5 bg-brand-bronze text-brand-charcoal hover:bg-white text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full transition-all"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <div>© 2026 Greenwood Estates. All rights reserved. Architectural renderings subject to design updates.</div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-brand-bronze transition-colors uppercase tracking-widest text-[10px]"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
