# Bitcoin Core App prototype

Project design docs:
http://bitcoincore.app

This is a web prototype for the application, to quickly iterate and user test without having to go through the more complicated QML-based desktop application development process.

It's built with Nuxt:
https://nuxt.com

## Setup

nvm is recommended to manage Node versions.
Switch to the recommended version with this command.

```bash
nvm use
```

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
