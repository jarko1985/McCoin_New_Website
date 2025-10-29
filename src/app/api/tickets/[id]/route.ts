import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

// GET /api/tickets/[id] - Get specific ticket
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with the specific ticket
    const user = await User.findOne({ 'tickets.id': id });
    
    if (!user) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const ticket = user.tickets.find((t: any) => t.id === id);
    
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/tickets/[id] - Update ticket
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with the specific ticket
    const user = await User.findOne({ 'tickets.id': id });
    
    if (!user) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const ticketIndex = user.tickets.findIndex((t: any) => t.id === id);
    
    if (ticketIndex === -1) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const ticket = user.tickets[ticketIndex];
    
    // Update ticket fields
    if (updates.subject) ticket.subject = updates.subject;
    if (updates.description) ticket.description = updates.description;
    if (updates.category) ticket.category = updates.category;
    if (updates.priority) ticket.priority = updates.priority;
    if (updates.status) {
      const oldStatus = ticket.status;
      ticket.status = updates.status;
      
      // Add timeline event for status change
      ticket.timeline.push({
        id: randomBytes(8).toString('hex'),
        type: 'status_changed',
        description: `Status changed from ${oldStatus} to ${updates.status}`,
        actor: {
          id: ticket.userId,
          name: user.name || user.email,
          type: 'user',
        },
        timestamp: new Date(),
      });
    }
    
    ticket.updatedAt = new Date();
    ticket.lastActivityAt = new Date();

    // Save user
    await user.save();

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/tickets/[id] - Delete ticket
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user with the specific ticket
    const user = await User.findOne({ 'tickets.id': id });
    
    if (!user) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Remove ticket from user's tickets array
    user.tickets = user.tickets.filter((t: any) => t.id !== id);
    await user.save();

    return NextResponse.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
