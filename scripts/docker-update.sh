#!/bin/bash
# Update BffMini to latest version (Linux/Mac/Raspberry Pi)
# Usage: ./scripts/docker-update.sh

set -e

echo "Updating BffMini to latest version..."

echo "Step 1: Pulling latest image..."
docker pull ghcr.io/ferencbecker/uncut/bffmini:latest

echo "Step 2: Stopping current container..."
docker stop bffmini
docker rm bffmini

echo "Step 3: Starting updated container..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATA_PATH="${SCRIPT_DIR}/../data"

docker run -d \
  --name bffmini \
  -p 8080:8080 \
  -v "${DATA_PATH}:/app/data:ro" \
  --restart unless-stopped \
  ghcr.io/ferencbecker/uncut/bffmini:latest

echo "✓ BffMini updated and running!"
echo "Access at: http://localhost:8080"
