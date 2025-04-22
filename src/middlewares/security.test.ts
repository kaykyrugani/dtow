import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Express } from 'express';
import request from 'supertest';
import { createApp } from '../app';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

describe('Middlewares de Segurança', () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  describe('Helmet', () => {
    it('deve incluir headers de segurança', async () => {
      const response = await request(app).get('/api/health');

      // Verifica headers de segurança básicos
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

      // Verifica Content Security Policy
      expect(response.headers['content-security-policy']).toContain("default-src 'self'");
      expect(response.headers['content-security-policy']).toContain("img-src 'self' data: https:");
      expect(response.headers['content-security-policy']).toContain("script-src 'self'");

      // Verifica que o header X-Powered-By não está presente
      expect(response.headers['x-powered-by']).toBeUndefined();
    });
  });

  describe('Rate Limiting', () => {
    it('deve limitar requisições excessivas', async () => {
      // Faz 101 requisições (limite é 100)
      const requests = Array(101)
        .fill(null)
        .map(() => request(app).get('/api/health'));

      const responses = await Promise.all(requests);

      // Verifica que a última requisição foi bloqueada
      const lastResponse = responses[responses.length - 1];
      expect(lastResponse.status).toBe(HttpStatusCode.TOO_MANY_REQUESTS);
      expect(lastResponse.body.message).toBe(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
    });

    it('deve limitar tentativas de autenticação', async () => {
      // Faz 6 tentativas de login (limite é 5)
      const requests = Array(6)
        .fill(null)
        .map(() =>
          request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            senha: 'senha123',
          }),
        );

      const responses = await Promise.all(requests);

      // Verifica que a última tentativa foi bloqueada
      const lastResponse = responses[responses.length - 1];
      expect(lastResponse.status).toBe(HttpStatusCode.TOO_MANY_REQUESTS);
      expect(lastResponse.body.message).toBe(ERROR_MESSAGES.AUTH_LIMIT_EXCEEDED);
    });
  });

  describe('Métodos HTTP Permitidos', () => {
    it('deve permitir métodos HTTP válidos', async () => {
      const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

      for (const method of validMethods) {
        let response;
        if (method === 'GET') {
          response = await request(app).get('/api/health');
        } else if (method === 'POST') {
          response = await request(app).post('/api/health');
        } else if (method === 'PUT') {
          response = await request(app).put('/api/health');
        } else if (method === 'DELETE') {
          response = await request(app).delete('/api/health');
        } else if (method === 'PATCH') {
          response = await request(app).patch('/api/health');
        } else if (method === 'OPTIONS') {
          response = await request(app).options('/api/health');
        }

        // OPTIONS pode retornar 204 ou 200, dependendo da configuração
        if (method === 'OPTIONS' && response) {
          expect([HttpStatusCode.OK, HttpStatusCode.NO_CONTENT]).toContain(response.status);
        } else if (response) {
          // Outros métodos devem retornar 404 (rota não existe) mas não 405 (método não permitido)
          expect(response.status).not.toBe(HttpStatusCode.METHOD_NOT_ALLOWED);
        }
      }
    });

    it('deve bloquear métodos HTTP inválidos', async () => {
      const invalidMethods = ['HEAD', 'TRACE', 'CONNECT'];

      for (const method of invalidMethods) {
        let response;
        if (method === 'HEAD') {
          response = await request(app).head('/api/health');
        } else if (method === 'TRACE') {
          // Supertest não suporta TRACE, então simulamos
          response = await request(app).get('/api/health').set('X-HTTP-Method-Override', 'TRACE');
        } else if (method === 'CONNECT') {
          // Supertest não suporta CONNECT, então simulamos
          response = await request(app).get('/api/health').set('X-HTTP-Method-Override', 'CONNECT');
        }

        if (response) {
          expect(response.status).toBe(HttpStatusCode.METHOD_NOT_ALLOWED);
          expect(response.body.message).toBe(ERROR_MESSAGES.METHOD_NOT_ALLOWED);
        }
      }
    });
  });

  describe('Timeout', () => {
    it('deve encerrar requisições longas', async () => {
      // Adiciona uma rota lenta para teste
      app.get('/api/slow', (req, res) => {
        // Não envia resposta, simulando uma operação longa
        // O timeout deve encerrar após 30s
      });

      // Configura um timeout menor para o teste
      const originalSetTimeout = global.setTimeout;
      const mockSetTimeout = vi.fn().mockImplementation(callback => {
        callback();
        return 1 as any;
      }) as unknown as typeof setTimeout;
      global.setTimeout = mockSetTimeout;

      const response = await request(app).get('/api/slow');

      // Restaura o setTimeout original
      global.setTimeout = originalSetTimeout;

      expect(response.status).toBe(HttpStatusCode.REQUEST_TIMEOUT);
      expect(response.body.message).toBe(ERROR_MESSAGES.REQUEST_TIMEOUT);
    });
  });
});
