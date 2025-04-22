import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompressionGuard } from '../compression/compression.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('compression')
@Controller('compressed')
@UseGuards(CompressionGuard)
export class CompressedController {
  @Get()
  @ApiOperation({ summary: 'Obtém um grande conjunto de dados comprimido' })
  @ApiResponse({
    status: 200,
    description: 'Dados comprimidos retornados com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'ID do item' },
          name: { type: 'string', description: 'Nome do item' },
          description: { type: 'string', description: 'Descrição do item' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
        },
      },
    },
  })
  async getLargeData() {
    // Simula um grande conjunto de dados
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Descrição detalhada do item ${i + 1}`,
      createdAt: new Date().toISOString(),
    }));

    return data;
  }
}
