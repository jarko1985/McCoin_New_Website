import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

// POST /api/tickets/[id]/comments - Add comment to ticket
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { content, isInternal = false } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

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
    
    // Create new comment
    const newComment = {
      id: randomBytes(8).toString('hex'),
      content: content.trim(),
      author: {
        id: ticket.userId,
        name: user.name || user.email,
        email: user.email,
        type: 'user' as const,
      },
      createdAt: new Date(),
      attachments: [],
      isInternal,
    };

    // Add comment to ticket
    ticket.comments.push(newComment);
    
    // Add timeline event
    ticket.timeline.push({
      id: randomBytes(8).toString('hex'),
      type: 'comment_added',
      description: 'Comment added',
      actor: {
        id: ticket.userId,
        name: user.name || user.email,
        type: 'user',
      },
      timestamp: new Date(),
    });

    ticket.updatedAt = new Date();
    ticket.lastActivityAt = new Date();

    // Save user
    await user.save();

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/tickets/[id]/comments - Get ticket comments
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

    return NextResponse.json({ comments: ticket.comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
