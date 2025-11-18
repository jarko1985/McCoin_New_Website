import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { Ticket, TicketStats } from '@/types/ticket';
import { requireAuth } from '@/lib/security';
import {
  createTicketSchema,
  validateAndSanitize,
  getValidationErrorMessage,
  sanitizeText,
  sanitizeHtmlSync,
} from '@/lib/validation';

// Generate unique ticket ID and number
function generateTicketId(): string {
  return randomBytes(16).toString('hex');
}

function generateTicketNumber(): string {
  const prefix = 'TK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// GET /api/tickets - Fetch user's tickets
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const { user, error } = await requireAuth();
    if (error) return error;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const tickets = user.tickets || [];
    
    // Calculate stats
    const stats: TicketStats = {
      total: tickets.length,
      open: tickets.filter((t: any) => t.status === 'open').length,
      inProgress: tickets.filter((t: any) => t.status === 'in_progress').length,
      awaitingUser: tickets.filter((t: any) => t.status === 'awaiting_user').length,
      resolved: tickets.filter((t: any) => t.status === 'resolved').length,
      closed: tickets.filter((t: any) => t.status === 'closed').length,
    };

    return NextResponse.json({ tickets, stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tickets - Create new ticket
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { user, error } = await requireAuth();
    if (error) return error;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const priority = formData.get('priority') as string;
    const environment = formData.get('environment') as string;
    const pageUrl = formData.get('pageUrl') as string;

    // Validate and sanitize input
    const ticketData = {
      subject,
      description,
      category,
      priority,
      environment: environment || undefined,
      pageUrl: pageUrl || undefined,
    };

    const validation = validateAndSanitize(createTicketSchema, ticketData);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: getValidationErrorMessage(validation.error),
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { subject: validatedSubject, description: validatedDescription, category: validatedCategory, priority: validatedPriority, environment: validatedEnvironment, pageUrl: validatedPageUrl } = validation.data;

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Generate ticket ID and number
    const ticketId = generateTicketId();
    const ticketNumber = generateTicketNumber();

    // Sanitize user-generated content to prevent XSS
    const sanitizedSubject = sanitizeText(validatedSubject);
    const sanitizedDescription = sanitizeHtmlSync(validatedDescription);

    // Create new ticket
    const newTicket = {
      id: ticketId,
      ticketNumber,
      subject: sanitizedSubject,
      description: sanitizedDescription,
      category: validatedCategory,
      priority: validatedPriority,
      status: 'open',
      userId: user._id.toString(), // Use the actual ObjectId
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date(),
      environment: validatedEnvironment ? sanitizeText(validatedEnvironment) : undefined,
      pageUrl: validatedPageUrl,
      attachments: [],
      comments: [],
      timeline: [
        {
          id: randomBytes(8).toString('hex'),
          type: 'created',
          description: 'Ticket created',
          actor: {
            id: user._id.toString(),
            name: user.name || user.email,
            type: 'user',
          },
          timestamp: new Date(),
        },
      ],
    };

    // Add ticket to user
    user.tickets.push(newTicket);
    await user.save();

    return NextResponse.json(newTicket);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
