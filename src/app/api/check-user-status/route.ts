import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { createRequestLogger, logError } from '@/lib/api-logger';

export async function POST(req: NextRequest) {
  const logger = createRequestLogger(req, { endpoint: 'check-user-status' });

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      logger.warn('Missing email or password in request');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    logger.debug({ email: email.toLowerCase() }, 'Checking user status');

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.password) {
      logger.warn({ email: email.toLowerCase() }, 'User not found or no password set');
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
      logger.warn({ email: email.toLowerCase() }, 'Invalid password attempt');
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
      logger.info({ email: email.toLowerCase() }, 'User not verified');
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
    logger.info({ email: email.toLowerCase(), needs2FA: user.twoFactorEnabled }, 'User verified successfully');
    return NextResponse.json({
      success: true,
      message: 'User is verified and ready to login',
      needs2FA: user.twoFactorEnabled || false,
    });
  } catch (error) {
    logError(req, error, { endpoint: 'check-user-status' });
    return NextResponse.json(
      {
        error: 'server_error',
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
