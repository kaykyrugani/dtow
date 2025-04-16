# Documentação Técnica - Módulo de Pagamento

## Visão Geral

O módulo de pagamento é responsável por integrar a aplicação com o Mercado Pago, gerenciando todo o ciclo de vida dos pagamentos, desde a criação da preferência até o processamento de reembolsos.

## Arquitetura

### Componentes Principais

- **PaymentService**: Serviço principal que encapsula toda a lógica de negócio
- **PaymentController**: Controlador REST que expõe os endpoints da API
- **PaymentDTO**: DTOs para validação e tipagem dos dados
- **WebhookQueue**: Fila para processamento assíncrono de webhooks

### Dependências

- Mercado Pago SDK
- Prisma Client
- Bull Queue
- Winston Logger

## Endpoints

### POST /payment/preference

Cria uma nova preferência de pagamento no Mercado Pago.

#### Request Body
```typescript
{
  pedidoId: string;
  descricao: string;
  valor: number;
  formaPagamento: PaymentType;
  comprador: {
    nome: string;
    email: string;
    cpf: string;
  }
}
```

#### Response
```typescript
{
  preferenceId: string;
  initPoint: string;
}
```

### POST /payment/webhook

Endpoint para receber notificações do Mercado Pago.

#### Request Body
```typescript
{
  action: string;
  data: {
    id: string;
  }
}
```

### POST /payment/refund/:id

Solicita reembolso de um pagamento.

#### Path Parameters
- id: string (ID do pagamento)

#### Request Body
```typescript
{
  amount?: number; // Opcional, para reembolso parcial
}
```

## Fluxo de Dados

1. Cliente solicita criação de preferência
2. Sistema cria preferência no MP e salva referência
3. Cliente é redirecionado para checkout
4. MP notifica via webhook após pagamento
5. Sistema processa webhook e atualiza status
6. Admin pode solicitar reembolso quando necessário

## Tratamento de Erros

### Códigos de Erro

| Código | Descrição | Ação Recomendada |
|--------|-----------|------------------|
| 400 | Dados inválidos | Verificar payload |
| 401 | Token inválido | Verificar credenciais |
| 404 | Pagamento não encontrado | Verificar ID |
| 500 | Erro interno | Verificar logs |

### Retry Mechanism

- Máximo de 3 tentativas
- Backoff exponencial (1s, 2s, 4s)
- Logs específicos para cada tentativa
- Notificação em caso de falha definitiva

## Logs e Métricas

### Logs

- INFO: Operações bem sucedidas
- WARN: Tentativas de retry
- ERROR: Falhas críticas

### Métricas

- Taxa de sucesso de pagamentos
- Tempo médio de processamento
- Taxa de reembolso
- Erros por tipo

## Configuração

### Variáveis de Ambiente

```env
MP_ACCESS_TOKEN=TEST-xxx
MP_PUBLIC_KEY=TEST-xxx
WEBHOOK_SECRET=xxx
```

### Configurações do Queue

```typescript
{
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000
  }
}
```

## Segurança

- Validação de assinatura do webhook
- Sanitização de dados sensíveis nos logs
- Rate limiting nos endpoints
- Validação de tokens e credenciais

## Troubleshooting

### Problemas Comuns

1. Webhook não recebido
   - Verificar logs do MP
   - Confirmar URL configurada
   - Testar com ngrok

2. Pagamento não processado
   - Verificar status no MP
   - Confirmar dados do pedido
   - Checar logs de retry

3. Reembolso falha
   - Verificar status do pagamento
   - Confirmar valor disponível
   - Checar permissões

### Comandos Úteis

```bash
# Verificar logs
tail -f payment.log | grep ERROR

# Testar webhook
curl -X POST http://localhost:3000/payment/webhook -d '{"action":"payment.updated","data":{"id":"123"}}'

# Verificar métricas
curl http://localhost:3000/metrics
```

## Próximos Passos

1. Implementar testes de integração
2. Adicionar mais métricas
3. Melhorar documentação Swagger
4. Implementar dashboard de monitoramento 