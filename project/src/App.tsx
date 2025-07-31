import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEvents, useRSVPs } from './hooks/useEvents';
import Header from './components/Layout/Header';
import AuthModal from './components/Auth/AuthModal';
import LandingPage from './components/Home/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import EventBrowser from './components/Events/EventBrowser';
import CreateEventModal from './components/Events/CreateEventModal';
import EventCard from './components/Events/EventCard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { events, createEvent, updateEvent, deleteEvent } = useEvents();
  const { createRSVP } = useRSVPs();
  
  const [currentView, setCurrentView] = useState(user ? 'dashboard' : 'home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  // Handle RSVP
  const handleRSVP = async (eventId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    try {
      await createRSVP(eventId, user.id);
      // Show success message or update UI
      alert('RSVP confirmed! You will receive a confirmation email shortly.');
    } catch (error) {
      alert('Failed to RSVP. Please try again.');
    }
  };

  // Handle event creation/editing
  const handleEventSubmit = async (eventData: any) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
        setEditingEvent(null);
      } else {
        await createEvent({ ...eventData, hostId: user?.id || '1' });
      }
      setIsCreateEventModalOpen(false);
    } catch (error) {
      alert('Failed to save event. Please try again.');
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  // Handle event editing
  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setIsCreateEventModalOpen(true);
  };

  // Get user's events
  const userEvents = events.filter(event => event.hostId === user?.id);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingPage 
            onAuthClick={() => setIsAuthModalOpen(true)}
            onViewChange={setCurrentView}
          />
        );
      
      case 'dashboard':
        return (
          <Dashboard 
            onCreateEvent={() => setIsCreateEventModalOpen(true)}
            onViewChange={setCurrentView}
          />
        );
      
      case 'browse':
        return <EventBrowser onRSVP={handleRSVP} />;
      
      case 'my-events':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
                <p className="text-gray-600 mt-2">Manage your created events</p>
              </div>
              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Create New Event
              </button>
            </div>
            
            {userEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    isHost={true}
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-600 mb-6">Create your first event to get started!</p>
                <button
                  onClick={() => setIsCreateEventModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Create Your First Event
                </button>
              </div>
            )}
          </div>
        );
      
      case 'my-rsvps':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My RSVPs</h1>
              <p className="text-gray-600 mt-2">Events you're attending</p>
            </div>
            
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No RSVPs yet</h3>
              <p className="text-gray-600 mb-6">Browse events and RSVP to see them here!</p>
              <button
                onClick={() => setCurrentView('browse')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Browse Events
              </button>
            </div>
          </div>
        );
      
      default:
        return renderCurrentView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAuthClick={() => setIsAuthModalOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => {
          setIsCreateEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleEventSubmit}
        editEvent={editingEvent}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;