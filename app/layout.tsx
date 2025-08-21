import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuxeHaven - Luxury Hotel & Resort',
  description: 'Experience unparalleled luxury and service at LuxeHaven. Premium accommodations, world-class amenities, and exceptional hospitality in the heart of the city.',
  keywords: 'luxury hotel, premium accommodation, five-star hotel, resort, spa, fine dining, business hotel',
  authors: [{ name: 'LuxeHaven' }],
  creator: 'LuxeHaven',
  publisher: 'LuxeHaven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://luxehaven.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luxehaven.com',
    siteName: 'LuxeHaven',
    title: 'LuxeHaven - Luxury Hotel & Resort',
    description: 'Experience unparalleled luxury and service at LuxeHaven. Premium accommodations, world-class amenities, and exceptional hospitality.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LuxeHaven Luxury Hotel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxeHaven - Luxury Hotel & Resort',
    description: 'Experience unparalleled luxury and service at LuxeHaven.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}