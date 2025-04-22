# 📚 Documentação da API - OnlyWave

## 🔑 Autenticação

Todas as requisições devem incluir um token JWT no header `Authorization`:

```
Authorization: Bearer <token>
```

## 📝 Endpoints

### Pagamentos

#### POST /payments

Cria um novo pagamento.

**Request:**
```json
{
  "amount": 1000,
  "currency": "BRL",
  "description": "Pagamento de teste",
  "paymentMethod": "credit_card",
  "card": {
    "number": "4111111111111111",
    "expirationMonth": 12,
    "expirationYear": 2025,
    "securityCode": "123",
    "holder": {
      "name": "John Doe",
      "identification": {
        "type": "CPF",
        "number": "12345678900"
      }
    }
  }
}
```

**Response:**
```json
{
  "id": "string",
  "status": "pending",
  "amount": 1000,
  "currency": "BRL",
  "createdAt": "2024-04-17T12:00:00Z",
  "updatedAt": "2024-04-17T12:00:00Z"
}
```

#### GET /payments/:id

Obtém detalhes de um pagamento.

**Response:**
```json
{
  "id": "string",
  "status": "approved",
  "amount": 1000,
  "currency": "BRL",
  "description": "Pagamento de teste",
  "paymentMethod": "credit_card",
  "createdAt": "2024-04-17T12:00:00Z",
  "updatedAt": "2024-04-17T12:00:00Z"
}
```

#### POST /payments/:id/refund

Solicita reembolso de um pagamento.

**Request:**
```json
{
  "amount": 1000,
  "reason": "Solicitação do cliente"
}
```

**Response:**
```json
{
  "id": "string",
  "status": "refunded",
  "amount": 1000,
  "currency": "BRL",
  "refundedAt": "2024-04-17T12:00:00Z"
}
```

### Webhooks

#### POST /webhooks

Endpoint para receber notificações do Mercado Pago.

**Request:**
```json
{
  "action": "payment.created",
  "data": {
    "id": "string",
    "amount": 1000,
    "external_reference": "string"
  },
  "paymentType": "string",
  "timestamp": 1618656000,
  "status": "pending"
}
```

**Response:**
```json
{
  "status": "ok"
}
```

## 📊 Métricas

O serviço expõe métricas no formato Prometheus em `/metrics`. As principais métricas são:

### Pagamentos
- `payment_processed_total`: Total de pagamentos processados
- `payment_amount`: Valor dos pagamentos em centavos
- `payment_processing_duration_seconds`: Duração do processamento de pagamentos
- `payment_failures_total`: Total de falhas no processamento de pagamentos
- `payment_refunds_total`: Total de reembolsos processados

### Cache
- `payment_cache_hits_total`: Total de hits no cache
- `payment_cache_misses_total`: Total de misses no cache
- `payment_cache_errors_total`: Total de erros no cache

### Webhooks
- `webhook_queue_size`: Tamanho atual da fila de webhooks
- `webhook_errors_total`: Total de erros no processamento de webhooks

### Eventos
- `payment_events_published_total`: Total de eventos de pagamento publicados
- `payment_event_errors_total`: Total de erros na publicação de eventos

## 🔍 Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Acesso negado |
| 404 | Recurso não encontrado |
| 422 | Erro de validação |
| 429 | Muitas requisições |
| 500 | Erro interno do servidor |

## 📝 Exemplos

### Criar um pagamento com cartão de crédito

```bash
curl -X POST http://localhost:3333/payments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "BRL",
    "description": "Pagamento de teste",
    "paymentMethod": "credit_card",
    "card": {
      "number": "4111111111111111",
      "expirationMonth": 12,
      "expirationYear": 2025,
      "securityCode": "123",
      "holder": {
        "name": "John Doe",
        "identification": {
          "type": "CPF",
          "number": "12345678900"
        }
      }
    }
  }'
```

### Solicitar reembolso

```bash
curl -X POST http://localhost:3333/payments/123/refund \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "reason": "Solicitação do cliente"
  }'
``` 