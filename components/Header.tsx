'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/BookingModal';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href;
  };
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-yellow-600`}>
                <span className="text-yellow-600">Lux</span>Haven
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActiveLink(item.href)
                    ? isScrolled
                      ? 'text-yellow-600 bg-yellow-50 font-semibold'
                      : 'text-yellow-400 bg-white/10 font-semibold backdrop-blur-sm'
                    : isScrolled
                      ? 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                      : 'text-white/90 hover:text-yellow-400 hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Active indicator line */}
                {isActiveLink(item.href) && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'
                  }`} />
                )}
                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-6 ${
                  isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'
                } ${isActiveLink(item.href) ? 'opacity-0' : 'opacity-100'}`} />
              </Link>
            ))}
          </nav>

          {/* Contact Info & Book Now */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className={`flex items-center space-x-4 text-sm ${
              isScrolled ? 'text-gray-600' : 'text-white/80'
            }`}>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>hello@luxehaven.com</span>
              </div>
            </div>
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg border border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                    isActiveLink(item.href)
                      ? 'text-yellow-600 bg-yellow-50 font-semibold border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {/* Mobile active indicator */}
                  {isActiveLink(item.href) && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-600 rounded-full" />
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-300 transform hover:scale-105"
                >
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </header>
  );
}