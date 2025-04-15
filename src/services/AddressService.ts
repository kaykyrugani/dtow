import { PrismaClient, Endereco } from '@prisma/client';
import { AppError } from '../errors/AppError';
import axios from 'axios';

const prisma = new PrismaClient();

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class AddressService {
  static async criarEndereco(
    userId: string,
    data: {
      cep: string;
      numero: string;
      complemento?: string;
      tipo: 'RESIDENCIAL' | 'COMERCIAL';
      principal: boolean;
    }
  ): Promise<Endereco> {
    try {
      // Buscar dados do CEP na API ViaCEP
      const viaCepResponse = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${data.cep}/json/`
      );

      if (viaCepResponse.data.erro) {
        throw new AppError('CEP inválido', 400);
      }

      // Se for endereço principal, desmarcar outros endereços principais
      if (data.principal) {
        await prisma.endereco.updateMany({
          where: { userId, principal: true },
          data: { principal: false },
        });
      }

      // Criar novo endereço
      const endereco = await prisma.endereco.create({
        data: {
          userId,
          cep: data.cep,
          logradouro: viaCepResponse.data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: viaCepResponse.data.bairro,
          cidade: viaCepResponse.data.localidade,
          estado: viaCepResponse.data.uf,
          tipo: data.tipo,
          principal: data.principal,
        },
      });

      return endereco;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao criar endereço', 500);
    }
  }

  static async listarEnderecos(userId: string): Promise<Endereco[]> {
    try {
      const enderecos = await prisma.endereco.findMany({
        where: { userId },
        orderBy: { principal: 'desc' },
      });

      return enderecos;
    } catch (error) {
      throw new AppError('Erro ao listar endereços', 500);
    }
  }

  static async atualizarEndereco(
    id: string,
    userId: string,
    data: {
      numero?: string;
      complemento?: string;
      tipo?: 'RESIDENCIAL' | 'COMERCIAL';
      principal?: boolean;
    }
  ): Promise<Endereco> {
    try {
      // Verificar se o endereço pertence ao usuário
      const endereco = await prisma.endereco.findFirst({
        where: { id, userId },
      });

      if (!endereco) {
        throw new AppError('Endereço não encontrado', 404);
      }

      // Se for endereço principal, desmarcar outros endereços principais
      if (data.principal) {
        await prisma.endereco.updateMany({
          where: { userId, principal: true },
          data: { principal: false },
        });
      }

      // Atualizar endereço
      const enderecoAtualizado = await prisma.endereco.update({
        where: { id },
        data: {
          numero: data.numero,
          complemento: data.complemento,
          tipo: data.tipo,
          principal: data.principal,
        },
      });

      return enderecoAtualizado;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao atualizar endereço', 500);
    }
  }

  static async deletarEndereco(id: string, userId: string): Promise<void> {
    try {
      // Verificar se o endereço pertence ao usuário
      const endereco = await prisma.endereco.findFirst({
        where: { id, userId },
      });

      if (!endereco) {
        throw new AppError('Endereço não encontrado', 404);
      }

      await prisma.endereco.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao deletar endereço', 500);
    }
  }

  static async definirEnderecoPrincipal(id: string, userId: string): Promise<Endereco> {
    try {
      // Verificar se o endereço pertence ao usuário
      const endereco = await prisma.endereco.findFirst({
        where: { id, userId },
      });

      if (!endereco) {
        throw new AppError('Endereço não encontrado', 404);
      }

      // Desmarcar outros endereços principais
      await prisma.endereco.updateMany({
        where: { userId, principal: true },
        data: { principal: false },
      });

      // Definir novo endereço principal
      const enderecoPrincipal = await prisma.endereco.update({
        where: { id },
        data: { principal: true },
      });

      return enderecoPrincipal;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao definir endereço principal', 500);
    }
  }
} 