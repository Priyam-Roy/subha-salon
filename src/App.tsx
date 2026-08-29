import React, { useState } from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PricingTable from './components/PricingTable';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminPanelModal from './components/AdminPanelModal';
import FloatingActions from './components/FloatingActions';

function MainSalonApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
   div className="min-h-screen overflow-x-hidden bg-white text-stone-900 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Top Fixed Luxury Navigation */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <PricingTable />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Fast Action Shortcuts (WhatsApp & Online Booking) */}
      <FloatingActions />

      {/* Global Modals */}
      <BookingModal />
      <AdminPanelModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <SalonProvider>
      <MainSalonApp />
    </SalonProvider>
  );
}

