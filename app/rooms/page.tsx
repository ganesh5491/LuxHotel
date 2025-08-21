'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RoomShowcase } from '@/components/RoomShowcase';
import { BookingWidget } from '@/components/BookingWidget';
import { BookingModal } from '@/components/BookingModal';
import { Bed, Users, Wifi, Car, Bath, Tv, Coffee, Star, Filter, SortAsc } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RoomsPage() {
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const roomCategories = [
    {
      id: 'deluxe',
      name: 'Deluxe Rooms',
      description: 'Elegant comfort with modern amenities',
      rooms: [
        {
          id: 1,
          name: 'Deluxe City View',
          price: 350,
          originalPrice: 450,
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          beds: 1,
          guests: 2,
          size: '35 sqm',
          amenities: ['City View', 'King Bed', 'Marble Bathroom', 'Minibar', 'Wi-Fi', 'Room Service'],
          description: 'Experience urban luxury with stunning city views from your private sanctuary.',
          rating: 4.7,
          reviews: 189
        },
        {
          id: 2,
          name: 'Deluxe Garden View',
          price: 380,
          originalPrice: 480,
          image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          beds: 1,
          guests: 2,
          size: '38 sqm',
          amenities: ['Garden View', 'King Bed', 'Spa Bathroom', 'Balcony', 'Premium Wi-Fi', 'Turndown Service'],
          description: 'Relax in tranquil surroundings with beautiful garden views and premium amenities.',
          rating: 4.8,
          reviews: 156
        }
      ]
    },
    {
      id: 'suite',
      name: 'Luxury Suites',
      description: 'Spacious elegance with separate living areas',
      rooms: [
        {
          id: 3,
          name: 'Executive Suite',
          price: 650,
          originalPrice: 800,
          image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          beds: 1,
          guests: 3,
          size: '65 sqm',
          amenities: ['Separate Living Area', 'King Bed', 'Executive Lounge Access', 'Butler Service', 'Premium Wi-Fi', 'Complimentary Breakfast'],
          description: 'Perfect for business travelers seeking luxury and convenience.',
          rating: 4.9,
          reviews: 98
        },
        {
          id: 4,
          name: 'Ocean View Suite',
          price: 750,
          originalPrice: 950,
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          beds: 1,
          guests: 3,
          size: '70 sqm',
          amenities: ['Ocean View', 'King Bed', 'Private Balcony', 'Jacuzzi', 'Butler Service', 'Champagne Welcome'],
          description: 'Wake up to breathtaking ocean views in this luxurious suite.',
          rating: 5.0,
          reviews: 67
        }
      ]
    },
    {
      id: 'presidential',
      name: 'Presidential Collection',
      description: 'The ultimate in luxury and exclusivity',
      rooms: [
        {
          id: 5,
          name: 'Presidential Penthouse',
          price: 1200,
          originalPrice: 1500,
          image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          beds: 2,
          guests: 4,
          size: '120 sqm',
          amenities: ['Panoramic Views', 'Master Suite', 'Private Terrace', 'Personal Butler', 'Limousine Service', 'Private Chef Available'],
          description: 'The pinnacle of luxury with unparalleled service and amenities.',
          rating: 5.0,
          reviews: 23
        }
      ]
    }
  ];

  const allRooms = roomCategories.flatMap(category => category.rooms);

  const filteredRooms = filterBy === 'all' 
    ? allRooms 
    : roomCategories.find(cat => cat.id === filterBy)?.rooms || [];

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.price - b.price;
    }
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)' }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Luxury <span className="text-yellow-600">Accommodations</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover our collection of elegantly appointed rooms and suites
          </p>
        </div>
      </section>

      {/* Booking Widget */}
      <BookingWidget />

      {/* Filters and Sorting */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="all">All Rooms</option>
                  <option value="deluxe">Deluxe Rooms</option>
                  <option value="suite">Luxury Suites</option>
                  <option value="presidential">Presidential Collection</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <SortAsc className="h-5 w-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {roomCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h2>
                <p className="text-xl text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.rooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6">
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
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{room.rating} ({room.reviews})</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="grid grid-cols-2 gap-2">
                            {room.amenities.slice(0, 4).map((amenity, i) => (
                              <div key={i} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                                {amenity}
                              </div>
                            ))}
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
                          <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      <Footer />
    </div>
  );
}