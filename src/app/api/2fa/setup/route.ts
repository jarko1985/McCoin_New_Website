import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/models/User';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
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

    // Generate a new secret
    const secret = speakeasy.generateSecret({
      name: `MCCoin (${user.email})`,
      issuer: 'MCCoin',
      length: 20,
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    // Update user with the secret (but don't enable 2FA yet)
    await User.findOneAndUpdate(
      { email: session.user.email },
      {
        twoFactorSecret: secret.base32,
        twoFactorEnabled: false,
      },
    );

    return NextResponse.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
      otpauthUrl: secret.otpauth_url,
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
