import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { createHash } from 'crypto';
import { sendWelcomeEmail } from '@/lib/mail';
import {
  verifyEmailSchema,
  resendVerificationSchema,
  validateAndSanitize,
  getValidationErrorMessage,
} from '@/lib/validation';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    // Validate input
    const validation = validateAndSanitize(verifyEmailSchema, { token, email });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { token: validatedToken, email: validatedEmail } = validation.data;

    // Hash the token to compare with stored hash
    const hashedToken = createHash('sha256').update(validatedToken).digest('hex');

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with matching token and email
    const user = await User.findOne({
      email: validatedEmail.toLowerCase(),
      verifyToken: hashedToken,
      verifyTokenExpires: { $gt: Date.now() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired verification token',
        },
        { status: 400 },
      );
    }

    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        {
          success: true,
          message: 'Email already verified',
          alreadyVerified: true,
        },
        { status: 200 },
      );
    }

    // Update user to verified status
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        isVerified: true,
        verifyToken: undefined,
        verifyTokenExpires: undefined,
      },
      { new: true }, // Return the updated document
    );

    // Send welcome email after successful verification
    try {
      await sendWelcomeEmail(validatedEmail.toLowerCase(), user.name);
    } catch (emailError) {
      // Don't fail the verification process if welcome email fails
      // Just log the error and continue
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateAndSanitize(resendVerificationSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 },
      );
    }

    const { email } = validation.data;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is already verified',
        },
        { status: 400 },
      );
    }

    // Generate new verification token
    const { randomBytes, createHash } = await import('crypto');
    const { sendVerificationEmail } = await import('@/lib/mail');

    const rawToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    await User.findByIdAndUpdate(user._id, {
      verifyToken: hashedToken,
      verifyTokenExpires: expires,
    });

    // Send new verification email
    try {
      await sendVerificationEmail(email.toLowerCase(), rawToken);
    } catch (emailError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send verification email',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'New verification email sent successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
