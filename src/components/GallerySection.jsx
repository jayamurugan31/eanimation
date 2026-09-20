import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/realEstateData';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Architecture', 'Interiors', 'Landscape', 'Amenities'];

  const filteredGallery =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-28 md:py-36 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-bronze"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark">
                Visual Portfolio
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-charcoal leading-[1.08]">
              Editorial <br />
              <span className="italic font-normal text-brand-bronze-dark">Architecture Gallery</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal'
                    : 'bg-brand-ivory text-brand-charcoal-muted border-brand-stone hover:border-brand-bronze'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Magazine Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredGallery.map((item, idx) => {
            // Determine asymmetric spans for magazine aesthetic
            let colSpan = 'md:col-span-6';
            let aspect = 'aspect-[16/11]';

            if (idx % 5 === 0) {
              colSpan = 'md:col-span-8';
              aspect = 'aspect-[16/10]';
            } else if (idx % 5 === 1) {
              colSpan = 'md:col-span-4';
              aspect = 'aspect-[4/5]';
            } else if (idx % 5 === 2) {
              colSpan = 'md:col-span-4';
              aspect = 'aspect-[1/1]';
            } else if (idx % 5 === 3) {
              colSpan = 'md:col-span-8';
              aspect = 'aspect-[16/9]';
            }

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-brand-stone/60 shadow-soft-luxury ${colSpan} ${aspect}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-bronze-light font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-light">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] space-y-4 text-center">
            <img
              src={filteredGallery[lightboxIndex].image}
              alt=""
              className="max-h-[75vh] w-auto mx-auto rounded-lg shadow-2xl"
            />
            <div className="text-white space-y-1">
              <span className="text-xs uppercase tracking-widest text-brand-bronze font-semibold">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h4 className="font-serif text-2xl font-light">
                {filteredGallery[lightboxIndex].title}
              </h4>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
