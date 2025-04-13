import { z } from 'zod';
import { createLogger, transports } from 'winston';

// Logger temporário para erros de inicialização
const setupLogger = createLogger({
  level: 'warn',
  transports: [new transports.Console()]
});

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development')
    .describe('Ambiente da aplicação'),
    
  REDIS_HOST: z.string()
    .min(1, 'REDIS_HOST não pode estar vazio')
    .default('localhost')
    .describe('Host do Redis'),
    
  REDIS_PORT: z.coerce
    .number()
    .int('Porta deve ser um número inteiro')
    .min(1, 'Porta inválida')
    .max(65535, 'Porta inválida')
    .default(6379)
    .describe('Porta do Redis'),
    
  LOGTAIL_API_KEY: z.string()
    .optional()
    .describe('API Key do Logtail (opcional em development)')
    .refine(
      (val) => process.env.NODE_ENV !== 'production' || (val && val.length > 0),
      'LOGTAIL_API_KEY é obrigatório em produção'
    ),

  JWT_SECRET: z.string()
    .min(32, 'JWT_SECRET deve ter pelo menos 32 caracteres')
    .default('development_jwt_secret_key_min_32_chars')
    .describe('Chave secreta para JWT'),

  DATABASE_URL: z.string()
    .min(1, 'DATABASE_URL não pode estar vazio')
    .describe('URL de conexão com o banco de dados')
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    const env = envSchema.parse(process.env);
    setupLogger.info('✅ Variáveis de ambiente validadas com sucesso');
    return env;
  } catch (error) {
    setupLogger.error('❌ Erro na validação das variáveis de ambiente:', {
      errors: error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
    throw error;
  }
}

// Exporta o objeto env já validado
export const env = validateEnv(); 