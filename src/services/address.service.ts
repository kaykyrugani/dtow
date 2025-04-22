import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';

export class AddressService {
  constructor(private prisma: PrismaClient) {}

  async criarEndereco(data: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    usuarioId: number;
  }) {
    try {
      const endereco = await this.prisma.endereco.create({
        data,
      });

      return endereco;
    } catch (error) {
      throw new AppError('Erro ao criar endereço', 400);
    }
  }

  async listarEnderecos(usuarioId: number) {
    try {
      const enderecos = await this.prisma.endereco.findMany({
        where: { usuarioId },
      });

      return enderecos;
    } catch (error) {
      throw new AppError('Erro ao listar endereços', 400);
    }
  }

  async atualizarEndereco(
    id: number,
    data: {
      cep?: string;
      rua?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cidade?: string;
      estado?: string;
    },
  ) {
    try {
      const endereco = await this.prisma.endereco.update({
        where: { id },
        data,
      });

      return endereco;
    } catch (error) {
      throw new AppError('Erro ao atualizar endereço', 400);
    }
  }

  async deletarEndereco(id: number) {
    try {
      await this.prisma.endereco.delete({
        where: { id },
      });
    } catch (error) {
      throw new AppError('Erro ao deletar endereço', 400);
    }
  }
}
