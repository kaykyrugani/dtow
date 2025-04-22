import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CachedService } from './cached.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cache')
@Controller('cached')
@UseGuards(ThrottlerGuard)
export class CachedController {
  constructor(private readonly cachedService: CachedService) {}

  @Get(':key')
  @ApiOperation({ summary: 'Obtém dados com cache' })
  @ApiParam({ name: 'key', description: 'Chave para buscar os dados', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Dados retornados com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'string', description: 'Dados cacheados' },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'Data de geração dos dados',
        },
      },
    },
  })
  @ApiResponse({ status: 429, description: 'Muitas requisições' })
  async getData(@Param('key') key: string) {
    return await this.cachedService.getCachedData(key);
  }

  @Delete(':key')
  @ApiOperation({ summary: 'Invalida o cache de uma chave' })
  @ApiParam({ name: 'key', description: 'Chave para invalidar o cache', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cache invalidado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de sucesso' },
      },
    },
  })
  @ApiBearerAuth('access-token')
  async invalidateCache(@Param('key') key: string) {
    await this.cachedService.invalidateCache(key);
    return { message: 'Cache invalidado com sucesso' };
  }
}
