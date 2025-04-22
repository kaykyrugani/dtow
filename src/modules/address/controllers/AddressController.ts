import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { CepService } from '../services/CepService';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorMessages';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { enderecoSchema, EnderecoDTO } from '../dtos/EnderecoDTO';
import { PrismaClient } from '@prisma/client';

export class AddressController {
  private static prisma = new PrismaClient();
  private static cepService = container.resolve(CepService);

  static async consultarCep(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cep } = req.params;
      const endereco = await AddressController.cepService.consultarCep(cep);
      res.json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enderecoData = enderecoSchema.parse(req.body);

      // Consulta o CEP para validar e preencher dados
      const cepData = await AddressController.cepService.consultarCep(enderecoData.cep);

      // Atualiza os dados do endereço com as informações do CEP
      const enderecoCompleto = {
        ...enderecoData,
        logradouro: cepData.logradouro,
        bairro: cepData.bairro,
        cidade: cepData.cidade,
        uf: cepData.uf,
      };

      const endereco = await AddressController.prisma.endereco.create({
        data: enderecoCompleto,
      });

      res.status(HttpStatusCode.CREATED).json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const enderecoData = enderecoSchema.parse(req.body);

      // Consulta o CEP para validar e preencher dados
      const cepData = await AddressController.cepService.consultarCep(enderecoData.cep);

      // Atualiza os dados do endereço com as informações do CEP
      const enderecoCompleto = {
        ...enderecoData,
        logradouro: cepData.logradouro,
        bairro: cepData.bairro,
        cidade: cepData.cidade,
        uf: cepData.uf,
      };

      const endereco = await AddressController.prisma.endereco.update({
        where: { id },
        data: enderecoCompleto,
      });

      res.json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await AddressController.prisma.endereco.delete({
        where: { id },
      });

      res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  static async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const endereco = await AddressController.prisma.endereco.findUnique({
        where: { id },
      });

      if (!endereco) {
        throw new AppError(ERROR_CODES.NOT_FOUND, HttpStatusCode.NOT_FOUND, {
          message: 'Endereço não encontrado',
        });
      }

      res.json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async listarPorUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usuarioId } = req.params;

      const enderecos = await AddressController.prisma.endereco.findMany({
        where: { usuarioId },
      });

      res.json(enderecos);
    } catch (error) {
      next(error);
    }
  }
}
