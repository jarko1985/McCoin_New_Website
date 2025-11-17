# Pino Logging - Quick Start Guide

## ✅ Installation Complete

The following packages have been installed:
- ✅ `pino` - Fast JSON logger
- ✅ `pino-pretty` - Pretty printing for development
- ✅ `pino-http` - HTTP request logging

## 🚀 Usage Examples

### 1. Basic Logging in API Routes

```typescript
import logger from '@/lib/logger';

export async function GET() {
  logger.info('Processing request');
  logger.error('Something went wrong', error);
  return Response.json({ success: true });
}
```

### 2. Using API Logger Utilities

```typescript
import { createRequestLogger, logError } from '@/lib/api-logger';

export async function POST(req: NextRequest) {
  const logger = createRequestLogger(req);
  
  try {
    logger.info('Processing request');
    // ... your code
  } catch (error) {
    logError(req, error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### 3. Using Convenience Functions

```typescript
import { log } from '@/lib/logger';

log.info('Simple message');
log.error('Error message', error);
log.warn('Warning message');
```

## ⚙️ Configuration

Add to your `.env.local`:

```bash
# Log level (trace, debug, info, warn, error, fatal)
LOG_LEVEL=debug

# Enable file logging in production
LOG_TO_FILE=false

# Enable pretty printing in production
LOG_PRETTY=false
```

## 📁 Files Created

- `src/lib/logger.ts` - Main logger configuration
- `src/lib/api-logger.ts` - API route logging utilities
- `src/lib/logger-config.ts` - Logger configuration constants
- `src/middleware/logger.ts` - HTTP middleware logger
- `src/app/api/example-with-logging/route.ts` - Example usage

## 📚 Full Documentation

See `LOGGING_SETUP.md` for complete documentation.

## 🔄 Next Steps

1. Replace `console.log` with `logger.info` in your API routes
2. Replace `console.error` with `logger.error` or `logError()`
3. Add contextual information to your logs
4. Test in development (logs will be pretty-printed)
5. Configure production logging as needed

## 💡 Tips

- Use `createRequestLogger()` for API routes to automatically include request context
- Use child loggers for adding context that persists across multiple log calls
- Don't log sensitive data (passwords, tokens, etc.)
- Use appropriate log levels (debug for dev, info for production)

