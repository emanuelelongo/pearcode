.PHONY: build run_local

IMAGE_NAME=pearcode-runner
IMAGE_TAG=$(shell git rev-parse --short HEAD)

build:
	sh -c "scripts/build.sh $(IMAGE_NAME) $(IMAGE_TAG)"

run_docker:
	sh -c "scripts/run_docker.sh $(IMAGE_NAME) $(IMAGE_TAG)"

push:
	sh -c "scripts/push.sh $(IMAGE_NAME) $(IMAGE_TAG)"

