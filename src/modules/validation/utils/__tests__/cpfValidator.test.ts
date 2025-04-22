import { describe, it, expect } from 'vitest';
import {
  limparCpf,
  temFormatoValido,
  temDigitosRepetidos,
  calcularPrimeiroDigito,
  calcularSegundoDigito,
  validarCpf,
  formatarCpf,
} from '../cpfValidator';

describe('CPF Validator', () => {
  describe('limparCpf', () => {
    it('deve remover caracteres não numéricos', () => {
      expect(limparCpf('123.456.789-00')).toBe('12345678900');
      expect(limparCpf('12345678900')).toBe('12345678900');
    });
  });

  describe('temFormatoValido', () => {
    it('deve retornar true para CPFs com 11 dígitos', () => {
      expect(temFormatoValido('12345678900')).toBe(true);
      expect(temFormatoValido('123.456.789-00')).toBe(true);
    });

    it('deve retornar false para CPFs com menos de 11 dígitos', () => {
      expect(temFormatoValido('1234567890')).toBe(false);
    });

    it('deve retornar false para CPFs com mais de 11 dígitos', () => {
      expect(temFormatoValido('123456789000')).toBe(false);
    });
  });

  describe('temDigitosRepetidos', () => {
    it('deve retornar true para CPFs com todos os dígitos iguais', () => {
      expect(temDigitosRepetidos('11111111111')).toBe(true);
      expect(temDigitosRepetidos('22222222222')).toBe(true);
    });

    it('deve retornar false para CPFs com dígitos diferentes', () => {
      expect(temDigitosRepetidos('12345678900')).toBe(false);
    });
  });

  describe('calcularPrimeiroDigito', () => {
    it('deve calcular o primeiro dígito verificador corretamente', () => {
      expect(calcularPrimeiroDigito('123456789')).toBe(0);
      expect(calcularPrimeiroDigito('987654321')).toBe(6);
    });
  });

  describe('calcularSegundoDigito', () => {
    it('deve calcular o segundo dígito verificador corretamente', () => {
      expect(calcularSegundoDigito('1234567890')).toBe(0);
      expect(calcularSegundoDigito('9876543216')).toBe(9);
    });
  });

  describe('validarCpf', () => {
    it('deve retornar true para CPFs válidos', () => {
      expect(validarCpf('12345678900')).toBe(true);
      expect(validarCpf('98765432169')).toBe(true);
      expect(validarCpf('529.982.247-25')).toBe(true);
    });

    it('deve retornar false para CPFs inválidos', () => {
      expect(validarCpf('12345678901')).toBe(false);
      expect(validarCpf('11111111111')).toBe(false);
      expect(validarCpf('123456')).toBe(false);
    });
  });

  describe('formatarCpf', () => {
    it('deve formatar CPFs válidos corretamente', () => {
      expect(formatarCpf('12345678900')).toBe('123.456.789-00');
      expect(formatarCpf('98765432169')).toBe('987.654.321-69');
    });

    it('deve retornar null para CPFs inválidos', () => {
      expect(formatarCpf('12345678901')).toBe(null);
      expect(formatarCpf('11111111111')).toBe(null);
      expect(formatarCpf('123456')).toBe(null);
    });
  });
});
