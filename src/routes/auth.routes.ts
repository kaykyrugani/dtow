import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../services/AuthService';
import { validateRequest } from '../middlewares/validateRequest';
import { loginSchema, registerSchema } from '../validators/authSchema';

const authRouter = Router();
const authService = container.resolve(AuthService);

authRouter.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const usuario = await authService.cadastrar(req.body);
    return res.status(201).json(usuario);
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

export { authRouter }; 