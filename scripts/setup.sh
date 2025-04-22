#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Iniciando setup do OnlyWave...${NC}"

# Verificar se o .env existe
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env a partir do .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado com sucesso!${NC}"
    echo -e "${YELLOW}⚠️ Por favor, edite o arquivo .env com suas configurações antes de continuar.${NC}"
    exit 1
fi

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

# Iniciar containers Docker
echo -e "${YELLOW}🐳 Iniciando containers Docker...${NC}"
docker-compose up -d

# Aguardar serviços estarem prontos
echo -e "${YELLOW}⏳ Aguardando serviços estarem prontos...${NC}"
sleep 10

# Executar migrações
echo -e "${YELLOW}🔄 Executando migrações do banco de dados...${NC}"
npm run prisma:migrate

# Verificar status dos serviços
echo -e "${YELLOW}🔍 Verificando status dos serviços...${NC}"
docker-compose ps

echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Verifique se todos os serviços estão rodando corretamente"
echo "2. Configure suas credenciais do Mercado Pago no arquivo .env"
echo "3. Execute 'npm run start:dev' para iniciar o servidor em modo desenvolvimento" 