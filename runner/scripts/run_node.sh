#!/usr/bin/env bash
export LISTENING_PORT=8080
export CORS_ALLOWED_DOMAINS='http://localhost:3000'
export DATA_PATH=${HOME}/pearcode-sessions
export FIREBASE_API_KEY='AIzaSyCDxlpZXjhfYyJxMSoKmxcRVRwoTvhngh0'
export FIREBASE_DATABASE_URL='https://pear-code.firebaseio.com'
export RUN_AS_USER_ID=$(id -u)

node src/server.js