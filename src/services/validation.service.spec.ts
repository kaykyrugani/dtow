import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { BlacklistService } from './blacklist.service';
import { RedisService } from './redis.service';
import { ValidationError } from '../errors/AppError';

describe('ValidationService', () => {
  let service: ValidationService;
  let blacklistService: BlacklistService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidationService,
        {
          provide: BlacklistService,
          useValue: {
            checkAndBlock: jest.fn(),
            incrementAttempts: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
    blacklistService = module.get<BlacklistService>(BlacklistService);
    redisService = module.get<RedisService>(RedisService);
  });

  describe('validateDocument', () => {
    const validCPF = '12345678909';
    const invalidCPF = '12345678900';
    const validCNPJ = '12345678000190';
    const invalidCNPJ = '12345678000100';
    const requestId = 'test-request-id';

    it('deve validar um CPF válido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();
      jest.spyOn(blacklistService, 'incrementAttempts').mockResolvedValue();

      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith('document', validCPF, requestId);
      expect(blacklistService.incrementAttempts).toHaveBeenCalledWith(
        'document',
        validCPF,
        'Validação de CPF bem sucedida',
        requestId,
      );
    });

    it('deve rejeitar um CPF inválido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      await expect(service.validateDocument(invalidCPF, 'CPF', requestId)).rejects.toThrow(
        ValidationError,
      );

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith(
        'document',
        invalidCPF,
        requestId,
      );
      expect(blacklistService.incrementAttempts).not.toHaveBeenCalled();
    });

    it('deve validar um CNPJ válido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();
      jest.spyOn(blacklistService, 'incrementAttempts').mockResolvedValue();

      await expect(service.validateDocument(validCNPJ, 'CNPJ', requestId)).resolves.not.toThrow();

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith('document', validCNPJ, requestId);
      expect(blacklistService.incrementAttempts).toHaveBeenCalledWith(
        'document',
        validCNPJ,
        'Validação de CNPJ bem sucedida',
        requestId,
      );
    });

    it('deve rejeitar um CNPJ inválido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      await expect(service.validateDocument(invalidCNPJ, 'CNPJ', requestId)).rejects.toThrow(
        ValidationError,
      );

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith(
        'document',
        invalidCNPJ,
        requestId,
      );
      expect(blacklistService.incrementAttempts).not.toHaveBeenCalled();
    });

    it('deve propagar erro da blacklist', async () => {
      const error = new Error('Erro na blacklist');
      jest.spyOn(blacklistService, 'checkAndBlock').mockRejectedValue(error);

      await expect(service.validateDocument(validCPF, 'CPF', requestId)).rejects.toThrow(error);
    });
  });

  describe('validateEmail', () => {
    const validEmail = 'usuario@dominio.com';
    const invalidEmail = 'email-invalido';
    const tempEmail = 'usuario@tempmail.com';
    const requestId = 'test-request-id';

    it('deve validar um email válido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();
      jest.spyOn(blacklistService, 'incrementAttempts').mockResolvedValue();

      await expect(service.validateEmail(validEmail, requestId)).resolves.not.toThrow();

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith('email', validEmail, requestId);
      expect(blacklistService.incrementAttempts).toHaveBeenCalledWith(
        'email',
        validEmail,
        'Validação de email bem sucedida',
        requestId,
      );
    });

    it('deve rejeitar um email inválido', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      await expect(service.validateEmail(invalidEmail, requestId)).rejects.toThrow(ValidationError);

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith('email', invalidEmail, requestId);
      expect(blacklistService.incrementAttempts).not.toHaveBeenCalled();
    });

    it('deve rejeitar um email temporário', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      await expect(service.validateEmail(tempEmail, requestId)).rejects.toThrow(ValidationError);

      expect(blacklistService.checkAndBlock).toHaveBeenCalledWith('email', tempEmail, requestId);
      expect(blacklistService.incrementAttempts).not.toHaveBeenCalled();
    });

    it('deve propagar erro da blacklist', async () => {
      const error = new Error('Erro na blacklist');
      jest.spyOn(blacklistService, 'checkAndBlock').mockRejectedValue(error);

      await expect(service.validateEmail(validEmail, requestId)).rejects.toThrow(error);
    });
  });
});
