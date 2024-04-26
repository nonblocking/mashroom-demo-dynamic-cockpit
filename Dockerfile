# Builder
FROM node:20.12.2-slim as builder
WORKDIR /opt/app
COPY package.json package-lock.json common-styles.scss ./
COPY ./plugins ./plugins
COPY ./test ./test
COPY ./test/test-server/mashroom_docker.json ./test/test-server/mashroom.json
RUN npm ci
RUN npm run build

# Actual image
FROM node:20.12.2-slim
WORKDIR /opt/app
COPY *.json ./
COPY --from=builder /opt/app/test ./test
COPY --from=builder /opt/app/plugins ./plugins
RUN npm ci --omit=dev

EXPOSE 5050
CMD npm start --prefix=./test/test-server
