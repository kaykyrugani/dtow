import 'reflect-metadata';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoggingService } from '../../services/LoggingService';
import { container } from '../../config/container';
import { EnvConfig } from '../../config/env';

describe('LoggingService', () => {
  let loggingService: LoggingService;
  const mockEnv: EnvConfig = {
    NODE_ENV: 'test',
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    DATABASE_URL: 'test-url',
    JWT_SECRET: 'test-secret-key-with-minimum-32-chars-here'
  };

  beforeEach(() => {
    container.registerInstance('Env', mockEnv);
    loggingService = container.resolve(LoggingService);
  });

  it('deve criar instância com configurações corretas', () => {
    expect(loggingService).toBeInstanceOf(LoggingService);
    expect(loggingService.getTransports()).toHaveLength(2); // arquivo de erro + console
  });

  it('deve sanitizar dados sensíveis no contexto', () => {
    const spy = vi.spyOn(loggingService['winston'], 'info');
    
    loggingService.info('Test message', {
      user: 'test',
      password: 'secret123',
      nested: {
        token: 'abc123',
        data: 'safe'
      }
    });

    expect(spy).toHaveBeenCalledWith('Test message', {
      user: 'test',
      password: '[REDACTED]',
      nested: {
        token: '[REDACTED]',
        data: 'safe'
      }
    });
  });

  it('deve usar fallback para console em desenvolvimento', () => {
    const devEnv: EnvConfig = { ...mockEnv, NODE_ENV: 'development' };
    container.registerInstance('Env', devEnv);
    const devLogger = container.resolve(LoggingService);

    const consoleTransport = devLogger.getTransports()
      .find(t => t.constructor.name === 'ConsoleTransport');
    
    expect(consoleTransport).toBeDefined();
  });

  it('deve configurar nível correto baseado no ambiente', () => {
    // Test
    expect(loggingService['winston'].level).toBe('debug');

    // Production
    const prodEnv: EnvConfig = { ...mockEnv, NODE_ENV: 'production' };
    container.registerInstance('Env', prodEnv);
    const prodLogger = container.resolve(LoggingService);
    expect(prodLogger['winston'].level).toBe('info');
  });
}); 