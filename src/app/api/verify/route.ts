import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/lib/models/User';
import { createHash } from 'crypto';

export async function GET(req: NextRequest) {
  const rawToken = req.nextUrl.searchParams.get('token');
  if (!rawToken) return NextResponse.json({ message: 'Token missing' }, { status: 400 });

  const hashedToken = createHash('sha256').update(rawToken).digest('hex');

  await mongoose.connect(process.env.MONGODB_URI!);
  const user = await User.findOne({
    verifyToken: hashedToken,
    verifyTokenExpires: { $gt: new Date() },
  });
  if (!user) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });

  user.emailVerified = new Date();
  user.verifyToken = undefined;
  user.verifyTokenExpires = undefined;
  await user.save();

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/en/login?verified=true`);
}
