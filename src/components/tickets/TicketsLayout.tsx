'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  MessageCircle,
  Phone,
  Filter,
  Download,
  Grid3X3,
  List,
  Bell,
  Settings,
  X
} from 'lucide-react';
import { Ticket as TicketType, TicketStats, TicketFilters as TicketFiltersType } from '@/types/ticket';
import { TicketList, TicketDetail, NewTicketModal, TicketFilters, TicketStatsCards, TicketSkeleton, ToastContainer, ToastType } from './index';
import * as XLSX from 'xlsx';

interface TicketsLayoutProps {
  userId: string;
  locale: string;
}

export default function TicketsLayout({ userId, locale }: TicketsLayoutProps) {
  const [activeTab, setActiveTab] = useState('my-tickets');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    awaitingUser: 0,
    resolved: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Array<{ id: string; type: ToastType; title: string; message?: string; onClose: (id: string) => void }>>([]);
  const [filters, setFilters] = useState<TicketFiltersType>({
    search: '',
    category: undefined,
    priority: undefined,
    status: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    myTicketsOnly: true,
  });
  const [filteredTickets, setFilteredTickets] = useState<TicketType[]>([]);

  const sidebarItems = [
    {
      id: 'my-tickets',
      label: 'My Tickets',
      icon: MessageCircle,
      count: tickets.length,
    },
    {
      id: 'create-ticket',
      label: 'Create New Ticket',
      icon: Plus,
      action: () => setShowNewTicket(true),
    },
    {
      id: 'contact-support',
      label: 'Contact Support',
      icon: Phone,
    },
  ];

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, [userId]);

  // Apply filters whenever tickets or filters change
  useEffect(() => {
    applyFilters();
  }, [tickets, filters]);

  const addToast = (type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, title, message, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchTerm) ||
        ticket.ticketNumber.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(ticket => new Date(ticket.createdAt) >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(ticket => new Date(ticket.createdAt) <= filters.dateTo!);
    }

    setFilteredTickets(filtered);
  };

  const handleFiltersChange = (newFilters: TicketFiltersType) => {
    setFilters(newFilters);
  };

  const exportToExcel = () => {
    try {
      if (filteredTickets.length === 0) {
        addToast('warning', 'No tickets to export', 'There are no tickets matching your current filters.');
        return;
      }

      // Prepare data for export
      const exportData = filteredTickets.map(ticket => ({
        'Ticket Number': ticket.ticketNumber,
        'Subject': ticket.subject,
        'Category': ticket.category,
        'Priority': ticket.priority,
        'Status': ticket.status,
        'Created Date': new Date(ticket.createdAt).toLocaleDateString(),
        'Created Time': new Date(ticket.createdAt).toLocaleTimeString(),
        'Last Activity': new Date(ticket.lastActivityAt).toLocaleDateString(),
        'Last Activity Time': new Date(ticket.lastActivityAt).toLocaleTimeString(),
        'Comments Count': ticket.comments.length,
        'Attachments Count': ticket.attachments.length,
        'Description': ticket.description.substring(0, 200) + (ticket.description.length > 200 ? '...' : ''),
        'Timeline Events': ticket.timeline.length,
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 15 }, // Ticket Number
        { wch: 35 }, // Subject
        { wch: 15 }, // Category
        { wch: 10 }, // Priority
        { wch: 15 }, // Status
        { wch: 12 }, // Created Date
        { wch: 12 }, // Created Time
        { wch: 12 }, // Last Activity
        { wch: 12 }, // Last Activity Time
        { wch: 12 }, // Comments Count
        { wch: 15 }, // Attachments Count
        { wch: 60 }, // Description
        { wch: 15 }, // Timeline Events
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Tickets');

      // Generate filename with current date and filter info
      const currentDate = new Date().toISOString().split('T')[0];
      const filterInfo = filters.search ? '_filtered' : '';
      const filename = `tickets_export_${currentDate}${filterInfo}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);

      addToast('success', 'Export successful', `Exported ${filteredTickets.length} tickets to ${filename}`);
    } catch (error) {
      console.error('Export error:', error);
      addToast('error', 'Export failed', 'Failed to export tickets. Please try again.');
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tickets?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      const data = await response.json();
      setTickets(data.tickets || []);
      
      // Calculate stats
      const ticketStats: TicketStats = {
        total: data.tickets?.length || 0,
        open: data.tickets?.filter((t: TicketType) => t.status === 'open').length || 0,
        inProgress: data.tickets?.filter((t: TicketType) => t.status === 'in_progress').length || 0,
        awaitingUser: data.tickets?.filter((t: TicketType) => t.status === 'awaiting_user').length || 0,
        resolved: data.tickets?.filter((t: TicketType) => t.status === 'resolved').length || 0,
        closed: data.tickets?.filter((t: TicketType) => t.status === 'closed').length || 0,
      };
      setStats(ticketStats);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      addToast('error', 'Failed to load tickets', 'Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleTicketSelect = (ticket: TicketType) => {
    setSelectedTicket(ticket);
  };

  const handleTicketUpdate = (updatedTicket: TicketType) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
    if (selectedTicket?.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  const handleNewTicket = (newTicket: TicketType) => {
    setTickets(prev => [newTicket, ...prev]);
    setShowNewTicket(false);
    addToast('success', 'Ticket created', 'Your support ticket has been created successfully.');
  };

  return (
    <div className="h-screen flex flex-col bg-[#07153B]">
      {/* Mobile Header - Only visible on small screens */}
      <div className="lg:hidden bg-[#0d1635] border-b border-[#e2dedc]/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#e2dedc]">Support Tickets</h1>
            <p className="text-[#e2dedc]/70 text-sm">Manage your support requests</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10"
            >
              {viewMode === 'list' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToExcel}
              className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setShowNewTicket(true)}
              className="bg-[#117f60] hover:bg-[#117f60]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-80 bg-[#0d1635] border-r border-[#e2dedc]/20 flex-col">
          {/* Desktop Sidebar Header */}
          <div className="p-6 border-b border-[#e2dedc]/20">
            <h1 className="text-xl font-bold text-[#e2dedc]">Support Tickets</h1>
            <p className="text-[#e2dedc]/70 text-sm">Manage your support requests</p>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      className={`w-full justify-start h-12 text-base ${
                        activeTab === item.id
                          ? 'bg-[#117f60] text-white hover:bg-[#117f60]/90'
                          : 'text-[#e2dedc] hover:bg-[#e2dedc]/10'
                      }`}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Desktop Footer */}
          <div className="p-4 border-t border-[#e2dedc]/20">
            <div className="flex items-center space-x-3 text-[#e2dedc]/70">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Notifications</span>
            </div>
            <div className="flex items-center space-x-3 text-[#e2dedc]/70 mt-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Desktop Top Bar */}
          <div className="hidden lg:block bg-[#0d1635] border-b border-[#e2dedc]/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-[#e2dedc]">
                  {activeTab === 'my-tickets' ? 'My Tickets' : 'Support Center'}
                </h2>
                <Badge variant="outline" className="text-[#e2dedc] border-[#e2dedc]/20">
                  {tickets.length} tickets
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                  className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10"
                >
                  {viewMode === 'list' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportToExcel}
                  className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={() => setShowNewTicket(true)}
                  className="bg-[#117f60] hover:bg-[#117f60]/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Tabs */}
          <div className="lg:hidden bg-[#0d1635] border-b border-[#e2dedc]/20">
            <div className="flex overflow-x-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                      activeTab === item.id
                        ? 'border-[#117f60] text-[#117f60]'
                        : 'border-transparent text-[#e2dedc]/70 hover:text-[#e2dedc]'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area - Single scroll container */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'my-tickets' && (
              <div className="p-4 lg:p-6">
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <TicketFilters 
                          filters={filters}
                          onFiltersChange={handleFiltersChange} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Filters - Always visible */}
                <div className="lg:hidden mb-4">
                  <TicketFilters 
                    filters={filters}
                    onFiltersChange={handleFiltersChange} 
                  />
                </div>

                {/* Stats Cards */}
                <TicketStatsCards stats={stats} compact={!!selectedTicket} />

                {/* Tickets List */}
                {loading ? (
                  <TicketSkeleton />
                ) : (
                  <TicketList
                    tickets={filteredTickets}
                    loading={loading}
                    viewMode={viewMode}
                    onTicketSelect={handleTicketSelect}
                    selectedTicketId={selectedTicket?.id}
                  />
                )}
              </div>
            )}

            {/* Other tabs content */}
            {activeTab === 'create-ticket' && (
              <div className="p-4 lg:p-6">
                <div className="text-center py-12">
                  <Plus className="h-12 w-12 text-[#e2dedc]/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#e2dedc] mb-2">Create New Ticket</h3>
                  <p className="text-[#e2dedc]/70 mb-4">Click the "New Ticket" button to get started</p>
                  <Button
                    onClick={() => setShowNewTicket(true)}
                    className="bg-[#117f60] hover:bg-[#117f60]/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'contact-support' && (
              <div className="p-4 lg:p-6">
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-[#e2dedc]/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#e2dedc] mb-2">Contact Support</h3>
                  <p className="text-[#e2dedc]/70 mb-4">Need immediate assistance? Contact our support team</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-[#e2dedc] border-[#e2dedc]/20">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="w-full text-[#e2dedc] border-[#e2dedc]/20">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Support
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Ticket Detail Panel */}
        {selectedTicket && (
          <div className="hidden lg:block w-1/2 border-l border-[#e2dedc]/20 bg-[#0d1635]">
            <TicketDetail
              ticket={selectedTicket}
              onTicketUpdate={handleTicketUpdate}
              onClose={() => setSelectedTicket(null)}
            />
          </div>
        )}
      </div>

      {/* Mobile Ticket Detail Modal */}
      {selectedTicket && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute inset-0 bg-[#0d1635] overflow-y-auto">
            <div className="sticky top-0 bg-[#0d1635] border-b border-[#e2dedc]/20 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#e2dedc]">Ticket Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTicket(null)}
                className="text-[#e2dedc] hover:bg-[#e2dedc]/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <TicketDetail
                ticket={selectedTicket}
                onTicketUpdate={handleTicketUpdate}
                onClose={() => setSelectedTicket(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicket && (
          <NewTicketModal
            userId={userId}
            onClose={() => setShowNewTicket(false)}
            onTicketCreated={handleNewTicket}
          />
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
