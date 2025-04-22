import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../services/logger.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class ObservabilityService {
  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registra informações sobre uma requisição HTTP
   */
  logHttpRequest(req: Request, res: Response, duration: number) {
    const requestId = (req.headers['x-request-id'] as string) || 'unknown';
    const userId = req.user?.id || 'anonymous';
    const method = req.method;
    const url = req.url;
    const statusCode = res.statusCode;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';

    this.logger.log(`${method} ${url} ${statusCode} ${duration}ms`, 'HttpRequest');

    // Log estruturado para ferramentas de observabilidade
    this.logger.debug(
      JSON.stringify({
        type: 'http_request',
        requestId,
        userId,
        method,
        url,
        statusCode,
        duration,
        userAgent,
        ip,
        timestamp: new Date().toISOString(),
      }),
      'HttpRequest',
    );
  }

  /**
   * Registra informações sobre um erro de negócio
   */
  logBusinessError(error: Error, context: string, metadata?: Record<string, any>) {
    const errorId = this.generateErrorId();

    this.logger.error(`${error.message} (ID: ${errorId})`, error.stack, context);

    // Log estruturado para ferramentas de observabilidade
    this.logger.debug(
      JSON.stringify({
        type: 'business_error',
        errorId,
        errorName: error.name,
        errorMessage: error.message,
        context,
        metadata,
        timestamp: new Date().toISOString(),
      }),
      context,
    );

    return errorId;
  }

  /**
   * Registra informações sobre um evento de negócio
   */
  logBusinessEvent(eventName: string, context: string, data?: Record<string, any>) {
    const eventId = this.generateEventId();

    this.logger.log(`Evento: ${eventName} (ID: ${eventId})`, context);

    // Log estruturado para ferramentas de observabilidade
    this.logger.debug(
      JSON.stringify({
        type: 'business_event',
        eventId,
        eventName,
        context,
        data,
        timestamp: new Date().toISOString(),
      }),
      context,
    );

    return eventId;
  }

  /**
   * Registra informações sobre performance
   */
  logPerformance(
    operation: string,
    duration: number,
    context: string,
    metadata?: Record<string, any>,
  ) {
    this.logger.debug(`Performance: ${operation} - ${duration}ms`, context);

    // Log estruturado para ferramentas de observabilidade
    this.logger.debug(
      JSON.stringify({
        type: 'performance',
        operation,
        duration,
        context,
        metadata,
        timestamp: new Date().toISOString(),
      }),
      context,
    );
  }

  /**
   * Gera um ID único para erros
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Gera um ID único para eventos
   */
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
