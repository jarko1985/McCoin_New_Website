/**
 * HTML escaping utility for safe rendering
 * Always escape user input when rendering in HTML
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escape HTML attributes
 */
export function escapeHtmlAttribute(text: string): string {
  return escapeHtml(text).replace(/\n/g, '&#10;').replace(/\r/g, '&#13;');
}

