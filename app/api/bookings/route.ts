import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { csrfToken } = body;

  if (!validateCSRFToken(csrfToken)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  // ✅ Continue with booking logic...
  return NextResponse.json({ success: true });
}
