import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { getPrismaInstance } from '../config/prisma';

interface JWTPayload {
  id: number;
  email: string;
  tipoUsuario: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError('Token ausente', 401));
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as JWTPayload;

    const prisma = getPrismaInstance();
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nome: true,
        email: true,
        tipoUsuario: true
      }
    });

    if (!user) {
      return next(new AppError('Usuário não encontrado', 401));
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError('Token expirado', 401));
    }
    if (error instanceof JsonWebTokenError) {
      return next(new AppError('Token inválido', 401));
    }
    return next(new AppError('Erro na autenticação', 401));
  }
}; 