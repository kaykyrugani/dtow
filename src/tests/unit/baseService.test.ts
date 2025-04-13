import { describe, it, expect, beforeEach } from 'vitest';
import { BaseService } from '../../services/base.service';
import { mockPrisma } from '../mocks/prisma.mock';
import { PrismaClient } from '@prisma/client';

describe('BaseService', () => {
  let service: BaseService<'usuario'>;

  beforeEach(() => {
    service = new BaseService(mockPrisma as unknown as PrismaClient, 'usuario');
  });

  describe('paginar', () => {
    it('deve retornar dados paginados com valores padrão', async () => {
      // Arrange
      const items = [{ id: 1, nome: 'Test' }];
      mockPrisma.usuario.findMany.mockResolvedValue(items);
      mockPrisma.usuario.count.mockResolvedValue(1);

      // Act
      const result = await service.paginar({});

      // Assert
      expect(result).toEqual({
        items,
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      });
      expect(mockPrisma.usuario.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        orderBy: {}
      });
    });

    it('deve aplicar filtros e ordenação corretamente', async () => {
      // Arrange
      const items = [{ id: 1, nome: 'Test' }];
      const where = { nome: 'Test' };
      const orderBy = { nome: 'asc' as const };
      mockPrisma.usuario.findMany.mockResolvedValue(items);
      mockPrisma.usuario.count.mockResolvedValue(1);

      // Act
      const result = await service.paginar({ where, orderBy });

      // Assert
      expect(mockPrisma.usuario.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where,
        orderBy
      });
    });

    it('deve calcular paginação corretamente', async () => {
      // Arrange
      const items = [{ id: 2, nome: 'Test 2' }];
      mockPrisma.usuario.findMany.mockResolvedValue(items);
      mockPrisma.usuario.count.mockResolvedValue(21);

      // Act
      const result = await service.paginar({ page: 2, limit: 10 });

      // Assert
      expect(result).toEqual({
        items,
        total: 21,
        page: 2,
        limit: 10,
        totalPages: 3
      });
      expect(mockPrisma.usuario.findMany).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
        where: {},
        orderBy: {}
      });
    });

    it('deve lidar com erros do banco de dados', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPrisma.usuario.findMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.paginar({})).rejects.toThrow('Erro na operação do banco');
    });
  });
}); 