# Game Specification: Snake-Tris

**Created**: 2026-06-30

**Status**: Implemented

**Inspired by**: Snake + Tetris blend

---

## Game pitch

You are the Snake on the same screen as a Tetris game played by the computer. Eat the dot to score, but don't touch any Tetris blocks — falling or stacked — or you die.

## Player fantasy

Dodge falling puzzle blocks while slithering for food. The screen gets crazier as the CPU stacks more Tetris pieces.

---

## How to play

### Controls

| Key / input | What happens |
|-------------|--------------|
| Arrow keys / WASD | Move the snake |
| R or Space | Restart after game over |

### Main loop

Snake moves on a grid. A CPU plays Tetris on the **same grid** — pieces fall from the top and lock in place. A dot appears in empty cells; eating it grows the snake and adds score. Any contact between snake and Tetris blocks ends the game.

---

## Rules

### How you win

- No hard win in v1 — survive and rack up score by eating dots.

### How you lose

- Hit a wall
- Hit yourself
- **Touch any Tetris block** (falling piece or locked stack)

### Scoring

- +1 per dot eaten

---

## Look and feel

| Element | Choice |
|---------|--------|
| Setting | Dark arcade screen |
| Snake | Green (like `snake` game) |
| Dot | Pink/red |
| Tetris blocks | Purple/blue tones (distinct from snake) |
| CPU label | Small "CPU Tetris" hint on HUD |

---

## Must-haves (P1)

### Story 1 — Shared screen (P1)

Snake and Tetris occupy the same playfield.

**Acceptance checks**:

1. **Given** game running, **When** watching, **Then** Tetris pieces fall while snake moves.
2. **Given** snake alive, **When** head touches locked Tetris cell, **Then** game over.
3. **Given** snake alive, **When** head touches falling Tetris piece, **Then** game over.

### Story 2 — Snake eats dot (P1)

**Acceptance checks**:

1. **Given** dot on screen, **When** snake reaches it, **Then** score increases and snake grows.

### Story 3 — CPU Tetris (P1)

**Acceptance checks**:

1. **Given** game running, **When** no human Tetris input, **Then** pieces still fall and lock automatically.

---

## Nice-to-haves (P2+)

- [ ] Line clears when Tetris row fills
- [ ] Speed increases over time
- [ ] Sound effects

---

## Open questions

- None for v1 — approved from parent/player description.

---

## Similar games in this repo

| Game | What we reuse |
|------|----------------|
| snake | Grid movement, food, controls, game over |
| (new) | Tetris engine + CPU in `tetris.js` |
