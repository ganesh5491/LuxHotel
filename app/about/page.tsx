'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { About } from '@/components/About';
import { Award, Heart, Users, Globe, Star, Trophy, Crown, Diamond } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const milestones = [
    {
      year: '1998',
      title: 'Grand Opening',
      description: 'LuxeHaven opened its doors as the city\'s premier luxury destination'
    },
    {
      year: '2003',
      title: 'First Michelin Star',
      description: 'Our restaurant received its first Michelin star for culinary excellence'
    },
    {
      year: '2008',
      title: 'Spa Excellence Award',
      description: 'Recognized as the world\'s best hotel spa by International Spa Association'
    },
    {
      year: '2015',
      title: 'Sustainability Leader',
      description: 'Achieved carbon neutrality and became a leader in sustainable luxury'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched cutting-edge contactless services and smart room technology'
    },
    {
      year: '2024',
      title: '25 Years of Excellence',
      description: 'Celebrating a quarter-century of unparalleled luxury and service'
    }
  ];

  const leadership = [
    {
      name: 'Alexandra Sterling',
      position: 'General Manager',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'With over 20 years in luxury hospitality, Alexandra brings unparalleled expertise in creating exceptional guest experiences.',
      credentials: ['MBA Hospitality Management', 'Certified Hotel Administrator', 'Luxury Hotel Association Board Member']
    },
    {
      name: 'Chef Marcus Beaumont',
      position: 'Executive Chef',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Michelin-starred chef with a passion for innovative cuisine and locally-sourced ingredients.',
      credentials: ['Michelin Star Chef', 'James Beard Award Winner', 'Culinary Institute Graduate']
    },
    {
      name: 'Isabella Rodriguez',
      position: 'Director of Guest Services',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Dedicated to ensuring every guest receives personalized attention and exceptional service.',
      credentials: ['Hospitality Excellence Certification', '15+ Years Guest Services', 'Multilingual Specialist']
    }
  ];

  const awards = [
    {
      icon: Trophy,
      title: 'World\'s Best Luxury Hotel',
      organization: 'Travel + Leisure',
      year: '2024',
      color: 'text-yellow-600'
    },
    {
      icon: Star,
      title: 'Five-Star Rating',
      organization: 'Forbes Travel Guide',
      year: '2024',
      color: 'text-blue-600'
    },
    {
      icon: Crown,
      title: 'Readers\' Choice Award',
      organization: 'Condé Nast Traveler',
      year: '2024',
      color: 'text-purple-600'
    },
    {
      icon: Diamond,
      title: 'AAA Five Diamond',
      organization: 'American Automobile Association',
      year: '2024',
      color: 'text-green-600'
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
            Our <span className="text-yellow-600">Story</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            25 years of creating unforgettable luxury experiences
          </p>
        </div>
      </section>

      {/* About Component */}
      <About />

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our pursuit of hospitality excellence
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-600"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-yellow-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the exceptional leaders who make LuxeHaven a world-class destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <div className="text-yellow-600 font-medium mb-4">{leader.position}</div>
                  <p className="text-gray-600 mb-6">{leader.bio}</p>
                  
                  <div className="space-y-2">
                    {leader.credentials.map((credential, i) => (
                      <div key={i} className="flex items-center justify-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                        {credential}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Awards & <span className="text-yellow-600">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by the world's most prestigious organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 ${award.color} mb-4`}>
                    <award.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600 mb-2">{award.organization}</p>
                  <div className="text-sm text-yellow-600 font-medium">{award.year}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for perfection in every detail and interaction</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600">Anticipating and exceeding our guests' every need</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Protecting our environment for future generations</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Continuously evolving to enhance the guest experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}