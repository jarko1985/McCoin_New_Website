import mongoose from 'mongoose';

// Ticket sub-schema
const TicketAttachmentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const TicketCommentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, enum: ['user', 'system', 'agent'], default: 'user' },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  attachments: [TicketAttachmentSchema],
  isInternal: { type: Boolean, default: false },
});

const TicketTimelineEventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['created', 'status_changed', 'assigned', 'comment_added', 'attachment_added', 'resolved', 'closed'],
    required: true 
  },
  description: { type: String, required: true },
  actor: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['user', 'system', 'agent'], default: 'user' },
  },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: mongoose.Schema.Types.Mixed },
});

const TicketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ticketNumber: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['technical', 'billing', 'account', 'general', 'feature_request', 'bug_report'],
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium' 
  },
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'awaiting_user', 'resolved', 'closed'],
    default: 'open' 
  },
  userId: { type: String, required: true },
  assigneeId: { type: String },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastActivityAt: { type: Date, default: Date.now },
  
  // Optional fields
  environment: { type: String },
  pageUrl: { type: String },
  slaTarget: { type: Date },
  
  // Relations
  attachments: [TicketAttachmentSchema],
  comments: [TicketCommentSchema],
  timeline: [TicketTimelineEventSchema],
}, { timestamps: true });

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    emailVerified: Date,
    image: String,
    verifyToken: String,
    verifyTokenExpires: Date,
    isVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: '' },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    resetPasswordTokenUsed: { type: Boolean, default: false },
    tickets: [TicketSchema], // Add tickets array to user schema
  },
  { timestamps: true },
);

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
