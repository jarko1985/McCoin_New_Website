/**
 * Example API route with Pino logging
 * This demonstrates how to use the logger in API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import logger, { log, createChildLogger } from '@/lib/logger';
import { logRequest, logResponse, logError, createRequestLogger } from '@/lib/api-logger';

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const requestLogger = createRequestLogger(req);

  try {
    requestLogger.info('Processing GET request');

    // Example: Log with context
    const userId = req.headers.get('x-user-id');
    if (userId) {
      const userLogger = createChildLogger({ userId });
      userLogger.info('User-specific log');
    }

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 100));

    const response = NextResponse.json({ message: 'Success', timestamp: new Date().toISOString() });
    const duration = Date.now() - startTime;

    logResponse(req, response, duration);
    return response;
  } catch (error) {
    logError(req, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const requestLogger = createRequestLogger(req);

  try {
    const body = await req.json();
    requestLogger.debug({ body }, 'Received POST data');

    // Example: Different log levels
    logger.info('Info level log');
    logger.warn('Warning level log');
    logger.debug('Debug level log');

    // Example: Using convenience log functions
    log.info('User action completed', { action: 'create', resource: 'ticket' });
    log.error('Something went wrong', new Error('Example error'), { context: 'example' });

    return NextResponse.json({ success: true, received: body });
  } catch (error) {
    logError(req, error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

