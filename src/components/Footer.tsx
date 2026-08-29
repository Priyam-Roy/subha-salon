import React, { useState } from 'react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  ShieldCheck, 
  Send, 
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { salonInfo, openBooking } = useSalon();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t-2 border-[#d4af37] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#AA771C] to-[#5c0d1e] p-[1.5px]">
                <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-[#d4af37] transform -rotate-45" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-extrabold tracking-wider text-white uppercase">
                  Subha Salon
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase -mt-1 font-bold font-cinzel">
                  Unisex Luxury Studio
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-medium">
              Premier unisex salon offering normal haircuts starting at ₹60, (Hair + Beard) at ₹100, (Hair + Beard + Spa) at ₹200, and women's styling from ₹150 to ₹800.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${salonInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400 hover:bg-emerald-800 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${salonInfo.phone}`}
                className="w-9 h-9 rounded-full bg-rose-950 border border-rose-500/60 flex items-center justify-center text-rose-300 hover:bg-rose-900 transition-colors"
                aria-label="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`https://instagram.com/${salonInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pink-950 border border-pink-500/60 flex items-center justify-center text-pink-300 hover:bg-pink-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${salonInfo.email}`}
                className="w-9 h-9 rounded-full bg-stone-800 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] hover:bg-stone-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Explore Salon
            </h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li><a href="#about" className="hover:text-[#d4af37] transition-colors">Our Philosophy</a></li>
              <li><a href="#men-services" className="hover:text-[#d4af37] transition-colors">Normal Hair Cut (₹60) & Beard</a></li>
              <li><a href="#women-services" className="hover:text-[#d4af37] transition-colors">Women's Styling & Facials</a></li>
              <li><a href="#pricing" className="hover:text-[#d4af37] transition-colors">Packages & Combos (₹100 / ₹200)</a></li>
              <li><a href="#contact" className="hover:text-[#d4af37] transition-colors">Live Location & Map</a></li>
            </ul>
          </div>

          {/* Col 4: Salon Timings */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Salon Timings
            </h4>
            <div className="space-y-1.5 text-stone-400 text-xs font-medium">
              <p><strong className="text-white">Monday – Friday:</strong><br />09:30 AM – 09:00 PM</p>
              <p><strong className="text-white">Saturday – Sunday:</strong><br />09:00 AM – 09:30 PM</p>
              <p className="pt-2 text-[11px] text-[#d4af37] font-bold">Free Parking Available</p>
            </div>
          </div>

          {/* Col 5: VIP Club Newsletter */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Exclusive Offers
            </h4>
            <p className="text-stone-400 text-xs font-medium">
              Subscribe to get SMS & notification alerts for festive discounts.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:scale-102 transition-transform shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} Subha Salon. All Rights Reserved. Live GPS: 22.4458° N, 88.1492° E.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => openBooking()}
              className="hover:text-[#d4af37] transition-colors font-medium"
            >
              Book Online
            </button>
            <span>•</span>
            <a href="#contact" className="hover:text-[#d4af37] transition-colors font-medium">
              Directions
            </a>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#f7e49a] hover:text-white font-bold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
