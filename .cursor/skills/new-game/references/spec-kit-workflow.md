# GitHub Spec Kit — workflow for mygames

Source: [github/spec-kit](https://github.com/github/spec-kit) · [Documentation](https://github.github.com/spec-kit/)

Spec-Driven Development (SDD) means **write the spec first, then plan, then tasks, then code**. Specifications are not throwaway notes — they drive what gets built.

## SDD phases (map to new games)

| Spec Kit command | Skill phase | Output in mygames |
|------------------|-------------|-------------------|
| `/speckit.constitution` | (project rules) | `docs/monorepo.md`, this skill |
| `/speckit.specify` | Phase 2 | `docs/games/<name>-spec.md` |
| `/speckit.clarify` | Phase 1 follow-up | Questions to the player |
| `/speckit.plan` | Phase 3 | `docs/games/<name>-plan.md` |
| `/speckit.tasks` | Phase 4 | `docs/games/<name>-tasks.md` |
| `/speckit.implement` | Phase 5 | `games/<name>/` code |

Optional later: `/speckit.analyze`, `/speckit.checklist` for quality checks.

## Core principles (from Spec Kit)

1. **Specify the what and why, not the tech stack** — in the spec phase, focus on fun and rules. Tech goes in the plan.
2. **User scenarios with acceptance criteria** — "Given I'm playing, When I press up, Then the snake moves up."
3. **Priorities** — P1 = must ship for v1 to be fun; P2+ = later.
4. **Mark gaps** — `[NEEDS CLARIFICATION: …]` instead of guessing important rules.
5. **Independent test** — each must-have should be verifiable by playing.

## Upstream templates (reference)

Spec Kit core templates (adapted for kids in `docs/templates/`):

- Spec: https://github.com/github/spec-kit/blob/main/templates/spec-template.md
- Plan: https://github.com/github/spec-kit/blob/main/templates/plan-template.md

Community preset for narrative/heavy games (optional, advanced):

- [Game Narrative Writing preset](https://github.com/adaumann/speckit-preset-game-narrative-writing) — branching stories, dialogue trees. Use only if the kid wants a story-heavy game.

## Installing full Spec Kit (optional, for parents)

```bash
# Requires uv: https://docs.astral.sh/uv/
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init . --integration cursor
```

This repo works **without** the CLI — the skill + `docs/templates/` are enough for agent-led game specs.

## Agent obligation

Before implementing any new game:

1. Read this file (or recall SDD phases).
2. Complete Specify → Plan → Tasks artifacts.
3. Get player confirmation on the spec summary.
4. Only then run scaffold/build commands.
