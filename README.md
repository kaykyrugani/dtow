# OnlyWave Backend

Backend da loja de roupas OnlyWave desenvolvido com Node.js, TypeScript, Express e PostgreSQL.

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js >= 14
- PostgreSQL >= 12
- Redis (opcional)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/onlywave-backend.git
cd onlywave-backend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Configure o banco de dados
```bash
npm run db:setup    # Cria os bancos e aplica migrações
npm run db:seed     # (Opcional) Popula o banco com dados iniciais
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start` - Inicia o servidor em produção
- `npm test` - Executa os testes
- `npm run test:coverage` - Executa os testes com cobertura
- `npm run db:setup` - Configura os bancos de dados
- `npm run db:reset` - Reseta os bancos de dados
- `npm run db:test-connection` - Testa a conexão com os bancos

## 📁 Estrutura do Projeto

```
src/
├── @types/         # Definições de tipos
├── config/         # Configurações
├── constants/      # Constantes e enums
├── controllers/    # Controladores
├── middlewares/    # Middlewares
├── routes/         # Rotas
├── services/       # Serviços
├── utils/          # Utilitários
└── validators/     # Validadores
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| DATABASE_URL | URL do banco principal | postgresql://user:pass@localhost:5432/db |
| DATABASE_URL_TEST | URL do banco de teste | postgresql://user:pass@localhost:5432/test_db |
| JWT_SECRET | Chave para tokens JWT | your_secret_key |
| REDIS_HOST | Host do Redis | localhost |
| REDIS_PORT | Porta do Redis | 6379 |

## 🧪 Testes

O projeto usa Vitest para testes. Os testes são divididos em:

- Unitários: `src/tests/unit/`
- Integração: `src/tests/integration/`
- E2E: `src/tests/e2e/`

Para executar:
```bash
npm test              # Todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com cobertura
```

## 📝 Documentação da API

A documentação da API está disponível em `/docs` quando o servidor está rodando.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request