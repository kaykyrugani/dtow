# Fluxo de Pagamento

Este diagrama ilustra o fluxo completo de pagamento no sistema OnlyWave, desde a criação da preferência até o processamento do webhook.

```mermaid
sequenceDiagram
    participant Cliente
    participant API as API OnlyWave
    participant MP as Mercado Pago
    participant DB as Banco de Dados

    Cliente->>API: Solicita criação de preferência
    API->>DB: Verifica pedido
    API->>MP: Cria preferência de pagamento
    MP-->>API: Retorna ID e init_point
    API->>DB: Atualiza pedido com ID da preferência
    API-->>Cliente: Retorna dados da preferência

    Cliente->>MP: Redireciona para checkout
    MP-->>Cliente: Retorna após pagamento

    MP->>API: Envia webhook de notificação
    API->>DB: Verifica idempotência
    API->>MP: Consulta detalhes do pagamento
    API->>DB: Salva histórico de pagamento
    API->>DB: Atualiza status do pedido
    API->>DB: Registra log de auditoria
    API-->>MP: Confirma recebimento (200 OK)

    Note over API,DB: Em caso de falha, o sistema tenta novamente até 3 vezes
```

## Fluxo de Reembolso

```mermaid
sequenceDiagram
    participant Admin
    participant API as API OnlyWave
    participant MP as Mercado Pago
    participant DB as Banco de Dados

    Admin->>API: Solicita reembolso
    API->>DB: Verifica pagamento
    API->>MP: Solicita reembolso
    MP-->>API: Confirma reembolso
    API->>DB: Atualiza status do pedido
    API->>DB: Registra log de auditoria
    API-->>Admin: Confirma reembolso

    Note over API,DB: Em caso de falha, o sistema tenta novamente até 3 vezes
```

## Fluxo de Webhook

```mermaid
sequenceDiagram
    participant MP as Mercado Pago
    participant API as API OnlyWave
    participant DB as Banco de Dados
    participant Audit as Auditoria

    MP->>API: Envia webhook
    API->>Audit: Registra recebimento
    API->>DB: Verifica idempotência
    
    alt Webhook já processado
        API-->>MP: Retorna 200 OK (ignora)
    else Webhook novo
        API->>MP: Consulta detalhes do pagamento
        API->>DB: Salva histórico de pagamento
        API->>DB: Atualiza status do pedido
        API->>Audit: Registra processamento
        API-->>MP: Retorna 200 OK
    end

    Note over API,DB: Sistema implementa retry mechanism para falhas temporárias
``` 