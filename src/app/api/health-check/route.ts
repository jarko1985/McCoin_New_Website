import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      checks: {
        nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: !!process.env.NEXTAUTH_URL,
        mongodbUri: !!process.env.MONGODB_URI,
        smtpEmail: !!process.env.SMTP_EMAIL,
        smtpPassword: !!process.env.SMTP_PASSWORD,
      },
      database: {
        connected: false,
        readyState: mongoose.connection.readyState,
      },
    };

    // Test database connection
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI!, {
          serverSelectionTimeoutMS: 5000, // 5 second timeout
        });
      }
      healthStatus.database.connected = true;
      healthStatus.database.readyState = mongoose.connection.readyState;
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      healthStatus.database.connected = false;
    }

    return NextResponse.json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
