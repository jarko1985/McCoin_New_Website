/**
 * Edge Runtime Compatible Logger
 * Use this in Edge Runtime environments (middleware, edge routes)
 */

// Simple logger for Edge Runtime
const edgeLogger = {
  debug: (data: any, msg?: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${msg || ''}`, data);
    }
  },
  info: (data: any, msg?: string) => {
    console.log(`[INFO] ${msg || ''}`, data);
  },
  warn: (data: any, msg?: string) => {
    console.warn(`[WARN] ${msg || ''}`, data);
  },
  error: (data: any, msg?: string) => {
    console.error(`[ERROR] ${msg || ''}`, data);
  },
  fatal: (data: any, msg?: string) => {
    console.error(`[FATAL] ${msg || ''}`, data);
  },
  child: (bindings: Record<string, any>) => {
    return {
      ...edgeLogger,
      debug: (data: any, msg?: string) => edgeLogger.debug({ ...bindings, ...data }, msg),
      info: (data: any, msg?: string) => edgeLogger.info({ ...bindings, ...data }, msg),
      warn: (data: any, msg?: string) => edgeLogger.warn({ ...bindings, ...data }, msg),
      error: (data: any, msg?: string) => edgeLogger.error({ ...bindings, ...data }, msg),
      fatal: (data: any, msg?: string) => edgeLogger.fatal({ ...bindings, ...data }, msg),
    };
  },
};

export default edgeLogger;

