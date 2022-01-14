# Builder
FROM node:16-slim as builder
WORKDIR /opt/app
COPY ./plugins ./plugins
COPY ./test ./test
COPY ./test/test-server/mashroom_docker.json ./test/test-server/mashroom.json
COPY *.json *.scss ./
RUN npm ci && ./node_modules/.bin/lerna bootstrap --ci
RUN npm run build
# Remove all node_modules
RUN ./node_modules/.bin/lerna clean --yes

# Actual image
FROM node:16-slim
WORKDIR /opt/app
COPY *.json ./
COPY --from=builder /opt/app/test ./test
COPY --from=builder /opt/app/plugins ./plugins
RUN npm ci --production && NODE_ENV=production ./node_modules/.bin/lerna bootstrap --ci

EXPOSE 5050
CMD npm start --prefix=./test/test-server
