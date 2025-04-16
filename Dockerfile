# Etapa de build
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma

# Gerar cliente Prisma
RUN npx prisma generate

# Criar diretório para logs
RUN mkdir -p /app/logs

EXPOSE 3333
CMD ["npm", "start"] 