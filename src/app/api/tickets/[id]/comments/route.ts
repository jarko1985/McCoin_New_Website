import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { verifyTicketOwnership } from '@/lib/security';
import {
  commentSchema,
  validateAndSanitize,
  getValidationErrorMessage,
  sanitizeHtml,
  ticketIdSchema,
} from '@/lib/validation';

// POST /api/tickets/[id]/comments - Add comment to ticket
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ticket ID format
    const idValidation = ticketIdSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: 'Invalid ticket ID format' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate and sanitize comment input
    const validation = validateAndSanitize(commentSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 }
      );
    }

    const { content, isInternal } = validation.data;

    // Verify ticket ownership
    const { ticket, user, error } = await verifyTicketOwnership(id);
    if (error) return error;

    if (!ticket || !user) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const ticketIndex = user.tickets.findIndex((t: any) => t.id === id);
    
    if (ticketIndex === -1) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const ticketToUpdate = user.tickets[ticketIndex];
    
    // Sanitize comment content to prevent XSS
    const sanitizedContent = sanitizeHtml(content);
    
    // Create new comment
    const newComment = {
      id: randomBytes(8).toString('hex'),
      content: sanitizedContent,
      author: {
        id: ticketToUpdate.userId,
        name: user.name || user.email,
        email: user.email,
        type: 'user' as const,
      },
      createdAt: new Date(),
      attachments: [],
      isInternal: isInternal || false,
    };

    // Add comment to ticket
    ticketToUpdate.comments.push(newComment);
    
    // Add timeline event
    ticketToUpdate.timeline.push({
      id: randomBytes(8).toString('hex'),
      type: 'comment_added',
      description: 'Comment added',
      actor: {
        id: ticketToUpdate.userId,
        name: user.name || user.email,
        type: 'user',
      },
      timestamp: new Date(),
    });

    ticketToUpdate.updatedAt = new Date();
    ticketToUpdate.lastActivityAt = new Date();

    // Save user
    await user.save();

    return NextResponse.json(ticketToUpdate);
  } catch (error) {
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

    // Validate ticket ID format
    const idValidation = ticketIdSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: 'Invalid ticket ID format' },
        { status: 400 }
      );
    }

    // Verify ticket ownership
    const { ticket, error } = await verifyTicketOwnership(id);
    if (error) return error;

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ comments: ticket.comments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
