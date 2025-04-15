import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddressService } from '../../services/address.service';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../errors/AppError';

vi.mock('@prisma/client');

describe('AddressService', () => {
  let addressService: AddressService;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = container.resolve(PrismaClient);
    addressService = new AddressService(prisma);
  });

  describe('criarEndereco', () => {
    it('deve criar um novo endereço com sucesso', async () => {
      const enderecoData = {
        cep: '12345678',
        rua: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        usuarioId: 1
      };

      const enderecoCriado = {
        id: 1,
        ...enderecoData,
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      vi.spyOn(prisma.endereco, 'create').mockResolvedValue(enderecoCriado);

      const resultado = await addressService.criarEndereco(enderecoData);

      expect(resultado).toEqual(enderecoCriado);
      expect(prisma.endereco.create).toHaveBeenCalledWith({
        data: enderecoData
      });
    });

    it('deve lançar erro quando falhar ao criar endereço', async () => {
      const enderecoData = {
        cep: '12345678',
        rua: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        usuarioId: 1
      };

      vi.spyOn(prisma.endereco, 'create').mockRejectedValue(new Error('Erro ao criar endereço'));

      await expect(addressService.criarEndereco(enderecoData)).rejects.toThrow(AppError);
    });
  });

  describe('listarEnderecos', () => {
    it('deve listar endereços do usuário com sucesso', async () => {
      const enderecos = [
        {
          id: 1,
          cep: '12345678',
          rua: 'Rua Teste',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          usuarioId: 1,
          criadoEm: new Date(),
          atualizadoEm: new Date()
        }
      ];

      vi.spyOn(prisma.endereco, 'findMany').mockResolvedValue(enderecos);

      const resultado = await addressService.listarEnderecos(1);

      expect(resultado).toEqual(enderecos);
      expect(prisma.endereco.findMany).toHaveBeenCalledWith({
        where: { usuarioId: 1 }
      });
    });

    it('deve lançar erro quando falhar ao listar endereços', async () => {
      vi.spyOn(prisma.endereco, 'findMany').mockRejectedValue(new Error('Erro ao listar endereços'));

      await expect(addressService.listarEnderecos(1)).rejects.toThrow(AppError);
    });
  });

  describe('atualizarEndereco', () => {
    it('deve atualizar endereço com sucesso', async () => {
      const enderecoData = {
        cep: '87654321',
        rua: 'Rua Nova',
        numero: '456',
        complemento: 'Apto 2',
        bairro: 'Jardim',
        cidade: 'Rio de Janeiro',
        estado: 'RJ'
      };

      const enderecoAtualizado = {
        id: 1,
        ...enderecoData,
        usuarioId: 1,
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      vi.spyOn(prisma.endereco, 'update').mockResolvedValue(enderecoAtualizado);

      const resultado = await addressService.atualizarEndereco(1, enderecoData);

      expect(resultado).toEqual(enderecoAtualizado);
      expect(prisma.endereco.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: enderecoData
      });
    });

    it('deve lançar erro quando falhar ao atualizar endereço', async () => {
      const enderecoData = {
        cep: '87654321',
        rua: 'Rua Nova',
        numero: '456',
        complemento: 'Apto 2',
        bairro: 'Jardim',
        cidade: 'Rio de Janeiro',
        estado: 'RJ'
      };

      vi.spyOn(prisma.endereco, 'update').mockRejectedValue(new Error('Erro ao atualizar endereço'));

      await expect(addressService.atualizarEndereco(1, enderecoData)).rejects.toThrow(AppError);
    });
  });

  describe('deletarEndereco', () => {
    it('deve deletar endereço com sucesso', async () => {
      vi.spyOn(prisma.endereco, 'delete').mockResolvedValue({} as any);

      await addressService.deletarEndereco(1);

      expect(prisma.endereco.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('deve lançar erro quando falhar ao deletar endereço', async () => {
      vi.spyOn(prisma.endereco, 'delete').mockRejectedValue(new Error('Erro ao deletar endereço'));

      await expect(addressService.deletarEndereco(1)).rejects.toThrow(AppError);
    });
  });

  describe('definirEnderecoPrincipal', () => {
    it('deve definir endereço como principal com sucesso', async () => {
      const enderecoAtualizado = {
        id: '1',
        cep: '12345678',
        logradouro: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        principal: true,
        usuarioId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      vi.spyOn(prisma.$transaction).mockResolvedValue(enderecoAtualizado);

      const resultado = await addressService.definirEnderecoPrincipal('1', '1');

      expect(resultado).toEqual(enderecoAtualizado);
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('deve lançar erro quando falhar ao definir endereço principal', async () => {
      vi.spyOn(prisma.$transaction).mockRejectedValue(new Error('Erro ao definir endereço principal'));

      await expect(addressService.definirEnderecoPrincipal('1', '1')).rejects.toThrow(AppError);
    });
  });
}); 