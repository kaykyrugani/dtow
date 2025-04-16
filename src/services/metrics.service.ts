import { Request, Response, NextFunction } from 'express';
import { Registry, Counter, Histogram } from 'prom-client';
import { logger } from '../config/logger';
import { AlertSeverity } from './AlertService';

export class MetricsService {
  private static instance: MetricsService;
  private static registry: Registry;
  private static httpRequestDuration: Histogram;
  private static httpRequestTotal: Counter;
  private static httpRequestErrors: Counter;
  private static cacheHits: Counter;
  private static cacheMisses: Counter;
  private static cacheOperations: Histogram;
  private static alertCount: Counter;

  private constructor() {
    if (!MetricsService.registry) {
      MetricsService.registry = new Registry();
      
      // Métricas de duração das requisições HTTP
      MetricsService.httpRequestDuration = new Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duração das requisições HTTP em segundos',
        labelNames: ['method', 'path', 'status'],
        buckets: [0.1, 0.5, 1, 2, 5],
        registers: [MetricsService.registry]
      });

      // Contador total de requisições HTTP
      MetricsService.httpRequestTotal = new Counter({
        name: 'http_requests_total',
        help: 'Total de requisições HTTP',
        labelNames: ['method', 'path', 'status'],
        registers: [MetricsService.registry]
      });

      // Contador de erros HTTP
      MetricsService.httpRequestErrors = new Counter({
        name: 'http_request_errors_total',
        help: 'Total de erros em requisições HTTP',
        labelNames: ['method', 'path', 'status'],
        registers: [MetricsService.registry]
      });

      // Métricas de cache
      MetricsService.cacheHits = new Counter({
        name: 'cache_hits_total',
        help: 'Total de hits no cache',
        labelNames: ['service', 'operation'],
        registers: [MetricsService.registry]
      });

      MetricsService.cacheMisses = new Counter({
        name: 'cache_misses_total',
        help: 'Total de misses no cache',
        labelNames: ['service', 'operation'],
        registers: [MetricsService.registry]
      });

      MetricsService.cacheOperations = new Histogram({
        name: 'cache_operation_duration_seconds',
        help: 'Duração das operações de cache em segundos',
        labelNames: ['service', 'operation'],
        buckets: [0.01, 0.05, 0.1, 0.5, 1],
        registers: [MetricsService.registry]
      });

      // Métricas de alertas
      MetricsService.alertCount = new Counter({
        name: 'alert_count_total',
        help: 'Total de alertas disparados',
        labelNames: ['name', 'severity'],
        registers: [MetricsService.registry]
      });
    }
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  public static getMetricsContentType(): string {
    return MetricsService.registry.contentType;
  }

  public static async getMetrics(): Promise<string> {
    return MetricsService.registry.metrics();
  }

  public static httpMetricsMiddleware(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const path = req.route ? req.route.path : req.path;
      const method = req.method;
      const status = res.statusCode;

      // Incrementa o contador total de requisições
      MetricsService.incrementHttpRequests({ method, path, status });

      // Observa a duração da requisição
      MetricsService.observeHttpDuration({ method, path, status, duration });

      // Se for erro (4xx ou 5xx), incrementa o contador de erros
      if (status >= 400) {
        MetricsService.httpRequestErrors.inc({ method, path, status: status.toString() });
      }
    });

    next();
  }

  public static incrementHttpRequests({ method, path, status }: { method: string; path: string; status: number }): void {
    MetricsService.httpRequestTotal.inc({ method, path, status: status.toString() });
  }

  public static observeHttpDuration({ method, path, status, duration }: { method: string; path: string; status: number; duration: number }): void {
    MetricsService.httpRequestDuration.observe({ method, path, status: status.toString() }, duration / 1000);
  }

  public static incrementCacheHit(service: string, operation: string): void {
    MetricsService.cacheHits.inc({ service, operation });
  }

  public static incrementCacheMiss(service: string, operation: string): void {
    MetricsService.cacheMisses.inc({ service, operation });
  }

  public static observeCacheOperation(service: string, operation: string, duration: number): void {
    MetricsService.cacheOperations.observe({ service, operation }, duration / 1000);
  }

  public static incrementAlertCount(name: string, severity: AlertSeverity): void {
    MetricsService.alertCount.inc({ name, severity });
  }
} 