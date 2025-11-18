import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import { sendPasswordResetEmail } from '@/lib/mail';
import mongoose from 'mongoose';
import { randomBytes, createHash } from 'crypto';
import {
  forgotPasswordSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(forgotPasswordSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { message: getValidationErrorMessage(validation.error) },
        { status: 400 },
      );
    }

    const { email } = validation.data;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal whether user exists for security
      return NextResponse.json(
        { message: 'If this email exists in our system, you will receive a password reset link.' },
        { status: 200 },
      );
    }

    // Generate reset token (plain token for email)
    const resetToken = randomBytes(32).toString('hex');
    // Hash the token before storing in database (security best practice)
    const hashedToken = createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save hashed reset token to user (never store plain tokens)
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: resetTokenExpires,
      resetPasswordTokenUsed: false, // Reset the used flag for new token
    });

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailError) {
      return NextResponse.json(
        { message: 'Failed to send reset email. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
