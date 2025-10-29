"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Clock, 
  MessageCircle, 
  Paperclip, 
  User, 
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  Download,
  Copy,
  MoreHorizontal
} from 'lucide-react';
import { Ticket, TicketComment, TicketTimelineEvent } from '@/types/ticket';

interface TicketDetailProps {
  ticket: Ticket;
  onTicketUpdate: (ticket: Ticket) => void;
  onClose: () => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-blue-100 text-blue-800',
  awaiting_user: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-gray-100 text-gray-800',
  closed: 'bg-red-100 text-red-800',
};

const statusIcons = {
  open: AlertCircle,
  in_progress: Loader2,
  awaiting_user: Clock,
  resolved: CheckCircle,
  closed: XCircle,
};

export default function TicketDetail({ ticket, onTicketUpdate, onClose }: TicketDetailProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  const StatusIcon = statusIcons[ticket.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/tickets/${ticket.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        onTicketUpdate(updatedTicket);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        onTicketUpdate(updatedTicket);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-[#e2dedc]/20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3 lg:mb-4 space-y-2 lg:space-y-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg lg:text-xl font-semibold text-[#e2dedc] mb-2">
              {ticket.subject}
            </h2>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <Badge className="text-xs lg:text-sm bg-[#e2dedc]/20 text-[#e2dedc]">
                {ticket.ticketNumber}
              </Badge>
              <Badge className={`text-xs lg:text-sm ${priorityColors[ticket.priority]}`}>
                {ticket.priority}
              </Badge>
              <Badge className={`text-xs lg:text-sm ${statusColors[ticket.status]}`}>
                {ticket.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#e2dedc]/70 hover:text-[#e2dedc] self-start lg:self-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-[#e2dedc]/70">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
            Created {formatDate(ticket.createdAt)}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
            Last activity {formatRelativeTime(ticket.lastActivityAt)}
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
            {ticket.category}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Timeline & Details */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#e2dedc]/20 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Status Timeline */}
            <Card className="bg-[#0d1635] border-[#e2dedc]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-[#e2dedc] flex items-center">
                  <StatusIcon className="h-4 w-4 mr-2" />
                  Status Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ticket.timeline.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-[#117f60] rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#e2dedc]">{event.description}</p>
                        <p className="text-xs text-[#e2dedc]/70">
                          {formatRelativeTime(event.timestamp)} by {event.actor.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Properties */}
            <Card className="bg-[#0d1635] border-[#e2dedc]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-[#e2dedc]">
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#e2dedc]/70">Category</span>
                  <span className="text-[#e2dedc]">{ticket.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#e2dedc]/70">Priority</span>
                  <Badge className={`text-xs ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#e2dedc]/70">Status</span>
                  <Badge className={`text-xs ${statusColors[ticket.status]}`}>
                    {ticket.status.replace('_', ' ')}
                  </Badge>
                </div>
                {ticket.environment && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e2dedc]/70">Environment</span>
                    <span className="text-[#e2dedc]">{ticket.environment}</span>
                  </div>
                )}
                {ticket.pageUrl && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e2dedc]/70">Page URL</span>
                    <a 
                      href={ticket.pageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#117f60] hover:underline text-xs truncate max-w-32"
                    >
                      {ticket.pageUrl}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            {ticket.attachments.length > 0 && (
              <Card className="bg-[#0d1635] border-[#e2dedc]/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[#e2dedc] flex items-center">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attachments ({ticket.attachments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 bg-[#e2dedc]/5 rounded">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#e2dedc] truncate">{attachment.originalName}</p>
                          <p className="text-xs text-[#e2dedc]/70">
                            {(attachment.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Panel - Description & Comments */}
        <div className="flex-1 flex flex-col">
          {/* Description */}
          <div className="p-4 lg:p-6 border-b border-[#e2dedc]/20">
            <h3 className="text-lg font-semibold text-[#e2dedc] mb-3">Description</h3>
            <div className="prose prose-sm max-w-none text-[#e2dedc]/90">
              <p className="whitespace-pre-wrap text-sm lg:text-base">{ticket.description}</p>
            </div>
          </div>

          {/* Comments */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#e2dedc] mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Comments ({ticket.comments.length})
            </h3>

            <div className="space-y-4 mb-6">
              {ticket.comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg ${
                    comment.author.type === 'user' 
                      ? 'bg-[#117f60]/10 ml-8' 
                      : 'bg-[#e2dedc]/5 mr-8'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-[#e2dedc]/70" />
                      <span className="text-sm font-medium text-[#e2dedc]">
                        {comment.author.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {comment.author.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-[#e2dedc]/70">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-[#e2dedc]/90 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="text-[#e2dedc] border-[#e2dedc]/20">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach
                  </Button>
                </div>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-[#117f60] hover:bg-[#117f60]/90 text-white"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
