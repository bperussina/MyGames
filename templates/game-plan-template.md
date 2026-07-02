# Implementation Plan: [GAME NAME]

**Date**: [DATE]

**Spec**: [docs/games/<name>-spec.md]

**Status**: Draft | Approved | Done

---

## Summary

[One paragraph: what we're building technically, tied to the spec pitch]

---

## Technical context (mygames monorepo)

| Item | Choice |
|------|--------|
| Game folder | `games/[name]/` |
| Package | `@mygames/[name]` |
| Stack | Vite + JavaScript (ES modules) |
| Shared helpers | `@mygames/shared` — [list which: canvas, input, loop, draw, random, …] |
| Scaffold command | `npm run new-game -- [name]` |
| Dev command | `npm run dev -- [name]` |
| Build command | `npm run build -- [name]` |
| Target | Browser, full-window canvas |
| FPS / timing | [e.g. 60fps loop, or grid step every 0.12s like snake] |

---

## Structure

```text
games/[name]/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   └── main.js          # game logic
└── README.md
```

---

## Design notes

### Core objects

| Thing | Purpose |
|-------|---------|
| [e.g. player] | [what it stores: x, y, speed, color] |
| [e.g. enemies] | […] |

### Game states

- [ ] playing
- [ ] game over
- [ ] [other]

### Copy patterns from

- `games/[existing]/` — [what pattern: movement, collision, HUD, …]

---

## Constitution check (mygames rules)

- [ ] Uses monorepo layout (`games/<name>/`)
- [ ] Reuses `@mygames/shared` where it helps (not required for everything)
- [ ] Kid can run with `npm run dev -- [name]`
- [ ] No unnecessary complexity for v1

---

## Risks / keep simple

- [Anything that might be too hard for v1 — cut or simplify]
