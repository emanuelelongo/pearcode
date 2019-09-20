#!/usr/bin/env bash

if [ ! -d "${BASE_PATH}/languages/java/sessions/$1" ]; then    
    
    mkdir -p $BASE_PATH/languages/java/sessions/$1
    touch Program.java    
fi
