#!/usr/bin/env bash

buildOut=$(docker run --rm -i \
    -v $BASE_PATH/languages/java/sessions/$1:/sessions/$1 \
    --workdir /sessions/$1 \
    openjdk:8 javac Program.java)

buildExitCode=$?
if [ $buildExitCode -ne 0 ]; then
    echo $buildOut
    exit $buildExitCode
fi

chown -R $RUN_AS_USER_ID $BASE_PATH/languages/java/sessions/$1

docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    --env COMPlus_EnableDiagnostic=0 \
    -v $BASE_PATH/languages/java/sessions/$1:/sessions/$1:ro \
    --workdir /sessions/$1 \
    openjdk:8 java Program

