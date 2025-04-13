import { vi } from 'vitest'
import { PrismaClient } from '@prisma/client'

type Usuario = {
  id: number
  nome: string
  email: string
  senha: string
  cpf: string
  tipoUsuario: string
  tokenRecuperacao: string | null
  createdAt: Date
  updatedAt: Date
}

type Pedido = {
  id: number
  usuarioId: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export const mockPrisma = {
  usuario: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  produto: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  pedido: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
} as unknown as PrismaClient

export type MockPrismaType = typeof mockPrisma

export default mockPrisma 