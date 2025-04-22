import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { LoggingService } from './LoggingService';
import { SecurityError } from '../errors/AppError';

interface BlacklistEntry {
  reason: string;
  attempts: number;
  lastAttempt: string;
  expiresAt: string;
}

@Injectable()
export class BlacklistService {
  private readonly logger = LoggingService.getInstance();
  private readonly MAX_ATTEMPTS = 3;
  private readonly BASE_TTL = 3600; // 1 hora em segundos

  constructor(private readonly redisService: RedisService) {}

  private calculateTtl(attempts: number): number {
    // TTL exponencial: 1h, 2h, 4h, 8h, etc.
    return this.BASE_TTL * Math.pow(2, attempts - 1);
  }

  private formatExpirationDate(ttl: number): string {
    const date = new Date();
    date.setSeconds(date.getSeconds() + ttl);
    return date.toISOString();
  }

  async addToBlacklist(
    type: 'document' | 'email',
    value: string,
    reason: string,
    requestId?: string,
  ): Promise<void> {
    try {
      const key = `blacklist:${type}:${value}`;
      const existing = await this.redisService.get(key);

      if (existing) {
        const entry: BlacklistEntry = JSON.parse(existing);
        entry.attempts += 1;
        entry.lastAttempt = new Date().toISOString();
        entry.reason = reason;

        const ttl = this.calculateTtl(entry.attempts);
        entry.expiresAt = this.formatExpirationDate(ttl);

        await this.redisService.set(key, JSON.stringify(entry), ttl);
      } else {
        const entry: BlacklistEntry = {
          reason,
          attempts: 1,
          lastAttempt: new Date().toISOString(),
          expiresAt: this.formatExpirationDate(this.BASE_TTL),
        };

        await this.redisService.set(key, JSON.stringify(entry), this.BASE_TTL);
      }

      this.logger.warn(`Item adicionado à blacklist`, {
        type,
        value,
        reason,
        requestId,
      });
    } catch (error) {
      this.logger.error(`Erro ao adicionar à blacklist`, {
        type,
        value,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  async isBlacklisted(
    type: 'document' | 'email',
    value: string,
    requestId?: string,
  ): Promise<{ blocked: boolean; entry?: BlacklistEntry }> {
    try {
      const key = `blacklist:${type}:${value}`;
      const existing = await this.redisService.get(key);

      if (!existing) {
        return { blocked: false };
      }

      const entry: BlacklistEntry = JSON.parse(existing);
      const now = new Date();
      const expiresAt = new Date(entry.expiresAt);

      if (now > expiresAt) {
        await this.redisService.del(key);
        return { blocked: false };
      }

      return { blocked: true, entry };
    } catch (error) {
      this.logger.error(`Erro ao verificar blacklist`, {
        type,
        value,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  async checkAndBlock(
    type: 'document' | 'email',
    value: string,
    requestId?: string,
  ): Promise<void> {
    const { blocked, entry } = await this.isBlacklisted(type, value, requestId);

    if (blocked && entry) {
      const remainingTime = Math.ceil(
        (new Date(entry.expiresAt).getTime() - new Date().getTime()) / 1000 / 60,
      );

      throw new SecurityError(
        `ERR_${type.toUpperCase()}_BLOQUEADO`,
        `${type === 'document' ? 'Documento' : 'Email'} bloqueado por tentativas suspeitas`,
        {
          requestId,
          sugestao: `Tente novamente em ${remainingTime} minutos`,
          tempoEspera: remainingTime * 60,
        },
      );
    }
  }

  async incrementAttempts(
    type: 'document' | 'email',
    value: string,
    reason: string,
    requestId?: string,
  ): Promise<void> {
    const { blocked, entry } = await this.isBlacklisted(type, value, requestId);

    if (blocked) {
      await this.checkAndBlock(type, value, requestId);
      return;
    }

    const attempts = (entry?.attempts || 0) + 1;
    if (attempts >= this.MAX_ATTEMPTS) {
      await this.addToBlacklist(type, value, reason, requestId);
    }
  }
}
