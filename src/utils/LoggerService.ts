import { SENSITIVE_FIELDS } from '../config/constants';

export class LoggerService {
  private static sanitizeData(data: any): any {
    if (!data) return data;
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }
    
    if (typeof data === 'object') {
      const sanitized = { ...data };
      for (const key of Object.keys(sanitized)) {
        if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object') {
          sanitized[key] = this.sanitizeData(sanitized[key]);
        }
      }
      return sanitized;
    }
    
    return data;
  }

  static info(message: string, data?: any) {
    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      data: data ? this.sanitizeData(data) : undefined
    }));
  }

  static error(message: string, error?: Error | any) {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...this.sanitizeData(error)
      } : undefined
    }));
  }

  static warn(message: string, data?: any) {
    console.warn(JSON.stringify({
      level: 'warn',
      timestamp: new Date().toISOString(),
      message,
      data: data ? this.sanitizeData(data) : undefined
    }));
  }

  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({
        level: 'debug',
        timestamp: new Date().toISOString(),
        message,
        data: data ? this.sanitizeData(data) : undefined
      }));
    }
  }
} 