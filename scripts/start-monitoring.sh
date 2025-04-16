#!/bin/bash

# Criar diretórios necessários
mkdir -p grafana/dashboards

# Iniciar os containers
docker-compose -f docker-compose.monitoring.yml up -d

# Aguardar os serviços iniciarem
echo "Aguardando serviços iniciarem..."
sleep 10

# Verificar status
echo "Status dos serviços:"
docker-compose -f docker-compose.monitoring.yml ps

echo "
Monitoramento iniciado!

Prometheus: http://localhost:9090
Grafana: http://localhost:3001
  - Usuário: admin
  - Senha: admin

Para visualizar os logs:
docker-compose -f docker-compose.monitoring.yml logs -f
" 