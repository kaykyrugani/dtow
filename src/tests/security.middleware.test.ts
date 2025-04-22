import { describe, it, expect, beforeAll, test, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';
import {
  applySecurityMiddleware,
  securityHeaders,
  allowedMethods,
  timeout,
} from '../middlewares/security';
import logger from '../utils/logger';
import { timeoutMiddleware, sanitizeData } from '../middlewares/securityMiddleware';
import { Request, Response, NextFunction } from 'express';
import { securityMiddleware, sanitizeObject } from '../middlewares/security.middleware';
import { ErrorMessages } from '../utils/errorConstants';
import { REQUEST_TIMEOUT } from '../config/constants';
import { createMockRequest, createMockResponse, mockNext } from './setup';

const app: Express = express();

// Configuração do app para testes
beforeAll(() => {
  // Aplicar middlewares de segurança
  applySecurityMiddleware(app);

  // Aplicar middlewares individualmente para testes específicos
  app.use('/test', securityHeaders);
  app.use('/test', allowedMethods);
  app.use('/test', timeout);

  // Rota de teste
  app.get('/test', (req, res) => {
    res.json({ message: 'ok' });
  });

  // Rota que demora para responder
  app.get('/slow', (req, res) => {
    const timer = setTimeout(() => {
      try {
        res.json({ message: 'slow response' });
      } catch (error) {
        // Ignora erro de headers já enviados
      }
    }, 31000);

    // Limpa o timer se a resposta já foi enviada
    res.on('finish', () => clearTimeout(timer));
  });
});

describe('Middlewares de Segurança', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test',
      headers: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      on: vi.fn(),
      headersSent: false,
    };

    next = vi.fn();
  });

  it('deve incluir headers de segurança básicos', async () => {
    const res = await request(app).get('/test');

    expect(res.headers['x-dns-prefetch-control']).toBe('off');
    expect(res.headers['x-frame-options']).toBe('DENY');
    expect(res.headers['strict-transport-security']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-xss-protection']).toBe('1; mode=block');
  });

  it('deve bloquear métodos HTTP não permitidos', async () => {
    const res = await request(app).trace('/test');
    expect(res.status).toBe(405);
    expect(res.body.erro).toBe('Método não permitido');
  });

  test('deve retornar timeout após 30 segundos', async () => {
    vi.useFakeTimers();

    timeoutMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();

    vi.advanceTimersByTime(31000);

    expect(res.status).toHaveBeenCalledWith(408);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Timeout da requisição',
    });

    vi.useRealTimers();
  });

  test('não deve retornar timeout se a resposta já foi enviada', async () => {
    vi.useFakeTimers();

    res.headersSent = true;

    timeoutMiddleware(req as Request, res as Response, next);

    vi.advanceTimersByTime(31000);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('deve bloquear após exceder limite de requisições', async () => {
    // Fazer 101 requisições
    const promises = Array.from({ length: 101 }, () => request(app).get('/test'));
    await Promise.all(promises);

    const res = await request(app).get('/test');
    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
  });
});

describe('Sanitização de Dados', () => {
  test('deve redactar informações sensíveis', () => {
    const data = {
      senha: 'secret123',
      token: 'sensitive_token',
      cpf: '123.456.789-00',
      authorization: 'Bearer token',
      email: 'test@example.com',
      nome: 'Test User',
    };

    const sanitized = sanitizeData(data);

    expect(sanitized).toEqual({
      senha: '[REDACTED]',
      token: '[REDACTED]',
      cpf: '[REDACTED]',
      authorization: '[REDACTED]',
      email: 'test@example.com',
      nome: 'Test User',
    });
  });

  test('deve redactar arrays de objetos', () => {
    const data = [
      {
        senha: 'secret123',
        nome: 'Test User',
      },
      {
        senha: 'secret456',
        nome: 'Another User',
      },
    ];

    const sanitized = sanitizeData(data);

    expect(sanitized).toEqual([
      {
        senha: '[REDACTED]',
        nome: 'Test User',
      },
      {
        senha: '[REDACTED]',
        nome: 'Another User',
      },
    ]);
  });

  test('deve redactar objetos aninhados', () => {
    const data = {
      user: {
        senha: 'secret123',
        token: 'sensitive_token',
        profile: {
          cpf: '123.456.789-00',
        },
      },
      public: 'data',
    };

    const sanitized = sanitizeData(data);

    expect(sanitized).toEqual({
      user: {
        senha: '[REDACTED]',
        token: '[REDACTED]',
        profile: {
          cpf: '[REDACTED]',
        },
      },
      public: 'data',
    });
  });
});

