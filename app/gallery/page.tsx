'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryCategories = [
    { id: 'all', name: 'All Photos', count: 48 },
    { id: 'exterior', name: 'Exterior & Grounds', count: 12 },
    { id: 'rooms', name: 'Rooms & Suites', count: 15 },
    { id: 'amenities', name: 'Amenities & Facilities', count: 10 },
    { id: 'dining', name: 'Dining & Events', count: 8 },
    { id: 'seasonal', name: 'Seasonal Views', count: 3 }
  ];

  const galleryImages = [
    // Exterior & Grounds
    {
      id: 1,
      src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'exterior',
      title: 'Grand Hotel Entrance',
      caption: 'Majestic entrance with marble columns and luxury landscaping',
      location: 'Main Entrance',
      season: 'Spring'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'exterior',
      title: 'Hotel Facade at Sunset',
      caption: 'Golden hour illuminating our architectural masterpiece',
      location: 'Front Facade',
      season: 'Summer'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      category: 'exterior',
      title: 'Rooftop Garden Terrace',
      caption: 'Panoramic city views from our exclusive rooftop garden',
      location: 'Rooftop Level',
      season: 'Summer'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'exterior',
      title: 'Infinity Pool Deck',
      caption: 'Stunning infinity pool with city skyline backdrop',
      location: 'Pool Deck',
      season: 'Summer'
    },

    // Rooms & Suites
    {
      id: 5,
      src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'rooms',
      title: 'Presidential Suite Living Room',
      caption: 'Opulent living space with panoramic windows and luxury furnishings',
      location: 'Presidential Suite',
      season: 'All Year'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'rooms',
      title: 'Deluxe Ocean View Bedroom',
      caption: 'Serene bedroom with breathtaking ocean views and premium linens',
      location: 'Ocean View Suite',
      season: 'All Year'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'rooms',
      title: 'Marble Bathroom Sanctuary',
      caption: 'Spa-inspired bathroom with marble finishes and soaking tub',
      location: 'Executive Suite',
      season: 'All Year'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      category: 'rooms',
      title: 'Garden Villa Terrace',
      caption: 'Private terrace overlooking manicured gardens',
      location: 'Garden Villa',
      season: 'Spring'
    },

    // Amenities & Facilities
    {
      id: 9,
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'amenities',
      title: 'Luxury Spa Treatment Room',
      caption: 'Tranquil spa environment for ultimate relaxation',
      location: 'Spa Level',
      season: 'All Year'
    },
    {
      id: 10,
      src: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'amenities',
      title: 'State-of-the-Art Fitness Center',
      caption: 'Premium equipment with floor-to-ceiling windows',
      location: 'Fitness Center',
      season: 'All Year'
    },
    {
      id: 11,
      src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      category: 'amenities',
      title: 'Business Center Lounge',
      caption: 'Modern workspace with premium technology and city views',
      location: 'Business Center',
      season: 'All Year'
    },

    // Dining & Events
    {
      id: 12,
      src: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'dining',
      title: 'Michelin-Starred Restaurant',
      caption: 'Elegant dining room with award-winning cuisine',
      location: 'Main Restaurant',
      season: 'All Year'
    },
    {
      id: 13,
      src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'dining',
      title: 'Rooftop Bar & Lounge',
      caption: 'Sophisticated cocktails with panoramic city views',
      location: 'Rooftop Bar',
      season: 'Evening'
    },
    {
      id: 14,
      src: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'dining',
      title: 'Grand Ballroom',
      caption: 'Opulent venue for weddings and special events',
      location: 'Grand Ballroom',
      season: 'All Year'
    },

    // Seasonal Views
    {
      id: 15,
      src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'seasonal',
      title: 'Winter Wonderland',
      caption: 'Hotel grounds transformed by pristine snowfall',
      location: 'Garden Courtyard',
      season: 'Winter'
    },
    {
      id: 16,
      src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'seasonal',
      title: 'Spring Garden Bloom',
      caption: 'Vibrant flowers and lush greenery in full bloom',
      location: 'Hotel Gardens',
      season: 'Spring'
    },
    {
      id: 17,
      src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'seasonal',
      title: 'Autumn Foliage Views',
      caption: 'Golden autumn colors framing the hotel exterior',
      location: 'Main Entrance',
      season: 'Autumn'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage)
    : null;

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
            Visual <span className="text-yellow-600">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover the beauty and elegance of LuxeHaven through our curated collection
          </p>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  <Camera className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">48+</div>
                <div className="text-gray-600">Professional Photos</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600">Unique Locations</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
                <div className="text-gray-600">Seasonal Collections</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <Eye className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">HD</div>
                <div className="text-gray-600">Quality Images</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'border-yellow-600 text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => openLightbox(image.id)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <Eye className="h-6 w-6 text-gray-900" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                    <div className="flex items-center text-white/80 text-xs space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{image.location}</span>
                      <span>•</span>
                      <span>{image.season}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative max-w-full max-h-full">
              <img
                src={selectedImageData.src}
                alt={selectedImageData.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-2xl font-bold mb-2">{selectedImageData.title}</h2>
                <p className="text-white/90 mb-3">{selectedImageData.caption}</p>
                <div className="flex items-center text-white/70 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedImageData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{selectedImageData.season}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}