# Arquitetura de Segurança do OnlyWave

Este diagrama ilustra a arquitetura de segurança do sistema OnlyWave, incluindo autenticação, autorização e proteção de dados.

```mermaid
graph TD
    subgraph Cliente
        Browser[Navegador]
        Mobile[App Mobile]
    end

    subgraph Segurança de Rede
        WAF[Web Application Firewall]
        DDoS[DDoS Protection]
        SSL[TLS/SSL]
    end

    subgraph Autenticação
        JWT[JWT Tokens]
        Refresh[Refresh Tokens]
        OAuth[OAuth 2.0]
        MFA[2FA]
    end

    subgraph Autorização
        RBAC[Role-Based Access]
        Permissions[Permissions]
        Policies[Security Policies]
    end

    subgraph Proteção de Dados
        Encryption[Encryption at Rest]
        Transit[Encryption in Transit]
        Masking[Data Masking]
    end

    subgraph Auditoria
        Audit[Audit Logs]
        Alerts[Security Alerts]
        Monitoring[Security Monitoring]
    end

    Browser --> SSL
    Mobile --> SSL
    SSL --> WAF
    WAF --> DDoS
    DDoS --> JWT
    JWT --> RBAC
    RBAC --> Permissions
    Permissions --> Policies
    Policies --> Encryption
    Encryption --> Transit
    Transit --> Masking
    Masking --> Audit
    Audit --> Alerts
    Alerts --> Monitoring
```

## Componentes de Segurança

### Segurança de Rede
- **WAF**: Proteção contra ataques web
- **DDoS Protection**: Mitigação de ataques DDoS
- **TLS/SSL**: Criptografia de comunicação

### Autenticação
- **JWT**: Tokens de acesso
- **Refresh Tokens**: Renovação de sessão
- **OAuth 2.0**: Autenticação de terceiros
- **2FA**: Autenticação em dois fatores

### Autorização
- **RBAC**: Controle de acesso baseado em funções
- **Permissions**: Permissões granulares
- **Security Policies**: Políticas de segurança

### Proteção de Dados
- **Encryption at Rest**: Criptografia de dados armazenados
- **Encryption in Transit**: Criptografia em trânsito
- **Data Masking**: Mascaramento de dados sensíveis

### Auditoria
- **Audit Logs**: Registro de atividades
- **Security Alerts**: Alertas de segurança
- **Security Monitoring**: Monitoramento contínuo

## Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User as Usuário
    participant App as Aplicação
    participant Auth as Auth Service
    participant DB as Database

    User->>App: Login Request
    App->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: User Data
    Auth->>Auth: Generate JWT
    Auth->>Auth: Generate Refresh Token
    Auth-->>App: Tokens
    App-->>User: Access Token + Refresh Token

    Note over User,App: Tokens são armazenados de forma segura
```

## Fluxo de Autorização

```mermaid
sequenceDiagram
    participant User as Usuário
    participant API as API
    participant Auth as Auth Service
    participant RBAC as RBAC Service

    User->>API: Request com JWT
    API->>Auth: Validate JWT
    Auth->>RBAC: Check Permissions
    RBAC-->>Auth: Permission Status
    Auth-->>API: Authorization Result
    API-->>User: Response

    Note over User,API: Cada requisição é validada
```

## Proteção de Dados Sensíveis

```mermaid
flowchart LR
    subgraph Input
        Raw[Raw Data]
    end

    subgraph Processamento
        Validate[Validação]
        Sanitize[Sanitização]
        Encrypt[Criptografia]
    end

    subgraph Output
        Mask[Mascaramento]
        Audit[Auditoria]
    end

    Raw --> Validate
    Validate --> Sanitize
    Sanitize --> Encrypt
    Encrypt --> Mask
    Mask --> Audit
``` 