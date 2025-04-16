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
 */

/**
 * @swagger
 * /payment/preference:
 *   post:
 *     summary: Cria uma preferência de pagamento
 *     description: Cria uma preferência de pagamento no Mercado Pago e retorna a URL de checkout
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
 *                 description: ID único do pedido
 *                 example: "ped_123456"
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto/serviço
 *                 example: "Curso de TypeScript"
 *               valor:
 *                 type: number
 *                 description: Valor em centavos
 *                 example: 10000
 *               formaPagamento:
 *                 type: string
 *                 enum: [credit_card, pix, bolbradesco]
 *                 description: Método de pagamento
 *                 example: "pix"
 *               comprador:
 *                 type: object
 *                 required:
 *                   - nome
 *                   - email
 *                   - cpf
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "joao@email.com"
 *                   cpf:
 *                     type: string
 *                     example: "12345678900"
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
 *                   example: "123456789"
 *                 init_point:
 *                   type: string
 *                   example: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=123456789"
 *                 valorOriginal:
 *                   type: number
 *                   example: 10000
 *                 valorFinal:
 *                   type: number
 *                   example: 9500
 *                 desconto:
 *                   type: number
 *                   example: 500
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido"
 *       429:
 *         description: Muitas requisições
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Muitas requisições, tente novamente mais tarde"
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar preferência de pagamento"
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
 *     summary: Recebe notificações de pagamento
 *     description: Endpoint para receber webhooks do Mercado Pago sobre atualizações de pagamento
 *     tags: [Pagamentos]
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
 *                 enum: [payment.created, payment.updated]
 *                 description: Tipo de ação do webhook
 *                 example: "payment.updated"
 *               data:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do pagamento no Mercado Pago
 *                     example: "123456789"
 *     responses:
 *       200:
 *         description: Webhook processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos"
 *       401:
 *         description: Assinatura inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Assinatura do webhook inválida"
 *       429:
 *         description: Muitas requisições
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Muitas requisições, tente novamente mais tarde"
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao processar webhook"
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
 *     summary: Realiza reembolso de pagamento
 *     description: Processa o reembolso de um pagamento, total ou parcial
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento a ser reembolsado
 *         example: "123456789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Valor do reembolso em centavos (opcional)
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Reembolso processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123456789"
 *                 status:
 *                   type: string
 *                   example: "refunded"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valor do reembolso inválido"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acesso negado. Apenas administradores podem realizar reembolsos"
 *       404:
 *         description: Pagamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pagamento não encontrado"
 *       429:
 *         description: Muitas requisições
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Muitas requisições, tente novamente mais tarde"
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao processar reembolso"
 */
paymentRouter.post(
  '/refund/:paymentId',
  rateLimit(15 * 60 * 1000, 50), // 50 requisições por 15 minutos
  adminMiddleware,
  validateRequest(refundSchema),
  paymentController.reembolsarPagamento.bind(paymentController)
);

export { paymentRouter }; 