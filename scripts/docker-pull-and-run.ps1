# Pull and run BffMini Docker image (Windows PowerShell)
# Usage: .\scripts\docker-pull-and-run.ps1

Write-Host "Pulling latest BffMini Docker image..." -ForegroundColor Cyan
docker pull ghcr.io/ferencbecker/uncut/bffmini:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to pull image. Check if Docker is running and you have internet access." -ForegroundColor Red
    exit 1
}

Write-Host "Stopping existing container if running..." -ForegroundColor Cyan
docker stop bffmini 2>$null
docker rm bffmini 2>$null

Write-Host "Starting BffMini container..." -ForegroundColor Cyan
$dataPath = Join-Path $PSScriptRoot "..\data"
docker run -d `
  --name bffmini `
  -p 8080:8080 `
  -v "${dataPath}:/app/data:ro" `
  --restart unless-stopped `
  ghcr.io/ferencbecker/uncut/bffmini:latest

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ BffMini is running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access the API at: http://localhost:8080" -ForegroundColor Yellow
    Write-Host "Health check: http://localhost:8080/health" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "View logs: .\scripts\docker-logs.ps1" -ForegroundColor Gray
    Write-Host "Stop container: .\scripts\docker-stop.ps1" -ForegroundColor Gray
} else {
    Write-Host "Failed to start container" -ForegroundColor Red
    exit 1
}
