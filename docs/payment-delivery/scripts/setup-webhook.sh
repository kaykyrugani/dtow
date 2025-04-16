#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Configurando webhook para testes locais...${NC}"

# Verificar se ngrok está instalado
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok não encontrado. Instalando..."
    npm install -g ngrok
fi

# Verificar se o servidor está rodando
if ! curl -s http://localhost:3000/health &> /dev/null; then
    echo "❌ Servidor não está rodando na porta 3000"
    echo "Por favor, inicie o servidor primeiro"
    exit 1
fi

# Iniciar ngrok
echo -e "${GREEN}✅ Iniciando ngrok...${NC}"
ngrok http 3000 --log=stdout > ngrok.log &

# Esperar ngrok iniciar
sleep 2

# Pegar URL do ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [ -z "$NGROK_URL" ]; then
    echo "❌ Falha ao obter URL do ngrok"
    exit 1
fi

echo -e "${GREEN}✅ ngrok iniciado com sucesso!${NC}"
echo -e "${BLUE}🌐 URL do webhook: ${NGROK_URL}/payment/webhook${NC}"
echo -e "${BLUE}📝 Configure esta URL no painel do Mercado Pago${NC}"
echo -e "${BLUE}📊 Acesse http://localhost:4040 para monitorar requisições${NC}"

# Manter script rodando
echo -e "${BLUE}⏳ Pressione Ctrl+C para encerrar${NC}"
wait 