import { Router } from 'express';
import { CouponController } from '../controllers/coupon.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema';
import { createCouponSchema, updateCouponSchema } from '../dtos/coupon.dto';
import { PrismaClient } from '@prisma/client';

const couponRouter = Router();
const prisma = new PrismaClient();
const couponController = new CouponController(prisma);

// Rotas públicas
couponRouter.get('/', (req, res, next) => couponController.findAll(req, res, next));
couponRouter.get('/:id', (req, res) => couponController.findById(req, res));
couponRouter.get('/codigo/:codigo', (req, res, next) => couponController.findByCode(req, res, next));
couponRouter.post('/validar', (req, res) => couponController.validate(req, res));

// Rotas protegidas (apenas admin)
couponRouter.use(authMiddleware(['ADMIN']));

// Criar cupom
couponRouter.post('/', validateSchema(createCouponSchema), (req, res) => couponController.create(req, res));

// Atualizar cupom
couponRouter.put('/:id', validateSchema(updateCouponSchema), (req, res) => couponController.update(req, res));

// Deletar cupom
couponRouter.delete('/:id', (req, res) => couponController.delete(req, res));

// Ativar cupom
couponRouter.patch('/:id/ativar', (req, res) => couponController.activate(req, res));

// Desativar cupom
couponRouter.patch('/:id/desativar', (req, res) => couponController.deactivate(req, res));

export { couponRouter };