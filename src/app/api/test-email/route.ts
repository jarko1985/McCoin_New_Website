import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a test token
    const testToken = 'test-token-' + Date.now();

    // Send the verification email
    await sendVerificationEmail(email, testToken);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox.',
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      {
        error: 'Failed to send test email',
      },
      { status: 500 },
    );
  }
}
