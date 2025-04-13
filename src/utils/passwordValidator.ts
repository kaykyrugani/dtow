import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnPtBrPackage from '@zxcvbn-ts/language-pt-br';

// Configuração do zxcvbn
const options = {
  translations: zxcvbnPtBrPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnPtBrPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export interface PasswordStrength {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crackTimesSeconds: {
    onlineThrottling100PerHour: number;
    onlineNoThrottling10PerSecond: number;
    offlineSlowHashing1e4PerSecond: number;
    offlineFastHashing1e10PerSecond: number;
  };
}

export class PasswordValidator {
  static validate(password: string, userInputs: string[] = []): PasswordStrength {
    const result = zxcvbn(password, userInputs);

    return {
      score: result.score, // 0-4 (0 = muito fraca, 4 = muito forte)
      feedback: {
        warning: result.feedback.warning || '',
        suggestions: result.feedback.suggestions || [],
      },
      crackTimesSeconds: {
        onlineThrottling100PerHour: result.crackTimesSeconds.onlineThrottling100PerHour,
        onlineNoThrottling10PerSecond: result.crackTimesSeconds.onlineNoThrottling10PerSecond,
        offlineSlowHashing1e4PerSecond: result.crackTimesSeconds.offlineSlowHashing1e4PerSecond,
        offlineFastHashing1e10PerSecond: result.crackTimesSeconds.offlineFastHashing1e10PerSecond
      },
    };
  }

  static isStrongEnough(password: string, userInputs: string[] = []): boolean {
    const result = this.validate(password, userInputs);
    return result.score >= 3; // Exige pelo menos score 3 (forte)
  }

  static getRequirements(): string[] {
    return [
      'Mínimo de 8 caracteres',
      'Pelo menos uma letra maiúscula',
      'Pelo menos uma letra minúscula',
      'Pelo menos um número',
      'Pelo menos um caractere especial',
      'Não deve conter informações pessoais óbvias',
      'Não deve ser uma senha comum',
    ];
  }

  static formatFeedback(result: PasswordStrength): string {
    const score = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'][result.score];
    
    let feedback = `Força da senha: ${score}\n`;
    
    if (result.feedback.warning) {
      feedback += `\nAviso: ${result.feedback.warning}`;
    }
    
    if (result.feedback.suggestions.length > 0) {
      feedback += '\n\nSugestões:';
      result.feedback.suggestions.forEach(suggestion => {
        feedback += `\n- ${suggestion}`;
      });
    }

    return feedback;
  }
} 