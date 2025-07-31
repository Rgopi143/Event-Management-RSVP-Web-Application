export interface User {
  id: string;
  name: string;
  email: string;
  role: 'host' | 'attendee' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Event {
  id: string;
  hostId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  category: string;
  subcategory?: string;
  tags: string[];
  capacity: number;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: string;
  host: User;
  rsvpCount: number;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  
  // New fields for scalability
  pricing?: {
    isFree: boolean;
    price?: number;
    currency?: string;
    earlyBirdPrice?: number;
    earlyBirdEndDate?: string;
    groupDiscount?: number;
    groupSize?: number;
  };
  
  recurring?: {
    isRecurring: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval?: number;
    endDate?: string;
    exceptions?: string[];
  };
  
  features?: {
    hasLivestream: boolean;
    hasRecording: boolean;
    hasNetworking: boolean;
    hasWorkshop: boolean;
    hasQandA: boolean;
    hasCatering: boolean;
    isAccessible: boolean;
    hasParking: boolean;
    hasWifi: boolean;
  };
  
  requirements?: {
    ageRestriction?: number;
    dressCode?: string;
    equipment?: string[];
    prerequisites?: string[];
  };
  
  social?: {
    hashtag?: string;
    socialMediaLinks?: string[];
  };
  
  analytics?: {
    views: number;
    shares: number;
    saves: number;
  };
}

export interface RSVP {
  id: string;
  userId: string;
  eventId: string;
  status: 'confirmed' | 'pending' | 'declined' | 'waitlist';
  createdAt: string;
  user: User;
  event: Event;
  notes?: string;
  dietaryRestrictions?: string[];
  plusOnes?: number;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
}

export interface Notification {
  id: string;
  userId: string;
  eventId: string;
  type: 'rsvp_confirmation' | 'event_reminder' | 'event_update' | 'event_cancelled' | 'waitlist_available' | 'payment_reminder' | 'event_starting_soon';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// New interfaces for scalability
export interface EventSeries {
  id: string;
  title: string;
  description: string;
  events: Event[];
  hostId: string;
  createdAt: string;
}

export interface EventTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultSettings: Partial<Event>;
  createdBy: string;
  isPublic: boolean;
  usageCount: number;
}

export interface EventCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
  popularTags: string[];
}

export interface EventSearchFilters {
  category?: string;
  subcategory?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  tags?: string[];
  features?: string[];
  isFree?: boolean;
  hasLivestream?: boolean;
  isAccessible?: boolean;
}

export interface EventAnalytics {
  eventId: string;
  views: number;
  uniqueViews: number;
  shares: number;
  saves: number;
  rsvpRate: number;
  conversionRate: number;
  topReferrers: Array<{
    source: string;
    count: number;
  }>;
  demographics?: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
  };
}