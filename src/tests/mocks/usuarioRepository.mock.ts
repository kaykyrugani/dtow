import { vi } from 'vitest';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';

const mockUsuario = {
  id: 'mock-id',
  email: 'test@example.com',
  nome: 'Test User',
  tipoUsuario: 'CLIENTE',
  senha: '$2b$12$mockHashedPassword',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const createMockUsuarioRepository = () => ({
  findByEmail: vi.fn().mockResolvedValue(mockUsuario),
  findByEmailWithPassword: vi.fn().mockResolvedValue(mockUsuario),
  findById: vi.fn().mockResolvedValue(mockUsuario),
  create: vi.fn().mockResolvedValue(mockUsuario),
  update: vi.fn().mockResolvedValue(mockUsuario),
  delete: vi.fn().mockResolvedValue(mockUsuario),
  findAll: vi.fn().mockResolvedValue([mockUsuario]),
  count: vi.fn().mockResolvedValue(1)
}); 