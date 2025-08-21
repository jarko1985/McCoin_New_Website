import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { createHash } from 'crypto';
import { sendWelcomeEmail } from '@/lib/mail';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing verification token or email',
        },
        { status: 400 },
      );
    }

    // Hash the token to compare with stored hash
    const hashedToken = createHash('sha256').update(token).digest('hex');

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with matching token and email
    const user = await User.findOne({
      email: email.toLowerCase(),
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
      await sendWelcomeEmail(email.toLowerCase(), user.name);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the verification process if welcome email fails
      // Just log the error and continue
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required',
        },
        { status: 400 },
      );
    }

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
      console.error('Error sending verification email:', emailError);
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
    console.error('Resend verification error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
