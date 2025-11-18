import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { consent } = await request.json();
    
    // Here you would typically save the consent to your database
    // Consent data handled silently
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save cookie consent' },
      { status: 500 }
    );
  }
}