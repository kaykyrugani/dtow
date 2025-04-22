# 🔧 Guia de Troubleshooting - OnlyWave

## 📋 Índice

1. [Problemas Comuns](#problemas-comuns)
2. [Logs e Monitoramento](#logs-e-monitoramento)
3. [Performance](#performance)
4. [Segurança](#segurança)
5. [Banco de Dados](#banco-de-dados)
6. [Cache](#cache)
7. [Integrações](#integrações)

## 🔍 Problemas Comuns

### Serviço não inicia

1. Verifique os logs:
```bash
docker-compose logs app
```

2. Verifique as variáveis de ambiente:
```bash
npm run health
```

3. Verifique a conexão com o banco:
```bash
docker-compose exec postgres pg_isready
```

### Erros 500

1. Verifique os logs da aplicação
2. Verifique as métricas no Grafana
3. Verifique o status dos serviços

## 📊 Logs e Monitoramento

### Acessando Logs

1. **Logs da Aplicação**
```bash
# Todos os logs
docker-compose logs -f app

# Logs de erro
docker-compose logs -f app | grep ERROR

# Logs de um período
docker-compose logs -f app --since 1h
```

2. **Logs do Banco**
```bash
docker-compose logs -f postgres
```

3. **Logs do Redis**
```bash
docker-compose logs -f redis
```

### Métricas

1. **Prometheus**
```
http://localhost:9090
```

2. **Grafana**
```
http://localhost:3001
```

## ⚡ Performance

### Problemas de Latência

1. Verifique as métricas no Grafana
2. Verifique o cache hit ratio
3. Verifique as queries lentas

### Alto Uso de CPU

1. Verifique os processos
```bash
docker-compose exec app top
```

2. Verifique as métricas
```bash
curl http://localhost:3333/metrics
```

## 🛡️ Segurança

### Problemas de Autenticação

1. Verifique os tokens
2. Verifique as configurações de CORS
3. Verifique os logs de acesso

### Rate Limiting

1. Verifique as configurações
2. Verifique os logs de bloqueio
3. Ajuste os limites se necessário

## 💾 Banco de Dados

### Conexões

1. Verifique o pool de conexões
```sql
SELECT * FROM pg_stat_activity;
```

2. Verifique as conexões ativas
```sql
SELECT count(*) FROM pg_stat_activity;
```

### Queries Lentas

1. Verifique o cache
2. Verifique os índices
3. Otimize as queries

## 🔄 Cache

### Problemas de Cache

1. Verifique o Redis
```bash
docker-compose exec redis redis-cli ping
```

2. Verifique as métricas
```bash
docker-compose exec redis redis-cli info
```

### Invalidação

1. Verifique as políticas de TTL
2. Verifique os padrões de acesso
3. Ajuste as configurações

## 🔌 Integrações

### Mercado Pago

1. Verifique as credenciais
2. Verifique os webhooks
3. Verifique os logs de integração

### Webhooks

1. Verifique os endpoints
2. Verifique os payloads
3. Verifique os retries

## 🚀 Deploy

### Problemas de Deploy

1. Verifique os logs do CI/CD
2. Verifique as variáveis de ambiente
3. Verifique as migrações

### Rollback

1. Identifique a versão anterior
2. Execute o rollback
3. Verifique a integridade

## 📝 Checklist de Diagnóstico

### Geral
- [ ] Verificar logs da aplicação
- [ ] Verificar métricas
- [ ] Verificar status dos serviços

### Performance
- [ ] Verificar uso de CPU
- [ ] Verificar uso de memória
- [ ] Verificar latência

### Segurança
- [ ] Verificar autenticação
- [ ] Verificar autorização
- [ ] Verificar rate limiting

### Dados
- [ ] Verificar conexões
- [ ] Verificar cache
- [ ] Verificar integridade

## 🔧 Comandos Úteis

### Docker
```bash
# Status dos containers
docker-compose ps

# Logs em tempo real
docker-compose logs -f

# Reiniciar serviços
docker-compose restart
```

### Banco de Dados
```bash
# Backup
docker-compose exec postgres pg_dump -U postgres onlywave > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres onlywave < backup.sql
```

### Redis
```bash
# Monitor
docker-compose exec redis redis-cli monitor

# Info
docker-compose exec redis redis-cli info
```

## 📞 Suporte

### Contatos
- Email: suporte@onlywave.com.br
- Slack: #onlywave-support
- Jira: ONLYWAVE-SUPPORT

### Escalação
1. Nível 1: Equipe de Desenvolvimento
2. Nível 2: Líder Técnico
3. Nível 3: CTO 