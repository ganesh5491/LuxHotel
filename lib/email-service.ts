// Email Service for Booking Confirmations
// This is a TypeScript implementation using Nodemailer
// Adapt this to your preferred email service (SendGrid, AWS SES, etc.)

import nodemailer from 'nodemailer';

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
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransporter(config);
  }

  async sendBookingConfirmation(bookingData: BookingData, bookingId: string): Promise<void> {
    const emailTemplate = this.generateBookingConfirmationTemplate(bookingData, bookingId);
    
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || 'noreply@luxehaven.com',
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingId} | LuxeHaven`,
      html: emailTemplate,
      text: this.generatePlainTextConfirmation(bookingData, bookingId)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${bookingData.email}`);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw new Error('Email delivery failed');
    }
  }

  async sendBookingNotificationToAdmin(bookingData: BookingData, bookingId: string): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxehaven.com';
    const notificationTemplate = this.generateAdminNotificationTemplate(bookingData, bookingId);
    
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || 'noreply@luxehaven.com',
      to: adminEmail,
      subject: `New Booking Received - ${bookingId}`,
      html: notificationTemplate,
      text: this.generatePlainTextAdminNotification(bookingData, bookingId)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Admin notification sent for booking ${bookingId}`);
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      // Don't throw error for admin notifications to avoid blocking user confirmation
    }
  }

  private generateBookingConfirmationTemplate(bookingData: BookingData, bookingId: string): string {
    const serviceTypeLabels: { [key: string]: string } = {
      'accommodation': 'Hotel Accommodation',
      'spa': 'Spa & Wellness Services',
      'dining': 'Fine Dining Experience',
      'events': 'Events & Meetings',
      'wedding': 'Wedding Services',
      'concierge': 'Concierge Services'
    };

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #333; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 14px; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .logo { font-size: 28px; font-weight: bold; }
            .highlight { color: #d97706; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">LuxeHaven</div>
                <h1>Booking Confirmation</h1>
                <p>Thank you for choosing LuxeHaven for your luxury experience</p>
            </div>
            
            <div class="content">
                <h2>Dear ${bookingData.fullName},</h2>
                <p>We're delighted to confirm your booking with LuxeHaven. Your reservation has been successfully processed and our team is preparing to provide you with an exceptional experience.</p>
                
                <div class="booking-details">
                    <h3>Booking Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Booking ID:</span>
                        <span class="detail-value highlight">${bookingId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Service Type:</span>
                        <span class="detail-value">${serviceTypeLabels[bookingData.serviceType] || bookingData.serviceType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-in Date:</span>
                        <span class="detail-value">${new Date(bookingData.checkInDate).toLocaleDateString()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-out Date:</span>
                        <span class="detail-value">${new Date(bookingData.checkOutDate).toLocaleDateString()}</span>
                    </div>
                    ${bookingData.preferredTime ? `
                    <div class="detail-row">
                        <span class="detail-label">Preferred Time:</span>
                        <span class="detail-value">${bookingData.preferredTime}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Number of Guests:</span>
                        <span class="detail-value">${bookingData.numberOfGuests}</span>
                    </div>
                    ${bookingData.specialRequests ? `
                    <div class="detail-row">
                        <span class="detail-label">Special Requests:</span>
                        <span class="detail-value">${bookingData.specialRequests}</span>
                    </div>
                    ` : ''}
                </div>
                
                <h3>What's Next?</h3>
                <ul>
                    <li>Our concierge team will contact you within 24 hours to confirm final details</li>
                    <li>You'll receive a detailed itinerary 48 hours before your arrival</li>
                    <li>For any changes or questions, please contact us using your booking ID</li>
                </ul>
                
                <div style="text-align: center;">
                    <a href="mailto:concierge@luxehaven.com" class="button">Contact Concierge</a>
                </div>
                
                <p><strong>Important Information:</strong></p>
                <ul>
                    <li>Please arrive 15 minutes before your scheduled time</li>
                    <li>Bring a valid ID for check-in</li>
                    <li>Cancellations must be made 48 hours in advance</li>
                </ul>
            </div>
            
            <div class="footer">
                <p><strong>LuxeHaven Luxury Hotel & Resort</strong></p>
                <p>123 Luxury Boulevard, Downtown District, NY 10001</p>
                <p>Phone: +1 (555) 123-4567 | Email: hello@luxehaven.com</p>
                <p>© 2024 LuxeHaven. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private generatePlainTextConfirmation(bookingData: BookingData, bookingId: string): string {
    return `
BOOKING CONFIRMATION - LUXEHAVEN

Dear ${bookingData.fullName},

Thank you for choosing LuxeHaven for your luxury experience. Your booking has been confirmed.

BOOKING DETAILS:
- Booking ID: ${bookingId}
- Service Type: ${bookingData.serviceType}
- Check-in Date: ${new Date(bookingData.checkInDate).toLocaleDateString()}
- Check-out Date: ${new Date(bookingData.checkOutDate).toLocaleDateString()}
- Preferred Time: ${bookingData.preferredTime || 'Not specified'}
- Number of Guests: ${bookingData.numberOfGuests}
- Special Requests: ${bookingData.specialRequests || 'None'}

WHAT'S NEXT:
- Our concierge team will contact you within 24 hours
- You'll receive a detailed itinerary 48 hours before arrival
- For changes or questions, contact us with your booking ID

CONTACT INFORMATION:
LuxeHaven Luxury Hotel & Resort
123 Luxury Boulevard, Downtown District, NY 10001
Phone: +1 (555) 123-4567
Email: hello@luxehaven.com

Thank you for choosing LuxeHaven!
    `;
  }

  private generateAdminNotificationTemplate(bookingData: BookingData, bookingId: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #333; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .booking-info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #d97706; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Booking Received</h2>
            </div>
            <div class="content">
                <div class="booking-info">
                    <h3>Booking ID: ${bookingId}</h3>
                    <p><strong>Customer:</strong> ${bookingData.fullName}</p>
                    <p><strong>Email:</strong> ${bookingData.email}</p>
                    <p><strong>Phone:</strong> ${bookingData.phone}</p>
                    <p><strong>Service:</strong> ${bookingData.serviceType}</p>
                    <p><strong>Dates:</strong> ${bookingData.checkInDate} to ${bookingData.checkOutDate}</p>
                    <p><strong>Guests:</strong> ${bookingData.numberOfGuests}</p>
                    ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
                </div>
                <p><strong>Action Required:</strong> Please follow up with the customer within 24 hours to confirm booking details.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private generatePlainTextAdminNotification(bookingData: BookingData, bookingId: string): string {
    return `
NEW BOOKING RECEIVED

Booking ID: ${bookingId}
Customer: ${bookingData.fullName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Service: ${bookingData.serviceType}
Dates: ${bookingData.checkInDate} to ${bookingData.checkOutDate}
Guests: ${bookingData.numberOfGuests}
Special Requests: ${bookingData.specialRequests || 'None'}

Action Required: Follow up with customer within 24 hours.
    `;
  }
}

// Export configured email service
export const emailService = new EmailService({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

export default EmailService;