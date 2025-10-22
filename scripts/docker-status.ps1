# Check BffMini Docker container status (Windows PowerShell)
# Usage: .\scripts\docker-status.ps1

Write-Host "BffMini Container Status:" -ForegroundColor Cyan
Write-Host ""

$container = docker ps -a --filter "name=bffmini" --format "{{.Status}}" 2>$null

if ($container) {
    docker ps -a --filter "name=bffmini" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    Write-Host ""

    if ($container -match "Up") {
        Write-Host "Status: Running ✓" -ForegroundColor Green
        Write-Host ""
        Write-Host "Testing health endpoint..." -ForegroundColor Cyan
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:8080/health" -TimeoutSec 2 -UseBasicParsing
            Write-Host "Health check: $($response.Content) ✓" -ForegroundColor Green
        } catch {
            Write-Host "Health check: Failed ✗" -ForegroundColor Red
        }
    } else {
        Write-Host "Status: Stopped" -ForegroundColor Yellow
    }
} else {
    Write-Host "Container not found. Run: .\scripts\docker-pull-and-run.ps1" -ForegroundColor Yellow
}
