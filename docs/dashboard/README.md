# Dashboard de Pagamentos - OnlyWave

Este documento descreve o dashboard de monitoramento de pagamentos da OnlyWave, que fornece visibilidade em tempo real sobre o sistema de pagamentos.

## Visão Geral

O dashboard foi projetado para fornecer uma visão abrangente do sistema de pagamentos, incluindo métricas operacionais e estratégicas. Ele é atualizado a cada 5 segundos e mantém um histórico de 6 horas de dados.

## Painéis

### 1. Taxa de Pagamentos
- **Descrição**: Monitora a taxa de sucesso e falha dos pagamentos
- **Métrica**: `payment_total`
- **Atualização**: 5 segundos
- **Visualização**: Gráfico de linha com duas séries (sucesso/falha)

### 2. Duração do Processamento (P95)
- **Descrição**: Mostra o percentil 95 da duração do processamento
- **Métrica**: `payment_processing_duration_seconds`
- **Atualização**: 5 segundos
- **Visualização**: Gráfico de linha

### 3. Tamanho da Fila de Webhooks
- **Descrição**: Monitora o tamanho atual da fila de webhooks
- **Métrica**: `webhook_queue_size`
- **Atualização**: 5 segundos
- **Visualização**: Gráfico de linha

### 4. Taxa de Erros
- **Descrição**: Monitora erros de cache e falhas na publicação de eventos
- **Métricas**: 
  - `cache_errors_total`
  - `event_publish_failures_total`
- **Atualização**: 5 segundos
- **Visualização**: Gráfico de barras empilhadas

### 5. Distribuição de Status dos Pagamentos
- **Descrição**: Mostra a proporção de status dos pagamentos
- **Métrica**: `payment_total` com filtro por status
- **Atualização**: 5 segundos
- **Visualização**: Gráfico de pizza com porcentagens

### 6. Latência por Endpoint
- **Descrição**: Identifica endpoints lentos
- **Métrica**: `http_request_duration_seconds`
- **Atualização**: 5 segundos
- **Visualização**: Heatmap com escala de cores RdYlBu

### 7. Erros por Origem
- **Descrição**: Análise de fontes de erro
- **Métrica**: `payment_errors_total` com label `source`
- **Atualização**: 5 minutos
- **Visualização**: Barras empilhadas

### 8. Média de Tentativas de Reprocessamento
- **Descrição**: Monitora a eficácia das tentativas de reprocessamento
- **Métrica**: `webhook_retry_attempts`
- **Atualização**: Tempo real
- **Visualização**: Gauge com alerta visual

### 9. Alertas Ativos
- **Descrição**: Lista alertas ativos do Prometheus
- **Métrica**: `ALERTS`
- **Atualização**: 5 segundos
- **Visualização**: Tabela com severidade

## Variáveis de Template

- **env**: Filtro por ambiente (dev/staging/prod)
- **payment_type**: Filtro por tipo de pagamento
- **status**: Filtro por status do pagamento

## Anotações

O dashboard inclui anotações automáticas para:
- Incidentes reportados
- Falhas de pagamento
- Deployments

## Backup e Restauração

Utilize o script `scripts/dashboard-backup.sh` para:
- Fazer backup do dashboard: `./dashboard-backup.sh backup`
- Restaurar o dashboard: `./dashboard-backup.sh restore [arquivo]`
- Listar backups disponíveis: `./dashboard-backup.sh list`

## Comparação Temporal

O dashboard inclui comparações semanais para métricas críticas:
- Taxa de sucesso de pagamentos
- Latência média
- Taxa de erros

## Manutenção

### Atualização de Métricas
Para adicionar novas métricas:
1. Atualize o arquivo de configuração do Prometheus
2. Adicione o novo painel ao dashboard
3. Atualize este documento

### Troubleshooting
- Verifique as anotações para correlacionar problemas com eventos
- Use o painel de alertas ativos para identificar problemas em tempo real
- Consulte os logs do sistema para detalhes adicionais

## Contato

Para suporte ou dúvidas sobre o dashboard, entre em contato com a equipe de DevOps da OnlyWave. 