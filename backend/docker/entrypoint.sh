#!/usr/bin/env bash

set -eou pipefail

exec gunicorn \
    --timeout 300 \
    --worker-class=uvicorn.workers.UvicornWorker \
    --access-logfile '-' \
    --bind=0.0.0.0:8000 \
    --reuse-port \
    app.main:app
