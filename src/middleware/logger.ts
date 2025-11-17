/**
 * HTTP Request Logger Middleware
 * Uses pino-http for automatic request/response logging
 */

import pinoHttp from 'pino-http';
import logger from '@/lib/logger';

// Custom serializers for request/response
const serializers = {
  req: (req: any) => ({
    id: req.id,
    method: req.method,
    url: req.url,
    headers: {
      host: req.headers.host,
      'user-agent': req.headers['user-agent'],
      'content-type': req.headers['content-type'],
    },
    remoteAddress: req.remoteAddress,
    remotePort: req.remotePort,
  }),
  res: (res: any) => ({
    statusCode: res.statusCode,
    headers: {
      'content-type': res.headers['content-type'],
    },
  }),
  err: (err: any) => ({
    type: err.constructor.name,
    message: err.message,
    stack: err.stack,
  }),
};

// Create pino-http instance
export const httpLogger = pinoHttp({
  logger,
  serializers,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500) {
      return 'error';
    } else if (err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} - ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} - ${res.statusCode} - ${err.message}`;
  },
  // Skip logging for health checks and static assets
  autoLogging: {
    ignore: (req) => {
      const url = req.url || '';
      return (
        url.includes('/_next/') ||
        url.includes('/favicon.ico') ||
        url.includes('/api/health-check')
      );
    },
  },
});

// Export middleware function for Next.js
export default httpLogger;

