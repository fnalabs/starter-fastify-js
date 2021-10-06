# start with Alpine Linux Node image for development
FROM node:16.10.0-alpine as development

ARG APP_PATH="/opt/app"
ARG NODE_ENV="development"
ARG PORT="3000"

# set environment variables
ENV NODE_ENV="${NODE_ENV}" \
    PORT="${PORT}"

# Project code
COPY . ${APP_PATH}/

# change to workspace and run project install script
WORKDIR ${APP_PATH}
RUN apk add --update --no-cache \
        bash-completion \
        coreutils \
        dumb-init \
        grep \
        openssl \
        tree && \
    mkdir cert && \
    openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
        -keyout cert/ssl-key.pem -out cert/ssl-cert.pem && \
    chmod +r cert/ssl-key.pem cert/ssl-cert.pem && \
    npm install --quiet --no-optional && \
    npm run release

# expose standard Node.js port of 3000
EXPOSE ${PORT}

# use Alpine Linux Node image for production
FROM node:16.10.0-alpine as production

ARG APP_PATH="/opt/app"
ARG NODE_ENV="production"
ARG PORT="3000"

# set environment variables
ENV NODE_ENV="${NODE_ENV}" \
    PORT="${PORT}"

# Project code
COPY --from=development ${APP_PATH}/lib ${APP_PATH}/lib/
COPY bin ${APP_PATH}/bin/
COPY package.json package-lock.json LICENSE ${APP_PATH}/

# change to workspace and run project install script
WORKDIR ${APP_PATH}
RUN apk add --update --no-cache \
        ca-certificates \
        dumb-init \
        openssl && \
    mkdir cert && \
    openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
        -keyout cert/ssl-key.pem -out cert/ssl-cert.pem && \
    chmod +r cert/ssl-key.pem cert/ssl-cert.pem && \
    npm install --quiet --no-optional --production && \
    npm prune --production && \
    npm cache clean --force

# expose standard Node.js port of 3000
EXPOSE ${PORT}

# NOTE: change CMD to be command to start node app
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
