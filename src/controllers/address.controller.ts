import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { AddressService } from '../services/address.service';
import { AppError } from '../errors/AppError';

export class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = container.resolve(AddressService);
  }

  async criarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const { cep, rua, numero, complemento, bairro, cidade, estado } = req.body;
      const usuarioId = req.user.id;

      const endereco = await this.addressService.criarEndereco({
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        usuarioId
      });

      return res.status(201).json(endereco);
    } catch (error) {
      next(error);
    }
  }

  async listarEnderecos(req: Request, res: Response, next: NextFunction) {
    try {
      const usuarioId = req.user.id;

      const enderecos = await this.addressService.listarEnderecos(usuarioId);

      return res.json(enderecos);
    } catch (error) {
      next(error);
    }
  }

  async atualizarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

      const endereco = await this.addressService.atualizarEndereco(Number(id), {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      });

      return res.json(endereco);
    } catch (error) {
      next(error);
    }
  }

  async deletarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.addressService.deletarEndereco(Number(id));

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 