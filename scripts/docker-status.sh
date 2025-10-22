#!/bin/bash
# Check BffMini Docker container status (Linux/Mac/Raspberry Pi)
# Usage: ./scripts/docker-status.sh

echo "BffMini Container Status:"
echo ""

if docker ps -a --filter "name=bffmini" --format "{{.Names}}" | grep -q "bffmini"; then
    docker ps -a --filter "name=bffmini" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""

    if docker ps --filter "name=bffmini" --format "{{.Names}}" | grep -q "bffmini"; then
        echo "Status: Running ✓"
        echo ""
        echo "Testing health endpoint..."
        if curl -f -s http://localhost:8080/health > /dev/null 2>&1; then
            echo "Health check: $(curl -s http://localhost:8080/health) ✓"
        else
            echo "Health check: Failed ✗"
        fi
    else
        echo "Status: Stopped"
    fi
else
    echo "Container not found. Run: ./scripts/docker-pull-and-run.sh"
fi
