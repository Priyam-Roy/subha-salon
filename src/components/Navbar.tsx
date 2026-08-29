import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Scissors, 
  Phone, 
  ShieldCheck, 
  Menu, 
  X, 
  Bell, 
  MapPin
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import NotificationDropdown from './NotificationDropdown';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { salonInfo, unreadCount, openBooking, isAdminLoggedIn } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: "Men's Services", href: '#men-services' },
    { label: "Women's Services", href: '#women-services' },
    { label: 'Packages & Pricing', href: '#pricing' },
    { label: 'Live Location & Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-2'
            : 'bg-white/90 backdrop-blur-md border-b border-stone-100/80 py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between w-full min-w-0">
            
            {/* Logo and Brand */}
            <a href="#" className="flex items-center gap-1.5 group flex-1 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#5c0d1e]/80 p-[1px] shadow-2xs flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Scissors className="w-3.5 h-3.5 text-[#5c0d1e] transform -rotate-45" />
                </div>
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-cinzel text-xs sm:text-base font-black tracking-wide text-stone-950 uppercase truncate">
  Subha
</span>

<span className="font-cinzel text-xs sm:text-base font-black tracking-wide text-[#b8860b] uppercase truncate">
  Salon
</span>
                  Subha
                </span>
                <span className="font-cinzel text-sm sm:text-base font-black tracking-wide text-[#b8860b] uppercase">
                  Salon
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] uppercase tracking-widest text-stone-700 hover:text-[#5c0d1e] font-bold transition-colors relative py-0.5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5">
              
              {/* Notification Bell with Badge */}
              <div className="relative">
                <button
                  id="notif-bell-btn"
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="relative p-1.5 xs:p-2 rounded-full bg-stone-100/90 hover:bg-amber-50 border border-stone-200/80 text-stone-800 hover:text-[#5c0d1e] transition-colors focus:outline-none"
                  aria-label="View notifications"
                >
                  <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5c0d1e] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {unreadCount > 0 ? unreadCount : 1}
                  </span>
                </button>

                {showNotifDropdown && (
                  <NotificationDropdown onClose={() => setShowNotifDropdown(false)} />
                )}
              </div>

              {/* Admin Portal Button */}
              <button
                id="admin-portal-nav-btn"
                onClick={onOpenAdmin}
                className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  isAdminLoggedIn
                    ? 'bg-[#5c0d1e] border-[#5c0d1e] text-white shadow-2xs'
                    : 'bg-stone-100/90 hover:bg-stone-200 border-stone-300 text-stone-800'
                }`}
                title="Salon Owner Admin Portal"
              >
                <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                <span>{isAdminLoggedIn ? 'Admin' : 'Owner'}</span>
              </button>

              {/* Book Now Button */}
              <button
                id="navbar-book-now-btn"
                onClick={() => openBooking()}
                className="relative group overflow-hidden rounded-lg px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c59b27] text-stone-950 font-cinzel font-black text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-wider shadow-2xs hover:shadow-sm transition-all flex items-center gap-1 flex-shrink-0"
              >
                <Sparkles className="w-3 h-3 text-[#5c0d1e]" />
                <span className="whitespace-nowrap">Book Now</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 xs:p-2 rounded-lg bg-stone-100/90 text-stone-900 border border-stone-200 hover:bg-stone-200 transition-colors flex-shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 xs:w-5 xs:h-5" /> : <Menu className="w-4 h-4 xs:w-5 xs:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-stone-200 pb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs uppercase tracking-wider text-stone-700 hover:text-[#5c0d1e] hover:bg-stone-50 rounded-lg transition-colors font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#5c0d1e]" />
                Book Online Appointment
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-stone-200"
              >
                <ShieldCheck className="w-4 h-4 text-[#5c0d1e]" />
                {isAdminLoggedIn ? 'Access Owner Dashboard' : 'Salon Owner Login'}
              </button>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-2 px-1">
                <a href={`tel:${salonInfo.phone}`} className="flex items-center gap-1.5 hover:text-[#5c0d1e] font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#5c0d1e]" />
                  <span>{salonInfo.phone}</span>
                </a>
                <span className="text-[#5c0d1e] font-cinzel font-bold">Open 7 Days</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;

