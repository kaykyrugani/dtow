import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import type { PrismaClient } from '@prisma/client';
import { createTestUser, generateAuthToken, createTestProduct, createNotFoundError, createValidationError } from '../helpers/testData';
import { container } from 'tsyringe';
import { OrderService } from '../../modules/order/services/order.service';
import { OrderController } from '../../modules/order/controllers/order.controller';
import { AppError } from '../../shared/errors/AppError';
import { ERROR_CODES } from '../../constants/errorCodes';
import { HttpStatusCode } from '../../shared/errors/HttpStatusCode';
import { mockPrisma } from '../mocks/prisma.mock';
import { expectAppError } from '../helpers/assertions';
import type { Usuario, Produto } from '../../generated/prisma';

// Enums
enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  PROCESSING = 'PROCESSING'
}

enum PaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BANK_SLIP = 'BANK_SLIP'
}

const prisma = new PrismaClient();

describe('Order Integration Tests', () => {
  let adminToken: string;
  let customerToken: string;
  let testProductId: string;
  let testOrderId: string;
  let testUserId: string;
  let testCouponId: number;
  let orderService: OrderService;

  const mockProductData = {
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    preco: 100.00,
    categoria: 'ELETRONICOS',
    subcategoria: 'SMARTPHONES',
    marca: 'Marca Teste',
    estoque: 10,
    imagem: 'https://exemplo.com/imagem.jpg',
    imagens: '[]',
    tamanhos: '[]'
  };

  const mockCouponData = {
    codigo: 'TESTE10',
    desconto: 10,
    tipoDesconto: 'PERCENTUAL',
    valorMinimo: 50.00,
    dataInicio: new Date(),
    dataFim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    limiteUsos: 100,
    ativo: true
  };

  const mockOrderData = {
    items: [
      {
        productId: '0', // Será atualizado após criar o produto
        quantity: 1
      }
    ],
    pagamento: {
      tipo: PaymentType.CREDIT_CARD,
      numeroCartao: '4111111111111111',
      nomeCartao: 'Test User',
      validade: '12/25',
      cvv: '123'
    },
    endereco: {
      rua: 'Rua Teste',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    }
  };

  beforeAll(async () => {
    // Criar usuários de teste
    const adminUser = await createTestUser(prisma, { tipoUsuario: 'ADMIN' });
    const customerUser = await createTestUser(prisma);

    adminToken = generateAuthToken(adminUser);
    customerToken = generateAuthToken(customerUser);
    testUserId = customerUser.id.toString();

    // Criar produto de teste
    const product = await createTestProduct(prisma);
    testProductId = product.id.toString();
    mockOrderData.items[0].productId = testProductId;

    // Criar cupom de teste
    const coupon = await prisma.cupom.create({
      data: {
        ...mockCouponData,
        criadoPor: adminUser.id
      }
    });
    testCouponId = coupon.id;

    orderService = container.resolve(OrderService);
  });

  afterAll(async () => {
    await prisma.pedido.deleteMany();
    await prisma.cupom.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.pedido.deleteMany();
  });

  describe('Criação de Pedidos', () => {
    it('deve criar um pedido com sucesso', async () => {
      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(mockOrderData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe(OrderStatus.PENDING);
      expect(response.body.usuarioId).toBe(testUserId);
      expect(response.body.itens).toHaveLength(1);
      expect(response.body.itens[0].produtoId).toBe(testProductId);
      expect(response.body.itens[0].quantidade).toBe(1);

      testOrderId = response.body.id;
    });

    it('deve falhar ao criar pedido sem autenticação', async () => {
      const response = await request(app)
        .post('/orders')
        .send(mockOrderData);

      expect(response.status).toBe(401);
    });

    it('deve falhar ao criar pedido com produto inexistente', async () => {
      const invalidOrderData = {
        ...mockOrderData,
        items: [{ productId: '999999', quantity: 1 }]
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(invalidOrderData);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Produto não encontrado');
    });

    it('deve falhar ao criar pedido com quantidade maior que o estoque', async () => {
      const invalidOrderData = {
        ...mockOrderData,
        items: [{ productId: testProductId, quantity: 20 }]
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(invalidOrderData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Estoque insuficiente');
    });
  });

  describe('Consulta de Pedidos', () => {
    it('deve buscar pedido por ID', async () => {
      // Primeiro criar um pedido
      const order = await orderService.create(testUserId, mockOrderData.items);
      const orderId = order.id.toString();

      const response = await request(app)
        .get(`/orders/${orderId}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderId);
      expect(response.body.usuarioId).toBe(testUserId);
    });

    it('deve falhar ao buscar pedido inexistente', async () => {
      const response = await request(app)
        .get('/orders/999999')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Pedido não encontrado');
    });

    it('deve listar pedidos do usuário', async () => {
      // Criar alguns pedidos
      await orderService.create(testUserId, mockOrderData.items);
      await orderService.create(testUserId, mockOrderData.items);

      const response = await request(app)
        .get(`/orders/usuario/${testUserId}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      expect(response.body[0].usuarioId).toBe(testUserId);
    });

    it('deve falhar ao listar pedidos de outro usuário', async () => {
      // Criar outro usuário
      const otherUser = await createTestUser(prisma);
      const otherUserToken = generateAuthToken(otherUser);

      // Criar pedido para o outro usuário
      await orderService.create(otherUser.id.toString(), mockOrderData.items);

      const response = await request(app)
        .get(`/orders/usuario/${otherUser.id}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('Atualização de Status de Pedidos', () => {
    it('deve atualizar status do pedido com sucesso', async () => {
      // Primeiro criar um pedido
      const order = await orderService.create(testUserId, mockOrderData.items);
      const orderId = order.id.toString();

      const response = await request(app)
        .put(`/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: OrderStatus.PAID });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderId);
      expect(response.body.status).toBe(OrderStatus.PAID);
    });

    it('deve falhar ao atualizar status de pedido inexistente', async () => {
      const response = await request(app)
        .put('/orders/999999/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: OrderStatus.PAID });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Pedido não encontrado');
    });

    it('deve falhar ao atualizar status de pedido cancelado', async () => {
      // Primeiro criar um pedido
      const order = await orderService.create(testUserId, mockOrderData.items);
      const orderId = order.id.toString();

      // Cancelar o pedido
      await orderService.cancel(orderId);

      const response = await request(app)
        .put(`/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: OrderStatus.PAID });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('não é possível atualizar o status de um pedido cancelado');
    });
  });

  describe('Cancelamento de Pedidos', () => {
    it('deve cancelar pedido com sucesso', async () => {
      // Primeiro criar um pedido
      const order = await orderService.create(testUserId, mockOrderData.items);
      const orderId = order.id.toString();

      const response = await request(app)
        .post(`/orders/${orderId}/cancel`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderId);
      expect(response.body.status).toBe(OrderStatus.CANCELLED);

      // Verificar se o estoque foi restaurado
      const product = await prisma.produto.findUnique({
        where: { id: parseInt(testProductId) }
      });
      expect(product?.estoque).toBe(mockProductData.estoque);
    });

    it('deve falhar ao cancelar pedido inexistente', async () => {
      const response = await request(app)
        .post('/orders/999999/cancel')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Pedido não encontrado');
    });

    it('deve falhar ao cancelar pedido já cancelado', async () => {
      // Primeiro criar um pedido
      const order = await orderService.create(testUserId, mockOrderData.items);
      const orderId = order.id.toString();

      // Cancelar o pedido
      await orderService.cancel(orderId);

      const response = await request(app)
        .post(`/orders/${orderId}/cancel`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Pedido já está cancelado');
    });

    it('deve falhar ao cancelar pedido de outro usuário', async () => {
      // Criar outro usuário
      const otherUser = await createTestUser(prisma);
      const otherUserToken = generateAuthToken(otherUser);

      // Criar pedido para o outro usuário
      const order = await orderService.create(otherUser.id.toString(), mockOrderData.items);
      const orderId = order.id.toString();

      const response = await request(app)
        .post(`/orders/${orderId}/cancel`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('Pedidos com Cupom', () => {
    it('deve criar pedido com cupom percentual válido', async () => {
      const orderWithCoupon = {
        ...mockOrderData,
        cupomCodigo: 'TESTE10'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithCoupon);

      expect(response.status).toBe(201);
      expect(response.body.total).toBe(90.00); // 100 - 10%
      expect(response.body.desconto).toBe(10.00);
      expect(response.body.cupomId).toBe(testCouponId);
    });

    it('deve criar pedido com cupom de valor fixo', async () => {
      // Criar cupom de valor fixo
      const fixedCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'FIXO20',
          desconto: 20,
          tipoDesconto: 'VALOR_FIXO',
          criadoPor: testUserId
        }
      });

      const orderWithFixedCoupon = {
        ...mockOrderData,
        cupomCodigo: 'FIXO20'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithFixedCoupon);

      expect(response.status).toBe(201);
      expect(response.body.total).toBe(80.00); // 100 - 20
      expect(response.body.desconto).toBe(20.00);
      expect(response.body.cupomId).toBe(fixedCoupon.id);
    });

    it('deve rejeitar pedido com cupom expirado', async () => {
      // Criar cupom expirado
      const expiredCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'EXPIRADO',
          dataInicio: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 dias atrás
          dataFim: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
          criadoPor: testUserId
        }
      });

      const orderWithExpiredCoupon = {
        ...mockOrderData,
        cupomCodigo: 'EXPIRADO'
      };

      await expectAppError(
        request(app)
          .post('/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(orderWithExpiredCoupon),
        'CUPOM_EXPIRADO',
        HttpStatusCode.BAD_REQUEST
      );
    });

    it('deve rejeitar pedido com cupom que não atinge valor mínimo', async () => {
      // Criar produto com preço baixo
      const cheapProduct = await prisma.produto.create({
        data: {
          ...mockProductData,
          nome: 'Produto Barato',
          preco: 10.00
        }
      });

      const orderWithCheapProduct = {
        ...mockOrderData,
        items: [{ productId: cheapProduct.id, quantity: 1 }],
        cupomCodigo: 'TESTE10'
      };

      await expectAppError(
        request(app)
          .post('/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(orderWithCheapProduct),
        'VALOR_MINIMO_NAO_ATINGIDO',
        HttpStatusCode.BAD_REQUEST
      );
    });

    it('deve rejeitar pedido com cupom esgotado', async () => {
      // Criar cupom com limite de uso
      const limitedCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'LIMITADO',
          limiteUsos: 1,
          criadoPor: testUserId
        }
      });

      // Usar o cupom uma vez
      await prisma.pedido.create({
        data: {
          usuarioId: testUserId,
          status: 'PENDING' as OrderStatus,
          total: 90.00,
          desconto: 10.00,
          cupomId: limitedCoupon.id,
          itens: {
            create: [{
              produtoId: testProductId,
              quantidade: 1,
              precoUnitario: 100.00
            }]
          }
        }
      });

      const orderWithLimitedCoupon = {
        ...mockOrderData,
        cupomCodigo: 'LIMITADO'
      };

      await expectAppError(
        request(app)
          .post('/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(orderWithLimitedCoupon),
        'CUPOM_ESGOTADO',
        HttpStatusCode.BAD_REQUEST
      );
    });

    it('deve aplicar desconto máximo em pedido com múltiplos produtos', async () => {
      // Criar segundo produto
      const secondProduct = await prisma.produto.create({
        data: {
          ...mockProductData,
          nome: 'Segundo Produto',
          preco: 50.00
        }
      });

      const orderWithMultipleProducts = {
        ...mockOrderData,
        items: [
          { productId: testProductId, quantity: 1 },
          { productId: secondProduct.id, quantity: 1 }
        ],
        cupomCodigo: 'TESTE10'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithMultipleProducts);

      expect(response.status).toBe(201);
      expect(response.body.total).toBe(135.00); // (100 + 50) - 15 (10% de 150)
      expect(response.body.desconto).toBe(15.00);
    });

    it('deve rejeitar pedido com cupom inexistente', async () => {
      const orderWithInvalidCoupon = {
        ...mockOrderData,
        cupomCodigo: 'INVALIDO123'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithInvalidCoupon);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Cupom não encontrado');
    });

    it('deve rejeitar pedido com cupom desativado', async () => {
      // Criar cupom desativado
      const inactiveCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'INATIVO',
          ativo: false,
          criadoPor: testUserId
        }
      });

      const orderWithInactiveCoupon = {
        ...mockOrderData,
        cupomCodigo: 'INATIVO'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithInactiveCoupon);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Cupom desativado');
    });

    it('deve rejeitar pedido com cupom já usado pelo mesmo usuário', async () => {
      // Criar cupom com uso único por usuário
      const userLimitedCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'USERONCE',
          limiteUsos: 1,
          criadoPor: testUserId
        }
      });

      // Usar o cupom uma vez
      await prisma.pedido.create({
        data: {
          usuarioId: testUserId,
          status: 'PENDING' as OrderStatus,
          total: 90.00,
          desconto: 10.00,
          cupomId: userLimitedCoupon.id,
          itens: {
            create: [{
              produtoId: testProductId,
              quantidade: 1,
              precoUnitario: 100.00
            }]
          }
        }
      });

      const orderWithUsedCoupon = {
        ...mockOrderData,
        cupomCodigo: 'USERONCE'
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithUsedCoupon);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Cupom já utilizado por este usuário');
    });

    it('deve aplicar cupom apenas sobre o valor dos produtos, não incluindo frete', async () => {
      const orderWithShipping = {
        ...mockOrderData,
        cupomCodigo: 'TESTE10',
        frete: 15.00 // Frete fixo de R$ 15
      };

      const response = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderWithShipping);

      expect(response.status).toBe(201);
      expect(response.body.total).toBe(105.00); // (100 - 10%) + 15 frete
      expect(response.body.desconto).toBe(10.00);
      expect(response.body.frete).toBe(15.00);
    });

    it('deve lidar com concorrência no limite de uso do cupom', async () => {
      // Criar cupom com limite de uso
      const concurrentCoupon = await prisma.cupom.create({
        data: {
          ...mockCouponData,
          codigo: 'CONCURRENT',
          limiteUsos: 1,
          criadoPor: testUserId
        }
      });

      // Simular duas requisições simultâneas
      const orderWithConcurrentCoupon = {
        ...mockOrderData,
        cupomCodigo: 'CONCURRENT'
      };

      const [response1, response2] = await Promise.all([
        request(app)
          .post('/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(orderWithConcurrentCoupon),
        request(app)
          .post('/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(orderWithConcurrentCoupon)
      ]);

      // Uma das requisições deve ter sucesso e a outra deve falhar
      const successResponse = response1.status === 201 ? response1 : response2;
      const failureResponse = response1.status === 201 ? response2 : response1;

      expect(successResponse.status).toBe(201);
      expect(failureResponse.status).toBe(400);
      expect(failureResponse.body.message).toContain('Cupom esgotado');
    });
  });

  describe('Order Service Tests', () => {
    let testUser: Usuario;
    let testProduct: Produto;

    beforeEach(async () => {
      // Criar usuário e produto de teste
      testUser = await createTestUser(prisma);
      testProduct = await createTestProduct(prisma);
    });

    afterEach(async () => {
      await prisma.pedidoItem.deleteMany();
      await prisma.pedido.deleteMany();
      await prisma.produto.deleteMany();
      await prisma.usuario.deleteMany();
    });

    describe('create', () => {
      it('should create a new order successfully', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 2
          }
        ];

        const order = await orderService.create(testUser.id, items);

        expect(order).toBeDefined();
        expect(order.usuarioId).toBe(testUser.id);
        expect(order.itens).toHaveLength(1);
        expect(order.itens[0].produtoId).toBe(testProduct.id);
        expect(order.itens[0].quantidade).toBe(2);
        expect(order.status).toBe(OrderStatus.PENDING);
      });

      it('should throw error when product is out of stock', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 20 // More than available stock
          }
        ];

        await expect(orderService.create(testUser.id, items)).rejects.toThrow(
          new AppError('Estoque insuficiente', 400)
        );
      });
    });

    describe('findById', () => {
      it('should find order by id', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        const createdOrder = await orderService.create(testUser.id, items);
        const foundOrder = await orderService.findById(createdOrder.id);

        expect(foundOrder).toBeDefined();
        expect(foundOrder.id).toBe(createdOrder.id);
      });

      it('should throw error when order is not found', async () => {
        await expect(orderService.findById('non-existent-id')).rejects.toThrow(
          new AppError('Pedido não encontrado', 404)
        );
      });
    });

    describe('findByUserId', () => {
      it('should find all orders for a user', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        await orderService.create(testUser.id, items);
        await orderService.create(testUser.id, items);

        const orders = await orderService.findByUserId(testUser.id);

        expect(orders).toHaveLength(2);
        expect(orders[0].usuarioId).toBe(testUser.id);
        expect(orders[1].usuarioId).toBe(testUser.id);
      });

      it('should return empty array when user has no orders', async () => {
        const orders = await orderService.findByUserId(testUser.id);
        expect(orders).toHaveLength(0);
      });
    });

    describe('updateStatus', () => {
      it('should update order status successfully', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        const order = await orderService.create(testUser.id, items);
        const updatedOrder = await orderService.updateStatus(order.id, OrderStatus.PROCESSING);

        expect(updatedOrder.status).toBe(OrderStatus.PROCESSING);
      });

      it('should throw error when order is not found', async () => {
        await expect(orderService.updateStatus('non-existent-id', OrderStatus.PROCESSING)).rejects.toThrow(
          new AppError('Pedido não encontrado', 404)
        );
      });

      it('should throw error when trying to update cancelled order', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        const order = await orderService.create(testUser.id, items);
        await orderService.cancel(order.id);

        await expect(orderService.updateStatus(order.id, OrderStatus.PROCESSING)).rejects.toThrow(
          new AppError('Não é possível atualizar o status de um pedido cancelado', 400)
        );
      });
    });

    describe('cancel', () => {
      it('should cancel order successfully', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        const order = await orderService.create(testUser.id, items);
        const cancelledOrder = await orderService.cancel(order.id);

        expect(cancelledOrder.status).toBe(OrderStatus.CANCELLED);
      });

      it('should throw error when order is not found', async () => {
        await expect(orderService.cancel('non-existent-id')).rejects.toThrow(
          new AppError('Pedido não encontrado', 404)
        );
      });

      it('should throw error when order is already cancelled', async () => {
        const items = [
          {
            productId: testProduct.id,
            quantity: 1
          }
        ];

        const order = await orderService.create(testUser.id, items);
        await orderService.cancel(order.id);

        await expect(orderService.cancel(order.id)).rejects.toThrow(
          new AppError('Pedido já está cancelado', 400)
        );
      });
    });
  });
}); 