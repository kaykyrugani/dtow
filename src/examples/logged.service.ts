import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';

@Injectable()
export class LoggedService {
  constructor(private readonly logger: LoggerService) {}

  async doSomething(requestId: string) {
    this.logger.debug('Iniciando operação', 'LoggedService', requestId);

    try {
      // Simula uma operação
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.logger.log('Operação concluída com sucesso', 'LoggedService', requestId);
      return { success: true };
    } catch (error) {
      this.logger.error('Erro durante a operação', error.stack, 'LoggedService', requestId);
      throw error;
    }
  }
}
