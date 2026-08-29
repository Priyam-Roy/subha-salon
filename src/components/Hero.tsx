import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Star, 
  Award, 
  ShieldCheck, 
  Clock, 
  Scissors
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import heroToolsFrame from '../assets/images/hero_tools_frame_1787992268306.jpg';
import heroMobilePortraitFrame from '../assets/images/hero_mobile_portrait_frame_1787993047876.jpg';

export const Hero: React.FC = () => {
  const { openBooking } = useSalon();

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-between pt-16 sm:pt-20 pb-8 sm:pb-12 bg-stone-100 text-stone-900 overflow-hidden"
    >
      {/* BACKGROUND LAYER (z-index: 0) - Always behind all content */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden flex items-center justify-center pointer-events-none">
        {/* 1. Dedicated Mobile Portrait Background (9:16) */}
        <img
          src={heroMobilePortraitFrame}
          alt="Luxury Salon Tools Portrait Frame"
          className="block md:hidden w-full h-full object-cover object-top opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* 2. Desktop Landscape Background */}
        <img
          src={heroToolsFrame}
          alt="Luxury Salon Tools Landscape Frame"
          className="hidden md:block w-full h-full object-cover object-center opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Studio-Grade Ambient Lighting & Soft Champagne Glow for High-End Editorial Feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(255,255,255,0.75)_0%,rgba(255,251,240,0.35)_45%,rgba(245,240,230,0.05)_75%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 via-white/20 to-transparent pointer-events-none" />
      </div>

      {/* FOREGROUND CONTENT LAYER (z-index: 10) - Sits precisely in the central clear marble zone */}
      <div className="relative z-10 w-full max-w-[275px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-md mx-auto px-1 sm:px-2 text-center flex flex-col items-center justify-center my-auto">
        
        {/* 1. Top Luxury Line Accent: UNISEX LUXURY LOUNGE */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2 mb-1 xs:mb-1.5 w-full">
          <span className="w-5 xs:w-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]" />
          <span className="font-cinzel text-[10.5px] xs:text-[11.5px] sm:text-xs font-black tracking-[0.16em] text-[#8b1528] uppercase whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Unisex Luxury Lounge
          </span>
          <div className="flex items-center gap-1">
            <Scissors className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#d4af37] drop-shadow-xs" />
            <span className="w-4 xs:w-6 h-[1.5px] bg-gradient-to-r from-[#d4af37] via-[#d4af37] to-transparent" />
          </div>
        </div>

        {/* 2. Hero Title: SUBHA SALON */}
        <h1 className="font-cinzel text-[2.2rem] xs:text-[2.5rem] sm:text-4xl md:text-5xl font-black tracking-[0.05em] text-[#8b1528] uppercase leading-[1.08] mb-1 xs:mb-1.5 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
          Subha Salon
        </h1>

        {/* 3. Subtitle / Tagline - Formatted in 4 balanced lines with 1.2 line height */}
        <p className="font-cormorant text-[13.5px] xs:text-[14.5px] sm:text-[16px] md:text-lg text-stone-900 italic font-bold leading-[1.2] max-w-[240px] xs:max-w-[260px] sm:max-w-md mx-auto mb-2 xs:mb-2.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          Where Haute Couture Hair Design,<br />
          Master Grooming &amp; Radiant<br />
          Skin Artistry Meet In<br />
          Pure Elegance.
        </p>

        {/* 4. Compact Pricing Pill */}
        <div className="w-full max-w-[260px] xs:max-w-[285px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(212,175,55,0.15)] border border-amber-200/70 py-1.5 xs:py-2 px-3 mb-2 xs:mb-2.5 text-center relative z-20 transition-transform duration-300 hover:border-amber-400/80">
          <div className="flex items-center justify-center gap-2 xs:gap-2.5 text-[10.5px] xs:text-[11px] sm:text-xs font-bold text-stone-900 whitespace-nowrap">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1528]" />
              Haircut from <strong className="text-[#8b1528] font-cinzel">₹50</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              Beard &amp; Spa <strong className="text-[#8b1528] font-cinzel">₹100</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[10.5px] xs:text-[11px] sm:text-xs font-bold text-stone-900 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Combo <strong className="text-[#8b1528] font-cinzel">₹150</strong></span>
          </div>
        </div>

        {/* 5. Two Action Buttons: BOOK APPOINTMENT + EXPLORE SERVICES (z-index: 20) */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[270px] xs:max-w-[295px] sm:max-w-xs mb-2.5 relative z-20">
          <button
            id="hero-book-now-cta"
            onClick={() => openBooking()}
            className="w-full py-2.5 px-1 xs:px-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-black text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-tight xs:tracking-wider shadow-[0_4px_14px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] active:scale-95 transition-all flex items-center justify-center gap-1 border border-amber-300/60"
          >
            <Calendar className="w-3.5 h-3.5 text-[#5c0d1e] flex-shrink-0" />
            <span className="whitespace-nowrap">BOOK APPOINTMENT</span>
          </button>

          <a
            href="#services"
            className="w-full py-2.5 px-1 xs:px-2 rounded-xl bg-white/95 hover:bg-white border border-amber-200/70 text-stone-950 font-cinzel font-black text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-tight xs:tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
            <span className="whitespace-nowrap">EXPLORE SERVICES</span>
          </a>
        </div>

        {/* 6. Four Compact Information Cards (2x2 Grid) (z-index: 20) */}
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 w-full max-w-[260px] xs:max-w-[285px] sm:max-w-xs mb-2 xs:mb-3 relative z-20">
          {/* Card 1: Ratings */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl py-1.5 xs:py-2 px-1 xs:px-2 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-amber-100/90 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 font-cinzel font-black text-[11px] xs:text-xs sm:text-sm text-stone-950">
              <Star className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#d4af37] fill-[#d4af37]" />
              <span>4.98 / 5.0</span>
            </div>
            <div className="text-[7.5px] xs:text-[8.5px] font-bold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
              Premium Ratings
            </div>
          </div>

          {/* Card 2: Stylists */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl py-1.5 xs:py-2 px-1 xs:px-2 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-amber-100/90 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 font-cinzel font-black text-[11px] xs:text-xs sm:text-sm text-stone-950">
              <Award className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#d4af37]" />
              <span>MASTER</span>
            </div>
            <div className="text-[7.5px] xs:text-[8.5px] font-bold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
              Certified Stylists
            </div>
          </div>

          {/* Card 3: Sterile */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl py-1.5 xs:py-2 px-1 xs:px-2 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-amber-100/90 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 font-cinzel font-black text-[11px] xs:text-xs sm:text-sm text-stone-950">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% STERILE</span>
            </div>
            <div className="text-[7.5px] xs:text-[8.5px] font-bold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
              Hospital-Grade
            </div>
          </div>

          {/* Card 4: Open 7 Days */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl py-1.5 xs:py-2 px-1 xs:px-2 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-amber-100/90 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 font-cinzel font-black text-[11px] xs:text-xs sm:text-sm text-stone-950">
              <Clock className="w-3.5 h-3.5 text-[#8b1528]" />
              <span>7 DAYS OPEN</span>
            </div>
            <div className="text-[7.5px] xs:text-[8.5px] font-bold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
              9:30 AM – 9:30 PM
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

