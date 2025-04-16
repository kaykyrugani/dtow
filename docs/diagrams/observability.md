# Arquitetura de Observabilidade do OnlyWave

Este diagrama ilustra a arquitetura completa de observabilidade do sistema OnlyWave, incluindo coleta de logs, métricas, alertas e dashboards.

## Visão Geral da Observabilidade

```mermaid
graph TD
    subgraph Aplicação
        API[API OnlyWave]
        Winston[Winston Logger]
        Metrics[Metrics Service]
        Trace[Trace Service]
    end

    subgraph Coleta
        File[Log Files]
        ES[ElasticSearch]
        Prom[Prometheus]
        OT[OpenTelemetry]
    end

    subgraph Visualização
        Grafana[Grafana]
        Kibana[Kibana]
        Alert[Alert Manager]
    end

    subgraph Notificações
        Discord[Discord]
        Email[Email]
        Slack[Slack]
    end

    API --> Winston
    API --> Metrics
    API --> Trace

    Winston --> File
    Winston --> ES
    Metrics --> Prom
    Trace --> OT

    Prom --> Grafana
    ES --> Kibana
    OT --> Grafana

    Grafana --> Alert
    Alert --> Discord
    Alert --> Email
    Alert --> Slack
```

## Fluxo de Coleta de Logs

```mermaid
sequenceDiagram
    participant App as Aplicação
    participant Win as Winston
    participant ES as ElasticSearch
    participant Kib as Kibana

    App->>Win: Log Event
    Win->>Win: Formata Log
    Win->>ES: Envia Log
    ES->>ES: Indexa Log
    Kib->>ES: Consulta Logs
    Kib-->>App: Visualização
```

## Métricas do Sistema

```mermaid
graph LR
    subgraph Métricas de Pagamento
        PC[payment_created_total]
        PS[payment_success_total]
        PF[payment_failure_total]
        PD[payment_processing_duration_seconds]
    end

    subgraph Métricas de Webhook
        WR[webhook_received_total]
        WE[webhook_error_total]
        WRT[webhook_retry_total]
    end

    subgraph Métricas de Fila
        QP[queue_webhook_pending]
        QS[queue_webhook_success]
        QF[queue_webhook_failed]
    end

    subgraph Métricas do Sistema
        UT[uptime]
        HM[heap_memory]
        API[api_latency]
        ERR[error_rate]
    end
```

## Dashboards e Alertas

```mermaid
graph TD
    subgraph Dashboards
        DP[Dashboard de Pagamentos]
        DQ[Dashboard de Fila]
        DS[Dashboard de Sistema]
        DSec[Dashboard de Segurança]
    end

    subgraph Alertas
        A1[Webhook > 10% falha]
        A2[Reembolso com erro]
        A3[Latência > 2s]
        A4[Queda de pagamentos]
        A5[Fila inativa]
    end

    subgraph Canais
        C1[Discord]
        C2[Email]
        C3[Slack]
    end

    DP --> A1
    DQ --> A2
    DS --> A3
    DSec --> A4
    DQ --> A5

    A1 --> C1
    A2 --> C2
    A3 --> C3
    A4 --> C1
    A5 --> C2
```

## Estrutura de Logs

```mermaid
classDiagram
    class LogEntry {
        +String trace_id
        +String payment_id
        +String level
        +String message
        +Object metadata
        +DateTime timestamp
        +String service
        +String environment
    }

    class PaymentLog {
        +String status
        +Float amount
        +String payment_type
        +String external_reference
    }

    class WebhookLog {
        +String action
        +String payment_id
        +Boolean processed
        +Integer retry_count
    }

    LogEntry <|-- PaymentLog
    LogEntry <|-- WebhookLog
```

## Componentes da Observabilidade

### Logging
- **Winston**: Logger estruturado
- **ElasticSearch**: Armazenamento e busca
- **Kibana**: Visualização de logs
- **Log Rotation**: Gerenciamento de arquivos

### Métricas
- **Prometheus**: Coleta de métricas
- **Grafana**: Visualização e alertas
- **Custom Metrics**: Métricas específicas de negócio
- **System Metrics**: Métricas de infraestrutura

### Rastreabilidade
- **Trace ID**: Identificador único por requisição
- **Payment ID**: Rastreamento de pagamentos
- **Correlation ID**: Correlação entre serviços
- **Span ID**: Rastreamento de operações

### Alertas
- **Thresholds**: Limites para alertas
- **Severity**: Níveis de severidade
- **Channels**: Canais de notificação
- **Escalation**: Escalação de alertas 