# Guia de Troubleshooting - Scripts de Pagamento

## 🔍 Problemas Comuns e Soluções

### 1. Erro de Autenticação

**Sintoma:**
```
❌ Erro ao buscar dados do pagamento:
401 Unauthorized
```

**Solução:**
1. Verifique se o token no `config.json` está correto
2. Confirme se o token tem permissões suficientes
3. Tente gerar um novo token no Mercado Pago

### 2. Webhook Não Processado

**Sintoma:**
```
❌ Erro ao enviar webhook:
404 Not Found
```

**Solução:**
1. Verifique se a URL do webhook está correta no `config.json`
2. Confirme se o endpoint está online e acessível
3. Teste a URL com um cliente HTTP (curl, Postman)

### 3. Assinatura Inválida

**Sintoma:**
```
❌ Erro ao enviar webhook:
403 Forbidden - Invalid signature
```

**Solução:**
1. Verifique se o `webhookSecret` está correto
2. Confirme se a assinatura está sendo gerada corretamente
3. Compare a assinatura gerada com a esperada

### 4. Pagamento Não Encontrado

**Sintoma:**
```
❌ Erro ao buscar dados do pagamento:
404 Not Found
```

**Solução:**
1. Verifique se o ID do pagamento está correto
2. Confirme se o pagamento existe no Mercado Pago
3. Tente buscar o pagamento diretamente na API do MP

### 5. Erro de Processamento em Lote

**Sintoma:**
```
❌ Erro ao processar pagamento XXXXX:
Processo falhou com código 1
```

**Solução:**
1. Verifique o formato do arquivo `payments.json`
2. Confirme se todos os IDs são válidos
3. Execute com `--debug` para mais detalhes

## 🛠️ Ferramentas de Diagnóstico

### 1. Modo Debug

Todos os scripts suportam o modo debug:
```bash
# Reprocessar com debug
npm run reprocess -- 123456789 --debug

# Processar lote com debug
npm run reprocess-batch -- --file=payments.json --debug

# Simular com debug
npm run simulate -- --paymentId=123456789 --status=approved --debug
```

### 2. Verificação de Configuração

1. Valide o `config.json`:
```bash
node -e "console.log(require('./config.json'))"
```

2. Teste a conexão com o Mercado Pago:
```bash
curl -H "Authorization: Bearer SEU_TOKEN" https://api.mercadopago.com/users/me
```

### 3. Logs Detalhados

Os scripts geram logs coloridos:
- 🟢 Verde: Sucesso
- 🔵 Azul: Informação
- 🟡 Amarelo: Debug/Aviso
- 🔴 Vermelho: Erro

## 🔄 Fluxo de Troubleshooting

1. **Identificar o Problema**
   - Colete mensagens de erro
   - Anote o contexto (ambiente, IDs, etc.)

2. **Isolar a Causa**
   - Execute em modo debug
   - Verifique configurações
   - Teste endpoints separadamente

3. **Aplicar Solução**
   - Siga as soluções sugeridas
   - Documente a resolução
   - Atualize configurações se necessário

4. **Validar**
   - Execute testes de integração
   - Verifique logs
   - Confirme funcionamento

## 📝 Checklist de Verificação

### Configuração
- [ ] Token do Mercado Pago válido
- [ ] URL do webhook acessível
- [ ] Chave secreta correta
- [ ] Ambiente configurado (dev/prod)

### Dados
- [ ] IDs de pagamento válidos
- [ ] Formato JSON correto
- [ ] Dados completos e consistentes

### Rede
- [ ] Conexão com Mercado Pago
- [ ] Endpoint do webhook online
- [ ] Firewall/Proxy configurado

### Segurança
- [ ] Tokens não expostos
- [ ] Assinaturas válidas
- [ ] Permissões corretas

## 🆘 Suporte

Se os problemas persistirem:

1. **Documente**
   - Colete todos os logs
   - Anote os passos executados
   - Capture mensagens de erro

2. **Reporte**
   - Abra uma issue no repositório
   - Inclua todas as informações coletadas
   - Descreva o comportamento esperado

3. **Acompanhe**
   - Monitore a issue
   - Forneça informações adicionais se solicitado
   - Teste as soluções propostas 