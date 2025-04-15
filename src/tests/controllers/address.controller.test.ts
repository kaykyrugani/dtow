import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { AddressController } from '../../controllers/address.controller';
import { AddressService } from '../../services/address.service';
import { container } from 'tsyringe';
import { AppError } from '../../errors/AppError';
import { Prisma } from '@prisma/client';
import { TipoUsuario } from '../../types/TipoUsuario';

vi.mock('tsyringe');

describe('AddressController', () => {
  let addressController: AddressController;
  let mockAddressService: any;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockAddressService = {
      criarEndereco: vi.fn(),
      listarEnderecos: vi.fn(),
      atualizarEndereco: vi.fn(),
      deletarEndereco: vi.fn()
    };

    vi.spyOn(container, 'resolve').mockReturnValue(mockAddressService);

    addressController = new AddressController();

    mockReq = {
      user: { id: 1, tipo: TipoUsuario.CLIENTE },
      body: {
        cep: '12345-678',
        rua: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'Estado Teste'
      },
      params: {}
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn()
    };

    mockNext = vi.fn();
  });

  describe('criarEndereco', () => {
    it('deve criar um endereço com sucesso', async () => {
      const mockEndereco = {
        id: 1,
        ...mockReq.body,
        usuarioId: mockReq.user!.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockAddressService.criarEndereco.mockResolvedValue(mockEndereco);

      await addressController.criarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAddressService.criarEndereco).toHaveBeenCalledWith({
        ...mockReq.body,
        usuarioId: mockReq.user!.id
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockEndereco);
    });

    it('deve chamar next com erro se o serviço falhar', async () => {
      const error = new AppError('Erro ao criar endereço');
      mockAddressService.criarEndereco.mockRejectedValue(error);

      await addressController.criarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('listarEnderecos', () => {
    it('deve listar endereços com sucesso', async () => {
      const mockEnderecos = [
        {
          id: 1,
          ...mockReq.body,
          usuarioId: mockReq.user!.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockAddressService.listarEnderecos.mockResolvedValue(mockEnderecos);

      await addressController.listarEnderecos(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAddressService.listarEnderecos).toHaveBeenCalledWith(mockReq.user!.id);
      expect(mockRes.json).toHaveBeenCalledWith(mockEnderecos);
    });

    it('deve chamar next com erro se o serviço falhar', async () => {
      const error = new AppError('Erro ao listar endereços');
      mockAddressService.listarEnderecos.mockRejectedValue(error);

      await addressController.listarEnderecos(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('atualizarEndereco', () => {
    it('deve atualizar um endereço com sucesso', async () => {
      const enderecoId = 1;
      mockReq.params = { id: enderecoId.toString() };

      const mockEnderecoAtualizado = {
        id: enderecoId,
        ...mockReq.body,
        usuarioId: mockReq.user!.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockAddressService.atualizarEndereco.mockResolvedValue(mockEnderecoAtualizado);

      await addressController.atualizarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAddressService.atualizarEndereco).toHaveBeenCalledWith(
        enderecoId,
        mockReq.body
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockEnderecoAtualizado);
    });

    it('deve chamar next com erro se o serviço falhar', async () => {
      mockReq.params = { id: '1' };
      const error = new AppError('Erro ao atualizar endereço');
      mockAddressService.atualizarEndereco.mockRejectedValue(error);

      await addressController.atualizarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('deletarEndereco', () => {
    it('deve deletar um endereço com sucesso', async () => {
      const enderecoId = 1;
      mockReq.params = { id: enderecoId.toString() };

      await addressController.deletarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAddressService.deletarEndereco).toHaveBeenCalledWith(enderecoId);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });

    it('deve chamar next com erro se o serviço falhar', async () => {
      mockReq.params = { id: '1' };
      const error = new AppError('Erro ao deletar endereço');
      mockAddressService.deletarEndereco.mockRejectedValue(error);

      await addressController.deletarEndereco(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
}); 