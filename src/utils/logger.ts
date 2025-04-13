import pino from 'pino';
import safeStringify from 'safe-stable-stringify';

const sensitiveFields = ['senha', 'password', 'token', 'authorization', 'cookie'];

const redactFields = (obj: Record<string, any> | any[]): Record<string, any> | any[] => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const filtered: Record<string, any> = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (sensitiveFields.includes(key.toLowerCase())) {
      filtered[key] = '[REDACTED]';
    } else if (typeof obj[key] === 'object') {
      filtered[key] = redactFields(obj[key]);
    } else {
      filtered[key] = obj[key];
    }
  }
  
  return filtered;
};

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  serializers: {
    req: (req) => ({
      method: req?.method,
      url: req?.url,
      headers: redactFields(req?.headers || {}),
      body: redactFields(req?.body || {}),
    }),
    res: (res) => ({
      statusCode: res?.statusCode,
    }),
    err: (err) => ({
      type: err?.type,
      message: err?.message,
      stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
    }),
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const sanitizeLog = (data: Record<string, any>): string => {
  const sanitized = redactFields(data);
  return safeStringify(sanitized) || '';
};

export default logger; 