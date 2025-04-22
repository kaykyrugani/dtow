import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ensureAuthenticated } from '../../../middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login);
authRoutes.post('/2fa/generate', ensureAuthenticated, authController.generate2FA);
authRoutes.post('/2fa/verify', ensureAuthenticated, authController.verify2FA);

export { authRoutes };
