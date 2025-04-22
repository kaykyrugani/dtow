import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../../app';
import prisma from '../../lib/prisma';
import { createTestUser, generateAuthToken } from '../helpers/testData';
import request from 'supertest';

describe('Address Integration Tests', () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const user = await createTestUser({
      nome: 'Test User',
      email: 'test@example.com',
      senha: 'password123',
      cpf: '12345678900',
    });
    userId = user.id;
    token = generateAuthToken(user);
  });

  afterAll(async () => {
    await prisma.endereco.deleteMany({
      where: { usuarioId: userId },
    });
    await prisma.usuario.delete({
      where: { id: userId },
    });
  });

  describe('POST /addresses', () => {
    it('deve criar um novo endereço com sucesso', async () => {
      const response = await request(app)
        .post('/addresses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          cep: '12345678',
          rua: 'Rua Teste',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('deve retornar erro ao criar endereço com dados inválidos', async () => {
      const response = await request(app)
        .post('/addresses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          cep: '123',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        });

      expect(response.status).toBe(400);
    });

    it('deve retornar erro ao criar endereço sem autenticação', async () => {
      const response = await request(app).post('/addresses').send({
        cep: '12345678',
        rua: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
      });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /addresses', () => {
    it('deve listar endereços do usuário com sucesso', async () => {
      const response = await request(app).get('/addresses').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar erro ao listar endereços sem autenticação', async () => {
      const response = await request(app).get('/addresses');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /addresses/:id', () => {
    let addressId: number;

    beforeAll(async () => {
      const address = await prisma.endereco.create({
        data: {
          cep: '12345678',
          rua: 'Rua Teste',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          usuarioId: userId,
        },
      });
      addressId = address.id;
    });

    it('deve atualizar endereço com sucesso', async () => {
      const response = await request(app)
        .put(`/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          cep: '87654321',
          rua: 'Rua Nova',
          numero: '456',
          complemento: 'Apto 2',
          bairro: 'Jardim',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
        });

      expect(response.status).toBe(200);
      expect(response.body.rua).toBe('Rua Nova');
    });

    it('deve retornar erro ao atualizar endereço inexistente', async () => {
      const response = await request(app)
        .put('/addresses/999999')
        .set('Authorization', `Bearer ${token}`)
        .send({
          cep: '87654321',
          rua: 'Rua Nova',
          numero: '456',
          complemento: 'Apto 2',
          bairro: 'Jardim',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
        });

      expect(response.status).toBe(404);
    });

    it('deve retornar erro ao atualizar endereço sem autenticação', async () => {
      const response = await request(app).put(`/addresses/${addressId}`).send({
        cep: '87654321',
        rua: 'Rua Nova',
        numero: '456',
        complemento: 'Apto 2',
        bairro: 'Jardim',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
      });

      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /addresses/:id', () => {
    let addressId: number;

    beforeAll(async () => {
      const address = await prisma.endereco.create({
        data: {
          cep: '12345678',
          rua: 'Rua Teste',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          usuarioId: userId,
        },
      });
      addressId = address.id;
    });

    it('deve deletar endereço com sucesso', async () => {
      const response = await request(app)
        .delete(`/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('deve retornar erro ao deletar endereço inexistente', async () => {
      const response = await request(app)
        .delete('/addresses/999999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('deve retornar erro ao deletar endereço sem autenticação', async () => {
      const response = await request(app).delete(`/addresses/${addressId}`);

      expect(response.status).toBe(401);
    });
  });
});
