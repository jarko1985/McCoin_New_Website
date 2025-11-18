import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import { verify2FALoginSchema, type Verify2FALoginData } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    
    // Re-validate on server using shared schema (sanitization happens in transform)
    const validatedData = verify2FALoginSchema.safeParse(body);

    if (!validatedData.success) {
      console.warn('2FA login validation failed:', validatedData.error.flatten());
      return NextResponse.json(
        {
          error: 'validation_failed',
          message: 'Invalid input format',
          errors: validatedData.error.flatten(),
        },
        { status: 400 },
      );
    }

    // Data is already sanitized by the schema transform
    const { email, password, token }: Verify2FALoginData = validatedData.data;

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
    console.error('2FA login verification error:', error);
    return NextResponse.json(
      {
        error: 'server_error',
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
