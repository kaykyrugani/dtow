#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Nome do pacote
PACKAGE_NAME="payment-scripts"
VERSION="1.0.0"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="${PACKAGE_NAME}_v${VERSION}_${TIMESTAMP}.zip"

echo -e "${BLUE}📦 Gerando pacote de scripts de pagamento...${NC}"

# Cria diretório temporário
TEMP_DIR=$(mktemp -d)
mkdir -p "${TEMP_DIR}/${PACKAGE_NAME}"

# Copia arquivos
echo -e "${BLUE}📋 Copiando arquivos...${NC}"
cp reprocess-webhook.js "${TEMP_DIR}/${PACKAGE_NAME}/"
cp reprocess-batch.js "${TEMP_DIR}/${PACKAGE_NAME}/"
cp simulate-webhook.js "${TEMP_DIR}/${PACKAGE_NAME}/"
cp package.json "${TEMP_DIR}/${PACKAGE_NAME}/"
cp README.md "${TEMP_DIR}/${PACKAGE_NAME}/"
cp payments.json "${TEMP_DIR}/${PACKAGE_NAME}/"

# Cria arquivo de configuração exemplo
echo -e "${BLUE}⚙️  Criando arquivo de configuração exemplo...${NC}"
cat > "${TEMP_DIR}/${PACKAGE_NAME}/config.json.example" << EOL
{
  "development": {
    "mpAccessToken": "TEST-0000000000000000-000000-00000000000000000000000000000000-000000000",
    "webhookUrl": "http://localhost:3000/api/payment/webhook",
    "webhookSecret": "your-webhook-secret-here"
  },
  "production": {
    "mpAccessToken": "APP-0000000000000000-000000-00000000000000000000000000000000-000000000",
    "webhookUrl": "https://api.seudominio.com/api/payment/webhook",
    "webhookSecret": "your-production-webhook-secret-here"
  }
}
EOL

# Cria arquivo .gitignore
echo -e "${BLUE}🔒 Criando .gitignore...${NC}"
cat > "${TEMP_DIR}/${PACKAGE_NAME}/.gitignore" << EOL
# Dependências
node_modules/

# Configurações
config.json

# Logs
*.log

# Arquivos de ambiente
.env
.env.*

# Arquivos do sistema
.DS_Store
Thumbs.db
EOL

# Gera o arquivo ZIP
echo -e "${BLUE}📦 Gerando arquivo ZIP...${NC}"
cd "${TEMP_DIR}"
zip -r "${ZIP_NAME}" "${PACKAGE_NAME}"

# Move o ZIP para o diretório atual
mv "${ZIP_NAME}" "$(pwd)/"

# Limpa diretório temporário
rm -rf "${TEMP_DIR}"

echo -e "${GREEN}✅ Pacote gerado com sucesso: ${ZIP_NAME}${NC}"
echo -e "${BLUE}📋 Conteúdo do pacote:${NC}"
unzip -l "${ZIP_NAME}"

echo -e "\n${GREEN}🎉 Pronto! O pacote está pronto para uso.${NC}"
echo -e "${BLUE}💡 Dica: Execute 'unzip ${ZIP_NAME}' para extrair os arquivos.${NC}" 