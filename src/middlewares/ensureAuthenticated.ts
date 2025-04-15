import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../errors/AppError';
import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
      };
    }
  }
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const prisma = container.resolve(PrismaClient);

    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { usuario: true }
    });

    if (!refreshToken) {
      throw new AppError('Token inválido', 401);
    }

    if (refreshToken.expiresAt < new Date()) {
      throw new AppError('Token expirado', 401);
    }

    req.user = {
      id: refreshToken.usuario.id
    };

    return next();
  } catch (error) {
    throw new AppError('Token inválido', 401);
  }
} 