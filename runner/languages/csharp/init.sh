#!/usr/bin/env bash

if [ ! -d "${BASE_PATH}/languages/csharp/sessions/$1" ]; then    
    
    mkdir -p $BASE_PATH/languages/csharp/sessions/$1
    
    docker run --rm -i \
        -v $BASE_PATH/languages/csharp/sessions/$1:/sessions/$1 \
        --workdir /sessions/$1 \
        microsoft/dotnet:2.2-sdk dotnet new console
fi
