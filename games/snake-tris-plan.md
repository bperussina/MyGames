# Implementation Plan: Snake-Tris

**Date**: 2026-06-30

**Spec**: docs/games/snake-tris-spec.md

---

## Summary

Single-canvas grid game: snake logic from `games/snake/`, plus a `tetris.js` module for CPU-driven falling pieces on the same cell grid. Collision layer merges Tetris cells with snake hit tests.

## Technical context

| Item | Choice |
|------|--------|
| Game folder | `games/snake-tris/` |
| Stack | Vite + JS + `@mygames/shared` |
| Port | 5175 |
| Files | `src/main.js`, `src/tetris.js` |

## Design

- Shared `cols` × `rows` grid from canvas size
- `tetris.js`: shapes, locked cells, active piece, CPU random moves, line clear
- Snake food spawns only on empty cells (not snake, not tetris)
- Snake death: walls, self, any tetris cell (head or body segment on tetris)
