"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function TicketSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="bg-[#0d1635] border border-[#e2dedc]/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2 bg-[#e2dedc]/10" />
                <Skeleton className="h-3 w-1/2 bg-[#e2dedc]/10" />
              </div>
              <Skeleton className="h-6 w-16 bg-[#e2dedc]/10" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-3 w-20 bg-[#e2dedc]/10" />
              <Skeleton className="h-3 w-16 bg-[#e2dedc]/10" />
              <Skeleton className="h-3 w-24 bg-[#e2dedc]/10" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
