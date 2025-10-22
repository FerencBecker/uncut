# Update BffMini to latest version (Windows PowerShell)
# Usage: .\scripts\docker-update.ps1

Write-Host "Updating BffMini to latest version..." -ForegroundColor Cyan

Write-Host "Step 1: Pulling latest image..." -ForegroundColor Cyan
docker pull ghcr.io/ferencbecker/uncut/bffmini:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to pull image" -ForegroundColor Red
    exit 1
}

Write-Host "Step 2: Stopping current container..." -ForegroundColor Cyan
docker stop bffmini
docker rm bffmini

Write-Host "Step 3: Starting updated container..." -ForegroundColor Cyan
$dataPath = Join-Path $PSScriptRoot "..\data"
docker run -d `
  --name bffmini `
  -p 8080:8080 `
  -v "${dataPath}:/app/data:ro" `
  --restart unless-stopped `
  ghcr.io/ferencbecker/uncut/bffmini:latest

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ BffMini updated and running!" -ForegroundColor Green
    Write-Host "Access at: http://localhost:8080" -ForegroundColor Yellow
} else {
    Write-Host "Failed to start updated container" -ForegroundColor Red
    exit 1
}
