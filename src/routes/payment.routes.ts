import { Router } from 'express';
import { PaymentController } from '../modules/payment/controllers/payment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares/validateSchema';
import { z } from 'zod';

const paymentRouter = Router();

const createPreferenceSchema = z.object({
  body: z.object({
    pedidoId: z.string().uuid(),
    valor: z.number().positive(),
    descricao: z.string().min(1)
  })
});

// Rota para criar preferência de pagamento (requer autenticação)
paymentRouter.post('/create-preference', authMiddleware(['USER', 'ADMIN']), PaymentController.criarPreferencia);

// Rota para webhook do Mercado Pago (não requer autenticação)
paymentRouter.post('/webhooks/mercadopago', PaymentController.webhook);

export { paymentRouter }; 