'use client';

import { Wifi, Car, Utensils, Waves, Dumbbell, Space as Spa, Coffee, Shield, Users, Headphones, Plane, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Amenities() {
  const amenities = [
    {
      icon: Wifi,
      title: 'High-Speed Wi-Fi',
      description: 'Complimentary ultra-fast internet throughout the property',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Complimentary valet parking and luxury car service',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Michelin-starred restaurants and 24/7 room service',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Waves,
      title: 'Infinity Pool',
      description: 'Rooftop infinity pool with panoramic city views',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym with personal trainers',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Spa,
      title: 'Luxury Spa',
      description: 'Full-service spa with premium treatments',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Coffee,
      title: 'Business Center',
      description: 'Fully equipped business center and meeting rooms',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security and concierge service',
      color: 'bg-gray-100 text-gray-600'
    },
    {
      icon: Users,
      title: 'Event Spaces',
      description: 'Elegant ballrooms and private event venues',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Headphones,
      title: 'Entertainment',
      description: 'Premium entertainment systems and live shows',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: Plane,
      title: 'Airport Transfer',
      description: 'Complimentary luxury airport transfers',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Gift,
      title: 'Concierge Services',
      description: 'Personal concierge for all your needs',
      color: 'bg-rose-100 text-rose-600'
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World-Class <span className="text-yellow-600">Amenities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive collection of luxury amenities designed to exceed your expectations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${amenity.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <amenity.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600 text-sm">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-8 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Concierge Service</div>
              <p className="text-gray-600">Personal assistance whenever you need it</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5★</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Luxury Rating</div>
              <p className="text-gray-600">Certified five-star accommodation</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-8 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Guest Satisfaction</div>
              <p className="text-gray-600">Exceptional service guaranteed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}