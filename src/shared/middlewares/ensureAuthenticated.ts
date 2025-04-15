import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { HttpStatusCode } from '../errors/HttpStatusCode';

interface ITokenPayload {
  sub: string;
  tipo: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido', HttpStatusCode.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as ITokenPayload;

    request.user = {
      id: Number(decoded.sub),
      tipo: decoded.tipo,
    };

    return next();
  } catch {
    throw new AppError('Token inválido', HttpStatusCode.UNAUTHORIZED);
  }
} 