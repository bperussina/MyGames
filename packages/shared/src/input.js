/**
 * Simple keyboard and pointer input tracker.
 */
export class Input {
  constructor(target = window) {
    this.keys = new Set();
    this.pointer = { x: 0, y: 0, down: false };

    target.addEventListener('keydown', (event) => {
      this.keys.add(event.key.toLowerCase());
    });

    target.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
    });

    target.addEventListener('pointermove', (event) => {
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
    });

    target.addEventListener('pointerdown', () => {
      this.pointer.down = true;
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
