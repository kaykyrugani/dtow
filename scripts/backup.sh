#!/bin/bash

# Configurações
BACKUP_DIR="./backups"
DB_NAME="onlywave"
DB_USER="postgres"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_${DB_NAME}_${TIMESTAMP}.sql"

# Criar diretório de backup se não existir
mkdir -p "$BACKUP_DIR"

# Realizar backup
echo "Iniciando backup do banco de dados $DB_NAME..."
pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"

# Verificar se o backup foi bem sucedido
if [ $? -eq 0 ]; then
    echo "Backup realizado com sucesso: $BACKUP_FILE"
    
    # Manter apenas os últimos 7 backups
    cd "$BACKUP_DIR"
    ls -t | tail -n +8 | xargs -r rm --
else
    echo "Erro ao realizar backup"
    exit 1
fi 