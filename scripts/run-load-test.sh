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

# Verificar se o Artillery está instalado
if ! command -v artillery &> /dev/null; then
  echo "Artillery não está instalado. Instalando..."
  npm install -g artillery
fi

# Verificar se o servidor está rodando
if ! curl -s http://localhost:3000/health &> /dev/null; then
  error "Servidor não está rodando em http://localhost:3000"
  exit 1
fi

# Diretório de resultados
RESULTS_DIR="./test-results"
mkdir -p $RESULTS_DIR

# Nome do arquivo de resultado
TIMESTAMP=$(date +%Y%m%d%H%M%S)
RESULT_FILE="$RESULTS_DIR/load-test-$TIMESTAMP.json"
REPORT_FILE="$RESULTS_DIR/load-test-$TIMESTAMP.html"

# Executar o teste de carga
echo "Iniciando teste de carga..."
artillery run load-test.yml

# Gerar relatório
echo "Gerando relatório..."
artillery report artillery-report.json

# Exibir resultados
log "Teste de carga concluído!"
log "Relatório HTML gerado em: $REPORT_FILE"
log "Resultados brutos em: $RESULT_FILE"

# Exibir métricas principais
log "Métricas principais:"
artillery stats $RESULT_FILE 