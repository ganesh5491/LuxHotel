import { randomBytes } from 'crypto';

const csrfTokens = new Set<string>();

export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  csrfTokens.add(token);

  // Clean up old tokens (basic implementation)
  if (csrfTokens.size > 1000) {
    const tokensArray = Array.from(csrfTokens);
    csrfTokens.clear();
    tokensArray.slice(-100).forEach(t => csrfTokens.add(t));
  }

  return token;
}

export function validateCSRFToken(token: string): boolean {
  return csrfTokens.has(token);
}
