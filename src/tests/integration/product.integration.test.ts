import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
import { createTestUser, generateAuthToken } from '../helpers/auth.helper';

const prisma = new PrismaClient();

describe('Product Integration Tests', () => {
  let adminToken: string;
  let customerToken: string;
  let testProductId: number;

  const mockProductData = {
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    preco: 99.99,
    categoria: 'ELETRONICOS',
    subcategoria: 'SMARTPHONES',
    marca: 'Marca Teste',
    modelo: 'Modelo Teste',
    quantidadeEstoque: 100,
    imagemUrl: 'https://exemplo.com/imagem.jpg',
  };

  beforeAll(async () => {
    // Criar usuários de teste
    const adminUser = await createTestUser({
      email: 'admin@test.com',
      senha: 'Admin@123',
      tipoUsuario: 'ADMIN',
    });

    const customerUser = await createTestUser({
      email: 'customer@test.com',
      senha: 'Customer@123',
      tipoUsuario: 'CLIENTE',
    });

    adminToken = generateAuthToken(adminUser);
    customerToken = generateAuthToken(customerUser);
  });

  afterAll(async () => {
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.produto.deleteMany();
  });

  describe('POST /products', () => {
    it('deve criar um produto quando autenticado como admin', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockProductData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(mockProductData);
      expect(response.body).toHaveProperty('id');
      testProductId = response.body.id;
    });

    it('deve retornar erro 401 quando não autenticado', async () => {
      const response = await request(app).post('/products').send(mockProductData);

      expect(response.status).toBe(401);
    });

    it('deve retornar erro 403 quando autenticado como cliente', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(mockProductData);

      expect(response.status).toBe(403);
    });

    it('deve retornar erro 400 quando dados são inválidos', async () => {
      const invalidData = { ...mockProductData, preco: -10 };

      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /products', () => {
    beforeEach(async () => {
      // Criar alguns produtos para teste
      await prisma.produto.createMany({
        data: [
          mockProductData,
          { ...mockProductData, nome: 'Produto 2' },
          { ...mockProductData, nome: 'Produto 3' },
        ],
      });
    });

    it('deve listar produtos com paginação', async () => {
      const response = await request(app).get('/products').query({ page: 1, limit: 2 });

      expect(response.status).toBe(200);
      expect(response.body.produtos).toHaveLength(2);
      expect(response.body.total).toBe(3);
    });

    it('deve filtrar produtos por categoria', async () => {
      const response = await request(app).get(`/products/categoria/${mockProductData.categoria}`);

      expect(response.status).toBe(200);
      expect(response.body.produtos).toHaveLength(3);
      expect(response.body.produtos[0].categoria).toBe(mockProductData.categoria);
    });

    it('deve buscar produtos por termo', async () => {
      const response = await request(app).get('/products/search').query({ q: 'Teste' });

      expect(response.status).toBe(200);
      expect(response.body.produtos).toHaveLength(3);
      expect(response.body.produtos[0].nome).toContain('Teste');
    });
  });

  describe('GET /products/:id', () => {
    beforeEach(async () => {
      const product = await prisma.produto.create({
        data: mockProductData,
      });
      testProductId = product.id;
    });

    it('deve retornar um produto específico', async () => {
      const response = await request(app).get(`/products/${testProductId}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(mockProductData);
      expect(response.body.id).toBe(testProductId);
    });

    it('deve retornar erro 404 quando produto não existe', async () => {
      const response = await request(app).get('/products/99999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /products/:id', () => {
    beforeEach(async () => {
      const product = await prisma.produto.create({
        data: mockProductData,
      });
      testProductId = product.id;
    });

    it('deve atualizar um produto quando autenticado como admin', async () => {
      const updateData = {
        preco: 149.99,
        quantidadeEstoque: 50,
      };

      const response = await request(app)
        .put(`/products/${testProductId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        ...mockProductData,
        ...updateData,
      });
    });

    it('deve retornar erro 403 quando autenticado como cliente', async () => {
      const response = await request(app)
        .put(`/products/${testProductId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ preco: 149.99 });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /products/:id', () => {
    beforeEach(async () => {
      const product = await prisma.produto.create({
        data: mockProductData,
      });
      testProductId = product.id;
    });

    it('deve deletar um produto quando autenticado como admin', async () => {
      const response = await request(app)
        .delete(`/products/${testProductId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(204);

      const deletedProduct = await prisma.produto.findUnique({
        where: { id: testProductId },
      });
      expect(deletedProduct).toBeNull();
    });

    it('deve retornar erro 403 quando autenticado como cliente', async () => {
      const response = await request(app)
        .delete(`/products/${testProductId}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(403);
    });
  });
});
