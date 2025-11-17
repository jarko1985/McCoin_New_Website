import pino from 'pino';

// Edge Runtime compatible - only use Node.js APIs when needed
// Never call process.cwd() at module level - only inside functions
let logsDir: string | null = null;
let isNodeRuntime: boolean | null = null;

// Helper to check if we're in Node.js runtime (not Edge)
function checkNodeRuntime(): boolean {
  if (isNodeRuntime === null) {
    try {
      // Try to access process.cwd - will throw in Edge Runtime
      if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
        // Test if we can actually call it (won't work in Edge)
        process.cwd();
        isNodeRuntime = true;
      } else {
        isNodeRuntime = false;
      }
    } catch {
      isNodeRuntime = false;
    }
  }
  return isNodeRuntime === true;
}

// Helper to get logs directory (only in Node.js runtime)
function getLogsDir(): string | null {
  if (!checkNodeRuntime()) {
    return null;
  }
  
  if (!logsDir) {
    try {
      // Dynamic require - only executed in Node.js runtime
      const path = require('path');
      const fs = require('fs');
      logsDir = path.join(process.cwd(), 'logs');
      fs.mkdirSync(logsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore
      return null;
    }
  }
  return logsDir;
}

// Determine log level from environment
const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

// Base logger configuration
const baseConfig: pino.LoggerOptions = {
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  // Add custom fields
  base: {
    env: process.env.NODE_ENV || 'development',
    service: 'mccoin-api',
  },
};

// Development configuration with pretty printing
const devConfig: pino.LoggerOptions = {
  ...baseConfig,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      singleLine: false,
      hideObject: false,
      messageFormat: '{levelLabel} - {msg}',
      errorLikeObjectKeys: ['err', 'error'],
    },
  },
};

// Production configuration with file transport
function getProdConfig(): pino.LoggerOptions {
  const config: pino.LoggerOptions = { ...baseConfig };
  
  // Only enable file logging if LOG_TO_FILE is true AND we're in Node.js runtime
  if (process.env.LOG_TO_FILE === 'true') {
    const dir = getLogsDir();
    if (dir) {
      // We're in Node.js runtime, can use file logging
      const { join } = require('path');
      config.transport = {
        targets: [
          // Error logs to separate file
          {
            target: 'pino/file',
            level: 'error',
            options: {
              destination: join(dir, 'error.log'),
              mkdir: true,
            },
          },
          // All logs to combined file
          {
            target: 'pino/file',
            level: 'info',
            options: {
              destination: join(dir, 'combined.log'),
              mkdir: true,
            },
          },
          // Pretty print to console in production (optional)
          ...(process.env.LOG_PRETTY === 'true'
            ? [
                {
                  target: 'pino-pretty',
                  level: 'info',
                  options: {
                    colorize: false,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                },
              ]
            : []),
        ],
      };
    }
    // If dir is null, we're in Edge Runtime - file logging not available, use base config
  }
  
  return config;
}

// Create logger instance
// Lazy initialization to avoid Edge Runtime issues
let loggerInstance: pino.Logger | null = null;

function getLogger(): pino.Logger {
  if (loggerInstance) {
    return loggerInstance;
  }

  // Check if we're in Edge Runtime
  const isEdge = !checkNodeRuntime();

  if (isEdge) {
    // Edge Runtime - use minimal config, no file logging, no transports
    loggerInstance = pino({
      level: logLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      base: {
        env: process.env.NODE_ENV || 'development',
        service: 'mccoin-api',
      },
    });
  } else {
    // Node.js Runtime - use full config (lazy load prod config)
    const prodConfig = getProdConfig();
    loggerInstance = pino(
      process.env.NODE_ENV === 'production' && process.env.LOG_TO_FILE !== 'true'
        ? baseConfig
        : process.env.NODE_ENV === 'production'
          ? prodConfig
          : devConfig
    );
  }

  return loggerInstance;
}

// Export logger instance (lazy initialization)
const logger = new Proxy({} as pino.Logger, {
  get(_target, prop) {
    const logger = getLogger();
    const value = (logger as any)[prop];
    return typeof value === 'function' ? value.bind(logger) : value;
  },
});

// Export logger instance
export default logger;

// Export convenience methods
export const log = {
  info: (msg: string, ...args: any[]) => logger.info(args.length ? { data: args } : {}, msg),
  error: (msg: string, error?: Error | unknown, ...args: any[]) => {
    if (error instanceof Error) {
      logger.error({ err: error, ...(args.length ? { data: args } : {}) }, msg);
    } else {
      logger.error(args.length ? { error, data: args } : { error }, msg);
    }
  },
  warn: (msg: string, ...args: any[]) => logger.warn(args.length ? { data: args } : {}, msg),
  debug: (msg: string, ...args: any[]) => logger.debug(args.length ? { data: args } : {}, msg),
  fatal: (msg: string, error?: Error | unknown, ...args: any[]) => {
    if (error instanceof Error) {
      logger.fatal({ err: error, ...(args.length ? { data: args } : {}) }, msg);
    } else {
      logger.fatal(args.length ? { error, data: args } : { error }, msg);
    }
  },
};

// Export child logger creator for context
export const createChildLogger = (bindings: Record<string, any>) => {
  return logger.child(bindings);
};

