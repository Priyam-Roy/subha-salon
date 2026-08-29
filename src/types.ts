export type ServiceGender = 'men' | 'women' | 'unisex';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceGender;
  subcategory: string;
  price: number;
  originalPrice?: number;
  duration: string; // e.g. "45 mins"
  description: string;
  image: string;
  popular?: boolean;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string; // e.g. "8+ Years"
  image: string;
  rating: number;
  bio: string;
  instagram?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'hair' | 'bridal' | 'grooming' | 'ambience' | 'spa';
  imageUrl: string;
  description: string;
  tag: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  discount: string; // e.g. "25% OFF"
  code: string;
  validUntil: string;
  description: string;
  active: boolean;
  bannerImage?: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceIds: string[];
  serviceNames?: string[];
  stylistId: string;
  stylistName?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  totalAmount: number;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
  avatar: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'offer' | 'system' | 'reminder';
  actionUrl?: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsEmbedUrl: string;
}
