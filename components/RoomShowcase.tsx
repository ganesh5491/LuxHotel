'use client';

import { useState } from 'react';
import { Bed, Users, Wifi, Car, Bath, Tv, Coffee, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/BookingModal';

export function RoomShowcase() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Ocean View Suite',
      price: 450,
      originalPrice: 600,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      beds: 1,
      guests: 2,
      size: '45 sqm',
      amenities: ['Ocean View', 'King Bed', 'Marble Bathroom', 'Balcony', 'Minibar', 'Wi-Fi'],
      description: 'Indulge in breathtaking ocean views from your private balcony in this elegantly appointed suite.',
      rating: 4.9,
      reviews: 247
    },
    {
      id: 2,
      name: 'Presidential Penthouse',
      price: 1200,
      originalPrice: 1500,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      beds: 2,
      guests: 4,
      size: '120 sqm',
      amenities: ['City View', 'Master Suite', 'Private Terrace', 'Jacuzzi', 'Butler Service', 'Premium Wi-Fi'],
      description: 'Experience the ultimate in luxury with panoramic city views and exclusive amenities.',
      rating: 5.0,
      reviews: 89
    },
    {
      id: 3,
      name: 'Garden Villa Retreat',
      price: 650,
      originalPrice: 800,
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      beds: 2,
      guests: 3,
      size: '75 sqm',
      amenities: ['Garden View', 'Separate Living Area', 'Private Garden', 'Fireplace', 'Spa Bath', 'Kitchenette'],
      description: 'Relax in your own private garden oasis with luxurious amenities and tranquil surroundings.',
      rating: 4.8,
      reviews: 156
    }
  ];

  const iconMap = {
    'Ocean View': Tv,
    'King Bed': Bed,
    'Marble Bathroom': Bath,
    'Balcony': Coffee,
    'Minibar': Coffee,
    'Wi-Fi': Wifi,
    'City View': Tv,
    'Master Suite': Bed,
    'Private Terrace': Coffee,
    'Jacuzzi': Bath,
    'Butler Service': Users,
    'Premium Wi-Fi': Wifi,
    'Garden View': Tv,
    'Separate Living Area': Users,
    'Private Garden': Coffee,
    'Fireplace': Coffee,
    'Spa Bath': Bath,
    'Kitchenette': Coffee
  };

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Luxury <span className="text-yellow-600">Accommodations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each room is meticulously designed to provide the ultimate in comfort and elegance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <Card key={room.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}% OFF
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{room.rating} ({room.reviews})</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 line-through">${room.originalPrice}</div>
                    <div className="text-2xl font-bold text-yellow-600">${room.price}</div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {room.beds} Bed{room.beds > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {room.guests} Guests
                  </div>
                  <div className="flex items-center">
                    <span>{room.size}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.slice(0, 4).map((amenity, i) => {
                      const Icon = iconMap[amenity] || Wifi;
                      return (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <Icon className="h-4 w-4 mr-2 text-yellow-600" />
                          {amenity}
                        </div>
                      );
                    })}
                  </div>
                  {room.amenities.length > 4 && (
                    <div className="text-sm text-gray-500 mt-2">
                      +{room.amenities.length - 4} more amenities
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  >
                    View Details
                  </Button>
                  <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => setIsBookingModalOpen(true)}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
}