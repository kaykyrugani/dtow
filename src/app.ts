import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './docs/swagger.json'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import { applySecurityMiddleware } from './middlewares/security'
import logger from './utils/logger'

const app = express()

// Middlewares básicos
app.use(cors())
app.use(express.json())

// Middlewares de segurança
applySecurityMiddleware(app)

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Rotas da API
app.use('/api', router)

// Middleware de tratamento de erros
app.use(errorHandler)

// Log de inicialização
logger.info('Aplicação inicializada com sucesso')

export { app } 