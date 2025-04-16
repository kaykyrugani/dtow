const axios = require('axios');
const crypto = require('crypto');

class WebhookSimulator {
  constructor(baseUrl, webhookSecret) {
    this.baseUrl = baseUrl;
    this.webhookSecret = webhookSecret;
  }

  // Gerar assinatura do webhook
  generateSignature(payload) {
    const hmac = crypto.createHmac('sha1', this.webhookSecret);
    hmac.update(JSON.stringify(payload));
    return `sha1=${hmac.digest('hex')}`;
  }

  // Simular pagamento aprovado
  async simulateApprovedPayment(paymentId) {
    const payload = {
      action: 'payment.updated',
      data: {
        id: paymentId,
        status: 'approved',
        status_detail: 'accredited',
        transaction_details: {
          net_received_amount: 1000,
          total_paid_amount: 1000,
          transaction_id: '123456789'
        }
      }
    };

    return this.sendWebhook(payload);
  }

  // Simular pagamento pendente
  async simulatePendingPayment(paymentId) {
    const payload = {
      action: 'payment.updated',
      data: {
        id: paymentId,
        status: 'pending',
        status_detail: 'pending_review',
        transaction_details: {
          net_received_amount: 0,
          total_paid_amount: 1000,
          transaction_id: '123456789'
        }
      }
    };

    return this.sendWebhook(payload);
  }

  // Simular pagamento rejeitado
  async simulateRejectedPayment(paymentId) {
    const payload = {
      action: 'payment.updated',
      data: {
        id: paymentId,
        status: 'rejected',
        status_detail: 'cc_rejected_other_reason',
        transaction_details: {
          net_received_amount: 0,
          total_paid_amount: 0,
          transaction_id: '123456789'
        }
      }
    };

    return this.sendWebhook(payload);
  }

  // Enviar webhook
  async sendWebhook(payload) {
    try {
      const signature = this.generateSignature(payload);
      
      const response = await axios.post(`${this.baseUrl}/payment/webhook`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature': signature
        }
      });

      console.log('✅ Webhook enviado com sucesso!');
      console.log('📝 Status:', response.status);
      console.log('📦 Resposta:', response.data);
      
      return response;
    } catch (error) {
      console.error('❌ Erro ao enviar webhook:', error.message);
      if (error.response) {
        console.error('📝 Status:', error.response.status);
        console.error('📦 Resposta:', error.response.data);
      }
      throw error;
    }
  }
}

// Exemplo de uso
async function main() {
  const simulator = new WebhookSimulator(
    'http://localhost:3000',
    process.env.MERCADO_PAGO_WEBHOOK_SECRET
  );

  const paymentId = process.argv[2] || '123456789';
  const status = process.argv[3] || 'approved';

  console.log('🚀 Simulador de Webhook - OnlyWave');
  console.log('--------------------------------');
  console.log('📝 Payment ID:', paymentId);
  console.log('📝 Status:', status);
  console.log('--------------------------------');

  try {
    switch (status) {
      case 'approved':
        await simulator.simulateApprovedPayment(paymentId);
        break;
      case 'pending':
        await simulator.simulatePendingPayment(paymentId);
        break;
      case 'rejected':
        await simulator.simulateRejectedPayment(paymentId);
        break;
      default:
        console.error('❌ Status inválido. Use: approved, pending ou rejected');
    }
  } catch (error) {
    console.error('❌ Falha na simulação');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = WebhookSimulator; 