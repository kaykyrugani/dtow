import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { ZodError } from 'zod';
import { container } from 'tsyringe';

export class AuthController {
  private static authService = container.resolve(AuthService);

  static async cadastrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthController.authService.cadastrar(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthController.authService.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async recuperarSenha(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const result = await AuthController.authService.gerarTokenRecuperacao(email);

      if (result.status === 'ok') {
        // Em produção, você enviaria o token por email
        // Por enquanto, retornamos o token diretamente
        res.json({
          mensagem: 'Se o email existir, você receberá as instruções de recuperação',
          token: result.token, // Remover em produção
        });
      } else {
        res.json({ mensagem: result.mensagem });
      }
    } catch (error) {
      next(error);
    }
  }

  static async alterarSenha(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, novaSenha } = req.body;
      const result = await AuthController.authService.alterarSenha(token, novaSenha);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
