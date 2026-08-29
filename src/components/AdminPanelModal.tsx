import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Sparkles, 
  Calendar, 
  Scissors, 
  Users, 
  Image as ImageIcon, 
  Tag, 
  Bell, 
  BarChart3, 
  CheckCircle, 
  RotateCcw, 
  Phone, 
  Mail, 
  Clock, 
  Upload,
  Send,
  ExternalLink
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { ServiceItem, TeamMember, GalleryItem, SpecialOffer, AppointmentStatus, ServiceGender } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { 
    isAdminLoggedIn, 
    adminEmail, 
    loginAdmin, 
    logoutAdmin,
    services,
    addService,
    updateService,
    deleteService,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    sendPushBroadcast,
    resetToDefaultData
  } = useSalon();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'team' | 'gallery' | 'offers' | 'push'>('overview');

  // Login form state
  const [emailInput, setEmailInput] = useState('priyam264.45@gmail.com');
  const [pinInput, setPinInput] = useState('1234');
  const [loginError, setLoginError] = useState('');

  // Service form state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    name: string;
    category: ServiceGender;
    subcategory: string;
    price: number;
    originalPrice: number;
    duration: string;
    description: string;
    image: string;
    popular: boolean;
    features: string;
  }>({
    name: '',
    category: 'men',
    subcategory: 'Hair Design',
    price: 599,
    originalPrice: 799,
    duration: '45 mins',
    description: '',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    popular: false,
    features: 'Consultation, Hair wash, Premium styling',
  });

  // Team form state
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<{
    name: string;
    role: string;
    specialty: string;
    experience: string;
    image: string;
    rating: number;
    bio: string;
    instagram: string;
  }>({
    name: '',
    role: 'Senior Master Stylist',
    specialty: 'Precision Cuts & Color',
    experience: '6+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    bio: '',
    instagram: '',
  });

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState<{
    title: string;
    category: 'all' | 'hair' | 'bridal' | 'grooming' | 'ambience' | 'spa';
    imageUrl: string;
    description: string;
    tag: string;
  }>({
    title: '',
    category: 'hair',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    description: '',
    tag: 'Haute Styling',
  });

  // Offer form state
  const [offerForm, setOfferForm] = useState<{
    title: string;
    discount: string;
    code: string;
    validUntil: string;
    description: string;
    active: boolean;
  }>({
    title: '',
    discount: '30% OFF',
    code: 'FESTIVE30',
    validUntil: 'Valid this week',
    description: '',
    active: true,
  });

  // Push Broadcast form state
  const [pushForm, setPushForm] = useState({
    title: '✨ Flash Offer: 30% Off All Hair Spas Today!',
    message: 'Book your slot today and treat yourself to luxury revitalisation. Use code FLASH30.',
    type: 'offer' as 'booking' | 'offer' | 'system',
  });
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen) return null;

  // Handle Owner Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(emailInput, pinInput);
    if (!success) {
      setLoginError('Invalid credentials. Use email: priyam264.45@gmail.com and PIN: 1234');
    } else {
      setLoginError('');
    }
  };

  // Image Upload helper (converts local file to base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'service' | 'team' | 'gallery') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'service') setServiceForm(prev => ({ ...prev, image: base64 }));
        if (target === 'team') setTeamForm(prev => ({ ...prev, image: base64 }));
        if (target === 'gallery') setGalleryForm(prev => ({ ...prev, imageUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Service Save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const featureArray = serviceForm.features
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    if (editingServiceId) {
      updateService(editingServiceId, {
        name: serviceForm.name,
        category: serviceForm.category,
        subcategory: serviceForm.subcategory,
        price: Number(serviceForm.price),
        originalPrice: Number(serviceForm.originalPrice),
        duration: serviceForm.duration,
        description: serviceForm.description,
        image: serviceForm.image,
        popular: serviceForm.popular,
        features: featureArray,
      });
      setEditingServiceId(null);
    } else {
      addService({
        name: serviceForm.name,
        category: serviceForm.category,
        subcategory: serviceForm.subcategory,
        price: Number(serviceForm.price),
        originalPrice: Number(serviceForm.originalPrice),
        duration: serviceForm.duration,
        description: serviceForm.description,
        image: serviceForm.image,
        popular: serviceForm.popular,
        features: featureArray,
      });
    }

    setServiceForm({
      name: '',
      category: 'men',
      subcategory: 'Hair Design',
      price: 599,
      originalPrice: 799,
      duration: '45 mins',
      description: '',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      popular: false,
      features: 'Consultation, Hair wash, Premium styling',
    });
  };

  // Team Save
  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamId) {
      updateTeamMember(editingTeamId, {
        name: teamForm.name,
        role: teamForm.role,
        specialty: teamForm.specialty,
        experience: teamForm.experience,
        image: teamForm.image,
        rating: Number(teamForm.rating),
        bio: teamForm.bio,
        instagram: teamForm.instagram,
      });
      setEditingTeamId(null);
    } else {
      addTeamMember({
        name: teamForm.name,
        role: teamForm.role,
        specialty: teamForm.specialty,
        experience: teamForm.experience,
        image: teamForm.image,
        rating: Number(teamForm.rating),
        bio: teamForm.bio,
        instagram: teamForm.instagram,
      });
    }

    setTeamForm({
      name: '',
      role: 'Senior Master Stylist',
      specialty: 'Precision Cuts & Color',
      experience: '6+ Years',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      bio: '',
      instagram: '',
    });
  };

  // Gallery Save
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) return;

    addGalleryItem({
      title: galleryForm.title,
      category: galleryForm.category,
      imageUrl: galleryForm.imageUrl,
      description: galleryForm.description,
      tag: galleryForm.tag || 'Subha Collection',
    });

    setGalleryForm({
      title: '',
      category: 'hair',
      imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
      description: '',
      tag: 'Haute Styling',
    });
  };

  // Offer Save
  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.code) return;

    addOffer({
      title: offerForm.title,
      discount: offerForm.discount,
      code: offerForm.code,
      validUntil: offerForm.validUntil,
      description: offerForm.description,
      active: offerForm.active,
    });

    setOfferForm({
      title: '',
      discount: '30% OFF',
      code: 'FESTIVE30',
      validUntil: 'Valid this week',
      description: '',
      active: true,
    });
  };

  // Push Broadcast Dispatch
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushForm.title || !pushForm.message) return;

    sendPushBroadcast(pushForm.title, pushForm.message, pushForm.type);
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div 
      id="admin-panel-overlay"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div 
        id="admin-panel-card"
        className="relative w-full max-w-5xl bg-[#120a0d] border-2 border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#230810] border-b border-[#d4af37]/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3b0813] border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Subha Salon Admin Portal</span>
                <span className="text-[10px] bg-[#d4af37] text-black font-extrabold px-1.5 py-0.5 rounded">Owner Suite</span>
              </h3>
              <p className="text-xs text-stone-300">
                Logged in as: <strong className="text-[#d4af37]">{adminEmail}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-black/40 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* IF NOT LOGGED IN: DISPLAY OWNER LOGIN SCREEN */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#3b0813] border border-[#d4af37] flex items-center justify-center text-[#d4af37] mb-4 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-2xl font-bold text-white uppercase mb-2">
              Salon Owner Verification
            </h4>
            <p className="text-xs text-stone-300 mb-6">
              Enter the registered owner email to manage appointments, upload stylist photos, update pricing, and broadcast push promotions.
            </p>

            {loginError && (
              <div className="w-full p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs mb-4">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Owner Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Security PIN / Password
                </label>
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 1234"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c5a059] text-black font-cinzel font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-transform"
              >
                <Lock className="w-4 h-4 text-[#3b0813]" />
                <span>Verify & Access Portal</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput('priyam264.45@gmail.com');
                    setPinInput('1234');
                    loginAdmin('priyam264.45@gmail.com', '1234');
                  }}
                  className="text-[11px] text-[#d4af37] hover:underline font-semibold"
                >
                  ⚡ One-Click Owner Login (priyam264.45@gmail.com)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* IF LOGGED IN: FULL MANAGEMENT DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#160d10] border-b md:border-b-0 md:border-r border-stone-800 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible flex-shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'overview'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'appointments'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>Bookings</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#d4af37] text-black text-[10px] font-extrabold">
                  {appointments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'services'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'team'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team Stylists ({teamMembers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'gallery'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'offers'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Offers & Promos ({offers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('push')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === 'push'
                    ? 'bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-stone-300 hover:bg-[#1f1217]'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Push Broadcast</span>
              </button>

              <div className="mt-auto pt-4 border-t border-stone-800 hidden md:block">
                <button
                  onClick={resetToDefaultData}
                  className="w-full py-2 px-2.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-400 text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  title="Reset all sample data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default State</span>
                </button>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0f090b]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#1c0f13] border border-[#d4af37]/30">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">Total Bookings</div>
                      <div className="font-cinzel text-2xl font-bold text-white mt-1">{appointments.length}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1c0f13] border border-[#d4af37]/30">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">Pending Review</div>
                      <div className="font-cinzel text-2xl font-bold text-amber-400 mt-1">
                        {appointments.filter(a => a.status === 'Pending').length}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1c0f13] border border-[#d4af37]/30">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">Active Services</div>
                      <div className="font-cinzel text-2xl font-bold text-[#d4af37] mt-1">{services.length}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1c0f13] border border-[#d4af37]/30">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">Active Promos</div>
                      <div className="font-cinzel text-2xl font-bold text-emerald-400 mt-1">
                        {offers.filter(o => o.active).length}
                      </div>
                    </div>
                  </div>

                  {/* Recent Incoming Bookings Preview */}
                  <div className="p-6 rounded-2xl bg-[#170e12] border border-[#d4af37]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-cinzel text-sm font-bold text-white uppercase">
                        Recent Appointment Requests
                      </h4>
                      <button
                        onClick={() => setActiveTab('appointments')}
                        className="text-xs text-[#d4af37] hover:underline font-semibold"
                      >
                        View All Bookings →
                      </button>
                    </div>

                    <div className="divide-y divide-stone-800">
                      {appointments.slice(0, 3).map((apt) => (
                        <div key={apt.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <div className="font-semibold text-white flex items-center gap-2">
                              <span>{apt.clientName}</span>
                              <span className="text-[10px] text-[#d4af37] font-mono">#{apt.id}</span>
                            </div>
                            <div className="text-stone-400 text-[11px]">
                              {apt.date} • {apt.timeSlot} • {apt.serviceNames?.join(', ')}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              apt.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              apt.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-stone-800 text-stone-400'
                            }`}>
                              {apt.status}
                            </span>
                            <span className="font-cinzel font-bold text-[#d4af37]">₹{apt.totalAmount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Broadcast Banner Quick Trigger */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2e0911] to-[#3b0813] border border-[#d4af37]/40 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="font-cinzel text-sm font-bold text-white uppercase">
                        Broadcast Live Promotion / Notification
                      </h5>
                      <p className="text-xs text-stone-300">
                        Dispatch instant push alerts directly to customer browser notifications and in-app bells.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('push')}
                      className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] flex-shrink-0"
                    >
                      Send Alert Now
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: APPOINTMENTS MANAGER */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-base font-bold text-white uppercase">
                      Client Appointments & Live Status ({appointments.length})
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-4 rounded-xl bg-[#170e12] border border-[#d4af37]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-cinzel font-bold text-white text-sm">
                              {apt.clientName}
                            </span>
                            <span className="text-[10px] text-[#d4af37] bg-black/60 px-1.5 py-0.5 rounded border border-[#d4af37]/30">
                              #{apt.id}
                            </span>
                          </div>
                          <div className="text-xs text-stone-300 flex flex-wrap gap-x-3 gap-y-1">
                            <span>📞 {apt.clientPhone}</span>
                            <span>📅 {apt.date} at {apt.timeSlot}</span>
                            <span>✂️ {apt.stylistName}</span>
                          </div>
                          <div className="text-xs text-stone-400">
                            <strong>Services:</strong> {apt.serviceNames?.join(', ')}
                          </div>
                          {apt.notes && (
                            <div className="text-[11px] text-amber-300 italic">
                              Note: {apt.notes}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                          {/* Status changer */}
                          <select
                            value={apt.status}
                            onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)}
                            className="px-3 py-1.5 rounded-lg bg-[#0e0709] border border-stone-700 text-xs font-semibold text-white focus:border-[#d4af37] focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {/* WhatsApp client direct */}
                          <a
                            href={`https://wa.me/${apt.clientPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.clientName)},%20your%20appointment%20at%20Subha%20Salon%20is%20${apt.status}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800"
                            title="Chat on WhatsApp"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="p-2 rounded-lg bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 border border-stone-800"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES MANAGER */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  {/* Service Add/Edit Form */}
                  <form onSubmit={handleSaveService} className="p-5 rounded-xl bg-[#190e13] border border-[#d4af37]/35 space-y-4">
                    <h4 className="font-cinzel text-sm font-bold text-white uppercase flex items-center justify-between">
                      <span>{editingServiceId ? 'Edit Salon Service' : 'Add New Salon Service'}</span>
                      {editingServiceId && (
                        <button
                          type="button"
                          onClick={() => setEditingServiceId(null)}
                          className="text-xs text-stone-400 hover:text-white"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceForm.name}
                          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                          placeholder="e.g. Keratin Hair Therapy"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Gender Category *
                        </label>
                        <select
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceGender })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="men">Men's Services</option>
                          <option value="women">Women's Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Subcategory Tag
                        </label>
                        <input
                          type="text"
                          value={serviceForm.subcategory}
                          onChange={(e) => setServiceForm({ ...serviceForm, subcategory: e.target.value })}
                          placeholder="e.g. Hair Design / Facial / Bridal"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Price (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={serviceForm.price}
                          onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Original Price (Strikethrough ₹)
                        </label>
                        <input
                          type="number"
                          value={serviceForm.originalPrice}
                          onChange={(e) => setServiceForm({ ...serviceForm, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={serviceForm.duration}
                          onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                          placeholder="e.g. 50 mins"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Service Image URL or Upload
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={serviceForm.image}
                            onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                            placeholder="https://images.unsplash..."
                            className="flex-1 px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                          <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs cursor-pointer flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'service')}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Key Perks / Features (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={serviceForm.features}
                          onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                          placeholder="Face shape analysis, Organic wash, Blowdry"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        placeholder="Detailed explanation of the therapy..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#AA771C] text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingServiceId ? 'Update Service' : 'Publish New Service'}</span>
                    </button>
                  </form>

                  {/* Existing Services List */}
                  <div className="space-y-3">
                    <h5 className="font-cinzel text-xs font-bold text-stone-300 uppercase">
                      Current Services Menu ({services.length})
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((s) => (
                        <div key={s.id} className="p-3 rounded-xl bg-[#170e12] border border-stone-800 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={s.image} alt={s.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <h6 className="text-xs font-semibold text-white truncate">{s.name}</h6>
                              <div className="text-[11px] text-[#d4af37]">₹{s.price} • {s.category}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => {
                                setEditingServiceId(s.id);
                                setServiceForm({
                                  name: s.name,
                                  category: s.category,
                                  subcategory: s.subcategory,
                                  price: s.price,
                                  originalPrice: s.originalPrice || s.price,
                                  duration: s.duration,
                                  description: s.description,
                                  image: s.image,
                                  popular: !!s.popular,
                                  features: s.features.join(', '),
                                });
                              }}
                              className="p-1.5 rounded bg-stone-800 hover:bg-[#3b0813] text-stone-300 hover:text-[#d4af37]"
                              title="Edit service"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteService(s.id)}
                              className="p-1.5 rounded bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-300"
                              title="Delete service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TEAM STYLISTS MANAGER */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  {/* Team Form */}
                  <form onSubmit={handleSaveTeam} className="p-5 rounded-xl bg-[#190e13] border border-[#d4af37]/35 space-y-4">
                    <h4 className="font-cinzel text-sm font-bold text-white uppercase flex items-center justify-between">
                      <span>{editingTeamId ? 'Edit Team Member' : 'Add New Master Stylist'}</span>
                      {editingTeamId && (
                        <button
                          type="button"
                          onClick={() => setEditingTeamId(null)}
                          className="text-xs text-stone-400 hover:text-white"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={teamForm.name}
                          onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                          placeholder="e.g. Master Ananya"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Role / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={teamForm.role}
                          onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                          placeholder="e.g. Chief Bridal Makeup Artist"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Experience
                        </label>
                        <input
                          type="text"
                          value={teamForm.experience}
                          onChange={(e) => setTeamForm({ ...teamForm, experience: e.target.value })}
                          placeholder="e.g. 8+ Years"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Photo URL or Upload Photo
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={teamForm.image}
                            onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                            placeholder="https://images.unsplash..."
                            className="flex-1 px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                          <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs cursor-pointer flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'team')}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Specialty Focus
                        </label>
                        <input
                          type="text"
                          value={teamForm.specialty}
                          onChange={(e) => setTeamForm({ ...teamForm, specialty: e.target.value })}
                          placeholder="e.g. Airbrush Bridal & Balayage"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                        Bio / Credentials
                      </label>
                      <textarea
                        rows={2}
                        value={teamForm.bio}
                        onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                        placeholder="Certifications and styling background..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#AA771C] text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingTeamId ? 'Update Stylist' : 'Add Stylist'}</span>
                    </button>
                  </form>

                  {/* Team Members List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teamMembers.map((m) => (
                      <div key={m.id} className="p-4 rounded-xl bg-[#170e12] border border-stone-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={m.image} alt={m.name} className="w-14 h-14 rounded-full object-cover border border-[#d4af37]/40 flex-shrink-0" />
                          <div>
                            <h6 className="font-cinzel font-bold text-white text-xs">{m.name}</h6>
                            <div className="text-[11px] text-[#d4af37]">{m.role}</div>
                            <div className="text-[10px] text-stone-400">{m.experience} • ★ {m.rating}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingTeamId(m.id);
                              setTeamForm({
                                name: m.name,
                                role: m.role,
                                specialty: m.specialty,
                                experience: m.experience,
                                image: m.image,
                                rating: m.rating,
                                bio: m.bio,
                                instagram: m.instagram || '',
                              });
                            }}
                            className="p-2 rounded bg-stone-800 hover:bg-[#3b0813] text-stone-300 hover:text-[#d4af37]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTeamMember(m.id)}
                            className="p-2 rounded bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: GALLERY MANAGER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Add Photo Form */}
                  <form onSubmit={handleSaveGallery} className="p-5 rounded-xl bg-[#190e13] border border-[#d4af37]/35 space-y-4">
                    <h4 className="font-cinzel text-sm font-bold text-white uppercase">
                      Upload New Gallery Artwork / Transformation
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Photo Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          placeholder="e.g. Royal Bengali Bridal"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Category *
                        </label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="hair">Women's Hair</option>
                          <option value="bridal">Bridal & Glam</option>
                          <option value="grooming">Men's Grooming</option>
                          <option value="ambience">Salon Ambience</option>
                          <option value="spa">Spa & Facials</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={galleryForm.tag}
                          onChange={(e) => setGalleryForm({ ...galleryForm, tag: e.target.value })}
                          placeholder="e.g. Bridal Artistry"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                        Image URL or Upload Image File *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={galleryForm.imageUrl}
                          onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash..."
                          className="flex-1 px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                        <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs cursor-pointer flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'gallery')}
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#AA771C] text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add To Gallery</span>
                    </button>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {gallery.map((g) => (
                      <div key={g.id} className="group relative h-40 rounded-xl overflow-hidden border border-stone-800 bg-[#160e12]">
                        <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                          <div className="text-[10px] text-white font-semibold line-clamp-1">{g.title}</div>
                          <button
                            onClick={() => deleteGalleryItem(g.id)}
                            className="self-end p-1.5 rounded bg-rose-900 text-white hover:bg-rose-800"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: OFFERS & PROMOTIONS */}
              {activeTab === 'offers' && (
                <div className="space-y-6">
                  {/* Add Offer Form */}
                  <form onSubmit={handleSaveOffer} className="p-5 rounded-xl bg-[#190e13] border border-[#d4af37]/35 space-y-4">
                    <h4 className="font-cinzel text-sm font-bold text-white uppercase">
                      Create Special Promotion / Discount Banner
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Promotion Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={offerForm.title}
                          onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                          placeholder="e.g. Royal Wedding Season Deal"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Discount Tag *
                        </label>
                        <input
                          type="text"
                          required
                          value={offerForm.discount}
                          onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                          placeholder="e.g. 25% OFF or FLAT ₹1000 OFF"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                          Promo Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={offerForm.code}
                          onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })}
                          placeholder="e.g. SUBHA25"
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs uppercase focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                        Offer Description & Terms
                      </label>
                      <textarea
                        rows={2}
                        value={offerForm.description}
                        onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                        placeholder="Valid on hair spa and bridal makeover packages..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#AA771C] text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Launch Promotion</span>
                    </button>
                  </form>

                  {/* Active Offers List */}
                  <div className="space-y-3">
                    {offers.map((off) => (
                      <div key={off.id} className="p-4 rounded-xl bg-[#170e12] border border-[#d4af37]/30 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-cinzel font-bold text-white text-sm">{off.title}</span>
                            <span className="px-2 py-0.5 rounded bg-[#3b0813] text-[#d4af37] text-xs font-extrabold border border-[#d4af37]/40">
                              {off.discount}
                            </span>
                          </div>
                          <div className="text-xs text-stone-300 mt-1">Code: <strong>{off.code}</strong> • {off.validUntil}</div>
                          <p className="text-xs text-stone-400">{off.description}</p>
                        </div>

                        <button
                          onClick={() => deleteOffer(off.id)}
                          className="p-2 rounded bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: PUSH NOTIFICATION BROADCAST CONSOLE */}
              {activeTab === 'push' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#240810] to-[#17080c] border border-[#d4af37]/40 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#3b0813] text-[#d4af37] border border-[#d4af37]/50">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-cinzel text-base font-bold text-white uppercase">
                          Push Notification Broadcast Console
                        </h4>
                        <p className="text-xs text-stone-300">
                          Send instant browser push notifications and in-app alerts to guests for confirmed bookings or special flash deals.
                        </p>
                      </div>
                    </div>

                    {broadcastSent && (
                      <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
                        <CheckCircle className="w-4 h-4" />
                        <span>Push Notification sent successfully to all web subscribers & notification bells!</span>
                      </div>
                    )}

                    <form onSubmit={handleSendBroadcast} className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                          Notification Headline *
                        </label>
                        <input
                          type="text"
                          required
                          value={pushForm.title}
                          onChange={(e) => setPushForm({ ...pushForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                          Notification Message Body *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={pushForm.message}
                          onChange={(e) => setPushForm({ ...pushForm, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#0e0709] border border-stone-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-stone-400">
                          🔊 Will trigger device chime + native system banner
                        </span>
                        <button
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#c5a059] text-black font-cinzel font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
                        >
                          <Send className="w-4 h-4 text-[#3b0813]" />
                          <span>Dispatch Push Broadcast</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanelModal;
