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

export const swaggerConfig = new DocumentBuilder()
  .setTitle('OnlyWave API')
  .setDescription('API do backend da aplicação OnlyWave')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
