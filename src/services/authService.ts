import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { loginSchema, registerSchema, recuperacaoSenhaSchema, alteracaoSenhaSchema, LoginDTO, RegisterDTO } from '../validators/authSchema';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { TokenService } from './TokenService';
import { ERROR_MESSAGES } from '../constants/errorMessages';

@injectable()
export class AuthService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository: UsuarioRepository,
    @inject(TokenService)
    private tokenService: TokenService
  ) {}

  async cadastrar(data: RegisterDTO) {
    const validacao = registerSchema.safeParse(data);
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST);
    }

    try {
      const hashedSenha = await bcrypt.hash(data.senha, 12);
      
      const usuario = await this.usuarioRepository.create({
        ...data,
        senha: hashedSenha
      }, {
        select: {
          id: true,
          email: true,
          nome: true,
          tipoUsuario: true
        }
      });

      const accessToken = this.tokenService.generateAccessToken(usuario.id);
      const refreshToken = await this.tokenService.generateRefreshToken(usuario.id);

      return {
        usuario,
        accessToken,
        refreshToken
      };
    } catch (error) {
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async login(data: LoginDTO) {
    const validacao = loginSchema.safeParse(data);
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST);
    }

    try {
      const usuario = await this.usuarioRepository.findByEmailWithPassword(data.email);

      if (!usuario) {
        throw new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED);
      }

      const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
      
      if (!senhaCorreta) {
        throw new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED);
      }

      const accessToken = this.tokenService.generateAccessToken(usuario.id);
      const refreshToken = await this.tokenService.generateRefreshToken(usuario.id);

      const { senha, ...usuarioSemSenha } = usuario;
      
      return {
        usuario: usuarioSemSenha,
        accessToken,
        refreshToken
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.tokenService.revokeRefreshToken(refreshToken);
    } catch (error) {
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async refresh(token: string) {
    return this.tokenService.refreshAccessToken(token);
  }

  async gerarTokenRecuperacao(email: string) {
    const validacao = recuperacaoSenhaSchema.safeParse({ email });
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST);
    }

    try {
      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario) {
        // Retornamos uma mensagem genérica por segurança
        return { mensagem: 'Se o email existir, você receberá as instruções de recuperação' };
      }

      const token = await this.tokenService.generatePasswordResetToken(usuario.id);
      
      // Em produção, enviar o token por email
      return { token };
    } catch (error) {
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async alterarSenha(token: string, novaSenha: string) {
    const validacao = alteracaoSenhaSchema.safeParse({ token, novaSenha });
    if (!validacao.success) {
      throw new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST);
    }

    try {
      const userId = await this.tokenService.verifyPasswordResetToken(token);
      if (!userId) {
        throw new AppError('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED);
      }

      const hashedSenha = await bcrypt.hash(novaSenha, 12);
      await this.usuarioRepository.update(userId, { senha: hashedSenha });

      // Invalidar o token de recuperação após a alteração
      await this.tokenService.revokePasswordResetToken(token);

      return { mensagem: 'Senha alterada com sucesso' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}