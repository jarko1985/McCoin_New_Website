import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import { hash } from 'bcryptjs';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const { token, email, newPassword } = await request.json();

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { message: 'Token, email, and new password are required' },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 },
      );
    }

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

    if (!user) {
      // Check if token exists but is used
      const usedTokenUser = await User.findOne({
        email: email.toLowerCase(),
        resetPasswordToken: token,
        resetPasswordTokenUsed: true,
      });

      if (usedTokenUser) {
        return NextResponse.json(
          {
            message: 'This reset link has already been used. Please request a new password reset.',
          },
          { status: 400 },
        );
      }

      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    console.log('Updating password and marking token as used for user:', user.email);

    // Update password and mark token as used (keeping token for verification)
    const updateResult = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        resetPasswordTokenUsed: true,
        // Keep the token and expiry for proper "already used" detection
      },
      { new: true }, // Return the updated document
    );

    if (!updateResult) {
      console.error('Failed to update user password and token');
      return NextResponse.json({ message: 'Failed to update password' }, { status: 500 });
    }

    console.log(
      'Password updated and token marked as used. User resetPasswordTokenUsed:',
      updateResult.resetPasswordTokenUsed,
    );
    console.log('Reset token still present for verification:', !!updateResult.resetPasswordToken);

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
