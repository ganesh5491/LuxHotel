import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Database interface (replace with your actual database implementation)
interface BookingData {
  id?: string;
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
  createdAt?: Date;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

// Input sanitization function
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// Email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Date validation
function validateDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && !isNaN(date.getTime());
}

// CSRF token validation (implement your own CSRF protection)
function validateCSRFToken(token: string): boolean {
  // Implement your CSRF token validation logic here
  // This is a simplified example
  return token && token.length > 10;
}

// Database operations (replace with your actual database implementation)
async function saveBooking(bookingData: BookingData): Promise<string> {
  // This is a mock implementation - replace with your actual database code
  const bookingId = crypto.randomUUID();
  
  // Example database save operation
  // await db.bookings.create({
  //   data: {
  //     ...bookingData,
  //     id: bookingId,
  //     createdAt: new Date(),
  //     status: 'pending'
  //   }
  // });
  
  console.log('Saving booking:', { ...bookingData, id: bookingId });
  return bookingId;
}

// Send confirmation email (implement your email service)
async function sendConfirmationEmail(bookingData: BookingData, bookingId: string): Promise<void> {
  // Implement your email sending logic here
  console.log(`Sending confirmation email to ${bookingData.email} for booking ${bookingId}`);
  
  // Example email service integration
  // await emailService.send({
  //   to: bookingData.email,
  //   subject: 'Booking Confirmation - LuxeHaven',
  //   template: 'booking-confirmation',
  //   data: { ...bookingData, bookingId }
  // });
}

export async function POST(request: NextRequest) {
  try {
    // Get request headers
    const headersList = headers();
    const csrfToken = headersList.get('x-csrf-token');
    const contentType = headersList.get('content-type');

    // Validate content type
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Validate CSRF token
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Server-side validation
    const errors: { [key: string]: string } = {};

    // Required field validation
    if (!body.fullName || typeof body.fullName !== 'string' || body.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required and must be at least 2 characters';
    }

    if (!body.email || typeof body.email !== 'string' || !validateEmail(body.email)) {
      errors.email = 'Valid email address is required';
    }

    if (!body.phone || typeof body.phone !== 'string' || !validatePhone(body.phone)) {
      errors.phone = 'Valid phone number is required';
    }

    if (!body.checkInDate || !validateDate(body.checkInDate)) {
      errors.checkInDate = 'Valid check-in date is required';
    }

    if (!body.checkOutDate || !validateDate(body.checkOutDate)) {
      errors.checkOutDate = 'Valid check-out date is required';
    }

    // Date range validation
    if (body.checkInDate && body.checkOutDate) {
      const checkIn = new Date(body.checkInDate);
      const checkOut = new Date(body.checkOutDate);
      if (checkOut <= checkIn) {
        errors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    if (!body.serviceType || typeof body.serviceType !== 'string') {
      errors.serviceType = 'Service type is required';
    }

    if (!body.numberOfGuests || body.numberOfGuests < 1 || body.numberOfGuests > 20) {
      errors.numberOfGuests = 'Number of guests must be between 1 and 20';
    }

    if (!body.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedData: BookingData = {
      fullName: sanitizeInput(body.fullName),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      preferredTime: body.preferredTime || '',
      serviceType: body.serviceType,
      numberOfGuests: parseInt(body.numberOfGuests),
      specialRequests: sanitizeInput(body.specialRequests || ''),
      agreeToTerms: Boolean(body.agreeToTerms)
    };

    // Save booking to database
    const bookingId = await saveBooking(sanitizedData);

    // Send confirmation email
    await sendConfirmationEmail(sanitizedData, bookingId);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId,
      data: {
        ...sanitizedData,
        id: bookingId
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your booking'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    },
  });
}