#!/bin/bash
# View BffMini Docker container logs (Linux/Mac/Raspberry Pi)
# Usage: ./scripts/docker-logs.sh
# Press Ctrl+C to exit

echo "Showing BffMini logs (press Ctrl+C to exit)..."
docker logs bffmini -f
