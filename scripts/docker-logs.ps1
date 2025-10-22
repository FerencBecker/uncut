# View BffMini Docker container logs (Windows PowerShell)
# Usage: .\scripts\docker-logs.ps1
# Press Ctrl+C to exit

Write-Host "Showing BffMini logs (press Ctrl+C to exit)..." -ForegroundColor Cyan
docker logs bffmini -f
