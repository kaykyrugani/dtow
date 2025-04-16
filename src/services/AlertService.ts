import { injectable, inject } from 'tsyringe';
import { LoggingService } from './LoggingService';
import { MetricsService } from './metrics.service';
import { config } from '../config/env';

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export interface AlertConfig {
  name: string;
  description: string;
  severity: AlertSeverity;
  threshold: number;
  window: number; // em segundos
  channels: string[];
}

@injectable()
export class AlertService {
  private static instance: AlertService;
  private alertConfigs: Map<string, AlertConfig>;
  private alertCounters: Map<string, number>;
  private alertTimestamps: Map<string, number[]>;

  constructor(
    @inject('LoggingService') private logger: LoggingService
  ) {
    this.alertConfigs = new Map();
    this.alertCounters = new Map();
    this.alertTimestamps = new Map();
    this.initializeDefaultAlerts();
  }

  public static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService(
        new LoggingService(config)
      );
    }
    return AlertService.instance;
  }

  private initializeDefaultAlerts(): void {
    // Alertas de Pagamento
    this.addAlertConfig({
      name: 'payment_failure_rate',
      description: 'Taxa de falha em pagamentos acima do limite',
      severity: AlertSeverity.ERROR,
      threshold: 0.1, // 10% de falha
      window: 300, // 5 minutos
      channels: ['discord', 'email']
    });

    // Alertas de Webhook
    this.addAlertConfig({
      name: 'webhook_processing_delay',
      description: 'Atraso no processamento de webhooks',
      severity: AlertSeverity.WARNING,
      threshold: 60, // 60 segundos
      window: 300,
      channels: ['discord']
    });

    // Alertas de Sistema
    this.addAlertConfig({
      name: 'high_error_rate',
      description: 'Taxa de erro HTTP acima do limite',
      severity: AlertSeverity.CRITICAL,
      threshold: 0.05, // 5% de erro
      window: 60,
      channels: ['discord', 'email', 'slack']
    });
  }

  public addAlertConfig(config: AlertConfig): void {
    this.alertConfigs.set(config.name, config);
    this.alertCounters.set(config.name, 0);
    this.alertTimestamps.set(config.name, []);
  }

  public async checkAlert(name: string, value: number): Promise<void> {
    const config = this.alertConfigs.get(name);
    if (!config) {
      this.logger.warn(`Configuração de alerta não encontrada: ${name}`);
      return;
    }

    const now = Date.now();
    const timestamps = this.alertTimestamps.get(name) || [];
    
    // Remove timestamps antigos
    const validTimestamps = timestamps.filter(
      ts => now - ts <= config.window * 1000
    );
    
    validTimestamps.push(now);
    this.alertTimestamps.set(name, validTimestamps);

    // Verifica se o valor excede o threshold
    if (value > config.threshold) {
      await this.triggerAlert(name, value);
    }
  }

  private async triggerAlert(name: string, value: number): Promise<void> {
    const alertConfig = this.alertConfigs.get(name);
    if (!alertConfig) return;

    const alertMessage = {
      name,
      description: alertConfig.description,
      severity: alertConfig.severity,
      value,
      threshold: alertConfig.threshold,
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV
    };

    // Log do alerta
    this.logger.warn(`Alerta disparado: ${name}`, alertMessage);

    // Incrementa contador de alertas
    const currentCount = this.alertCounters.get(name) || 0;
    this.alertCounters.set(name, currentCount + 1);

    // Envia para os canais configurados
    for (const channel of alertConfig.channels) {
      await this.sendToChannel(channel, alertMessage);
    }

    // Registra métrica do alerta
    MetricsService.incrementAlertCount(name, alertConfig.severity);
  }

  private async sendToChannel(channel: string, alert: any): Promise<void> {
    // Implementação específica para cada canal
    switch (channel) {
      case 'discord':
        // TODO: Implementar integração com Discord
        break;
      case 'email':
        // TODO: Implementar envio de email
        break;
      case 'slack':
        // TODO: Implementar integração com Slack
        break;
      default:
        this.logger.warn(`Canal de alerta não suportado: ${channel}`);
    }
  }

  public getAlertStats(name: string): { count: number; lastTriggered: Date | null } {
    const count = this.alertCounters.get(name) || 0;
    const timestamps = this.alertTimestamps.get(name) || [];
    const lastTriggered = timestamps.length > 0 ? new Date(timestamps[timestamps.length - 1]) : null;

    return { count, lastTriggered };
  }
} 