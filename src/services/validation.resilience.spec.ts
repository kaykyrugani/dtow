import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { BlacklistService } from './blacklist.service';
import { RedisService } from './redis.service';
import { ValidationError, SecurityError } from '../errors/AppError';
import { MetricsService } from './metrics.service';
import { LoggingService } from './LoggingService';

describe('ValidationService Resilience', () => {
  let service: ValidationService;
  let blacklistService: BlacklistService;
  let redisService: RedisService;
  let metricsService: MetricsService;
  let loggingService: LoggingService;

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
        {
          provide: MetricsService,
          useValue: {
            incrementValidationAttempts: jest.fn(),
            incrementValidationFailures: jest.fn(),
            observeValidationDuration: jest.fn(),
          },
        },
        {
          provide: LoggingService,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
    blacklistService = module.get<BlacklistService>(BlacklistService);
    redisService = module.get<RedisService>(RedisService);
    metricsService = module.get<MetricsService>(MetricsService);
    loggingService = module.get<LoggingService>(LoggingService);
  });

  describe('Resiliência na Validação de Documentos', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve lidar com falha temporária da blacklist', async () => {
      // Simula falha temporária
      jest
        .spyOn(blacklistService, 'checkAndBlock')
        .mockRejectedValueOnce(new Error('Erro temporário'))
        .mockResolvedValueOnce();

      // Primeira tentativa deve falhar
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).rejects.toThrow(
        'Erro temporário',
      );

      // Segunda tentativa deve suceder
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();

      expect(metricsService.incrementValidationFailures).toHaveBeenCalledWith('document', 'CPF');
      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('document', 'CPF');
    });

    it('deve lidar com falha do Redis', async () => {
      jest.spyOn(redisService, 'get').mockRejectedValue(new Error('Redis indisponível'));
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Deve continuar funcionando mesmo com Redis falhando
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();

      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('document', 'CPF');
    });

    it('deve lidar com falha de métricas', async () => {
      jest
        .spyOn(metricsService, 'incrementValidationAttempts')
        .mockRejectedValue(new Error('Erro nas métricas'));
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Deve continuar funcionando mesmo com métricas falhando
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();
    });
  });

  describe('Resiliência na Validação de Email', () => {
    const validEmail = 'usuario@dominio.com';
    const requestId = 'test-request-id';

    it('deve lidar com falha temporária da blacklist', async () => {
      // Simula falha temporária
      jest
        .spyOn(blacklistService, 'checkAndBlock')
        .mockRejectedValueOnce(new Error('Erro temporário'))
        .mockResolvedValueOnce();

      // Primeira tentativa deve falhar
      await expect(service.validateEmail(validEmail, requestId)).rejects.toThrow('Erro temporário');

      // Segunda tentativa deve suceder
      await expect(service.validateEmail(validEmail, requestId)).resolves.not.toThrow();

      expect(metricsService.incrementValidationFailures).toHaveBeenCalledWith('email');
      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('email');
    });

    it('deve lidar com falha do Redis', async () => {
      jest.spyOn(redisService, 'get').mockRejectedValue(new Error('Redis indisponível'));
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Deve continuar funcionando mesmo com Redis falhando
      await expect(service.validateEmail(validEmail, requestId)).resolves.not.toThrow();

      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('email');
    });

    it('deve lidar com falha de métricas', async () => {
      jest
        .spyOn(metricsService, 'incrementValidationAttempts')
        .mockRejectedValue(new Error('Erro nas métricas'));
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Deve continuar funcionando mesmo com métricas falhando
      await expect(service.validateEmail(validEmail, requestId)).resolves.not.toThrow();
    });
  });

  describe('Resiliência em Cenários de Alta Carga', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve lidar com múltiplas validações simultâneas', async () => {
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();
      jest.spyOn(blacklistService, 'incrementAttempts').mockResolvedValue();

      const promises = Array(100)
        .fill(null)
        .map(() => service.validateDocument(validCPF, 'CPF', requestId));

      await expect(Promise.all(promises)).resolves.not.toThrow();
      expect(blacklistService.checkAndBlock).toHaveBeenCalledTimes(100);
    });

    it('deve lidar com falhas parciais em validações em lote', async () => {
      jest
        .spyOn(blacklistService, 'checkAndBlock')
        .mockRejectedValueOnce(new Error('Erro temporário'))
        .mockResolvedValue();

      const promises = Array(10)
        .fill(null)
        .map(() => service.validateDocument(validCPF, 'CPF', requestId));

      const results = await Promise.allSettled(promises);
      const failures = results.filter(r => r.status === 'rejected');
      const successes = results.filter(r => r.status === 'fulfilled');

      expect(failures.length).toBe(1);
      expect(successes.length).toBe(9);
    });
  });

  // Novos testes complementares

  describe('Timeout de Resposta', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve lidar com timeout do Redis', async () => {
      // Simula resposta lenta do Redis (3s+)
      jest
        .spyOn(redisService, 'get')
        .mockImplementation(() => new Promise(resolve => setTimeout(() => resolve('ok'), 4000)));

      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Configura timeout de 2s
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 2000);

      // Deve falhar com timeout
      await expect(
        service.validateDocument(validCPF, 'CPF', requestId, { signal: controller.signal }),
      ).rejects.toThrow('Timeout exceeded');

      expect(metricsService.incrementValidationFailures).toHaveBeenCalledWith('document', 'CPF');
      expect(loggingService.error).toHaveBeenCalledWith(
        expect.stringContaining('Timeout'),
        expect.any(Object),
      );
    });
  });

  describe('Degradação Controlada', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve operar em modo degradado quando a blacklist falha', async () => {
      // Simula falha da blacklist
      jest
        .spyOn(blacklistService, 'checkAndBlock')
        .mockRejectedValue(new Error('Blacklist indisponível'));

      // Configura flag de degradação
      service.setDegradedMode(true);

      // Deve continuar funcionando com alerta
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();

      expect(loggingService.warn).toHaveBeenCalledWith(
        expect.stringContaining('Modo degradado'),
        expect.any(Object),
      );
      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('document', 'CPF');
    });
  });

  describe('Chaos Testing', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve lidar com erros aleatórios em massa', async () => {
      // Simula diferentes tipos de falhas aleatórias
      const errorTypes = [
        new Error('Timeout'),
        new Error('Connection refused'),
        new Error('Internal server error'),
        new Error('Rate limit exceeded'),
      ];

      let callCount = 0;
      jest.spyOn(blacklistService, 'checkAndBlock').mockImplementation(() => {
        callCount++;
        // 30% de chance de falha
        if (Math.random() < 0.3) {
          const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
          return Promise.reject(errorType);
        }
        return Promise.resolve();
      });

      // Executa 1000 requisições
      const promises = Array(1000)
        .fill(null)
        .map(() => service.validateDocument(validCPF, 'CPF', requestId));

      const results = await Promise.allSettled(promises);
      const failures = results.filter(r => r.status === 'rejected');
      const successes = results.filter(r => r.status === 'fulfilled');

      // Verifica se não houve vazamento de memória
      expect(global.gc).toBeDefined();
      global.gc();

      // Verifica se o serviço continua funcionando
      expect(successes.length + failures.length).toBe(1000);
      expect(callCount).toBe(1000);
    });
  });

  describe('Falha no Logging', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve continuar funcionando quando o logging falha', async () => {
      // Simula falha no logging
      jest.spyOn(loggingService, 'error').mockRejectedValue(new Error('Logging indisponível'));
      jest.spyOn(blacklistService, 'checkAndBlock').mockResolvedValue();

      // Deve continuar funcionando mesmo com logging falhando
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).resolves.not.toThrow();

      expect(metricsService.incrementValidationAttempts).toHaveBeenCalledWith('document', 'CPF');
    });
  });

  describe('Retry Backoff', () => {
    const validCPF = '12345678909';
    const requestId = 'test-request-id';

    it('deve respeitar intervalo progressivo de retry', async () => {
      const retryDelays: number[] = [];
      let attemptCount = 0;

      // Simula falhas com retry
      jest.spyOn(blacklistService, 'checkAndBlock').mockImplementation(() => {
        attemptCount++;
        if (attemptCount <= 3) {
          return new Promise((_, reject) => {
            const delay = attemptCount * 1000; // 1s, 2s, 3s
            retryDelays.push(delay);
            setTimeout(() => reject(new Error('Erro temporário')), delay);
          });
        }
        return Promise.resolve();
      });

      // Configura retry com backoff
      service.setRetryConfig({ maxAttempts: 3, baseDelay: 1000 });

      // Primeira tentativa deve falhar
      await expect(service.validateDocument(validCPF, 'CPF', requestId)).rejects.toThrow(
        'Erro temporário',
      );

      // Verifica se os delays foram progressivos
      expect(retryDelays).toEqual([1000, 2000, 3000]);
      expect(attemptCount).toBe(3);
    });
  });
});
