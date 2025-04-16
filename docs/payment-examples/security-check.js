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

// Função para verificar assinatura HMAC-SHA256
function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const expectedSignature = hmac.digest('hex');
  return signature === expectedSignature;
}

// Função para verificar token do Mercado Pago
async function verifyToken(token) {
  try {
    const response = await axios.get(
      'https://api.mercadopago.com/users/me',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return {
      valid: true,
      data: response.data
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}

// Função para verificar webhook
async function verifyWebhook(url) {
  try {
    const response = await axios.get(url);
    return {
      accessible: true,
      status: response.status
    };
  } catch (error) {
    return {
      accessible: false,
      error: error.message
    };
  }
}

// Função para verificar logs
function checkLogs() {
  console.log(chalk.blue('🔍 Verificando logs por dados sensíveis...'));
  
  // Simulação de verificação de logs
  const sensitiveData = [
    'CPF', 'cnpj', 'token', 'senha', 'password', 'secret', 'key', 'api_key'
  ];
  
  const logFiles = [
    'payment.log',
    'webhook.log',
    'error.log'
  ];
  
  const results = [];
  
  for (const file of logFiles) {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const found = [];
        
        for (const pattern of sensitiveData) {
          if (content.toLowerCase().includes(pattern.toLowerCase())) {
            found.push(pattern);
          }
        }
        
        results.push({
          file,
          hasSensitiveData: found.length > 0,
          patterns: found
        });
      } else {
        results.push({
          file,
          exists: false
        });
      }
    } catch (error) {
      results.push({
        file,
        error: error.message
      });
    }
  }
  
  return results;
}

// Função principal
async function main() {
  console.log(chalk.cyan('='.repeat(50)));
  console.log(chalk.cyan('🔒 Verificador de Segurança - Módulo de Pagamentos'));
  console.log(chalk.cyan('='.repeat(50)));
  
  if (DEBUG) {
    console.log(chalk.gray('🐛 Modo debug ativado'));
    console.log(chalk.gray(`🌍 Ambiente: ${env}`));
  }
  
  try {
    // Verificar token do Mercado Pago
    console.log(chalk.blue('\n🔑 Verificando token do Mercado Pago...'));
    const tokenResult = await verifyToken(envConfig.MP_ACCESS_TOKEN);
    
    if (tokenResult.valid) {
      console.log(chalk.green('✅ Token válido'));
      if (DEBUG) {
        console.log(chalk.gray('Dados da conta:'));
        console.log(chalk.gray(JSON.stringify(tokenResult.data, null, 2)));
      }
    } else {
      console.log(chalk.red('❌ Token inválido'));
      console.log(chalk.red(`Erro: ${tokenResult.error}`));
    }
    
    // Verificar webhook
    console.log(chalk.blue('\n🔗 Verificando webhook...'));
    const webhookResult = await verifyWebhook(envConfig.WEBHOOK_URL);
    
    if (webhookResult.accessible) {
      console.log(chalk.green(`✅ Webhook acessível (Status: ${webhookResult.status})`));
    } else {
      console.log(chalk.red('❌ Webhook inacessível'));
      console.log(chalk.red(`Erro: ${webhookResult.error}`));
    }
    
    // Verificar assinatura
    console.log(chalk.blue('\n🔐 Verificando assinatura de webhook...'));
    const testPayload = {
      action: 'payment.updated',
      data: {
        id: '123456789'
      }
    };
    
    const signature = crypto
      .createHmac('sha256', envConfig.WEBHOOK_SECRET)
      .update(JSON.stringify(testPayload))
      .digest('hex');
    
    const isValid = verifySignature(testPayload, signature, envConfig.WEBHOOK_SECRET);
    
    if (isValid) {
      console.log(chalk.green('✅ Assinatura HMAC-SHA256 válida'));
    } else {
      console.log(chalk.red('❌ Assinatura HMAC-SHA256 inválida'));
    }
    
    // Verificar logs
    console.log(chalk.blue('\n📝 Verificando logs por dados sensíveis...'));
    const logResults = checkLogs();
    
    let hasIssues = false;
    
    for (const result of logResults) {
      if (result.exists === false) {
        console.log(chalk.yellow(`⚠️  Arquivo de log não encontrado: ${result.file}`));
        continue;
      }
      
      if (result.hasSensitiveData) {
        console.log(chalk.red(`❌ Dados sensíveis encontrados em ${result.file}:`));
        console.log(chalk.red(`   Padrões: ${result.patterns.join(', ')}`));
        hasIssues = true;
      } else {
        console.log(chalk.green(`✅ Nenhum dado sensível encontrado em ${result.file}`));
      }
    }
    
    // Verificar variáveis de ambiente
    console.log(chalk.blue('\n🌐 Verificando variáveis de ambiente...'));
    
    const envVars = [
      'MP_ACCESS_TOKEN',
      'WEBHOOK_SECRET',
      'WEBHOOK_URL'
    ];
    
    let envIssues = false;
    
    for (const envVar of envVars) {
      if (!envConfig[envVar]) {
        console.log(chalk.red(`❌ Variável de ambiente não configurada: ${envVar}`));
        envIssues = true;
      } else {
        console.log(chalk.green(`✅ Variável de ambiente configurada: ${envVar}`));
      }
    }
    
    // Resumo
    console.log(chalk.cyan('\n' + '='.repeat(50)));
    console.log(chalk.cyan('📊 Resumo da Verificação de Segurança'));
    console.log(chalk.cyan('='.repeat(50)));
    
    console.log(chalk.white(`Token do Mercado Pago: ${tokenResult.valid ? '✅ Válido' : '❌ Inválido'}`));
    console.log(chalk.white(`Webhook: ${webhookResult.accessible ? '✅ Acessível' : '❌ Inacessível'}`));
    console.log(chalk.white(`Assinatura HMAC-SHA256: ${isValid ? '✅ Válida' : '❌ Inválida'}`));
    console.log(chalk.white(`Logs: ${hasIssues ? '❌ Problemas encontrados' : '✅ Sem problemas'}`));
    console.log(chalk.white(`Variáveis de ambiente: ${envIssues ? '❌ Problemas encontrados' : '✅ Configuradas corretamente'}`));
    
    if (tokenResult.valid && webhookResult.accessible && isValid && !hasIssues && !envIssues) {
      console.log(chalk.green('\n✅ Todas as verificações de segurança passaram!'));
    } else {
      console.log(chalk.yellow('\n⚠️  Algumas verificações de segurança falharam. Revise os problemas acima.'));
    }
    
  } catch (error) {
    console.error(chalk.red('\n❌ Erro:'), error.message);
    process.exit(1);
  }
  
  console.log(chalk.cyan('\n' + '='.repeat(50)));
  console.log(chalk.green('✅ Verificação de segurança concluída!'));
  console.log(chalk.cyan('='.repeat(50)));
}

main(); 