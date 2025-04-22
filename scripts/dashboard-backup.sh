#!/bin/bash

# Script para backup e restauração do dashboard do Grafana
# Autor: OnlyWave Team
# Data: 2024

# Configurações
GRAFANA_URL="http://localhost:3000"
GRAFANA_API_KEY="your-api-key"  # Substitua pela sua chave de API
DASHBOARD_UID="payment"
BACKUP_DIR="./backups/dashboards"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/payment-dashboard_${DATE}.json"

# Cria diretório de backup se não existir
mkdir -p ${BACKUP_DIR}

# Função para fazer backup do dashboard
backup_dashboard() {
  echo "Iniciando backup do dashboard..."
  
  # Faz o download do dashboard
  curl -s -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
       "${GRAFANA_URL}/api/dashboards/uid/${DASHBOARD_UID}" \
       -o ${BACKUP_FILE}
  
  if [ $? -eq 0 ]; then
    echo "Backup concluído com sucesso: ${BACKUP_FILE}"
    
    # Cria um link simbólico para o backup mais recente
    ln -sf ${BACKUP_FILE} ${BACKUP_DIR}/payment-dashboard_latest.json
    
    # Mantém apenas os 5 backups mais recentes
    ls -t ${BACKUP_DIR}/payment-dashboard_*.json | tail -n +6 | xargs -r rm
  else
    echo "Erro ao fazer backup do dashboard"
    exit 1
  fi
}

# Função para restaurar o dashboard
restore_dashboard() {
  local source_file=$1
  
  if [ -z "$source_file" ]; then
    source_file="${BACKUP_DIR}/payment-dashboard_latest.json"
  fi
  
  if [ ! -f "$source_file" ]; then
    echo "Arquivo de backup não encontrado: $source_file"
    exit 1
  fi
  
  echo "Restaurando dashboard a partir de: $source_file"
  
  # Prepara o payload para restauração
  local dashboard_json=$(cat ${source_file})
  
  # Faz a restauração
  curl -s -X POST -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
       -H "Content-Type: application/json" \
       -d "{\"dashboard\": ${dashboard_json}, \"overwrite\": true}" \
       "${GRAFANA_URL}/api/dashboards/db"
  
  if [ $? -eq 0 ]; then
    echo "Dashboard restaurado com sucesso"
  else
    echo "Erro ao restaurar o dashboard"
    exit 1
  fi
}

# Função para listar backups disponíveis
list_backups() {
  echo "Backups disponíveis:"
  ls -lh ${BACKUP_DIR}/payment-dashboard_*.json 2>/dev/null | awk '{print $9 " - " $6 " " $7 " " $8}'
}

# Menu de ajuda
show_help() {
  echo "Uso: $0 [opção]"
  echo ""
  echo "Opções:"
  echo "  backup              Faz backup do dashboard atual"
  echo "  restore [arquivo]   Restaura o dashboard a partir de um arquivo de backup"
  echo "  list                Lista todos os backups disponíveis"
  echo "  help                Mostra esta mensagem de ajuda"
  echo ""
  echo "Exemplos:"
  echo "  $0 backup"
  echo "  $0 restore"
  echo "  $0 restore ./backups/dashboards/payment-dashboard_20240101_120000.json"
  echo "  $0 list"
}

# Processamento dos argumentos
case "$1" in
  backup)
    backup_dashboard
    ;;
  restore)
    restore_dashboard "$2"
    ;;
  list)
    list_backups
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    show_help
    exit 1
    ;;
esac

exit 0 