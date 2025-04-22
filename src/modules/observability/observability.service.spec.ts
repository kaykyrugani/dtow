import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../logging/logger.service';
import { ObservabilityService } from './observability.service';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { ConfigChangeEvent } from '@nestjs/config/dist/interfaces';

describe('ObservabilityService', () => {
  let service: ObservabilityService;
  let mockLoggerService: Partial<LoggerService>;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(async () => {
    mockLoggerService = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };

    mockConfigService = {
      get: jest.fn(),
      changes$: new Observable<ConfigChangeEvent>(),
      getOrThrow: jest.fn(),
      set: jest.fn(),
      setEnvFilePaths: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservabilityService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ObservabilityService>(ObservabilityService);
  });

  const mockRequest = {
    method: 'GET',
    url: '/test',
    headers: {
      'user-agent': 'test-agent',
      'x-forwarded-for': '127.0.0.1',
      'x-request-id': 'test-request-id',
    },
    ip: '127.0.0.1',
    connection: {
      remoteAddress: '127.0.0.1',
    },
    body: {},
    params: {},
    query: {},
    get: jest.fn((header: string) => mockRequest.headers[header]),
    header: jest.fn((header: string) => mockRequest.headers[header]),
    accepts: jest.fn(),
    acceptsCharsets: jest.fn(),
    acceptsEncodings: jest.fn(),
    acceptsLanguages: jest.fn(),
    range: jest.fn(),
    param: jest.fn(),
    is: jest.fn(),
    protocol: 'http',
    secure: false,
    xhr: false,
    app: {},
    res: {},
    next: jest.fn(),
  } as unknown as Request;

  const mockResponse = {
    statusCode: 200,
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
    end: jest.fn(),
    getHeader: jest.fn(),
    setHeader: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    header: jest.fn(),
    headersSent: false,
    locals: {},
    charset: 'utf-8',
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logHttpRequest', () => {
    it('deve registrar uma requisição HTTP com sucesso', () => {
      const duration = 100;

      service.logHttpRequest(mockRequest, mockResponse, duration);

      expect(mockLoggerService.log).toHaveBeenCalledWith('GET /test 200 100ms', 'HttpRequest');

      expect(mockLoggerService.debug).toHaveBeenCalledWith(
        expect.stringContaining('"type":"http_request"'),
        'HttpRequest',
      );
    });
  });

  describe('logBusinessError', () => {
    it('deve registrar um erro de negócio', () => {
      const error = new Error('Erro de teste');
      const context = 'TestContext';
      const metadata = { key: 'value' };

      const errorId = service.logBusinessError(error, context, metadata);

      expect(errorId).toMatch(/^err_\d+_[a-z0-9]+$/);
      expect(mockLoggerService.error).toHaveBeenCalledWith(
        expect.stringContaining(error.message),
        error.stack,
        context,
      );
      expect(mockLoggerService.debug).toHaveBeenCalledWith(
        expect.stringContaining('"type":"business_error"'),
        context,
      );
    });
  });

  describe('logBusinessEvent', () => {
    it('deve registrar um evento de negócio', () => {
      const eventName = 'TestEvent';
      const context = 'TestContext';
      const data = { key: 'value' };

      const eventId = service.logBusinessEvent(eventName, context, data);

      expect(eventId).toMatch(/^evt_\d+_[a-z0-9]+$/);
      expect(mockLoggerService.log).toHaveBeenCalledWith(
        expect.stringContaining(eventName),
        context,
      );
      expect(mockLoggerService.debug).toHaveBeenCalledWith(
        expect.stringContaining('"type":"business_event"'),
        context,
      );
    });
  });

  describe('logPerformance', () => {
    it('deve registrar métricas de performance', () => {
      const operation = 'TestOperation';
      const duration = 100;
      const context = 'TestContext';
      const metadata = { key: 'value' };

      service.logPerformance(operation, duration, context, metadata);

      expect(mockLoggerService.debug).toHaveBeenCalledWith(
        `Performance: ${operation} - ${duration}ms`,
        context,
      );
      expect(mockLoggerService.debug).toHaveBeenCalledWith(
        expect.stringContaining('"type":"performance"'),
        context,
      );
    });
  });
});
