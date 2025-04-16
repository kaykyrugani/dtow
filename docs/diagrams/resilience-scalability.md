# Arquitetura de Resiliência e Escalabilidade do OnlyWave

Este diagrama ilustra como o sistema OnlyWave lida com falhas, escala e mantém alta disponibilidade.

## Visão Geral da Arquitetura Resiliente

```mermaid
graph TD
    subgraph Cliente
        Web[Web App]
        Mobile[Mobile App]
    end

    subgraph Load Balancer
        LB[NGINX LB]
        Health[Health Check]
    end

    subgraph API Cluster
        API1[API Instance 1]
        API2[API Instance 2]
        API3[API Instance N]
    end

    subgraph Cache
        Redis1[Redis Primary]
        Redis2[Redis Replica]
    end

    subgraph Message Queue
        MQ[RabbitMQ]
        DLQ[Dead Letter Queue]
    end

    subgraph Database
        DB1[(PostgreSQL Primary)]
        DB2[(PostgreSQL Replica)]
    end

    subgraph External Services
        MP[Mercado Pago]
        Email[Email Service]
    end

    Web --> LB
    Mobile --> LB
    LB --> Health
    Health --> API1
    Health --> API2
    Health --> API3

    API1 --> Redis1
    API2 --> Redis1
    API3 --> Redis1
    Redis1 --> Redis2

    API1 --> MQ
    API2 --> MQ
    API3 --> MQ
    MQ --> DLQ

    API1 --> DB1
    API2 --> DB1
    API3 --> DB1
    DB1 --> DB2

    API1 --> MP
    API2 --> MP
    API3 --> MP
```

## Fluxo de Webhook com Retry

```mermaid
sequenceDiagram
    participant MP as Mercado Pago
    participant API as API OnlyWave
    participant Queue as RabbitMQ
    participant DLQ as Dead Letter Queue
    participant DB as Database

    MP->>API: Webhook
    API->>API: Validate Signature
    API->>Queue: Add to Queue
    Queue->>API: Process Webhook
    API->>DB: Update Payment

    alt Sucesso
        API-->>MP: 200 OK
    else Falha Temporária
        API->>Queue: Retry (max 3x)
        Queue->>API: Process Again
        API-->>MP: 200 OK
    else Falha Permanente
        API->>DLQ: Move to DLQ
        API-->>MP: 200 OK
    end
```

## Circuit Breaker para Serviços Externos

```mermaid
stateDiagram-v2
    [*] --> Closed: Inicial
    Closed --> Open: Falhas > Threshold
    Open --> HalfOpen: Timeout
    HalfOpen --> Closed: Sucesso
    HalfOpen --> Open: Falha
    Open --> [*]: Fallback
```

## Estratégia de Escalabilidade

```mermaid
graph TD
    subgraph Auto Scaling
        AS[Auto Scaling Group]
        Min[Min Instances]
        Max[Max Instances]
        Target[Target CPU/Memory]
    end

    subgraph Load Distribution
        LB[Load Balancer]
        Health[Health Checks]
        Sticky[Sticky Sessions]
    end

    subgraph Resource Management
        CPU[CPU Limits]
        Mem[Memory Limits]
        Net[Network Limits]
    end

    AS --> Min
    AS --> Max
    AS --> Target
    LB --> Health
    LB --> Sticky
    CPU --> AS
    Mem --> AS
    Net --> AS
```

## Componentes da Resiliência

### Retry e Backoff
- **Webhook Processing**: Retry com backoff exponencial
- **API Calls**: Circuit breaker com fallback
- **Queue Processing**: Dead letter queue para falhas

### Cache e Performance
- **Redis Cluster**: Cache distribuído
- **Session Storage**: Dados de sessão
- **Rate Limiting**: Proteção contra abusos

### Banco de Dados
- **Primary/Replica**: Alta disponibilidade
- **Connection Pool**: Gerenciamento de conexões
- **Query Optimization**: Índices e cache

### Monitoramento
- **Health Checks**: Verificação de saúde
- **Metrics**: Métricas de resiliência
- **Alerts**: Alertas de falhas 