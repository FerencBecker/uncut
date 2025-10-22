#!/bin/bash
# Stop BffMini Docker container (Linux/Mac/Raspberry Pi)
# Usage: ./scripts/docker-stop.sh

echo "Stopping BffMini container..."
docker stop bffmini

echo "✓ BffMini stopped"
