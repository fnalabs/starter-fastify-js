# starter(fastify)<sup>js</sup>

[![Code Coverage][codecov-image]][codecov-url]
[![JavaScript Style Guide][style-image]][style-url]

Starter kit for server-side only Node.js with Fastify applications running on Alpine Linux.

## Overview

Overall, this starter kit provides the standard boilerplate constructs to develop and build a Node.js applcation. It provides ES2022+ through Babel with `async/await` support for Fastify implemenations. It has some configurable project settings with included \*rc/\*ignore files for:

- [TypeScript](https://www.typescriptlang.org/) ([tsconfig.base.json](./tsconfig.base.json) for the latest TypeScript features)
- [Git](https://git-scm.com/) ([.gitignore](./.gitignore), pretty much the standard Node.js one provided by Github)
- [Docker](https://www.docker.com/) ([.dockerignore](./.dockerignore), pretty much the .gitignore above with a few small changes)

I have added support for badges. Currently, this project is integrated with [CircleCI](https://circleci.com/) and [Codecov](https://codecov.io/) to provide build and coverage badges respectively. All are free for open source projects and should be used to provide quick references to the projects status as well as a way to automatically test pull requests.

## NPM

The project provides an extensible build process integrated with npm scripts. The following is a breakdown of npm scripts provided and how to use them:

- `npm run dev` - to run two nodemon processes automatically based on watched files, one to rebuild application code and the other to run tests.
- `npm run fix` - to automatically apply JS Standard Style to all JS code.
- `npm run lint` - to run JS Standard Style checks.
- `npm run release` - to test and build production code.
- `npm start` - to start the application in a production environment.
- `npm run start:dev` - to start the application in a development environment.
- `npm test` - to run unit tests.
- `npm run tsc` - to build production output.

## Docker

As mentioned previously, I have included full Docker support for development and production environments.

For development, it is strongly recommended to use `docker-compose` with the included [docker-compose.yml](./docker-compose.yml) file to achieve this. It provides a sandboxed evironment for development that is consistent throughout the whole life cycle of the application. Below is a summary of useful `docker-compose` CLI commands.

- `docker-compose build` to build the development image.
- `docker-compose up [--build]` to (re)create/start and optionally build the development container.
- `docker-compose restart` to restart ...
- `docker-compose stop` to stop ...
- `docker-compose rm` to delete ...
- `docker-compose down` to stop and remove ...

For production, builds are a multi-step process that is easily automated. Below is a short script to achieve this goal.

```shell
npm run release
docker build -t fnalabs/docker-nodejs .
docker run --name test -p 443:3000 fnalabs/docker-nodejs
```

[LICENSE](./LICENSE)

[codecov-image]: https://img.shields.io/codecov/c/github/fnalabs/starter-fastify-js.svg
[codecov-url]: https://codecov.io/gh/fnalabs/starter-fastify-js

[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
