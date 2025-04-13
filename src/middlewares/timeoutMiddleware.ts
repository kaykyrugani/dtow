import { Request, Response, NextFunction } from 'express';

export const timeoutMiddleware = (timeout: number = 500) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          status: 'error',
          message: 'Timeout da requisição'
        });
      }
    }, timeout);

    // Limpa o timer quando a resposta for enviada
    res.on('finish', () => {
      clearTimeout(timer);
    });

    // Limpa o timer em caso de erro
    res.on('error', () => {
      clearTimeout(timer);
    });

    next();
  };
}; 