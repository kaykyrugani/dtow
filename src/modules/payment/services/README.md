# Testes de Integração do PaymentService

Este diretório contém os testes de integração para o `PaymentService`, que é responsável por gerenciar pagamentos na aplicação.

## Estrutura dos Testes

Os testes estão organizados nas seguintes categorias:

### 1. Processamento de Webhook
- Criação de novos pagamentos
- Tratamento de webhooks duplicados
- Salvamento de referências (cliente/pedido)

### 2. Reembolso
- Reembolso parcial
- Reembolso total
- Validações de valores
- Tratamento de pagamentos inexistentes

### 3. Concorrência
- Processamento simultâneo de webhooks
- Reembolsos simultâneos
- Consistência dos dados

### 4. Performance
- Tempo de processamento de webhooks
- Tempo de processamento de reembolsos
- Limites de tempo aceitáveis

### 5. Casos de Borda
- Valores muito grandes
- Valores muito pequenos
- Caracteres especiais
- Metadados vazios/nulos

## Como Executar os Testes

```bash
# Executar todos os testes
npm run test:integration

# Executar testes específicos
npm run test:integration -- --testNamePattern="should process webhook"

# Executar testes com cobertura
npm run test:integration:coverage
```

## Guia de Troubleshooting

### Problemas Comuns

1. **Erro de Conexão com Redis**
   ```
   Error: Redis connection error
   ```
   **Solução**: 
   - Verificar se o Redis está rodando
   - Verificar as configurações de conexão
   - Verificar se as credenciais estão corretas

2. **Erro de Timeout**
   ```
   Error: Operation timed out
   ```
   **Solução**:
   - Verificar a carga do Redis
   - Aumentar o timeout nas configurações
   - Verificar a conectividade da rede

3. **Erro de Dados Inválidos**
   ```
   Error: Invalid payment data
   ```
   **Solução**:
   - Verificar o formato dos dados
   - Validar os campos obrigatórios
   - Verificar a consistência dos tipos

### Métricas e Monitoramento

Os testes incluem métricas importantes que devem ser monitoradas:

- Tempo de resposta do Redis
- Taxa de erros
- Número de operações concorrentes
- Uso de memória

### Logs

Os logs são gerados em diferentes níveis:

- **INFO**: Operações normais
- **WARN**: Situações que precisam de atenção
- **ERROR**: Falhas que precisam de intervenção

## Boas Práticas

1. **Isolamento**
   - Cada teste deve ser independente
   - Limpar o estado entre os testes
   - Usar mocks apropriadamente

2. **Performance**
   - Manter os testes rápidos
   - Evitar operações desnecessárias
   - Usar timeouts apropriados

3. **Manutenção**
   - Manter a documentação atualizada
   - Seguir os padrões de código
   - Revisar regularmente

## Contribuição

Ao adicionar novos testes:

1. Seguir a estrutura existente
2. Documentar adequadamente
3. Incluir casos de borda
4. Verificar a cobertura
5. Manter a consistência

## Suporte

Para questões ou problemas:

1. Verificar a documentação
2. Consultar os logs
3. Revisar as métricas
4. Contatar a equipe de suporte 