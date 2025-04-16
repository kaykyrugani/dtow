#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Função para log
log() {
  echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
  echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERRO: $1${NC}"
}

warning() {
  echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] AVISO: $1${NC}"
}

# Verificar se está em ambiente de produção
if [ "$NODE_ENV" != "production" ]; then
  warning "Este script deve ser executado apenas em ambiente de produção!"
  read -p "Deseja continuar mesmo assim? (s/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    exit 1
  fi
fi

# Diretório da aplicação
APP_DIR="/var/www/onlywave"
BACKUP_DIR="/var/backups/onlywave"
TIMESTAMP=$(date +%Y%m%d%H%M%S)

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Backup do banco de dados
log "Fazendo backup do banco de dados..."
pg_dump -U onlywave -d onlywave > $BACKUP_DIR/onlywave_$TIMESTAMP.sql
if [ $? -ne 0 ]; then
  error "Falha ao fazer backup do banco de dados"
  exit 1
fi

# Backup dos arquivos
log "Fazendo backup dos arquivos..."
tar -czf $BACKUP_DIR/onlywave_files_$TIMESTAMP.tar.gz $APP_DIR
if [ $? -ne 0 ]; then
  error "Falha ao fazer backup dos arquivos"
  exit 1
fi

# Atualizar código
log "Atualizando código..."
cd $APP_DIR
git pull origin main
if [ $? -ne 0 ]; then
  error "Falha ao atualizar código"
  exit 1
fi

# Instalar dependências
log "Instalando dependências..."
npm ci --production
if [ $? -ne 0 ]; then
  error "Falha ao instalar dependências"
  exit 1
fi

# Compilar TypeScript
log "Compilando TypeScript..."
npm run build
if [ $? -ne 0 ]; then
  error "Falha ao compilar TypeScript"
  exit 1
fi

# Executar migrações
log "Executando migrações do banco de dados..."
npx prisma migrate deploy
if [ $? -ne 0 ]; then
  error "Falha ao executar migrações"
  exit 1
fi

# Executar seed (opcional)
read -p "Deseja executar o seed do banco de dados? (s/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
  log "Executando seed do banco de dados..."
  npx prisma db seed
  if [ $? -ne 0 ]; then
    error "Falha ao executar seed"
    exit 1
  fi
fi

# Reiniciar aplicação
log "Reiniciando aplicação..."
pm2 restart onlywave
if [ $? -ne 0 ]; then
  error "Falha ao reiniciar aplicação"
  exit 1
fi

# Verificar status
log "Verificando status da aplicação..."
pm2 status onlywave
if [ $? -ne 0 ]; then
  error "Falha ao verificar status da aplicação"
  exit 1
fi

log "Deploy concluído com sucesso!" 