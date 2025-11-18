import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { verifyTicketOwnership } from '@/lib/security';
import {
  updateTicketSchema,
  validateAndSanitize,
  getValidationErrorMessage,
  sanitizeText,
  sanitizeHtmlSync,
  ticketIdSchema,
} from '@/lib/validation';

// GET /api/tickets/[id] - Get specific ticket
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

    return NextResponse.json(ticket);
  } catch (error) {
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

    // Validate ticket ID format
    const idValidation = ticketIdSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: 'Invalid ticket ID format' },
        { status: 400 }
      );
    }

    const updates = await request.json();

    // Validate and sanitize updates
    const validation = validateAndSanitize(updateTicketSchema, updates);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: getValidationErrorMessage(validation.error),
        },
        { status: 400 }
      );
    }

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
    
    // Update ticket fields with sanitized values
    if (validation.data.subject) {
      ticketToUpdate.subject = sanitizeText(validation.data.subject);
    }
    if (validation.data.description) {
      ticketToUpdate.description = sanitizeHtmlSync(validation.data.description);
    }
    if (validation.data.category) {
      ticketToUpdate.category = validation.data.category;
    }
    if (validation.data.priority) {
      ticketToUpdate.priority = validation.data.priority;
    }
    if (validation.data.status) {
      const oldStatus = ticketToUpdate.status;
      ticketToUpdate.status = validation.data.status;
      
      // Add timeline event for status change
      ticketToUpdate.timeline.push({
        id: randomBytes(8).toString('hex'),
        type: 'status_changed',
        description: `Status changed from ${oldStatus} to ${validation.data.status}`,
        actor: {
          id: ticketToUpdate.userId,
          name: user.name || user.email,
          type: 'user',
        },
        timestamp: new Date(),
      });
    }
    
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

// DELETE /api/tickets/[id] - Delete ticket
export async function DELETE(
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
    const { user, error } = await verifyTicketOwnership(id);
    if (error) return error;

    if (!user) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Remove ticket from user's tickets array
    user.tickets = user.tickets.filter((t: any) => t.id !== id);
    await user.save();

    return NextResponse.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
