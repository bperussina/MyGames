# Game Specification: Baby's Revenge 2

**Created**: 2026-06-30

**Status**: Implemented

**Inspired by**: Baby's Revenge 1 (original game, graphics style reference)

---

## Game pitch

You're the baby again — but the big kids are back with MORE toys to throw! Use your annoying sound maker (press **X**) to scare them away, survive **20 nights**, and get revenge.

## Player fantasy

You're a tough baby in a silly nursery showdown. Duck friends danced with you, then the big kids got scared… but they're back for revenge. Blast annoying noises until they run off, grab stuff from the toy box, and survive each night.

---

## How to play

### Controls

| Key / input | What happens |
|-------------|--------------|
| **X** (hold / mash) | Annoying sound maker — loud noises push big kids away |
| **Click toy box** | Refill / recharge when kids are gone |
| **`** (backtick) or Admin button | Open admin panel |
| **Enter / Space** | Skip cutscene when ready |

### Main loop

1. **Cutscene 1** — Baby dancing with ducks (like game 1).
2. **Cutscene 2** — Big kids: *"Oh no, they heard us! We need to go."* → *"We should get revenge!"* They leave and come back with toys.
3. **Day** (3 minutes) — Calm planning phase, get ready.
4. **Night** (3 minutes) — Big kids throw toys at you. Press **X** to blast sounds. Kids walk away when annoyed enough. **Toy box** appears when they're gone; they come back angrier.
5. Repeat day/night until you beat **Night 20** or lose.

---

## Rules

### How you win

- Survive all **20 nights** (complete each night's 3-minute timer without losing all health).

### How you lose

- **[NEEDS CLARIFICATION: exact hits]** v1 default: **3 toy hits** = lose the night. Lose twice? v1: one night fail = game over (can retry).

### Scoring / progress

- Night counter: **Night 1 → 20**
- Day timer: **3:00**
- Night timer: **3:00**

---

## Look and feel

| Element | Choice |
|---------|--------|
| Setting | Nursery / playroom (like Baby's Revenge 1) |
| Mood | Silly, cartoony, slightly spooky-funny |
| Baby | Round, cute, in crib (center) |
| Ducks | Yellow rubber ducks (cutscene) |
| Big kids | Taller stick figures, mischievous |
| Toys | Blocks, balls, stuffed shapes thrown at baby |
| Sound maker | Visual sound waves + squeaky noises |
| Colors | Pastels, bright primaries — kid-drawn vibe |

---

## Must-haves (P1)

### Story 1 — Opening cutscenes (P1)

**Acceptance checks**:

1. **Given** game start, **When** loading, **Then** baby + ducks dancing cutscene plays.
2. **Given** cutscene 1 done, **When** continuing, **Then** big kids dialogue cutscene plays.

### Story 2 — Night survival (P1)

**Acceptance checks**:

1. **Given** night phase, **When** timer runs, **Then** kids throw toys for 3 minutes.
2. **Given** night, **When** player holds X, **Then** annoying sounds play and kids retreat.
3. **Given** kids retreated, **When** toy box appears, **Then** player can interact and kids return.

### Story 3 — 20 nights + day/night cycle (P1)

**Acceptance checks**:

1. **Given** day phase, **When** 3 min elapses, **Then** night begins.
2. **Given** night survived, **When** timer ends, **Then** next day/night increments toward 20.

### Story 4 — Admin panel (P1)

**Acceptance checks**:

1. **Given** playing, **When** admin opened, **Then** can skip phase/night, toggle god mode, set night.

---

## Nice-to-haves (P2+)

- [ ] Import real Baby's Revenge 1 sprite assets
- [ ] Poopy diaper callback easter egg
- [ ] More kid types per night
- [ ] Save progress

---

## Open questions

- [NEEDS CLARIFICATION: Does one bad night end the whole game, or 3 lives total?] → v1: 3 hearts per night, fail night = game over with retry
- [NEEDS CLARIFICATION: Baby Revenge 1 asset files location?] → v1: canvas-drawn matching described style

---

## Sign-off

- [x] Spec from player description (2026-06-30)
- [x] Ready for plan + build
