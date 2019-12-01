#!/usr/bin/env bash
docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    python:$Version python -c "${1}"
