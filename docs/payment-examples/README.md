# Scripts de Pagamento

Scripts para gerenciamento e teste de pagamentos integrados com o Mercado Pago.

## Instalação

```bash
npm install
```

## Configuração

1. Crie um arquivo `config.json` na raiz do projeto:

```json
{
  "development": {
    "mpAccessToken": "TEST-0000000000000000-000000-00000000000000000000000000000000-000000000",
    "webhookUrl": "http://localhost:3000/api/payment/webhook",
    "webhookSecret": "your-webhook-secret-here"
  },
  "production": {
    "mpAccessToken": "APP-0000000000000000-000000-00000000000000000000000000000000-000000000",
    "webhookUrl": "https://api.seudominio.com/api/payment/webhook",
    "webhookSecret": "your-production-webhook-secret-here"
  }
}
```

2. Configure as variáveis de acordo com seu ambiente:
   - `mpAccessToken`: Token de acesso do Mercado Pago
   - `webhookUrl`: URL do seu endpoint de webhook
   - `webhookSecret`: Chave secreta para assinatura dos webhooks

## Scripts Disponíveis

### Reprocessar Webhook

Reprocessa um webhook para um pagamento específico:

```bash
npm run reprocess -- 123456789
```

Opções:
- `--debug`: Exibe informações detalhadas do processo

### Reprocessar em Lote

Reprocessa múltiplos pagamentos a partir de um arquivo JSON:

```bash
npm run reprocess-batch -- --file=payments.json
```

O arquivo `payments.json` deve conter um array de IDs de pagamento:

```json
[
  "1234567890",
  "9876543210",
  "5555555555"
]
```

Opções:
- `--debug`: Exibe informações detalhadas do processo

### Simular Webhook

Simula um webhook com diferentes status de pagamento:

```bash
npm run simulate -- --paymentId=123456789 --status=approved
```

Status disponíveis:
- `approved`: Pagamento aprovado
- `pending`: Aguardando pagamento
- `rejected`: Pagamento rejeitado
- `cancelled`: Pagamento cancelado
- `refunded`: Pagamento reembolsado

Opções:
- `--debug`: Exibe payload e assinatura do webhook

## Logs

Os scripts utilizam cores para facilitar a leitura dos logs:
- 🟢 Verde: Sucesso
- 🔵 Azul: Informação
- 🟡 Amarelo: Debug/Aviso
- 🔴 Vermelho: Erro

## Segurança

⚠️ **Importante**:
1. Nunca compartilhe ou commite seu `config.json` com tokens reais
2. Use tokens de teste para desenvolvimento
3. Mantenha sua chave secreta de webhook segura
4. Valide sempre a assinatura dos webhooks recebidos

## Exemplos

### Reprocessar um Pagamento

```bash
# Reprocessar com debug
npm run reprocess -- 123456789 --debug

# Reprocessar sem debug
npm run reprocess -- 123456789
```

### Reprocessar Múltiplos Pagamentos

```bash
# Reprocessar lista com debug
npm run reprocess-batch -- --file=payments.json --debug

# Reprocessar lista sem debug
npm run reprocess-batch -- --file=payments.json
```

### Simular Diferentes Status

```bash
# Simular pagamento aprovado
npm run simulate -- --paymentId=123456789 --status=approved

# Simular pagamento rejeitado com debug
npm run simulate -- --paymentId=123456789 --status=rejected --debug

# Simular reembolso
npm run simulate -- --paymentId=123456789 --status=refunded
``` 