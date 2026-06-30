# Adding a game

## Spec first (recommended)

Before coding, use the **`new-game` agent skill** (auto-runs when you ask to create a game):

1. Agent asks simple questions to nail down the fun
2. Writes a full spec (`docs/games/<name>-spec.md`) using [GitHub Spec Kit](https://github.com/github/spec-kit)-style SDD
3. Writes a plan and task list
4. Builds only after you say the idea sounds right

Templates: `docs/templates/game-spec-template.md`, `game-plan-template.md`, `game-tasks-template.md`

Manual invoke: `/new-game` in Agent chat.

---

## Option A: Start from the template (easiest)

```bash
npm run new-game -- my-cool-game
npm run dev -- my-cool-game
```

Edit `games/my-cool-game/src/main.js` and go!

## Option B: Bring in a game you already made

### 1. Create the folder

Put your game in `games/<name>/`. Use a lowercase name with hyphens.

### 2. Add package.json

Minimum `games/<name>/package.json`:

```json
{
  "name": "@mygames/<name>",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mygames/shared": "*"
  },
  "devDependencies": {
    "vite": "^6.3.5"
  }
}
```

### 3. Entry point

- `index.html` should load `/src/main.js` as a module.
- Copy `games/_template/index.html` as a starting point.

### 4. Vite config

Copy `games/_template/vite.config.js` into your game folder.

### 5. Install and run

From the repo root:

```bash
npm install
npm run dev -- <name>
```

### 6. Optional: use shared helpers

Replace hand-rolled canvas/input code with imports from `@mygames/shared` when it helps. You do not have to — each game can be fully standalone JavaScript.

### 7. Add a doc (optional)

Create `docs/games/<name>.md` with a short description and how to run the game.

## Option C: Copy an existing game

```bash
cp -r games/bounce-ball games/my-variant
```

Then update `package.json` name, `index.html` title, and the README. Run `npm install` and `npm run dev -- my-variant`.
