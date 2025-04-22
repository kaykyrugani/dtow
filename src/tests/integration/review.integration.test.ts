import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../../app';
import { prisma } from '../../shared/infra/prisma';
import { createTestUser, createTestProduct } from '../factories';
import { generateToken } from '../../shared/utils/jwt';

describe('Review Integration Tests', () => {
  let userToken: string;
  let adminToken: string;
  let productId: string;
  let reviewId: string;

  beforeAll(async () => {
    // Criar usuário de teste
    const user = await createTestUser();
    const admin = await createTestUser({ tipoUsuario: 'ADMIN' });
    const product = await createTestProduct();

    userToken = generateToken(user);
    adminToken = generateToken(admin);
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.avaliacao.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
  });

  describe('POST /products/:produtoId/reviews', () => {
    it('should create a review successfully', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/products/${productId}/reviews`,
        headers: {
          authorization: `Bearer ${userToken}`,
        },
        payload: {
          nota: 5,
          comentario: 'Ótimo produto!',
        },
      });

      expect(response.statusCode).toBe(201);
      const data = JSON.parse(response.payload);
      expect(data.nota).toBe(5);
      expect(data.comentario).toBe('Ótimo produto!');
      reviewId = data.id;
    });

    it('should not create a review without authentication', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/products/${productId}/reviews`,
        payload: {
          nota: 5,
          comentario: 'Ótimo produto!',
        },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /products/:produtoId/reviews', () => {
    it('should get product reviews successfully', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/products/${productId}/reviews`,
      });

      expect(response.statusCode).toBe(200);
      const data = JSON.parse(response.payload);
      expect(data.reviews).toHaveLength(1);
      expect(data.total).toBe(1);
    });
  });

  describe('PUT /reviews/:id', () => {
    it('should update a review successfully', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/reviews/${reviewId}`,
        headers: {
          authorization: `Bearer ${userToken}`,
        },
        payload: {
          nota: 4,
          comentario: 'Produto atualizado!',
        },
      });

      expect(response.statusCode).toBe(200);
      const data = JSON.parse(response.payload);
      expect(data.nota).toBe(4);
      expect(data.comentario).toBe('Produto atualizado!');
    });

    it('should not update another user review', async () => {
      const otherUser = await createTestUser();
      const otherToken = generateToken(otherUser);

      const response = await app.inject({
        method: 'PUT',
        url: `/reviews/${reviewId}`,
        headers: {
          authorization: `Bearer ${otherToken}`,
        },
        payload: {
          nota: 3,
          comentario: 'Tentativa de atualização não autorizada',
        },
      });

      expect(response.statusCode).toBe(403);
    });
  });

  describe('DELETE /reviews/:id', () => {
    it('should delete a review successfully', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/reviews/${reviewId}`,
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      expect(response.statusCode).toBe(204);
    });
  });

  describe('GET /reviews', () => {
    it('should get all reviews as admin', async () => {
      // Criar algumas avaliações para teste
      const user = await createTestUser();
      const product = await createTestProduct();
      await prisma.avaliacao.create({
        data: {
          usuarioId: user.id,
          produtoId: product.id,
          nota: 5,
          comentario: 'Test review',
        },
      });

      const response = await app.inject({
        method: 'GET',
        url: '/reviews',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const data = JSON.parse(response.payload);
      expect(data.reviews).toBeDefined();
      expect(data.total).toBeGreaterThan(0);
    });

    it('should not get all reviews as regular user', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/reviews',
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      expect(response.statusCode).toBe(403);
    });
  });
});
