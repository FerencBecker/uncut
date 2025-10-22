# Stop BffMini Docker container (Windows PowerShell)
# Usage: .\scripts\docker-stop.ps1

Write-Host "Stopping BffMini container..." -ForegroundColor Cyan
docker stop bffmini

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ BffMini stopped" -ForegroundColor Green
} else {
    Write-Host "Container not running or already stopped" -ForegroundColor Yellow
}
