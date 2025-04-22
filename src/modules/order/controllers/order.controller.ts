import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { AppError } from '../../../utils/AppError';
import { CreateOrderInput, UpdateOrderStatusInput } from '../schemas/order.schema';
import { HttpStatusCode } from '../../../constants/httpStatusCode';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const orderData = req.body as CreateOrderInput;
      const order = await this.orderService.create(userId, orderData.items);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.findById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Usuário não autenticado', HttpStatusCode.UNAUTHORIZED);
      }

      const orders = await this.orderService.findByUserId(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body as UpdateOrderStatusInput;

      if (!status) {
        throw new AppError('Status não informado', HttpStatusCode.BAD_REQUEST);
      }

      const order = await this.orderService.updateStatus(id, status);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.cancel(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
}
