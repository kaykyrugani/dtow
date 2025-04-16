-- CreateIndex
CREATE INDEX "payments_paymentId_idx" ON "payments"("paymentId");

-- CreateIndex
CREATE INDEX "payments_externalReference_idx" ON "payments"("externalReference");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_processedAt_idx" ON "payments"("processedAt");

-- CreateIndex
CREATE INDEX "webhook_logs_paymentId_idx" ON "webhook_logs"("paymentId");

-- CreateIndex
CREATE INDEX "webhook_logs_processedAt_idx" ON "webhook_logs"("processedAt");
