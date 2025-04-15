/**
 * Utilitário para validação de CPF
 * Implementa o algoritmo oficial dos dígitos verificadores do CPF
 */

/**
 * Remove caracteres não numéricos do CPF
 * @param cpf CPF com ou sem formatação
 * @returns CPF apenas com números
 */
export function limparCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/**
 * Verifica se o CPF tem o formato básico correto (11 dígitos)
 * @param cpf CPF a ser validado
 * @returns true se o formato for válido, false caso contrário
 */
export function temFormatoValido(cpf: string): boolean {
  const cpfLimpo = limparCpf(cpf);
  return cpfLimpo.length === 11;
}

/**
 * Verifica se o CPF tem todos os dígitos iguais
 * @param cpf CPF a ser validado
 * @returns true se todos os dígitos forem iguais, false caso contrário
 */
export function temDigitosRepetidos(cpf: string): boolean {
  const cpfLimpo = limparCpf(cpf);
  return /^(\d)\1{10}$/.test(cpfLimpo);
}

/**
 * Calcula o primeiro dígito verificador do CPF
 * @param cpf CPF sem o primeiro dígito verificador
 * @returns Primeiro dígito verificador calculado
 */
export function calcularPrimeiroDigito(cpf: string): number {
  const cpfLimpo = limparCpf(cpf);
  let soma = 0;
  
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

/**
 * Calcula o segundo dígito verificador do CPF
 * @param cpf CPF com o primeiro dígito verificador
 * @returns Segundo dígito verificador calculado
 */
export function calcularSegundoDigito(cpf: string): number {
  const cpfLimpo = limparCpf(cpf);
  let soma = 0;
  
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

/**
 * Valida um CPF usando o algoritmo oficial dos dígitos verificadores
 * @param cpf CPF a ser validado
 * @returns true se o CPF for válido, false caso contrário
 */
export function validarCpf(cpf: string): boolean {
  // Limpa o CPF e verifica o formato básico
  const cpfLimpo = limparCpf(cpf);
  if (!temFormatoValido(cpfLimpo)) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (temDigitosRepetidos(cpfLimpo)) {
    return false;
  }
  
  // Calcula o primeiro dígito verificador
  const primeiroDigito = calcularPrimeiroDigito(cpfLimpo.substring(0, 9));
  if (primeiroDigito !== parseInt(cpfLimpo.charAt(9))) {
    return false;
  }
  
  // Calcula o segundo dígito verificador
  const segundoDigito = calcularSegundoDigito(cpfLimpo.substring(0, 10));
  if (segundoDigito !== parseInt(cpfLimpo.charAt(10))) {
    return false;
  }
  
  return true;
}

/**
 * Formata um CPF no padrão XXX.XXX.XXX-XX
 * @param cpf CPF a ser formatado
 * @returns CPF formatado ou null se o CPF for inválido
 */
export function formatarCpf(cpf: string): string | null {
  const cpfLimpo = limparCpf(cpf);
  
  if (!validarCpf(cpfLimpo)) {
    return null;
  }
  
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
} 