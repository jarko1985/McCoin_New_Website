/**
 * Google reCAPTCHA Server-Side Verification
 * 
 * This utility verifies reCAPTCHA tokens on the server side
 * to ensure the user has completed the challenge.
 */

interface RecaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token with Google's API
 * @param token - The reCAPTCHA token from the client
 * @param secretKey - The reCAPTCHA secret key (from environment)
 * @returns Promise<boolean> - true if verification succeeds, false otherwise
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  secretKey?: string
): Promise<{ success: boolean; error?: string }> {
  // Check if token is provided
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return {
      success: false,
      error: 'reCAPTCHA token is required',
    };
  }

  // Get secret key from environment or parameter
  const recaptchaSecret = secretKey || process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaSecret) {
    // In development, allow bypass if secret is not set (with warning)
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '⚠️  RECAPTCHA_SECRET_KEY not set. reCAPTCHA verification is disabled in development.'
      );
      return { success: true }; // Allow in development
    }
    return {
      success: false,
      error: 'reCAPTCHA configuration error',
    };
  }

  try {
    // Verify token with Google's reCAPTCHA API
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: token,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to verify reCAPTCHA',
      };
    }

    const data: RecaptchaVerificationResponse = await response.json();

    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      const errorMessage = errorCodes.length > 0
        ? `reCAPTCHA verification failed: ${errorCodes.join(', ')}`
        : 'reCAPTCHA verification failed';

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Verification successful
    return { success: true };
  } catch (error) {
    // Network or parsing error
    return {
      success: false,
      error: 'Error verifying reCAPTCHA token',
    };
  }
}

/**
 * Get client IP address for additional verification (optional)
 * This can be used for additional security checks
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp.trim();
  }
  
  return 'unknown';
}

