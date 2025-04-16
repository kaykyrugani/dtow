import { exec } from 'child_process';
import { S3 } from 'aws-sdk';
import { promisify } from 'util';
import { config } from 'dotenv';
import { logger } from '../src/utils/logger';

config();

const execAsync = promisify(exec);
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function backup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    
    logger.info('Iniciando backup do banco de dados...');

    // Backup do PostgreSQL
    await execAsync(`pg_dump -U ${process.env.DB_USER} -d ${process.env.DB_NAME} > ${filename}`);
    
    logger.info('Backup local criado com sucesso');

    // Upload para S3
    await s3.upload({
      Bucket: process.env.BACKUP_BUCKET!,
      Key: filename,
      Body: require('fs').createReadStream(filename)
    }).promise();
    
    logger.info('Backup enviado para S3 com sucesso');

    // Limpar arquivo local
    require('fs').unlinkSync(filename);
    
    logger.info('Arquivo local removido');

    // Limpar backups antigos (manter últimos 7 dias)
    const { Contents } = await s3.listObjects({
      Bucket: process.env.BACKUP_BUCKET!
    }).promise();

    if (Contents) {
      const oldBackups = Contents
        .filter(obj => obj.Key!.startsWith('backup-'))
        .sort((a, b) => b.LastModified!.getTime() - a.LastModified!.getTime())
        .slice(7);

      for (const backup of oldBackups) {
        await s3.deleteObject({
          Bucket: process.env.BACKUP_BUCKET!,
          Key: backup.Key!
        }).promise();
        
        logger.info(`Backup antigo removido: ${backup.Key}`);
      }
    }

    logger.info('Processo de backup concluído com sucesso');
  } catch (error) {
    logger.error('Erro durante o processo de backup:', error);
    process.exit(1);
  }
}

backup(); 