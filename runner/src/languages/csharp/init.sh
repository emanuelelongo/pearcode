#!/usr/bin/env bash

if [ ! -d "/sessions/csharp/$1" ]; then
    mkdir -p /sessions/csharp/$1

    docker run --rm -i \
        -v ${SESSIONS_PATH}/csharp/$1:/sessions/$1 \
        --workdir /sessions/$1 \
        microsoft/dotnet:2.2-sdk dotnet new console
fi
