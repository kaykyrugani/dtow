import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema';
import { createPaymentPreferenceSchema } from '../dtos/payment.dto';

const paymentRouter = Router();

// Rotas protegidas
paymentRouter.use(authMiddleware());

// Criar preferência de pagamento
paymentRouter.post(
  '/create-preference',
  validateSchema(createPaymentPreferenceSchema),
  PaymentController.criarPreferencia
);

// Consultar pagamento
paymentRouter.get(
  '/:paymentId',
  PaymentController.consultarPagamento
);

// Reembolsar pagamento (apenas admin)
paymentRouter.post(
  '/:paymentId/refund',
  authMiddleware(['ADMIN']),
  PaymentController.reembolsarPagamento
);

// Webhook do Mercado Pago (não requer autenticação)
paymentRouter.post('/webhooks/mercadopago', PaymentController.webhook);

export { paymentRouter }; 