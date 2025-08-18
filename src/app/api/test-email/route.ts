import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a test token
    const testToken = 'test-token-' + Date.now();

    // Send test email
    await sendVerificationEmail(email, testToken);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      email: email,
      token: testToken,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send test email',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
