import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limit configuration for different endpoints
 */
export interface RateLimitConfig {
  maxRequests: number; // Maximum number of requests
  windowMs: number; // Time window in milliseconds
  identifier?: string; // Optional identifier (e.g., email) for per-user rate limiting
}

/**
 * In-memory rate limit store
 * In production, consider using Redis for distributed rate limiting
 */
class RateLimitStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (value.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  get(key: string): { count: number; resetTime: number } | undefined {
    return this.store.get(key);
  }

  set(key: string, count: number, resetTime: number) {
    this.store.set(key, { count, resetTime });
  }

  increment(key: string, windowMs: number): number {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || entry.resetTime < now) {
      // New window or expired entry
      this.store.set(key, { count: 1, resetTime: now + windowMs });
      return 1;
    }

    // Increment existing entry
    entry.count++;
    this.store.set(key, entry);
    return entry.count;
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Global rate limit store instance
const rateLimitStore = new RateLimitStore();

/**
 * Get client IP address from request
 */
export function getClientIp(request: NextRequest): string {
  // Check x-forwarded-for header (first IP in the chain)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim());
    return ips[0] || 'unknown';
  }

  // Check x-real-ip header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Fallback to connection remote address (if available)
  return 'unknown';
}

/**
 * Create a rate limit key from IP and optional identifier
 */
function createRateLimitKey(ip: string, endpoint: string, identifier?: string): string {
  if (identifier) {
    return `${endpoint}:${ip}:${identifier}`;
  }
  return `${endpoint}:${ip}`;
}

/**
 * Rate limit middleware
 * Returns null if request is allowed, or a NextResponse with 429 status if rate limited
 * 
 * @param request - Next.js request object
 * @param endpoint - Endpoint identifier (e.g., 'login', 'signup')
 * @param config - Rate limit configuration
 * @param identifierValue - Optional identifier value (e.g., email) for per-user rate limiting
 */
export async function rateLimit(
  request: NextRequest,
  endpoint: string,
  config: RateLimitConfig,
  identifierValue?: string
): Promise<NextResponse | null> {
  const ip = getClientIp(request);
  
  // Use provided identifier value or IP
  const identifier = config.identifier && identifierValue 
    ? identifierValue 
    : undefined;

  const key = createRateLimitKey(ip, endpoint, identifier);
  const count = rateLimitStore.increment(key, config.windowMs);
  const entry = rateLimitStore.get(key);

  if (count > config.maxRequests && entry) {
    const retryAfter = Math.ceil((entry.resetTime - Date.now()) / 1000);
    
    return NextResponse.json(
      {
        error: 'rate_limit_exceeded',
        message: `Too many requests. Please try again in ${retryAfter} seconds.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
        },
      }
    );
  }

  // Request is allowed - return null
  return null;
}

/**
 * Predefined rate limit configurations for auth endpoints
 */
export const rateLimitConfigs = {
  // Login: 5 attempts per 15 minutes per IP
  login: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  } as RateLimitConfig,

  // Signup: 3 attempts per hour per IP
  signup: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  } as RateLimitConfig,

  // Password reset request: 3 attempts per hour per email
  forgotPassword: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    identifier: 'email', // Rate limit per email address
  } as RateLimitConfig,

  // Password reset completion: 5 attempts per hour per IP
  resetPassword: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  } as RateLimitConfig,

  // Email verification: 5 attempts per hour per email
  verifyEmail: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
    identifier: 'email',
  } as RateLimitConfig,

  // 2FA verification: 5 attempts per 15 minutes per IP
  twoFactorVerify: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  } as RateLimitConfig,

  // 2FA login verification: 5 attempts per 15 minutes per IP
  twoFactorVerifyLogin: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  } as RateLimitConfig,

  // 2FA setup: 3 attempts per hour per IP
  twoFactorSetup: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  } as RateLimitConfig,

  // 2FA disable: 3 attempts per hour per IP
  twoFactorDisable: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  } as RateLimitConfig,
};

