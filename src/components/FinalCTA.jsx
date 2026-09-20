import React from 'react';
import { Calendar, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FinalCTA({ onOpenEnquire }) {
  const handleDownloadBrochure = () => {
    // Simulate luxury brochure download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'Greenwood_Estates_Master_Brochure.pdf');
    alert('Greenwood Estates Luxury Digital Brochure download started.');
  };

  return (
    <section className="relative py-32 md:py-44 bg-brand-charcoal text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Greenwood Estates Completed Residence"
          className="w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/60 to-brand-charcoal/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-bronze/20 border border-brand-bronze/40 text-brand-bronze-light text-xs font-semibold uppercase tracking-[0.25em]">
          <span>Private Viewing Appointments</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-brand-cream leading-[1.08]">
          Your Next Chapter <br />
          <span className="italic font-normal text-brand-bronze-light">Starts Here</span>
        </h2>

        <p className="text-base sm:text-xl font-light text-white/80 max-w-xl mx-auto leading-relaxed">
          Discover a home designed for better living, every day. Private viewings are available by appointment only.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenEnquire()}
            className="group inline-flex items-center gap-3 bg-brand-bronze text-brand-charcoal hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold px-9 py-4 rounded-full transition-all duration-300 shadow-glow-bronze"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule a Visit</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={handleDownloadBrochure}
            className="group inline-flex items-center gap-3 bg-white/10 text-white hover:bg-white/20 border border-white/30 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium px-9 py-4 rounded-full transition-all duration-300"
          >
            <Download className="w-4 h-4 text-brand-bronze" />
            <span>Download Brochure</span>
          </button>
        </div>

        {/* Small reassurance icons */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-white/60 uppercase tracking-widest font-light">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-bronze" />
            <span>Exclusive Gated Estate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-bronze" />
            <span>Immediate Possession Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
