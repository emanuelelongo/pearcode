#!/usr/bin/env bash
docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    node:10-slim node -e "${1}"
