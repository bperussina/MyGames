const SHAPES = {
  I: [[0, 0], [1, 0], [2, 0], [3, 0]],
  O: [[0, 0], [1, 0], [0, 1], [1, 1]],
  T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
  J: [[0, 0], [0, 1], [1, 1], [2, 1]],
  L: [[2, 0], [0, 1], [1, 1], [2, 1]],
};

const PIECE_TYPES = Object.keys(SHAPES);
const DROP_INTERVAL = 0.45;
const CPU_INTERVAL = 0.18;

function rotateCells(cells) {
  const rotated = cells.map(([x, y]) => [y, -x]);
  const minX = Math.min(...rotated.map(([x]) => x));
  const minY = Math.min(...rotated.map(([, y]) => y));
  return rotated.map(([x, y]) => [x - minX, y - minY]);
}

function cellKey(x, y) {
  return `${x},${y}`;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export class TetrisCPU {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.locked = new Set();
    this.active = null;
    this.dropTimer = 0;
    this.cpuTimer = 0;
    this.spawnPiece();
  }

  resize(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.locked = new Set(
      [...this.locked].filter((key) => {
        const [x, y] = key.split(',').map(Number);
        return x >= 0 && x < cols && y >= 0 && y < rows;
      })
    );
    if (this.active) {
      this.active.x = Math.min(this.active.x, cols - 4);
      if (!this.canPlace(this.active.type, this.active.rotation, this.active.x, this.active.y)) {
        this.spawnPiece();
      }
    }
  }

  reset() {
    this.locked = new Set();
    this.active = null;
    this.dropTimer = 0;
    this.cpuTimer = 0;
    this.spawnPiece();
  }

  getShapeCells(type, rotation) {
    let cells = SHAPES[type];
    for (let i = 0; i < rotation; i += 1) {
      cells = rotateCells(cells);
    }
    return cells;
  }

  getWorldCells(type, rotation, x, y) {
    return this.getShapeCells(type, rotation).map(([dx, dy]) => ({
      x: x + dx,
      y: y + dy,
    }));
  }

  canPlace(type, rotation, x, y) {
    return this.getWorldCells(type, rotation, x, y).every(
      (cell) =>
        cell.x >= 0 &&
        cell.x < this.cols &&
        cell.y < this.rows &&
        !this.locked.has(cellKey(cell.x, cell.y))
    );
  }

  spawnPiece() {
    const type = randomItem(PIECE_TYPES);
    const rotation = Math.floor(Math.random() * 4);
    const x = Math.max(0, Math.floor(this.cols / 2) - 2);
    const y = 0;

    if (this.canPlace(type, rotation, x, y)) {
      this.active = { type, rotation, x, y };
      return;
    }

    for (let tryY = 0; tryY < 3; tryY += 1) {
      for (let tryX = 0; tryX < this.cols - 1; tryX += 1) {
        for (let tryRot = 0; tryRot < 4; tryRot += 1) {
          if (this.canPlace(type, tryRot, tryX, tryY)) {
            this.active = { type, rotation: tryRot, x: tryX, y: tryY };
            return;
          }
        }
      }
    }

    this.active = { type, rotation, x, y };
  }

  lockActivePiece() {
    if (!this.active) {
      return;
    }

    const cells = this.getWorldCells(
      this.active.type,
      this.active.rotation,
      this.active.x,
      this.active.y
    );

    cells.forEach((cell) => {
      if (cell.y >= 0 && cell.y < this.rows && cell.x >= 0 && cell.x < this.cols) {
        this.locked.add(cellKey(cell.x, cell.y));
      }
    });

    this.clearLines();
    this.spawnPiece();
  }

  clearLines() {
    for (let y = this.rows - 1; y >= 0; y -= 1) {
      let filled = 0;
      for (let x = 0; x < this.cols; x += 1) {
        if (this.locked.has(cellKey(x, y))) {
          filled += 1;
        }
      }

      if (filled < this.cols) {
        continue;
      }

      for (let x = 0; x < this.cols; x += 1) {
        this.locked.delete(cellKey(x, y));
      }

      const nextLocked = new Set();
      this.locked.forEach((key) => {
        const [x, cellY] = key.split(',').map(Number);
        if (cellY < y) {
          nextLocked.add(cellKey(x, cellY + 1));
        } else {
          nextLocked.add(key);
        }
      });
      this.locked = nextLocked;
      y += 1;
    }
  }

  tryMove(dx, dy) {
    if (!this.active) {
      return false;
    }

    const { type, rotation, x, y } = this.active;
    if (this.canPlace(type, rotation, x + dx, y + dy)) {
      this.active.x += dx;
      this.active.y += dy;
      return true;
    }
    return false;
  }

  tryRotate() {
    if (!this.active) {
      return false;
    }

    const { type, rotation, x, y } = this.active;
    const nextRotation = (rotation + 1) % 4;

    if (this.canPlace(type, nextRotation, x, y)) {
      this.active.rotation = nextRotation;
      return true;
    }

    if (this.canPlace(type, nextRotation, x - 1, y)) {
      this.active.x -= 1;
      this.active.rotation = nextRotation;
      return true;
    }

    if (this.canPlace(type, nextRotation, x + 1, y)) {
      this.active.x += 1;
      this.active.rotation = nextRotation;
      return true;
    }

    return false;
  }

  cpuStep() {
    if (!this.active) {
      return;
    }

    const action = randomItem(['left', 'right', 'rotate', 'rotate', 'down', 'none']);

    if (action === 'left') {
      this.tryMove(-1, 0);
    } else if (action === 'right') {
      this.tryMove(1, 0);
    } else if (action === 'rotate') {
      this.tryRotate();
    } else if (action === 'down') {
      if (!this.tryMove(0, 1)) {
        this.lockActivePiece();
      }
    }
  }

  update(delta) {
    this.dropTimer += delta;
    this.cpuTimer += delta;

    while (this.cpuTimer >= CPU_INTERVAL) {
      this.cpuStep();
      this.cpuTimer -= CPU_INTERVAL;
    }

    while (this.dropTimer >= DROP_INTERVAL) {
      if (!this.active || !this.tryMove(0, 1)) {
        this.lockActivePiece();
      }
      this.dropTimer -= DROP_INTERVAL;
    }
  }

  getBlockedCells() {
    const blocked = new Set(this.locked);

    if (this.active) {
      this.getWorldCells(
        this.active.type,
        this.active.rotation,
        this.active.x,
        this.active.y
      ).forEach((cell) => {
        if (cell.y >= 0 && cell.y < this.rows && cell.x >= 0 && cell.x < this.cols) {
          blocked.add(cellKey(cell.x, cell.y));
        }
      });
    }

    return blocked;
  }

  draw(ctx, cellSize, colors) {
    this.locked.forEach((key) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = colors.locked;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
    });

    if (!this.active) {
      return;
    }

    this.getWorldCells(
      this.active.type,
      this.active.rotation,
      this.active.x,
      this.active.y
    ).forEach((cell) => {
      if (cell.y < 0) {
        return;
      }
      ctx.fillStyle = colors.active;
      ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize - 1, cellSize - 1);
    });
  }
}
