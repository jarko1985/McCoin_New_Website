"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  MessageCircle, 
  Paperclip, 
  Eye,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { Ticket, TicketPriority, TicketStatus } from '@/types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  viewMode: 'list' | 'grid';
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicketId?: string;
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

export default function TicketList({
  tickets,
  loading,
  viewMode,
  onTicketSelect,
  selectedTicketId,
}: TicketListProps) {
  const [sortBy, setSortBy] = useState<'lastActivity' | 'priority' | 'created'>('lastActivity');

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
    }
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full bg-[#e2dedc]/10" />
        ))}
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-[#e2dedc]/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-12 w-12 text-[#e2dedc]/50" />
        </div>
        <h3 className="text-xl font-semibold text-[#e2dedc] mb-2">No tickets found</h3>
        <p className="text-[#e2dedc]/70 mb-6">Create your first support ticket to get started.</p>
        <Button className="bg-[#117f60] hover:bg-[#117f60]/90 text-white">
          Create New Ticket
        </Button>
      </motion.div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {sortedTickets.map((ticket, index) => {
          const StatusIcon = statusIcons[ticket.status];
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTicketId === ticket.id 
                    ? 'ring-2 ring-[#117f60] bg-[#117f60]/10' 
                    : 'hover:bg-[#e2dedc]/5'
                }`}
                onClick={() => onTicketSelect(ticket)}
              >
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-start justify-between mb-2 lg:mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#e2dedc] text-xs lg:text-sm mb-1 line-clamp-2">
                        {ticket.subject}
                      </h3>
                      <p className="text-[#e2dedc]/70 text-xs mb-1 lg:mb-2">
                        {ticket.ticketNumber}
                      </p>
                    </div>
                    <StatusIcon className="h-3 w-3 lg:h-4 lg:w-4 text-[#e2dedc]/70 flex-shrink-0" />
                  </div>

                  <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <Badge 
                      className={`text-xs ${priorityColors[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </Badge>
                    <Badge 
                      className={`text-xs ${statusColors[ticket.status]}`}
                    >
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#e2dedc]/70">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{formatDate(ticket.lastActivityAt)}</span>
                      <span className="sm:hidden">{formatDate(ticket.lastActivityAt).split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {ticket.comments.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-xs lg:text-sm text-[#e2dedc]/70">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0d1635] border border-[#e2dedc]/20 rounded px-2 lg:px-3 py-1 text-xs lg:text-sm text-[#e2dedc]"
          >
            <option value="lastActivity">Last Activity</option>
            <option value="priority">Priority</option>
            <option value="created">Created Date</option>
          </select>
        </div>
      </div>

      {/* List View */}
      <div className="space-y-2">
        {sortedTickets.map((ticket, index) => {
          const StatusIcon = statusIcons[ticket.status];
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTicketId === ticket.id 
                    ? 'ring-2 ring-[#117f60] bg-[#117f60]/10' 
                    : 'hover:bg-[#e2dedc]/5'
                }`}
                onClick={() => onTicketSelect(ticket)}
              >
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 mb-2">
                        <h3 className="font-semibold text-[#e2dedc] text-sm lg:text-base truncate">
                          {ticket.subject}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`text-xs ${priorityColors[ticket.priority]}`}
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge 
                            className={`text-xs ${statusColors[ticket.status]}`}
                          >
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-[#e2dedc]/70">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                          <span className="hidden sm:inline">{formatDate(ticket.lastActivityAt)}</span>
                          <span className="sm:hidden">{formatDate(ticket.lastActivityAt).split(' ')[0]}</span>
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                          {ticket.comments.length} comments
                        </span>
                        {ticket.attachments.length > 0 && (
                          <span className="flex items-center">
                            <Paperclip className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            {ticket.attachments.length} files
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-2 lg:ml-4">
                      <StatusIcon className="h-4 w-4 lg:h-5 lg:w-5 text-[#e2dedc]/70" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#e2dedc]/70 hover:text-[#e2dedc] p-1 lg:p-2"
                      >
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
