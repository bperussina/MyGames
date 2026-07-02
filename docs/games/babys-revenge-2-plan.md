# Implementation Plan: Baby's Revenge 2

**Date**: 2026-06-30

**Spec**: docs/games/babys-revenge-2-spec.md

---

## Summary

Survival game with cutscenes, day/night 3-minute phases, 20-night progression, X-key sound weapon, toy box refill cycle, and admin overlay. Canvas-drawn graphics in Baby's Revenge 1 style (original assets not in repo).

## Technical context

| Item | Choice |
|------|--------|
| Folder | `games/babys-revenge-2/` |
| Stack | Vite + JS + `@mygames/shared` |
| Port | 5176 |
| Audio | Web Audio API (oscillators for squeaky sounds) |
| Modules | `main.js`, `cutscenes.js`, `gameplay.js`, `admin.js`, `draw.js`, `audio.js` |

## State machine

`CUTSCENE_DUCKS` → `CUTSCENE_KIDS` → `DAY` ↔ `NIGHT` → `WIN` / `LOSE`

Admin overlay toggles on top of any state.

## Patterns

- Timer + HUD from snake-tris style
- Input from `@mygames/shared`
- Night difficulty scales with night number (more toys, faster kids)
