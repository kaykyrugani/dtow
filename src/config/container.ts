import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

// Database
container.registerInstance('PrismaClient', new PrismaClient());

// Repositories
container.registerSingleton('UsuarioRepository', UsuarioRepository);

export { container }; 