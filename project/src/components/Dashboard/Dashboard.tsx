import React from 'react';
import { Calendar, Users, TrendingUp, Clock, Plus, MapPin, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../hooks/useEvents';

interface DashboardProps {
  onCreateEvent: () => void;
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateEvent, onViewChange }) => {
  const { user } = useAuth();
  const { events } = useEvents();

  const userEvents = events.filter(event => event.hostId === user?.id);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 3);

  const stats = user?.role === 'host' ? [
    {
      title: 'Total Events',
      value: userEvents.length,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      change: '+12%'
    },
    {
      title: 'Total Attendees',
      value: userEvents.reduce((sum, event) => sum + event.rsvpCount, 0),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+8%'
    },
    {
      title: 'Avg. Attendance',
      value: userEvents.length > 0 ? Math.round(userEvents.reduce((sum, event) => sum + event.rsvpCount, 0) / userEvents.length) : 0,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      change: '+5%'
    },
    {
      title: 'Active Events',
      value: userEvents.filter(event => new Date(event.date) > new Date()).length,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: '+3%'
    }
  ] : [
    {
      title: 'Events Attended',
      value: 12,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      change: '+2'
    },
    {
      title: 'Upcoming RSVPs',
      value: 3,
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      change: '+1'
    },
    {
      title: 'Networks Made',
      value: 45,
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+8'
    },
    {
      title: 'Cities Visited',
      value: 7,
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
      change: '+2'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-purple-100 text-lg">
              {user?.role === 'host' 
                ? 'Ready to create amazing events?' 
                : 'Discover exciting events near you!'
              }
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-20 p-4 rounded-xl">
              <User className="h-12 w-12" />
            </div>
          </div>
        </div>
        
        {user?.role === 'host' && (
          <div className="mt-6">
            <button
              onClick={onCreateEvent}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Event</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-green-600 text-sm font-medium mt-2">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {user?.role === 'host' ? (
              <>
                <button
                  onClick={onCreateEvent}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-3"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New Event</span>
                </button>
                <button
                  onClick={() => onViewChange('my-events')}
                  className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-3"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Manage My Events</span>
                </button>
                <button
                  onClick={() => onViewChange('analytics')}
                  className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-3"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>View Analytics</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onViewChange('browse')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-3"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Browse Events</span>
                </button>
                <button
                  onClick={() => onViewChange('my-rsvps')}
                  className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-3"
                >
                  <Users className="h-5 w-5" />
                  <span>My RSVPs</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                    <p className="text-gray-600 text-xs">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-purple-600">{event.rsvpCount}</p>
                    <p className="text-xs text-gray-500">attending</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming events</p>
                <button
                  onClick={() => onViewChange('browse')}
                  className="mt-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  Browse events →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;