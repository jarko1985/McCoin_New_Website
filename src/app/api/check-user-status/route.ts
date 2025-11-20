import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  loginSchema,
  internalLoginSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(req, 'login', rateLimitConfigs.login);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();

    // Check if this is an internal call (from NextAuth authorize callback)
    // Internal calls have a special header or no recaptchaToken
    const isInternalCall = !body.recaptchaToken || req.headers.get('x-internal-call') === 'true';

    // Validate and sanitize input
    const validation = isInternalCall
      ? validateAndSanitize(internalLoginSchema, body)
      : validateAndSanitize(loginSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'validation_error',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { email, password, recaptchaToken } = validation.data as {
      email: string;
      password: string;
      recaptchaToken?: string;
    };

    // Verify reCAPTCHA token only for external calls (skip in development)
    if (!isInternalCall) {
      if (process.env.NODE_ENV === 'development') {
        // In development, skip reCAPTCHA verification
        // No need to check token
      } else {
        // In production, reCAPTCHA is required
        if (recaptchaToken) {
          const recaptchaVerification = await verifyRecaptcha(recaptchaToken);
          if (!recaptchaVerification.success) {
            return NextResponse.json(
              {
                error: 'recaptcha_verification_failed',
                message: recaptchaVerification.error || 'reCAPTCHA verification failed',
              },
              { status: 400 },
            );
          }
        } else {
          // External calls must have reCAPTCHA token in production
          return NextResponse.json(
            {
              error: 'recaptcha_verification_failed',
              message: 'reCAPTCHA verification is required',
            },
            { status: 400 },
          );
        }
      }
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.password) {
      return NextResponse.json(
        {
          error: 'invalid_credentials',
          message: 'Invalid email or password',
        },
        { status: 401 },
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: 'invalid_credentials',
          message: 'Invalid email or password',
        },
        { status: 401 },
      );
    }

    // If we get here, credentials are correct but check if email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error: 'email_not_verified',
          message:
            'Please verify your email before signing in. Check your inbox for the verification link.',
        },
        { status: 403 },
      );
    }

    // User exists, password is correct, and email is verified
    return NextResponse.json({
      success: true,
      message: 'User is verified and ready to login',
      needs2FA: user.twoFactorEnabled || false,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'server_error',
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
