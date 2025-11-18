import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  loginSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'validation_error',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;

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
