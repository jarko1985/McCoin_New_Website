import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

/**
 * Get the authenticated user from the session
 * Returns null if not authenticated
 */
export async function getAuthenticatedUser() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  // Connect to MongoDB if needed
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }

  // Find user by email
  const user = await User.findOne({ email: session.user.email.toLowerCase() });
  return user;
}

/**
 * Require authentication - returns 401 if not authenticated
 * Returns the authenticated user if successful
 */
export async function requireAuth() {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      ),
      user: null,
    };
  }

  return { error: null, user };
}

/**
 * Verify that a ticket belongs to the authenticated user
 * Returns the ticket if it belongs to the user, null otherwise
 */
export async function verifyTicketOwnership(ticketId: string) {
  const { user, error } = await requireAuth();
  
  if (error || !user) {
    return { ticket: null, user: null, error };
  }

  // Find user with the specific ticket
  const ticketOwner = await User.findOne({ 'tickets.id': ticketId });
  
  if (!ticketOwner) {
    return { ticket: null, user: null, error: null };
  }

  // Verify the ticket belongs to the authenticated user
  if (ticketOwner._id.toString() !== user._id.toString()) {
    return {
      ticket: null,
      user: null,
      error: NextResponse.json(
        { error: 'Forbidden', message: 'You do not have permission to access this ticket' },
        { status: 403 }
      ),
    };
  }

  const ticket = ticketOwner.tickets.find((t: any) => t.id === ticketId);
  return { ticket, user: ticketOwner, error: null };
}

