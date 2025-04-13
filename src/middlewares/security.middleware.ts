import { Request, Response, NextFunction } from 'express';

const TIMEOUT_MS = 5000;
const SENSITIVE_FIELDS = ['senha', 'token', 'cpf', 'password', 'authorization'];

export class SecurityMiddleware {
  static timeoutMiddleware(req: Request, res: Response, next: NextFunction) {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({ 
          error: 'Request Timeout',
          message: 'A requisição excedeu o tempo limite'
        });
      }
    }, TIMEOUT_MS);

    res.on('finish', () => clearTimeout(timeout));
    next();
  }

  static sanitizeLog(data: Record<string, any>): Record<string, any> {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        acc[key] = SecurityMiddleware.sanitizeLog(value);
      } else {
        acc[key] = SENSITIVE_FIELDS.includes(key.toLowerCase()) 
          ? '[REDACTED]' 
          : value;
      }
      return acc;
    }, {} as Record<string, any>);
  }

  static loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const sanitizedReq = {
        method: req.method,
        url: req.url,
        query: SecurityMiddleware.sanitizeLog(req.query),
        body: SecurityMiddleware.sanitizeLog(req.body),
        headers: SecurityMiddleware.sanitizeLog(req.headers)
      };

      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        duration,
        request: sanitizedReq,
        response: {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage
        }
      }, null, 2));
    });

    next();
  }
} 