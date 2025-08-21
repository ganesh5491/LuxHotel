'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      review: "Absolutely phenomenal experience! The attention to detail is extraordinary. From the moment we arrived, every staff member went above and beyond to ensure our stay was perfect. The suite was breathtaking with stunning ocean views.",
      stayType: 'Honeymoon Suite',
      date: 'December 2023'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      review: "Business travel has never been this luxurious. The business center was impeccable, and the concierge service helped arrange all my meetings seamlessly. I'll definitely be staying here on future trips.",
      stayType: 'Business Trip',
      date: 'January 2024'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      review: "The spa services were divine! The massage was the best I've ever had, and the wellness programs were exactly what I needed. The staff remembered my name and preferences throughout my stay.",
      stayType: 'Wellness Retreat',
      date: 'November 2023'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'London, UK',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      review: "Our family vacation was made magical by the exceptional service. The kids loved the pool, and the adults enjoyed the fine dining. Every detail was perfect, from the welcome amenities to the farewell gifts.",
      stayType: 'Family Vacation',
      date: 'August 2023'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-yellow-600">Guests Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from travelers who have experienced the LuxeHaven difference
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-30"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-yellow-600 opacity-20">
                  <Quote className="h-16 w-16" />
                </div>

                <div className="relative p-12">
                  <div className="text-center mb-8">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Review */}
                    <blockquote className="text-xl md:text-2xl text-gray-800 italic mb-8 leading-relaxed">
                      "{testimonials[currentTestimonial].review}"
                    </blockquote>
                  </div>

                  {/* Guest Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <span className="text-sm text-yellow-600 font-medium">
                          {testimonials[currentTestimonial].stayType}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {testimonials[currentTestimonial].date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">2,500+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">95%</div>
            <div className="text-gray-600">Return Guests</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}