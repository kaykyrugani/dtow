import dotenv from 'dotenv';
import { app } from './app';
import logger from './utils/logger';

// Configuração do dotenv
dotenv.config();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
}); 