#!/usr/bin/env bash

if [ ! -d "${SESSIONS_PATH}/java/$1" ]; then
    mkdir -p ${SESSIONS_PATH}/java/$1
    touch Program.java
fi
