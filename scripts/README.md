# Docker Management Scripts

Scripts to manage the BffMini Docker container.

## Windows (PowerShell)

**Pull and run:**
```powershell
.\scripts\docker-pull-and-run.ps1
```

**Check status:**
```powershell
.\scripts\docker-status.ps1
```

**View logs:**
```powershell
.\scripts\docker-logs.ps1
```

**Stop container:**
```powershell
.\scripts\docker-stop.ps1
```

**Update to latest:**
```powershell
.\scripts\docker-update.ps1
```

## Linux / Mac / Raspberry Pi (Bash)

**Make scripts executable (first time only):**
```bash
chmod +x scripts/*.sh
```

**Pull and run:**
```bash
./scripts/docker-pull-and-run.sh
```

**Check status:**
```bash
./scripts/docker-status.sh
```

**View logs:**
```bash
./scripts/docker-logs.sh
```

**Stop container:**
```bash
./scripts/docker-stop.sh
```

**Update to latest:**
```bash
./scripts/docker-update.sh
```

## What Each Script Does

- **docker-pull-and-run**: Downloads latest image from GHCR and starts container
- **docker-status**: Shows container status and health check
- **docker-logs**: Displays container logs (real-time, press Ctrl+C to exit)
- **docker-stop**: Stops the running container
- **docker-update**: Pulls latest image, stops old container, starts new one

## Requirements

- Docker Desktop (Windows/Mac) or Docker Engine (Linux/Pi)
- Internet connection (for pulling images)
- Port 8080 available

## Troubleshooting

**"Docker not found":**
- Install Docker Desktop: https://www.docker.com/products/docker-desktop

**"Permission denied" (Linux/Mac):**
```bash
chmod +x scripts/*.sh
```

**"Failed to pull image":**
- Check internet connection
- Verify image exists: https://github.com/FerencBecker/uncut/pkgs/container/bffmini
- Image won't exist until first GitHub Actions build completes

**Port 8080 already in use:**
- Stop other services using port 8080
- Or modify scripts to use different port (e.g., `-p 8081:8080`)
