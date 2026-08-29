import React from 'react';
import { MessageCircle, Phone, Calendar, Sparkles } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const FloatingActions: React.FC = () => {
  const { salonInfo, openBooking } = useSalon();

  return (
    <div className="fixed bottom-4 right-4 xs:bottom-6 xs:right-6 z-40 flex flex-col gap-2.5 items-end">
      {/* Floating Instant Appointment Trigger */}
      <button
        id="floating-book-btn"
        onClick={() => openBooking()}
        className="hidden sm:flex group relative items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c5a059] text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/30 hover:scale-105 transition-all duration-300"
        aria-label="Book Appointment"
      >
        <Calendar className="w-4 h-4 text-[#5c0d1e]" />
        <span>Book Online</span>
      </button>

      {/* Floating WhatsApp Action */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${salonInfo.whatsapp}?text=Hello%20Subha%20Salon,%20I%20would%20like%20to%20inquire%20about%20an%20appointment`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-emerald-950/20 hover:scale-110 active:scale-95 transition-transform duration-300 border-2 border-white"
        aria-label="Chat on WhatsApp"
        title="Instant WhatsApp VIP Desk"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};

export default FloatingActions;
