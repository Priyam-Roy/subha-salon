import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Check, 
  Calendar, 
  Scissors, 
  Crown, 
  Tag 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { ServiceGender } from '../types';

export const ServicesSection: React.FC = () => {
  const { services, openBooking } = useSalon();
  const [selectedGender, setSelectedGender] = useState<ServiceGender>('men');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  // Filter services by gender
  const currentServices = services.filter(s => s.category === selectedGender);

  // Extract unique subcategories
  const subcategories = ['All', ...Array.from(new Set(currentServices.map(s => s.subcategory)))];

  const filteredServices = selectedSubcategory === 'All'
    ? currentServices
    : currentServices.filter(s => s.subcategory === selectedSubcategory);

  return (
    <section id="services" className="py-10 sm:py-14 bg-stone-50/40 relative">
      {/* Anchors for direct navbar jumps */}
      <div id="men-services" className="relative -top-20" />
      <div id="women-services" className="relative -top-20" />

      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-rose-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50/80 backdrop-blur-sm border border-[#d4af37]/60 text-[#5c0d1e] text-[10.5px] font-bold uppercase tracking-widest mb-2">
            <Crown className="w-3 h-3 text-[#d4af37]" />
            <span>Unisex Haute Menu</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 mb-2 uppercase">
            Bespoke <span className="text-[#996515]">Service Menu</span>
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-2.5" />
          <p className="font-cormorant text-base sm:text-lg text-stone-700 italic font-semibold">
            {selectedGender === 'men' 
              ? "Men's Normal Hair Cut at ₹60, (Hair + Beard) at ₹100, and (Hair + Beard + Spa) at ₹200."
              : "Women's styling starting from ₹150, organic spa at ₹300, max ₹800."}
          </p>
        </div>

        {/* Gender Selection Tabs */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex p-1 rounded-xl bg-stone-100/90 backdrop-blur-sm border border-stone-200 shadow-2xs">
            <button
              id="men-services-tab-btn"
              onClick={() => {
                setSelectedGender('men');
                setSelectedSubcategory('All');
              }}
              className={`flex items-center gap-1.5 px-4 sm:px-7 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-black uppercase tracking-wider transition-all duration-300 ${
                selectedGender === 'men'
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 shadow-xs'
                  : 'text-stone-700 hover:text-[#5c0d1e] hover:bg-stone-200/50'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-[#5c0d1e]" />
              <span>Men's Services</span>
              <span className="text-[9.5px] opacity-80 hidden sm:inline">(From ₹60)</span>
            </button>

            <button
              id="women-services-tab-btn"
              onClick={() => {
                setSelectedGender('women');
                setSelectedSubcategory('All');
              }}
              className={`flex items-center gap-1.5 px-4 sm:px-7 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-black uppercase tracking-wider transition-all duration-300 ${
                selectedGender === 'women'
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 shadow-xs'
                  : 'text-stone-700 hover:text-[#5c0d1e] hover:bg-stone-200/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5c0d1e]" />
              <span>Women's Services</span>
              <span className="text-[9.5px] opacity-80 hidden sm:inline">(₹150 – ₹800)</span>
            </button>
          </div>
        </div>

        {/* Subcategory Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-6 sm:mb-8">
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => setSelectedSubcategory(subcat)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                selectedSubcategory === subcat
                  ? 'bg-[#5c0d1e] text-white shadow-2xs'
                  : 'bg-white/80 text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>

        {/* Services Grid: Compact Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col rounded-xl bg-white/80 backdrop-blur-md border border-stone-200/80 hover:border-[#d4af37] overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md group"
            >
              {/* Service Card Image */}
              <div className="relative h-36 sm:h-40 overflow-hidden bg-stone-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#5c0d1e] text-[#f7e49a] text-[9px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-sm flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 text-[#d4af37]" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Subcategory Tag */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm border border-stone-200 text-stone-900 text-[9px] font-bold uppercase shadow-2xs">
                  {service.subcategory}
                </div>

                {/* Duration Pill */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 border border-stone-200 text-stone-900 text-[10px] font-bold backdrop-blur-sm shadow-2xs">
                  <Clock className="w-3 h-3 text-[#5c0d1e]" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Service Card Content */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-cinzel text-sm sm:text-base font-black text-stone-950 group-hover:text-[#5c0d1e] transition-colors leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-cinzel text-xl sm:text-2xl font-black text-[#5c0d1e]">
                      ₹{service.price.toLocaleString()}
                    </span>
                    {service.originalPrice && (
                      <span className="text-xs text-stone-400 line-through font-semibold">
                        ₹{service.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {service.originalPrice && (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                        {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <p className="text-[11.5px] text-stone-600 leading-relaxed mb-3 font-medium line-clamp-2">
                    {service.description}
                  </p>

                  {/* Highlights/Features */}
                  <div className="space-y-1 border-t border-stone-100 pt-2 mb-3">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-stone-700 font-medium">
                        <Check className="w-3 h-3 text-[#5c0d1e] flex-shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book This Service Button */}
                <button
                  onClick={() => openBooking({ preselectedServiceId: service.id, preselectedGender: service.category })}
                  className="w-full py-2 rounded-lg bg-stone-950 hover:bg-[#5c0d1e] text-white font-cinzel font-bold text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Calendar className="w-3 h-3 text-[#d4af37]" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-xl bg-white/80 backdrop-blur-md border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="font-cinzel text-sm sm:text-base font-black text-stone-950 uppercase">
              Custom Hair & Spa Combos Available
            </h4>
            <p className="text-stone-600 text-[11px] font-medium">
              Specializing in precision styling, beard therapy, skin hydration and bridal consultations.
            </p>
          </div>
          <button
            onClick={() => openBooking({ preselectedGender: selectedGender })}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-black text-[11px] uppercase tracking-wider shadow-2xs hover:shadow-xs transition-transform flex-shrink-0"
          >
            Consult Stylist
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
