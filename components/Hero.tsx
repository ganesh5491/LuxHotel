'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/BookingModal';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const slides = [
    {
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Luxury Redefined',
      subtitle: 'Experience unparalleled comfort in the heart of the city'
    },
    {
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Elegance Awaits',
      subtitle: 'Where sophistication meets modern luxury'
    },
    {
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Unforgettable Moments',
      subtitle: 'Create memories that last a lifetime'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Awards Bar */}
            <div className="flex items-center justify-center space-x-8 mb-8 animate-fade-in">
              <div className="flex items-center text-yellow-400">
                <Award className="h-5 w-5 mr-2" />
                <span className="text-sm text-white">5-Star Luxury</span>
              </div>
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 mr-2" />
                <span className="text-sm text-white">TripAdvisor Excellence</span>
              </div>
              <div className="flex items-center text-yellow-400">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-sm text-white">10,000+ Happy Guests</span>
              </div>
            </div>

            {/* Main Content */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up-delay">
              {slides[currentSlide].subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2">
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Book Your Stay
              </Button>
              <Button
                variant="outline"
                className="bg-yellow-600 hover:bg-yellow-700 text-white border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToBooking}
          className="flex flex-col items-center text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <span className="text-sm mb-2">Discover More</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
}