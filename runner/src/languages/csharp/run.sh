#!/usr/bin/env bash

buildOut=$(docker run --rm -i \
    -v ${SESSIONS_PATH}/csharp/$1:/sessions/$1 \
    --workdir /sessions/$1 \
    microsoft/dotnet:2.2-sdk dotnet publish --output app --configuration Release)

buildExitCode=$?
if [ $buildExitCode -ne 0 ]; then
    echo $buildOut
    exit $buildExitCode
fi

chown -R $RUN_AS_USER_ID /sessions/csharp/$1

docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    --env COMPlus_EnableDiagnostic=0 \
    -v ${SESSIONS_PATH}/csharp/$1:/sessions/$1:ro \
    --workdir /sessions/$1 \
    microsoft/dotnet:2.2-sdk dotnet app/$1.dll
