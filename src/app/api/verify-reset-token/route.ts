import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { createHash } from 'crypto';
import {
  verifyEmailSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input (reuse verifyEmailSchema as it has same structure: token + email)
    const validation = validateAndSanitize(verifyEmailSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          valid: false,
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { token, email } = validation.data;

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
            valid: false,
            message: 'This reset link has already been used. Please request a new one.',
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { valid: false, message: 'Invalid or expired token' },
        { status: 400 },
      );
    }

    return NextResponse.json({ valid: true, message: 'Token is valid' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ valid: false, message: 'Internal server error' }, { status: 500 });
  }
}
