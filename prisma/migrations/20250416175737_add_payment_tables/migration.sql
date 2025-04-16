/*
  Warnings:

  - The `status` column on the `pedidos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoUsuario` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pagamento` on the `pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CLIENTE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT_CARD', 'PIX', 'BANK_SLIP');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENCIAL', 'COMERCIAL');

-- AlterTable
ALTER TABLE "enderecos" ADD COLUMN     "principal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tipo" "AddressType" NOT NULL DEFAULT 'RESIDENCIAL';

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "pagamento",
ADD COLUMN     "pagamento" "PaymentType" NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipoUsuario",
ADD COLUMN     "tipoUsuario" "UserType" NOT NULL DEFAULT 'CLIENTE';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "twoFactorSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "externalReference" TEXT,
    "status" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "paymentMethod" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "payerEmail" TEXT,
    "payerName" TEXT,
    "payerDocument" TEXT,
    "installments" INTEGER,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_logs_paymentId_key" ON "webhook_logs"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_paymentId_key" ON "payments"("paymentId");

-- CreateIndex
CREATE INDEX "enderecos_usuarioId_idx" ON "enderecos"("usuarioId");

-- CreateIndex
CREATE INDEX "pedidos_status_idx" ON "pedidos"("status");
