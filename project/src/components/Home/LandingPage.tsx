import React from 'react';
import { Calendar, Users, MapPin, Zap, Shield, Smartphone, ArrowRight, Star } from 'lucide-react';

interface LandingPageProps {
  onAuthClick: () => void;
  onViewChange: (view: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthClick, onViewChange }) => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Creation',
      description: 'Create and customize events in minutes with our intuitive form builder.'
    },
    {
      icon: Users,
      title: 'RSVP Management',
      description: 'Track attendees, manage capacity, and send automatic reminders.'
    },
    {
      icon: MapPin,
      title: 'Location Integration',
      description: 'Add venues, share locations, and help attendees find your events.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant notifications and updates keep everyone in the loop.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on all devices, anywhere, anytime.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      content: 'EventHub has revolutionized how I manage my corporate events. The RSVP system and analytics are incredible!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Mike Chen',
      role: 'Startup Founder',
      content: 'Perfect for our monthly networking events. The attendee management features save us hours of work.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Emily Davis',
      role: 'Community Manager',
      content: 'The user interface is so intuitive. Our community loves how easy it is to RSVP and stay updated.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-white bg-opacity-10 rounded-full px-6 py-2 text-sm font-medium backdrop-blur-sm">
                <Zap className="h-4 w-4 mr-2" />
                The Future of Event Management
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Amazing
              <span className="block bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Events & Experiences
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform for creating, managing, and attending events. 
              Connect with your community like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onAuthClick}
                className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onViewChange('browse')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-200 transform hover:scale-105"
              >
                Browse Events
              </button>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-8 text-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make event management effortless and attendee experiences unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by event organizers worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about EventHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create your first event?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of event organizers who trust EventHub to bring their communities together.
          </p>
          <button
            onClick={onAuthClick}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Start Creating Events</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;