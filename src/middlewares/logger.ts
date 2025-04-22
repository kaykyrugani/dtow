import morgan from 'morgan';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Criar diretório de logs se não existir
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Stream para logs de acesso
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });

// Formato personalizado para logs
morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('error', (req: Request, res: Response) => res.locals.error);

const format =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms :body';

// Logger para desenvolvimento
export const devLogger = morgan('dev');

// Logger para produção
export const prodLogger = morgan(format, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400, // Loga apenas erros em produção
});

// Logger condicional baseado no ambiente
export const logger = (req: Request, res: Response, next: Function) => {
  if (process.env.NODE_ENV === 'development') {
    return devLogger(req, res, next);
  }
  return prodLogger(req, res, next);
};
