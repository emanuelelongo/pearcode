IMAGE_NAME=pearcode-runner
IMAGE_TAG=$(git rev-parse --short HEAD)

docker build -t $IMAGE_NAME:$IMAGE_TAG .
