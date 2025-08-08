import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('2FA status endpoint called');

    const session = await auth();
    console.log('Session:', session);

    if (!session?.user?.email) {
      console.log('No session or email found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    console.log('Looking for user with email:', session.user.email);
    const user = await User.findOne({ email: session.user.email });
    console.log('User found:', !!user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const response = {
      twoFactorEnabled: user.twoFactorEnabled || false,
      hasSecret: !!user.twoFactorSecret,
    };

    console.log('2FA status response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('2FA status error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
