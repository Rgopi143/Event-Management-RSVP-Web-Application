import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, SlidersHorizontal } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import EventCard from './EventCard';
import { useAuth } from '../../contexts/AuthContext';

interface EventBrowserProps {
  onRSVP: (eventId: string) => void;
}

const EventBrowser: React.FC<EventBrowserProps> = ({ onRSVP }) => {
  const { events, loading } = useEvents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Technology', 'Business', 'Health', 'Education', 'Arts', 'Sports', 'Music', 'Food', 'Travel', 'Networking', 'Workshop', 'Conference'];
  const locations = ['all', ...Array.from(new Set(events.map(event => event.location.split(',').pop()?.trim() || 'Unknown')))];

  const filteredEvents = events
    .filter(event => event.isPublic)
    .filter(event => 
      searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
    .filter(event => selectedLocation === 'all' || event.location.includes(selectedLocation))
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popularity':
          return b.rsvpCount - a.rsvpCount;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return 0;
      }
    });

  const featuredEvents = filteredEvents.slice(0, 3);
  const regularEvents = filteredEvents.slice(3);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find events that match your interests and connect with like-minded people in your community.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, locations, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="capacity">Sort by Capacity</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="capacity">Sort by Capacity</option>
            </select>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredEvents.length}</span> events
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Showing upcoming events</span>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
            <div className="flex items-center space-x-2 text-purple-600">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Most Popular</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={user ? onRSVP : undefined}
                showActions={!!user}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      {regularEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={user ? onRSVP : undefined}
                showActions={!!user}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or browse all categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
            {!user && (
              <button
                onClick={() => {/* Navigate to auth */}}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Sign Up to Create Events
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBrowser;