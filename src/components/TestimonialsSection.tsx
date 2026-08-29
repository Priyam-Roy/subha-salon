import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Quote, 
  CheckCircle, 
  MessageSquarePlus, 
  X, 
  Send 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, addTestimonial } = useSalon();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Verified Guest',
    rating: 5,
    serviceName: 'Signature Hair & Spa',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    addTestimonial({
      name: newReview.name,
      role: newReview.role,
      rating: newReview.rating,
      serviceName: newReview.serviceName,
      comment: newReview.comment,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&q=80`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewReview({
        name: '',
        role: 'Verified Guest',
        rating: 5,
        serviceName: 'Signature Hair & Spa',
        comment: '',
      });
    }, 1800);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0a0708] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#4A0E17]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b0813]/80 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
            <span>Client Praise & Stories</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase">
            Words Of <span className="gold-gradient-text">Adoration</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="font-cormorant text-lg sm:text-xl text-stone-300 italic">
            Over 12,000 delighted gentlemen and ladies celebrate their transformations with Subha Salon.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-8 rounded-2xl bg-[#140b0e] border border-[#d4af37]/25 hover:border-[#d4af37]/60 shadow-xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d4af37]/15 group-hover:text-[#d4af37]/30 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#d4af37]">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>

                {/* Service Tag */}
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#2e0911] text-[#d4af37] text-[10px] font-semibold uppercase tracking-wider mb-3 border border-[#d4af37]/20">
                  {review.serviceName}
                </span>

                {/* Comment */}
                <p className="font-cormorant text-base sm:text-lg text-stone-200 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-800/80">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]/50 flex-shrink-0">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback avatar
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-1">
                    <span>{review.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                  </h4>
                  <div className="text-[11px] text-stone-400">
                    {review.role || 'Verified Client'} • {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review CTA Button */}
        <div className="text-center">
          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1e1014] hover:bg-[#3b0813] border border-[#d4af37]/50 text-[#d4af37] hover:text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Subha Salon Experience</span>
          </button>
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#180e12] border-2 border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-white uppercase mb-1">
                Write A Review
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Tell us about your hairstyle, spa, or makeover at Subha Salon.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto animate-bounce" />
                  <h4 className="font-cinzel text-base font-bold text-white uppercase">Thank You!</h4>
                  <p className="text-xs text-stone-300">Your review has been published successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Rohini Sen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Service Enjoyed
                    </label>
                    <input
                      type="text"
                      value={newReview.serviceName}
                      onChange={(e) => setNewReview({ ...newReview, serviceName: e.target.value })}
                      placeholder="e.g. 24K Gold Glow Facial / Beard Sculpting"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'text-[#d4af37] fill-[#d4af37]'
                                : 'text-stone-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Your Review & Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="How did you feel about the stylists, ambience, and results?"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#AA771C] text-black font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;