describe('Logger', () => {
  it('deve redactar informações sensíveis', () => {
    const sensitiveData = {
      password: 'secret123',
      token: 'sensitive_token',
      data: 'public_data',
    };

    const loggedData = logger.info(sensitiveData);
    const logString = JSON.stringify(loggedData);

    expect(logString).not.toContain('secret123');
    expect(logString).not.toContain('sensitive_token');
    expect(logString).toContain('public_data');
  });
});

describe('SecurityMiddleware', () => {
  let req = createMockRequest();
  let res = createMockResponse();

  beforeEach(() => {
    req = createMockRequest();
    res = createMockResponse();
    mockNext.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Timeout Middleware', () => {
    it('deve chamar next com erro de timeout após o tempo limite', () => {
      securityMiddleware.timeout(req, res, mockNext);

      vi.advanceTimersByTime(REQUEST_TIMEOUT);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: ErrorMessages.TIMEOUT_ERROR,
        }),
      );
    });

    it('não deve chamar next se a resposta já foi enviada', () => {
      res.headersSent = true;
      securityMiddleware.timeout(req, res, mockNext);

      vi.advanceTimersByTime(REQUEST_TIMEOUT);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve limpar o timeout quando a resposta é finalizada', () => {
      securityMiddleware.timeout(req, res, mockNext);

      res.emit('finish');
      vi.advanceTimersByTime(REQUEST_TIMEOUT);

      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Data Sanitization', () => {
    it('deve sanitizar dados sensíveis no body', () => {
      const req = createMockRequest({
        body: {
          name: 'Test User',
          password: 'secret123',
          nested: {
            token: 'sensitive-token',
            data: 'safe-data',
          },
        },
      });

      securityMiddleware.sanitizeData(req, res, mockNext);

      expect(req.body).toEqual({
        name: 'Test User',
        password: '[REDACTED]',
        nested: {
          token: '[REDACTED]',
          data: 'safe-data',
        },
      });
    });

    it('deve sanitizar arrays de objetos', () => {
      const req = createMockRequest({
        body: {
          users: [
            { name: 'User 1', password: 'pass1' },
            { name: 'User 2', password: 'pass2' },
          ],
        },
      });

      securityMiddleware.sanitizeData(req, res, mockNext);

      expect(req.body.users).toEqual([
        { name: 'User 1', password: '[REDACTED]' },
        { name: 'User 2', password: '[REDACTED]' },
      ]);
    });
  });

  describe('Security Headers', () => {
    it('deve configurar os headers de segurança corretamente', () => {
      securityMiddleware.securityHeaders(req, res, mockNext);

      expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
      expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
      expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
      expect(res.removeHeader).toHaveBeenCalledWith('X-Powered-By');
    });

    it('deve configurar os headers CORS', () => {
      securityMiddleware.securityHeaders(req, res, mockNext);

      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Methods',
        expect.stringContaining('GET'),
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Headers',
        expect.stringContaining('Authorization'),
      );
    });
  });

  describe('sanitizeObject Function', () => {
    it('deve retornar o mesmo valor para tipos primitivos', () => {
      expect(sanitizeObject('string')).toBe('string');
      expect(sanitizeObject(123)).toBe(123);
      expect(sanitizeObject(null)).toBe(null);
    });

    it('deve sanitizar campos sensíveis em objetos', () => {
      const input = {
        name: 'Test',
        password: 'secret',
        token: '12345',
        data: { key: 'sensitive' },
      };

      const output = sanitizeObject(input);

      expect(output).toEqual({
        name: 'Test',
        password: '[REDACTED]',
        token: '[REDACTED]',
        data: { key: '[REDACTED]' },
      });
    });

    it('deve sanitizar arrays de objetos', () => {
      const input = [
        { name: 'User 1', password: 'pass1' },
        { name: 'User 2', token: 'token2' },
      ];

      const output = sanitizeObject({ items: input });

      expect(output).toEqual({
        items: [
          { name: 'User 1', password: '[REDACTED]' },
          { name: 'User 2', token: '[REDACTED]' },
        ],
      });
    });
  });
});
