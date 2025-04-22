import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

export const setupSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('SWAGGER_TITLE') || 'OnlyWave Payment API')
    .setDescription(
      configService.get<string>('SWAGGER_DESCRIPTION') ||
        'API de pagamentos da plataforma OnlyWave',
    )
    .setVersion(configService.get<string>('SWAGGER_VERSION') || '1.0')
    .addTag(configService.get<string>('SWAGGER_TAG') || 'payments')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get<string>('SWAGGER_PATH') || 'api', app, document);
};

export const swaggerConfig = registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'API de Pagamentos',
  description: process.env.SWAGGER_DESCRIPTION || 'API para processamento de pagamentos',
  version: process.env.SWAGGER_VERSION || '1.0',
  tag: process.env.SWAGGER_TAG || 'payments',
  path: process.env.SWAGGER_PATH || 'api',
}));
