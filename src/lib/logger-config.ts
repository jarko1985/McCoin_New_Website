/**
 * Logger Configuration
 * 
 * Environment Variables:
 * - LOG_LEVEL: Set log level (trace, debug, info, warn, error, fatal) - default: 'info' in prod, 'debug' in dev
 * - LOG_TO_FILE: Set to 'true' to enable file logging in production
 * - LOG_PRETTY: Set to 'true' to enable pretty printing in production
 * - NODE_ENV: Environment (development, production)
 */

export const loggerConfig = {
  // Log levels
  levels: {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  } as const,

  // Default log level based on environment
  defaultLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  // File paths
  logDir: 'logs',
  errorLogFile: 'logs/error.log',
  combinedLogFile: 'logs/combined.log',
  accessLogFile: 'logs/access.log',

  // Log rotation settings (if using pino-roll)
  rotation: {
    maxSize: '10M',
    maxFiles: '5',
  },
};

