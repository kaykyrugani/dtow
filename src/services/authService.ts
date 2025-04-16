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
    @inject('TokenService')
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

    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }

  async cadastrar(data: unknown) {
    try {
      const validatedData = registerSchema.parse(data);
      
      const hashedPassword = await bcrypt.hash(validatedData.senha, 10);
      
      const usuario = await this.usuarioRepository.create({
        ...validatedData,
        senha: hashedPassword
      });
      
      const { senha, ...usuarioSemSenha } = usuario;
      
      return {
        usuario: usuarioSemSenha,
        mensagem: 'Usuário cadastrado com sucesso'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        this.handleValidationError(error);
      } else if (error instanceof PrismaClientKnownRequestError) {
        this.handlePrismaError(error);
      } else {
        throw error;
      }
    }
  }

  async login(data: unknown) {
    try {
      const validatedData = loginSchema.parse(data);
      
      const usuario = await this.usuarioRepository.findByEmailWithPassword(validatedData.email);
      
      if (!usuario) {
        throw new AppError(
          ERROR_CODES.INVALID_CREDENTIALS,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      
      const senhaValida = await bcrypt.compare(validatedData.senha, usuario.senha);
      
      if (!senhaValida) {
        throw new AppError(
          ERROR_CODES.INVALID_CREDENTIALS,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      
      const { senha, ...usuarioSemSenha } = usuario;
      
      const accessToken = this.tokenService.generateAccessToken(usuario.id);
      const refreshToken = await this.tokenService.generateRefreshToken(usuario.id);
      
      return {
        usuario: usuarioSemSenha,
        accessToken,
        refreshToken,
        mensagem: 'Login realizado com sucesso'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        this.handleValidationError(error);
      } else if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          ERROR_CODES.INTERNAL_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async gerarTokenRecuperacao(email: string): Promise<GerarTokenRecuperacaoResult> {
    try {
      const validatedData = recuperacaoSenhaSchema.parse({ email });
      
      const usuario = await this.usuarioRepository.findByEmail(validatedData.email);
      
      if (!usuario) {
        // Por segurança, não informamos se o email existe ou não
        return {
          status: 'info',
          mensagem: 'Se o email existir, você receberá as instruções de recuperação'
        };
      }
      
      const token = await this.tokenService.generatePasswordResetToken(usuario.id);
      
      // Em produção, enviar email com o token
      // Por enquanto, retornamos o token diretamente
      
      return {
        status: 'ok',
        token
      };
    } catch (error) {
      if (error instanceof ZodError) {
        this.handleValidationError(error);
      } else {
        throw new AppError(
          ERROR_CODES.INTERNAL_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async alterarSenha(token: string, novaSenha: string) {
    try {
      const validatedData = alteracaoSenhaSchema.parse({ token, novaSenha });
      
      const userId = await this.tokenService.verifyPasswordResetToken(validatedData.token);
      
      const hashedPassword = await bcrypt.hash(validatedData.novaSenha, 10);
      
      await this.usuarioRepository.update(userId, { senha: hashedPassword });
      
      // Revogar o token de recuperação
      await this.tokenService.revokePasswordResetToken(validatedData.token);
      
      return {
        mensagem: 'Senha alterada com sucesso'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        this.handleValidationError(error);
      } else if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          ERROR_CODES.INTERNAL_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async logout(refreshToken: string) {
    await this.tokenService.revokeRefreshToken(refreshToken);
    return { mensagem: 'Logout realizado com sucesso' };
  }

  async refresh(refreshToken: string) {
    const { accessToken } = await this.tokenService.refreshAccessToken(refreshToken);
    return { accessToken };
  }
}