'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  preferredTime: string;
  serviceType: string;
  numberOfGuests: number;
  specialRequests: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface BookingFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function BookingForm({ onClose, isModal = false }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    preferredTime: '',
    serviceType: '',
    numberOfGuests: 1,
    specialRequests: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Service types available for booking
  const serviceTypes = [
    { value: 'accommodation', label: 'Hotel Accommodation' },
    { value: 'spa', label: 'Spa & Wellness Services' },
    { value: 'dining', label: 'Fine Dining Experience' },
    { value: 'events', label: 'Events & Meetings' },
    { value: 'wedding', label: 'Wedding Services' },
    { value: 'concierge', label: 'Concierge Services' }
  ];

  // Time slots for preferred arrival/service time
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  // Initialize CSRF token on component mount
  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const fetchCSRFToken = async () => {
    try {
      const response = await fetch('/api/csrf-token');
      const data = await response.json();
      setCsrfToken(data.token);
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };

  // Real-time validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
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
    } else if (!validateDate(formData.checkInDate)) {
      newErrors.checkInDate = 'Check-in date cannot be in the past';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    } else if (!validateDate(formData.checkOutDate)) {
      newErrors.checkOutDate = 'Check-out date cannot be in the past';
    }

    // Date range validation
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (formData.numberOfGuests < 1 || formData.numberOfGuests > 20) {
      newErrors.numberOfGuests = 'Number of guests must be between 1 and 20';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation for specific fields
    if (field === 'email' && typeof value === 'string' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'phone' && typeof value === 'string' && value) {
      if (!validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      }
    }
  };

  const sanitizeInput = (input: string): string => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/[<>]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage('Please correct the errors above and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sanitize form data
      const sanitizedData = {
        ...formData,
        fullName: sanitizeInput(formData.fullName),
        specialRequests: sanitizeInput(formData.specialRequests)
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Booking confirmed! Your booking ID is ${result.bookingId}. We'll send a confirmation email shortly.`);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            checkInDate: '',
            checkOutDate: '',
            preferredTime: '',
            serviceType: '',
            numberOfGuests: 1,
            specialRequests: '',
            agreeToTerms: false
          });
          if (onClose) onClose();
        }, 3000);
      } else {
        throw new Error(result.message || 'Booking submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3" role="alert">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800">Booking Successful!</h3>
            <p className="text-green-700 text-sm mt-1">{submitMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3" role="alert">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800">Submission Error</h3>
            <p className="text-red-700 text-sm mt-1">{submitMessage}</p>
          </div>
        </div>
      )}

      {/* Customer Details Section */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-yellow-600" />
          Customer Details
        </legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`mt-1 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              placeholder="Enter your full name"
              required
              aria-required="true"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              autoComplete="name"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`mt-1 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              placeholder="your.email@example.com"
              required
              aria-required="true"
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`mt-1 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              placeholder="+1 (555) 123-4567"
              required
              aria-required="true"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="numberOfGuests" className="text-sm font-medium text-gray-700">
              Number of Guests <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="numberOfGuests"
              type="number"
              min="1"
              max="20"
              value={formData.numberOfGuests}
              onChange={(e) => handleInputChange('numberOfGuests', parseInt(e.target.value) || 1)}
              className={`mt-1 ${errors.numberOfGuests ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              required
              aria-required="true"
              aria-describedby={errors.numberOfGuests ? 'numberOfGuests-error' : undefined}
            />
            {errors.numberOfGuests && (
              <p id="numberOfGuests-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.numberOfGuests}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Booking Details Section */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-yellow-600" />
          Booking Details
        </legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkInDate" className="text-sm font-medium text-gray-700">
              Check-in Date <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="checkInDate"
              type="date"
              value={formData.checkInDate}
              onChange={(e) => handleInputChange('checkInDate', e.target.value)}
              className={`mt-1 ${errors.checkInDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              min={new Date().toISOString().split('T')[0]}
              required
              aria-required="true"
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
              Check-out Date <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="checkOutDate"
              type="date"
              value={formData.checkOutDate}
              onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
              className={`mt-1 ${errors.checkOutDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'}`}
              min={formData.checkInDate || new Date().toISOString().split('T')[0]}
              required
              aria-required="true"
              aria-describedby={errors.checkOutDate ? 'checkOutDate-error' : undefined}
            />
            {errors.checkOutDate && (
              <p id="checkOutDate-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.checkOutDate}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">
              Preferred Arrival Time
            </Label>
            <select
              id="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="">Select preferred time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
              Service Type <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <select
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value)}
              className={`mt-1 w-full p-2 border rounded-md focus:ring-yellow-500 ${
                errors.serviceType ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'
              }`}
              required
              aria-required="true"
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
        </div>
      </fieldset>

      {/* Special Requests Section */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-yellow-600" />
          Special Requests
        </legend>
        
        <div>
          <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
            Additional Notes or Special Requests
          </Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={4}
            className="mt-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="Please let us know about any special requirements, dietary restrictions, accessibility needs, or celebration occasions..."
            maxLength={500}
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.specialRequests.length}/500 characters
          </p>
        </div>
      </fieldset>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <input
          id="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="mt-1 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
          required
          aria-required="true"
          aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
        />
        <div>
          <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
            I agree to the <a href="/terms" className="text-yellow-600 hover:text-yellow-700 underline">Terms and Conditions</a> and <a href="/privacy" className=\"text-yellow-600 hover:text-yellow-700 underline">Privacy Policy</a> <span className=\"text-red-500" aria-label=\"required">*</span>
          </Label>
          {errors.agreeToTerms && (
            <p id="agreeToTerms-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.agreeToTerms}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        {isModal && (
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || submitStatus === 'success'}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing Booking...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Booking Confirmed
            </>
          ) : (
            'Submit Booking Request'
          )}
        </Button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                  Book Your Luxury Experience
                </CardTitle>
                <p className="text-yellow-100">Complete the form below to reserve your stay</p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                  aria-label="Close booking form"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <FormContent />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
          Book Your Luxury Experience
        </CardTitle>
        <p className="text-yellow-100">Complete the form below to reserve your stay</p>
      </CardHeader>
      <CardContent className="p-6">
        <FormContent />
      </CardContent>
    </Card>
  );
}