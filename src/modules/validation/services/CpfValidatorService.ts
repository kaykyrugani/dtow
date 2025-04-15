import { injectable } from 'tsyringe';
import { validarCpf, formatarCpf } from '../utils/cpfValidator';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorMessages';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { logger } from '../../../utils/logger';

@injectable()
export class CpfValidatorService {
  /**
   * Valida um CPF e lança um erro se for inválido
   * @param cpf CPF a ser validado
   * @throws AppError se o CPF for inválido
   */
  validarCpf(cpf: string): void {
    if (!validarCpf(cpf)) {
      logger.warn(`Tentativa de uso de CPF inválido: ${cpf}`);
      throw new AppError(
        ERROR_CODES.INVALID_CPF,
        HttpStatusCode.BAD_REQUEST,
        { message: 'CPF inválido' }
      );
    }
    
    logger.info(`CPF ${cpf} validado com sucesso`);
  }

  /**
   * Valida e formata um CPF
   * @param cpf CPF a ser validado e formatado
   * @returns CPF formatado no padrão XXX.XXX.XXX-XX
   * @throws AppError se o CPF for inválido
   */
  validarEFormatarCpf(cpf: string): string {
    this.validarCpf(cpf);
    
    const cpfFormatado = formatarCpf(cpf);
    if (!cpfFormatado) {
      throw new AppError(
        ERROR_CODES.INVALID_CPF,
        HttpStatusCode.BAD_REQUEST,
        { message: 'CPF inválido' }
      );
    }
    
    return cpfFormatado;
  }

  /**
   * Verifica se um CPF é válido sem lançar erro
   * @param cpf CPF a ser verificado
   * @returns true se o CPF for válido, false caso contrário
   */
  isCpfValido(cpf: string): boolean {
    return validarCpf(cpf);
  }
} 