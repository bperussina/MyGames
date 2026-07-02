/**
 * Simple keyboard and pointer input tracker.
 */
const GAME_KEYS = new Set([
  'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
  ' ', 'w', 'a', 's', 'd', 'x', 'e', 'r', 'l', 'b',
]);

export class Input {
  constructor(target = window) {
    this.keys = new Set();
    this.pointer = { x: 0, y: 0, down: false };

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      this.keys.add(key);
      if (GAME_KEYS.has(key)) {
        event.preventDefault();
      }
    });

    document.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
    });

    target.addEventListener('pointermove', (event) => {
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
    });

    target.addEventListener('pointerdown', (event) => {
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
      this.pointer.down = true;
      if (target.focus) {
        target.focus();
      }
    });

    target.addEventListener('pointerup', () => {
      this.pointer.down = false;
    });
  }

  isDown(key) {
    return this.keys.has(key.toLowerCase());
  }

  isPressed(...keys) {
    return keys.some((key) => this.isDown(key));
  }
}
