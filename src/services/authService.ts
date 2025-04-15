import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { loginSchema, registerSchema, recuperacaoSenhaSchema, alteracaoSenhaSchema } from '../validators/authSchema';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { TokenService } from './TokenService';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type GerarTokenRecuperacaoResult =
  | { status: 'ok'; token: string }
  | { status: 'info'; mensagem: string };

@injectable()
export class AuthService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository: UsuarioRepository,
    @inject(TokenService)
    private tokenService: TokenService
  ) {}

  private handleValidationError(error: ZodError) {
    const errors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    throw new AppError(
      ERROR_CODES.VALIDATION_ERROR,
      HttpStatusCode.BAD_REQUEST,
      { errors }
    );
  }

  private handlePrismaError(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          const field = error.meta?.target?.[0] || 'campo';
          throw new AppError(
            ERROR_CODES.DUPLICATE_ENTRY,
            HttpStatusCode.CONFLICT,
            { field }
          );
        case 'P2025':
          throw new AppError(
            ERROR_CODES.NOT_FOUND,
            HttpStatusCode.NOT_FOUND
          );
        default:
          throw new AppError(
            ERROR_CODES.INTERNAL_ERROR,
            HttpStatusCode.INTERNAL_SERVER_ERROR
          );
      }
    }
    
    if (error instanceof Error) {
      throw new AppError(
        ERROR_CODES.INTERNAL_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        { message: error.message }
      );
    }

    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }

  async cadastrar(data: unknown) {
    try {
      const validacao = registerSchema.safeParse(data);
      if (!validacao.success) {
        this.handleValidationError(validacao.error);
        return;
      }

      const { senha, ...resto } = validacao.data;
      const hashedSenha = await bcrypt.hash(senha, 12);
      
      const usuario = await this.usuarioRepository.create({
        ...resto,
        senha: hashedSenha
      });

      const accessToken = this.tokenService.generateAccessToken(usuario.id);
      const refreshToken = await this.tokenService.generateRefreshToken(usuario.id);

      const { senha: _, ...usuarioSemSenha } = usuario;

      return {
        usuario: usuarioSemSenha,
        accessToken,
        refreshToken
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
    }
  }

  async login(data: unknown) {
    try {
      const validacao = loginSchema.safeParse(data);
      if (!validacao.success) {
        this.handleValidationError(validacao.error);
        return;
      }

      const usuario = await this.usuarioRepository.findByEmailWithPassword(validacao.data.email);
      if (!usuario) {
        throw new AppError(
          ERROR_CODES.INVALID_CREDENTIALS,
          HttpStatusCode.UNAUTHORIZED
        );
      }

      const senhaCorreta = await bcrypt.compare(validacao.data.senha, usuario.senha);
      if (!senhaCorreta) {
        throw new AppError(
          ERROR_CODES.INVALID_CREDENTIALS,
          HttpStatusCode.UNAUTHORIZED
        );
      }

      const accessToken = this.tokenService.generateAccessToken(usuario.id);
      const refreshToken = await this.tokenService.generateRefreshToken(usuario.id);

      const { senha: _, ...usuarioSemSenha } = usuario;
      
      return {
        usuario: usuarioSemSenha,
        accessToken,
        refreshToken
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
    }
  }

  async gerarTokenRecuperacao(email: string): Promise<GerarTokenRecuperacaoResult> {
    try {
      const validacao = recuperacaoSenhaSchema.safeParse({ email });
      if (!validacao.success) {
        this.handleValidationError(validacao.error);
        return { status: 'info', mensagem: 'Email inválido' };
      }

      const usuario = await this.usuarioRepository.findByEmail(validacao.data.email);
      if (!usuario) {
        return { 
          status: 'info', 
          mensagem: 'Se o email existir, você receberá as instruções de recuperação' 
        };
      }

      const token = await this.tokenService.generatePasswordResetToken(usuario.id);
      return { status: 'ok', token };
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
      return { status: 'info', mensagem: 'Erro ao gerar token de recuperação' };
    }
  }

  async alterarSenha(token: string, novaSenha: string) {
    try {
      const validacao = alteracaoSenhaSchema.safeParse({ token, novaSenha });
      if (!validacao.success) {
        this.handleValidationError(validacao.error);
        return;
      }

      const userId = await this.tokenService.verifyPasswordResetToken(token);
      if (!userId) {
        throw new AppError(
          ERROR_CODES.TOKEN_INVALID,
          HttpStatusCode.UNAUTHORIZED
        );
      }

      const hashedSenha = await bcrypt.hash(validacao.data.novaSenha, 12);
      await this.usuarioRepository.update(userId, { senha: hashedSenha });
      await this.tokenService.revokePasswordResetToken(token);

      return { mensagem: ERROR_MESSAGES[ERROR_CODES.PASSWORD_CHANGED] };
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.tokenService.revokeRefreshToken(refreshToken);
      return { mensagem: 'Logout realizado com sucesso' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
    }
  }

  async refresh(refreshToken: string) {
    try {
      const result = await this.tokenService.refreshAccessToken(refreshToken);
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      this.handlePrismaError(error);
    }
  }
}