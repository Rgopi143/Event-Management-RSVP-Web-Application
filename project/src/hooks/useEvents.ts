import { useState, useEffect } from 'react';
import { Event, RSVP } from '../types';

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    hostId: '1',
    title: 'Tech Innovation Summit 2025',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative startups, and networking opportunities.',
    date: '2025-03-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    category: 'Technology',
    capacity: 500,
    imageUrl: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    createdAt: '2025-01-01T00:00:00Z',
    host: {
      id: '1',
      name: 'John Host',
      email: 'host@example.com',
      role: 'host'
    },
    rsvpCount: 324,
    status: 'upcoming'
  },
  {
    id: '2',
    hostId: '1',
    title: 'Digital Marketing Workshop',
    description: 'Learn the latest digital marketing strategies and tools from industry experts.',
    date: '2025-02-20',
    time: '14:00',
    location: 'Online Webinar',
    category: 'Business',
    capacity: 100,
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    createdAt: '2025-01-02T00:00:00Z',
    host: {
      id: '1',
      name: 'John Host',
      email: 'host@example.com',
      role: 'host'
    },
    rsvpCount: 89,
    status: 'upcoming'
  },
  {
    id: '3',
    hostId: '2',
    title: 'Startup Networking Night',
    description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts in your area.',
    date: '2025-02-10',
    time: '18:30',
    location: 'The Innovation Hub, Austin',
    category: 'Networking',
    capacity: 75,
    imageUrl: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    createdAt: '2025-01-03T00:00:00Z',
    host: {
      id: '2',
      name: 'Sarah Founder',
      email: 'sarah@example.com',
      role: 'host'
    },
    rsvpCount: 62,
    status: 'upcoming'
  }
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'host' | 'rsvpCount' | 'status'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      host: {
        id: eventData.hostId,
        name: 'Current User',
        email: 'user@example.com',
        role: 'host'
      },
      rsvpCount: 0,
      status: 'upcoming'
    };
    
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = async (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent
  };
};

export const useRSVPs = () => {
  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRSVPs([]);
      setLoading(false);
    }, 500);
  }, []);

  const createRSVP = async (eventId: string, userId: string) => {
    const newRSVP: RSVP = {
      id: Date.now().toString(),
      userId,
      eventId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      user: {
        id: userId,
        name: 'Current User',
        email: 'user@example.com',
        role: 'attendee'
      },
      event: mockEvents.find(e => e.id === eventId)!
    };
    
    setRSVPs(prev => [...prev, newRSVP]);
    return newRSVP;
  };

  const updateRSVP = async (rsvpId: string, status: RSVP['status']) => {
    setRSVPs(prev => prev.map(rsvp => 
      rsvp.id === rsvpId ? { ...rsvp, status } : rsvp
    ));
  };

  return {
    rsvps,
    loading,
    createRSVP,
    updateRSVP
  };
};