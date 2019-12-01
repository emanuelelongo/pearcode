#!/usr/bin/env bash
if [ ! -d "${MOUNT_PATH}/java/$1" ]; then
    mkdir -p ${MOUNT_PATH}/java/$1
    touch Program.java
fi
