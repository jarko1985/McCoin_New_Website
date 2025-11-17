/**
 * API Route Logger Utility
 * Provides request/response logging for Next.js API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import logger, { createChildLogger } from './logger';

export interface LogContext {
  method?: string;
  url?: string;
  path?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: any;
}

/**
 * Create a child logger with request context
 */
export function createRequestLogger(req: NextRequest, additionalContext?: LogContext) {
  const url = new URL(req.url);
  const context: LogContext = {
    method: req.method,
    url: req.url,
    path: url.pathname,
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    userAgent: req.headers.get('user-agent') || undefined,
    ...additionalContext,
  };

  return createChildLogger(context);
}

/**
 * Log API request
 */
export function logRequest(req: NextRequest, context?: LogContext) {
  const requestLogger = createRequestLogger(req, context);
  requestLogger.info('API request received');
  return requestLogger;
}

/**
 * Log API response
 */
export function logResponse(
  req: NextRequest,
  res: NextResponse,
  duration?: number,
  context?: LogContext
) {
  const requestLogger = createRequestLogger(req, context);
  const logData: any = {
    status: res.status,
    statusText: res.statusText,
  };

  if (duration !== undefined) {
    logData.duration = `${duration}ms`;
  }

  if (res.status >= 500) {
    requestLogger.error(logData, 'API request failed');
  } else if (res.status >= 400) {
    requestLogger.warn(logData, 'API request client error');
  } else {
    requestLogger.info(logData, 'API request successful');
  }
}

/**
 * Log API error
 */
export function logError(req: NextRequest, error: Error | unknown, context?: LogContext) {
  const requestLogger = createRequestLogger(req, context);
  if (error instanceof Error) {
    requestLogger.error({ err: error }, 'API request error');
  } else {
    requestLogger.error({ error }, 'API request error');
  }
}

/**
 * Wrapper for API route handlers with automatic logging
 */
export function withLogging<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  options?: { logRequestBody?: boolean; logResponseBody?: boolean }
): T {
  return (async (...args: Parameters<T>) => {
    const req = args[0] as NextRequest;
    const startTime = Date.now();
    const requestLogger = logRequest(req);

    try {
      // Log request body if enabled (be careful with sensitive data)
      if (options?.logRequestBody) {
        try {
          const clonedReq = req.clone();
          const body = await clonedReq.json().catch(() => null);
          if (body) {
            requestLogger.debug({ body }, 'Request body');
          }
        } catch {
          // Ignore body parsing errors
        }
      }

      const response = await handler(...args);
      const duration = Date.now() - startTime;

      // Log response body if enabled (be careful with sensitive data)
      if (options?.logResponseBody) {
        try {
          const clonedRes = response.clone();
          const body = await clonedRes.json().catch(() => null);
          if (body) {
            requestLogger.debug({ body }, 'Response body');
          }
        } catch {
          // Ignore body parsing errors
        }
      }

      logResponse(req, response, duration);
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      logError(req, error, { duration: `${duration}ms` });
      throw error;
    }
  }) as T;
}

