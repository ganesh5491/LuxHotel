'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [rooms, setRooms] = useState('1');

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking:', { checkIn, checkOut, guests, rooms });
  };

  return (
    <section id="booking" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your <span className="text-yellow-600">Perfect Stay</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose your dates and experience luxury like never before
            </p>
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-white p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Check-in */}
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-yellow-600" />
                      Check-in
                    </Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  {/* Check-out */}
                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-yellow-600" />
                      Check-out
                    </Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-sm font-medium text-gray-700 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-yellow-600" />
                      Guests
                    </Label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  {/* Rooms */}
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-yellow-600" />
                      Rooms
                    </Label>
                    <select
                      id="rooms"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                    >
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                      <option value="4">4+ Rooms</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleBooking}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-12 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                      20% OFF
                    </div>
                    <span className="text-gray-700">Extended Stay (7+ nights)</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                      FREE
                    </div>
                    <span className="text-gray-700">Airport Transfer</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                      $50
                    </div>
                    <span className="text-gray-700">Spa Credit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}