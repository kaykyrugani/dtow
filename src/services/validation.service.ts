import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { LoggingService } from './LoggingService';
import { SecurityError } from '../errors/AppError';
import { BlacklistService } from './blacklist.service';
import { ValidationError } from '../errors/AppError';

@Injectable()
export class ValidationService {
  private readonly logger = LoggingService.getInstance();
  private readonly ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  private readonly BLOCKED_BINS = ['000000', '111111', '999999'];
  private readonly CPF_REGEX = /^\d{11}$/;
  private readonly CNPJ_REGEX = /^\d{14}$/;
  private readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private readonly redisService: RedisService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async validateBin(bin: string, requestId?: string): Promise<void> {
    try {
      // Verifica cache primeiro
      const cachedBin = await this.redisService.get(`bin:${bin}`);
      if (cachedBin === 'blocked') {
        throw new SecurityError(
          'ERR_BIN_BLOQUEADO',
          'Cartão não aceito para transações',
          requestId,
        );
      }

      // Verifica lista local de BINs bloqueados
      if (this.BLOCKED_BINS.includes(bin)) {
        await this.redisService.set(`bin:${bin}`, 'blocked', 86400); // Cache por 24h
        throw new SecurityError(
          'ERR_BIN_BLOQUEADO',
          'Cartão não aceito para transações',
          requestId,
        );
      }

      // TODO: Integrar com serviço externo de validação de BIN
      // const binInfo = await externalBinService.validate(bin);
      // if (!binInfo.isValid) {
      //   await this.redisService.set(`bin:${bin}`, 'blocked', 86400);
      //   throw new SecurityError('ERR_BIN_BLOQUEADO', 'Cartão não aceito para transações');
      // }
    } catch (error) {
      this.logger.error('Erro ao validar BIN', {
        bin,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  async validateEmailDomain(email: string, requestId?: string): Promise<void> {
    try {
      const domain = email.split('@')[1];

      // Verifica cache primeiro
      const cachedDomain = await this.redisService.get(`domain:${domain}`);
      if (cachedDomain === 'blocked') {
        throw new SecurityError(
          'ERR_EMAIL_DOMINIO_BLOQUEADO',
          'Domínio de email não permitido',
          requestId,
        );
      }

      // Verifica lista de domínios permitidos
      if (!this.ALLOWED_EMAIL_DOMAINS.includes(domain)) {
        await this.redisService.set(`domain:${domain}`, 'blocked', 86400);
        throw new SecurityError(
          'ERR_EMAIL_DOMINIO_BLOQUEADO',
          'Domínio de email não permitido',
          requestId,
        );
      }
    } catch (error) {
      this.logger.error('Erro ao validar domínio de email', {
        email,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  async validateCustomerData(name: string, document: string, requestId?: string): Promise<void> {
    try {
      // Verifica cache de dados do cliente
      const cachedCustomer = await this.redisService.get(`customer:${document}`);
      if (cachedCustomer) {
        const customerData = JSON.parse(cachedCustomer);
        if (customerData.name !== name) {
          throw new SecurityError(
            'ERR_DADOS_INCONSISTENTES',
            'Dados do cliente inconsistentes com registros anteriores',
            requestId,
          );
        }
      }

      // TODO: Integrar com serviço de verificação de dados
      // const customerInfo = await externalCustomerService.validate(name, document);
      // if (!customerInfo.isValid) {
      //   throw new SecurityError('ERR_DADOS_INVALIDOS', 'Dados do cliente inválidos');
      // }
    } catch (error) {
      this.logger.error('Erro ao validar dados do cliente', {
        name,
        document,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  private validateCPF(cpf: string): boolean {
    if (!this.CPF_REGEX.test(cpf)) return false;

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  private validateCNPJ(cnpj: string): boolean {
    if (!this.CNPJ_REGEX.test(cnpj)) return false;

    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação do primeiro dígito verificador
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    // Validação do segundo dígito verificador
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  private validateEmail(email: string): boolean {
    if (!this.EMAIL_REGEX.test(email)) return false;

    // Verifica domínios comuns de email temporário
    const tempEmailDomains = [
      'tempmail.com',
      'throwawaymail.com',
      'mailinator.com',
      'guerrillamail.com',
    ];

    const domain = email.split('@')[1].toLowerCase();
    if (tempEmailDomains.includes(domain)) {
      return false;
    }

    return true;
  }

  async validateDocument(
    document: string,
    type: 'CPF' | 'CNPJ',
    requestId?: string,
  ): Promise<void> {
    try {
      // Verifica blacklist
      await this.blacklistService.checkAndBlock('document', document, requestId);

      // Valida formato e algoritmo
      const isValid = type === 'CPF' ? this.validateCPF(document) : this.validateCNPJ(document);

      if (!isValid) {
        throw new ValidationError(`ERR_${type}_INVALIDO`, `${type} inválido`, {
          requestId,
          exemplo: type === 'CPF' ? '123.456.789-00' : '12.345.678/0001-90',
          sugestao: `Verifique se o ${type} está correto e tente novamente`,
        });
      }

      // Incrementa tentativas na blacklist
      await this.blacklistService.incrementAttempts(
        'document',
        document,
        `Validação de ${type} bem sucedida`,
        requestId,
      );
    } catch (error) {
      this.logger.error(`Erro na validação de documento`, {
        type,
        document,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  async validateEmail(email: string, requestId?: string): Promise<void> {
    try {
      // Verifica blacklist
      await this.blacklistService.checkAndBlock('email', email, requestId);

      // Valida formato e domínio
      if (!this.validateEmail(email)) {
        throw new ValidationError('ERR_EMAIL_INVALIDO', 'Email inválido ou não permitido', {
          requestId,
          exemplo: 'usuario@dominio.com',
          sugestao: 'Use um email válido e permanente',
        });
      }

      // Incrementa tentativas na blacklist
      await this.blacklistService.incrementAttempts(
        'email',
        email,
        'Validação de email bem sucedida',
        requestId,
      );
    } catch (error) {
      this.logger.error(`Erro na validação de email`, {
        email,
        error: error.message,
        requestId,
      });
      throw error;
    }
  }
}
