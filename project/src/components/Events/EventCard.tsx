import React from 'react';
import { Calendar, MapPin, Users, Clock, User } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onRSVP?: (eventId: string) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  showActions?: boolean;
  isHost?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onRSVP, 
  onEdit, 
  onDelete, 
  showActions = true,
  isHost = false 
}) => {
  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`);
    return {
      date: eventDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: eventDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      weekday: eventDate.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const { date, time, weekday } = formatDate(event.date, event.time);
  const availableSpots = event.capacity - event.rsvpCount;
  const isFullyBooked = availableSpots <= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-br from-purple-400 via-blue-500 to-teal-400 relative overflow-hidden">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {isFullyBooked ? (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Sold Out
            </span>
          ) : availableSpots <= 10 ? (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Almost Full
            </span>
          ) : (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Available
            </span>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Date & Title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-3 text-center min-w-[60px]">
            <div className="text-sm font-medium text-purple-600">{weekday}</div>
            <div className="text-lg font-bold text-gray-900">{date.split(' ')[1]}</div>
            <div className="text-xs text-gray-600">{date.split(' ')[0]}</div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-3 text-purple-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-3 text-purple-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-3 text-purple-500" />
            <span>{event.rsvpCount} attending • {availableSpots} spots left</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <User className="h-4 w-4 mr-3 text-purple-500" />
            <span>Hosted by {event.host.name}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Capacity</span>
            <span>{event.rsvpCount}/{event.capacity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((event.rsvpCount / event.capacity) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-3">
            {isHost ? (
              <>
                <button
                  onClick={() => onEdit?.(event)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => onDelete?.(event.id)}
                  className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => onRSVP?.(event.id)}
                disabled={isFullyBooked}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  isFullyBooked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                }`}
              >
                {isFullyBooked ? 'Event Full' : 'RSVP Now'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;