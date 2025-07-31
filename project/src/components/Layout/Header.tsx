import React, { useState } from 'react';
import { Calendar, User, LogOut, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, currentView, onViewChange }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigation = user ? [
    { name: 'Dashboard', key: 'dashboard' },
    ...(user.role === 'host' ? [{ name: 'My Events', key: 'my-events' }] : []),
    { name: 'Browse Events', key: 'browse' },
    ...(user.role === 'attendee' ? [{ name: 'My RSVPs', key: 'my-rsvps' }] : []),
  ] : [
    { name: 'Browse Events', key: 'browse' }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => onViewChange(user ? 'dashboard' : 'home')}
          >
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EventHub
              </h1>
              <p className="text-xs text-gray-500">Manage & Attend</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === item.key
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={() => {
                          onViewChange('profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile Settings
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onViewChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                    currentView === item.key
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;