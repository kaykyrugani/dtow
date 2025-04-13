import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { SecurityMiddleware } from '../../middlewares/security.middleware';

describe('SecurityMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      url: '/test',
      headers: {
        authorization: 'Bearer token123',
        'content-type': 'application/json'
      },
      body: {
        senha: '123456',
        email: 'test@example.com'
      },
      query: {
        cpf: '123.456.789-00',
        nome: 'Test User'
      }
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      headersSent: false,
      on: vi.fn(),
    };

    next = vi.fn();
  });

  describe('timeoutMiddleware', () => {
    it('deve retornar 408 após timeout', () => {
      // Arrange
      vi.useFakeTimers();

      // Act
      SecurityMiddleware.timeoutMiddleware(req as Request, res as Response, next);
      vi.advanceTimersByTime(5000);

      // Assert
      expect(res.status).toHaveBeenCalledWith(408);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Request Timeout',
        message: 'A requisição excedeu o tempo limite'
      });

      vi.useRealTimers();
    });

    it('não deve retornar timeout se a resposta já foi enviada', () => {
      // Arrange
      vi.useFakeTimers();
      res.headersSent = true;

      // Act
      SecurityMiddleware.timeoutMiddleware(req as Request, res as Response, next);
      vi.advanceTimersByTime(5000);

      // Assert
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();

      vi.useRealTimers();
    });
  });

  describe('sanitizeLog', () => {
    it('deve redactar campos sensíveis', () => {
      // Act
      const sanitized = SecurityMiddleware.sanitizeLog({
        senha: '123456',
        cpf: '123.456.789-00',
        token: 'abc123',
        email: 'test@example.com'
      });

      // Assert
      expect(sanitized).toEqual({
        senha: '[REDACTED]',
        cpf: '[REDACTED]',
        token: '[REDACTED]',
        email: 'test@example.com'
      });
    });

    it('deve redactar campos sensíveis em objetos aninhados', () => {
      // Act
      const sanitized = SecurityMiddleware.sanitizeLog({
        user: {
          senha: '123456',
          cpf: '123.456.789-00'
        },
        data: {
          email: 'test@example.com'
        }
      });

      // Assert
      expect(sanitized).toEqual({
        user: {
          senha: '[REDACTED]',
          cpf: '[REDACTED]'
        },
        data: {
          email: 'test@example.com'
        }
      });
    });
  });

  describe('loggerMiddleware', () => {
    it('deve logar requisições com dados sanitizados', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'log');
      vi.useFakeTimers();
      const now = new Date();
      vi.setSystemTime(now);

      // Act
      SecurityMiddleware.loggerMiddleware(req as Request, res as Response, next);
      
      // Simula o fim da requisição
      const finishCallback = (res.on as jest.Mock).mock.calls[0][1];
      finishCallback();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[REDACTED]')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.not.stringContaining('123456')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.not.stringContaining('123.456.789-00')
      );

      vi.useRealTimers();
    });
  });
}); 