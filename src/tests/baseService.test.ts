import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseService } from '../services/BaseService';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

interface TestModel {
  id: number;
  name: string;
  price: number;
}

class TestService extends BaseService<'produto'> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'produto');
  }
}

describe('BaseService', () => {
  let service: TestService;
  let mockPrisma: PrismaClient;

  beforeEach(() => {
    mockPrisma = {
      produto: {
        findMany: vi.fn(),
        count: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    } as unknown as PrismaClient;

    service = new TestService(mockPrisma);
  });

  describe('findAll', () => {
    it('deve retornar resultados paginados', async () => {
      const mockData = [
        { id: 1, name: 'Test 1', price: 100 },
        { id: 2, name: 'Test 2', price: 200 },
      ];
      const mockCount = 2;

      mockPrisma.produto.findMany.mockResolvedValue(mockData);
      mockPrisma.produto.count.mockResolvedValue(mockCount);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.items).toEqual(mockData);
      expect(result.total).toBe(mockCount);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
      expect(result.hasNext).toBe(false);
      expect(result.hasPrevious).toBe(false);
    });

    it('deve usar valores padrão quando não fornecidos', async () => {
      mockPrisma.produto.findMany.mockResolvedValue([]);
      mockPrisma.produto.count.mockResolvedValue(0);

      await service.findAll();

      expect(mockPrisma.produto.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        orderBy: {}
      });
    });

    it('deve aplicar ordenação corretamente', async () => {
      mockPrisma.produto.findMany.mockResolvedValue([]);
      mockPrisma.produto.count.mockResolvedValue(0);

      await service.findAll({
        page: 1,
        limit: 10,
        orderBy: { name: 'desc' }
      });

      expect(mockPrisma.produto.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        orderBy: { name: 'desc' }
      });
    });
  });

  describe('findById', () => {
    it('deve retornar item por id', async () => {
      const mockItem = { id: 1, name: 'Test', price: 100 };
      mockPrisma.produto.findUnique.mockResolvedValue(mockItem);

      const result = await service.findById(1);

      expect(result).toEqual(mockItem);
      expect(mockPrisma.produto.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('deve retornar null quando item não encontrado', async () => {
      mockPrisma.produto.findUnique.mockResolvedValue(null);

      const result = await service.findById(1);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('deve criar novo item', async () => {
      const mockData = { name: 'New Test', price: 300 };
      const mockCreated = { id: 1, ...mockData };

      mockPrisma.produto.create.mockResolvedValue(mockCreated);

      const result = await service.create(mockData);

      expect(result).toEqual(mockCreated);
      expect(mockPrisma.produto.create).toHaveBeenCalledWith({
        data: mockData
      });
    });

    it('deve lançar erro quando dados são inválidos', async () => {
      mockPrisma.produto.create.mockRejectedValue(new Error('Dados inválidos'));

      await expect(service.create({})).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('deve atualizar item existente', async () => {
      const mockData = { name: 'Updated Test', price: 400 };
      const mockUpdated = { id: 1, ...mockData };

      mockPrisma.produto.update.mockResolvedValue(mockUpdated);

      const result = await service.update(1, mockData);

      expect(result).toEqual(mockUpdated);
      expect(mockPrisma.produto.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockData
      });
    });

    it('deve lançar erro quando item não existe', async () => {
      mockPrisma.produto.update.mockRejectedValue(new Error('Registro não encontrado'));

      await expect(service.update(999, {})).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('deve excluir item', async () => {
      mockPrisma.produto.delete.mockResolvedValue({ id: 1 });

      await service.delete(1);

      expect(mockPrisma.produto.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('deve lançar erro quando item não existe', async () => {
      mockPrisma.produto.delete.mockRejectedValue(new Error('Registro não encontrado'));

      await expect(service.delete(999)).rejects.toThrow();
    });
  });

  describe('handleError', () => {
    it('deve tratar AppError', () => {
      const error = new AppError('Erro personalizado', 400);

      expect(() => service['handleError'](error)).toThrow(error);
    });

    it('deve tratar erro de registro duplicado', () => {
      const error = { code: 'P2002' };

      expect(() => service['handleError'](error)).toThrow('Registro duplicado encontrado');
    });

    it('deve tratar erro de registro não encontrado', () => {
      const error = { code: 'P2025' };

      expect(() => service['handleError'](error)).toThrow('Registro não encontrado');
    });

    it('deve tratar erro genérico', () => {
      const error = new Error('Erro personalizado');

      expect(() => service['handleError'](error)).toThrow('Erro personalizado');
    });
  });
}); 