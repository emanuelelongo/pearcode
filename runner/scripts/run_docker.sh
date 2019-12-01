#!/usr/bin/env bash
IMAGE_NAME=$1
IMAGE_TAG=$2

DATA_PATH=${HOME}/pearcode-sessions

docker run --rm \
    --name pearcode-runner \
    -p 8080:8080 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $DATA_PATH:/sessions \
    --env DATA_PATH=$DATA_PATH \
    --env RUN_IN_DOCKER=1 \
    --env LISTENING_PORT=8080 \
    --env CORS_ALLOWED_DOMAINS="http://localhost:3000" \
    --env FIREBASE_API_KEY="AIzaSyCDxlpZXjhfYyJxMSoKmxcRVRwoTvhngh0" \
    --env FIREBASE_DATABASE_URL="https://pear-code.firebaseio.com" \
    --env RUN_AS_USER_ID=$(id -u) \
    $IMAGE_NAME:$IMAGE_TAG
