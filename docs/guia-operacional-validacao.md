# Guia Operacional de Validação

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Testes de Resiliência](#testes-de-resiliência)
4. [Monitoramento](#monitoramento)
5. [Alertas](#alertas)
6. [Checklist de Resiliência](#checklist-de-resiliência)
7. [Métricas e Thresholds](#métricas-e-thresholds)
8. [Procedimentos de Emergência](#procedimentos-de-emergência)

## Visão Geral

O serviço de validação é responsável por validar documentos (CPF/CNPJ), emails e realizar verificações de blacklist. O sistema foi projetado com foco em resiliência, observabilidade e alta disponibilidade.

### Componentes Principais

- `ValidationService`: Serviço principal de validação
- `BlacklistService`: Gerenciamento de blacklist
- `RedisService`: Cache e pub/sub
- `MetricsService`: Coleta de métricas
- `LoggerService`: Logging estruturado

## Arquitetura

### Fluxo de Validação

1. Recebimento da requisição
2. Validação do documento/email
3. Verificação de blacklist
4. Cache de resultados
5. Publicação de eventos
6. Coleta de métricas

### Dependências

- Redis para cache e pub/sub
- Prometheus para métricas
- Grafana para visualização
- Slack para alertas

## Testes de Resiliência

### Execução dos Testes

```bash
# Testes unitários
npm run test

# Testes de resiliência
npm run test:resilience

# Testes de carga
npm run test:load
```

### Tipos de Testes

1. **Validação de Documentos**
   - CPF válido/inválido
   - CNPJ válido/inválido
   - Formatação incorreta
   - Blacklist

2. **Validação de Email**
   - Email válido/inválido
   - Domínios temporários
   - Formatação incorreta
   - Blacklist

3. **Testes de Resiliência**
   - Timeouts
   - Falhas aleatórias
   - Falhas de logging
   - Retries
   - Degradação

## Monitoramento

### Endpoints

- `/metrics`: Métricas Prometheus
- `/health`: Healthcheck
- `/ready`: Readiness check

### Métricas Principais

1. **Validação**
   - `validation_total`
   - `validation_errors_total`
   - `validation_duration_seconds`

2. **Blacklist**
   - `blacklist_checks_total`
   - `blacklist_hits_total`
   - `blacklist_errors_total`

3. **Cache**
   - `cache_hits_total`
   - `cache_misses_total`
   - `cache_errors_total`

4. **Resiliência**
   - `resilience_validation_errors_total`
   - `resilience_blacklist_errors_total`
   - `resilience_redis_errors_total`
   - `resilience_load_test_duration_seconds`

## Alertas

### Configuração do AlertManager

```yaml
groups:
  - name: validation
    rules:
      - alert: HighErrorRate
        expr: rate(validation_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Alta taxa de erros de validação"
          description: "Taxa de erros acima de 10% nos últimos 5 minutos"

      - alert: BlacklistErrors
        expr: rate(blacklist_errors_total[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Erros na blacklist"
          description: "Taxa de erros na blacklist acima de 5% nos últimos 5 minutos"

      - alert: RedisErrors
        expr: rate(redis_errors_total[5m]) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Erros no Redis"
          description: "Taxa de erros no Redis acima de 1% nos últimos 5 minutos"
```

## Checklist de Resiliência

### Pré-requisitos

- [ ] Redis configurado e acessível
- [ ] Prometheus coletando métricas
- [ ] Grafana configurado
- [ ] AlertManager configurado
- [ ] Slack webhook configurado

### Verificações Diárias

- [ ] Monitorar taxa de erros
- [ ] Verificar latência do Redis
- [ ] Checar tamanho da blacklist
- [ ] Validar alertas

### Verificações Semanais

- [ ] Executar testes de resiliência
- [ ] Verificar cobertura de testes
- [ ] Analisar métricas de performance
- [ ] Revisar logs de erro

## Métricas e Thresholds

### Thresholds Críticos

| Métrica | Threshold | Ação |
|---------|------------|------|
| Taxa de Erros | > 10% | Alertar equipe |
| Latência Redis | > 100ms | Investigar |
| Blacklist Errors | > 5% | Alertar equipe |
| Cache Miss Rate | > 20% | Otimizar cache |

### SLIs/SLOs

- **Disponibilidade**: 99.9%
- **Latência P95**: < 200ms
- **Taxa de Erro**: < 1%
- **Cache Hit Rate**: > 80%

## Procedimentos de Emergência

### Falha do Redis

1. Verificar conectividade
2. Checar métricas de erro
3. Validar configurações
4. Reiniciar se necessário
5. Escalar se persistir

### Blacklist Indisponível

1. Verificar serviço
2. Checar cache
3. Validar conexões
4. Reiniciar se necessário
5. Escalar se persistir

### Alta Taxa de Erros

1. Verificar logs
2. Analisar métricas
3. Identificar padrão
4. Aplicar correção
5. Monitorar recuperação

---

## 📞 Contatos de Emergência

- **Equipe de SRE**: sre@onlywave.com.br
- **DevOps**: devops@onlywave.com.br
- **Suporte**: suporte@onlywave.com.br

## 🔄 Atualizações do Guia

- **Última atualização**: 2024-03-19
- **Versão**: 1.0.0
- **Responsável**: Equipe de SRE 