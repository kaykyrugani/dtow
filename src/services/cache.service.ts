import { createClient } from 'redis';
import { promisify } from 'util';
import { logger } from '../config/logger';

export class CacheService {
  private static instance: CacheService;
  private client;
  private defaultTTL = 3600; // 1 hora em segundos

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    this.client.on('error', (err) => {
      logger.error('Erro na conexão com Redis:', err);
    });

    this.client.on('connect', () => {
      logger.info('Conectado ao Redis com sucesso');
    });

    this.client.connect();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      logger.error('Erro ao conectar ao Redis:', error);
      throw error;
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Erro ao buscar do cache:', error);
      return null;
    }
  }

  public async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value), {
        EX: ttl
      });
    } catch (error) {
      logger.error('Erro ao salvar no cache:', error);
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Erro ao deletar do cache:', error);
    }
  }

  public async clear(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (error) {
      logger.error('Erro ao limpar cache:', error);
    }
  }

  generateKey(prefix: string, params: Record<string, any> = {}): string {
export const cacheService = CacheService.getInstance(); 