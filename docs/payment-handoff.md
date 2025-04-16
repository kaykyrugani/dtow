# 📦 Pacote de Entrega - Módulo de Pagamento OnlyWave

## 📋 Checklist de Verificação Final

### 1. Segurança
- [ ] Verificar logs por dados sensíveis expostos
- [ ] Confirmar que tokens e `external_reference` não são logados
- [ ] Validar implementação da assinatura do webhook (X-Hub-Signature)
- [ ] Confirmar que apenas admins acessam endpoint de reembolso
- [ ] Verificar rate limiting nos endpoints
- [ ] Validar sanitização de inputs

### 2. Ambiente de Produção
- [ ] Configurar variáveis de ambiente:
  ```env
  MERCADO_PAGO_ACCESS_TOKEN=TEST-xxxx-xxxx-xxxx-xxxx
  MERCADO_PAGO_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx
  MERCADO_PAGO_WEBHOOK_SECRET=xxxx
  ```
- [ ] Configurar URLs de webhook no painel do Mercado Pago
- [ ] Validar certificados SSL
- [ ] Configurar domínios permitidos para CORS

### 3. Monitoramento
- [ ] Configurar alertas Prometheus:
  - Taxa de sucesso de pagamentos
  - Tempo de resposta da API
  - Erros de webhook
  - Falhas de reembolso
- [ ] Configurar logs estruturados:
  - Nível INFO para operações normais
  - Nível ERROR para falhas
  - Nível DEBUG para troubleshooting
- [ ] Configurar dashboards:
  - Métricas de pagamento
  - Status dos webhooks
  - Performance da API

### 4. Backup e Recuperação
- [ ] Configurar backup automático do banco
- [ ] Documentar processo de rollback
- [ ] Criar plano de recuperação de desastres
- [ ] Testar restauração de backup

## 🔧 Guia de Manutenção

### Estrutura do Módulo
```
src/modules/payment/
├── controllers/
│   └── payment.controller.ts
├── services/
│   └── payment.service.ts
├── dtos/
│   └── payment.dto.ts
├── routes/
│   └── payment.routes.ts
└── __tests__/
    ├── payment.service.test.ts
    └── webhook.integration.test.ts
```

### Endpoints Principais

1. **Criar Preferência**
   ```http
   POST /payment/preference
   Content-Type: application/json
   
   {
     "pedidoId": "string",
     "descricao": "string",
     "valor": number,
     "formaPagamento": "credit_card" | "pix" | "bolbradesco",
     "comprador": {
       "nome": "string",
       "email": "string",
       "cpf": "string"
     }
   }
   ```

2. **Webhook**
   ```http
   POST /payment/webhook
   Content-Type: application/json
   X-Hub-Signature: sha1=xxxx
   
   {
     "action": "payment.updated",
     "data": {
       "id": "string"
     }
   }
   ```

3. **Reembolso**
   ```http
   POST /payment/refund/:paymentId
   Content-Type: application/json
   Authorization: Bearer token
   
   {
     "amount": number // opcional
   }
   ```

### Troubleshooting Comum

1. **Webhook não recebendo eventos**
   - Verificar logs do Mercado Pago
   - Confirmar URL configurada
   - Validar assinatura
   - Verificar rate limiting

2. **Reembolso falhando**
   - Verificar permissões do token
   - Confirmar status do pagamento
   - Validar valor do reembolso
   - Verificar logs de erro

3. **Erros de validação**
   - Verificar formato dos dados
   - Confirmar regras de negócio
   - Validar tipos de dados
   - Verificar limites de valores

## 📊 Métricas e Monitoramento

### Métricas Principais
```typescript
// Exemplos de métricas Prometheus
payment_creation_total{status="success"} 100
payment_webhook_total{status="success"} 95
payment_refund_total{status="success"} 98
payment_api_latency_seconds{endpoint="preference"} 0.5
```

### Logs Estruturados
```typescript
// Exemplo de log de pagamento
{
  level: "info",
  message: "Pagamento processado",
  paymentId: "123",
  status: "approved",
  amount: 1000,
  method: "pix",
  timestamp: "2024-03-20T10:00:00Z"
}

// Exemplo de log de webhook
{
  level: "info",
  message: "Webhook recebido",
  paymentId: "123",
  action: "payment.updated",
  status: "approved",
  timestamp: "2024-03-20T10:00:00Z"
}
```

