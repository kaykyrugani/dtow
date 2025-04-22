import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../services/logger.service';
import { MetricsService } from '../services/metrics.service';
import { AppError } from '../errors/AppError';
import { prisma } from '../config/database';
import { LoggingService } from '../services/LoggingService';
import { env } from '../config/validateEnv';
import { verify, sign } from 'jsonwebtoken';

const logger = LoggingService.getInstance();

interface TokenPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extensão do tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      if (!token) {
        throw new UnauthorizedException('Token não fornecido');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      req['user'] = payload;
      MetricsService.incrementAuthSuccess();

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new AppError('Usuário não encontrado', 401);
      }

      // Verifica se o token está próximo de expirar (menos de 30 minutos)
      const tokenExp = payload.exp || 0;
      const now = Math.floor(Date.now() / 1000);
      const thirtyMinutes = 30 * 60;

      if (tokenExp - now < thirtyMinutes) {
        // Renova o token
        const newToken = sign({ userId: payload.userId, role: payload.role }, env.JWT_SECRET, {
          expiresIn: env.JWT_EXPIRES_IN,
        });

        // Adiciona o novo token ao cabeçalho de resposta
        res.setHeader('X-New-Token', newToken);
        logger.info('Token renovado para o usuário', { userId: payload.userId });
      }

      // Adiciona o usuário à requisição
      req.user = {
        id: payload.userId,
        role: payload.role,
      };

      return next();
    } catch (error) {
      MetricsService.incrementAuthFailure();
      this.logger.error('Erro de autenticação', {
        error: error.message,
        path: req.path,
        method: req.method,
        requestId: req['requestId'],
      });
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// Middleware para verificar permissões de administrador
export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  await ensureAuthenticated(request, response, () => {
    if (request.user.role !== 'admin') {
      throw new AppError('Acesso negado: permissão de administrador necessária', 403);
    }
    return next();
  });
}
