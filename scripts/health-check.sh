#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔍 Verificando saúde dos serviços...${NC}"

# Verificar PostgreSQL
echo -e "${YELLOW}📊 Verificando PostgreSQL...${NC}"
if docker-compose exec postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PostgreSQL está funcionando${NC}"
else
    echo -e "${RED}❌ PostgreSQL não está respondendo${NC}"
fi

# Verificar Redis
echo -e "${YELLOW}🔴 Verificando Redis...${NC}"
if docker-compose exec redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Redis está funcionando${NC}"
else
    echo -e "${RED}❌ Redis não está respondendo${NC}"
fi

# Verificar Prometheus
echo -e "${YELLOW}📈 Verificando Prometheus...${NC}"
if curl -s http://localhost:9090/-/healthy > /dev/null; then
    echo -e "${GREEN}✅ Prometheus está funcionando${NC}"
else
    echo -e "${RED}❌ Prometheus não está respondendo${NC}"
fi

# Verificar Grafana
echo -e "${YELLOW}📊 Verificando Grafana...${NC}"
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo -e "${GREEN}✅ Grafana está funcionando${NC}"
else
    echo -e "${RED}❌ Grafana não está respondendo${NC}"
fi

# Verificar aplicação
echo -e "${YELLOW}🌐 Verificando aplicação...${NC}"
if curl -s http://localhost:3333/health > /dev/null; then
    echo -e "${GREEN}✅ Aplicação está funcionando${NC}"
else
    echo -e "${RED}❌ Aplicação não está respondendo${NC}"
fi

echo -e "${YELLOW}📝 Status dos containers:${NC}"
docker-compose ps 