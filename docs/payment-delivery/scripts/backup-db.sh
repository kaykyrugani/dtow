#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configurações
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/onlywave_backup_$TIMESTAMP.sql"

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

echo -e "${BLUE}🔄 Iniciando backup do banco de dados...${NC}"

# Verificar variáveis de ambiente
if [ -z "$DB_USER" ] || [ -z "$DB_NAME" ]; then
    echo -e "${RED}❌ Variáveis de ambiente DB_USER e DB_NAME não configuradas${NC}"
    echo "Por favor, configure as variáveis de ambiente primeiro"
    exit 1
fi

# Realizar backup
echo -e "${BLUE}📦 Executando pg_dump...${NC}"
PGPASSWORD=$DB_PASSWORD pg_dump -U $DB_USER -d $DB_NAME -F c -f $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup realizado com sucesso!${NC}"
    echo -e "${BLUE}📁 Arquivo: $BACKUP_FILE${NC}"
    
    # Calcular tamanho do backup
    SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo -e "${BLUE}📊 Tamanho: $SIZE${NC}"
    
    # Listar últimos backups
    echo -e "\n${BLUE}📋 Últimos backups:${NC}"
    ls -lh $BACKUP_DIR | tail -n 5
else
    echo -e "${RED}❌ Falha ao realizar backup${NC}"
    exit 1
fi

# Limpar backups antigos (manter últimos 5)
echo -e "\n${BLUE}🧹 Limpando backups antigos...${NC}"
ls -t $BACKUP_DIR/*.sql | tail -n +6 | xargs -r rm

echo -e "${GREEN}✅ Processo de backup concluído!${NC}" 