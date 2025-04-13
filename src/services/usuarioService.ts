import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';
import { PaginationParams } from '../types/pagination';

interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  tipoUsuario?: 'cliente' | 'admin';
}

type IUsuarioSemSenha = Omit<IUsuario, 'senha'>;

export class UsuarioService extends BaseService<'usuario'> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'usuario');
  }

  async criar(dados: IUsuario): Promise<IUsuarioSemSenha> {
    const usuarioExistente = await this.findOne<IUsuario>({
      OR: [
        { email: dados.email },
        { cpf: dados.cpf }
      ]
    });

    if (usuarioExistente) {
      throw new AppError('Email ou CPF já cadastrado', 400);
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await this.create<IUsuario>({
      ...dados,
      senha: senhaHash
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async atualizar(id: number, dados: Partial<IUsuario>): Promise<IUsuarioSemSenha> {
    const usuario = await this.findById<IUsuario>(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    if (dados.email || dados.cpf) {
      const usuarioExistente = await this.findOne<IUsuario>({
        OR: [
          dados.email ? { email: dados.email } : {},
          dados.cpf ? { cpf: dados.cpf } : {}
        ],
        NOT: { id }
      });

      if (usuarioExistente) {
        throw new AppError('Email ou CPF já cadastrado', 400);
      }
    }

    const usuarioAtualizado = await this.update<IUsuario>(id, dados);
    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  }

  async deletar(id: number): Promise<void> {
    const usuario = await this.findById<IUsuario>(id);
    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }
    await this.delete(id);
  }

  async buscarPorId(id: number): Promise<IUsuarioSemSenha> {
    const usuario = await this.findById<IUsuario>(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async listar(params: PaginationParams<IUsuario> = {}) {
    return this.paginate<IUsuario>(params);
  }

  async buscarPorEmail(email: string): Promise<IUsuario | null> {
    return this.findOne<IUsuario>({ email });
  }
} 