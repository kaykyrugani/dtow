# Fluxo de Pagamento - OnlyWave

## Diagrama de Fluxo Principal

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant MP as Mercado Pago
    participant DB as Database
    participant Queue as Webhook Queue

    Cliente->>API: POST /payment/preference
    API->>MP: Criar preferência
    MP-->>API: Retorna preferenceId
    API->>DB: Salva preferência
    API-->>Cliente: Retorna preferenceId

    Cliente->>MP: Redireciona para checkout
    MP-->>Cliente: Retorna após pagamento
    MP->>API: Webhook payment.updated
    API->>Queue: Envia para processamento
    Queue->>API: Processa webhook
    API->>DB: Atualiza status
    API->>MP: Confirma recebimento
```

## Fluxo de Reembolso

```mermaid
sequenceDiagram
    participant Admin
    participant API
    participant MP as Mercado Pago
    participant DB as Database

    Admin->>API: POST /payment/refund/:id
    API->>DB: Verifica status
    API->>MP: Solicita reembolso
    MP-->>API: Confirma reembolso
    API->>DB: Atualiza status
    API-->>Admin: Retorna resultado
```

## Estados do Pagamento

```mermaid
stateDiagram-v2
    [*] --> PENDING: Criado
    PENDING --> APPROVED: Pagamento aprovado
    PENDING --> REJECTED: Pagamento rejeitado
    PENDING --> CANCELLED: Cancelado
    APPROVED --> REFUNDED: Reembolsado
    REJECTED --> [*]
    CANCELLED --> [*]
    REFUNDED --> [*]
```

## Mecanismo de Retry

```mermaid
flowchart TD
    A[Recebe Webhook] --> B{Tentativa 1}
    B -->|Sucesso| C[Processa]
    B -->|Falha| D[Log WARN]
    D --> E[Aguarda 1s]
    E --> F{Tentativa 2}
    F -->|Sucesso| C
    F -->|Falha| G[Log WARN]
    G --> H[Aguarda 2s]
    H --> I{Tentativa 3}
    I -->|Sucesso| C
    I -->|Falha| J[Log ERROR]
    J --> K[Notifica Time]
    K --> L[Lança Erro]
```

## Logs e Métricas

```mermaid
flowchart LR
    A[Evento] --> B{Log Level}
    B -->|INFO| C[Logs de Sucesso]
    B -->|WARN| D[Logs de Retry]
    B -->|ERROR| E[Logs de Falha]
    C --> F[Métricas]
    D --> F
    E --> F
    F --> G[Monitoramento]
```

## 1. Criação de Preferência de Pagamento

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant MercadoPago
    participant Banco

    Cliente->>API: POST /payment/preference
    Note over API: Valida dados do pedido
    API->>MercadoPago: Cria preferência
    MercadoPago-->>API: Retorna init_point
    API-->>Cliente: Retorna URL de checkout
```

## 2. Processo de Pagamento

```mermaid
sequenceDiagram
    participant Cliente
    participant MercadoPago
    participant API
    participant Banco

    Cliente->>MercadoPago: Acessa init_point
    MercadoPago->>Cliente: Exibe checkout
    Cliente->>MercadoPago: Escolhe método
    MercadoPago->>Banco: Processa pagamento
    Banco-->>MercadoPago: Confirma pagamento
    MercadoPago-->>Cliente: Redireciona para sucesso/falha
    MercadoPago->>API: Envia webhook
    API->>API: Atualiza status do pedido
```

## 3. Webhook e Atualização de Status

```mermaid
sequenceDiagram
    participant MercadoPago
    participant API
    participant DB

    MercadoPago->>API: POST /payment/webhook
    Note over API: Valida assinatura
    API->>API: Processa status
    alt Status: Aprovado
        API->>DB: Atualiza para PAID
    else Status: Pendente
        API->>DB: Atualiza para PENDING
    else Status: Rejeitado
        API->>DB: Atualiza para CANCELLED
    end
    API-->>MercadoPago: 200 OK
```

## 4. Processo de Reembolso

