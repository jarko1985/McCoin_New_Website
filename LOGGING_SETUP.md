# Pino Logging System Setup Guide

This document explains how to use the Pino logging system implemented in the McCoin application.

## 📦 Installed Packages

- **pino**: Fast, low overhead JSON logger
- **pino-pretty**: Pretty printing for development
- **pino-http**: HTTP request logging middleware

## 🚀 Quick Start

### Basic Usage

```typescript
import logger from '@/lib/logger';

// Simple logging
logger.info('User logged in');
logger.error('Database connection failed');
logger.warn('Rate limit approaching');
logger.debug('Processing request');

// Logging with context
logger.info({ userId: '123', action: 'login' }, 'User action');
logger.error({ err: error, userId: '123' }, 'Error occurred');
```

### Using Convenience Functions

```typescript
import { log } from '@/lib/logger';

log.info('Simple info message');
log.error('Error message', error, { additional: 'context' });
log.warn('Warning message', { data: 'context' });
log.debug('Debug message');
log.fatal('Fatal error', error);
```

## 📝 API Route Logging

### Method 1: Manual Logging

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createRequestLogger, logError, logResponse } from '@/lib/api-logger';

export async function POST(req: NextRequest) {
  const logger = createRequestLogger(req, { endpoint: 'my-endpoint' });
  const startTime = Date.now();

  try {
    logger.info('Processing request');
    
    // Your logic here
    const result = await doSomething();
    
    const response = NextResponse.json(result);
    logResponse(req, response, Date.now() - startTime);
    return response;
  } catch (error) {
    logError(req, error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Method 2: Using Child Loggers

```typescript
import { NextRequest, NextResponse } from 'next/server';
import logger, { createChildLogger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  const requestLogger = createChildLogger({
    method: req.method,
    path: req.nextUrl.pathname,
    userId,
  });

  requestLogger.info('Request received');
  // ... your code
}
```

## 🎯 Log Levels

The logger supports the following levels (from lowest to highest priority):

1. **trace** - Very detailed debugging information
2. **debug** - Debugging information
3. **info** - General informational messages (default in production)
4. **warn** - Warning messages
5. **error** - Error messages
6. **fatal** - Fatal errors that cause the application to crash

### Setting Log Level

Set the `LOG_LEVEL` environment variable:

```bash
# .env.local
LOG_LEVEL=debug  # or trace, info, warn, error, fatal
```

Default:
- **Development**: `debug`
- **Production**: `info`

## 🔧 Configuration

### Environment Variables

```bash
# Log level (trace, debug, info, warn, error, fatal)
LOG_LEVEL=info

# Enable file logging in production
LOG_TO_FILE=true

# Enable pretty printing in production (optional)
LOG_PRETTY=true

# Node environment
NODE_ENV=production
```

### Development Mode

In development, logs are automatically pretty-printed to the console with colors and readable formatting.

### Production Mode

In production:
- Logs are output as JSON (structured logging)
- If `LOG_TO_FILE=true`, logs are written to:
  - `logs/error.log` - Error and fatal logs only
  - `logs/combined.log` - All logs (info and above)
- Console output is still available for containerized deployments

## 📁 File Structure

```
src/
├── lib/
│   ├── logger.ts              # Main logger configuration
│   ├── logger-config.ts        # Logger configuration constants
│   └── api-logger.ts          # API route logging utilities
├── middleware/
│   └── logger.ts              # HTTP middleware logger (for Express-style apps)
└── middleware.ts              # Next.js middleware with logging

logs/                          # Log files (created automatically)
├── error.log                  # Error logs only
└── combined.log               # All logs
```

## 🔄 Migrating from console.log

### Before (console.log)
```typescript
console.log('User logged in:', userId);
console.error('Error:', error);
```

### After (Pino)
```typescript
import logger from '@/lib/logger';

logger.info({ userId }, 'User logged in');
logger.error({ err: error }, 'Error occurred');
```

### Benefits
- ✅ Structured logging (JSON format)
- ✅ Log levels (filter by severity)
- ✅ Performance (much faster than console.log)
- ✅ Production-ready (file logging, rotation)
- ✅ Contextual information (request IDs, user IDs, etc.)

## 📊 Logging Best Practices

### 1. Include Context
```typescript
// ❌ Bad
logger.error('Failed');

// ✅ Good
logger.error({ userId, action: 'payment', orderId }, 'Payment processing failed');
```

### 2. Use Appropriate Log Levels
```typescript
logger.debug('Detailed debugging info');  // Development only
logger.info('User action completed');      // Important events
logger.warn('Rate limit approaching');    // Warnings
logger.error('Operation failed', error);   // Errors
logger.fatal('Application crash', error); // Fatal errors
```

### 3. Don't Log Sensitive Data
```typescript
// ❌ Bad - Don't log passwords, tokens, etc.
logger.info({ password, token }, 'User data');

// ✅ Good - Log identifiers only
logger.info({ userId, email }, 'User logged in');
```

### 4. Use Child Loggers for Context
```typescript
const userLogger = createChildLogger({ userId: '123' });
userLogger.info('Action 1'); // Automatically includes userId
userLogger.info('Action 2'); // Automatically includes userId
```

## 🛠️ Advanced Usage

### Custom Transports

To add custom transports (e.g., send logs to external service):

```typescript
// src/lib/logger.ts
import pino from 'pino';

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'info',
        options: { /* ... */ }
      },
      {
        target: 'pino/file',
        level: 'error',
        options: { destination: 'logs/error.log' }
      },
      // Add your custom transport here
    ]
  }
});
```

### Log Rotation

For log rotation, consider using `pino-roll` or similar:

```bash
npm install pino-roll
```

### Integration with Monitoring Services

Pino logs are JSON, making them easy to integrate with:
- **Datadog**
- **Splunk**
- **ELK Stack**
- **CloudWatch**
- **Loggly**

## 🧪 Testing

Logs are automatically suppressed in test environments. To enable:

```typescript
// In your test setup
process.env.LOG_LEVEL = 'silent'; // or 'error' for errors only
```

## 📚 Examples

See `src/app/api/example-with-logging/route.ts` for a complete example of API route logging.

## 🔍 Viewing Logs

### Development
Logs appear in your terminal/console with pretty formatting.

### Production
```bash
# View error logs
tail -f logs/error.log

# View all logs
tail -f logs/combined.log

# Search logs
grep "userId:123" logs/combined.log

# View logs with jq (pretty JSON)
cat logs/combined.log | jq
```

## 🚨 Troubleshooting

### Logs not appearing
1. Check `LOG_LEVEL` environment variable
2. Verify logger is imported correctly
3. Check file permissions for log directory

### Performance issues
- Pino is very fast, but if you have issues:
  - Reduce log level in production
  - Use async logging (default)
  - Consider log sampling for high-volume endpoints

## 📖 Additional Resources

- [Pino Documentation](https://getpino.io/)
- [Pino Best Practices](https://getpino.io/#/docs/best-practices)
- [Structured Logging Guide](https://www.structuredlogs.org/)

