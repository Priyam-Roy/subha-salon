import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  ShieldCheck, 
  Award, 
  Crown, 
  Check, 
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import barberScissorsGold from '../assets/images/barber_scissors_gold_1787983158976.jpg';
import mensFadePompadour from '../assets/images/mens_fade_pompadour_1787992289455.jpg';
import mensTexturedCrop from '../assets/images/mens_textured_crop_1787992307557.jpg';
import mensSpikyQuiff from '../assets/images/mens_spiky_quiff_1787992323870.jpg';
import mensWavyCurtain from '../assets/images/mens_wavy_curtain_1787992347203.jpg';
import womenLayeredBangs from '../assets/images/women_layered_bangs_1787992363392.jpg';

export const AboutSection: React.FC = () => {
  const { openBooking } = useSalon();
  const [activeHaircutIndex, setActiveHaircutIndex] = useState(0);

  const haircuts = [
    {
      id: 'hc-1',
      title: 'Low Skin Fade & Pompadour',
      category: "Men's Precision Cut",
      price: '₹50 – ₹100',
      image: mensFadePompadour,
      tag: 'Classic Modern Fade',
      description: 'Razor-sharp low taper skin fade with textured pompadour comb-over and sculpted jawline beard contour.',
    },
    {
      id: 'hc-2',
      title: 'Modern Textured French Crop',
      category: "Men's Urban Cut",
      price: '₹50 – ₹100',
      image: mensTexturedCrop,
      tag: 'Trending 2026',
      description: 'Choppy textured top with blunt fringe, seamless drop fade on the temples, and natural matte hold.',
    },
    {
      id: 'hc-3',
      title: 'Spiky Textured Quiff & Beard Fade',
      category: "Men's Signature Cut",
      price: '₹50 – ₹150 (Combo)',
      image: mensSpikyQuiff,
      tag: 'High Contrast Quiff',
      description: 'High-contrast textured spiky quiff styled with clay pomade, accompanied by clean razor beard sculpting.',
    },
    {
      id: 'hc-4',
      title: 'Wavy Curtain Taper Flow',
      category: "Men's Classic Flow",
      price: '₹50 – ₹100',
      image: mensWavyCurtain,
      tag: 'Korean / Retro Flow',
      description: 'Layered middle-part wave with soft side tapers, highlighting natural volume and effortless flow.',
    },
    {
      id: 'hc-5',
      title: 'Voluminous Layers & Curtain Bangs',
      category: "Women's Couture Cut",
      price: '₹150 (Max ₹800)',
      image: womenLayeredBangs,
      tag: 'Haute Glamour',
      description: 'Face-framing curtain bangs with bouncy butterfly blowout layers for luxurious bounce, density, and shine.',
    },
  ];

  const currentHaircut = haircuts[activeHaircutIndex];

  const pillars = [
    {
      icon: <Scissors className="w-6 h-6 text-[#5c0d1e]" />,
      title: 'Precision Japanese & Italian Shears',
      description: 'Every haircut is sculpted with hand-forged stainless steel and titanium gold scissors for microscopic edge precision and split-end prevention.',
    },
    {
      icon: <Crown className="w-6 h-6 text-[#5c0d1e]" />,
      title: 'Haute Unisex Luxury Sanctuary',
      description: 'Dedicated bespoke grooming suites for gentlemen and private beauty & glow styling pavilions for women, designed with pure comfort and luxury.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#5c0d1e]" />,
      title: 'Sterilized Hospital-Grade Hygiene',
      description: 'Autoclave UV sterilization for all metal combs, razors, and shears. Fresh sanitized towels, disposable eco-capes, and pristine stations.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#5c0d1e]" />,
      title: 'International Luxury Botanicals',
      description: 'Exclusively using dermatologically tested global formulas: Moroccanoil, Olaplex, Kérastase, MAC, RICA Italy, and 24K Gold elixirs.',
    },
  ];

  return (
    <section id="about" className="py-10 sm:py-14 bg-stone-50/40 relative overflow-hidden border-y border-stone-200/60">
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50/80 backdrop-blur-sm border border-[#d4af37]/60 text-[#5c0d1e] text-[10.5px] font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>The Subha Philosophy & Lookbook</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 mb-2 uppercase">
            Crafting <span className="text-[#996515]">Signature Haircuts</span> & Distinction
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-3" />
          <p className="font-cormorant text-base sm:text-lg text-stone-700 italic leading-snug font-semibold">
            "Where master craftsmanship, precision haircutting, and warm hospitality come together."
          </p>
        </div>

        {/* 2-Column Story & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          
          {/* Left Column: 5 Haircuts Showcase Viewer */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-xl overflow-hidden border border-[#d4af37]/60 shadow-lg bg-stone-900 group">
              
              {/* Active Haircut Main Image */}
              <div className="relative h-[250px] sm:h-[290px] md:h-[320px] w-full overflow-hidden bg-stone-950">
                <img
                  src={currentHaircut.image}
                  alt={currentHaircut.title}
                  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Top Badge: Style Tag & Number */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#d4af37] text-[9.5px] font-cinzel font-bold text-[#d4af37] uppercase tracking-wider shadow-2xs">
                    {currentHaircut.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-bold font-cinzel">
                    Style {activeHaircutIndex + 1} of 5
                  </span>
                </div>

                {/* Left/Right Quick Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHaircutIndex((prev) => (prev === 0 ? haircuts.length - 1 : prev - 1));
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-stone-950 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
                  aria-label="Previous Haircut Style"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHaircutIndex((prev) => (prev === haircuts.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-stone-950 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
                  aria-label="Next Haircut Style"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 p-2.5 sm:p-3 rounded-lg bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-cinzel font-bold text-[#5c0d1e]">
                        {currentHaircut.category}
                      </span>
                      <h4 className="font-cinzel text-xs sm:text-sm font-black text-stone-950 uppercase leading-tight">
                        {currentHaircut.title}
                      </h4>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs sm:text-sm font-cinzel font-black text-[#5c0d1e]">
                        {currentHaircut.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-stone-600 font-medium mt-0.5 leading-tight line-clamp-1">
                    {currentHaircut.description}
                  </p>
                </div>
              </div>

              {/* 5 Haircut Interactive Thumbnails Bar */}
              <div className="p-2 bg-stone-950/95 border-t border-stone-800 flex items-center justify-between gap-1.5 overflow-x-auto">
                {haircuts.map((hc, idx) => (
                  <button
                    key={hc.id}
                    onClick={() => setActiveHaircutIndex(idx)}
                    className={`relative flex-1 min-w-[48px] h-10 sm:h-11 rounded-md overflow-hidden border transition-all duration-300 ${
                      activeHaircutIndex === idx
                        ? 'border-[#d4af37] scale-105 shadow-xs'
                        : 'border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={hc.image} 
                      alt={hc.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-0 right-0.5 text-[7.5px] font-cinzel font-black text-white bg-black/60 px-0.5 rounded-xs">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-6 space-y-3.5">
            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-stone-950 uppercase leading-tight">
              Step Into An Oasis Of <span className="text-[#996515]">Warmth & Elegance</span>
            </h3>
            
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              At <strong className="text-[#5c0d1e] font-bold">Subha Salon</strong>, we offer transparent, accessible luxury with unbeatable service value. Men’s Normal Hair Cut at ₹60, (Hair + Beard) at ₹100, (Hair + Beard + Spa) at ₹200, and women’s grooming from ₹150 up to ₹800.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-[#5c0d1e] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>One-on-One Face Consultation</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-[#5c0d1e] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Ammonia-Free Hair Care</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-[#5c0d1e] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Acupressure Scalp Therapy</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-[#5c0d1e] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>100% Sterile Razor Hygiene</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openBooking()}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-sm hover:scale-102 transition-all"
              >
                Book This Style
              </button>
              <a
                href="#pricing"
                className="text-xs uppercase tracking-wider font-bold text-[#5c0d1e] hover:underline"
              >
                View Packages →
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid: Compact Glass Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-xl bg-white/75 backdrop-blur-md border border-stone-200/70 hover:border-[#d4af37] transition-all duration-300 shadow-2xs hover:shadow-xs group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-50/80 border border-[#d4af37]/40 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-cinzel text-xs sm:text-sm font-bold text-stone-950 mb-1 uppercase group-hover:text-[#5c0d1e] transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

