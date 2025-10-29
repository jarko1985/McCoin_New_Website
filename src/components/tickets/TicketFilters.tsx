"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  RotateCcw
} from 'lucide-react';
import { TicketFilters as TicketFiltersType, TicketCategory, TicketPriority, TicketStatus } from '@/types/ticket';
import { format } from 'date-fns';

interface TicketFiltersProps {
  filters: TicketFiltersType;
  onFiltersChange: (filters: TicketFiltersType) => void;
}

const categories: { value: TicketCategory; label: string }[] = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'account', label: 'Account Issues' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'feature_request', label: 'Feature Request' },
  { value: 'bug_report', label: 'Bug Report' },
];

const priorities: { value: TicketPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const statuses: { value: TicketStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'awaiting_user', label: 'Awaiting User' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export default function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
  const [showDatePicker, setShowDatePicker] = useState<'from' | 'to' | null>(null);

  const handleFilterChange = (key: keyof TicketFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      category: undefined,
      priority: undefined,
      status: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      myTicketsOnly: true,
    };
    onFiltersChange(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.priority) count++;
    if (filters.status) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-[#0d1635] border border-[#e2dedc]/20 rounded-lg p-3 lg:p-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4 space-y-2 sm:space-y-0">
        <h3 className="text-sm font-semibold text-[#e2dedc] flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-[#117f60]/20 text-[#117f60]">
              {activeFiltersCount}
            </Badge>
          )}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-[#e2dedc]/70 hover:text-[#e2dedc] self-start sm:self-auto"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#e2dedc]/50" />
            <Input
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Subject, ID, description..."
              className="pl-10 bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Category</label>
          <Select 
            value={filters.category || 'all'} 
            onValueChange={(value) => handleFilterChange('category', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="bg-[#07153B] border-[#e2dedc]/20">
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Priority</label>
          <Select 
            value={filters.priority || 'all'} 
            onValueChange={(value) => handleFilterChange('priority', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc]">
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent className="bg-[#07153B] border-[#e2dedc]/20">
              <SelectItem value="all">All priorities</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Status</label>
          <Select 
            value={filters.status || 'all'} 
            onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent className="bg-[#07153B] border-[#e2dedc]/20">
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mt-3 lg:mt-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Date From</label>
          <Popover open={showDatePicker === 'from'} onOpenChange={(open) => setShowDatePicker(open ? 'from' : null)}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc] hover:bg-[#e2dedc]/10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateFrom ? format(filters.dateFrom, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#07153B] border-[#e2dedc]/20">
              <Calendar
                mode="single"
                selected={filters.dateFrom}
                onSelect={(date) => {
                  handleFilterChange('dateFrom', date);
                  setShowDatePicker(null);
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#e2dedc]/70">Date To</label>
          <Popover open={showDatePicker === 'to'} onOpenChange={(open) => setShowDatePicker(open ? 'to' : null)}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-[#07153B] border-[#e2dedc]/20 text-[#e2dedc] hover:bg-[#e2dedc]/10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateTo ? format(filters.dateTo, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#07153B] border-[#e2dedc]/20">
              <Calendar
                mode="single"
                selected={filters.dateTo}
                onSelect={(date) => {
                  handleFilterChange('dateTo', date);
                  setShowDatePicker(null);
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-[#e2dedc]/20">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-xs font-medium text-[#e2dedc]/70">Active filters:</span>
            {filters.search && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                Search: {filters.search}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('search', '')}
                />
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('category', undefined)}
                />
              </Badge>
            )}
            {filters.priority && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                Priority: {priorities.find(p => p.value === filters.priority)?.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('priority', undefined)}
                />
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                Status: {statuses.find(s => s.value === filters.status)?.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('status', undefined)}
                />
              </Badge>
            )}
            {filters.dateFrom && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                From: {format(filters.dateFrom, 'MMM dd')}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('dateFrom', undefined)}
                />
              </Badge>
            )}
            {filters.dateTo && (
              <Badge variant="secondary" className="bg-[#117f60]/20 text-[#117f60]">
                To: {format(filters.dateTo, 'MMM dd')}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleFilterChange('dateTo', undefined)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
