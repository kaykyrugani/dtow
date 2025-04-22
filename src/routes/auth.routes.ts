import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../services/AuthService';
import { validateRequest } from '../middlewares/validateRequest';
import { loginSchema, registerSchema } from '../validators/authSchema';

const authRouter = Router();
const authService = container.resolve(AuthService);

authRouter.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.cadastrar(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token é obrigatório' });
    }

    const tokens = await authService.refresh(refreshToken);
    return res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token é obrigatório' });
    }

    await authService.logout(refreshToken);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { authRouter };
