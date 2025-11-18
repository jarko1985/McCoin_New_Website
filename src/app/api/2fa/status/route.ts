import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const response = {
      twoFactorEnabled: user.twoFactorEnabled || false,
      hasSecret: !!user.twoFactorSecret,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
