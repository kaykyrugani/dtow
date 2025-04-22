import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services/auth.service';
import { LoggerService } from '../../services/logger.service';
import { MetricsService } from '../../services/metrics.service';
import { PrismaService } from '../../services/prisma.service';

// Mock dos serviços
const mockJwtService = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

const mockLoggerService = {
  error: jest.fn(),
};

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
  },
};

const mockMetricsService = {
  recordAuthAttempt: jest.fn(),
  recordAuthFailure: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'JwtService',
          useValue: mockJwtService,
        },
        {
          provide: 'ConfigService',
          useValue: mockConfigService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: MetricsService,
          useValue: mockMetricsService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('deve gerar um token JWT com sucesso', async () => {
      const userId = 'user-123';
      const role = 'admin';
      const expectedToken = 'jwt-token';

      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'JWT_SECRET') return 'secret';
        if (key === 'JWT_EXPIRES_IN') return '1h';
        return undefined;
      });

      mockJwtService.signAsync.mockResolvedValue(expectedToken);

      const result = await service.generateToken(userId, role);

      expect(result).toBe(expectedToken);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { userId, role },
        { secret: 'secret', expiresIn: '1h' },
      );
      expect(mockMetricsService.recordAuthAttempt).toHaveBeenCalledWith(
        '127.0.0.1',
        'success',
        'BR',
      );
    });

    it('deve incrementar métrica de falha quando ocorre erro', async () => {
      const userId = 'user-123';
      const role = 'admin';
      const error = new Error('JWT error');

      mockJwtService.signAsync.mockRejectedValue(error);

      await expect(service.generateToken(userId, role)).rejects.toThrow(error);
      expect(mockMetricsService.recordAuthFailure).toHaveBeenCalledWith(
        'jwt_error',
        'BR',
        '127.0.0.1',
      );
      expect(mockLoggerService.error).toHaveBeenCalledWith('Erro ao gerar token', {
        error: error.message,
        userId,
      });
    });
  });

  describe('validateToken', () => {
    it('deve validar um token JWT com sucesso', async () => {
      const token = 'valid-token';
      const payload = { userId: 'user-123', role: 'admin' };
      const user = { id: 'user-123', name: 'Test User' };

      mockConfigService.get.mockReturnValue('secret');
      mockJwtService.verifyAsync.mockResolvedValue(payload);
      mockPrismaService.user.findUnique.mockResolvedValue(user as any);

      const result = await service.validateToken(token);

      expect(result).toEqual(payload);
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token, { secret: 'secret' });
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: payload.userId },
      });
      expect(mockMetricsService.recordAuthAttempt).toHaveBeenCalledWith(
        '127.0.0.1',
        'success',
        'BR',
      );
    });

    it('deve falhar quando o usuário não é encontrado', async () => {
      const token = 'valid-token';
      const payload = { userId: 'user-123', role: 'admin' };

      mockConfigService.get.mockReturnValue('secret');
      mockJwtService.verifyAsync.mockResolvedValue(payload);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.validateToken(token)).rejects.toThrow('Usuário não encontrado');
      expect(mockMetricsService.recordAuthFailure).toHaveBeenCalledWith(
        'user_not_found',
        'BR',
        '127.0.0.1',
      );
    });

    it('deve falhar quando o token é inválido', async () => {
      const token = 'invalid-token';
      const error = new Error('Invalid token');

      mockConfigService.get.mockReturnValue('secret');
      mockJwtService.verifyAsync.mockRejectedValue(error);

      await expect(service.validateToken(token)).rejects.toThrow(error);
      expect(mockMetricsService.recordAuthFailure).toHaveBeenCalledWith(
        'invalid_token',
        'BR',
        '127.0.0.1',
      );
      expect(mockLoggerService.error).toHaveBeenCalledWith('Erro ao validar token', {
        error: error.message,
      });
    });
  });

  describe('refreshToken', () => {
    it('deve atualizar um token com sucesso', async () => {
      const oldToken = 'old-token';
      const newToken = 'new-token';
      const payload = { userId: 'user-123', role: 'admin' };

      jest.spyOn(service, 'validateToken').mockResolvedValue(payload);
      jest.spyOn(service, 'generateToken').mockResolvedValue(newToken);

      const result = await service.refreshToken(oldToken);

      expect(result).toBe(newToken);
      expect(service.validateToken).toHaveBeenCalledWith(oldToken);
      expect(service.generateToken).toHaveBeenCalledWith(payload.userId, payload.role);
    });

    it('deve falhar quando o token é inválido', async () => {
      const token = 'invalid-token';
      const error = new Error('Invalid token');

      jest.spyOn(service, 'validateToken').mockRejectedValue(error);

      await expect(service.refreshToken(token)).rejects.toThrow(error);
      expect(mockLoggerService.error).toHaveBeenCalledWith('Erro ao atualizar token', {
        error: error.message,
      });
    });
  });
});
