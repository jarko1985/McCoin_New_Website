import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasSession: !!session,
      session: session
        ? {
            user: {
              id: session.user?.id,
              email: session.user?.email,
              name: session.user?.name,
            },
          }
        : null,
      config: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        baseUrl:
          process.env.NEXTAUTH_URL ||
          (process.env.NODE_ENV === 'production'
            ? 'https://mc-coin-new-website.vercel.app'
            : 'http://localhost:3000'),
      },
    });
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get auth info',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
