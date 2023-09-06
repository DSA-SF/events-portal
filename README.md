# event-publisher

One-shot UI to create events across Google Calendar/Zoom/Action Network. In development.

## Running

### .env

- `cp .env.local.example .env.local`

### Recommended approach: devcontainers

The devcontainer is configured with all dependencies (node and redis in particular).

- Set up [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/tutorial)
- Open `event-publisher/` in VS Code and Open in Container
- Open a terminal and `yarn install`
- `yarn run dev`

### Running locally

- Install [yarn](https://yarnpkg.com/getting-started/install) (npm does seem to work though)
- `yarn install`
- Run a local redis instance: `docker run -p 6379:6379 redis`
- `yarn run dev`
