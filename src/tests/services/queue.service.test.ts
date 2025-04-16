import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueueService } from '../../modules/notification/services/queue.service';
import { EmailService } from '../../modules/notification/services/email.service';
import { Queue, Worker } from 'bullmq';
import { NotificationData, NotificationType } from '../../modules/notification/types/notification.types';

// Mock do BullMQ
vi.mock('bullmq', () => ({
  Queue: vi.fn().mockImplementation(() => ({
    add: vi.fn().mockResolvedValue({ id: 'test-job-id' }),
    getJob: vi.fn().mockResolvedValue({ id: 'test-job-id' }),
    getJobs: vi.fn().mockResolvedValue([{ id: 'test-job-id' }]),
    clean: vi.fn().mockResolvedValue(undefined)
  })),
  Worker: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    run: vi.fn()
  }))
}));

describe('QueueService', () => {
  let queueService: QueueService;
  let mockEmailService: EmailService;
  let mockQueue: any;
  let mockWorker: any;

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    vi.clearAllMocks();
    
    // Cria mocks dos serviços
    mockEmailService = {
      sendTemplateEmail: vi.fn().mockResolvedValue({ success: true, messageId: 'test-message-id' })
    } as any;

    // Cria uma nova instância do serviço
    queueService = new QueueService(mockEmailService);
    
    // Obtém as referências dos mocks
    mockQueue = new Queue('notifications', { connection: { host: 'localhost', port: 6379 } });
    mockWorker = new Worker('notifications', async () => {}, { connection: { host: 'localhost', port: 6379 } });
  });

  describe('addNotification', () => {
    it('deve adicionar uma notificação à fila com sucesso', async () => {
      const notificationData: NotificationData = {
        type: 'order_confirmation' as NotificationType,
        priority: 'normal',
        recipient: {
          email: 'test@example.com',
          name: 'Test User'
        },
        data: {
          nome: 'Test User',
          numeroPedido: '123',
          dataPedido: '2025-04-15',
          statusPedido: 'Confirmado',
          totalPedido: '299,90',
          itens: [
            { quantidade: 1, nome: 'Produto A', preco: '199,90' }
          ],
          linkAcompanhamento: 'https://onlywave.com.br/pedidos/123'
        }
      };

      const job = await queueService.addNotification(notificationData);

      expect(job.id).toBe('test-job-id');
      expect(mockQueue.add).toHaveBeenCalledWith(
        'order_confirmation',
        notificationData,
        expect.objectContaining({
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000
          }
        })
      );
    });

    it('deve usar opções personalizadas ao adicionar uma notificação', async () => {
      const notificationData: NotificationData = {
        type: 'order_confirmation' as NotificationType,
        priority: 'high',
        recipient: {
          email: 'test@example.com'
        },
        data: {}
      };

      const options = {
        attempts: 5,
        backoff: {
          type: 'fixed' as const,
          delay: 2000
        }
      };

      await queueService.addNotification(notificationData, options);

      expect(mockQueue.add).toHaveBeenCalledWith(
        'order_confirmation',
        notificationData,
        expect.objectContaining(options)
      );
    });
  });

  describe('processNotification', () => {
    it('deve processar uma notificação com sucesso', async () => {
      const notificationData: NotificationData = {
        type: 'order_confirmation' as NotificationType,
        priority: 'normal',
        recipient: {
          email: 'test@example.com',
          name: 'Test User'
        },
        data: {
          nome: 'Test User',
          numeroPedido: '123'
        }
      };

      const result = await queueService['processNotification'](notificationData);

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
      expect(mockEmailService.sendTemplateEmail).toHaveBeenCalledWith(
        'test@example.com',
        'order_confirmation',
        expect.objectContaining({
          nome: 'Test User',
          numeroPedido: '123'
        })
      );
    });

    it('deve lidar com erros no processamento da notificação', async () => {
      const error = new Error('Email error');
      (mockEmailService.sendTemplateEmail as any).mockRejectedValueOnce(error);

      const notificationData: NotificationData = {
        type: 'order_confirmation' as NotificationType,
        priority: 'low',
        recipient: {
          email: 'test@example.com'
        },
        data: {}
      };

      await expect(queueService['processNotification'](notificationData))
        .rejects
        .toThrow('Email error');
    });
  });

  describe('getJob', () => {
    it('deve retornar um job específico', async () => {
      const job = await queueService.getJob('test-job-id');

      expect(job).toBeDefined();
      expect(job?.id).toBe('test-job-id');
      expect(mockQueue.getJob).toHaveBeenCalledWith('test-job-id');
    });
  });

  describe('getJobs', () => {
    it('deve retornar jobs com um status específico', async () => {
      const jobs = await queueService.getJobs('completed');

      expect(jobs).toHaveLength(1);
      expect(jobs[0].id).toBe('test-job-id');
      expect(mockQueue.getJobs).toHaveBeenCalledWith(['completed']);
    });
  });

  describe('cleanQueue', () => {
    it('deve limpar a fila com os parâmetros padrão', async () => {
      await queueService.cleanQueue();

      expect(mockQueue.clean).toHaveBeenCalledWith(1000, 'completed');
    });

    it('deve limpar a fila com parâmetros personalizados', async () => {
      await queueService.cleanQueue(2000, 'failed');

      expect(mockQueue.clean).toHaveBeenCalledWith(2000, 'failed');
    });
  });
}); 