# Integrações Externas do OnlyWave

Este diagrama ilustra todas as integrações externas do sistema OnlyWave, incluindo serviços de pagamento, armazenamento, comunicação e monitoramento.

## Visão Geral das Integrações

```mermaid
graph TD
    subgraph Cliente
        Web[Web App]
        Mobile[Mobile App]
    end

    subgraph API[API OnlyWave]
        Auth[Autenticação]
        Payment[Pagamentos]
        Storage[Armazenamento]
        Email[Email Service]
    end

    subgraph Pagamentos
        MP[Mercado Pago]
        MP_API[API REST]
        MP_Webhook[Webhooks]
        MP_Refund[Reembolsos]
    end

    subgraph Armazenamento
        S3[AWS S3]
        CDN[CloudFront]
        ACL[ACLs]
    end

    subgraph Comunicação
        SMTP[SMTP Server]
        SendGrid[SendGrid API]
        Templates[Templates]
    end

    subgraph Monitoramento
        Sentry[Sentry]
        Prom[Prometheus]
        Graf[Grafana]
        Status[StatusCake]
    end

    Web --> API
    Mobile --> API
    
    API --> MP
    MP --> MP_API
    MP --> MP_Webhook
    MP --> MP_Refund
    
    API --> S3
    S3 --> CDN
    S3 --> ACL
    
    API --> SMTP
    API --> SendGrid
    SMTP --> Templates
    SendGrid --> Templates
    
    API --> Sentry
    API --> Prom
    Prom --> Graf
    API --> Status
```

## Fluxo de Integração com Mercado Pago

```mermaid
sequenceDiagram
    participant User as Usuário
    participant API as API OnlyWave
    participant MP as Mercado Pago
    participant DB as Database

    User->>API: Solicita pagamento
    API->>MP: Cria preferência
    MP-->>API: Retorna init_point
    API->>DB: Salva preferência
    API-->>User: Retorna dados

    User->>MP: Completa pagamento
    MP->>API: Webhook
    API->>API: Valida assinatura
    API->>DB: Atualiza status
    API-->>MP: Confirma recebimento
```

## Fluxo de Armazenamento com S3

```mermaid
sequenceDiagram
    participant User as Usuário
    participant API as API OnlyWave
    participant S3 as AWS S3
    participant CDN as CloudFront

    User->>API: Upload arquivo
    API->>API: Valida arquivo
    API->>S3: Upload
    S3-->>API: URL do arquivo
    API->>CDN: Configura cache
    API-->>User: Retorna URL CDN
```

## Fluxo de Email

```mermaid
sequenceDiagram
    participant API as API OnlyWave
    participant Email as Email Service
    participant Template as Templates
    participant User as Usuário

    API->>Template: Seleciona template
    Template-->>API: Template renderizado
    API->>Email: Envia email
    Email-->>User: Entrega email
```

## Componentes das Integrações

### Mercado Pago
- **API REST**: Endpoints para pagamentos
- **Webhooks**: Notificações de status
- **Reembolsos**: Processamento de reembolsos
- **Autenticação**: Bearer Token

### AWS S3
- **Upload**: Armazenamento de arquivos
- **CDN**: Distribuição de conteúdo
- **ACLs**: Controle de acesso
- **URLs Assinadas**: Acesso temporário

### Email Service
- **SMTP**: Servidor de email
- **SendGrid**: API de email
- **Templates**: Templates de email
- **Tracking**: Rastreamento de envios

### Monitoramento
- **Sentry**: Captura de erros
- **Prometheus**: Métricas
- **Grafana**: Dashboards
- **StatusCake**: Healthchecks 