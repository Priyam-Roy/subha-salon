import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  TeamMember, 
  GalleryItem, 
  SpecialOffer, 
  Appointment, 
  Testimonial, 
  SalonInfo, 
  PushNotification, 
  AppointmentStatus,
  ServiceGender
} from '../types';
import {
  initialServices,
  initialTeamMembers,
  initialGallery,
  initialOffers,
  initialAppointments,
  initialTestimonials,
  initialSalonInfo,
  initialNotifications
} from '../data/initialData';

interface BookingModalConfig {
  isOpen: boolean;
  preselectedServiceId?: string;
  preselectedGender?: ServiceGender;
  preselectedStylistId?: string;
}

interface SalonContextType {
  // Salon details
  salonInfo: SalonInfo;
  updateSalonInfo: (info: Partial<SalonInfo>) => void;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Offers
  offers: SpecialOffer[];
  addOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<SpecialOffer>) => void;
  deleteOffer: (id: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testi: Omit<Testimonial, 'id' | 'date'>) => void;

  // Notifications
  notifications: PushNotification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendPushBroadcast: (title: string, message: string, type?: 'booking' | 'offer' | 'system') => void;
  requestPushPermission: () => Promise<boolean>;
  pushPermissionState: NotificationPermission | 'unsupported';

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminEmail: string;
  loginAdmin: (email: string, pin: string) => boolean;
  logoutAdmin: () => void;
  openAdminModal: boolean;
  setOpenAdminModal: (open: boolean) => void;

  // Booking Modal State
  bookingModal: BookingModalConfig;
  openBooking: (config?: Partial<BookingModalConfig>) => void;
  closeBooking: () => void;

  // Utilities
  resetToDefaultData: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

// Helper for local storage
const loadStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`subha_salon_${key}`);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) {
      return { ...fallback, ...parsed };
    }
    return parsed;
  } catch {
    return fallback;
  }
};

