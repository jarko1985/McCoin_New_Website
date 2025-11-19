import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { createHash } from 'crypto';
import {
  resetPasswordSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(
      request,
      'resetPassword',
      rateLimitConfigs.resetPassword
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(resetPasswordSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { message: getValidationErrorMessage(validation.error) },
        { status: 400 },
      );
    }

    const { token, email, newPassword } = validation.data;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Hash the incoming token to compare with stored hash
    const hashedToken = createHash('sha256').update(token).digest('hex');

    // Find user with matching hashed token and email
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }, // Token must not be expired
      $or: [
        { resetPasswordTokenUsed: false }, // Token explicitly not used
        { resetPasswordTokenUsed: { $exists: false } }, // Token field doesn't exist (backward compatibility)
      ],
    });

    if (!user) {
      // Check if token exists but is used (compare hashed token)
      const usedTokenUser = await User.findOne({
        email: email.toLowerCase(),
        resetPasswordToken: hashedToken,
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
      return NextResponse.json({ message: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
