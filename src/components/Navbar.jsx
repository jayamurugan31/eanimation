import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass, Home, Sparkles, MapPin, Image } from 'lucide-react';

export default function Navbar({ onOpenEnquire, onSelectResidence }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Residences', href: '#residences', icon: Home },
    { label: 'Experience', href: '#intro', icon: Compass },
    { label: 'Amenities', href: '#amenities', icon: Sparkles },
    { label: 'Location', href: '#location', icon: MapPin },
    { label: 'Gallery', href: '#gallery', icon: Image },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-md border-b border-brand-stone/60 py-4 shadow-soft-luxury'
          : 'bg-gradient-to-b from-brand-charcoal/40 via-brand-charcoal/15 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a href="#" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-brand-bronze/60 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
            <div className="w-2.5 h-2.5 bg-brand-bronze rotate-45"></div>
          </div>
          <div>
            <span
              className={`font-serif text-xl tracking-[0.2em] font-medium block uppercase ${
                scrolled ? 'text-brand-charcoal' : 'text-white'
              }`}
            >
              Greenwood
            </span>
            <span
              className={`text-[9px] tracking-[0.35em] block uppercase ${
                scrolled ? 'text-brand-bronze-dark' : 'text-brand-bronze-light'
              }`}
            >
              Estates
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-bronze after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? 'text-brand-charcoal-light hover:text-brand-charcoal'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenEnquire}
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 border ${
              scrolled
                ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal hover:bg-brand-bronze hover:border-brand-bronze hover:text-brand-charcoal'
                : 'bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white hover:text-brand-charcoal'
            }`}
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-full border ${
            scrolled
              ? 'text-brand-charcoal border-brand-stone'
              : 'text-white border-white/20 bg-black/20 backdrop-blur-sm'
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-brand-cream z-40 px-6 py-8 flex flex-col justify-between border-t border-brand-stone animate-fadeIn">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-bronze font-semibold">
              Navigation Menu
            </p>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-brand-charcoal hover:text-brand-bronze py-2 text-lg font-serif tracking-wide border-b border-brand-stone/40"
                  >
                    <IconComponent className="w-4 h-4 text-brand-bronze" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 space-y-4 border-t border-brand-stone/60">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquire();
              }}
              className="w-full py-3.5 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-[0.2em] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-brand-bronze hover:text-brand-charcoal transition-colors"
            >
              <span>Schedule Private Viewing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] uppercase tracking-widest text-brand-charcoal-muted">
              Greenwood Estates © 2026
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
