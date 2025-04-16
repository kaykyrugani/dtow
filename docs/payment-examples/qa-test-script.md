# Roteiro de Testes Manuais - Módulo de Pagamentos OnlyWave

## Índice
1. [Ambiente de Teste](#ambiente-de-teste)
2. [Testes de Criação de Preferência](#testes-de-criação-de-preferência)
3. [Testes de Webhook](#testes-de-webhook)
4. [Testes de Reembolso](#testes-de-reembolso)
5. [Testes de Segurança](#testes-de-segurança)
6. [Testes de Performance](#testes-de-performance)

## Ambiente de Teste

### Configuração
1. Acesse o ambiente de sandbox do Mercado Pago
2. Configure as variáveis de ambiente:
   ```
   MERCADO_PAGO_ACCESS_TOKEN=TEST-1234567890
   MERCADO_PAGO_WEBHOOK_SECRET=your_webhook_secret
   ```
3. Verifique se o banco de dados está limpo e com as migrations aplicadas

### Cartões de Teste
- Mastercard: 5031 4332 1540 6351
- Visa: 4235 6477 2802 5682
- American Express: 3753 651535 56885

## Testes de Criação de Preferência

### TC001 - Criar Preferência com Dados Válidos
1. Acesse a página de checkout
2. Preencha os dados do pedido:
   - Valor: R$ 100,00
   - Descrição: "Teste de Pagamento"
   - Forma de Pagamento: Cartão de Crédito
3. Verifique se:
   - A preferência é criada com sucesso
   - O ID da preferência é retornado
   - O init_point é gerado corretamente

### TC002 - Validação de Campos Obrigatórios
1. Tente criar uma preferência sem:
   - Valor
   - Descrição
   - Dados do comprador
2. Verifique se:
   - Erros apropriados são retornados
   - Mensagens de erro são claras
   - Campos inválidos são destacados

### TC003 - Validação de Formato de Dados
1. Teste com:
   - CPF inválido
   - Email inválido
   - Valor negativo
   - Valor zero
2. Verifique se:
   - Validações são aplicadas
   - Mensagens de erro são específicas
   - Dados não são enviados ao MP

## Testes de Webhook

### TC004 - Recebimento de Webhook
1. Use o script de simulação:
   ```bash
   npm run simulate -- --paymentId=123456789 --status=approved
   ```
2. Verifique se:
   - Webhook é recebido
   - Assinatura é validada
   - Status é atualizado no banco

### TC005 - Idempotência de Webhook
1. Envie o mesmo webhook duas vezes
2. Verifique se:
   - Primeira chamada processa normalmente
   - Segunda chamada é ignorada
   - Logs indicam idempotência

### TC006 - Diferentes Status de Pagamento
1. Teste webhooks para:
   - approved
   - pending
   - rejected
   - cancelled
   - refunded
2. Verifique se:
   - Status é atualizado corretamente
   - Histórico é registrado
   - Notificações são enviadas

## Testes de Reembolso

### TC007 - Reembolso Total
1. Faça um pagamento aprovado
2. Inicie reembolso como admin
3. Verifique se:
   - Reembolso é processado
   - Status é atualizado
   - Histórico é registrado

### TC008 - Reembolso Parcial
1. Faça um pagamento aprovado
2. Inicie reembolso parcial
3. Verifique se:
   - Valor parcial é reembolsado
   - Status é atualizado
   - Histórico registra valor parcial

### TC009 - Validações de Reembolso
1. Tente reembolsar:
   - Pagamento não aprovado
   - Pagamento já reembolsado
   - Pagamento inexistente
2. Verifique se:
   - Erros apropriados são retornados
   - Operação é bloqueada
   - Logs são gerados

## Testes de Segurança

### TC010 - Autenticação
1. Tente acessar endpoints:
   - Sem token
   - Com token inválido
   - Com token expirado
2. Verifique se:
   - Acesso é negado
   - Mensagens de erro são seguras
   - Logs de tentativa são gerados

### TC011 - Assinatura de Webhook
1. Envie webhook:
   - Sem assinatura
   - Com assinatura inválida
   - Com assinatura modificada
2. Verifique se:
   - Webhook é rejeitado
   - Erro 401 é retornado
   - Tentativa é logada

### TC012 - Rate Limiting
1. Faça múltiplas requisições:
   - Para criação de preferência
   - Para webhook
   - Para reembolso
2. Verifique se:
   - Limites são aplicados
   - Erro 429 é retornado
   - Contadores são resetados

## Testes de Performance

### TC013 - Tempo de Resposta
1. Meça tempo de resposta para:
   - Criação de preferência
   - Processamento de webhook
   - Consulta de status
2. Verifique se:
   - Tempos estão dentro do esperado
   - Métricas são registradas
   - Alertas são gerados se necessário

### TC014 - Concorrência
1. Execute em paralelo:
   - Múltiplas criações de preferência
   - Múltiplos webhooks
   - Múltiplos reembolsos
2. Verifique se:
   - Sistema mantém consistência
   - Não há race conditions
   - Logs são sequenciais

### TC015 - Carga
1. Simule carga com:
   - 100 preferências/minuto
   - 200 webhooks/minuto
   - 50 reembolsos/minuto
2. Verifique se:
   - Sistema mantém performance
   - Banco de dados responde
   - Logs são gerados

## Checklist de Execução

### Pré-requisitos
- [ ] Ambiente de sandbox configurado
- [ ] Banco de dados limpo
- [ ] Scripts de teste disponíveis
- [ ] Acesso de admin configurado

### Execução
- [ ] Executar testes em ordem
- [ ] Documentar resultados
- [ ] Capturar screenshots de erros
- [ ] Registrar logs relevantes

### Pós-teste
- [ ] Verificar logs do sistema
- [ ] Confirmar métricas
- [ ] Validar consistência do banco
- [ ] Reportar bugs encontrados

## Formulário de Bug

### Template
```
**Test Case:** [ID do teste]
**Descrição:** [Descrição do bug]
**Passos para Reproduzir:**
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Comportamento Esperado:**
[Descrição]

**Comportamento Atual:**
[Descrição]

**Evidências:**
- Screenshots: [Links]
- Logs: [Links]
- Métricas: [Links]

**Ambiente:**
- Browser: [Versão]
- API: [Versão]
- Banco: [Versão]
```

## Recursos

1. [Documentação da API](../swagger.json)
2. [Scripts de Teste](./test-scripts)
3. [Logs do Sistema](../logs)
4. [Métricas](../metrics) 