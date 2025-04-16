# 📦 Pacote de Entrega - Módulo de Pagamento OnlyWave

Este pacote contém todos os arquivos e documentação necessários para a entrega do módulo de pagamento.

## 📁 Estrutura do Pacote

```
payment-delivery/
├── docs/
│   ├── payment-handoff.md       # Documento principal de handoff
│   ├── payment-flow.md          # Diagrama de fluxo
│   └── security.md              # Guia de segurança
├── scripts/
│   ├── setup-webhook.sh         # Script para configurar webhook
│   └── backup-db.sh             # Script de backup
├── tests/
│   └── webhook-simulator.js     # Simulador de webhook para testes
└── README.md                    # Este arquivo
```

## 🚀 Como Usar

1. **Configuração Inicial**
   ```bash
   # Instalar dependências
   npm install
   
   # Configurar variáveis de ambiente
   cp .env.example .env
   ```

2. **Testes Locais**
   ```bash
   # Iniciar ngrok para webhook
   ./scripts/setup-webhook.sh
   
   # Rodar testes
   npm run test
   ```

3. **Deploy**
   ```bash
   # Backup antes do deploy
   ./scripts/backup-db.sh
   
   # Deploy em produção
   npm run deploy:prod
   ```

## 📚 Documentação

- [Guia de Handoff](docs/payment-handoff.md)
- [Diagrama de Fluxo](docs/payment-flow.md)
- [Guia de Segurança](docs/security.md)

## 🛠️ Ferramentas

- [Simulador de Webhook](tests/webhook-simulator.js)
- [Scripts de Utilidade](scripts/)

## 📞 Suporte

Para suporte técnico:
- Email: suporte@onlywave.com
- Slack: #onlywave-pagamentos
- Jira: PROJ-123 