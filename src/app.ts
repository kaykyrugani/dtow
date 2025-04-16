import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import { applySecurityMiddleware } from './middlewares/security'
import { logger } from './config/logger'
import './config/container'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { validateEnv } from './config/validateEnv'
import compression from 'compression'
import { cacheService } from './services/cache.service'
import { setupSwagger } from './config/swagger'
import { sanitizeInput } from './middlewares/sanitizer'
import { metricsMiddleware } from './middlewares/metrics.middleware'
import { MetricsService } from './services/metrics.service'
import { RedisService } from './services/redis.service'
import metricsRoutes from './routes/metrics.routes'
import { apiMetricsMiddleware, databaseMetricsMiddleware, cacheMetricsMiddleware } from './middlewares/performance.middleware'
import { config } from './config'
import {
  authMiddleware,
  validateSchema,
  cacheMiddleware,
  rateLimitMiddleware,
  corsMiddleware,
  loggingMiddleware,
  notFoundMiddleware,
} from './middlewares'

// Validar variáveis de ambiente
const env = validateEnv()

// Função para criar a aplicação (útil para testes)
export function createApp() {
  const app = express()

  // Middlewares básicos
  const corsOptions = {
    origin: env.CORS_ORIGINS.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 horas
  }

  // Middlewares de segurança
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.onlywave.com']
      }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    dnsPrefetchControl: true,
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true
  }))

  // Logging
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }))

  // Compressão
  app.use(compression({ level: env.COMPRESSION_LEVEL }))

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW * 60 * 1000,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false
  })
  app.use(limiter)

  // Body Parser
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Sanitização de entradas
  app.use(sanitizeInput)

  // Middlewares de segurança
  app.use(cors(corsOptions))

  // Middlewares de segurança
  applySecurityMiddleware(app)

  // Documentação Swagger
  setupSwagger(app)

  // Middlewares de métricas
  app.use(apiMetricsMiddleware)
  app.use(databaseMetricsMiddleware)
  app.use(cacheMetricsMiddleware)

  // Rota de health check para testes
  app.get('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: process.env.npm_package_version
    })
  })

  // Rotas da API
  app.use('/api', router)

  // Rotas de métricas
  app.use('/api/metrics', metricsRoutes)

  // Middleware de tratamento de erros
  app.use(errorHandler)

  // Inicialização do Redis
  cacheService.connect().catch((error: Error) => {
    logger.error('Erro ao inicializar Redis:', error)
  })

  // Métricas do Prometheus
  app.get('/metrics', async (req, res) => {
    const metricsService = MetricsService.getInstance()
    res.set('Content-Type', metricsService.getMetricsContentType())
    res.end(await metricsService.getMetrics())
  })

  // Inicialização do Redis
  RedisService.getInstance()

  // Log de inicialização
  logger.info('Aplicação inicializada com sucesso', {
    environment: env.NODE_ENV,
    version: process.env.npm_package_version
  })

  return app;
}

// Cria a aplicação para uso normal
const app = createApp();

export { app, env } 