## About

This is a monorepo containing services related to our project. Here we outline
basic technical details needed to get started working on this project.

To keep things brief we are mostly providing references to the tools we're using
and further information can be obtained by looking at their documentation or
elsewhere online. For further questions you can ask one of our engineers that
works on the relevant part of the project.

## Getting started

### Spinning up the project

You can spin up the entire environment using [docker compose](https://github.com/docker/compose).

Docker compose is included in [Docker Desktop](https://www.docker.com/products/docker-desktop/).
If you're on linux you can also install it manually following the [instructions](https://docs.docker.com/compose/install/#scenario-two-install-the-compose-plugin)
in the docs.

To install dependencies inside the container use `docker compose exec` (e.g. `docker compose exec backend poetry install`)
if the container is already running, or `docker compose run` (e.g. `docker compose run backend poetry install`)
when running it for the first time as it would not be able to start without the
dependencies. Similarly other commands (e.g. commands for linting, typechecking,
running migrations etc.) can be ran using `docker compose exec` or `docker compose run`.

Since we recommend developers work in their local environment over a container,
we only spin up the "infrastructure" containers by default (eg. database)
and use [profiles](https://docs.docker.com/compose/profiles/) to spin up additional
services.

For instance to spin up only the backend part of the stack you can run the following
command:

```
docker compose --profile backend up -d
```

To run all the services use `--profile app`.

**Note:** when using profiles you need to specify `--profile` for other docker
compose commands as well (e.g. `docker compose --profile app exec backend`,
`docker compose --profile app down`).

For information on how to set up the local toolchains and spin up the services
without docker refer to READMEs of individual components:

- [backend](./backend/README.md)
- [frontend](./frontend/README.md)

Individual READMEs also contain information on formatters, linters and other tools
used on each part of the project.

## Editor setup

Recommended editor for this project is Visual Studio Code, but we will not impose anything on the local workflow of developers. Basic configuration for this editor is included in the project (eg. extension recommendations, debug config). To open the project as a ["multi-root workspace"](https://code.visualstudio.com/docs/editing/workspaces/multi-root-workspaces) run vscode, select File -> Open Workspace from File... and choose `project.code-workspace` file in the root of this repository
