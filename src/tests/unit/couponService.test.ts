import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';
import { CouponService } from '../../modules/coupon/services/coupon.service';
import { AppError } from '../../utils/AppError';
import { HttpStatusCode } from '../../constants/httpStatusCode';
import { CreateCouponInput, ListCouponsQuery } from '../../modules/coupon/schemas/coupon.schema';

const mockPrisma = mockDeep<PrismaClient>();
const couponService = new CouponService(mockPrisma);

describe('CouponService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      mockPrisma.cupom.findUnique.mockResolvedValue(null);
      mockPrisma.cupom.create.mockResolvedValue({ id: 1, ...mockCouponData, ativo: true, criadoPor: 1 });

      const result = await couponService.create(1, mockCouponData);

      expect(result).toEqual(expect.objectContaining({ id: 1, ...mockCouponData }));
      expect(mockPrisma.cupom.create).toHaveBeenCalledWith({
        data: { ...mockCouponData, criadoPor: 1 }
      });
    });

    it('deve lançar erro quando cupom já existe', async () => {
      mockPrisma.cupom.findUnique.mockResolvedValue({ id: 1, ...mockCouponData, ativo: true, criadoPor: 1 });

      await expect(couponService.create(1, mockCouponData)).rejects.toThrow(
        new AppError('Cupom já existe', HttpStatusCode.CONFLICT)
      );
    });
  });

  describe('findById', () => {
    it('deve encontrar um cupom por ID com sucesso', async () => {
      mockPrisma.cupom.findUnique.mockResolvedValue({ id: 1, ...mockCouponData, ativo: true, criadoPor: 1 });

      const result = await couponService.findById(1);

      expect(result).toEqual(expect.objectContaining({ id: 1, ...mockCouponData }));
      expect(mockPrisma.cupom.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('deve lançar erro quando cupom não é encontrado', async () => {
      mockPrisma.cupom.findUnique.mockResolvedValue(null);

      await expect(couponService.findById(1)).rejects.toThrow(
        new AppError('Cupom não encontrado', HttpStatusCode.NOT_FOUND)
      );
    });
  });

  describe('findAll', () => {
    it('deve listar cupons com paginação', async () => {
      const mockCoupons = [
        { id: 1, ...mockCouponData, ativo: true, criadoPor: 1 },
        { id: 2, ...mockCouponData, ativo: true, criadoPor: 1 }
      ];

      mockPrisma.cupom.findMany.mockResolvedValue(mockCoupons);
      mockPrisma.cupom.count.mockResolvedValue(2);

      const query = {
        page: 1,
        limit: 10,
        sortBy: 'codigo' as const,
        sortOrder: 'desc' as const
      };

      const result = await couponService.findAll(query);

      expect(result).toEqual({
        data: mockCoupons,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      });

      expect(mockPrisma.cupom.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { codigo: 'desc' },
        skip: 0,
        take: 10
      });
    });
  });

  describe('validate', () => {
    it('deve validar um cupom com sucesso', async () => {
      const mockCoupon = {
        id: 1,
        ...mockCouponData,
        ativo: true,
        criadoPor: 1
      };

      mockPrisma.cupom.findUnique.mockResolvedValue(mockCoupon);

      const result = await couponService.validate('TESTE10', 200);

      expect(result).toEqual({
        valido: true,
        desconto: 20,
        valorFinal: 180
      });
    });

    it('deve lançar erro quando cupom não é encontrado', async () => {
      mockPrisma.cupom.findUnique.mockResolvedValue(null);

      await expect(couponService.validate('TESTE10', 200)).rejects.toThrow(
        new AppError('Cupom não encontrado', HttpStatusCode.NOT_FOUND)
      );
    });

    it('deve lançar erro quando cupom está fora do período de validade', async () => {
      const mockCoupon = {
        id: 1,
        ...mockCouponData,
        dataInicio: new Date(Date.now() + 86400000).toISOString(),
        ativo: true,
        criadoPor: 1
      };

      mockPrisma.cupom.findUnique.mockResolvedValue(mockCoupon);

      await expect(couponService.validate('TESTE10', 200)).rejects.toThrow(
        new AppError('Cupom fora do período de validade', HttpStatusCode.BAD_REQUEST)
      );
    });

    it('deve lançar erro quando valor mínimo de compra não é atingido', async () => {
      const mockCoupon = {
        id: 1,
        ...mockCouponData,
        valorMinimoCompra: 300,
        ativo: true,
        criadoPor: 1
      };

      mockPrisma.cupom.findUnique.mockResolvedValue(mockCoupon);

      await expect(couponService.validate('TESTE10', 200)).rejects.toThrow(
        new AppError('Valor mínimo de compra não atingido: R$ 300', HttpStatusCode.BAD_REQUEST)
      );
    });
  });
}); 