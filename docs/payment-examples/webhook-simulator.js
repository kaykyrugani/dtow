const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const chalk = require('chalk');

// Configuração
const DEBUG = process.argv.includes('--debug');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

// Validação inicial
if (!envConfig) {
  console.error(chalk.red(`❌ Ambiente ${env} não configurado em config.json`));
  process.exit(1);
}

// Valida argumentos
const paymentId = process.argv.find(arg => !arg.startsWith('--') && arg !== 'webhook-simulator.js');
const status = process.argv.find(arg => ['approved', 'pending', 'rejected', 'cancelled', 'refunded'].includes(arg));

if (!paymentId || !status) {
  console.error(chalk.yellow('⚠️  Uso: node webhook-simulator.js PAYMENT_ID STATUS [--debug]'));
  console.error(chalk.yellow('Exemplo: node webhook-simulator.js 123456789 approved'));
  console.error(chalk.yellow('Status disponíveis: approved, pending, rejected, cancelled, refunded'));
  process.exit(1);
}

// Gera assinatura HMAC-SHA256
function generateSignature(payload) {
  const hmac = crypto.createHmac('sha256', envConfig.WEBHOOK_SECRET);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

// Busca dados do pagamento no Mercado Pago
async function getPaymentData(paymentId) {
  console.log(chalk.blue(`🔍 Buscando dados do pagamento ${paymentId}...`));
  
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${envConfig.MP_ACCESS_TOKEN}`
        }
      }
    );
    
    if (DEBUG) {
      console.log(chalk.gray('📦 Resposta do Mercado Pago:'));
      console.log(chalk.gray(JSON.stringify(response.data, null, 2)));
    }
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Pagamento não encontrado');
    }
    throw new Error(`Erro ao buscar pagamento: ${error.message}`);
  }
}

// Simula dados do webhook
function simulateWebhookData(paymentData, status) {
  const statusDetails = {
    approved: 'accredited',
    pending: 'pending',
    rejected: 'cc_rejected_other_reason',
    cancelled: 'cancelled',
    refunded: 'refunded'
  };
  
  const paymentMethods = {
    approved: 'credit_card',
    pending: 'credit_card',
    rejected: 'credit_card',
    cancelled: 'credit_card',
    refunded: 'credit_card'
  };
  
  const transactionDetails = {
    approved: {
      net_received_amount: paymentData.transaction_amount || 1000,
      total_paid_amount: paymentData.transaction_amount || 1000,
      transaction_id: paymentData.id,
      payment_method_id: paymentMethods[status],
      payment_type_id: paymentMethods[status],
      installments: 1
    },
    pending: {
      net_received_amount: 0,
      total_paid_amount: 0,
      transaction_id: null,
      payment_method_id: paymentMethods[status],
      payment_type_id: paymentMethods[status],
      installments: 0
    },
    rejected: {
      net_received_amount: 0,
      total_paid_amount: 0,
      transaction_id: null,
      payment_method_id: paymentMethods[status],
      payment_type_id: paymentMethods[status],
      installments: 0
    },
    cancelled: {
      net_received_amount: 0,
      total_paid_amount: 0,
      transaction_id: null,
      payment_method_id: paymentMethods[status],
      payment_type_id: paymentMethods[status],
      installments: 0
    },
    refunded: {
      net_received_amount: 0,
      total_paid_amount: 0,
      transaction_id: paymentData.id,
      payment_method_id: paymentMethods[status],
      payment_type_id: paymentMethods[status],
      installments: 1
    }
  };
  
  return {
    action: 'payment.updated',
    data: {
      id: paymentData.id,
      status: status,
      status_detail: statusDetails[status],
      transaction_details: transactionDetails[status],
      external_reference: paymentData.external_reference || `ORDER-${paymentData.id}`
    }
  };
}

// Envia webhook
async function sendWebhook(payload) {
  console.log(chalk.blue('📤 Preparando webhook...'));
  
  if (DEBUG) {
    console.log(chalk.gray('📦 Payload do webhook:'));
    console.log(chalk.gray(JSON.stringify(payload, null, 2)));
  }

  const signature = generateSignature(payload);
  
  if (DEBUG) {
    console.log(chalk.gray('🔑 Assinatura gerada:'));
    console.log(chalk.gray(signature));
  }

  try {
    console.log(chalk.blue('🚀 Enviando webhook...'));
    
    const response = await axios.post(envConfig.WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature
      }
    });

    if (response.status !== 200) {
      throw new Error(`Status inesperado: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar webhook: ${error.message}`);
  }
}

// Função principal
async function main() {
  console.log(chalk.cyan('='.repeat(50)));
  console.log(chalk.cyan('🔄 Simulador de Webhooks - Mercado Pago'));
  console.log(chalk.cyan('='.repeat(50)));
  
  if (DEBUG) {
    console.log(chalk.gray('🐛 Modo debug ativado'));
    console.log(chalk.gray(`🌍 Ambiente: ${env}`));
    console.log(chalk.gray(`🔗 URL do webhook: ${envConfig.WEBHOOK_URL}`));
  }
  
  try {
    console.log(chalk.blue(`\n📝 Simulando webhook para pagamento ${paymentId} com status ${status}`));
    
    const paymentData = await getPaymentData(paymentId);
    console.log(chalk.green('\n✅ Dados do pagamento recuperados:'));
    console.log(chalk.white(JSON.stringify(paymentData, null, 2)));
    
    const webhookData = simulateWebhookData(paymentData, status);
    console.log(chalk.green('\n✅ Dados do webhook simulados:'));
    console.log(chalk.white(JSON.stringify(webhookData, null, 2)));
    
    const result = await sendWebhook(webhookData);
    console.log(chalk.green('\n✨ Webhook enviado com sucesso!'));
    console.log(chalk.white('Status:', result.status));
    console.log(chalk.white('Resposta:', JSON.stringify(result.data)));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Erro:'), error.message);
    process.exit(1);
  }
  
  console.log(chalk.cyan('\n' + '='.repeat(50)));
  console.log(chalk.green('✅ Simulação concluída com sucesso!'));
  console.log(chalk.cyan('='.repeat(50)));
}

main(); 