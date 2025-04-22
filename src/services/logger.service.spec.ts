import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

jest.mock('winston');
jest.mock('winston-daily-rotate-file');

describe('LoggerService', () => {
  let service: LoggerService;
  let configService: ConfigService;
  let mockLogger: jest.Mocked<winston.Logger>;

  beforeEach(async () => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    } as any;

    (winston.createLogger as jest.Mock).mockReturnValue(mockLogger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'NODE_ENV':
                  return 'development';
                case 'LOG_LEVEL':
                  return 'debug';
                default:
                  return undefined;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should log info message with context', () => {
      const message = 'Test message';
      const context = 'TestContext';

      service.log(message, context);

      expect(mockLogger.info).toHaveBeenCalledWith(message, { context });
    });

    it('should log info message without context', () => {
      const message = 'Test message';

      service.log(message);

      expect(mockLogger.info).toHaveBeenCalledWith(message, { context: undefined });
    });
  });

  describe('error', () => {
    it('should log error message with trace and context', () => {
      const message = 'Error message';
      const trace = 'Error stack trace';
      const context = 'ErrorContext';

      service.error(message, trace, context);

      expect(mockLogger.error).toHaveBeenCalledWith(message, { trace, context });
    });

    it('should log error message without trace and context', () => {
      const message = 'Error message';

      service.error(message);

      expect(mockLogger.error).toHaveBeenCalledWith(message, {
        trace: undefined,
        context: undefined,
      });
    });
  });

  describe('warn', () => {
    it('should log warning message with context', () => {
      const message = 'Warning message';
      const context = 'WarningContext';

      service.warn(message, context);

      expect(mockLogger.warn).toHaveBeenCalledWith(message, { context });
    });

    it('should log warning message without context', () => {
      const message = 'Warning message';

      service.warn(message);

      expect(mockLogger.warn).toHaveBeenCalledWith(message, { context: undefined });
    });
  });

  describe('debug', () => {
    it('should log debug message with context', () => {
      const message = 'Debug message';
      const context = 'DebugContext';

      service.debug(message, context);

      expect(mockLogger.debug).toHaveBeenCalledWith(message, { context });
    });

    it('should log debug message without context', () => {
      const message = 'Debug message';

      service.debug(message);

      expect(mockLogger.debug).toHaveBeenCalledWith(message, { context: undefined });
    });
  });

  describe('verbose', () => {
    it('should log verbose message with context', () => {
      const message = 'Verbose message';
      const context = 'VerboseContext';

      service.verbose(message, context);

      expect(mockLogger.verbose).toHaveBeenCalledWith(message, { context });
    });

    it('should log verbose message without context', () => {
      const message = 'Verbose message';

      service.verbose(message);

      expect(mockLogger.verbose).toHaveBeenCalledWith(message, { context: undefined });
    });
  });

  describe('configuration', () => {
    it('should configure winston logger with correct options in development', () => {
      expect(winston.createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'debug',
          format: expect.any(Object),
          transports: expect.arrayContaining([
            expect.objectContaining({
              constructor: winston.transports.Console,
            }),
          ]),
        }),
      );
    });

    it('should configure winston logger with correct options in production', async () => {
      (configService.get as jest.Mock).mockImplementation((key: string) => {
        if (key === 'NODE_ENV') return 'production';
        if (key === 'LOG_LEVEL') return 'info';
        return undefined;
      });

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LoggerService,
          {
            provide: ConfigService,
            useValue: configService,
          },
        ],
      }).compile();

      service = module.get<LoggerService>(LoggerService);

      expect(winston.createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'info',
          format: expect.any(Object),
          transports: expect.arrayContaining([
            expect.objectContaining({
              constructor: winston.transports.Console,
            }),
            expect.objectContaining({
              constructor: DailyRotateFile,
            }),
          ]),
        }),
      );
    });
  });
});
