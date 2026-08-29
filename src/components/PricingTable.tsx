import React from 'react';
import { 
  Sparkles, 
  Check, 
  Crown, 
  Scissors, 
  Calendar, 
  Tag 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import beardStraightRazorShave from '../assets/images/beard_straight_razor_shave_1787995218126.jpg';

export const PricingTable: React.FC = () => {
  const { openBooking } = useSalon();

  const packages = [
    {
      id: 'pkg-1',
      name: 'Essential (Hair + Beard)',
      gender: "Men's Special",
      badge: 'Everyday Sharpness',
      price: 100,
      originalPrice: 150,
      duration: '35 mins',
      description: 'Precision haircut paired with crisp razor-sharp beard styling and hot towel soothing finish.',
      includes: [
        'Face Shape Consultation',
        'Precision Shears & Fade Haircut',
        'Beard Trim & Razor Sharp Edge-Up',
        'Hot Towel Steam & Aftershave Balm',
      ],
      popular: false,
    },
    {
      id: 'pkg-2',
      name: 'Signature (Hair + Beard + Spa)',
      gender: "Gents Luxury Care",
      badge: 'Most Popular',
      price: 200,
      originalPrice: 290,
      duration: '50 mins',
      description: 'All-inclusive grooming: haircut, beard sculpting, revitalizing deep scalp hair spa, and acupressure head massage.',
      includes: [
        'Master Designer Haircut of Choice',
        'Signature Beard Sculpting & Oil Therapy',
        'Deep Scalp Nourishing Hair Spa',
        'Relaxing Acupressure Head Massage',
      ],
      popular: true,
    },
    {
      id: 'pkg-3',
      name: 'Royal Gentlemen VIP Transformation',
      gender: "Complete VIP Grooming",
      badge: 'Ultimate Care',
      price: 350,
      originalPrice: 500,
      duration: '75 mins',
      description: 'Full-spectrum grooming package including haircut, beard styling, charcoal facial cleanup, and deep hair spa.',
      includes: [
        'Executive Custom Haircut & Wash',
        'Royal Hot-Towel Beard Line-Up',
        'Charcoal Deep Detox Face Cleanup',
        'Intensive Hair Spa & Scalp Therapy',
        'Refreshing Botanical Face Wash & Glow',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-10 sm:py-14 bg-stone-50/40 relative overflow-hidden border-t border-stone-200/60">
      {/* Ambient decorative lights */}
      <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-rose-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50/80 backdrop-blur-sm border border-[#d4af37]/60 text-[#5c0d1e] text-[10.5px] font-bold uppercase tracking-widest mb-2">
            <Crown className="w-3 h-3 text-[#d4af37]" />
            <span>Curated Grooming Bundles</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 mb-2 uppercase">
            Special <span className="text-[#996515]">Gents Packages</span>
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-2.5" />
          <p className="font-cormorant text-base sm:text-lg text-stone-700 italic font-semibold">
            Transparent pricing with unbeatable value. Most popular package starting from just ₹200.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col justify-between rounded-xl p-4 sm:p-5 transition-all duration-300 relative bg-white/80 backdrop-blur-md ${
                pkg.popular
                  ? 'border-2 border-[#d4af37] shadow-md scale-101 lg:-translate-y-1 ring-2 ring-amber-100/50'
                  : 'border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-[#d4af37]'
              }`}
            >
              {/* Top Badge */}
              {pkg.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9.5px] font-cinzel font-black uppercase tracking-wider shadow-2xs flex items-center gap-1 ${
                  pkg.popular 
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950'
                    : 'bg-[#5c0d1e] text-white'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{pkg.badge}</span>
                </div>
              )}

              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#5c0d1e] font-bold mb-0.5">
                  {pkg.gender}
                </div>
                <h3 className="font-cinzel text-base sm:text-lg font-black text-stone-950 mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[11px] text-stone-600 leading-relaxed mb-3 font-medium">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-3 pb-3 border-b border-stone-200">
                  <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#5c0d1e]">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-400 line-through font-semibold">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-auto text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                    {pkg.duration}
                  </span>
                </div>

                {/* Includes List */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10.5px] font-cinzel font-black text-stone-900 uppercase tracking-wider">
                    Inclusions:
                  </div>
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-700 font-medium">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-100 text-[#5c0d1e] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => openBooking()}
                className={`w-full py-2.5 rounded-lg font-cinzel font-bold text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-2xs ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 shadow-xs'
                    : 'bg-stone-900 hover:bg-[#5c0d1e] text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Package</span>
              </button>
            </div>
          ))}
        </div>

        {/* Info Banner with Salon Supplies Showcase */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/80 backdrop-blur-md border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#d4af37] flex-shrink-0 shadow-2xs">
              <img 
                src={beardStraightRazorShave} 
                alt="Professional Grooming & Straight Razor Shave" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-cinzel text-xs sm:text-sm font-black text-stone-950 uppercase flex items-center gap-1.5">
                <span>Subha Salon Craft & Hygiene Promise</span>
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              </h4>
              <p className="text-[11px] text-stone-600 max-w-xl font-medium mt-0.5">
                Hand-forged shears, sterilized razor blades, organic hair tonics, and meticulous grooming.
              </p>
            </div>
          </div>
          <button
            onClick={() => openBooking()}
            className="px-4 py-2 rounded-lg bg-stone-100/90 hover:bg-[#5c0d1e] text-stone-900 hover:text-white border border-stone-300 text-[11px] font-cinzel font-black uppercase tracking-wider transition-colors flex-shrink-0 shadow-2xs whitespace-nowrap"
          >
            Book Appointment
          </button>
        </div>

      </div>
    </section>
  );
};

export default PricingTable;
