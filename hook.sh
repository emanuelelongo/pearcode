echo "restarting pearcode-runner service"
systemctl restart pearcode-runner

echo "moving to pearcode-editor"
cd editor

echo "reinstalling dependencies"
yarn

echo "building pearcode-editor"
yarn build

echo "deploying pearcode-editor to firebase"
firebase deploy --token "$FIREBASE_TOKEN"
