import compression from 'compression';
import { Request, Response, NextFunction } from 'express';

export const compressionMiddleware = (level: number = 6) => {
  return compression({
    level,
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  });
};
