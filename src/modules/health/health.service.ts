import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { RedisService } from '../../modules/redis/redis.service';
import { MercadoPagoService } from '../../modules/payment/services/mercado-pago.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly mercadoPago: MercadoPagoService,
  ) {}

  async check() {
    const [database, redis, mercadoPago] = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkMercadoPago(),
    ]);

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: database.status === 'fulfilled' ? 'up' : 'down',
        redis: redis.status === 'fulfilled' ? 'up' : 'down',
        mercadoPago: mercadoPago.status === 'fulfilled' ? 'up' : 'down',
      },
    };
  }

  private async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }

  private async checkRedis() {
    try {
      await this.redis.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  private async checkMercadoPago() {
    try {
      await this.mercadoPago.checkConnection();
      return true;
    } catch (error) {
      return false;
    }
  }
}
