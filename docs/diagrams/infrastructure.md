# Infraestrutura do Sistema OnlyWave

Este diagrama ilustra a infraestrutura completa do sistema OnlyWave, incluindo ambientes, serviços e fluxos de deploy.

```mermaid
graph TD
    subgraph Ambientes
        Dev[Ambiente de Desenvolvimento]
        Staging[Ambiente de Staging]
        Prod[Ambiente de Produção]
    end

    subgraph CI/CD
        GitHub[GitHub]
        Actions[GitHub Actions]
        Docker[Docker Registry]
    end

    subgraph Infraestrutura
        LB[Load Balancer]
        API[API Servers]
        DB[(PostgreSQL)]
        Redis[(Redis)]
        S3[S3 Storage]
    end

    subgraph Monitoramento
        Prometheus[Prometheus]
        Grafana[Grafana]
        ELK[ELK Stack]
        Alerts[Alert Manager]
    end

    subgraph Segurança
        WAF[WAF]
        VPC[VPC]
        IAM[IAM]
    end

    GitHub --> Actions
    Actions --> Docker
    Docker --> Dev
    Docker --> Staging
    Docker --> Prod

    Dev --> API
    Staging --> API
    Prod --> API

    LB --> API
    API --> DB
    API --> Redis
    API --> S3

    WAF --> LB
    VPC --> WAF
    IAM --> VPC

    Prometheus --> API
    Grafana --> Prometheus
    ELK --> API
    Alerts --> Prometheus
```

## Componentes da Infraestrutura

### Ambientes
- **Desenvolvimento**: Ambiente local para desenvolvimento e testes
- **Staging**: Ambiente de homologação para testes de integração
- **Produção**: Ambiente de produção com alta disponibilidade

### CI/CD
- **GitHub**: Repositório de código
- **GitHub Actions**: Pipeline de CI/CD
- **Docker Registry**: Registro de imagens Docker

### Infraestrutura Core
- **Load Balancer**: Distribuição de carga
- **API Servers**: Servidores da aplicação
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache e sessões
- **S3**: Armazenamento de arquivos

### Monitoramento
- **Prometheus**: Coleta de métricas
- **Grafana**: Dashboards e visualização
- **ELK Stack**: Análise de logs
- **Alert Manager**: Gestão de alertas

### Segurança
- **WAF**: Web Application Firewall
- **VPC**: Rede privada virtual
- **IAM**: Gestão de identidade e acesso

## Fluxo de Deploy

```mermaid
sequenceDiagram
    participant Dev as Desenvolvedor
    participant GH as GitHub
    participant CI as CI/CD
    participant Reg as Registry
    participant Env as Ambiente

    Dev->>GH: Push código
    GH->>CI: Trigger pipeline
    CI->>CI: Run testes
    CI->>CI: Build Docker
    CI->>Reg: Push imagem
    CI->>Env: Deploy
    Env->>Env: Health check
    Env-->>CI: Deploy status
    CI-->>Dev: Notificação
```

## Estratégia de Backup

```mermaid
flowchart LR
    subgraph Backup
        DB[(PostgreSQL)]
        S3[S3 Storage]
        Logs[Logs]
    end

    subgraph Retenção
        Daily[Backup Diário]
        Weekly[Backup Semanal]
        Monthly[Backup Mensal]
    end

    DB --> Daily
    S3 --> Weekly
    Logs --> Monthly

    Daily --> Retention[30 dias]
    Weekly --> Retention
    Monthly --> Retention
``` 