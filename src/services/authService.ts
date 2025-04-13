import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema, LoginDTO, RegisterDTO } from '../validators/authSchema';
import { ERROR_CODES } from '../constants/errorCodes';
import { PrismaClientKnownRequestError } from '../tests/helpers/prismaMocks';

export class AuthService {
  private static prisma = new PrismaClient();

  static async cadastrar(data: RegisterDTO) {
    const validacao = registerSchema.safeParse(data);
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', 400);
    }

    try {
      const hashedSenha = await bcrypt.hash(data.senha, 12);
      
      const usuario = await this.prisma.usuario.create({
        data: {
          ...data,
          senha: hashedSenha
        },
        select: {
          id: true,
          email: true,
          nome: true,
          tipoUsuario: true
        }
      });

      return usuario;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('DUPLICATE_ENTRY', 400);
      }
      throw new AppError('INTERNAL_ERROR', 500);
    }
  }

  static async login(data: LoginDTO) {
    const validacao = loginSchema.safeParse(data);
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', 400);
    }

    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { email: data.email },
        select: {
          id: true,
          email: true,
          nome: true,
          senha: true,
          tipoUsuario: true
        }
      });

      if (!usuario) {
        throw new AppError('INVALID_CREDENTIALS', 401);
      }

      const senhaCorreta = await this.comparePasswords(data.senha, usuario.senha);
      
      if (!senhaCorreta) {
        throw new AppError('INVALID_CREDENTIALS', 401);
      }

      const token = this.generateToken(usuario.id);

      const { senha, ...usuarioSemSenha } = usuario;
      
      return {
        usuario: usuarioSemSenha,
        token
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('INTERNAL_ERROR', 500);
    }
  }

  private static async comparePasswords(senha: string, hashedSenha: string): Promise<boolean> {
    return bcrypt.compare(senha, hashedSenha);
  }

  private static generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d'
    });
  }
}