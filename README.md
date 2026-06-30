# mygames

A monorepo for browser games — one repo, many games, shared helpers.

Each game lives in its own folder under `games/`. Shared code (canvas setup, input, drawing, math) lives in `packages/shared/` so you do not have to copy the same code into every game.

## Quick start

```bash
npm install
npm run dev -- bounce-ball
```

Your browser opens with the example game. Edit `games/bounce-ball/src/main.js` and save — the page updates automatically.

Try Snake too:

```bash
npm run dev -- snake
```

## Commands

| Command | What it does |
|---------|--------------|
| `npm run list-games` | Show all games in the repo |
| `npm run dev -- <game>` | Run one game locally (hot reload) |
| `npm run build -- <game>` | Build one game to `games/<game>/dist/` |
| `npm run build:all` | Build every game |
| `npm run new-game -- <name>` | Create a new game from the template |
| `npm test` | Run shared tests |

## Folder layout

```
mygames/
├── games/                  # One folder per game
│   ├── _template/          # Copy this to start a new game (not playable)
│   └── bounce-ball/        # Example game
│   └── snake/              # Classic Snake
│   └── snake-tris/         # Snake + CPU Tetris same screen
├── packages/
│   └── shared/             # Reusable helpers for all games
├── docs/                   # Docs for the repo and each game
└── scripts/                # Repo tools (new-game, build, dev)
```

## Create a new game

Ask the agent: **"I want to make a new game"** — it will ask a few fun questions, write a spec (Spec Kit style), and build after you approve.

Or scaffold manually:

```bash
npm run new-game -- space-race
npm run dev -- space-race
```

This copies `games/_template/` into `games/space-race/`, updates the package name, and adds a doc file at `docs/games/space-race.md`.

Game names must be lowercase with hyphens, like `frog-jump` or `space-race`.

## Add an existing game

If you already made a game somewhere else:

1. Copy its folder into `games/<your-game-name>/`.
2. Add a `package.json` like the one in `games/_template/`.
3. Use `@mygames/shared` for helpers if you want.
4. Run `npm install` from the repo root.
5. Try `npm run dev -- <your-game-name>`.

See [docs/adding-a-game.md](docs/adding-a-game.md) for more detail.

## Shared helpers

Import from `@mygames/shared` in any game:

```js
import { createCanvas, clearCanvas, Input, loop, drawCircle } from '@mygames/shared';
```

Available helpers:

- **canvas** — `createCanvas`, `clearCanvas`
- **input** — keyboard and mouse/pointer tracking
- **loop** — game loop with `delta` time
- **draw** — `drawText`, `drawCircle`, `drawRect`
- **math** — `random`, `clamp`, `distance`

## Tips for young game makers

- Start by changing colors, sizes, and speeds in an existing game.
- Copy a whole game folder and rename it to make a variant.
- One game can look totally different from another — they just share the repo and optional helpers.
- Commit often! Each new idea is worth saving.

## Docs

- [How the monorepo works](docs/monorepo.md)
- [Adding a game](docs/adding-a-game.md) (spec-first workflow + manual steps)
- [Game spec template](docs/templates/game-spec-template.md)
- [bounce-ball](docs/games/bounce-ball.md)
