-- CreateEnum
CREATE TYPE "StatusAvaliacao" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nota" SMALLINT NOT NULL,
    "comentario" TEXT,
    "status" "StatusAvaliacao" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "avaliacoes_produtoId_idx" ON "avaliacoes"("produtoId");

-- CreateIndex
CREATE INDEX "avaliacoes_usuarioId_idx" ON "avaliacoes"("usuarioId");

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN "mediaAvaliacoes" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN "totalAvaliacoes" INTEGER DEFAULT 0; 