```mermaid
sequenceDiagram
    participant Admin
    participant API
    participant MercadoPago
    participant Banco

    Admin->>API: POST /payment/refund/:paymentId
    Note over API: Valida permissões
    API->>MercadoPago: Solicita reembolso
    MercadoPago->>Banco: Processa reembolso
    Banco-->>MercadoPago: Confirma reembolso
    MercadoPago-->>API: Retorna status
    API->>API: Atualiza status do pedido
    API-->>Admin: Retorna resultado
```

## Estados do Pagamento

| Status Mercado Pago | Status OnlyWave | Descrição |
|---------------------|-----------------|-----------|
| approved | PAID | Pagamento aprovado |
| pending | PENDING | Pagamento em análise |
| rejected | CANCELLED | Pagamento rejeitado |
| cancelled | CANCELLED | Pagamento cancelado |
| refunded | CANCELLED | Pagamento reembolsado |

## Métodos de Pagamento

1. **Cartão de Crédito**
   - Parcelamento em até 12x
   - Desconto em boleto
   - Validação 3D Secure

2. **PIX**
   - Desconto de 5%
   - QR Code dinâmico
   - Expira em 30 minutos

3. **Boleto Bancário**
   - Vencimento em 3 dias
   - Desconto de 2%
   - Código de barras e linha digitável

## Tratamento de Erros

1. **Erros de Validação (400)**
   - Dados inválidos
   - Valores incorretos
   - CPF inválido

2. **Erros de Autenticação (401)**
   - Token inválido
   - Token expirado
   - Permissões insuficientes

3. **Erros de Negócio (404)**
   - Pedido não encontrado
   - Pagamento não encontrado
   - Preferência não encontrada

4. **Erros de Serviço (500)**
   - Falha na API do Mercado Pago
   - Timeout
   - Erro interno

## Segurança

1. **Validação de Webhook**
   - Verificação de assinatura
   - Validação de origem
   - Rate limiting

2. **Proteção de Dados**
   - Dados sensíveis não são logados
   - Tokens em variáveis de ambiente
   - Criptografia em trânsito

3. **Controle de Acesso**
   - Autenticação JWT
   - Roles por endpoint
   - Validação de permissões 

# Diagrama de Fluxo - Módulo de Pagamento

## Fluxo Principal de Pagamento

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant MP as Mercado Pago
    participant DB as Database
    participant Queue as Webhook Queue

    Cliente->>API: POST /payment/preference
    API->>MP: Criar preferência
    MP-->>API: Retorna preferenceId
    API->>DB: Salva referência
    API-->>Cliente: Retorna initPoint
    Cliente->>MP: Redireciona para checkout
    MP-->>Cliente: Processa pagamento
    MP->>API: Notifica via webhook
    API->>Queue: Adiciona à fila
    Queue->>API: Processa webhook
    API->>MP: Consulta status
    API->>DB: Atualiza status
    API->>Queue: Confirma processamento
```

## Fluxo de Reembolso

```mermaid
sequenceDiagram
    participant Admin
    participant API
    participant MP as Mercado Pago
    participant DB as Database

    Admin->>API: POST /payment/refund/:id
    API->>DB: Verifica status
    API->>MP: Solicita reembolso
    MP-->>API: Confirma reembolso
    API->>DB: Atualiza status
    API-->>Admin: Retorna resultado
```

## Estados do Pagamento

```mermaid
stateDiagram-v2
    [*] --> PENDING: Criado
    PENDING --> APPROVED: Aprovado
    PENDING --> REJECTED: Rejeitado
    PENDING --> CANCELLED: Cancelado
    APPROVED --> REFUNDED: Reembolsado
    REJECTED --> [*]
    CANCELLED --> [*]
    REFUNDED --> [*]
```

## Mecanismo de Retry

```mermaid
flowchart TD
    A[Recebe Webhook] --> B{Processa}
    B -->|Sucesso| C[Atualiza Status]
    B -->|Falha| D{Tentativas < 3?}
    D -->|Sim| E[Aguarda Backoff]
    E --> B
    D -->|Não| F[Notifica Erro]
    C --> G[Fim]
    F --> G
```

## Logs e Métricas

```mermaid
flowchart LR
    A[Evento] --> B{Log Level}
    B -->|INFO| C[Operação Sucesso]
    B -->|WARN| D[Retry Necessário]
    B -->|ERROR| E[Falha Crítica]
    C --> F[Métricas]
    D --> F
    E --> F
    F --> G[Monitoramento]
``` 