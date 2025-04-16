import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailService } from '../../modules/notification/services/email.service';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

// Mock do nodemailer
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-message-id' })
    })
  }
}));

// Mock do fs
vi.mock('fs', () => ({
  readFileSync: vi.fn().mockReturnValue('template content')
}));

// Mock do path
vi.mock('path', () => ({
  join: vi.fn().mockReturnValue('template/path')
}));

describe('EmailService', () => {
  let emailService: EmailService;
  let mockTransporter: any;

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    vi.clearAllMocks();
    
    // Cria uma nova instância do serviço
    emailService = new EmailService();
    
    // Obtém a referência do transporter mockado
    mockTransporter = nodemailer.createTransport();
  });

  describe('sendEmail', () => {
    it('deve enviar um email com sucesso', async () => {
      const template = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test Text'
      };

      const result = await emailService.sendEmail('test@example.com', template);

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: expect.any(String),
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
        html: '<p>Test HTML</p>'
      });
    });

    it('deve lidar com erros no envio de email', async () => {
      const error = new Error('SMTP Error');
      mockTransporter.sendMail.mockRejectedValueOnce(error);

      const template = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test Text'
      };

      const result = await emailService.sendEmail('test@example.com', template);

      expect(result.success).toBe(false);
      expect(result.error).toBe('SMTP Error');
    });
  });

  describe('sendTemplateEmail', () => {
    it('deve renderizar e enviar um email com template', async () => {
      const templateData = {
        nome: 'João',
        numeroPedido: '123',
        dataPedido: '2025-04-15',
        statusPedido: 'Confirmado',
        totalPedido: '299,90',
        itens: [
          { quantidade: 1, nome: 'Produto A', preco: '199,90' }
        ],
        linkAcompanhamento: 'https://onlywave.com.br/pedidos/123'
      };

      const result = await emailService.sendTemplateEmail(
        'test@example.com',
        'ORDER_CONFIRMATION',
        templateData
      );

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id');
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Pedido Confirmado - OnlyWave'
        })
      );
    });

    it('deve lidar com erros na renderização do template', async () => {
      // Simula um erro ao carregar o template
      vi.mocked(readFileSync).mockImplementationOnce(() => {
        throw new Error('Template not found');
      });

      const result = await emailService.sendTemplateEmail(
        'test@example.com',
        'INVALID_TEMPLATE',
        {}
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Template INVALID_TEMPLATE não encontrado');
    });
  });

  describe('renderTemplate', () => {
    it('deve converter HTML para texto plano corretamente', async () => {
      const template = {
        subject: 'Test Subject',
        html: '<p>Test <br/>HTML</p>',
        text: ''
      };

      const result = await emailService['renderTemplate']('TEST', {});

      expect(result.text).toBe('Test HTML');
    });
  });
}); 