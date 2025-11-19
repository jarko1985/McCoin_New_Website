import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import {
  twoFactorVerifyLoginSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(
      req,
      'twoFactorVerifyLogin',
      rateLimitConfigs.twoFactorVerifyLogin
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(twoFactorVerifyLoginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'validation_error',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { email, password, token } = validation.data;

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

    // Check if email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error: 'email_not_verified',
          message: 'Please verify your email before signing in.',
        },
        { status: 403 },
      );
    }

    // Check if 2FA is enabled
    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json(
        {
          error: '2fa_not_enabled',
          message: '2FA is not enabled for this account',
        },
        { status: 400 },
      );
    }

    // Verify 2FA token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2,
    });

    if (!verified) {
      return NextResponse.json(
        {
          error: 'invalid_2fa_token',
          message: 'Invalid 2FA token',
        },
        { status: 401 },
      );
    }

    // All checks passed
    return NextResponse.json({
      success: true,
      message: 'Login successful',
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
