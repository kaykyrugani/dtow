import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
import { createTestUser, generateToken } from '../utils/test-utils';
import request from 'supertest';

const prisma = new PrismaClient();

describe('Address Integration Tests', () => {
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    testUser = await createTestUser();
    authToken = generateToken(testUser);
  });

  afterAll(async () => {
    await prisma.usuario.delete({
      where: { id: testUser.id },
    });
    await prisma.$disconnect();
  });

  describe('GET /address/search/:cep', () => {
    it('deve retornar dados do endereço quando o CEP é válido', async () => {
      const response = await request(app)
        .get('/address/search/01001000')
        .expect(200);

      expect(response.body).toHaveProperty('cep', '01001000');
      expect(response.body).toHaveProperty('logradouro');
      expect(response.body).toHaveProperty('bairro');
      expect(response.body).toHaveProperty('cidade');
      expect(response.body).toHaveProperty('estado');
    });

    it('deve retornar erro quando o CEP é inválido', async () => {
      const response = await request(app)
        .get('/address/search/00000000')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /address', () => {
    it('deve criar um endereço com sucesso', async () => {
      const addressData = {
        cep: '01001000',
        logradouro: 'Rua Teste',
        numero: '123',
        bairro: 'Bairro Teste',
        cidade: 'São Paulo',
        estado: 'SP',
        principal: true,
      };

      const response = await request(app)
        .post('/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(addressData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('usuarioId', testUser.id);
      expect(response.body).toHaveProperty('cep', addressData.cep);
      expect(response.body).toHaveProperty('logradouro', addressData.logradouro);
    });

    it('deve retornar erro quando os dados são inválidos', async () => {
      const invalidData = {
        cep: '123',
        logradouro: 'R',
        numero: '',
        bairro: 'B',
        cidade: 'S',
        estado: 'S',
      };

      const response = await request(app)
        .post('/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /address/:id', () => {
    let addressId: number;

    beforeAll(async () => {
      const address = await prisma.endereco.create({
        data: {
          usuarioId: testUser.id,
          cep: '01001000',
          logradouro: 'Rua Teste',
          numero: '123',
          bairro: 'Bairro Teste',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      });
      addressId = address.id;
    });

    it('deve atualizar um endereço com sucesso', async () => {
      const updateData = {
        logradouro: 'Nova Rua',
        numero: '456',
      };

      const response = await request(app)
        .put(`/address/${addressId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', addressId);
      expect(response.body).toHaveProperty('logradouro', updateData.logradouro);
      expect(response.body).toHaveProperty('numero', updateData.numero);
    });

    it('deve retornar erro quando o endereço não existe', async () => {
      const response = await request(app)
        .put('/address/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ logradouro: 'Nova Rua' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /address/:id', () => {
    let addressId: number;

    beforeAll(async () => {
      const address = await prisma.endereco.create({
        data: {
          usuarioId: testUser.id,
          cep: '01001000',
          logradouro: 'Rua Teste',
          numero: '123',
          bairro: 'Bairro Teste',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      });
      addressId = address.id;
    });

    it('deve deletar um endereço com sucesso', async () => {
      await request(app)
        .delete(`/address/${addressId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      const deletedAddress = await prisma.endereco.findUnique({
        where: { id: addressId },
      });
      expect(deletedAddress).toBeNull();
    });

    it('deve retornar erro quando o endereço não existe', async () => {
      const response = await request(app)
        .delete('/address/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /address', () => {
    beforeAll(async () => {
      await prisma.endereco.createMany({
        data: [
          {
            usuarioId: testUser.id,
            cep: '01001000',
            logradouro: 'Rua Teste 1',
            numero: '123',
            bairro: 'Bairro Teste',
            cidade: 'São Paulo',
            estado: 'SP',
            principal: true,
          },
          {
            usuarioId: testUser.id,
            cep: '01002000',
            logradouro: 'Rua Teste 2',
            numero: '456',
            bairro: 'Bairro Teste',
            cidade: 'São Paulo',
            estado: 'SP',
            principal: false,
          },
        ],
      });
    });

    it('deve retornar lista de endereços do usuário', async () => {
      const response = await request(app)
        .get('/address')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('usuarioId', testUser.id);
    });
  });

  describe('PATCH /address/:id/primary', () => {
    let addressId: number;

    beforeAll(async () => {
      const address = await prisma.endereco.create({
        data: {
          usuarioId: testUser.id,
          cep: '01001000',
          logradouro: 'Rua Teste',
          numero: '123',
          bairro: 'Bairro Teste',
          cidade: 'São Paulo',
          estado: 'SP',
          principal: false,
        },
      });
      addressId = address.id;
    });

    it('deve definir um endereço como principal com sucesso', async () => {
      const response = await request(app)
        .patch(`/address/${addressId}/primary`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', addressId);
      expect(response.body).toHaveProperty('principal', true);

      const otherAddresses = await prisma.endereco.findMany({
        where: {
          usuarioId: testUser.id,
          id: { not: addressId },
        },
      });

      otherAddresses.forEach(address => {
        expect(address.principal).toBe(false);
      });
    });

    it('deve retornar erro quando o endereço não existe', async () => {
      const response = await request(app)
        .patch('/address/999999/primary')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
}); 