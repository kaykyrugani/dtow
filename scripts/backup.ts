import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { LoggerService } from '../src/utils/LoggerService';

const execAsync = promisify(exec);

const BACKUP_DIR = join(__dirname, '../backups');
const DB_URL = process.env.DATABASE_URL || '';

if (!DB_URL) {
  throw new Error('DATABASE_URL não definida');
}

// Extrai informações da conexão da DATABASE_URL
const dbInfo = new URL(DB_URL.replace('postgresql://', 'http://'));
const DB_NAME = dbInfo.pathname.slice(1);
const DB_USER = dbInfo.username;
const DB_PASS = dbInfo.password;
const DB_HOST = dbInfo.hostname;
const DB_PORT = dbInfo.port;

async function createBackup() {
  try {
    // Cria diretório de backup se não existir
    if (!existsSync(BACKUP_DIR)) {
      mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${date}.sql`;
    const filepath = join(BACKUP_DIR, filename);

    // Comando pg_dump com credenciais do ambiente
    const command = [
      'PGPASSWORD=' + DB_PASS,
      'pg_dump',
      `-h ${DB_HOST}`,
      `-p ${DB_PORT}`,
      `-U ${DB_USER}`,
      `-F p`, // Formato plain text
      `-f ${filepath}`,
      DB_NAME
    ].join(' ');

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      LoggerService.warn('Avisos durante backup:', stderr);
    }

    LoggerService.info('Backup criado com sucesso:', {
      file: filepath,
      size: (await execAsync(`stat -f %z ${filepath}`)).stdout.trim()
    });

    // Limpa backups antigos (mantém últimos 7)
    const { stdout: files } = await execAsync(`ls -t ${BACKUP_DIR}/backup-*.sql`);
    const oldFiles = files.split('\n').filter(Boolean).slice(7);
    
    for (const file of oldFiles) {
      await execAsync(`rm ${file}`);
      LoggerService.info('Backup antigo removido:', { file });
    }

  } catch (error) {
    LoggerService.error('Erro ao criar backup:', error);
    process.exit(1);
  }
}

// Executa backup
createBackup(); 