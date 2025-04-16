# Checklist de Verificação do Ambiente - Módulo de Pagamentos

## 1. Configuração do Ambiente

### Variáveis de Ambiente
- [ ] `MERCADO_PAGO_ACCESS_TOKEN` configurado
- [ ] `MERCADO_PAGO_WEBHOOK_SECRET` configurado
- [ ] `APP_URL` configurado corretamente
- [ ] `NODE_ENV` definido (development/production)

### Banco de Dados
- [ ] Migrations executadas
- [ ] Tabelas criadas:
  - [ ] `webhook_logs`
  - [ ] `payments`
- [ ] Índices verificados
- [ ] Relacionamentos testados

### Dependências
- [ ] `mercadopago` instalado
- [ ] `zod` instalado
- [ ] `@prisma/client` atualizado
- [ ] Todas as dependências no `package.json`

## 2. Segurança

### Autenticação
- [ ] JWT configurado
- [ ] Middleware de autenticação funcionando
- [ ] Middleware de admin funcionando
- [ ] Tokens de refresh configurados

### Webhooks
- [ ] HMAC-SHA256 implementado
- [ ] Assinatura sendo validada
- [ ] Rate limiting configurado
- [ ] Idempotência funcionando

### Dados Sensíveis
- [ ] Tokens não expostos em logs
- [ ] Dados de cartão não armazenados
- [ ] CPF mascarado em logs
- [ ] Senhas hasheadas

## 3. Funcionalidades

### Criação de Preferência
- [ ] Endpoint respondendo
- [ ] Validação de dados funcionando
- [ ] Integração com MP funcionando
- [ ] Histórico sendo salvo

### Webhooks
- [ ] Endpoint respondendo
- [ ] Assinatura sendo validada
- [ ] Idempotência funcionando
- [ ] Status sendo atualizado

### Reembolso
- [ ] Endpoint respondendo
- [ ] Permissões verificadas
- [ ] Status validado
- [ ] Histórico atualizado

## 4. Monitoramento

### Logs
- [ ] Logs estruturados configurados
- [ ] Níveis de log definidos
- [ ] Rotação de logs configurada
- [ ] Logs sendo enviados para serviço externo

### Métricas
- [ ] Tempo de resposta sendo medido
- [ ] Taxa de erro sendo monitorada
- [ ] Rate limits sendo registrados
- [ ] Status de pagamentos sendo rastreados

### Alertas
- [ ] Alertas de erro configurados
- [ ] Alertas de performance configurados
- [ ] Alertas de segurança configurados
- [ ] Notificações sendo enviadas

## 5. Testes

### Ambiente de Teste
- [ ] Sandbox do MP configurado
- [ ] Cartões de teste disponíveis
- [ ] Webhooks de teste configurados
- [ ] Ambiente isolado

### Testes Automatizados
- [ ] Testes unitários rodando
- [ ] Testes de integração rodando
- [ ] Testes de carga rodando
- [ ] Cobertura de código adequada

### Testes Manuais
- [ ] Fluxo completo testado
- [ ] Erros tratados corretamente
- [ ] Timeouts configurados
- [ ] Retry mechanism funcionando

## 6. Documentação

### API
- [ ] Swagger atualizado
- [ ] Exemplos de payload disponíveis
- [ ] Erros documentados
- [ ] Rate limits documentados

### Operacional
- [ ] Procedimentos de rollback documentados
- [ ] Troubleshooting guide disponível
- [ ] Runbook atualizado
- [ ] Contatos de emergência listados

### Desenvolvimento
- [ ] README atualizado
- [ ] Changelog mantido
- [ ] Contribuição documentada
- [ ] Ambiente local documentado

## 7. Checklist de Produção

### Pré-deploy
- [ ] Testes passando
- [ ] Lint passando
- [ ] Build funcionando
- [ ] Migrations testadas

### Deploy
- [ ] Rollback planejado
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Equipe de suporte notificada

### Pós-deploy
- [ ] Logs sendo gerados
- [ ] Métricas sendo coletadas
- [ ] Alertas funcionando
- [ ] Integração respondendo 