## 🔄 Processo de Deploy

1. **Preparação**
   ```bash
   # Backup do banco
   pg_dump -U postgres onlywave > backup.sql
   
   # Verificar variáveis
   env | grep MERCADO_PAGO
   ```

2. **Deploy**
   ```bash
   # Build
   npm run build
   
   # Testes
   npm run test
   
   # Deploy
   npm run deploy:prod
   ```

3. **Pós-deploy**
   ```bash
   # Verificar logs
   tail -f /var/log/onlywave/payment.log
   
   # Verificar métricas
   curl localhost:9090/metrics
   ```

## 📚 Documentação Relacionada

- [Diagrama de Fluxo](payment-flow.md)
- [Swagger API](swagger.json)
- [Testes de Integração](__tests__/webhook.integration.test.ts)
- [Guia de Segurança](security.md)

## 👥 Contatos

- **Suporte Técnico**: suporte@onlywave.com
- **Mercado Pago**: developers@mercadopago.com
- **Time de Pagamentos**: pagamentos@onlywave.com

## 🔐 Segurança

### Tokens e Chaves
- Access Token: Rotacionar a cada 90 dias
- Public Key: Verificar permissões
- Webhook Secret: Manter em cofre

### Logs e Dados
- Não logar dados sensíveis
- Sanitizar inputs
- Validar origens
- Rate limiting

## 🚀 Próximos Passos

1. **Melhorias Futuras**
   - Implementar retry automático
   - Adicionar mais métodos de pagamento
   - Melhorar métricas
   - Expandir testes

2. **Manutenção**
   - Monitorar performance
   - Atualizar dependências
   - Revisar logs
   - Ajustar alertas

## 🛠️ Ferramentas Externas

### Testes de Webhook
Para testes locais de webhook, recomenda-se:

1. **ngrok**
   ```bash
   # Instalar ngrok
   npm install -g ngrok
   
   # Expor servidor local
   ngrok http 3000
   ```
   - Copie a URL HTTPS gerada
   - Configure no painel do Mercado Pago
   - Monitore requisições em tempo real

2. **RequestBin**
   - Acesse https://requestbin.com
   - Crie um novo bin
   - Use a URL gerada para testes
   - Visualize payloads recebidos

### Versões Testadas

| Dependência | Versão | Status |
|-------------|--------|--------|
| mercadopago | 1.5.14 | ✅ Testado |
| winston | 3.11.0 | ✅ Testado |
| zod | 3.22.4 | ✅ Testado |
| express | 4.18.2 | ✅ Testado |
| prisma | 5.10.0 | ✅ Testado |

> **Nota**: Versões mais recentes podem ser compatíveis, mas estas foram testadas extensivamente. 

# Documentação de Pagamentos - OnlyWave

