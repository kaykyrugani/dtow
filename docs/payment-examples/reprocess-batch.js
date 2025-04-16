const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { spawn } = require('child_process');

// Valida argumentos
const fileArg = process.argv.find(arg => arg.startsWith('--file='));
if (!fileArg) {
  console.error(chalk.red('❌ Arquivo de pagamentos não fornecido'));
  console.log(chalk.yellow('Uso: node reprocess-batch.js --file=payments.json [--debug]'));
  process.exit(1);
}

const inputFile = fileArg.split('=')[1];
const debug = process.argv.includes('--debug');

// Valida arquivo de entrada
if (!fs.existsSync(inputFile)) {
  console.error(chalk.red(`❌ Arquivo ${inputFile} não encontrado`));
  process.exit(1);
}

// Lê arquivo de pagamentos
let payments;
try {
  payments = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  if (!Array.isArray(payments)) {
    throw new Error('O arquivo deve conter um array de IDs de pagamento');
  }
} catch (error) {
  console.error(chalk.red('❌ Erro ao ler arquivo de pagamentos:'));
  console.error(chalk.red(error.message));
  process.exit(1);
}

console.log(chalk.blue('=================================================='));
console.log(chalk.blue('🔄 Reprocessador de Webhooks em Lote'));
console.log(chalk.blue('=================================================='));

console.log(chalk.blue(`\n📝 Total de pagamentos: ${payments.length}`));

// Processa pagamentos em série
async function processPayments() {
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (const [index, paymentId] of payments.entries()) {
    console.log(chalk.blue(`\n🔄 Processando pagamento ${index + 1}/${payments.length}: ${paymentId}`));
    
    try {
      await new Promise((resolve, reject) => {
        const args = [path.join(__dirname, 'reprocess-webhook.js'), paymentId];
        if (debug) args.push('--debug');
        
        const child = spawn('node', args, { stdio: 'inherit' });
        
        child.on('close', (code) => {
          if (code === 0) {
            results.success++;
            resolve();
          } else {
            results.failed++;
            results.errors.push({ paymentId, code });
            reject(new Error(`Processo falhou com código ${code}`));
          }
        });
      });
    } catch (error) {
      console.error(chalk.red(`\n❌ Erro ao processar pagamento ${paymentId}:`));
      console.error(chalk.red(error.message));
    }
  }

  return results;
}

// Executa processamento
processPayments()
  .then(results => {
    console.log(chalk.blue('\n=================================================='));
    console.log(chalk.blue('📊 Resumo do Processamento'));
    console.log(chalk.blue('=================================================='));
    console.log(chalk.green(`✅ Sucesso: ${results.success}`));
    console.log(chalk.red(`❌ Falhas: ${results.failed}`));
    
    if (results.errors.length > 0) {
      console.log(chalk.yellow('\n⚠️  Pagamentos com erro:'));
      results.errors.forEach(({ paymentId, code }) => {
        console.log(chalk.yellow(`- ${paymentId} (código ${code})`));
      });
    }
    
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error(chalk.red('\n❌ Erro inesperado:'));
    console.error(chalk.red(error));
    process.exit(1);
  }); 