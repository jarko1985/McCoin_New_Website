import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import { randomBytes, createHash } from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';
import {
  signupSchema,
  validateAndSanitize,
  getValidationErrorMessage,
  sanitizeText,
} from '@/lib/validation';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(req, 'signup', rateLimitConfigs.signup);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(signupSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: getValidationErrorMessage(validation.error),
          errors: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const { name, email, password, recaptchaToken } = validation.data;

    // Sanitize name
    const sanitizedName = sanitizeText(name);

    // Verify reCAPTCHA token
    const recaptchaVerification = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaVerification.success) {
      return NextResponse.json(
        {
          success: false,
          message: recaptchaVerification.error || 'reCAPTCHA verification failed',
        },
        { status: 400 },
      );
    }

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
      name: sanitizedName,
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
      // Don't fail the signup if email sending fails
      // Log error in production but don't expose details
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      requiresVerification: true,
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
