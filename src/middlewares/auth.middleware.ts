import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { prisma } from '../config/database';

interface TokenPayload {
  userId: string;
  role: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    ) as TokenPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    request.user = {
      id: decoded.userId,
      role: decoded.role
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

// Extensão do tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
} 