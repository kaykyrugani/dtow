import { Request, Response, NextFunction } from 'express'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.usuario || req.usuario.tipo !== 'admin') {
    throw new Error('Proibido')
  }
  next()
} 