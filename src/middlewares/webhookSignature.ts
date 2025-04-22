import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AppError } from '../errors/AppError';

/**
 * Middleware para verificar a assinatura do webhook do Mercado Pago
 * Valida o header X-Hub-Signature para garantir que a requisição é autêntica
 * Usa SHA256 para maior segurança
 */
export const verifyWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-hub-signature'];

    // Se não houver assinatura, rejeita a requisição
    if (!signature) {
      throw new AppError('Assinatura do webhook não fornecida', 401);
    }

    // Obtém o segredo do webhook das variáveis de ambiente
    const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new AppError('Configuração de webhook não encontrada', 500);
    }

    // Calcula a assinatura esperada usando SHA256
    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(payload);
    const calculatedSignature = `sha256=${hmac.digest('hex')}`;

    // Compara a assinatura recebida com a calculada
    if (signature !== calculatedSignature) {
      throw new AppError('Assinatura do webhook inválida', 401);
    }

    // Se a assinatura for válida, continua o processamento
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Erro ao verificar assinatura do webhook' });
  }
};
