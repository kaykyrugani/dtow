import 'reflect-metadata';
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import { applySecurityMiddleware } from './middlewares/security'
import logger from './utils/logger'
import './config/container'

// Função para criar a aplicação (útil para testes)
export function createApp() {
  const app = express()

  // Middlewares básicos
  app.use(cors())
  app.use(express.json())

  // Middlewares de segurança
  applySecurityMiddleware(app)

  // Documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Rota de health check para testes
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Rotas da API
  app.use('/api', router)

  // Middleware de tratamento de erros
  app.use(errorHandler)

  // Log de inicialização
  logger.info('Aplicação inicializada com sucesso')

  return app;
}

// Cria a aplicação para uso normal
const app = createApp();

export { app } 