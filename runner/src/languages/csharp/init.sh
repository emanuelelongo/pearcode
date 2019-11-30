#!/usr/bin/env bash

if [ ! -d "${CONTAINER_SESSIONS_PATH}/csharp/$1" ]; then
    mkdir -p ${CONTAINER_SESSIONS_PATH}/csharp/$1

    docker run --rm -i \
        -v ${LOCAL_SESSIONS_PATH}/csharp/$1:/sessions/$1 \
        --workdir /sessions/$1 \
        microsoft/dotnet:2.2-sdk dotnet new console
fi
