import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorCodes';
import { CreateAddressDTO, UpdateAddressDTO } from '../dtos/address.dto';

export class AddressService {
  private prisma: PrismaClient;
  private viaCepBaseUrl: string;

  constructor() {
    this.prisma = new PrismaClient();
    this.viaCepBaseUrl = 'https://viacep.com.br/ws';
  }

  async searchByCep(cep: string) {
    try {
      const response = await axios.get(`${this.viaCepBaseUrl}/${cep}/json`);

      if (response.data.erro) {
        throw new AppError('CEP não encontrado', ERROR_CODES.NOT_FOUND);
      }

      return {
        cep: response.data.cep.replace(/\D/g, ''),
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao buscar CEP', ERROR_CODES.EXTERNAL_SERVICE_ERROR);
    }
  }

  async create(userId: number, data: CreateAddressDTO) {
    // Verificar se o usuário existe
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', ERROR_CODES.NOT_FOUND);
    }

    // Se for endereço principal, desmarcar outros endereços principais
    if (data.principal) {
      await this.prisma.endereco.updateMany({
        where: {
          usuarioId: userId,
          principal: true,
        },
        data: { principal: false },
      });
    }

    // Criar o endereço
    const address = await this.prisma.endereco.create({
      data: {
        ...data,
        usuarioId,
      },
    });

    return address;
  }

  async update(id: number, userId: number, data: UpdateAddressDTO) {
    const address = await this.prisma.endereco.findFirst({
      where: {
        id,
        usuarioId,
      },
    });

    if (!address) {
      throw new AppError('Endereço não encontrado', ERROR_CODES.NOT_FOUND);
    }

    // Se for endereço principal, desmarcar outros endereços principais
    if (data.principal) {
      await this.prisma.endereco.updateMany({
        where: {
          usuarioId,
          principal: true,
          id: { not: id },
        },
        data: { principal: false },
      });
    }

    const updatedAddress = await this.prisma.endereco.update({
      where: { id },
      data,
    });

    return updatedAddress;
  }

  async delete(id: number, userId: number) {
    const address = await this.prisma.endereco.findFirst({
      where: {
        id,
        usuarioId,
      },
    });

    if (!address) {
      throw new AppError('Endereço não encontrado', ERROR_CODES.NOT_FOUND);
    }

    await this.prisma.endereco.delete({
      where: { id },
    });
  }

  async listByUserId(userId: number) {
    const addresses = await this.prisma.endereco.findMany({
      where: { usuarioId: userId },
      orderBy: [{ principal: 'desc' }, { createdAt: 'desc' }],
    });

    return addresses;
  }

  async setPrimary(id: number, userId: number) {
    const address = await this.prisma.endereco.findFirst({
      where: {
        id,
        usuarioId,
      },
    });

    if (!address) {
      throw new AppError('Endereço não encontrado', ERROR_CODES.NOT_FOUND);
    }

    // Desmarcar outros endereços principais
    await this.prisma.endereco.updateMany({
      where: {
        usuarioId,
        principal: true,
        id: { not: id },
      },
      data: { principal: false },
    });

    // Marcar este endereço como principal
    const updatedAddress = await this.prisma.endereco.update({
      where: { id },
      data: { principal: true },
    });

    return updatedAddress;
  }
}
