import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token || !email) {
      return NextResponse.json(
        { valid: false, message: 'Token and email are required' },
        { status: 400 },
      );
    }

    console.log('Verifying token for email:', email.toLowerCase());

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with matching token and email
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // Token must not be expired
      $or: [
        { resetPasswordTokenUsed: false }, // Token explicitly not used
        { resetPasswordTokenUsed: { $exists: false } }, // Token field doesn't exist (backward compatibility)
      ],
    });

    console.log('Found valid token user:', !!user);

    if (!user) {
      console.log('No valid token found, checking if token was used...');

      // Check if this exact token exists and is marked as used
      const usedTokenUser = await User.findOne({
        email: email.toLowerCase(),
        resetPasswordToken: token,
        resetPasswordTokenUsed: true,
      });

      console.log('Checking for used token. Found used token user:', !!usedTokenUser);
      if (usedTokenUser) {
        console.log('Token state - resetPasswordTokenUsed:', usedTokenUser.resetPasswordTokenUsed);
        console.log(
          'Token state - resetPasswordToken present:',
          !!usedTokenUser.resetPasswordToken,
        );
      }

      if (usedTokenUser) {
        console.log('Token was found but already used');
        return NextResponse.json(
          {
            valid: false,
            message: 'This reset link has already been used. Please request a new one.',
          },
          { status: 400 },
        );
      }

      console.log('Token not found - may be invalid, expired, or user not found');
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired token' },
        { status: 400 },
      );
    }

    console.log('Token is valid for user:', user.email);

    return NextResponse.json({ valid: true, message: 'Token is valid' }, { status: 200 });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ valid: false, message: 'Internal server error' }, { status: 500 });
  }
}
