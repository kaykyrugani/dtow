import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';

const prisma = new PrismaClient();

type UserType = 'ADMIN' | 'CLIENTE';

interface CreateTestUserData {
  email: string;
  senha: string;
  tipoUsuario: UserType;
}

export async function createTestUser(data: CreateTestUserData) {
  const hashedPassword = await hash(data.senha, 8);

  return prisma.usuario.create({
    data: {
      email: data.email,
      senha: hashedPassword,
      tipoUsuario: data.tipoUsuario,
      nome: 'Usuário Teste',
      cpf: '12345678900',
      telefone: '11999999999'
    }
  });
}

export function generateAuthToken(user: { id: number; email: string; tipoUsuario: UserType }): string {
  return sign(
    {
      id: user.id,
      email: user.email,
      tipoUsuario: user.tipoUsuario
    },
    env.JWT_SECRET,
    {
      subject: user.id.toString(),
      expiresIn: '1d'
    }
  );
} 