import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

describe('Autenticação (E2E)', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = container.resolve('PrismaClient');
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /auth/register', () => {
    const dadosRegistro = {
      nome: 'Teste Integração',
      email: 'teste.integracao@email.com',
      senha: 'Senha123',
      tipoUsuario: 'CLIENTE'
    };

    it('deve registrar um novo usuário', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(dadosRegistro);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(dadosRegistro.email);
    });

    it('deve retornar erro quando email já existe', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(dadosRegistro);

      expect(response.status).toBe(409);
    });
  });

  describe('POST /auth/login', () => {
    const dadosLogin = {
      email: 'teste.integracao@email.com',
      senha: 'Senha123'
    };

    it('deve fazer login com sucesso', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send(dadosLogin);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('usuario');
    });

    it('deve retornar erro com credenciais inválidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          ...dadosLogin,
          senha: 'senha_errada'
        });

      expect(response.status).toBe(401);
    });
  });
}); 