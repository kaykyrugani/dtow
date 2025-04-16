# OnlyWave Backend

Backend da plataforma OnlyWave, uma solução de e-commerce completa.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Redis
- BullMQ
- Prometheus
- Grafana

## 📋 Pré-requisitos

- Node.js 18+
- Docker
- Docker Compose

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/onlywave-backend.git
cd onlywave-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie os containers:
```bash
docker-compose up -d
```

5. Execute as migrações:
```bash
npm run prisma:migrate
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

## 📚 Documentação

A documentação da API está disponível em `/docs` quando o servidor estiver rodando.

## 🔍 Monitoramento

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.