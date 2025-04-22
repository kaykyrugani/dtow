import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { config } from '../../config';

const prisma = new PrismaClient();

export async function createTestUser() {
  const user = await prisma.usuario.create({
    data: {
      nome: 'Usuário Teste',
      email: `teste${Date.now()}@teste.com`,
      senha: 'senha123',
      tipo: 'CLIENTE',
    },
  });

  return user;
}

export function generateToken(user: any) {
  return sign(
    {
      id: user.id,
      email: user.email,
      tipo: user.tipo,
    },
    config.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );
}

export async function cleanupTestData() {
  await prisma.endereco.deleteMany({
    where: {
      usuario: {
        email: {
          contains: '@teste.com',
        },
      },
    },
  });

  await prisma.usuario.deleteMany({
    where: {
      email: {
        contains: '@teste.com',
      },
    },
  });
}

export async function createTestAddress(userId: number) {
  return prisma.endereco.create({
    data: {
      usuarioId: userId,
      cep: '01001000',
      logradouro: 'Rua Teste',
      numero: '123',
      bairro: 'Bairro Teste',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  });
}

export async function createTestProduct() {
  return prisma.produto.create({
    data: {
      nome: 'Produto Teste',
      descricao: 'Descrição do produto teste',
      preco: 99.99,
      quantidade: 10,
      categoria: 'Categoria Teste',
      subcategoria: 'Subcategoria Teste',
    },
  });
}

export async function createTestOrder(userId: number, productId: number) {
  return prisma.pedido.create({
    data: {
      usuarioId: userId,
      status: 'PENDING',
      total: 99.99,
      itens: {
        create: [
          {
            produtoId: productId,
            quantidade: 1,
            preco: 99.99,
          },
        ],
      },
    },
    include: {
      itens: true,
    },
  });
}
