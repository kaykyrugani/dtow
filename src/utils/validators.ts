import { z } from 'zod';

// Códigos de erro
export const ErrorCodes = {
  VALIDATION: {
    CARTAO_INVALIDO: 'ERR_CARTAO_INVALIDO',
    CPF_INVALIDO: 'ERR_CPF_INVALIDO',
    VALOR_NEGATIVO: 'ERR_VALOR_NEGATIVO',
    EMAIL_INVALIDO: 'ERR_EMAIL_INVALIDO',
    DATA_EXPIRACAO: 'ERR_DATA_EXPIRACAO',
    METODO_PAGAMENTO: 'ERR_METODO_PAGAMENTO',
    MOEDA_INVALIDA: 'ERR_MOEDA_INVALIDA',
  },
} as const;

// Função para validar CPF
export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  const digitoVerificador1 = resto > 9 ? 0 : resto;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  const digitoVerificador2 = resto > 9 ? 0 : resto;

  return (
    digitoVerificador1 === parseInt(cpf.charAt(9)) &&
    digitoVerificador2 === parseInt(cpf.charAt(10))
  );
}

// Função para validar data de expiração do cartão
export function validarDataExpiracao(data: string): boolean {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!regex.test(data)) return false;

  const [mes, ano] = data.split('/').map(Number);
  const agora = new Date();
  const atualAno = Number(agora.getFullYear().toString().slice(-2));
  const atualMes = agora.getMonth() + 1;

  return ano > atualAno || (ano === atualAno && mes >= atualMes);
}

// Custom validators para Zod
export const customValidators = {
  cpf: () =>
    z.string().refine(validarCPF, {
      message: 'CPF inválido. Digite apenas números, sem pontos ou traços.',
      path: ['document'],
    }),

  dataExpiracao: () =>
    z.string().refine(validarDataExpiracao, {
      message: 'Cartão expirado ou data inválida. Use o formato MM/AA.',
      path: ['expirationDate'],
    }),
};
