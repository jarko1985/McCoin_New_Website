import { z } from 'zod';
import mongoose from 'mongoose';

/**
 * Common validation schemas for reuse across the application
 */

// Email validation
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .toLowerCase()
  .trim()
  .max(255, 'Email must be less than 255 characters');

// Password validation with strength requirements
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character');

// Name validation
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .trim()
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// MongoDB ObjectId validation
export const objectIdSchema = z
  .string()
  .refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    'Invalid ID format'
  );

// Ticket ID validation (hex string)
export const ticketIdSchema = z
  .string()
  .regex(/^[a-f0-9]{32}$/, 'Invalid ticket ID format')
  .min(32)
  .max(32);

// Ticket category enum
export const ticketCategorySchema = z.enum([
  'technical',
  'billing',
  'account',
  'general',
  'feature_request',
  'bug_report',
]);

// Ticket priority enum
export const ticketPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'urgent',
]);

// Ticket status enum
export const ticketStatusSchema = z.enum([
  'open',
  'in_progress',
  'awaiting_user',
  'resolved',
  'closed',
]);

// Subject/title validation
export const subjectSchema = z
  .string()
  .min(3, 'Subject must be at least 3 characters')
  .max(200, 'Subject must be less than 200 characters')
  .trim();

// Description/content validation
export const descriptionSchema = z
  .string()
  .min(10, 'Description must be at least 10 characters')
  .max(10000, 'Description must be less than 10000 characters')
  .trim();

// Comment content validation
export const commentContentSchema = z
  .string()
  .min(1, 'Comment cannot be empty')
  .max(5000, 'Comment must be less than 5000 characters')
  .trim();

// Phone number validation (basic)
export const phoneSchema = z
  .string()
  .min(7, 'Phone number must be at least 7 characters')
  .max(20, 'Phone number must be less than 20 characters')
  .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters')
  .trim();

// URL validation
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL must be less than 2048 characters')
  .trim()
  .optional();

// Token validation (for reset tokens, verification tokens, etc.)
export const tokenSchema = z
  .string()
  .min(32, 'Token must be at least 32 characters')
  .max(256, 'Token must be less than 256 characters')
  .regex(/^[a-f0-9]+$/, 'Token must be a valid hex string');

// 2FA token validation (6-digit TOTP)
export const totpTokenSchema = z
  .string()
  .regex(/^\d{6}$/, '2FA token must be 6 digits')
  .length(6);

/**
 * Sanitization utilities
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Uses dynamic import to avoid SSR/Edge runtime issues
 */
export async function sanitizeHtml(html: string): Promise<string> {
  // Dynamic import to avoid issues in production builds
  const DOMPurify = (await import('isomorphic-dompurify')).default;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [], // No HTML tags allowed by default
    ALLOWED_ATTR: [],
  });
}

/**
 * Synchronous version for backward compatibility
 * Falls back to basic sanitization if DOMPurify fails
 */
export function sanitizeHtmlSync(html: string): string {
  // Basic sanitization - remove HTML tags
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&[^;]+;/g, '') // Remove HTML entities
    .trim();
}

/**
 * Sanitize plain text (remove potentially dangerous characters)
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

/**
 * Sanitize user input for database queries (prevent NoSQL injection)
 */
export function sanitizeForQuery(input: string): string {
  // Remove MongoDB operators
  return input.replace(/[$]|\./g, '');
}

/**
 * Validation schemas for specific endpoints
 */

// Signup schema
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  recaptchaToken: z.string().optional(),
});

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = z.object({
  token: tokenSchema,
  email: emailSchema,
  newPassword: passwordSchema,
});

// Verify email schema
export const verifyEmailSchema = z.object({
  token: tokenSchema,
  email: emailSchema,
});

// Resend verification email schema
export const resendVerificationSchema = z.object({
  email: emailSchema,
});

// Ticket creation schema
export const createTicketSchema = z.object({
  subject: subjectSchema,
  description: descriptionSchema,
  category: ticketCategorySchema,
  priority: ticketPrioritySchema,
  environment: z.string().max(100).trim().optional(),
  pageUrl: urlSchema,
});

// Ticket update schema
export const updateTicketSchema = z.object({
  subject: subjectSchema.optional(),
  description: descriptionSchema.optional(),
  category: ticketCategorySchema.optional(),
  priority: ticketPrioritySchema.optional(),
  status: ticketStatusSchema.optional(),
});

// Comment schema
export const commentSchema = z.object({
  content: commentContentSchema,
  isInternal: z.boolean().default(false),
});

// 2FA setup schema (no input needed, but for consistency)
export const twoFactorSetupSchema = z.object({});

// 2FA verify schema
export const twoFactorVerifySchema = z.object({
  token: totpTokenSchema,
});

// 2FA verify login schema
export const twoFactorVerifyLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  token: totpTokenSchema,
});

/**
 * Helper function to validate and sanitize input
 */
export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    return { success: false, error: result.error };
  }
  
  return { success: true, data: result.data };
}

/**
 * Helper to get validation error message
 */
export function getValidationErrorMessage(error: z.ZodError): string {
  const firstError = error.errors[0];
  return firstError?.message || 'Validation failed';
}

