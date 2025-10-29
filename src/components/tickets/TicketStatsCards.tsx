"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Loader2, 
  Clock, 
  CheckCircle, 
  XCircle,
  Ticket
} from 'lucide-react';
import { TicketStats } from '@/types/ticket';

interface TicketStatsCardsProps {
  stats: TicketStats;
  compact?: boolean;
}

const statCards = [
  {
    key: 'total' as keyof TicketStats,
    label: 'Total Tickets',
    icon: Ticket,
    color: 'text-[#e2dedc]',
    bgColor: 'bg-[#e2dedc]/10',
  },
  {
    key: 'open' as keyof TicketStats,
    label: 'Open',
    icon: AlertCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    key: 'inProgress' as keyof TicketStats,
    label: 'In Progress',
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    key: 'awaitingUser' as keyof TicketStats,
    label: 'Awaiting Your Reply',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    key: 'resolved' as keyof TicketStats,
    label: 'Resolved',
    icon: CheckCircle,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
  },
  {
    key: 'closed' as keyof TicketStats,
    label: 'Closed',
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
];

export default function TicketStatsCards({ stats, compact = false }: TicketStatsCardsProps) {
  return (
    <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'} gap-2 lg:gap-4 mb-4 lg:mb-6`}>
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key];
        
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-[#0d1635] border-[#e2dedc]/20 hover:border-[#e2dedc]/40 transition-colors h-full min-h-[100px] lg:min-h-[120px]">
              <CardContent className="p-2 lg:p-4 h-full flex flex-col">
                <div className="flex items-center justify-between flex-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-[#e2dedc]/70 mb-1 truncate">
                      {card.label}
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-[#e2dedc]">
                      {value}
                    </p>
                  </div>
                  <div className={`p-2 lg:p-3 rounded-lg ${card.bgColor} flex-shrink-0`}>
                    <Icon className={`h-4 w-4 lg:h-6 lg:w-6 ${card.color}`} />
                  </div>
                </div>
                
                {/* Progress bar for visual representation */}
                {card.key !== 'total' && stats.total > 0 && (
                  <div className="mt-auto pt-2 lg:pt-3">
                    <div className="w-full bg-[#e2dedc]/10 rounded-full h-1 lg:h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(value / stats.total) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        className={`h-1 lg:h-2 rounded-full ${card.bgColor.replace('/10', '')}`}
                      />
                    </div>
                    <p className="text-xs text-[#e2dedc]/70 mt-1 hidden lg:block">
                      {stats.total > 0 ? Math.round((value / stats.total) * 100) : 0}% of total
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
