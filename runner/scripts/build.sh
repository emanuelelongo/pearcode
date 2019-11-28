#!/usr/bin/env bash

IMAGE_NAME=$1
shift
IMAGE_TAG=$1
shift

IMAGE_NAME=pearcode-runner
IMAGE_TAG=$(git rev-parse --short HEAD)

docker build -t $IMAGE_NAME:$IMAGE_TAG .
