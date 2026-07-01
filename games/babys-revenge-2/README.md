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

# Play (opens browser on port 5176)
npm run dev -- babys-revenge-2

# Or build a standalone bundle
npm run build -- babys-revenge-2
cd games/babys-revenge-2 && npm run preview
```

## Controls

| Input | Action |
|-------|--------|
| **Arrow keys** | Move |
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
