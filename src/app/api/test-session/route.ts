import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('Test session endpoint called');
    
    const session = await auth();
    console.log('Session:', session);
    console.log('Session user:', session?.user);
    console.log('Session user email:', session?.user?.email);

    return NextResponse.json({
      success: true,
      hasSession: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      email: session?.user?.email || null,
      sessionData: session
    });
  } catch (error) {
    console.error('Test session error:', error);
    return NextResponse.json({ 
      error: 'Session test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
