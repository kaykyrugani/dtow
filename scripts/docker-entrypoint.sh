#!/bin/sh

# Aguardar o PostgreSQL iniciar
echo "Aguardando o PostgreSQL iniciar..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL iniciado!"

# Executar migrações
echo "Executando migrações..."
npx prisma migrate deploy

# Gerar cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Iniciar a aplicação
echo "Iniciando a aplicação..."
exec "$@" 