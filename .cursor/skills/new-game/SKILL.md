---
name: new-game
description: Plan and build a new browser game in the mygames monorepo using Spec-Driven Development. Use when the user asks to create a new game, make a game, build a game, start a game, add another game, or says they want to play/make something new. Always spec first — never jump straight to coding.
---

# New Game (Spec-First)

You are helping a young game maker (about 8 years old, no coding experience). He knows the games he wants to play. Your job is to **listen, ask simple questions, read between the lines, write a full spec, and only then build**.

## Golden rule

**Do not write game code, scaffold folders, or run `npm run new-game` until the spec is written and the player agrees it sounds fun.**

---

## Phase 0 — Load Spec Kit (before anything else)

Before questions or specs, review how we plan games:

1. Read `.cursor/skills/new-game/references/spec-kit-workflow.md` in this repo.
2. If needed, skim [GitHub Spec Kit](https://github.com/github/spec-kit) and [Spec Kit docs](https://github.github.com/spec-kit/) for the SDD phases:
   - **Constitution** → project rules (use `docs/monorepo.md` + this skill)
   - **Specify** → what the game is (kid-friendly spec)
   - **Plan** → how we build it in this monorepo
   - **Tasks** → step-by-step build list
   - **Implement** → code only after the above

This repo adapts Spec Kit for small browser games. Templates live in `docs/templates/`.

---

## Phase 1 — Discovery questions (keep it simple)

When the user wants a new game, **reply with questions — not code**.

### How to ask

- Use **short, fun language** a kid would understand.
- Ask **4–6 questions max** in the first message (not a long form).
- Offer **2–3 quick choices** when helpful (e.g. "keyboard or mouse?").
- If they name another game ("like Mario", "like Snake"), **say what you think they mean** and confirm: "So you want to jump on platforms and avoid enemies — right?"
- **Read between the lines**: vague ideas → concrete game mechanics (see question guide).
- Never use jargon: say "character" not "entity", "bad guys" not "antagonists", "points" not "score variable".

### Core questions (pick what fits; skip what they already answered)

1. **What's the game called?** (or help them name it)
2. **What do you control?** (person, animal, car, spaceship, ball…)
3. **What are you trying to do?** (collect, escape, shoot, race, survive…)
4. **How do you win?** (reach the end, get the most points, beat a boss…)
5. **What happens when you lose?** (restart, game over screen, lose a life…)
6. **How do you move?** (arrow keys, WASD, mouse click, spacebar…)
7. **What should it look like?** (colors, setting: space, jungle, underwater…)
8. **Is it like a game you already know?** (helps you infer rules)

Full question bank and inference tips: `.cursor/skills/new-game/references/kid-question-guide.md`

### Follow-up

- If answers are still vague, ask **one or two** more simple questions — do not interrogate.
- When you have enough, **summarize the game back in one short paragraph** and ask: "Does that sound like what you want?"

---

## Phase 2 — Write the full spec (still no code)

Create `docs/games/<game-name>-spec.md` using `docs/templates/game-spec-template.md`.

The spec must include (Spec Kit **Specify** phase, kid-friendly):

| Section | What to capture |
|--------|------------------|
| Game pitch | One sentence a kid would say |
| Player fantasy | What it *feels* like to play |
| How to play | Controls and main loop in plain English |
| Win / lose | Clear rules |
| Look and feel | Colors, mood, setting |
| Similar games | What we are borrowing from |
| Must-haves (P1) | Smallest fun version |
| Nice-to-haves (P2+) | Later ideas |
| Acceptance checks | "When I press X, Y happens" — testable |
| Open questions | Anything still unclear |

Mark unknowns as `[NEEDS CLARIFICATION: …]` per Spec Kit style. Resolve with the player before implementing.

---

## Phase 3 — Technical plan (Spec Kit **Plan** phase)

Add `docs/games/<game-name>-plan.md` using `docs/templates/game-plan-template.md`.

For this monorepo, defaults unless the spec says otherwise:

- Location: `games/<game-name>/`
- Stack: Vite + JavaScript + `@mygames/shared`
- Scaffold: `npm run new-game -- <game-name>` (only after spec approval)
- Run: `npm run dev -- <game-name>`

Note which existing games to copy patterns from (e.g. snake for grid movement, bounce-ball for physics).

---

## Phase 4 — Task list (Spec Kit **Tasks** phase)

Add `docs/games/<game-name>-tasks.md` with ordered, checkable tasks:

1. Scaffold game folder
2. Core loop / movement
3. Win & lose conditions
4. Score or progress (if any)
5. Look and feel (colors, text)
6. Playtest and fix
7. README and `docs/games/<game-name>.md`

---

## Phase 5 — Implement (only after approval)

**Gate:** Player (or parent) confirmed the spec summary sounds right.

Then:

1. `npm run new-game -- <game-name>` (if folder does not exist)
2. Implement per tasks and plan
3. `npm run dev -- <game-name>` and verify acceptance checks
4. `npm run build -- <game-name>`
5. Update spec status to **Implemented**

---

## Tone checklist

- Encouraging, never condescending
- Short sentences
- Celebrate ideas ("That sounds awesome!")
- Turn "I want a cool game" into specifics without making the kid feel dumb
- Parents may be in the thread — specs should be clear enough for them too

---

## Repo paths (quick reference)

| Artifact | Path |
|----------|------|
| Spec | `docs/games/<name>-spec.md` |
| Plan | `docs/games/<name>-plan.md` |
| Tasks | `docs/games/<name>-tasks.md` |
| Game code | `games/<name>/` |
| Player doc | `docs/games/<name>.md` |
| Templates | `docs/templates/` |
| Shared code | `packages/shared/` |

---

## Examples in this repo

- `games/snake/` — grid, keyboard, score, game over
- `games/bounce-ball/` — simple physics, colors

Point to these when the new game is similar: "We'll start like Snake, but change …"
