import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { LoggingService } from './LoggingService';

export enum AuditAction {
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  PAYMENT_UPDATED = 'PAYMENT_UPDATED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  WEBHOOK_RECEIVED = 'WEBHOOK_RECEIVED',
  WEBHOOK_PROCESSED = 'WEBHOOK_PROCESSED',
  WEBHOOK_FAILED = 'WEBHOOK_FAILED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_UPDATED = 'ORDER_UPDATED',
  ORDER_CANCELLED = 'ORDER_CANCELLED'
}

export interface AuditLogData {
  action: AuditAction;
  userId?: string;
  entityId?: string;
  entityType?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

@injectable()
export class AuditService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
    @inject('LoggingService')
    private logger: LoggingService
  ) {}

  /**
   * Registra uma ação de auditoria no sistema
   * @param data Dados da ação de auditoria
   */
  async log(data: AuditLogData): Promise<void> {
    try {
      // Registra no banco de dados
      await this.prisma.auditLog.create({
        data: {
          action: data.action,
          userId: data.userId,
          entityId: data.entityId,
          entityType: data.entityType,
          details: data.details,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          createdAt: new Date()
        }
      });

      // Registra nos logs do sistema
      this.logger.info(`Audit: ${data.action}`, {
        userId: data.userId,
        entityId: data.entityId,
        entityType: data.entityType,
        details: data.details
      });
    } catch (error) {
      this.logger.error('Erro ao registrar auditoria', {
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        action: data.action
      });
    }
  }

  /**
   * Busca logs de auditoria por ação
   * @param action Ação a ser buscada
   * @param limit Limite de registros
   */
  async findByAction(action: AuditAction, limit = 100): Promise<any[]> {
    return this.prisma.auditLog.findMany({
      where: { action },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  /**
   * Busca logs de auditoria por entidade
   * @param entityId ID da entidade
   * @param entityType Tipo da entidade
   */
  async findByEntity(entityId: string, entityType: string): Promise<any[]> {
    return this.prisma.auditLog.findMany({
      where: { 
        entityId,
        entityType
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Busca logs de auditoria por usuário
   * @param userId ID do usuário
   */
  async findByUser(userId: string): Promise<any[]> {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
} 