## Índice
1. [Visão Geral](#visão-geral)
2. [Fluxo de Pagamento](#fluxo-de-pagamento)
3. [Mecanismo de Retry](#mecanismo-de-retry)
4. [Tratamento de Erros](#tratamento-de-erros)
5. [Logs e Monitoramento](#logs-e-monitoramento)
6. [Troubleshooting](#troubleshooting)

## Visão Geral

O módulo de pagamentos do OnlyWave integra-se com o Mercado Pago para processar pagamentos de forma segura e confiável. O sistema implementa mecanismos robustos de retry, logging e monitoramento para garantir a consistência das transações.

## Fluxo de Pagamento

O fluxo completo está documentado em [payment-flow.md](./payment-flow.md), incluindo diagramas detalhados de:
- Fluxo principal de pagamento
- Processo de reembolso
- Estados possíveis do pagamento
- Mecanismo de retry
- Sistema de logs e métricas

## Mecanismo de Retry

### Webhook Processing
- Máximo de 3 tentativas
- Delay exponencial entre tentativas (1s, 2s, 4s)
- Logs detalhados de cada tentativa
- Métricas de sucesso/falha

### Configurações
```typescript
private readonly MAX_RETRY_ATTEMPTS = 3;
private readonly RETRY_DELAY = 1000; // 1 segundo
```

### Comportamento
1. Primeira tentativa falha:
   - Log WARN com detalhes do erro
   - Aguarda 1 segundo
   - Incrementa métrica de retry
2. Segunda tentativa falha:
   - Log WARN com detalhes do erro
   - Aguarda 2 segundos
   - Incrementa métrica de retry
3. Terceira tentativa falha:
   - Log ERROR com todas as tentativas
   - Notifica time via métricas
   - Lança AppError para tratamento adequado

## Tratamento de Erros

### Tabela de Mapeamento de Erros

| Código HTTP | Código Erro | Mensagem | Ação Recomendada |
|------------|-------------|----------|------------------|
| 400 | INVALID_PAYMENT | Dados de pagamento inválidos | Verificar payload |
| 401 | UNAUTHORIZED | Token inválido/expirado | Verificar credenciais |
| 404 | PAYMENT_NOT_FOUND | Pagamento não encontrado | Verificar ID |
| 409 | PAYMENT_ALREADY_REFUNDED | Pagamento já reembolsado | Verificar status |
| 500 | PAYMENT_ERROR | Erro interno do MP | Verificar logs |
| 503 | SERVICE_UNAVAILABLE | MP indisponível | Aguardar e retry |

### Exemplos de Erros Comuns

```typescript
// Erro de autenticação
throw new AppError(
  HttpStatusCode.UNAUTHORIZED,
  ERROR_CODES.UNAUTHORIZED,
  'Token de acesso inválido'
);

// Erro de pagamento não encontrado
throw new AppError(
  HttpStatusCode.NOT_FOUND,
  ERROR_CODES.NOT_FOUND,
  'Pagamento não encontrado'
);

// Erro de reembolso duplicado
throw new AppError(
  HttpStatusCode.CONFLICT,
  ERROR_CODES.PAYMENT_ERROR,
  'Pagamento já está reembolsado'
);
```

## Logs e Monitoramento

### Checklist de Logs Esperados

#### Criação de Preferência
- [ ] INFO: "Preferência de pagamento criada com sucesso"
  ```json
  {
    "preferenceId": "string",
    "pedidoId": "string",
    "valor": "number",
    "formaPagamento": "string"
  }
  ```

#### Webhook
- [ ] INFO: "Webhook recebido"
  ```json
  {
    "action": "string",
    "paymentId": "string",
    "status": "string"
  }
  ```
- [ ] WARN: "Tentativa de processar webhook falhou"
  ```json
  {
    "error": "Error",
    "attempt": "number",
    "paymentId": "string"
  }
  ```
- [ ] ERROR: "Erro ao processar webhook após todas as tentativas"
  ```json
  {
    "error": "Error",
    "attempts": "number",
    "paymentId": "string"
  }
  ```

#### Reembolso
- [ ] INFO: "Reembolso processado com sucesso"
  ```json
  {
    "paymentId": "string",
    "amount": "number",
    "pedidoId": "string"
  }
  ```

### Métricas Principais
- `payment_webhook_retry_total`
- `payment_webhook_processing_duration_seconds`
- `payment_webhook_errors_total`
- `payment_refund_processing_duration_seconds`

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. Webhooks não recebidos
- Verificar se a URL está correta no Mercado Pago
- Confirmar se o domínio está na lista de IPs permitidos
- Verificar logs do servidor para erros 401/403

#### 2. Pagamento pendente sem atualização
- Verificar se o webhook foi recebido (logs)
- Confirmar se o retry mechanism está funcionando
- Verificar se há erros de conexão com o MP

#### 3. Erro 401 do Mercado Pago
- Verificar se o token está correto no .env
- Confirmar se o token não expirou
- Verificar se o IP está na whitelist do MP

#### 4. Reembolso falha
- Verificar se o pagamento existe
- Confirmar se o status permite reembolso
- Verificar se o valor é válido

### Comandos Úteis

```bash
# Verificar logs de webhook
grep "webhook" /var/log/onlywave/payment.log

# Verificar métricas de retry
curl localhost:9090/metrics | grep payment_webhook_retry

# Testar webhook localmente
curl -X POST http://localhost:3000/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{"action":"payment.updated","data":{"id":"TEST-123"}}'
```

### Checklist de Verificação

Antes de reportar um problema:
1. [ ] Verificar logs do período
2. [ ] Confirmar se o erro é reproduzível
3. [ ] Verificar métricas de erro
4. [ ] Confirmar status no Mercado Pago
5. [ ] Verificar se é um problema conhecido

## Próximos Passos

1. Implementar notificações em tempo real
2. Adicionar mais métricas de performance
3. Melhorar documentação de erros
4. Implementar testes de carga 