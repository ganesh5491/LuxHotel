import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { generateCSRFToken } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  try {
    const token = generateCSRFToken();

    return NextResponse.json({
      token,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