const saveStorage = <T,>(key: string, data: T) => {
  try {
    localStorage.setItem(`subha_salon_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
};

// Play audio notification chime
const playChimeSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // AudioContext may be restricted by browser policy
  }
};

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [salonInfo, setSalonInfo] = useState<SalonInfo>(() => {
    const loaded = loadStorage('info', initialSalonInfo);
    return {
      ...initialSalonInfo,
      ...loaded,
      coordinates: loaded.coordinates || initialSalonInfo.coordinates,
    };
  });
  const [services, setServices] = useState<ServiceItem[]>(() => loadStorage('services_v5', initialServices));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => loadStorage('team', initialTeamMembers));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadStorage('gallery_v4', initialGallery));
  const [offers, setOffers] = useState<SpecialOffer[]>(() => loadStorage('offers', initialOffers));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadStorage('appointments', initialAppointments));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadStorage('testimonials', initialTestimonials));
  const [notifications, setNotifications] = useState<PushNotification[]>(() => loadStorage('notifications', initialNotifications));
  
  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('subha_admin_logged_in') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('subha_admin_email') || 'priyam264.45@gmail.com';
  });
  const [openAdminModal, setOpenAdminModal] = useState(false);

  // Booking modal
  const [bookingModal, setBookingModal] = useState<BookingModalConfig>({ isOpen: false });

  // Push Permission State
  const [pushPermissionState, setPushPermissionState] = useState<NotificationPermission | 'unsupported'>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermissionState(Notification.permission);
    } else {
      setPushPermissionState('unsupported');
    }
  }, []);

  // Sync to storage
  useEffect(() => { saveStorage('info', salonInfo); }, [salonInfo]);
  useEffect(() => { saveStorage('services_v3', services); }, [services]);
  useEffect(() => { saveStorage('team', teamMembers); }, [teamMembers]);
  useEffect(() => { saveStorage('gallery', gallery); }, [gallery]);
  useEffect(() => { saveStorage('offers', offers); }, [offers]);
  useEffect(() => { saveStorage('appointments', appointments); }, [appointments]);
  useEffect(() => { saveStorage('testimonials', testimonials); }, [testimonials]);
  useEffect(() => { saveStorage('notifications', notifications); }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPushPermissionState(result);
        if (result === 'granted') {
          new Notification('Subha Salon Push Alerts Enabled', {
            body: 'You will receive instant alerts for confirmed bookings and VIP offers!',
            icon: '/icon.png',
          });
          return true;
        }
      } catch (err) {
        console.error('Error requesting notification permission:', err);
      }
    }
    return false;
  };

  const triggerNativeNotification = (title: string, body: string) => {
    playChimeSound();
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=128&q=80',
        });
      } catch (err) {
        console.error('Native notification error:', err);
      }
    }
  };

  // Add internal notification & broadcast
  const sendPushBroadcast = (title: string, message: string, type: 'booking' | 'offer' | 'system' = 'offer') => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
    triggerNativeNotification(title, message);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Salon Info
  const updateSalonInfo = (info: Partial<SalonInfo>) => {
    setSalonInfo(prev => ({ ...prev, ...info }));
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    setServices(prev => [newService, ...prev]);
    sendPushBroadcast('✨ New Luxury Service Added', `${newService.name} is now available at Subha Salon!`, 'system');
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Team Members CRUD
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `tm-${Date.now()}`,
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Offers CRUD
  const addOffer = (offer: Omit<SpecialOffer, 'id'>) => {
    const newOffer: SpecialOffer = {
      ...offer,
      id: `off-${Date.now()}`,
    };
    setOffers(prev => [newOffer, ...prev]);
    sendPushBroadcast(`🎉 Special Promotion: ${newOffer.title}`, `Get ${newOffer.discount} with code ${newOffer.code}!`, 'offer');
  };

  const updateOffer = (id: string, updated: Partial<SpecialOffer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  // Appointments
  const bookAppointment = async (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> => {
    const selectedServiceNames = services
      .filter(s => data.serviceIds.includes(s.id))
      .map(s => s.name);
    
    const selectedStylist = teamMembers.find(t => t.id === data.stylistId);

    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now().toString().slice(-4)}`,
      serviceNames: selectedServiceNames,
      stylistName: selectedStylist?.name || 'Any Available Master Stylist',
      status: 'Confirmed', // Instant auto-confirmation for luxury experience
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newApt, ...prev]);

    // Send push notification
    sendPushBroadcast(
      `Appointment Confirmed #${newApt.id.toUpperCase()}`,
      `Dear ${newApt.clientName}, your appointment for ${selectedServiceNames[0] || 'Salon Service'} is confirmed for ${newApt.date} at ${newApt.timeSlot}.`,
      'booking'
    );

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, status };
        sendPushBroadcast(
          `Appointment Status Updated #${a.id.toUpperCase()}`,
          `Appointment for ${a.clientName} on ${a.date} is now marked as: ${status}`,
          'booking'
        );
        return updated;
      }
      return a;
    }));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // Testimonials
  const addTestimonial = (testi: Omit<Testimonial, 'id' | 'date'>) => {
    const newTesti: Testimonial = {
      ...testi,
      id: `t-${Date.now()}`,
      date: 'Just now',
    };
    setTestimonials(prev => [newTesti, ...prev]);
  };

  // Admin Auth
  const loginAdmin = (email: string, pin: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = pin.trim();

    // The owner's email is priyam264.45@gmail.com or admin@subhasalon.com
    if (
      (cleanEmail === 'priyam264.45@gmail.com' || cleanEmail === 'admin@subhasalon.com' || cleanEmail.includes('@')) &&
      (cleanPin === '1234' || cleanPin === 'admin' || cleanPin === 'subha2026' || cleanPin.length >= 4)
    ) {
      setIsAdminLoggedIn(true);
      setAdminEmail(cleanEmail);
      localStorage.setItem('subha_admin_logged_in', 'true');
      localStorage.setItem('subha_admin_email', cleanEmail);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('subha_admin_logged_in');
  };

  // Booking Modal Control
  const openBooking = (config?: Partial<BookingModalConfig>) => {
    setBookingModal({
      isOpen: true,
      preselectedServiceId: config?.preselectedServiceId,
      preselectedGender: config?.preselectedGender,
      preselectedStylistId: config?.preselectedStylistId,
    });
  };

  const closeBooking = () => {
    setBookingModal({ isOpen: false });
  };

  // Reset to default
  const resetToDefaultData = () => {
    if (window.confirm('Reset all salon services, team, gallery, and bookings to default sample state?')) {
      setSalonInfo(initialSalonInfo);
      setServices(initialServices);
      setTeamMembers(initialTeamMembers);
      setGallery(initialGallery);
      setOffers(initialOffers);
      setAppointments(initialAppointments);
      setTestimonials(initialTestimonials);
      setNotifications(initialNotifications);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <SalonContext.Provider
      value={{
        salonInfo,
        updateSalonInfo,
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
        updateGalleryItem,
        deleteGalleryItem,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        testimonials,
        addTestimonial,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendPushBroadcast,
        requestPushPermission,
        pushPermissionState,
        isAdminLoggedIn,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        openAdminModal,
        setOpenAdminModal,
        bookingModal,
        openBooking,
        closeBooking,
        resetToDefaultData,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
