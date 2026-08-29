import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Send, 
  Sparkles, 
  CheckCircle, 
  Navigation,
  ExternalLink 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const ContactSection: React.FC = () => {
  const { salonInfo, sendPushBroadcast } = useSalon();
  const [inquiry, setInquiry] = useState({ name: '', phone: '', service: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.phone) return;

    setInquirySent(true);
    sendPushBroadcast(
      `New Salon Inquiry from ${inquiry.name}`,
      `Phone: ${inquiry.phone} | Service: ${inquiry.service || 'General'}. Our team will call you back shortly.`,
      'system'
    );

    setTimeout(() => {
      setInquirySent(false);
      setInquiry({ name: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  const lat = salonInfo?.coordinates?.lat ?? 22.445764492954865;
  const lng = salonInfo?.coordinates?.lng ?? 88.14918952045151;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section id="contact" className="py-10 sm:py-14 bg-stone-50/40 relative border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50/80 backdrop-blur-sm border border-[#d4af37]/60 text-[#5c0d1e] text-[10.5px] font-bold uppercase tracking-widest mb-2">
            <MapPin className="w-3 h-3 text-[#d4af37]" />
            <span>Find Us & Connect</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 mb-2 uppercase">
            Visit <span className="text-[#996515]">Subha Salon</span>
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-2.5" />
          <p className="font-cormorant text-base sm:text-lg text-stone-700 italic font-semibold">
            Located at Live Coordinates ({lat.toFixed(4)}, {lng.toFixed(4)}). Reach out directly or drop in today.
          </p>
        </div>

        {/* Quick Instant Action Bar (WhatsApp, Call, Instagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {/* WhatsApp Direct */}
          <a
            id="contact-whatsapp-direct-btn"
            href={`https://wa.me/${salonInfo.whatsapp}?text=Hello%20Subha%20Salon,%20I%20would%20like%20to%20inquire%20about%20an%20appointment`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-700 text-white shadow-2xs hover:shadow-xs transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-200 font-bold">Instant Chat</div>
                <div className="font-cinzel text-xs sm:text-sm font-bold text-white">WhatsApp Desk</div>
              </div>
            </div>
            <span className="text-white text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
              Chat →
            </span>
          </a>

          {/* Direct Phone Call */}
          <a
            id="contact-phone-direct-btn"
            href={`tel:${salonInfo.phone}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#5c0d1e] text-white shadow-2xs hover:shadow-xs transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-[#f7e49a] group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-rose-200 font-bold">Reception</div>
                <div className="font-cinzel text-xs sm:text-sm font-bold text-white">{salonInfo.phone}</div>
              </div>
            </div>
            <span className="text-[#f7e49a] text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
              Call →
            </span>
          </a>

          {/* Instagram Official */}
          <a
            id="contact-instagram-direct-btn"
            href={`https://instagram.com/${salonInfo.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white shadow-2xs hover:shadow-xs transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-pink-100 font-bold">Follow Artistry</div>
                <div className="font-cinzel text-xs sm:text-sm font-bold text-white">@{salonInfo.instagram}</div>
              </div>
            </div>
            <span className="text-white text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
              Follow →
            </span>
          </a>
        </div>

        {/* 2-Column: Left Contact Details & Map, Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          
          {/* Left Column: Details & Google Map */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Contact Details Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/80 backdrop-blur-md border border-stone-200/80 shadow-2xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-md bg-rose-50 text-[#5c0d1e] border border-[#d4af37]/40 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-stone-950 uppercase mb-0.5">
                    Live Location
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                    {salonInfo.address}, {salonInfo.city}<br />
                    <span className="text-[9.5px] text-stone-500 font-mono">
                      GPS: {lat.toFixed(6)}, {lng.toFixed(6)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-md bg-rose-50 text-[#5c0d1e] border border-[#d4af37]/40 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-stone-950 uppercase mb-0.5">
                    Opening Hours
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                    {salonInfo.hours.weekdays}<br />
                    {salonInfo.hours.weekends}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-md bg-rose-50 text-[#5c0d1e] border border-[#d4af37]/40 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-stone-950 uppercase mb-0.5">
                    Email Inquiries
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                    {salonInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-md bg-rose-50 text-[#5c0d1e] border border-[#d4af37]/40 flex-shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-stone-950 uppercase mb-0.5">
                    Accessibility & Parking
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                    Ample dedicated parking at front entrance.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map with Live Location */}
            <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-stone-200/90 shadow-2xs relative bg-stone-100">
              <iframe
                title="Subha Salon Live Location Map"
                src={salonInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/90 border border-stone-200 text-stone-900 text-[10px] font-cinzel font-bold uppercase shadow-2xs backdrop-blur-sm flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5c0d1e]" />
                <span>Live Location</span>
              </div>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-md bg-[#5c0d1e] text-white text-[11px] font-bold shadow-2xs hover:bg-[#7a1228] transition-colors flex items-center gap-1"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Quick Callback & Inquiry Form */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#5c0d1e] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider">
                  Direct Salon Desk
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-black text-stone-950 uppercase mb-1">
                Request A <span className="text-[#996515]">Call Back</span>
              </h3>
              <p className="text-[11px] text-stone-600 mb-4 font-medium">
                Leave your number and our salon manager will call you back promptly.
              </p>

              {inquirySent ? (
                <div className="py-6 text-center space-y-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-cinzel text-xs font-bold text-stone-950 uppercase">
                    Inquiry Received!
                  </h4>
                  <p className="text-[11px] text-stone-600 font-medium">
                    Our team will call you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-0.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiry.name}
                      onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-1.5 rounded-md bg-stone-50/80 border border-stone-200 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-0.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-1.5 rounded-md bg-stone-50/80 border border-stone-200 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-0.5">
                      Interested In
                    </label>
                    <select
                      value={inquiry.service}
                      onChange={(e) => setInquiry({ ...inquiry, service: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md bg-stone-50/80 border border-stone-200 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    >
                      <option value="">Select Service Category</option>
                      <option value="Normal Hair Cut (₹60)">Men's Normal Haircut (₹60)</option>
                      <option value="(Hair + Beard) (₹100)">Men's (Hair + Beard) (₹100)</option>
                      <option value="(Hair + Beard + Spa) (₹200)">Men's (Hair + Beard + Spa) (₹200)</option>
                      <option value="Women Services (₹150 to ₹800)">Women's Hair / Spa / Facials (₹150 – ₹800)</option>
                      <option value="Bridal Glow & Makeover">Bridal & Glam Makeover</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-0.5">
                      Message / Timings
                    </label>
                    <textarea
                      rows={2}
                      value={inquiry.message}
                      onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                      placeholder="Preferred time or queries..."
                      className="w-full px-3 py-1.5 rounded-md bg-stone-50/80 border border-stone-200 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-transform"
                  >
                    <Send className="w-3.5 h-3.5 text-[#5c0d1e]" />
                    <span>Request Callback</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-stone-100 text-center text-[10px] text-stone-500 font-medium">
              🔒 Direct assistance from Subha Salon team.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
