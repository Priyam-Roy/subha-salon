import React from 'react';
import { 
  Sparkles, 
  Star, 
  Award, 
  Instagram, 
  Calendar, 
  Scissors, 
  Crown 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const TeamSection: React.FC = () => {
  const { teamMembers, openBooking } = useSalon();

  return (
    <section id="team" className="py-24 bg-[#0d090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b0813]/80 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Master Craftsmen & Artists</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase">
            Meet The <span className="gold-gradient-text">Subha Artisans</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="font-cormorant text-lg sm:text-xl text-stone-300 italic">
            Internationally certified master stylists, bridal makeover visionaries, and precision grooming architects.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col rounded-2xl bg-[#150d11] border border-[#d4af37]/25 hover:border-[#d4af37] overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-xl group"
            >
              {/* Member Image */}
              <div className="relative h-72 overflow-hidden bg-[#241319]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150d11] via-transparent to-transparent opacity-90" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-[#d4af37]/40 flex items-center gap-1 text-[#d4af37] text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
                  <span>{member.rating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-[#3b0813]/90 text-[#f5e6ba] border border-[#d4af37]/30 text-[10px] font-semibold uppercase tracking-wider">
                  {member.experience}
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors mb-1 leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider mb-2">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mb-3 italic">
                    Specialty: {member.specialty}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-3 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => openBooking({ preselectedStylistId: member.id })}
                    className="w-full py-2.5 rounded-lg bg-[#290c14] hover:bg-[#d4af37] text-[#f5e6ba] hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider border border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book With {member.name.split(' ')[0]}</span>
                  </button>

                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-stone-400 hover:text-[#d4af37] flex items-center justify-center gap-1 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>@{member.instagram}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
