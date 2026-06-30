import {
  createCanvas,
  clearCanvas,
  drawRect,
  drawText,
  Input,
  loop,
  random,
} from '@mygames/shared';
import { TetrisCPU } from './tetris.js';

const CELL = 24;
const SNAKE_MOVE_INTERVAL = 0.12;

const { ctx } = createCanvas();
const input = new Input();

const COLORS = {
  background: '#0f172a',
  grid: '#1e293b',
  snake: '#4ade80',
  snakeHead: '#22c55e',
  food: '#f43f5e',
  tetrisActive: '#818cf8',
  tetrisLocked: '#4f46e5',
  text: '#e2e8f0',
  muted: '#94a3b8',
};

let cols = 0;
let rows = 0;
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let moveTimer = 0;
let gameOver = false;
let tetris = null;

function resizeGrid() {
  cols = Math.floor(ctx.canvas.width / CELL);
  rows = Math.floor(ctx.canvas.height / CELL);
}

function resetGame() {
  resizeGrid();

  const startX = Math.floor(cols / 4);
  const startY = Math.floor(rows / 2);

  snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  moveTimer = 0;
  gameOver = false;

  tetris = new TetrisCPU(cols, rows);
  placeFood();
}

function getBlockedCells() {
  return tetris ? tetris.getBlockedCells() : new Set();
}

function snakeOccupies(x, y) {
  return snake.some((segment) => segment.x === x && segment.y === y);
}

function placeFood() {
  const blocked = getBlockedCells();
  const candidates = [];

  for (let x = 0; x < cols; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      const key = `${x},${y}`;
      if (!snakeOccupies(x, y) && !blocked.has(key)) {
        candidates.push({ x, y });
      }
    }
  }

  if (candidates.length === 0) {
    food = { x: -1, y: -1 };
    return;
  }

  food = candidates[Math.floor(random(0, candidates.length))];
}

function handleInput() {
  if (input.isPressed('arrowup', 'w') && direction.y === 0) {
    nextDirection = { x: 0, y: -1 };
  } else if (input.isPressed('arrowdown', 's') && direction.y === 0) {
    nextDirection = { x: 0, y: 1 };
  } else if (input.isPressed('arrowleft', 'a') && direction.x === 0) {
    nextDirection = { x: -1, y: 0 };
  } else if (input.isPressed('arrowright', 'd') && direction.x === 0) {
    nextDirection = { x: 1, y: 0 };
  }

  if (gameOver && input.isPressed('r', ' ')) {
    resetGame();
  }
}

function hitsTetris(cells) {
  const blocked = getBlockedCells();
  return cells.some((cell) => blocked.has(`${cell.x},${cell.y}`));
}

function moveSnake() {
  direction = nextDirection;

  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  const hitWall =
    newHead.x < 0 ||
    newHead.x >= cols ||
    newHead.y < 0 ||
    newHead.y >= rows;

  const hitSelf = snake.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );

  const hitBlocks = hitsTetris([newHead]);

  if (hitWall || hitSelf || hitBlocks) {
    gameOver = true;
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 1;
    placeFood();
  } else {
    snake.pop();
  }

  if (hitsTetris(snake)) {
    gameOver = true;
  }
}

function drawGrid() {
  for (let x = 0; x < cols; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      drawRect(ctx, x * CELL, y * CELL, CELL - 1, CELL - 1, COLORS.grid);
    }
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const color = index === 0 ? COLORS.snakeHead : COLORS.snake;
    drawRect(ctx, segment.x * CELL, segment.y * CELL, CELL - 1, CELL - 1, color);
  });
}

function drawFood() {
  if (food.x < 0) {
    return;
  }
  drawRect(ctx, food.x * CELL, food.y * CELL, CELL - 1, CELL - 1, COLORS.food);
}

function drawHud() {
  drawText(ctx, `Score: ${score}`, 16, 16, {
    align: 'left',
    baseline: 'top',
    size: 28,
    color: COLORS.text,
  });

  drawText(ctx, 'CPU Tetris — dodge the blocks!', ctx.canvas.width - 16, 16, {
    align: 'right',
    baseline: 'top',
    size: 18,
    color: COLORS.muted,
  });

  if (gameOver) {
    drawText(ctx, 'Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2 - 30, {
      size: 48,
      color: COLORS.food,
    });
    drawText(ctx, 'You touched a Tetris block!', ctx.canvas.width / 2, ctx.canvas.height / 2 + 15, {
      size: 22,
      color: COLORS.muted,
    });
    drawText(ctx, 'Press R or Space to play again', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50, {
      size: 20,
      color: COLORS.muted,
    });
  } else {
    drawText(ctx, 'Arrow keys or WASD', ctx.canvas.width / 2, ctx.canvas.height - 20, {
      size: 18,
      color: COLORS.muted,
    });
  }
}

function update(delta) {
  handleInput();

  if (!gameOver) {
    tetris.update(delta);

    moveTimer += delta;
    while (moveTimer >= SNAKE_MOVE_INTERVAL) {
      moveSnake();
      moveTimer -= SNAKE_MOVE_INTERVAL;
    }
  }

  clearCanvas(ctx, COLORS.background);
  drawGrid();
  tetris.draw(ctx, CELL, {
    active: COLORS.tetrisActive,
    locked: COLORS.tetrisLocked,
  });
  drawFood();
  drawSnake();
  drawHud();
}

window.addEventListener('resize', () => {
  if (!gameOver) {
    resetGame();
  }
});

resetGame();
loop(update);
