/**
 * Shared Zod schemas with sanitization transforms
 * Use these schemas in both client-side forms and server-side validation
 */

import { z } from 'zod';
import {
  sanitizePlainString,
  sanitizeRichText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUrl,
  normalizeWhitespace,
} from './sanitization';

/**
 * Base string schema with plain text sanitization
 */
export const plainStringSchema = (minLength = 1, maxLength?: number) => {
  let schema: z.ZodString = z.string();
  
  if (minLength > 0) {
    schema = schema.min(minLength, `Must be at least ${minLength} characters`);
  }
  
  if (maxLength) {
    schema = schema.max(maxLength, `Must be at most ${maxLength} characters`);
  }
  
  // Apply sanitization transform after validation
  return schema.transform(sanitizePlainString);
};

/**
 * Rich text schema with HTML sanitization
 */
export const richTextSchema = (minLength = 1, maxLength?: number) => {
  let schema: z.ZodString = z.string();
  
  if (minLength > 0) {
    schema = schema.min(minLength, `Must be at least ${minLength} characters`);
  }
  
  if (maxLength) {
    schema = schema.max(maxLength, `Must be at most ${maxLength} characters`);
  }
  
  // Apply sanitization transform after validation
  return schema.transform(sanitizeRichText);
};

/**
 * Email schema with sanitization
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .transform(sanitizeEmail);

/**
 * Phone number schema with sanitization
 */
export const phoneSchema = (minLength = 7) => {
  return z
    .string()
    .min(minLength, `Phone number must be at least ${minLength} digits`)
    .transform(sanitizePhone);
};

/**
 * URL schema with sanitization
 */
export const urlSchema = z
  .string()
  .url('Invalid URL')
  .transform(sanitizeUrl)
  .optional();

/**
 * Name schema (first name, last name, full name)
 */
export const nameSchema = (minLength = 2, maxLength = 100) => {
  let schema: z.ZodString = z.string()
    .min(minLength, `Name must be at least ${minLength} characters`)
    .max(maxLength, `Name must be at most ${maxLength} characters`)
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods');
  
  return schema.transform(sanitizePlainString);
};

/**
 * Password schema
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character')
  .transform(sanitizePlainString);

/**
 * Common form schemas
 */

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema(2, 100),
  email: emailSchema,
  phone: phoneSchema(10),
  subject: plainStringSchema(5, 200),
  message: richTextSchema(10, 5000),
});

// Job application form schema
export const applyFormSchema = z.object({
  fullName: nameSchema(2, 100),
  email: emailSchema,
  phone: phoneSchema(7),
  visaStatus: plainStringSchema(1, 50),
  salaryExpectations: plainStringSchema(1, 100),
  availability: plainStringSchema(1, 100),
  resume: z.any().refine(
    (file) => file?.[0] || file instanceof File,
    { message: 'Resume file is required' }
  ).refine(
    (file) => {
      const fileObj = file?.[0] || file;
      return !fileObj || fileObj.type === 'application/pdf';
    },
    { message: 'Only PDF files are allowed' }
  ).refine(
    (file) => {
      const fileObj = file?.[0] || file;
      return !fileObj || fileObj.size <= 5 * 1024 * 1024;
    },
    { message: 'File size must be less than 5MB' }
  ),
});

// Signup form schema (for client-side validation with all fields)
export const signupFormSchema = z
  .object({
    name: nameSchema(2, 100),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().transform(sanitizePlainString),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Signup API schema (for server-side validation - only fields sent to API)
export const signupApiSchema = z.object({
  name: nameSchema(2, 100),
  email: emailSchema,
  password: passwordSchema,
  // confirmPassword and acceptTerms are client-side only validations
});

// Login password schema (password doesn't need full validation on login)
export const loginPasswordSchema = z
  .string()
  .min(1, 'Password is required')
  .transform(sanitizePlainString);

// Login form schema
export const loginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

// KYC verification form schema
export const kycVerificationSchema = z.object({
  introConfirmed: z.boolean().refine((v) => v === true, {
    message: 'You must acknowledge the introduction to continue',
  }),
  firstName: nameSchema(2, 50),
  lastName: nameSchema(2, 50),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .transform(sanitizePlainString)
    .refine(
      (dateString: string) => {
        const birthDate = new Date(dateString);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        const exactAge = age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);
        return exactAge >= 18;
      },
      {
        message: 'You must be at least 18 years old to proceed',
      }
    ),
  country: plainStringSchema(1, 100),
  documentType: z.enum(['passport', 'driver_license', 'national_id']).optional(),
  documentFront: z.instanceof(File).optional(),
  documentBack: z.instanceof(File).optional(),
  selfie: z.instanceof(File).optional(),
});

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset password form schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required').transform(sanitizePlainString),
    email: emailSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().transform(sanitizePlainString),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Ticket creation schema
export const ticketFormSchema = z.object({
  userId: z.string().min(1, 'User ID is required').transform(sanitizePlainString),
  subject: plainStringSchema(1, 200),
  description: richTextSchema(10, 5000),
  category: z.enum(['technical', 'billing', 'account', 'general', 'feature_request', 'bug_report']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  environment: plainStringSchema(0, 100).optional(),
  pageUrl: urlSchema.optional(),
});

// Export types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ApplyFormData = z.infer<typeof applyFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type SignupApiData = z.infer<typeof signupApiSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type KYCVerificationData = z.infer<typeof kycVerificationSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type TicketFormData = z.infer<typeof ticketFormSchema>;

