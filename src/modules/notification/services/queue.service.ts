import { injectable, inject } from 'tsyringe';
import { Queue, Worker, Job } from 'bullmq';
import { env } from '../../../config/env';
import { logger } from '../../../config/logger';
import { EmailService } from './email.service';
import { NotificationData, QueueOptions } from '../types/notification.types';

@injectable()
export class QueueService {
  private notificationQueue: Queue;
  private worker: Worker;

  constructor(
    @inject(EmailService)
    private emailService: EmailService
  ) {
    this.notificationQueue = new Queue('notifications', {
      connection: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD
      }
    });

    this.worker = new Worker(
      'notifications',
      async (job: Job<NotificationData>) => {
        return this.processNotification(job.data);
      },
      {
        connection: {
          host: env.REDIS_HOST,
          port: env.REDIS_PORT,
          password: env.REDIS_PASSWORD
        }
      }
    );

    this.setupWorkerEvents();
  }

  private setupWorkerEvents() {
    this.worker.on('completed', (job) => {
      logger.info('Notificação processada com sucesso', {
        jobId: job.id,
        type: job.data.type
      });
    });

    this.worker.on('failed', (job, error) => {
      logger.error('Erro ao processar notificação:', {
        jobId: job?.id,
        type: job?.data.type,
        error: error.message
      });
    });
  }

  private async processNotification(data: NotificationData) {
    const { type, recipient, data: templateData } = data;

    if (recipient.email) {
      return this.emailService.sendTemplateEmail(
        recipient.email,
        type,
        templateData
      );
    }

    throw new Error('Destinatário não possui email');
  }

  async addNotification(
    data: NotificationData,
    options?: QueueOptions
  ): Promise<Job> {
    const defaultOptions: QueueOptions = {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      },
      removeOnComplete: true,
      removeOnFail: false
    };

    const job = await this.notificationQueue.add(
      data.type,
      data,
      { ...defaultOptions, ...options }
    );

    logger.info('Notificação adicionada à fila', {
      jobId: job.id,
      type: data.type
    });

    return job;
  }

  async getJob(jobId: string): Promise<Job | null> {
    return this.notificationQueue.getJob(jobId);
  }

  async getJobs(
    status: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed' | 'paused'
  ): Promise<Job[]> {
    return this.notificationQueue.getJobs([status]);
  }

  async cleanQueue(
    grace: number = 1000,
    status: 'completed' | 'wait' | 'active' | 'delayed' | 'failed' | 'paused' = 'completed'
  ): Promise<void> {
    await this.notificationQueue.clean(grace, status);
  }
} 