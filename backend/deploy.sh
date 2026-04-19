#!/bin/bash

set -e

APP_NAME="kimera"
OLD_CONTAINER="${APP_NAME}_old"
NEW_CONTAINER="${APP_NAME}_new"

echo "🐳 Deploying $APP_NAME..."

# =========================
# BUILD IMAGE
# =========================
echo "🔨 Building image..."
if ! docker build --no-cache -t ${APP_NAME}:new .; then
    echo "❌ Build failed"
    exit 1
fi

# =========================
# CLEAN ANY PREVIOUS NEW CONTAINER
# =========================
echo "🧹 Cleaning any previous new container..."
docker stop $NEW_CONTAINER 2>/dev/null || true
docker rm -f $NEW_CONTAINER 2>/dev/null || true

# =========================
# RUN NEW CONTAINER
# =========================
echo "🚀 Starting new container..."

docker run -d \
  --network hostra \
  --name $NEW_CONTAINER \
  ${APP_NAME}:new

echo "⏳ Waiting for startup..."
sleep 5

# =========================
# CHECK CONTAINER IS RUNNING
# =========================
if ! docker ps | grep -q $NEW_CONTAINER; then
    echo "❌ Container crashed immediately"
    docker logs $NEW_CONTAINER
    docker rm -f $NEW_CONTAINER 2>/dev/null || true
    exit 1
fi

# =========================
# HEALTH CHECK (PYTHON BASED)
# =========================
echo "🔍 Health check..."

MAX_RETRIES=5
SUCCESS=false

for i in $(seq 1 $MAX_RETRIES); do
    if docker exec $NEW_CONTAINER python -c "
import urllib.request, urllib.error
try:
    urllib.request.urlopen('http://127.0.0.1:8000/')
except urllib.error.HTTPError:
    # Server responded (even 404) → OK
    exit(0)
except Exception:
    exit(1)
"; then
        echo "✅ Health check passed"
        SUCCESS=true
        break
    else
        echo "⏳ Retry $i..."
        sleep 3
    fi
done

# =========================
# HANDLE FAILURE
# =========================
if [ "$SUCCESS" = false ]; then
    echo "❌ Health check failed after retries"

    echo "📜 Container logs:"
    docker logs $NEW_CONTAINER

    echo "🧹 Cleaning failed container..."
    docker stop $NEW_CONTAINER 2>/dev/null || true
    docker rm -f $NEW_CONTAINER 2>/dev/null || true

    exit 1
fi

# =========================
# SAFE ZERO-DOWNTIME SWAP
# =========================
echo "🔁 Swapping containers safely..."

# Rename old → backup
docker rename $OLD_CONTAINER ${OLD_CONTAINER}_backup 2>/dev/null || true

# Rename new → live
docker rename $NEW_CONTAINER $OLD_CONTAINER

# Remove backup
docker stop ${OLD_CONTAINER}_backup 2>/dev/null || true
docker rm ${OLD_CONTAINER}_backup 2>/dev/null || true

echo "🎉 Deployment successful!"
