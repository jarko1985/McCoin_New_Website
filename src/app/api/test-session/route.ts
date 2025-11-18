import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    return NextResponse.json({
      success: true,
      hasSession: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      // Don't expose email or full session data in production
      email: process.env.NODE_ENV === 'development' ? (session?.user?.email || null) : null,
      sessionData: process.env.NODE_ENV === 'development' ? session : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Session test failed',
        // Don't expose error details in production
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
