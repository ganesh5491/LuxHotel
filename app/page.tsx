'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { BookingWidget } from '@/components/BookingWidget';
import { RoomShowcase } from '@/components/RoomShowcase';
import { Amenities } from '@/components/Amenities';
import { Testimonials } from '@/components/Testimonials';
import { About } from '@/components/About';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <Hero />
        <BookingWidget />
        <RoomShowcase />
        <Amenities />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}