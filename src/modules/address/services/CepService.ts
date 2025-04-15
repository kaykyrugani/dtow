import { injectable } from 'tsyringe';
import axios from 'axios';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorMessages';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { logger } from '../../../utils/logger';
import { ConsultaCepDTO } from '../dtos/EnderecoDTO';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

@injectable()
export class CepService {
  private readonly VIA_CEP_URL = 'https://viacep.com.br/ws';

  async consultarCep(cep: string): Promise<ConsultaCepDTO> {
    try {
      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, '');

      // Valida o formato do CEP
      if (cepLimpo.length !== 8) {
        throw new AppError(
          ERROR_CODES.VALIDATION_ERROR,
          HttpStatusCode.BAD_REQUEST,
          { message: 'CEP deve conter exatamente 8 dígitos' }
        );
      }

      // Faz a requisição para o ViaCEP
      const response = await axios.get<ViaCepResponse>(
        `${this.VIA_CEP_URL}/${cepLimpo}/json/`
      );

      const data = response.data;

      // Verifica se o CEP existe
      if (data.erro) {
        throw new AppError(
          ERROR_CODES.VALIDATION_ERROR,
          HttpStatusCode.BAD_REQUEST,
          { message: 'CEP não encontrado' }
        );
      }

      logger.info(`CEP ${cepLimpo} consultado com sucesso`);

      return {
        cep: data.cep.replace(/\D/g, ''),
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      };
    } catch (error) {
      logger.error(`Erro ao consultar CEP ${cep}: ${error}`);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        ERROR_CODES.INTERNAL_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        { message: 'Erro ao consultar CEP' }
      );
    }
  }
} 