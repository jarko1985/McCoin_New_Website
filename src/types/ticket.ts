// Ticket types and interfaces
export type TicketStatus = 'open' | 'in_progress' | 'awaiting_user' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'account' | 'general' | 'feature_request' | 'bug_report';

export interface TicketAttachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface TicketComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
    type: 'user' | 'system' | 'agent';
  };
  createdAt: Date;
  updatedAt?: Date;
  attachments?: TicketAttachment[];
  isInternal?: boolean; // For agent-only notes
}

export interface TicketTimelineEvent {
  id: string;
  type: 'created' | 'status_changed' | 'assigned' | 'comment_added' | 'attachment_added' | 'resolved' | 'closed';
  description: string;
  actor: {
    id: string;
    name: string;
    type: 'user' | 'system' | 'agent';
  };
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // Short hash like #TK-1234
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  userId: string; // Reference to the user who created the ticket
  assigneeId?: string; // Future: agent assigned to the ticket
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  
  // Optional fields
  environment?: string;
  pageUrl?: string;
  slaTarget?: Date;
  
  // Relations
  attachments: TicketAttachment[];
  comments: TicketComment[];
  timeline: TicketTimelineEvent[];
}

export interface CreateTicketRequest {
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  environment?: string;
  pageUrl?: string;
  attachments?: File[];
}

export interface UpdateTicketRequest {
  subject?: string;
  description?: string;
  category?: TicketCategory;
  priority?: TicketPriority;
  status?: TicketStatus;
}

export interface AddCommentRequest {
  content: string;
  attachments?: File[];
  isInternal?: boolean;
}

export interface TicketFilters {
  search?: string;
  category?: TicketCategory;
  priority?: TicketPriority;
  status?: TicketStatus;
  dateFrom?: Date;
  dateTo?: Date;
  myTicketsOnly?: boolean;
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  awaitingUser: number;
  resolved: number;
  closed: number;
}
