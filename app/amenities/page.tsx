'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Amenities } from '@/components/Amenities';
import { Wifi, Car, Utensils, Waves, Dumbbell, Space as Spa, Coffee, Shield, Users, Headphones, Plane, Gift, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AmenitiesPage() {
  const amenityCategories = [
    {
      title: 'Wellness & Recreation',
      description: 'Rejuvenate your body and mind with our premium wellness facilities',
      amenities: [
        {
          icon: Waves,
          name: 'Infinity Pool',
          description: 'Rooftop infinity pool with panoramic city views, heated year-round',
          hours: '6:00 AM - 10:00 PM',
          location: 'Rooftop Level',
          features: ['Heated Pool', 'Pool Bar', 'Cabanas', 'City Views']
        },
        {
          icon: Dumbbell,
          name: 'Fitness Center',
          description: 'State-of-the-art gym with personal trainers and modern equipment',
          hours: '24/7 Access',
          location: '2nd Floor',
          features: ['Personal Trainers', 'Cardio Equipment', 'Weight Training', 'Yoga Studio']
        },
        {
          icon: Spa,
          name: 'Luxury Spa',
          description: 'Full-service spa offering premium treatments and wellness programs',
          hours: '9:00 AM - 9:00 PM',
          location: '3rd Floor',
          features: ['Massage Therapy', 'Facial Treatments', 'Sauna', 'Steam Room']
        }
      ]
    },
    {
      title: 'Dining & Entertainment',
      description: 'Exceptional culinary experiences and entertainment options',
      amenities: [
        {
          icon: Utensils,
          name: 'Fine Dining Restaurant',
          description: 'Michelin-starred cuisine with seasonal menus and wine pairings',
          hours: '6:00 PM - 11:00 PM',
          location: 'Ground Floor',
          features: ['Michelin Star', 'Wine Cellar', 'Private Dining', 'Chef\'s Table']
        },
        {
          icon: Coffee,
          name: 'Rooftop Bar & Lounge',
          description: 'Sophisticated cocktails with stunning city skyline views',
          hours: '5:00 PM - 2:00 AM',
          location: 'Rooftop Level',
          features: ['Craft Cocktails', 'Live Music', 'City Views', 'VIP Seating']
        },
        {
          icon: Headphones,
          name: 'Entertainment Lounge',
          description: 'Premium entertainment with live performances and events',
          hours: '7:00 PM - 1:00 AM',
          location: 'Mezzanine Level',
          features: ['Live Shows', 'DJ Sets', 'Private Events', 'VIP Packages']
        }
      ]
    },
    {
      title: 'Business & Services',
      description: 'Professional services and amenities for business travelers',
      amenities: [
        {
          icon: Coffee,
          name: 'Business Center',
          description: 'Fully equipped business center with meeting rooms and office services',
          hours: '24/7 Access',
          location: '1st Floor',
          features: ['Meeting Rooms', 'Printing Services', 'Video Conferencing', 'Administrative Support']
        },
        {
          icon: Users,
          name: 'Event Spaces',
          description: 'Elegant ballrooms and private venues for special occasions',
          hours: 'By Appointment',
          location: 'Multiple Locations',
          features: ['Grand Ballroom', 'Private Rooms', 'Catering Services', 'Event Planning']
        },
        {
          icon: Gift,
          name: 'Concierge Services',
          description: 'Personal concierge available for all your needs and requests',
          hours: '24/7 Available',
          location: 'Lobby',
          features: ['Personal Assistant', 'Reservations', 'Transportation', 'Local Recommendations']
        }
      ]
    },
    {
      title: 'Convenience & Comfort',
      description: 'Essential services to make your stay comfortable and convenient',
      amenities: [
        {
          icon: Car,
          name: 'Valet Parking',
          description: 'Complimentary valet parking with luxury car service available',
          hours: '24/7 Service',
          location: 'Main Entrance',
          features: ['Valet Service', 'Secure Parking', 'Car Wash', 'Luxury Rentals']
        },
        {
          icon: Plane,
          name: 'Airport Transfer',
          description: 'Complimentary luxury airport transfers in premium vehicles',
          hours: 'On Request',
          location: 'Hotel Entrance',
          features: ['Luxury Vehicles', 'Professional Drivers', 'Flight Tracking', 'Meet & Greet']
        },
        {
          icon: Shield,
          name: '24/7 Security',
          description: 'Round-the-clock security and safety services for peace of mind',
          hours: '24/7 Monitoring',
          location: 'Throughout Property',
          features: ['Security Personnel', 'CCTV Monitoring', 'Safe Deposit', 'Emergency Response']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)' }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            World-Class <span className="text-yellow-600">Amenities</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Experience luxury through our comprehensive collection of premium amenities and services
          </p>
        </div>
      </section>

      {/* Amenities Overview */}
      <Amenities />

      {/* Detailed Amenities by Category */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {amenityCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {category.amenities.map((amenity, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                          <amenity.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{amenity.name}</h3>
                        <p className="text-gray-600">{amenity.description}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Hours</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{amenity.hours}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Location</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{amenity.location}</span>
                        </div>

                        <div className="pt-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {amenity.features.map((feature, i) => (
                              <div key={i} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Exclusive <span className="text-yellow-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized services designed to make your stay extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Butler Service</div>
                <p className="text-gray-600">Personal butler available for suite guests</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">VIP</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Helicopter Service</div>
                <p className="text-gray-600">Private helicopter transfers available</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">Chef</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Private Dining</div>
                <p className="text-gray-600">Personal chef for in-room dining experiences</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-purple-600 mb-2">Luxury</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Shopping Service</div>
                <p className="text-gray-600">Personal shopping and styling services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}