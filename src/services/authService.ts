import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export class AuthService {
  static async cadastrar(dados: {
    nome: string;
    email: string;
    senha: string;
    tipoUsuario?: 'admin' | 'cliente';
  }) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dados.email }
    });

    if (usuarioExistente) {
      throw new AppError('Email ou CPF já cadastrado', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(dados.senha, salt);

    const usuario = await prisma.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        tipoUsuario: dados.tipoUsuario || 'cliente'
      }
    });

    const token = this.gerarToken(usuario);

    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario
      },
      token
    };
  }

  static async login(credenciais: { email: string; senha: string }) {
    const usuario = await prisma.usuario.findUnique({
      where: { email: credenciais.email }
    });

    if (!usuario) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const senhaValida = await bcrypt.compare(credenciais.senha, usuario.senha);

    if (!senhaValida) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = this.gerarToken(usuario);

    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario
      },
      token
    };
  }

  static async gerarTokenRecuperacao(email: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      throw new AppError('Email não encontrado', 404);
    }

    const token = crypto.randomBytes(32).toString('hex');

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { tokenRecuperacao: token }
    });

    return token;
  }

  static async alterarSenha(token: string, novaSenha: string) {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(novaSenha, salt);

    try {
      await prisma.usuario.update({
        where: { tokenRecuperacao: token },
        data: {
          senha: senhaHash,
          tokenRecuperacao: null
        }
      });

      return true;
    } catch (error) {
      throw new AppError('Token inválido', 400);
    }
  }

  private static gerarToken(usuario: { id: number; tipoUsuario: string }) {
    return jwt.sign(
      {
        id: usuario.id,
        tipo: usuario.tipoUsuario
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
  }
} 