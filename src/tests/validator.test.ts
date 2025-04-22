import { describe, it, expect } from 'vitest';
import { Validator } from '../utils/validator';
import { AppError } from '../utils/AppError';
import { z } from 'zod';

describe('Validator', () => {
  const schema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  });

  it('deve lançar AppError quando dados são inválidos', async () => {
    const dadosInvalidos = {
      nome: '',
      email: 'email_invalido',
      senha: '123',
    };

    await expect(Validator.validate(schema, dadosInvalidos)).rejects.toThrow(AppError);
  });

  it('deve retornar dados validados quando são válidos', async () => {
    const dadosValidos = {
      nome: 'Test User',
      email: 'test@example.com',
      senha: '123456',
    };

    const resultado = await Validator.validate(schema, dadosValidos);
    expect(resultado).toEqual(dadosValidos);
  });

  it('deve incluir todas as mensagens de erro quando múltiplos campos são inválidos', async () => {
    const dadosInvalidos = {
      nome: '',
      email: 'invalid',
      senha: '123',
    };

    await expect(Validator.validate(schema, dadosInvalidos)).rejects.toThrow(AppError);
  });

  describe('validateSync', () => {
    it('deve validar dados corretos sincronamente', () => {
      const schema = z.object({
        nome: z.string().min(3),
      });

      const dados = {
        nome: 'Teste',
      };

      const resultado = Validator.validateSync(schema, dados);
      expect(resultado).toEqual(dados);
    });

    it('deve lançar AppError para dados inválidos sincronamente', () => {
      const schema = z.object({
        nome: z.string().min(3),
      });

      const dados = {
        nome: 'Te',
      };

      try {
        Validator.validateSync(schema, dados);
        fail('Deveria ter lançado um erro');
      } catch (error: unknown) {
        if (error instanceof AppError) {
          expect(error.statusCode).toBe(400);
        } else {
          fail('Erro deveria ser uma instância de AppError');
        }
      }
    });
  });

  describe('validatePartial', () => {
    it('deve validar dados parciais corretos', () => {
      const schema = z.object({
        nome: z.string().min(3),
        email: z.string().email(),
      });

      const dados = {
        nome: 'Teste',
      };

      const resultado = Validator.validatePartial(schema, dados);
      expect(resultado).toEqual(dados);
    });

    it('deve lançar AppError para dados parciais inválidos', () => {
      const schema = z.object({
        nome: z.string().min(3),
        email: z.string().email(),
      });

      const dados = {
        nome: 'Te',
      };

      try {
        Validator.validatePartial(schema, dados);
        fail('Deveria ter lançado um erro');
      } catch (error: unknown) {
        if (error instanceof AppError) {
          expect(error.statusCode).toBe(400);
        } else {
          fail('Erro deveria ser uma instância de AppError');
        }
      }
    });
  });
});
