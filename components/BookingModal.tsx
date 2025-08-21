'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
  checkInDate: string;
  checkOutDate: string;
  timeSlot: string;
  serviceType: string;
  guests: string;
  specialRequests: string;
}

interface FormErrors {
  [key: string]: string;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    checkInDate: '',
    checkOutDate: '',
    timeSlot: '',
    serviceType: '',
    guests: '2',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const serviceTypes = [
    { value: 'accommodation', label: 'Hotel Accommodation' },
    { value: 'spa', label: 'Spa & Wellness' },
    { value: 'dining', label: 'Fine Dining Experience' },
    { value: 'events', label: 'Events & Meetings' },
    { value: 'wedding', label: 'Wedding Services' },
    { value: 'concierge', label: 'Concierge Services' }
  ];

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'sms', label: 'Text Message' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  // Close modal on escape key and handle scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Lock body scroll and save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (isOpen) {
        // Restore scroll position when modal closes
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        contactMethod: 'email',
        checkInDate: '',
        checkOutDate: '',
        timeSlot: '',
        serviceType: '',
        guests: '2',
        specialRequests: ''
      });
      setErrors({});
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    // Date validation
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkIn < today) {
        newErrors.checkInDate = 'Check-in date cannot be in the past';
      }

      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setSubmitStatus('success');
        setSubmitMessage('Your booking request has been submitted successfully! We will contact you within 24 hours to confirm your reservation.');

        // Auto-close after success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error('Booking submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 flex flex-col mx-auto my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Book Your Luxury Experience</h2>
              <p className="text-yellow-100">Complete the form below to reserve your stay</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="Close booking form"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <CardContent className="p-6">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-800">Booking Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">{submitMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Submission Error</h3>
                    <p className="text-red-700 text-sm mt-1">{submitMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Details Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-yellow-600" />
                    Customer Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`mt-1 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
                        placeholder="Enter your full name"
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`mt-1 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
                        placeholder="your.email@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`mt-1 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
                        placeholder="+1 (555) 123-4567"
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contactMethod" className="text-sm font-medium text-gray-700">
                        Preferred Contact Method
                      </Label>
                      <select
                        id="contactMethod"
                        value={formData.contactMethod}
                        onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                      >
                        {contactMethods.map((method) => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Booking Details Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-yellow-600" />
                    Booking Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="checkInDate" className="text-sm font-medium text-gray-700">
                        Check-in Date *
                      </Label>
                      <Input
                        id="checkInDate"
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                        className={`mt-1 ${errors.checkInDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
                        min={new Date().toISOString().split('T')[0]}
                        aria-describedby={errors.checkInDate ? 'checkInDate-error' : undefined}
                      />
                      {errors.checkInDate && (
                        <p id="checkInDate-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.checkInDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="checkOutDate" className="text-sm font-medium text-gray-700">
                        Check-out Date *
                      </Label>
                      <Input
                        id="checkOutDate"
                        type="date"
                        value={formData.checkOutDate}
                        onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
                        className={`mt-1 ${errors.checkOutDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
                        min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                        aria-describedby={errors.checkOutDate ? 'checkOutDate-error' : undefined}
                      />
                      {errors.checkOutDate && (
                        <p id="checkOutDate-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.checkOutDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="timeSlot" className="text-sm font-medium text-gray-700">
                        Preferred Arrival Time
                      </Label>
                      <select
                        id="timeSlot"
                        value={formData.timeSlot}
                        onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                      >
                        <option value="">Select preferred time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
                        Service Type *
                      </Label>
                      <select
                        id="serviceType"
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className={`mt-1 w-full p-2 border rounded-md focus:ring-yellow-500 ${
                          errors.serviceType ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'
                        }`}
                        aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p id="serviceType-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.serviceType}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guests" className="text-sm font-medium text-gray-700">
                        Number of Guests
                      </Label>
                      <select
                        id="guests"
                        value={formData.guests}
                        onChange={(e) => handleInputChange('guests', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value="10+">10+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-yellow-600" />
                    Special Requests
                  </h3>

                  <div>
                    <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
                      Additional Notes or Special Requests
                    </Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                      className="mt-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="Please let us know about any special requirements, dietary restrictions, accessibility needs, or celebration occasions..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    disabled={isSubmitting || submitStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submitted Successfully
                      </>
                    ) : (
                      'Submit Booking Request'
                    )}
                  </Button>
                </div>
              </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}