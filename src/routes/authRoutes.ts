import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import rateLimit from 'express-rate-limit';
import { RequestHandler } from 'express';

const router = Router();

// Rate limit específico para tentativas de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 tentativas
  message: { erro: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
});

// Rotas públicas
router.post('/cadastro', AuthController.cadastrar as RequestHandler);
router.post('/login', loginLimiter, AuthController.login as RequestHandler);
router.post('/recuperar-senha', AuthController.recuperarSenha as RequestHandler);
router.post('/alterar-senha', AuthController.alterarSenha as RequestHandler);

export default router;
