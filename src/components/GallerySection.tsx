import React, { useState } from 'react';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Calendar 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery, openBooking } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'hair', label: "Women's Hair" },
    { id: 'bridal', label: 'Bridal & Glam' },
    { id: 'grooming', label: "Men's Grooming" },
    { id: 'ambience', label: 'Salon Ambience' },
    { id: 'spa', label: 'Spa & Facials' },
  ];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredGallery.findIndex(i => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredGallery.length;
    setActiveLightboxItem(filteredGallery[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredGallery.findIndex(i => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setActiveLightboxItem(filteredGallery[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-[#d4af37] text-[#5c0d1e] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-stone-950 mb-3 uppercase">
            Artistry & <span className="text-[#996515]">Transformations</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="font-cormorant text-lg sm:text-xl text-stone-700 italic font-semibold">
            Real customer transformations, bespoke bridal styles, sharp fades, beard sculpting and salon ambience.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 shadow-md scale-105'
                  : 'bg-stone-100 text-stone-700 border border-stone-200 hover:text-stone-950 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-stone-200 hover:border-[#d4af37] shadow-md hover:shadow-xl bg-stone-100 transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-stone-950 text-[10px] font-black uppercase tracking-wider w-max mb-2">
                  {item.tag}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-200 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#f7e49a] font-bold uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>View Full Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-900 text-white hover:bg-[#5c0d1e] border border-stone-700 transition-colors z-50 shadow-lg"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#5c0d1e] border border-stone-700 transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Nav Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#5c0d1e] border border-stone-700 transition-colors shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content Box */}
            <div className="max-w-4xl w-full bg-white border border-stone-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="md:w-3/5 bg-stone-950 flex items-center justify-center max-h-[70vh] overflow-hidden">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-[#5c0d1e] text-xs font-bold uppercase tracking-wider mb-4 border border-[#d4af37]/40">
                    {activeLightboxItem.tag}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-black text-stone-950 mb-3 leading-snug">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 font-medium">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <button
                    onClick={() => {
                      setActiveLightboxItem(null);
                      openBooking();
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-transform"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Similar Look</span>
                  </button>
                  <p className="text-[11px] text-stone-500 text-center font-medium">
                    Show this reference to your stylist during consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default GallerySection;
