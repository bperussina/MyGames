# How the monorepo works

This repo uses **npm workspaces** to keep multiple games in one place.

## What is shared?

| Shared | Per game |
|--------|----------|
| `packages/shared` helpers | `games/<name>/src/main.js` |
| Root `npm test` | Game logic and art |
| `scripts/` for dev and build | `index.html`, styles |
| `docs/` | Each game's `README.md` |

## How games relate to each other

Games are **independent**. Changing `bounce-ball` does not change another game.

But you can:

- Copy one game folder to start a similar one
- Import the same `@mygames/shared` helpers
- Reuse patterns (game loop, input handling) you learned in another game

## Workspace names

Each game is an npm package named `@mygames/<folder-name>`. The root `package.json` runs commands against a specific workspace:

```bash
npm run dev -w @mygames/bounce-ball
```

The helper scripts wrap this so you can just run:

```bash
npm run dev -- bounce-ball
```

## Builds

Each game builds with [Vite](https://vitejs.dev/) into its own `dist/` folder:

```
games/bounce-ball/dist/
```

You can upload `dist/` to any static host, or open `index.html` through `npm run preview` inside the game folder.

## The template

`games/_template/` is not meant to be played. It is the starting point for `npm run new-game`. Names starting with `_` are hidden from `npm run list-games`.
