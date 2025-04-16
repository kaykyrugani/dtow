import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddressService } from '../../../modules/address/services/address.service';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { AppError } from '../../../utils/AppError';

vi.mock('@prisma/client');
vi.mock('axios');

describe('AddressService', () => {
  let addressService: AddressService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      usuario: {
        findUnique: vi.fn(),
      },
      endereco: {
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        updateMany: vi.fn(),
      },
    };

    (PrismaClient as any).mockImplementation(() => mockPrisma);
    addressService = new AddressService();
  });

  describe('searchByCep', () => {
    it('deve retornar dados do endereço quando o CEP é válido', async () => {
      const mockResponse = {
        data: {
          cep: '12345-678',
          logradouro: 'Rua Teste',
          bairro: 'Bairro Teste',
          localidade: 'Cidade Teste',
          uf: 'SP',
        },
      };

      (axios.get as any).mockResolvedValue(mockResponse);

      const result = await addressService.searchByCep('12345678');

      expect(result).toEqual({
        cep: '12345678',
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'SP',
      });
    });

    it('deve lançar erro quando o CEP não é encontrado', async () => {
      const mockResponse = {
        data: {
          erro: true,
        },
      };

      (axios.get as any).mockResolvedValue(mockResponse);

      await expect(addressService.searchByCep('12345678')).rejects.toThrow(AppError);
    });
  });

  describe('create', () => {
    const mockUser = { id: 1 };
    const mockAddressData = {
      cep: '12345678',
      logradouro: 'Rua Teste',
      numero: '123',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'SP',
      principal: true,
    };

    it('deve criar um endereço com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);
      mockPrisma.endereco.create.mockResolvedValue({ id: 1, ...mockAddressData });

      const result = await addressService.create(1, mockAddressData);

      expect(result).toEqual({ id: 1, ...mockAddressData });
      expect(mockPrisma.endereco.create).toHaveBeenCalledWith({
        data: {
          ...mockAddressData,
          usuarioId: 1,
        },
      });
    });

    it('deve lançar erro quando o usuário não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(addressService.create(1, mockAddressData)).rejects.toThrow(AppError);
    });
  });

  describe('update', () => {
    const mockAddress = {
      id: 1,
      usuarioId: 1,
      cep: '12345678',
      logradouro: 'Rua Teste',
    };

    const mockUpdateData = {
      logradouro: 'Nova Rua',
    };

    it('deve atualizar um endereço com sucesso', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(mockAddress);
      mockPrisma.endereco.update.mockResolvedValue({ ...mockAddress, ...mockUpdateData });

      const result = await addressService.update(1, 1, mockUpdateData);

      expect(result).toEqual({ ...mockAddress, ...mockUpdateData });
      expect(mockPrisma.endereco.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockUpdateData,
      });
    });

    it('deve lançar erro quando o endereço não existe', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(null);

      await expect(addressService.update(1, 1, mockUpdateData)).rejects.toThrow(AppError);
    });
  });

  describe('delete', () => {
    const mockAddress = {
      id: 1,
      usuarioId: 1,
    };

    it('deve deletar um endereço com sucesso', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(mockAddress);
      mockPrisma.endereco.delete.mockResolvedValue(mockAddress);

      await addressService.delete(1, 1);

      expect(mockPrisma.endereco.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve lançar erro quando o endereço não existe', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(null);

      await expect(addressService.delete(1, 1)).rejects.toThrow(AppError);
    });
  });

  describe('listByUserId', () => {
    const mockAddresses = [
      { id: 1, usuarioId: 1 },
      { id: 2, usuarioId: 1 },
    ];

    it('deve retornar lista de endereços do usuário', async () => {
      mockPrisma.endereco.findMany.mockResolvedValue(mockAddresses);

      const result = await addressService.listByUserId(1);

      expect(result).toEqual(mockAddresses);
      expect(mockPrisma.endereco.findMany).toHaveBeenCalledWith({
        where: { usuarioId: 1 },
        orderBy: [
          { principal: 'desc' },
          { createdAt: 'desc' },
        ],
      });
    });
  });

  describe('setPrimary', () => {
    const mockAddress = {
      id: 1,
      usuarioId: 1,
      principal: false,
    };

    it('deve definir um endereço como principal com sucesso', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(mockAddress);
      mockPrisma.endereco.update.mockResolvedValue({ ...mockAddress, principal: true });

      const result = await addressService.setPrimary(1, 1);

      expect(result).toEqual({ ...mockAddress, principal: true });
      expect(mockPrisma.endereco.updateMany).toHaveBeenCalledWith({
        where: {
          usuarioId: 1,
          principal: true,
          id: { not: 1 },
        },
        data: { principal: false },
      });
      expect(mockPrisma.endereco.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { principal: true },
      });
    });

    it('deve lançar erro quando o endereço não existe', async () => {
      mockPrisma.endereco.findFirst.mockResolvedValue(null);

      await expect(addressService.setPrimary(1, 1)).rejects.toThrow(AppError);
    });
  });
}); 