import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('OnlyWave API')
    .setDescription(
      `
      API da plataforma OnlyWave.
      
      ## Autenticação
      A API utiliza autenticação JWT. Para acessar endpoints protegidos, inclua o token no header:
      \`Authorization: Bearer <token>\`
      
      ## Rate Limiting
      A API possui rate limiting configurado. Por padrão, são permitidas 10 requisições por minuto.
      
      ## Cache
      Alguns endpoints utilizam cache Redis. O tempo de cache é configurável por endpoint.
      
      ## Compressão
      As respostas são comprimidas automaticamente quando o tamanho excede 1KB.
    `,
    )
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('cache', 'Endpoints com cache')
    .addTag('examples', 'Endpoints de exemplo')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'OnlyWave API Documentation',
  });
}

export const swaggerConfig = registerAs('swagger', () => ({
  title: 'OnlyWave Payment API',
  description: 'API de pagamentos da plataforma OnlyWave',
  version: '1.0',
  tag: 'payments',
  path: 'api',
}));
