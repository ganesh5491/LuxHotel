'use client';

import { Award, Heart, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function About() {
  const stats = [
    { number: '50+', label: 'Awards Won', icon: Award },
    { number: '10,000+', label: 'Happy Guests', icon: Heart },
    { number: '250+', label: 'Team Members', icon: Users },
    { number: '25+', label: 'Years of Excellence', icon: Globe }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                A Legacy of <span className="text-yellow-600">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                For over two decades, LuxeHaven has been the epitome of luxury hospitality, 
                creating unforgettable experiences for discerning travelers from around the world.
              </p>
              <p className="text-gray-600 mb-8">
                Our commitment to exceptional service, attention to detail, and genuine care for our guests 
                has earned us recognition as one of the world's premier luxury hotels. Every moment spent 
                with us is crafted to exceed your expectations and create memories that last a lifetime.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Hotel Exterior"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                alt="Hotel Interior"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                alt="Luxury Suite"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Hotel Lobby"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}