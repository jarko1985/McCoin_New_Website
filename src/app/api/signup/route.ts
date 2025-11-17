import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import { randomBytes, createHash } from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';
import { signupApiSchema, type SignupApiData } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    
    // Re-validate on server using API schema (sanitization happens in transform)
    // Note: confirmPassword and acceptTerms are validated client-side only
    const validatedData = signupApiSchema.safeParse(body);

    if (!validatedData.success) {
      console.warn('Signup form validation failed:', validatedData.error.flatten());
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validatedData.error.flatten(),
        },
        { status: 400 },
      );
    }

    // Data is already sanitized by the schema transform
    const { name, email, password }: SignupApiData = validatedData.data;

    // Validate reCAPTCHA token (optional - you can add reCAPTCHA verification here)
    // if (!recaptchaToken) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: 'reCAPTCHA verification required',
    //     },
    //     { status: 400 },
    //   );
    // }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'An account with this email already exists',
        },
        { status: 409 },
      );
    }

    // Generate verification token
    const rawToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with verification fields
    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      verifyToken: hashedToken,
      verifyTokenExpires: expires,
      isVerified: false, // User needs to verify email
    });

    // Send verification email
    try {
      await sendVerificationEmail(email.toLowerCase(), rawToken);
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Don't fail the signup if email sending fails
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      requiresVerification: true,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
