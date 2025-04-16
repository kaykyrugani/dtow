const axios = require('axios');
const crypto = require('crypto');
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
const paymentIdArg = process.argv.find(arg => arg.startsWith('--paymentId='));
const statusArg = process.argv.find(arg => arg.startsWith('--status='));

if (!paymentIdArg || !statusArg) {
  console.error(chalk.red('❌ Argumentos inválidos'));
  console.log(chalk.yellow('Uso: node simulate-webhook.js --paymentId=123 --status=approved [--debug]'));
  console.log(chalk.yellow('\nStatus disponíveis:'));
  console.log(chalk.yellow('- approved (pagamento aprovado)'));
  console.log(chalk.yellow('- pending (aguardando pagamento)'));
  console.log(chalk.yellow('- rejected (pagamento rejeitado)'));
  console.log(chalk.yellow('- cancelled (pagamento cancelado)'));
  console.log(chalk.yellow('- refunded (pagamento reembolsado)'));
  process.exit(1);
}

const paymentId = paymentIdArg.split('=')[1];
const status = statusArg.split('=')[1];
const debug = process.argv.includes('--debug');

// Valida status
const validStatus = ['approved', 'pending', 'rejected', 'cancelled', 'refunded'];
if (!validStatus.includes(status)) {
  console.error(chalk.red(`❌ Status inválido: ${status}`));
  console.error(chalk.red('Status válidos:', validStatus.join(', ')));
  process.exit(1);
}

// Gera assinatura do webhook
function generateSignature(payload) {
  const hmac = crypto.createHmac('sha256', envConfig.webhookSecret);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

// Monta payload do webhook
function buildPayload(paymentId, status) {
  const basePayload = {
    action: 'payment.updated',
    data: {
      id: paymentId
    }
  };

  // Adiciona dados específicos por status
  switch (status) {
    case 'approved':
      basePayload.data.status = 'approved';
      basePayload.data.status_detail = 'accredited';
      break;
    case 'pending':
      basePayload.data.status = 'pending';
      basePayload.data.status_detail = 'pending_waiting_payment';
      break;
    case 'rejected':
      basePayload.data.status = 'rejected';
      basePayload.data.status_detail = 'cc_rejected_bad_filled_security_code';
      break;
    case 'cancelled':
      basePayload.data.status = 'cancelled';
      basePayload.data.status_detail = 'expired';
      break;
    case 'refunded':
      basePayload.data.status = 'refunded';
      basePayload.data.status_detail = 'refunded';
      break;
  }

  return basePayload;
}

// Envia webhook
async function sendWebhook(payload) {
  const signature = generateSignature(payload);

  if (debug) {
    console.log(chalk.yellow('\n📦 Payload:'));
    console.log(chalk.yellow(JSON.stringify(payload, null, 2)));
    console.log(chalk.yellow('\n🔑 Assinatura:'));
    console.log(chalk.yellow(signature));
  }

  try {
    const response = await axios.post(envConfig.webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature
      }
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Função principal
async function main() {
  console.log(chalk.blue('=================================================='));
  console.log(chalk.blue('🔄 Simulador de Webhook - Mercado Pago'));
  console.log(chalk.blue('=================================================='));

  if (debug) {
    console.log(chalk.yellow('🐛 Modo debug ativado'));
    console.log(chalk.yellow(`🌍 Ambiente: ${env}`));
    console.log(chalk.yellow(`🔗 URL do webhook: ${envConfig.webhookUrl}`));
  }

  console.log(chalk.blue(`\n📝 Simulando webhook para pagamento ${paymentId}`));
  console.log(chalk.blue(`📊 Status: ${status}`));

  try {
    const payload = buildPayload(paymentId, status);
    const response = await sendWebhook(payload);

    console.log(chalk.green('\n✨ Webhook enviado com sucesso!'));
    console.log(chalk.green(`Status: ${response.status}`));
    console.log(chalk.green(`Resposta: ${JSON.stringify(response.data)}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Erro ao enviar webhook:'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  console.log(chalk.blue('\n=================================================='));
  console.log(chalk.green('✅ Processo finalizado com sucesso!'));
  console.log(chalk.blue('=================================================='));
}

// Executa o script
main().catch(error => {
  console.error(chalk.red('\n❌ Erro inesperado:'));
  console.error(chalk.red(error));
  process.exit(1); 