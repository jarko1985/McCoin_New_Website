"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Paperclip, 
  Send, 
  Loader2,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import { Ticket, TicketCategory, TicketPriority } from '@/types/ticket';

interface NewTicketModalProps {
  userId: string;
  onClose: () => void;
  onTicketCreated: (ticket: Ticket) => void;
}

const categories: { value: TicketCategory; label: string; description: string }[] = [
  { value: 'technical', label: 'Technical Issue', description: 'Problems with the platform or features' },
  { value: 'billing', label: 'Billing & Payments', description: 'Questions about charges or payment methods' },
  { value: 'account', label: 'Account Issues', description: 'Login, verification, or account settings' },
  { value: 'general', label: 'General Inquiry', description: 'General questions or information requests' },
  { value: 'feature_request', label: 'Feature Request', description: 'Suggestions for new features or improvements' },
  { value: 'bug_report', label: 'Bug Report', description: 'Report a bug or unexpected behavior' },
];

const priorities: { value: TicketPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
];

export default function NewTicketModal({ userId, onClose, onTicketCreated }: NewTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'general' as TicketCategory,
    priority: 'medium' as TicketPriority,
    environment: '',
    pageUrl: '',
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userId', userId);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('environment', formData.environment);
      formDataToSend.append('pageUrl', formData.pageUrl);
      
      attachments.forEach((file, index) => {
        formDataToSend.append(`attachment_${index}`, file);
      });

      const response = await fetch('/api/tickets', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const newTicket = await response.json();
        onTicketCreated(newTicket);
      } else {
        const error = await response.json();
        setErrors({ submit: error.message || 'Failed to create ticket' });
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
      setErrors({ submit: 'Failed to create ticket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const selectedPriority = priorities.find(pri => pri.value === formData.priority);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#07153B] border border-[#e2dedc]/20 rounded-lg w-full max-w-2xl max-h-[95vh] lg:max-h-[90vh] overflow-hidden mx-2 lg:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-[#e2dedc]/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-semibold text-[#e2dedc]">Create New Ticket</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#e2dedc]/70 hover:text-[#e2dedc]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto max-h-[calc(95vh-120px)] lg:max-h-[calc(90vh-120px)]">
          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2dedc]">
              Subject *
            </label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief description of your issue"
              className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
              maxLength={200}
            />
            {errors.subject && (
              <p className="text-sm text-[#EC3B3B] flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.subject}
              </p>
            )}
            <p className="text-xs text-[#e2dedc]/70">
              {formData.subject.length}/200 characters
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2dedc]">
              Category *
            </label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1635] border-[#e2dedc]/20">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div>
                      <div className="font-medium">{category.label}</div>
                      <div className="text-xs text-[#e2dedc]/70">{category.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2dedc]">
              Priority *
            </label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1635] border-[#e2dedc]/20">
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${priority.color}`}>
                        {priority.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2dedc]">
              Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please provide detailed information about your issue..."
              className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
              rows={6}
            />
            {errors.description && (
              <p className="text-sm text-[#EC3B3B] flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#e2dedc]">
                Environment (Optional)
              </label>
              <Input
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value)}
                placeholder="e.g., Chrome, Windows 10"
                className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#e2dedc]">
                Page URL (Optional)
              </label>
              <Input
                value={formData.pageUrl}
                onChange={(e) => handleInputChange('pageUrl', e.target.value)}
                placeholder="https://example.com/page"
                className="bg-[#0d1635] border-[#e2dedc]/20 text-[#e2dedc] placeholder:text-[#e2dedc]/50"
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#e2dedc]">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-[#e2dedc]/20 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <Paperclip className="h-8 w-8 text-[#e2dedc]/50" />
                <span className="text-sm text-[#e2dedc]/70">
                  Click to upload files or drag and drop
                </span>
                <span className="text-xs text-[#e2dedc]/50">
                  Images, PDFs, documents (max 10MB each)
                </span>
              </label>
            </div>
            
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-[#e2dedc]/5 rounded">
                    <span className="text-sm text-[#e2dedc]">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-[#e2dedc]/70 hover:text-[#EC3B3B]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <Card className="bg-[#0d1635] border-[#e2dedc]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#e2dedc] flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Ticket Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#e2dedc]/70">Category</span>
                <span className="text-[#e2dedc]">{selectedCategory?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#e2dedc]/70">Priority</span>
                <Badge className={`text-xs ${selectedPriority?.color}`}>
                  {selectedPriority?.label}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#e2dedc]/70">Attachments</span>
                <span className="text-[#e2dedc]">{attachments.length} files</span>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-[#EC3B3B]/10 border border-[#EC3B3B]/20 rounded-lg">
              <p className="text-sm text-[#EC3B3B] flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-[#e2dedc] border-[#e2dedc]/20 hover:bg-[#e2dedc]/10 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#117f60] hover:bg-[#117f60]/90 text-white order-1 sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
