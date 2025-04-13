import { describe, it, expect } from 'vitest';
import { PasswordValidator } from '../utils/passwordValidator';

describe('Password Validator', () => {
  it('deve identificar senha fraca', () => {
    const result = PasswordValidator.validate('123456');
    expect(result.score).toBeLessThan(3);
    expect(result.feedback.warning).toBeTruthy();
  });

  it('deve identificar senha com informações pessoais', () => {
    const result = PasswordValidator.validate('joaosilva123', ['joao', 'silva']);
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it('deve identificar senha média', () => {
    const result = PasswordValidator.validate('Senha123!');
    expect(result.score).toBeLessThan(4);
    expect(result.feedback.suggestions).toBeTruthy();
  });

  it('deve identificar senha forte', () => {
    const result = PasswordValidator.validate('K7#mP9$xL2@nV5');
    expect(result.score).toBeGreaterThanOrEqual(4);
  });

  it('deve identificar senha muito forte', () => {
    const result = PasswordValidator.validate('uM4#P@ssw0rd_Mu1t0_F0rt3!');
    expect(result.score).toBeGreaterThanOrEqual(4);
  });

  it('deve verificar se uma senha é forte o suficiente', () => {
    expect(PasswordValidator.isStrongEnough('123456')).toBe(false);
    expect(PasswordValidator.isStrongEnough('K7#mP9$xL2@nV5')).toBe(true);
  });

  it('deve retornar os requisitos de senha', () => {
    const requirements = PasswordValidator.getRequirements();
    expect(requirements).toBeInstanceOf(Array);
    expect(requirements.length).toBeGreaterThan(0);
  });

  it('deve formatar o feedback corretamente', () => {
    const result = PasswordValidator.validate('123456');
    const feedback = PasswordValidator.formatFeedback(result);
    expect(feedback).toContain('Força da senha:');
    expect(feedback).toContain('Muito fraca');
  });
}); 