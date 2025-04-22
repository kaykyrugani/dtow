# Guia de Logging - OnlyWave API

## Visão Geral

O `LoggerService` é uma implementação personalizada do sistema de logging do NestJS, utilizando Winston como backend. Ele fornece uma interface consistente para logging em toda a aplicação, com suporte a diferentes níveis de log e contexto.

## Configuração

O serviço é configurado automaticamente com:
- Logs coloridos no console para desenvolvimento
- Logs em arquivo para produção
- Formato JSON para fácil integração com ferramentas de análise
- Níveis de log configuráveis via variável de ambiente `LOG_LEVEL`

## Uso Básico

```typescript
import { LoggerService } from './services/logger.service';

@Injectable()
export class SeuServico {
  constructor(private readonly logger: LoggerService) {}

  async seuMetodo() {
    // Log básico
    this.logger.log('Operação iniciada', 'SeuServico');

    try {
      // ... sua lógica ...
      this.logger.log('Operação concluída com sucesso', 'SeuServico');
    } catch (error) {
      // Log de erro com stack trace
      this.logger.error('Falha na operação', error.stack, 'SeuServico');
    }
  }
}
```

## Níveis de Log

O serviço suporta os seguintes níveis de log:

- `log()` - Para informações gerais
- `error()` - Para erros e exceções
- `warn()` - Para avisos e situações não críticas
- `debug()` - Para informações de debug (só ativo em desenvolvimento)
- `verbose()` - Para informações detalhadas

## Boas Práticas

1. **Sempre inclua o contexto**
   ```typescript
   // ✅ Bom
   logger.log('Usuário criado', 'UserService');
   
   // ❌ Evite
   logger.log('Usuário criado');
   ```

2. **Use níveis apropriados**
   ```typescript
   // ✅ Bom
   logger.error('Falha na conexão com banco', error.stack, 'DatabaseService');
   logger.warn('Cache expirado', 'CacheService');
   logger.debug('Cache miss', 'CacheService');
   
   // ❌ Evite
   logger.error('Cache miss'); // Use debug para informações não críticas
   ```

3. **Inclua informações relevantes**
   ```typescript
   // ✅ Bom
   logger.log(`Pagamento ${paymentId} processado`, 'PaymentService');
   
   // ❌ Evite
   logger.log('Pagamento processado');
   ```

4. **Trate erros adequadamente**
   ```typescript
   try {
     // ... código ...
   } catch (error) {
     // ✅ Bom
     logger.error('Falha no processamento', error.stack, 'PaymentService');
     
     // ❌ Evite
     logger.error('Erro');
   }
   ```

## Integração com Observabilidade

Os logs são formatados em JSON para fácil integração com ferramentas como:
- ELK Stack
- Grafana Loki
- Datadog
- New Relic

### Campos Padronizados

Cada log inclui:
- `timestamp`: Data e hora do evento
- `level`: Nível do log (info, error, warn, etc)
- `context`: Contexto da operação
- `message`: Mensagem principal
- `trace`: Stack trace (para erros)

## Configuração em Diferentes Ambientes

### Desenvolvimento
- Logs coloridos no console
- Nível padrão: debug
- Stack traces detalhados

### Produção
- Logs em arquivo
- Nível padrão: info
- Rotação de arquivos de log
- Formato JSON para análise

## Troubleshooting

### Logs não aparecem
1. Verifique a variável de ambiente `LOG_LEVEL`
2. Confirme se o diretório de logs existe e tem permissões
3. Verifique se o serviço está injetado corretamente

### Performance
- Use `debug` e `verbose` com moderação em produção
- Configure rotação de logs para evitar consumo excessivo de disco
- Monitore o tamanho dos arquivos de log 