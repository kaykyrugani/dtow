# Exemplos de Payloads de Teste - Módulo de Pagamentos

## 1. Criar Preferência de Pagamento

### Request
```http
POST /payment/preference
Content-Type: application/json

{
  "pedidoId": "123456",
  "descricao": "Pedido #123456 - OnlyWave",
  "valor": 299.90,
  "formaPagamento": "CREDIT_CARD",
  "comprador": {
    "nome": "João da Silva",
    "email": "joao.silva@email.com",
    "cpf": "123.456.789-00"
  },
  "parcelas": 3
}
```

### Response
```json
{
  "id": "1234567890",
  "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=1234567890",
  "valorOriginal": 299.90,
  "valorFinal": 299.90,
  "desconto": 0
}
```

## 2. Webhook de Pagamento

### Request
```http
POST /payment/webhook
Content-Type: application/json
X-Hub-Signature: sha256=1234567890abcdef...

{
  "action": "payment.created",
  "data": {
    "id": "1234567890"
  }
}
```

### Response
```json
{
  "status": "success",
  "message": "Webhook processado com sucesso"
}
```

## 3. Reembolso de Pagamento

### Request
```http
POST /payment/refund/1234567890
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "amount": 299.90
}
```

### Response
```json
{
  "status": "refunded",
  "amount": 299.90,
  "paymentId": "1234567890"
}
```

## Notas de Teste

1. **Ambiente de Teste**
   - Use o ambiente sandbox do Mercado Pago
   - Configure as variáveis de ambiente:
     ```
     MERCADO_PAGO_ACCESS_TOKEN=TEST-1234567890
     MERCADO_PAGO_WEBHOOK_SECRET=your_webhook_secret
     ```

2. **Cartões de Teste**
   - Mastercard: 5031 4332 1540 6351
   - Visa: 4235 6477 2802 5682
   - American Express: 3753 651535 56885

3. **Status de Pagamento**
   - approved: Pagamento aprovado
   - pending: Pagamento pendente
   - rejected: Pagamento rejeitado
   - cancelled: Pagamento cancelado
   - refunded: Pagamento reembolsado

4. **Validações**
   - Todos os valores devem ser positivos
   - CPF deve ser válido
   - Email deve ser válido
   - Número de parcelas entre 1 e 12

5. **Rate Limits**
   - Preference: 100 req/15min
   - Webhook: 200 req/15min
   - Refund: 50 req/15min 