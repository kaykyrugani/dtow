# 🚀 OnlyWave Payment Service

Serviço de pagamentos da plataforma OnlyWave, integrado com Mercado Pago.

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Git

## 🛠️ Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/kaykyrugani/dtow
cd dtow
```

2. Execute o script de setup:
```bash
npm run setup
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Edite o arquivo `.env` com suas configurações

4. Verifique a saúde dos serviços:
```bash
npm run health
```

## 🚀 Desenvolvimento

1. Inicie o servidor em modo desenvolvimento:
```bash
npm run start:dev
```

2. Acesse a documentação da API:
```
http://localhost:3333/api
```

3. Acesse o Prisma Studio:
```bash
npm run prisma:studio
```

## 🧪 Testes

1. Execute os testes unitários:
```bash
npm test
```

2. Execute os testes com cobertura:
```bash
npm run test:cov
```

3. Execute os testes E2E:
```bash
npm run test:e2e
```

## 📊 Monitoramento

1. Prometheus:
```
http://localhost:9090
```

2. Grafana:
```
http://localhost:3001
```
Credenciais padrão:
- Usuário: admin
- Senha: admin

## 🔧 Scripts Disponíveis

- `npm run setup` - Configura o ambiente de desenvolvimento
- `npm run health` - Verifica a saúde dos serviços
- `npm run start:dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia o servidor em modo produção
- `npm run test` - Executa os testes
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:e2e` - Executa os testes E2E
- `npm run prisma:studio` - Abre o Prisma Studio
- `npm run prisma:migrate` - Executa as migrações do banco de dados
- `npm run prisma:generate` - Gera o cliente Prisma

## 📚 Documentação

- [Documentação da API](./docs/api.md)
- [Arquitetura](./docs/architecture.md)
- [Guia de Troubleshooting](./docs/troubleshooting.md)

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- Kayky Rugani - Desenvolvedor Backend
- OnlyWave Team - Equipe de Desenvolvimento