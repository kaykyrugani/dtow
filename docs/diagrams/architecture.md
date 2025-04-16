# Arquitetura do Sistema OnlyWave

Este diagrama ilustra a arquitetura geral do sistema OnlyWave, incluindo os componentes principais e suas interações.

```mermaid
graph TD
    subgraph Cliente
        Web[Web App]
        Mobile[Mobile App]
    end

    subgraph API[API OnlyWave]
        Auth[Autenticação]
        Payment[Pagamentos]
        Order[Pedidos]
        Product[Produtos]
        User[Usuários]
    end

    subgraph Banco[Banco de Dados]
        DB[(PostgreSQL)]
    end

    subgraph Cache[Cache]
        Redis[(Redis)]
    end

    subgraph Integrações
        MP[Mercado Pago]
        Email[Serviço de Email]
        SMS[Serviço de SMS]
    end

    subgraph Monitoramento
        Prometheus[Prometheus]
        Grafana[Grafana]
        Logs[Logs]
    end

    Web --> API
    Mobile --> API
    
    API --> DB
    API --> Redis
    API --> MP
    API --> Email
    API --> SMS
    
    Prometheus --> API
    Grafana --> Prometheus
    Logs --> API
```

## Componentes Principais

### API OnlyWave
- **Autenticação**: Gerencia autenticação e autorização de usuários
- **Pagamentos**: Integração com Mercado Pago e processamento de pagamentos
- **Pedidos**: Gerenciamento de pedidos e status
- **Produtos**: Catálogo de produtos e estoque
- **Usuários**: Gerenciamento de usuários e perfis

### Banco de Dados
- **PostgreSQL**: Armazena dados transacionais e relacionais
- **Redis**: Cache e armazenamento de sessões

### Integrações
- **Mercado Pago**: Processamento de pagamentos
- **Serviço de Email**: Notificações por email
- **Serviço de SMS**: Notificações por SMS

### Monitoramento
- **Prometheus**: Coleta de métricas
- **Grafana**: Visualização de métricas e dashboards
- **Logs**: Registro de eventos e erros

## Fluxo de Dados

```mermaid
flowchart LR
    subgraph Entrada
        Request[Requisição HTTP]
    end

    subgraph Processamento
        Auth[Autenticação]
        Validation[Validação]
        Business[Lógica de Negócio]
        DB[(Banco de Dados)]
    end

    subgraph Saída
        Response[Resposta HTTP]
    end

    Request --> Auth
    Auth --> Validation
    Validation --> Business
    Business --> DB
    DB --> Business
    Business --> Response
``` 