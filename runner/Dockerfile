FROM docker
RUN apk add --update nodejs && \
    apk add --update npm && \
    apk add --no-cache bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "/usr/bin/node", "src/server.js" ]
