import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    status: 'error',
    message: `Rota ${req.method} ${req.path} não encontrada`,
  });
};
