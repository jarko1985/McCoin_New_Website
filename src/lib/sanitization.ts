/**
 * Sanitization utilities using isomorphic-dompurify
 * Works in both browser and Node.js environments
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize plain text strings (removes all HTML)
 * Use for: names, emails, phone numbers, etc.
 */
export function sanitizePlainString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove all HTML tags and decode entities
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true, // Keep text content but remove tags
  });

  // Trim whitespace
  return sanitized.trim();
}

/**
 * Sanitize rich text (allows safe HTML)
 * Use for: messages, descriptions, comments, etc.
 */
export function sanitizeRichText(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Allow safe HTML tags and attributes
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'code', 'pre', 'a',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });

  return sanitized.trim();
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove all HTML and trim
  const sanitized = sanitizePlainString(input);
  
  // Convert to lowercase
  return sanitized.toLowerCase();
}

/**
 * Sanitize phone number (remove all non-digit characters except +)
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML first
  const sanitized = sanitizePlainString(input);
  
  // Keep only digits, spaces, hyphens, parentheses, and +
  return sanitized.replace(/[^\d\s\-()\+]/g, '');
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  const sanitized = sanitizePlainString(input);
  
  // Basic URL validation - ensure it starts with http:// or https://
  if (sanitized && !sanitized.match(/^https?:\/\//i)) {
    return `https://${sanitized}`;
  }
  
  return sanitized;
}

/**
 * Remove control characters and normalize whitespace
 */
export function normalizeWhitespace(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove control characters (except newlines and tabs)
  let normalized = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize whitespace (multiple spaces to single space)
  normalized = normalized.replace(/[ \t]+/g, ' ');
  
  // Remove leading/trailing whitespace from each line
  normalized = normalized.split('\n').map(line => line.trim()).join('\n');
  
  return normalized.trim();
}

