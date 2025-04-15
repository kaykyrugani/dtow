import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';
import { CouponController } from '../../modules/coupon/controllers/coupon.controller';
import { AppError } from '../../utils/AppError';
import { HttpStatusCode } from '../../constants/httpStatusCode';
import { CouponService } from '../../modules/coupon/services/coupon.service';

vi.mock('../../modules/coupon/services/coupon.service');

const mockPrisma = mockDeep<PrismaClient>();
const couponController = new CouponController(mockPrisma);

describe('CouponController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: any;
  let mockCouponService: jest.Mocked<CouponService>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest = {
      user: { id: 1, tipo: 'ADMIN' },
      body: {},
      params: {},
      query: {}
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn()
    };
    mockNext = vi.fn();
    mockCouponService = new CouponService(mockPrisma) as jest.Mocked<CouponService>;
  });

  const mockCouponData = {
    codigo: 'TESTE10',
    desconto: 10,
    tipoDesconto: 'PERCENTUAL' as const,
    dataInicio: new Date().toISOString(),
    dataFim: new Date(Date.now() + 86400000).toISOString(),
    valorMinimoCompra: 100,
    quantidadeMaxima: 100
  };

  describe('create', () => {
    it('deve criar um cupom com sucesso', async () => {
      mockRequest.body = mockCouponData;
      const mockCreatedCoupon = { id: 1, ...mockCouponData, ativo: true };
      mockCouponService.create.mockResolvedValue(mockCreatedCoupon);

      await couponController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedCoupon);
    });

    it('deve retornar erro quando usuário não está autenticado', async () => {
      mockRequest.user = undefined;
      mockRequest.body = mockCouponData;

      await couponController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.UNAUTHORIZED);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Não autorizado'
      });
    });
  });

  describe('findById', () => {
    it('deve encontrar um cupom por ID com sucesso', async () => {
      mockRequest.params = { id: '1' };
      const mockFoundCoupon = { id: 1, ...mockCouponData, ativo: true };
      mockCouponService.findById.mockResolvedValue(mockFoundCoupon);

      await couponController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockFoundCoupon);
    });

    it('deve retornar erro quando ID é inválido', async () => {
      mockRequest.params = { id: 'invalid' };

      await couponController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'ID inválido'
      });
    });
  });

  describe('findAll', () => {
    it('deve listar cupons com paginação', async () => {
      mockRequest.query = {
        page: '1',
        limit: '10',
        sortBy: 'codigo',
        sortOrder: 'desc'
      };

      const mockResult = {
        data: [
          { id: 1, ...mockCouponData, ativo: true },
          { id: 2, ...mockCouponData, ativo: true }
        ],
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      };

      mockCouponService.findAll.mockResolvedValue(mockResult);

      await couponController.findAll(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('deve passar erro para o próximo middleware quando ocorrer exceção', async () => {
      mockRequest.query = {
        page: '1',
        limit: '10'
      };

      const error = new Error('Erro ao listar cupons');
      mockCouponService.findAll.mockRejectedValue(error);

      await couponController.findAll(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('validate', () => {
    it('deve validar um cupom com sucesso', async () => {
      mockRequest.params = { codigo: 'TESTE10' };
      mockRequest.body = { valorTotal: 200 };

      const mockValidationResult = {
        valido: true,
        desconto: 20,
        valorFinal: 180
      };

      mockCouponService.validate.mockResolvedValue(mockValidationResult);

      await couponController.validate(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockValidationResult);
    });

    it('deve retornar erro quando valor total é inválido', async () => {
      mockRequest.params = { codigo: 'TESTE10' };
      mockRequest.body = { valorTotal: 'invalid' };

      await couponController.validate(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Valor total inválido'
      });
    });
  });
}); 