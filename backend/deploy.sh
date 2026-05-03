#!/bin/bash
set -e

APP_NAME="kimera"
OLD_CONTAINER="${APP_NAME}_old"
NEW_CONTAINER="${APP_NAME}_new"
BACKUP_CONTAINER="${OLD_CONTAINER}_backup"
PORT=8000
STARTUP_WAIT=6        # seconds to wait after docker run
RESTART_WAIT=5        # seconds to wait after post-swap restart
HEALTH_RETRIES=8
HEALTH_INTERVAL=3     # seconds between health retries

log()     { echo "[$( date '+%H:%M:%S')] $1"; }
success() { echo "[$( date '+%H:%M:%S')] ✅ $1"; }
fail()    { echo "[$( date '+%H:%M:%S')] ❌ $1"; }

# =========================
# HEALTH CHECK FUNCTION
# =========================
health_check() {
    local container=$1
    local label=$2
    local retries=${3:-$HEALTH_RETRIES}
    log "🔍 Health check on $label (up to $retries attempts)..."
    for i in $(seq 1 $retries); do
        if docker exec "$container" python -c "
import urllib.request, urllib.error, sys
try:
    urllib.request.urlopen('http://127.0.0.1:${PORT}/')
    sys.exit(0)
except urllib.error.HTTPError:
    sys.exit(0)   # Server responded (even 404/403/500) = process is alive
except Exception as e:
    sys.exit(1)
" 2>/dev/null; then
            success "Health check passed on attempt $i"
            return 0
        fi
        log "⏳ Attempt $i/$retries failed — retrying in ${HEALTH_INTERVAL}s..."
        sleep $HEALTH_INTERVAL
    done
    return 1
}

# =========================
# BUILD IMAGE
# =========================
log "🐳 Deploying $APP_NAME..."
log "🔨 Building image..."
if ! docker build --no-cache -t "${APP_NAME}:new" .; then
    fail "Build failed"
    exit 1
fi
success "Image built"

# =========================
# CLEAN ANY PREVIOUS NEW CONTAINER
# =========================
log "🧹 Cleaning any leftover new/backup containers..."
docker stop "$NEW_CONTAINER"    2>/dev/null || true
docker rm -f "$NEW_CONTAINER"   2>/dev/null || true
docker stop "$BACKUP_CONTAINER" 2>/dev/null || true
docker rm -f "$BACKUP_CONTAINER" 2>/dev/null || true

# =========================
# START NEW CONTAINER
# =========================
log "🚀 Starting new container..."
docker run -d \
  --network hostra \
  --name "$NEW_CONTAINER" \
  --restart unless-stopped \
  "${APP_NAME}:new"

log "⏳ Waiting ${STARTUP_WAIT}s for startup..."
sleep $STARTUP_WAIT

# =========================
# CONFIRM CONTAINER IS RUNNING
# =========================
if ! docker ps --filter "name=^${NEW_CONTAINER}$" --filter "status=running" | grep -q "$NEW_CONTAINER"; then
    fail "Container crashed on startup"
    docker logs "$NEW_CONTAINER"
    docker rm -f "$NEW_CONTAINER" 2>/dev/null || true
    exit 1
fi

# =========================
# HEALTH CHECK — NEW CONTAINER
# =========================
if ! health_check "$NEW_CONTAINER" "new container"; then
    fail "New container failed health check — aborting deploy"
    docker logs "$NEW_CONTAINER"
    docker stop "$NEW_CONTAINER" 2>/dev/null || true
    docker rm -f "$NEW_CONTAINER" 2>/dev/null || true
    exit 1
fi

# =========================
# ZERO-DOWNTIME SWAP
# =========================
log "🔁 Swapping containers..."

# Back up old container if it exists
if docker ps -a --filter "name=^${OLD_CONTAINER}$" | grep -q "$OLD_CONTAINER"; then
    docker rename "$OLD_CONTAINER" "$BACKUP_CONTAINER" 2>/dev/null || true
fi

# Promote new → live name
docker rename "$NEW_CONTAINER" "$OLD_CONTAINER"

# =========================
# POST-SWAP RESTART
# (forces Docker DNS re-registration so NPM resolves the name again)
# =========================
log "♻️  Restarting live container to refresh Docker DNS..."
docker restart "$OLD_CONTAINER"

log "⏳ Waiting ${RESTART_WAIT}s for restart..."
sleep $RESTART_WAIT

# Confirm it came back
if ! docker ps --filter "name=^${OLD_CONTAINER}$" --filter "status=running" | grep -q "$OLD_CONTAINER"; then
    fail "Container did not come back after restart"
    # Attempt rollback
    if docker ps -a --filter "name=^${BACKUP_CONTAINER}$" | grep -q "$BACKUP_CONTAINER"; then
        log "🔄 Attempting rollback to backup..."
        docker rename "$BACKUP_CONTAINER" "$OLD_CONTAINER" 2>/dev/null || true
        docker start "$OLD_CONTAINER" 2>/dev/null || true
    fi
    exit 1
fi

# =========================
# POST-SWAP HEALTH CHECK
# (confirms NPM can reach the container again after the restart)
# =========================
if ! health_check "$OLD_CONTAINER" "live container post-swap"; then
    fail "Live container failed post-swap health check"
    log "📜 Logs:"
    docker logs "$OLD_CONTAINER" --tail 40
    # Attempt rollback
    if docker ps -a --filter "name=^${BACKUP_CONTAINER}$" | grep -q "$BACKUP_CONTAINER"; then
        log "🔄 Rolling back to previous version..."
        docker stop "$OLD_CONTAINER" 2>/dev/null || true
        docker rm -f "$OLD_CONTAINER" 2>/dev/null || true
        docker rename "$BACKUP_CONTAINER" "$OLD_CONTAINER"
        docker start "$OLD_CONTAINER"
        log "🔄 Rollback complete"
    fi
    exit 1
fi

# =========================
# CLEAN UP BACKUP
# =========================
log "🧹 Removing backup container..."
docker stop "$BACKUP_CONTAINER" 2>/dev/null || true
docker rm -f "$BACKUP_CONTAINER" 2>/dev/null || true

# =========================
# CLEAN UP OLD IMAGE
# =========================
log "🧹 Removing old image..."
docker image prune -f --filter "label=app=${APP_NAME}" 2>/dev/null || true

success "🎉 Deployment of $APP_NAME complete!"
