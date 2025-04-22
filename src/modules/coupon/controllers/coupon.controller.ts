import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpStatusCode';
import { CouponService } from '../services/coupon.service';
import { CreateCouponInput, UpdateCouponInput, ListCouponsQuery } from '../schemas/coupon.schema';

export class CouponController {
  private couponService: CouponService;

  constructor(private prisma: PrismaClient) {
    this.couponService = new CouponService(prisma);
  }

  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Não autorizado', HttpStatusCode.UNAUTHORIZED);
      }

      const data = req.body as CreateCouponInput;
      const coupon = await this.couponService.create(userId, data);

      return res.status(HttpStatusCode.CREATED).json(coupon);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('ID inválido', HttpStatusCode.BAD_REQUEST);
      }

      const coupon = await this.couponService.findById(id);
      return res.json(coupon);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async findByCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { codigo } = req.params;
      const coupon = await this.couponService.findByCode(codigo);
      res.json(coupon);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as ListCouponsQuery;
      const result = await this.couponService.findAll(query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Não autorizado', HttpStatusCode.UNAUTHORIZED);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('ID inválido', HttpStatusCode.BAD_REQUEST);
      }

      const data = req.body as UpdateCouponInput;
      const coupon = await this.couponService.update(id, userId, data);

      return res.json(coupon);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Não autorizado', HttpStatusCode.UNAUTHORIZED);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('ID inválido', HttpStatusCode.BAD_REQUEST);
      }

      await this.couponService.delete(id, userId);
      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Não autorizado', HttpStatusCode.UNAUTHORIZED);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('ID inválido', HttpStatusCode.BAD_REQUEST);
      }

      const coupon = await this.couponService.updateStatus(id, userId, true);
      return res.json(coupon);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async deactivate(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Não autorizado', HttpStatusCode.UNAUTHORIZED);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('ID inválido', HttpStatusCode.BAD_REQUEST);
      }

      const coupon = await this.couponService.updateStatus(id, userId, false);
      return res.json(coupon);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async validate(req: Request, res: Response) {
    try {
      const { codigo } = req.params;
      const { valorTotal } = req.body;

      if (!valorTotal || typeof valorTotal !== 'number') {
        throw new AppError('Valor total inválido', HttpStatusCode.BAD_REQUEST);
      }

      const result = await this.couponService.validate(codigo, valorTotal);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }
}
