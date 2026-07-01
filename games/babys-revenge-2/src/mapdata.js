/**
 * Build the meadow map: barrier square with corner legs, center campfire, lakes, trees.
 */
import { BARRIER_BOUNDS } from './campfire.js';

const MAP_W = 24;
const MAP_H = 22;

function isLakeCoord(x, y, lakes) {
  return lakes.some((p) => p[0] === x && p[1] === y);
}

export function buildGameMap() {
  const grid = Array.from({ length: MAP_H }, () => Array(MAP_W).fill('.'));

  for (let x = 0; x < MAP_W; x += 1) {
    grid[0][x] = 'M';
    grid[MAP_H - 1][x] = 'M';
  }
  for (let y = 0; y < MAP_H; y += 1) {
    grid[y][0] = 'M';
    grid[y][MAP_W - 1] = 'M';
  }

  const b = BARRIER_BOUNDS[0];
  const cx = Math.floor((b.minX + b.maxX) / 2);
  const cy = Math.floor((b.minY + b.maxY) / 2);

  grid[cy][cx] = 'F';
  grid[cy][cx + 1] = '@';

  const lakes = [
    [10, 12], [11, 12], [12, 12],
    [10, 13], [11, 13], [12, 13],
    [15, 10], [16, 10], [15, 11],
  ];
  lakes.forEach(([x, y]) => {
    grid[y][x] = 'L';
  });

  const treeSpots = [
    [9, 9], [10, 9], [14, 9], [16, 9],
    [9, 10], [16, 10],
    [9, 11], [16, 11],
    [9, 14], [10, 14], [14, 14], [15, 14],
    [13, 9], [8, 12], [16, 13], [8, 14],
  ];
  treeSpots.forEach(([x, y]) => {
    if (grid[y][x] === '.' && !isLakeCoord(x, y, lakes)) {
      grid[y][x] = 'R';
    }
  });

  for (let y = 2; y <= 4; y += 1) {
    [2, 3, 20, 21].forEach((x) => {
      grid[y][x] = 'T';
    });
  }
  for (let y = 17; y <= 19; y += 1) {
    [3, 4, 5, 18, 19, 20].forEach((x) => {
      if (grid[y][x] === '.') grid[y][x] = 'T';
    });
  }

  return grid.map((row) => row.join(''));
}

export const MAP = buildGameMap();
export { MAP_W, MAP_H };
