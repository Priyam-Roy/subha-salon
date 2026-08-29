import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  Scissors, 
  User, 
  Phone, 
  Mail, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  MessageCircle, 
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSalon } from '../context/SalonContext';
import { ServiceGender, ServiceItem } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    bookingModal, 
    closeBooking, 
    services, 
    teamMembers, 
    offers, 
    bookAppointment,
    salonInfo
  } = useSalon();

  const [step, setStep] = useState<number>(1);
  const [selectedGender, setSelectedGender] = useState<ServiceGender>('men');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  
  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:30 AM');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoAppliedMsg, setPromoAppliedMsg] = useState('');

  // Completed booking data
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    clientName: string;
    serviceNames: string[];
    stylistName: string;
    date: string;
    timeSlot: string;
    totalAmount: number;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slot options
  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '11:30 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM',
    '05:30 PM',
    '06:30 PM',
    '07:30 PM',
    '08:30 PM',
  ];

  // Initialize with preselected values if opened from a specific service or stylist
  useEffect(() => {
    if (bookingModal.isOpen) {
      if (bookingModal.preselectedGender) {
        setSelectedGender(bookingModal.preselectedGender);
      }
      if (bookingModal.preselectedServiceId) {
        setSelectedServiceIds([bookingModal.preselectedServiceId]);
        const matched = services.find(s => s.id === bookingModal.preselectedServiceId);
        if (matched) {
          setSelectedGender(matched.category);
        }
      }
      if (bookingModal.preselectedStylistId) {
        setSelectedStylistId(bookingModal.preselectedStylistId);
      }
      setStep(1);
      setConfirmedBooking(null);
    }
  }, [bookingModal.isOpen, bookingModal.preselectedGender, bookingModal.preselectedServiceId, bookingModal.preselectedStylistId, services]);

  if (!bookingModal.isOpen) return null;

  const availableServices = services.filter(s => s.category === selectedGender);

  const toggleService = (serviceId: string) => {
    if (selectedServiceIds.includes(serviceId)) {
      setSelectedServiceIds(selectedServiceIds.filter(id => id !== serviceId));
    } else {
      setSelectedServiceIds([...selectedServiceIds, serviceId]);
    }
  };

  const rawTotal = selectedServiceIds.reduce((acc, id) => {
    const s = services.find(srv => srv.id === id);
    return acc + (s ? s.price : 0);
  }, 0);

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    const matched = offers.find(o => o.code.toUpperCase() === promoCode.trim().toUpperCase());
    if (matched) {
      setDiscountPercent(matched.discountPercent);
      setPromoAppliedMsg(`Success! ${matched.discountPercent}% VIP discount applied.`);
    } else if (promoCode.toUpperCase() === 'SUBHA25') {
      setDiscountPercent(25);
      setPromoAppliedMsg('Success! 25% Grand Welcome discount applied.');
    } else {
      setDiscountPercent(0);
      setPromoAppliedMsg('Invalid promo code. Please check again.');
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitting(true);

    try {
      const result = await bookAppointment({
        clientName,
        clientPhone,
        clientEmail: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@guest.com`,
        serviceIds: selectedServiceIds,
        stylistId: selectedStylistId,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        notes: notes ? `${notes} ${promoCode ? `(Promo: ${promoCode})` : ''}` : (promoCode ? `Promo: ${promoCode}` : ''),
        totalAmount: finalTotal,
      });

      // Confetti burst!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#5C0D1E', '#996515', '#1C1917'],
      });

      setConfirmedBooking({
        id: result.id,
        clientName: result.clientName,
        serviceNames: result.serviceNames || [],
        stylistName: result.stylistName || 'Master Stylist',
        date: result.date,
        timeSlot: result.timeSlot,
        totalAmount: result.totalAmount,
      });

      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp reminder link
  const getWhatsAppShareUrl = () => {
    if (!confirmedBooking) return '#';
    const text = encodeURIComponent(
      `Hello Subha Salon! I have booked Appointment #${confirmedBooking.id.toUpperCase()} on ${confirmedBooking.date} at ${confirmedBooking.timeSlot} for ${confirmedBooking.serviceNames.join(', ')}. My name is ${confirmedBooking.clientName}.`
    );
    return `https://wa.me/${salonInfo.whatsapp}?text=${text}`;
  };

  // Google Calendar link
  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Subha Salon Appointment (${confirmedBooking.serviceNames[0] || 'Grooming'})`);
    const details = encodeURIComponent(
      `Appointment #${confirmedBooking.id} at Subha Salon.\nStylist: ${confirmedBooking.stylistName}\nServices: ${confirmedBooking.serviceNames.join(', ')}\nAddress: ${salonInfo.address}, ${salonInfo.city}`
    );
    const location = encodeURIComponent(`${salonInfo.address}, ${salonInfo.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div 
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div 
        id="booking-modal-card"
        className="relative w-full max-w-2xl bg-white border border-stone-300 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-rose-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#d4af37] flex items-center justify-center text-[#5c0d1e] shadow-sm">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-black text-stone-950 uppercase tracking-wide">
                Book Your Experience
              </h3>
              <p className="text-xs text-[#5c0d1e] font-semibold">
                Subha Salon Haute Unisex Studio
              </p>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="p-2 rounded-full bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Progress Bar */}
        {step < 4 && (
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-cinzel font-bold text-stone-500">
            <span className={step >= 1 ? 'text-[#5c0d1e] font-black' : ''}>1. Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className={step >= 2 ? 'text-[#5c0d1e] font-black' : ''}>2. Date & Time</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className={step >= 3 ? 'text-[#5c0d1e] font-black' : ''}>3. Details</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Gender selector */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Guest Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('men');
                      setSelectedServiceIds([]);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                      selectedGender === 'men'
                        ? 'bg-[#5c0d1e] text-white border-[#5c0d1e] shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Men's Lounge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('women');
                      setSelectedServiceIds([]);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                      selectedGender === 'women'
                        ? 'bg-[#5c0d1e] text-white border-[#5c0d1e] shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Crown className="w-4 h-4" />
                    <span>Women's Salon</span>
                  </button>
                </div>
              </div>

              {/* Service Items checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-cinzel font-bold text-stone-800 uppercase tracking-wider">
                    Select Services ({selectedServiceIds.length} Selected)
                  </label>
                  <span className="text-[11px] text-[#5c0d1e] font-semibold">Multiple selection allowed</span>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {availableServices.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-rose-50/80 border-[#d4af37] shadow-sm'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected
                              ? 'bg-[#5c0d1e] text-white border-[#5c0d1e]'
                              : 'border-stone-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                              {service.name}
                            </h4>
                            <div className="text-[11px] text-stone-500 flex items-center gap-2 font-medium">
                              <span>{service.duration}</span>
                              <span>•</span>
                              <span>{service.subcategory}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-xs sm:text-sm font-cinzel font-black text-[#5c0d1e]">
                            ₹{service.price}
                          </div>
                          {service.originalPrice && (
                            <div className="text-[10px] text-stone-400 line-through">
                              ₹{service.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total estimation bar */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-medium">Estimated Total</div>
                  <div className="font-cinzel text-xl font-black text-[#5c0d1e]">
                    ₹{rawTotal}
                  </div>
                </div>

                <button
                  disabled={selectedServiceIds.length === 0}
                  onClick={() => setStep(2)}
                  className={`px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                    selectedServiceIds.length > 0
                      ? 'bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 shadow-md hover:scale-105'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <span>Select Date & Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Date Picker */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:border-[#d4af37] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Preferred Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-[#5c0d1e] text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 border border-stone-200 hover:border-[#d4af37]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform shadow-sm"
                >
                  <span>Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & PROMO */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Mobile Phone (For WhatsApp Confirm) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98300 00000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-[#d4af37]/40">
                <label className="block text-[11px] font-bold text-[#5c0d1e] uppercase tracking-wider mb-1">
                  VIP Privilege / Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter SUBHA25 or FESTIVE15"
                    className="flex-1 px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 text-xs uppercase tracking-wider focus:border-[#d4af37] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#5c0d1e] text-white font-bold text-xs uppercase rounded-lg hover:bg-[#7a1228] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoAppliedMsg && (
                  <p className="text-[11px] text-[#5c0d1e] mt-1.5 font-bold">{promoAppliedMsg}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Hair / Skin Notes or Special Requests
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergies, preferred haircut style, beverage preference..."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-950 text-xs focus:border-[#d4af37] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Final Summary Card */}
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Date & Slot:</span>
                  <span className="font-bold text-stone-950">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Selected Services:</span>
                  <span className="font-bold text-stone-950">{selectedServiceIds.length} item(s)</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Savings:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-stone-300 font-cinzel font-black text-sm text-[#5c0d1e]">
                  <span>Total Payable at Salon:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CELEBRATORY CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-[#d4af37] flex items-center justify-center text-[#5c0d1e] mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-[#5c0d1e] text-xs font-bold uppercase tracking-wider mb-2 border border-[#d4af37]">
                  Appointment Confirmed
                </span>
                <h3 className="font-cinzel text-2xl font-black text-stone-950 uppercase">
                  Thank You, {confirmedBooking.clientName}!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 font-medium">
                  Your salon appointment has been reserved with Master Stylist at Subha Salon.
                </p>
              </div>

              {/* Receipt card */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-300 max-w-md mx-auto text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Booking Reference:</span>
                  <span className="font-cinzel font-black text-[#5c0d1e]">#{confirmedBooking.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Date & Slot:</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Stylist:</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.stylistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Services:</span>
                  <span className="font-bold text-stone-900 text-right">{confirmedBooking.serviceNames.join(', ')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-cinzel font-black text-[#5c0d1e]">
                  <span>Total Amount:</span>
                  <span>₹{confirmedBooking.totalAmount}</span>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>

                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#5c0d1e] hover:bg-[#7a1228] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Add to Calendar</span>
                </a>
              </div>

              <button
                onClick={closeBooking}
                className="text-xs uppercase tracking-widest text-stone-600 hover:text-stone-950 font-bold underline"
              >
                Close & Return to Salon
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
