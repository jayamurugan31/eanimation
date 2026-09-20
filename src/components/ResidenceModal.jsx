import React, { useState } from 'react';
import { X, Check, ArrowRight, Bed, Bath, Maximize2, Layers, Compass, Calendar } from 'lucide-react';

export default function ResidenceModal({ residence, onClose, onOpenEnquire }) {
  if (!residence) return null;
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'floorplan' | 'gallery'
  const [activeImage, setActiveImage] = useState(residence.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-brand-cream rounded-2xl overflow-hidden shadow-2xl border border-brand-stone/60 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-brand-stone flex items-center justify-between bg-brand-ivory">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-brand-bronze">
              {residence.number}
            </span>
            <h3 className="font-serif text-2xl font-light text-brand-charcoal">
              {residence.title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze-dark font-semibold">
              {residence.tag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-brand-cream border border-brand-stone flex items-center justify-center text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 border-b border-brand-stone/60 bg-brand-cream flex gap-6 text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-1 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-brand-bronze text-brand-charcoal'
                : 'border-transparent text-brand-charcoal-muted hover:text-brand-charcoal'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('floorplan')}
            className={`py-1 border-b-2 transition-colors ${
              activeTab === 'floorplan'
                ? 'border-brand-bronze text-brand-charcoal'
                : 'border-transparent text-brand-charcoal-muted hover:text-brand-charcoal'
            }`}
          >
            Floorplan Blueprint
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-1 border-b-2 transition-colors ${
              activeTab === 'gallery'
                ? 'border-brand-bronze text-brand-charcoal'
                : 'border-transparent text-brand-charcoal-muted hover:text-brand-charcoal'
            }`}
          >
            Visual Gallery
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Image Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-brand-stone">
                  <img
                    src={activeImage}
                    alt={residence.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[residence.image, ...residence.gallery].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImage === img ? 'border-brand-bronze scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Specs Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-bronze-dark font-medium mb-1">
                    {residence.subtitle}
                  </p>
                  <div className="font-serif text-3xl font-light text-brand-charcoal">
                    {residence.price}
                  </div>
                </div>

                <p className="text-sm text-brand-charcoal-light leading-relaxed font-light">
                  {residence.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-stone/60">
                  <div className="flex items-center gap-3">
                    <Maximize2 className="w-4 h-4 text-brand-bronze" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-charcoal-muted">Total Area</div>
                      <div className="text-xs font-semibold text-brand-charcoal">{residence.sqft}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bed className="w-4 h-4 text-brand-bronze" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-charcoal-muted">Bedrooms</div>
                      <div className="text-xs font-semibold text-brand-charcoal">{residence.bedrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bath className="w-4 h-4 text-brand-bronze" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-charcoal-muted">Bathrooms</div>
                      <div className="text-xs font-semibold text-brand-charcoal">{residence.bathrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-brand-bronze" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-charcoal-muted">Level / Floor</div>
                      <div className="text-xs font-semibold text-brand-charcoal">{residence.floors}</div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold">
                    Exclusive Features
                  </p>
                  <ul className="space-y-2">
                    {residence.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-charcoal-light">
                        <Check className="w-4 h-4 text-brand-bronze shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'floorplan' && (
            <div className="space-y-6">
              <div className="bg-brand-ivory p-6 rounded-xl border border-brand-stone flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-serif text-2xl text-brand-charcoal mb-1">Architectural Floor Layout</h4>
                  <p className="text-xs text-brand-charcoal-muted">
                    {residence.title} — {residence.sqft} with {residence.outdoor}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-brand-bronze-dark">
                  <span>SCALE 1:100</span>
                  <span>|</span>
                  <span>ORIENTATION: {residence.orientation}</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-brand-stone bg-white p-4 md:p-8 flex justify-center">
                <img
                  src={residence.floorplanImage}
                  alt={`${residence.title} Floorplan`}
                  className="max-h-[500px] object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[residence.image, ...residence.gallery].map((imgUrl, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] border border-brand-stone">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 bg-brand-ivory border-t border-brand-stone flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-brand-charcoal-muted">
            Interested in <span className="font-semibold text-brand-charcoal">{residence.title}</span>? Request full brochure & pricing.
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenEnquire(residence.title);
            }}
            className="w-full sm:w-auto px-8 py-3 bg-brand-charcoal text-brand-cream hover:bg-brand-bronze hover:text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            <span>Schedule Private Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
