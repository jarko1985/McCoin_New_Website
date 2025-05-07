import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { consent } = await request.json();
    
    // Here you would typically save the consent to your database
    // For now, we'll just log it and return a success response
    console.log('Received cookie consent:', consent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling cookie consent:', error);
    return NextResponse.json(
      { error: 'Failed to save cookie consent' },
      { status: 500 }
    );
  }
}