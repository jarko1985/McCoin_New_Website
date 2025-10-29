import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { Ticket, TicketStats } from '@/types/ticket';

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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email or ObjectId
    let user;
    console.log('Looking for user with userId:', userId);
    
    if (userId.includes('@')) {
      // If userId is an email
      console.log('Searching by email:', userId);
      user = await User.findOne({ email: userId });
    } else {
      // If userId is an ObjectId
      console.log('Searching by ObjectId:', userId);
      user = await User.findOne({ _id: userId });
    }
    
    if (!user) {
      console.log('User not found for userId:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Found user:', user.email, 'with ObjectId:', user._id);

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
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tickets - Create new ticket
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const priority = formData.get('priority') as string;
    const environment = formData.get('environment') as string;
    const pageUrl = formData.get('pageUrl') as string;

    if (!userId || !subject || !description || !category || !priority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email or ObjectId
    let user;
    console.log('Looking for user with userId:', userId);
    
    if (userId.includes('@')) {
      // If userId is an email
      console.log('Searching by email:', userId);
      user = await User.findOne({ email: userId });
    } else {
      // If userId is an ObjectId
      console.log('Searching by ObjectId:', userId);
      user = await User.findOne({ _id: userId });
    }
    
    if (!user) {
      console.log('User not found for userId:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Found user:', user.email, 'with ObjectId:', user._id);

    // Generate ticket ID and number
    const ticketId = generateTicketId();
    const ticketNumber = generateTicketNumber();

    // Create new ticket
    const newTicket = {
      id: ticketId,
      ticketNumber,
      subject,
      description,
      category,
      priority,
      status: 'open',
      userId: user._id.toString(), // Use the actual ObjectId
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date(),
      environment: environment || undefined,
      pageUrl: pageUrl || undefined,
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
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
