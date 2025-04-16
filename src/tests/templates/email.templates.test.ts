import { describe, it, expect } from 'vitest';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Email Templates', () => {
  const templates = [
    'order-confirmation',
    'password-recovery',
    'welcome',
    'order-status-update'
  ];

  templates.forEach(templateName => {
    describe(`${templateName}.hbs`, () => {
      let template: string;
      let compiledTemplate: handlebars.TemplateDelegate;

      beforeAll(() => {
        const templatePath = join(__dirname, `../../../templates/email/${templateName}.hbs`);
        template = readFileSync(templatePath, 'utf-8');
        compiledTemplate = handlebars.compile(template);
      });

      it('deve renderizar o template sem erros', () => {
        const data = getTemplateData(templateName);
        expect(() => compiledTemplate(data)).not.toThrow();
      });

      it('deve conter elementos HTML essenciais', () => {
        const rendered = compiledTemplate(getTemplateData(templateName));
        expect(rendered).toContain('<!DOCTYPE html>');
        expect(rendered).toContain('<html>');
        expect(rendered).toContain('<head>');
        expect(rendered).toContain('<body>');
      });

      it('deve conter estilos CSS inline', () => {
        const rendered = compiledTemplate(getTemplateData(templateName));
        expect(rendered).toContain('<style>');
        expect(rendered).toContain('</style>');
      });

      it('deve conter o rodapé padrão', () => {
        const rendered = compiledTemplate(getTemplateData(templateName));
        expect(rendered).toContain('© 2025 OnlyWave');
        expect(rendered).toContain('Este é um email automático');
      });

      it('deve renderizar variáveis corretamente', () => {
        const data = getTemplateData(templateName);
        const rendered = compiledTemplate(data);
        
        // Verifica se as variáveis básicas foram renderizadas
        if (data.nome) {
          expect(rendered).toContain(data.nome);
        }
      });
    });
  });
});

// Função auxiliar para gerar dados de exemplo para cada tipo de template
function getTemplateData(templateName: string): Record<string, any> {
  const baseData = {
    nome: 'João Silva',
    email: 'joao@example.com'
  };

  switch (templateName) {
    case 'order-confirmation':
      return {
        ...baseData,
        numeroPedido: '123456',
        dataPedido: '15/04/2025',
        statusPedido: 'Confirmado',
        totalPedido: '299,90',
        itens: [
          { quantidade: 1, nome: 'Produto A', preco: '199,90' },
          { quantidade: 2, nome: 'Produto B', preco: '50,00' }
        ],
        linkAcompanhamento: 'https://onlywave.com.br/pedidos/123456'
      };

    case 'password-recovery':
      return {
        ...baseData,
        tempoExpiracao: 30,
        linkRedefinicao: 'https://onlywave.com.br/redefinir-senha?token=abc123'
      };

    case 'welcome':
      return {
        ...baseData,
        cupomBoasVindas: 'BEMVINDO25',
        descontoBoasVindas: 25,
        linkLogin: 'https://onlywave.com.br/login'
      };

    case 'order-status-update':
      return {
        ...baseData,
        numeroPedido: '123456',
        statusAnterior: 'Em processamento',
        statusNovo: 'Enviado',
        dataAtualizacao: '15/04/2025',
        linkAcompanhamento: 'https://onlywave.com.br/pedidos/123456'
      };

    default:
      return baseData;
  }
} 