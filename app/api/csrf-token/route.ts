import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In a production environment, you should store CSRF tokens in a secure session store
// This is a simplified implementation for demonstration purposes
const csrfTokens = new Set<string>();

export async function GET(request: NextRequest) {
  try {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store the token (in production, use a proper session store)
    csrfTokens.add(token);
    
    // Clean up old tokens (implement proper cleanup in production)
    if (csrfTokens.size > 1000) {
      const tokensArray = Array.from(csrfTokens);
      csrfTokens.clear();
      // Keep only the last 100 tokens
      tokensArray.slice(-100).forEach(t => csrfTokens.add(t));
    }
    
    return NextResponse.json({
      token,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('CSRF token generation error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// Utility function to validate CSRF token (use this in your booking API)
export function validateCSRFToken(token: string): boolean {
  return csrfTokens.has(token);
}