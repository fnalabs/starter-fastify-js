# start with Alpine Linux Node image for development
FROM node:20.11.0-alpine as base

ARG APP_PATH="/opt/app"
ARG PORT="3000"
ENV PORT="${PORT}"

RUN apk add --update --no-cache \
        ca-certificates \
        dumb-init \
        openssl && \
    mkdir cert && \
    openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
        -keyout cert/ssl-key.pem -out cert/ssl-cert.pem && \
    chmod +r cert/ssl-key.pem cert/ssl-cert.pem

# start with base image for development
FROM base as development

ARG NODE_ENV="development"
ENV NODE_ENV="${NODE_ENV}"

COPY . ${APP_PATH}/
WORKDIR ${APP_PATH}
RUN mkdir cert && \
    openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
    -keyout cert/ssl-key.pem -out cert/ssl-cert.pem && \
    chmod +r cert/ssl-key.pem cert/ssl-cert.pem && \
    npm ci --quiet --no-optional && \
    npm run release

EXPOSE ${PORT}
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "dev"]

# use base image for production
FROM base as production

ARG NODE_ENV="production"
ENV NODE_ENV="${NODE_ENV}"

COPY --from=development ${APP_PATH}/lib ${APP_PATH}/lib/
COPY --from=development ${APP_PATH}/cert ${APP_PATH}/cert/
COPY bin ${APP_PATH}/bin/
COPY package.json package-lock.json LICENSE ${APP_PATH}/
WORKDIR ${APP_PATH}
RUN npm ci --quiet --no-optional --production && \
    npm prune --production && \
    npm cache clean --force

EXPOSE ${PORT}
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
