import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createPreferenceSchema, webhookSchema, refundSchema } from '../dtos/payment.dto';
import { authMiddleware } from '../../../middlewares/auth';
import { adminMiddleware } from '../../../middlewares/admin';
import { verifyWebhookSignature } from '../../../middlewares/webhookSignature';
import { rateLimit } from '../../../middlewares/rateLimit';

const paymentRouter = Router();
const paymentController = PaymentController.getInstance();

/**
 * @swagger
 * tags:
 *   name: Pagamentos
 *   description: Endpoints para gerenciamento de pagamentos via Mercado Pago
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     webhookSignature:
 *       type: apiKey
 *       in: header
 *       name: X-Hub-Signature
 *       description: Assinatura HMAC-SHA256 do payload
 */

/**
 * @swagger
 * /payment/preference:
 *   post:
 *     summary: Cria uma preferência de pagamento
 *     description: |
 *       Cria uma preferência de pagamento no Mercado Pago.
 *       - Rate limit: 100 requisições por 15 minutos
 *       - Validação de dados via Zod
 *       - Registro automático no histórico de pagamentos
 *     tags: [Pagamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedidoId
 *               - descricao
 *               - valor
 *               - formaPagamento
 *               - comprador
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido
 *               descricao:
 *                 type: string
 *                 description: Descrição do pagamento
 *               valor:
 *                 type: number
 *                 description: Valor do pagamento (deve ser positivo)
 *               formaPagamento:
 *                 type: string
 *                 enum: [CREDIT_CARD, PIX, BANK_SLIP]
 *                 description: Forma de pagamento
 *               comprador:
 *                 type: object
 *                 required:
 *                   - nome
 *                   - email
 *                   - cpf
 *                 properties:
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   cpf:
 *                     type: string
 *               parcelas:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 description: Número de parcelas (opcional)
 *     responses:
 *       200:
 *         description: Preferência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da preferência no Mercado Pago
 *                 init_point:
 *                   type: string
 *                   description: URL para iniciar o pagamento
 *                 valorOriginal:
 *                   type: number
 *                   description: Valor original do pagamento
 *                 valorFinal:
 *                   type: number
 *                   description: Valor final após descontos
 *                 desconto:
 *                   type: number
 *                   description: Valor do desconto aplicado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       429:
 *         description: Muitas requisições
 *       500:
 *         description: Erro interno do servidor
 */
paymentRouter.post(
  '/preference',
  rateLimit(15 * 60 * 1000, 100), // 100 requisições por 15 minutos
  validateRequest(createPreferenceSchema),
  paymentController.createPreference.bind(paymentController)
);

/**
 * @swagger
 * /payment/webhook:
 *   post:
 *     summary: Recebe notificações de webhook do Mercado Pago
 *     description: |
 *       Processa notificações de webhook do Mercado Pago.
 *       - Rate limit: 200 requisições por 15 minutos
 *       - Validação de assinatura HMAC-SHA256
 *       - Verificação de idempotência
 *       - Registro automático no histórico
 *     tags: [Pagamentos]
 *     security:
 *       - webhookSignature: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - data
 *             properties:
 *               action:
 *                 type: string
 *                 description: Tipo de ação do webhook
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do pagamento
 *     responses:
 *       200:
 *         description: Webhook processado com sucesso
 *       401:
 *         description: Assinatura inválida
 *       429:
 *         description: Muitas requisições
 *       500:
 *         description: Erro interno do servidor
 */
paymentRouter.post(
  '/webhook',
  rateLimit(15 * 60 * 1000, 200), // 200 requisições por 15 minutos
  validateRequest(webhookSchema),
  verifyWebhookSignature,
  paymentController.handleWebhook.bind(paymentController)
);

// Rotas protegidas
paymentRouter.use(authMiddleware);

/**
 * @swagger
 * /payment/refund/{paymentId}:
 *   post:
 *     summary: Processa reembolso de um pagamento
 *     description: |
 *       Processa o reembolso de um pagamento.
 *       - Rate limit: 50 requisições por 15 minutos
 *       - Requer autenticação de administrador
 *       - Validação de status do pagamento
 *       - Registro automático no histórico
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Valor do reembolso (opcional, deve ser positivo)
 *     responses:
 *       200:
 *         description: Reembolso processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [refunded]
 *                 amount:
 *                   type: number
 *                   description: Valor reembolsado
 *       400:
 *         description: Pagamento não aprovado ou já reembolsado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (não é administrador)
 *       404:
 *         description: Pagamento não encontrado
 *       429:
 *         description: Muitas requisições
 *       500:
 *         description: Erro interno do servidor
 */
paymentRouter.post(
  '/refund/:paymentId',
  rateLimit(15 * 60 * 1000, 50), // 50 requisições por 15 minutos
  adminMiddleware,
  validateRequest(refundSchema),
  paymentController.reembolsarPagamento.bind(paymentController)
);

export { paymentRouter }; 