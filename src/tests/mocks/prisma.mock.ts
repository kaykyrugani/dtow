import { vi } from 'vitest';
import { PrismaClient } from '@prisma/client';

export const mockPrisma = {
  usuario: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn()
  },
  refreshToken: {
    create: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  },
  passwordResetToken: {
    create: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
} as unknown as PrismaClient; 