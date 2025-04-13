# Configurações
$backupDir = ".\backups"
$dbName = "onlywave"
$dbUser = "postgres"
$pgDump = "C:\Program Files\PostgreSQL\15\bin\pg_dump.exe"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupDir\backup_${dbName}_${timestamp}.sql"

# Criar diretório de backup se não existir
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

# Verificar se pg_dump existe
if (-not (Test-Path $pgDump)) {
    Write-Host "Erro: pg_dump não encontrado em $pgDump" -ForegroundColor Red
    Write-Host "Por favor, ajuste o caminho do PostgreSQL no script" -ForegroundColor Yellow
    exit 1
}

# Realizar backup
Write-Host "Iniciando backup do banco de dados $dbName..."
try {
    & $pgDump -U $dbUser $dbName > $backupFile
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backup realizado com sucesso: $backupFile" -ForegroundColor Green
        
        # Manter apenas os últimos 7 backups
        Get-ChildItem $backupDir -File | 
            Sort-Object CreationTime -Descending | 
            Select-Object -Skip 7 | 
            Remove-Item -Force
        
        Write-Host "Limpeza de backups antigos concluída" -ForegroundColor Green
    } else {
        Write-Host "Erro ao realizar backup" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Erro ao realizar backup: $_" -ForegroundColor Red
    exit 1
} 