import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    const result = await this.authService.login({ email, password });

    return response.json(result);
  };

  generate2FA = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.user;

    const result = await this.authService.generate2FASecret(id);

    return response.json(result);
  };

  verify2FA = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.user;
    const { token } = request.body;

    await this.authService.verify2FA(id, token);

    return response.status(200).send();
  };
} 