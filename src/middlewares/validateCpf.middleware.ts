import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { CpfValidatorService } from '../modules/validation/services/CpfValidatorService';

/**
 * Middleware para validar CPF em rotas
 * Verifica se o CPF no corpo da requisição é válido
 */
export const validateCpfMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cpfValidatorService = container.resolve(CpfValidatorService);
      
      // Verifica se o CPF está presente no corpo da requisição
      if (!req.body.cpf) {
        return next();
      }
      
      // Valida o CPF
      cpfValidatorService.validarCpf(req.body.cpf);
      
      // Formata o CPF antes de prosseguir
      req.body.cpf = cpfValidatorService.validarEFormatarCpf(req.body.cpf);
      
      next();
    } catch (error) {
      next(error);
    }
  };
}; 