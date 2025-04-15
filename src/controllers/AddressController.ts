import { Request, Response, NextFunction } from 'express';
import { AddressService } from '../services/AddressService';
import { AppError } from '../errors/AppError';
import { z } from 'zod';

const createAddressSchema = z.object({
  cep: z.string().length(8),
  numero: z.string(),
  complemento: z.string().optional(),
  tipo: z.enum(['RESIDENCIAL', 'COMERCIAL']).optional(),
  principal: z.boolean().optional()
});

export class AddressController {
  static async criarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const endereco = await AddressService.criarEndereco(userId, req.body);
      return res.status(201).json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async listarEnderecos(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const enderecos = await AddressService.listarEnderecos(userId);
      return res.json(enderecos);
    } catch (error) {
      next(error);
    }
  }

  static async atualizarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const endereco = await AddressService.atualizarEndereco(id, userId, req.body);
      return res.json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async deletarEndereco(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      await AddressService.deletarEndereco(id, userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async definirEnderecoPrincipal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const endereco = await AddressService.definirEnderecoPrincipal(id, userId);
      return res.json(endereco);
    } catch (error) {
      next(error);
    }
  }
} 