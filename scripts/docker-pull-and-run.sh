#!/bin/bash
# Pull and run BffMini Docker image (Linux/Mac/Raspberry Pi)
# Usage: ./scripts/docker-pull-and-run.sh

set -e

echo "Pulling latest BffMini Docker image..."
docker pull ghcr.io/ferencbecker/uncut/bffmini:latest

echo "Stopping existing container if running..."
docker stop bffmini 2>/dev/null || true
docker rm bffmini 2>/dev/null || true

echo "Starting BffMini container..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATA_PATH="${SCRIPT_DIR}/../data"

docker run -d \
  --name bffmini \
  -p 8080:8080 \
  -v "${DATA_PATH}:/app/data:ro" \
  --restart unless-stopped \
  ghcr.io/ferencbecker/uncut/bffmini:latest

echo "✓ BffMini is running!"
echo ""
echo "Access the API at: http://localhost:8080"
echo "Health check: http://localhost:8080/health"
echo ""
echo "View logs: ./scripts/docker-logs.sh"
echo "Stop container: ./scripts/docker-stop.sh"
