import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/models/User';
import speakeasy from 'speakeasy';
import mongoose from 'mongoose';
import {
  twoFactorVerifySchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(twoFactorVerifySchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { token } = validation.data;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.twoFactorSecret) {
      return NextResponse.json({ error: '2FA not set up' }, { status: 400 });
    }

    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2, // Allow 2 time steps in case of slight time differences
    });

    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Enable 2FA
    await User.findOneAndUpdate({ email: session.user.email }, { twoFactorEnabled: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
