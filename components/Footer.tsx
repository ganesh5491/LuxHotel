'use client';

import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Dining', href: '#dining' },
    { name: 'Spa & Wellness', href: '#spa' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cancellation Policy', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Sitemap', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-yellow-600">Luxe</span>Haven
            </h3>
            <p className="text-gray-300 mb-6">
              Experience unparalleled luxury and service in the heart of the city. 
              Where every moment is crafted to perfection.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="text-gray-300">+91 1234567890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="text-gray-300">hello@luxehaven.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="text-gray-300">123 Luxury Boulevard, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <a
                    href={policy.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Follow us for the latest updates and exclusive offers.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear}{' '}
              <a 
                href="https://www.cybaemtech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                CybaemTech
              </a>
              . All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">🏆 5-Star Rated</span>
              <span className="text-gray-400 text-sm">⭐ TripAdvisor Excellence</span>
              <span className="text-gray-400 text-sm">🌟 AAA Five Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}