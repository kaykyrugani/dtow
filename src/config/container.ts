import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { LoggingService } from '../services/LoggingService';
import { LoggingInterface } from '../interfaces/LoggingInterface';
import { env, EnvConfig } from './env';

// Database
container.registerInstance('PrismaClient', new PrismaClient());

// Repositories
container.registerSingleton('UsuarioRepository', UsuarioRepository);

// Registra configurações
container.registerInstance<EnvConfig>('Env', env);

// Registra interfaces
container.registerSingleton<LoggingInterface>('LoggingInterface', LoggingService);

// Registra serviços concretos
container.registerSingleton('LoggingService', LoggingService);

export { container }; 