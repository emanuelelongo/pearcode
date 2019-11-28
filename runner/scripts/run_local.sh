LISTENING_PORT=8080
CORS_ALLOWED_DOMAINS='https://pearcode.it,https://www.pearcode.it,http://localhost:3000'
SESSIONS_PATH=$HOME/pearcode_sessions
#TODO: remove apikey from here (even if this is public)
FIREBASE_API_KEY='AIzaSyCDxlpZXjhfYyJxMSoKmxcRVRwoTvhngh0'
FIREBASE_DATABASE_URL='https://pear-code.firebaseio.com'
RUN_AS_USER_ID=$(id -u)

IMAGE_NAME=$1
shift
IMAGE_TAG=$1
shift

docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name pearcode-runner \
    -p 8080:8080 \
    --env LISTENING_PORT=$LISTENING_PORT \
    --env CORS_ALLOWED_DOMAINS=$CORS_ALLOWED_DOMAINS \
    --env SESSIONS_PATH=$SESSIONS_PATH \
    --env FIREBASE_API_KEY=$FIREBASE_API_KEY \
    --env FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL \
    --env RUN_AS_USER_ID=$RUN_AS_USER_ID \
    $IMAGE_NAME:$IMAGE_TAG
