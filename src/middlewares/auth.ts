import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

interface TokenPayload {
  id: number;
  tipoUsuario: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        tipo: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Não autorizado');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new Error('Não autorizado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      tipo: string;
    };

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
    });

    if (!usuario) {
      throw new Error('Não autorizado');
    }

    req.usuario = {
      id: usuario.id,
      tipo: usuario.tipoUsuario,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.usuario || req.usuario.tipo !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  return next();
};

// Tipos personalizados para o Express
declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        tipo: string;
      };
    }
  }
}
