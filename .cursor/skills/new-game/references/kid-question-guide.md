# Kid-friendly discovery guide

For an ~8-year-old who knows games but not code. Ask like a friend, not an interview.

## First message template

Use something like this (adjust to what they already said):

> Awesome — let's design your game before we build it!
>
> 1. **What should we call it?**
> 2. **What do you control?** (a person, animal, car, spaceship…)
> 3. **What's the main thing you do?** (run from bad guys, collect coins, shoot, race…)
> 4. **How do you win?**
> 5. **What happens when you lose?**
> 6. **What should it look like?** (colors, place — space, jungle, city…)
>
> If it's like another game you love, tell me which one — that helps a lot!

## Reading between the lines

| Kid says | Probably means | Confirm with |
|----------|----------------|--------------|
| "Like Minecraft" | building, exploring, blocks | "Do you want to place blocks, or more running around?" |
| "Like Mario" | jump, platforms, enemies | "Jump on platforms and avoid or stomp enemies?" |
| "Like Snake" | grow longer, don't hit yourself | "Classic snake — eat food, get longer?" |
| "Like Fortnite / shooters" | move, aim, survive | "Top-down or side view? Shoot or dodge?" |
| "Zombie game" | survive, chase, tension | "Run away, fight back, or both?" |
| "Racing game" | speed, track, finish line | "Car or something else? Against clock or others?" |
| "Cool game" / "fun game" | unclear | "What's the one awesome thing that happens?" |
| "Hard game" | challenge | "What makes it hard — fast enemies, traps, timer?" |
| "Easy game" | gentle learning curve | "Lots of lives and slow speed?" |
| "Scary game" | spooky mood | "Dark colors and surprises, or monsters?" |
| "Multiplayer" | play with someone | "Two players on same keyboard, or take turns?" |

## Question rules

- **Max 6 questions** in the first batch.
- **One idea per question** — no compound sentences.
- **Choices help** — "Arrow keys or mouse?" beats "What is your input modality?"
- **Reflect back** — "So you're a fox collecting stars — got it!"
- **Never ask about** frameworks, APIs, databases, or file structure in discovery.

## When you have enough

Write a **3–5 sentence pitch** back:

> **Your game: Star Fox**
> You play a fox in a forest. Stars appear and you run to collect them with the arrow keys. Each star makes you faster. You lose if you hit a tree. Green forest, gold stars, red trees.
>
> **Does that sound fun? Anything to change?**

Wait for yes (or edits) before writing the spec file.

## Red flags — ask one more question

- No win condition mentioned
- No lose condition mentioned
- Controls unclear for action games
- "Everything" / "all the features" → help scope: "What's the ONE coolest part for version 1?"

## P1 vs P2 (help them scope)

If they want a huge game:

> Let's build the **first fun version** first — the part that's most exciting. We can add more later!
>
> For v1, pick the **most important**:
> - Move around ✓
> - Collect things ✓
> - Bad guys ✓
> - Levels ✓
>
> Which two matter most for the first playable version?
