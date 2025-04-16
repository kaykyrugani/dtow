const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const chalk = require('chalk');

// Carrega configurações
const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

if (!envConfig) {
  console.error(chalk.red(`❌ Ambiente ${env} não configurado no config.json`));
  process.exit(1);
}

// Valida argumentos
const paymentId = process.argv[2];
if (!paymentId) {
  console.error(chalk.red('❌ ID do pagamento não fornecido'));
  console.log(chalk.yellow('Uso: node reprocess-webhook.js <payment_id>'));
  process.exit(1);
}

// Gera assinatura do webhook
function generateSignature(payload) {
  const hmac = crypto.createHmac('sha256', envConfig.webhookSecret);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

// Busca dados do pagamento
async function getPaymentData(paymentId) {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${envConfig.mpAccessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(chalk.red('❌ Erro ao buscar dados do pagamento:'));
    console.error(chalk.red(error.response?.data || error.message));
    process.exit(1);
  }
}

// Envia webhook
async function sendWebhook(paymentData) {
  const payload = {
    action: 'payment.updated',
    data: {
      id: paymentData.id,
    },
  };

  const signature = generateSignature(payload);

  try {
    const response = await axios.post(envConfig.webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature,
      },
    });

    console.log(chalk.green('✨ Webhook enviado com sucesso!'));
    console.log(chalk.green(`Status: ${response.status}`));
    console.log(chalk.green(`Resposta: ${JSON.stringify(response.data)}`));
  } catch (error) {
    console.error(chalk.red('❌ Erro ao enviar webhook:'));
    console.error(chalk.red(error.response?.data || error.message));
    process.exit(1);
  }
}

// Função principal
async function main() {
  console.log(chalk.blue('=================================================='));
  console.log(chalk.blue('🔄 Reprocessador de Webhooks - Mercado Pago'));
  console.log(chalk.blue('=================================================='));

  if (process.argv.includes('--debug')) {
    console.log(chalk.yellow('🐛 Modo debug ativado'));
    console.log(chalk.yellow(`🌍 Ambiente: ${env}`));
    console.log(chalk.yellow(`🔗 URL do webhook: ${envConfig.webhookUrl}`));
  }

  console.log(chalk.blue(`\n📝 Iniciando reprocessamento para pagamento ${paymentId}`));
  
  console.log(chalk.blue('\n🔍 Buscando dados do pagamento...'));
  const paymentData = await getPaymentData(paymentId);
  
  if (process.argv.includes('--debug')) {
    console.log(chalk.yellow('\n📦 Dados do pagamento:'));
    console.log(chalk.yellow(JSON.stringify(paymentData, null, 2)));
  }

  console.log(chalk.blue('\n📤 Enviando webhook...'));
  await sendWebhook(paymentData);

  console.log(chalk.blue('\n=================================================='));
  console.log(chalk.green('✅ Processo finalizado com sucesso!'));
  console.log(chalk.blue('=================================================='));
}

// Executa o script
main().catch((error) => {
  console.error(chalk.red('\n❌ Erro inesperado:'));
  console.error(chalk.red(error));
  process.exit(1); 