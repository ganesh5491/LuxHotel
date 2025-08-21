'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';
import { Phone, Mail, MapPin, Clock, Car, Plane, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const departments = [
    {
      name: 'Reservations',
      phone: '+1 (555) 123-4567',
      email: 'reservations@luxehaven.com',
      hours: '24/7 Available',
      description: 'Book your stay or modify existing reservations'
    },
    {
      name: 'Concierge Services',
      phone: '+1 (555) 123-4568',
      email: 'concierge@luxehaven.com',
      hours: '24/7 Available',
      description: 'Personal assistance and local recommendations'
    },
    {
      name: 'Event Planning',
      phone: '+1 (555) 123-4569',
      email: 'events@luxehaven.com',
      hours: '9:00 AM - 6:00 PM',
      description: 'Weddings, corporate events, and special occasions'
    },
    {
      name: 'Spa & Wellness',
      phone: '+1 (555) 123-4570',
      email: 'spa@luxehaven.com',
      hours: '9:00 AM - 9:00 PM',
      description: 'Spa treatments and wellness program bookings'
    },
    {
      name: 'Dining Reservations',
      phone: '+1 (555) 123-4571',
      email: 'dining@luxehaven.com',
      hours: '10:00 AM - 10:00 PM',
      description: 'Restaurant reservations and private dining'
    },
    {
      name: 'Guest Relations',
      phone: '+1 (555) 123-4572',
      email: 'guestrelations@luxehaven.com',
      hours: '24/7 Available',
      description: 'Feedback, complaints, and special requests'
    }
  ];

  const transportationOptions = [
    {
      icon: Car,
      title: 'Luxury Car Service',
      description: 'Premium vehicles with professional chauffeurs',
      contact: '+1 (555) 123-4580',
      features: ['Mercedes S-Class', 'BMW 7 Series', 'Rolls Royce Available']
    },
    {
      icon: Plane,
      title: 'Private Jet Services',
      description: 'Exclusive private aviation arrangements',
      contact: '+1 (555) 123-4581',
      features: ['Private Jets', 'Helicopter Transfers', 'Airport VIP Services']
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)' }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact <span className="text-yellow-600">Us</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We're here to assist you 24/7 with all your luxury hospitality needs
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our team</p>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  +1 (555) 123-4567
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your inquiries</p>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  hello@luxehaven.com
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Instant assistance available</p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Contact Component */}
      <Contact />

      {/* Department Directory */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Department <span className="text-yellow-600">Directory</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect directly with the right department for faster assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 mb-4">{dept.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-yellow-600 mr-3" />
                      <span className="text-gray-700">{dept.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-yellow-600 mr-3" />
                      <span className="text-gray-700">{dept.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-600 mr-3" />
                      <span className="text-gray-700">{dept.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transportation <span className="text-yellow-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Luxury transportation options for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transportationOptions.map((option, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600">
                      <option.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 mb-4">{option.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Phone className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-gray-700">{option.contact}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {option.features.map((feature, i) => (
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
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Visit <span className="text-yellow-600">Us</span>
              </h2>
              
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                        <p className="text-gray-600">
                          123 Luxury Boulevard<br />
                          Downtown District<br />
                          New York, NY 10001<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reception Hours</h3>
                        <div className="space-y-1 text-gray-600">
                          <p>Check-in: 3:00 PM</p>
                          <p>Check-out: 12:00 PM</p>
                          <p>Front Desk: 24/7</p>
                          <p>Concierge: 24/7</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Getting <span className="text-yellow-600">Here</span>
              </h2>
              
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">From Airport</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Complimentary luxury transfer (advance booking required)</li>
                      <li>• Taxi: 25-30 minutes ($45-60)</li>
                      <li>• Private car service available</li>
                      <li>• Helicopter transfer: 8 minutes</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parking</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Complimentary valet parking</li>
                      <li>• Secure underground garage</li>
                      <li>• Electric vehicle charging stations</li>
                      <li>• Luxury car rental available</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Transport</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Metro Station: 2 blocks away</li>
                      <li>• Bus stops nearby</li>
                      <li>• Walking distance to major attractions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}