import { Request, Response, NextFunction } from 'express';
import { AddressService } from '../services/address.service';
import { createAddressSchema, updateAddressSchema } from '../dtos/address.dto';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpStatusCode';

export class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  async searchByCep(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cep } = req.params;
      const address = await this.addressService.searchByCep(cep);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const data = createAddressSchema.parse(req.body);
      const address = await this.addressService.create(userId, data);
      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const { id } = req.params;
      const data = updateAddressSchema.parse(req.body);
      const address = await this.addressService.update(Number(id), userId, data);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const { id } = req.params;
      await this.addressService.delete(Number(id), userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async listByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const addresses = await this.addressService.listByUserId(userId);
      res.json(addresses);
    } catch (error) {
      next(error);
    }
  }

  async setPrimary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const { id } = req.params;
      const address = await this.addressService.setPrimary(Number(id), userId);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
} 