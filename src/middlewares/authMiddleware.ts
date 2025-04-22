import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        nome: string;
        tipoUsuario: string;
      };
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Token não fornecido', 401));
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET || '') as {
      id: number;
    };

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        nome: true,
        tipoUsuario: true,
      },
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
}
