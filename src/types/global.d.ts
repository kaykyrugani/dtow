declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        nome: string;
        email: string;
        tipoUsuario: string;
      }
    }
  }
}

export {}; 