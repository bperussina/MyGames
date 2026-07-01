# Baby's Revenge 2

**Full game** — menu, cutscenes, 20 day/night cycles, 3D open meadow, shop, campfire, trees, lakes, ducks, and night combat.

## Story

1. **Menu** — click Play
2. **Cutscene** — Baby dances with ducks
3. **Cutscene** — Big kids plot revenge
4. **Gameplay** — Survive 20 nights in a 3D meadow

## How to play the full game

```bash
# From repo root (install once)
npm install

# Stable build — best for playing without disconnects (recommended)
npm run play -- babys-revenge-2

# Family play on the same Wi-Fi — prints a link to text everyone
npm run family -- babys-revenge-2

# Dev mode (for testing changes)
npm run dev -- babys-revenge-2
```

**Tip:** Use `npm run play` for the full game. Trees and ducks are **real 3D meshes** (WebGL/Three.js) with a sprite-pack texture atlas — walk around them and they have volume from every angle.

## Play with family (same Wi-Fi)

1. On the computer running the game, open a terminal in this repo folder.
2. Run:

```bash
npm run family -- babys-revenge-2
```

3. Open **`FAMILY-LINK.txt`** in the game folder (created automatically), or copy from the terminal.
4. Text **only the link** (starts with `http://192.168`) to everyone on the **same Wi-Fi**.
5. They tap the link — it opens **Baby's Revenge 2**, not a code file.

**Important:** Do not copy lines from the build log. Only copy the link that starts with `http://`. The link ends with `/play.html`.

**You** can use `http://localhost:5176/play.html` on the host computer. **Family** uses the `192.168...` link from `FAMILY-LINK.txt`.

When a **new version** is ready, you'll see a **"New Game Ready!"** screen — tap **Play Updated Game** to get the fresh build.

## Controls

| Input | Action |
|-------|--------|
| **W** | Forward |
| **S** | Backward |
| **A** | Left |
| **D** | Right |
| **↑** | Forward |
| **↓** | Backward |
| **←** | Left |
| **→** | Right |
| **Left-click + drag** | Look around |
| **Click** | Chop trees, feed campfire, collect ducks, throw toys at kids |
| **Inventory slots** | Select toy box or axe |
| **E** | Refill toy box (daytime) |
| **X** (hold) | Sound maker — scares kids (night) |
| **B** | Open duck shop |
| **R / Space** | Restart after win or game over |
| **`** | Admin panel |

## Daytime (3 min)

- Explore the green meadow
- Chop **trees** with the axe (5 logs each)
- Feed logs to the **campfire** to grow it and expand the world
- Visit **lakes** and click ducks to collect them
- Spend ducks in the **shop** for health, damage, and toy box upgrades

## Nighttime (3 min)

- Big kids chase you and throw toys
- Hold **X** to annoy them until they retreat
- Select **toy box**, click kids to throw toys back
- Defeat all kids or survive until dawn

## Win condition

Survive **Night 20** to win.

## Admin panel

Press **`** for god mode, skip phases, speed up time, and testing tools.
