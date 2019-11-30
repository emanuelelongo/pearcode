#!/usr/bin/env bash

if [ ! -d "/sessions/java/$1" ]; then
    mkdir -p /sessions/java/$1
    touch Program.java
fi
