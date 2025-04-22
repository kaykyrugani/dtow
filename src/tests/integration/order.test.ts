import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
import { createTestUser, createTestProduct, generateAuthToken } from '../helpers/testData';
import type { Usuario, Produto } from '../../generated/prisma';

const prisma = new PrismaClient();

describe('Order Integration Tests', () => {
  let token: string;
  let produto: Produto;
  let usuario: Usuario;

  beforeAll(async () => {
    // Criar usuário e produto de teste
    usuario = await createTestUser(prisma);
    produto = await createTestProduct(prisma);
    token = generateAuthToken(usuario);
  });

  afterAll(async () => {
    // Limpar dados de teste
    await prisma.pedido.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.$disconnect();
  });

  // Teste de criação de pedido
  it('deve criar um pedido com sucesso', async () => {
    const response = await request(app)
      .post('/api/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          {
            produtoId: produto.id,
            quantidade: 1,
            tamanho: 'M',
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.items).toHaveLength(1);
  });

  // Teste de atualização de status
  it('deve atualizar o status do pedido', async () => {
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: usuario.id,
        status: 'PENDENTE',
        items: {
          create: {
            produtoId: produto.id,
            quantidade: 1,
            tamanho: 'M',
          },
        },
      },
    });

    const response = await request(app)
      .put(`/api/pedidos/${pedido.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'EM_PREPARACAO' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('EM_PREPARACAO');
  });

  // Teste de cancelamento
  it('deve cancelar um pedido', async () => {
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: usuario.id,
        status: 'PENDENTE',
        items: {
          create: {
            produtoId: produto.id,
            quantidade: 1,
            tamanho: 'M',
          },
        },
      },
    });

    const response = await request(app)
      .post(`/api/pedidos/${pedido.id}/cancelar`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('CANCELADO');
  });
});
