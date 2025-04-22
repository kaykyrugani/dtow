import { injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import { env } from '../../../config/env';
import { logger } from '../../../config/logger';
import { EmailTemplate, NotificationResult } from '../types/notification.types';

@injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private templates: Map<string, handlebars.TemplateDelegate> = new Map();

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    // Carrega templates
    this.loadTemplates();
  }

  private loadTemplates() {
    const templateTypes = [
      'ORDER_CONFIRMATION',
      'ORDER_STATUS_UPDATE',
      'PASSWORD_RECOVERY',
      'WELCOME',
    ];

    templateTypes.forEach(type => {
      try {
        const templatePath = join(__dirname, `../../../templates/email/${type.toLowerCase()}.hbs`);
        const template = readFileSync(templatePath, 'utf-8');
        this.templates.set(type, handlebars.compile(template));
      } catch (error) {
        logger.error(`Erro ao carregar template ${type}:`, error);
      }
    });
  }

  private async renderTemplate(type: string, data: Record<string, any>): Promise<EmailTemplate> {
    const template = this.templates.get(type);
    if (!template) {
      throw new Error(`Template ${type} não encontrado`);
    }

    const html = template(data);
    const text = this.htmlToText(html);

    return {
      subject: this.getSubject(type, data),
      html,
      text,
    };
  }

  private getSubject(type: string, data: Record<string, any>): string {
    const subjects: Record<string, string> = {
      ORDER_CONFIRMATION: 'Pedido Confirmado - OnlyWave',
      ORDER_STATUS_UPDATE: 'Atualização do seu Pedido - OnlyWave',
      PASSWORD_RECOVERY: 'Recuperação de Senha - OnlyWave',
      WELCOME: 'Bem-vindo à OnlyWave!',
    };

    return subjects[type] || 'Notificação - OnlyWave';
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }

  async sendEmail(to: string, template: EmailTemplate): Promise<NotificationResult> {
    try {
      const info = await this.transporter.sendMail({
        from: `"OnlyWave" <${env.SMTP_FROM}>`,
        to,
        subject: template.subject,
        text: template.text,
        html: template.html,
      });

      logger.info('Email enviado com sucesso', {
        messageId: info.messageId,
        to,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      logger.error('Erro ao enviar email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async sendTemplateEmail(
    to: string,
    type: string,
    data: Record<string, any>,
  ): Promise<NotificationResult> {
    try {
      const template = await this.renderTemplate(type, data);
      return this.sendEmail(to, template);
    } catch (error) {
      logger.error('Erro ao enviar email com template:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
}
