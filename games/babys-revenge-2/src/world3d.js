/**
 * Open green meadow with lakes, mountains, trees, campfire, and expanding gray barriers.
 */

import {
  createCampfire,
  BARRIER_BOUNDS,
  getCampfireRadius,
  isCampfireInRange,
  isBarrierCell,
  tryExpandCampfire,
} from './campfire.js';
import { MAP, MAP_W, MAP_H } from './mapdata.js';
import {
  getTreeScreenSize,
  getDuckScreenSize,
} from './sprites3d.js';
import { renderThreeWorld } from './threeworld.js';

const TREE_RADIUS = 0.5;
const CHOP_RANGE = 7;

export { MAP_W, MAP_H };

export function worldTileAt(tx, ty) {
  return tileAt(tx, ty);
}

export function worldIsWall(tx, ty, world) {
  return isWall(tx, ty, world);
}

export function worldIsBarrier(tx, ty, world) {
  return isBarrierCell(tx, ty, world);
}

function buildHeightMap() {
  const heights = [];
  for (let y = 0; y < MAP_H; y += 1) {
    const row = [];
    for (let x = 0; x < MAP_W; x += 1) {
      const tile = MAP[y][x] ?? 'M';
      if (tile === 'M') {
        row.push(4);
      } else if (tile === 'T') {
        let cluster = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < MAP_H && nx >= 0 && nx < MAP_W && MAP[ny][nx] === 'T') {
              cluster += 1;
            }
          }
        }
        row.push(cluster >= 7 ? 3 : cluster >= 4 ? 2 : 1);
      } else {
        row.push(0);
      }
    }
    heights.push(row);
  }
  return heights;
}

const HEIGHT = buildHeightMap();

const FOV = Math.PI / 2.6;
const MAX_DEPTH = 32;
const WALL_HEIGHT = 1.1;
const RAY_STEP = 0.04;

export function getSpawn() {
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === '@') {
        return { x: x + 0.5, y: y + 0.5, angle: 0, height: getHeightAt(x, y) };
      }
    }
  }
  return { x: 12.5, y: 5.5, angle: 0, height: 0 };
}

export function getHeightAt(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) return 3;
  return HEIGHT[ty][tx];
}

function tileAt(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) return 'M';
  return MAP[ty][tx] ?? 'M';
}

function isInsidePlayable(tx, ty, bounds) {
  return tx > bounds.minX && tx < bounds.maxX && ty > bounds.minY && ty < bounds.maxY;
}

function isOnBarrierRing(tx, ty, bounds) {
  if (tx < bounds.minX || tx > bounds.maxX || ty < bounds.minY || ty > bounds.maxY) {
    return false;
  }
  return tx === bounds.minX || tx === bounds.maxX || ty === bounds.minY || ty === bounds.maxY;
}

function hasTreeAt(world, tx, ty) {
  return world.trees.some(
    (tree) => !tree.chopped && Math.floor(tree.x) === tx && Math.floor(tree.y) === ty,
  );
}

function isWall(tx, ty, world) {
  if (tileAt(tx, ty) === 'M') return true;
  if (hasTreeAt(world, tx, ty)) return true;
  if (isBarrierCell(tx, ty, world)) return true;
  if (!isInsidePlayable(tx, ty, world.barrierBounds)) return true;
  return false;
}

/** Walls for raycasting — trees are drawn as volumetric columns instead. */
function isRayWall(tx, ty, world) {
  if (tileAt(tx, ty) === 'M') return true;
  if (isBarrierCell(tx, ty, world)) return true;
  if (!isInsidePlayable(tx, ty, world.barrierBounds)) return true;
  return false;
}

function isBarrierTile(tx, ty, world) {
  return isBarrierCell(tx, ty, world);
}

function isMountain(tx, ty) {
  return tileAt(tx, ty) === 'T';
}

export function isLake(tx, ty) {
  return tileAt(tx, ty) === 'L';
}

export function isOnLake(world) {
  return isLake(Math.floor(world.player.x), Math.floor(world.player.y));
}

function getLakeRegions() {
  const lakes = [];
  const visited = new Set();

  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] !== 'L') continue;
      const startKey = `${x},${y}`;
      if (visited.has(startKey)) continue;

      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      const queue = [[x, y]];

      while (queue.length > 0) {
        const [cx, cy] = queue.pop();
        const key = `${cx},${cy}`;
        if (visited.has(key) || tileAt(cx, cy) !== 'L') continue;
        visited.add(key);
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);
        queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }

      lakes.push({
        id: `lake-${minX}-${minY}`,
        minX,
        maxX,
        minY,
        maxY,
        centerX: (minX + maxX) / 2 + 0.5,
        centerY: (minY + maxY) / 2 + 0.5,
      });
    }
  }
  return lakes;
}

function spawnDucksInLakes() {
  const ducks = [];
  getLakeRegions().forEach((lake, lakeIndex) => {
    for (let i = 0; i < 2; i += 1) {
      ducks.push({
        id: `duck-${lake.id}-w-${i}`,
        lakeId: lake.id,
        onLand: false,
        x: lake.centerX + (i - 0.5) * 0.7,
        y: lake.centerY + (i % 2) * 0.4,
        minX: lake.minX + 0.25,
        maxX: lake.maxX + 0.75,
        minY: lake.minY + 0.25,
        maxY: lake.maxY + 0.75,
        waddle: Math.random() * Math.PI * 2,
        collected: false,
        respawnTimer: 0,
      });
    }

    const shoreSpots = [
      { x: lake.minX - 0.5, y: lake.centerY },
      { x: lake.maxX + 1.5, y: lake.centerY + 0.5 },
    ];
    shoreSpots.forEach((spot, i) => {
      const tx = Math.floor(spot.x);
      const ty = Math.floor(spot.y);
      if (isLake(tx, ty) || tileAt(tx, ty) === 'M') return;
      ducks.push({
        id: `duck-${lake.id}-s-${i}`,
        lakeId: lake.id,
        onLand: true,
        x: spot.x,
        y: spot.y,
        minX: spot.x - 0.4,
        maxX: spot.x + 0.4,
        minY: spot.y - 0.4,
        maxY: spot.y + 0.4,
        waddle: Math.random() * Math.PI * 2,
        collected: false,
        respawnTimer: 0,
      });
    });
  });
  return ducks;
}

export function getDoorPositions() {
  const doors = [];
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === 'D') {
        doors.push({ x: x + 0.5, y: y + 0.5, id: `d${x}-${y}` });
      }
    }
  }
  if (doors.length === 0) {
    doors.push({ x: 20.5, y: 11.5, id: 'd0' });
    doors.push({ x: 16.5, y: 16.5, id: 'd1' });
    doors.push({ x: 6.5, y: 11.5, id: 'd2' });
  }
  return doors;
}

export function getDuckSpawnPositions() {
  return getLakeRegions().map((lake) => ({
    x: lake.centerX,
    y: lake.centerY,
    id: lake.id,
  }));
}

function spawnTrees() {
  const trees = [];
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === 'R') {
        trees.push({
          id: `tree-${x}-${y}`,
          x: x + 0.5,
          y: y + 0.5,
          chopped: false,
        });
      }
    }
  }
  return trees;
}

function getCampfirePosition() {
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === 'F') {
        return { x: x + 0.5, y: y + 0.5 };
      }
    }
  }
  return { x: 11.5, y: 8.5 };
}

function wallColor(wx, wy, side, isNight, elevation, world) {
  if (isBarrierTile(wx, wy, world)) {
    return isNight
      ? (side === 0 ? '#64748b' : '#475569')
      : (side === 0 ? '#94a3b8' : '#64748b');
  }
  if (isNight) {
    return side === 0 ? '#1e3a5f' : '#0f172a';
  }
  if (elevation >= 4) {
    return side === 0 ? '#94a3b8' : '#64748b';
  }
  const stripe = (Math.floor(wx) + Math.floor(wy)) % 2;
  return stripe ? (side === 0 ? '#166534' : '#14532d') : (side === 0 ? '#15803d' : '#166534');
}

export function createWorld3D() {
  const spawn = getSpawn();
  const campfirePos = getCampfirePosition();
  return {
    player: { x: spawn.x, y: spawn.y, angle: 0, height: spawn.height },
    doors: getDoorPositions(),
    lakes: getLakeRegions(),
    wildDucks: spawnDucksInLakes(),
    trees: spawnTrees(),
    campfire: createCampfire(campfirePos.x, campfirePos.y),
    barrierLevel: 0,
    barrierBounds: { ...BARRIER_BOUNDS[0] },
  };
}

export function resetPlayer(world) {
  const spawn = getSpawn();
  world.player.x = spawn.x;
  world.player.y = spawn.y;
  world.player.angle = spawn.angle;
  world.player.height = spawn.height;
}

function castRay(px, py, angle, playerHeight, world) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let depth = 0.05;

  while (depth < MAX_DEPTH) {
    const rx = px + cos * depth;
    const ry = py + sin * depth;
    const tx = Math.floor(rx);
    const ty = Math.floor(ry);

    if (isRayWall(tx, ty, world)) {
      const side = Math.abs(rx - tx - 0.5) > Math.abs(ry - ty - 0.5) ? 0 : 1;
      const elev = getHeightAt(tx, ty);
      return { depth, wallX: rx, wallY: ry, mapX: tx, mapY: ty, side, elev };
    }
    depth += RAY_STEP;
  }

  return { depth: MAX_DEPTH, wallX: 0, wallY: 0, mapX: 0, mapY: 0, side: 0, elev: 0 };
}

function canMoveTo(world, nx, ny) {
  const tx = Math.floor(nx);
  const ty = Math.floor(ny);
  if (isWall(tx, ty, world)) return false;
  const targetH = getHeightAt(tx, ty);
  const climb = targetH - world.player.height;
  return climb <= 1.05 && climb >= -2;
}

function tryMove(world, dx, dy) {
  const margin = 0.2;
  const nx = world.player.x + dx;
  const ny = world.player.y + dy;

  if (canMoveTo(world, nx, world.player.y)) {
    world.player.x = nx;
  }
  if (canMoveTo(world, world.player.x, ny)) {
    world.player.y = ny;
  }

  const tx = Math.floor(world.player.x);
  const ty = Math.floor(world.player.y);
  const groundH = getHeightAt(tx, ty);
  if (groundH > world.player.height) {
    world.player.height += Math.min(2.5 * 0.016, groundH - world.player.height);
  } else if (groundH < world.player.height) {
    world.player.height -= Math.min(2.5 * 0.016, world.player.height - groundH);
  }
}

export function updateWorldMovement(world, delta, input, moveSpeed = 4.5) {
  const { player } = world;
  let forward = 0;
  let strafe = 0;

  if (input.isPressed('arrowup', 'w')) forward += 1;       // forward
  if (input.isPressed('arrowdown', 's')) forward -= 1;   // backward
  if (input.isPressed('arrowleft', 'a')) strafe -= 1;    // left
  if (input.isPressed('arrowright', 'd')) strafe += 1;   // right

  if (forward === 0 && strafe === 0) return;

  const len = Math.hypot(forward, strafe);
  forward /= len;
  strafe /= len;

  const heightBonus = 1 + player.height * 0.08;
  const lakeSlow = isOnLake(world) ? 0.5 : 1;
  const speed = moveSpeed * heightBonus * lakeSlow * delta;
  const cos = Math.cos(player.angle);
  const sin = Math.sin(player.angle);
  tryMove(world, (cos * forward - sin * strafe) * speed, (sin * forward + cos * strafe) * speed);
}

export function worldDistance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

export function projectSprite(world, sprite, width, height, type = 'default') {
  const { player } = world;
  const dx = sprite.x - player.x;
  const dy = sprite.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.12) return null;

  let angle = Math.atan2(dy, dx) - player.angle;
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  if (Math.abs(angle) > FOV / 2 + 0.35) return null;

  const screenX = width / 2 + (angle / (FOV / 2)) * (width / 2);
  let spriteH;
  let spriteW;
  if (type === 'tree') {
    ({ spriteH, spriteW } = getTreeScreenSize(dist, height));
  } else if (type === 'duck') {
    ({ spriteH, spriteW } = getDuckScreenSize(dist, height));
  } else {
    spriteH = Math.min(height * 0.85, (height / dist) * 0.8);
    spriteW = spriteH * 0.55;
  }
  const heightOff = ((sprite.height ?? 0) - player.height) * 12;
  const groundY = height / 2 + heightOff + 6;

  return {
    screenX,
    dist,
    spriteH,
    spriteW,
    angle,
    screenY: groundY - spriteH * 0.45,
    groundY,
  };
}

function castTreeAlongRay(px, py, angle, world) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  let best = null;

  world.trees.forEach((tree) => {
    if (tree.chopped) return;
    const dx = tree.x - px;
    const dy = tree.y - py;
    const depth = dx * cos + dy * sin;
    if (depth < 0.2) return;

    const perpX = dx - depth * cos;
    const perpY = dy - depth * sin;
    if (perpX * perpX + perpY * perpY > TREE_RADIUS * TREE_RADIUS) return;

    if (!best || depth < best.depth) {
      const viewAngle = Math.atan2(dy, dx) - world.player.angle;
      best = { depth, tree, viewAngle };
    }
  });

  return best;
}

function drawSkyAndGround(ctx, width, height, isNight, playerHeight) {
  const sky = ctx.createLinearGradient(0, 0, 0, height / 2);
  const ground = ctx.createLinearGradient(0, height / 2, 0, height);

  if (isNight) {
    sky.addColorStop(0, '#0c4a6e');
    sky.addColorStop(1, '#14532d');
    ground.addColorStop(0, '#166534');
    ground.addColorStop(1, '#052e16');
  } else {
    sky.addColorStop(0, '#7dd3fc');
    sky.addColorStop(1, '#bbf7d0');
    const gShift = Math.min(0.3, playerHeight * 0.08);
    ground.addColorStop(0, `rgb(${34 + gShift * 40}, ${197 - gShift * 30}, ${94})`);
    ground.addColorStop(1, '#16a34a');
  }

  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height / 2);
  ctx.fillStyle = ground;
  ctx.fillRect(0, height / 2, width, height / 2);

  ctx.fillStyle = isNight ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.12)';
  for (let i = 0; i < 16; i += 1) {
    ctx.fillRect(0, height / 2 + 15 + i * 22, width, 2);
  }
}

function drawMountains(ctx, width, height, world, isNight) {
  const { player } = world;
  const halfH = height / 2;
  const rayCount = Math.floor(width / 2.5);
  const stripW = width / rayCount;

  for (let i = 0; i < rayCount; i += 1) {
    const rayAngle = player.angle - FOV / 2 + (FOV * i) / rayCount;
    const cosA = Math.cos(rayAngle - player.angle);
    if (cosA <= 0.05) continue;

    const screenX = width / 2 + (Math.tan(rayAngle - player.angle) / Math.tan(FOV / 2)) * (width / 2);

    for (const dist of [3, 6, 10, 16, 22]) {
      const rx = player.x + Math.cos(rayAngle) * dist;
      const ry = player.y + Math.sin(rayAngle) * dist;
      const groundH = getHeightAt(Math.floor(rx), Math.floor(ry));
      if (groundH <= 0) continue;

      const corrected = dist * cosA;
      const scale = height / corrected;
      const moundH = Math.min(groundH >= 3 ? 120 : 72, scale * groundH * (groundH >= 3 ? 0.42 : 0.22));
      const floorY = halfH - moundH * 0.55 + (player.height - groundH) * 2;

      if (groundH >= 3) {
        const rock = ctx.createLinearGradient(0, floorY, 0, floorY + moundH);
        if (isNight) {
          rock.addColorStop(0, 'rgba(71,85,105,0.9)');
          rock.addColorStop(0.7, 'rgba(51,65,85,0.95)');
          rock.addColorStop(1, 'rgba(30,41,59,1)');
        } else {
          rock.addColorStop(0, 'rgba(226,232,240,0.95)');
          rock.addColorStop(0.15, 'rgba(148,163,184,0.9)');
          rock.addColorStop(0.55, 'rgba(100,116,139,0.95)');
          rock.addColorStop(1, 'rgba(71,85,105,1)');
        }
        ctx.fillStyle = rock;
        ctx.beginPath();
        ctx.moveTo(screenX - stripW * 0.8, halfH + 20);
        ctx.lineTo(screenX, floorY);
        ctx.lineTo(screenX + stripW * 0.8, halfH + 20);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = isNight
          ? `rgba(21,128,61,${0.25 + groundH * 0.1})`
          : `rgba(74,222,128,${0.28 + groundH * 0.12})`;
        ctx.fillRect(screenX - stripW / 2, floorY, stripW + 1, moundH + 8);
      }
    }
  }
}

function drawWallStripes(ctx, x, y, w, h, color, depth) {
  const shade = Math.max(0.3, 1 - depth / MAX_DEPTH);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w + 1, h);
  ctx.fillStyle = `rgba(0,0,0,${0.35 * (1 - shade)})`;
  ctx.fillRect(x, y, w + 1, h);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(x, y, w + 1, 3);
}

function drawLakePatches(ctx, width, height, world, isNight) {
  world.lakes.forEach((lake) => {
    const proj = projectSprite(world, { x: lake.centerX, y: lake.centerY }, width, height);
    if (!proj) return;

    const lakeW = (lake.maxX - lake.minX + 2.4) * (proj.spriteH / 1.9);
    const lakeH = (lake.maxY - lake.minY + 1.8) * (proj.spriteH / 2.6);
    const sy = height / 2 + proj.spriteH * 0.12;

    const water = ctx.createLinearGradient(0, sy, 0, sy + lakeH);
    if (isNight) {
      water.addColorStop(0, 'rgba(12, 74, 110, 0.9)');
      water.addColorStop(0.5, 'rgba(8, 58, 90, 0.92)');
      water.addColorStop(1, 'rgba(8, 47, 73, 0.95)');
    } else {
      water.addColorStop(0, 'rgba(56, 189, 248, 0.82)');
      water.addColorStop(0.5, 'rgba(34, 175, 240, 0.88)');
      water.addColorStop(1, 'rgba(14, 165, 233, 0.92)');
    }

    ctx.fillStyle = water;
    ctx.beginPath();
    ctx.ellipse(proj.screenX, sy + lakeH / 2, lakeW / 2, lakeH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isNight ? 'rgba(125, 211, 252, 0.35)' : 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = isNight ? 'rgba(125,211,252,0.15)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i += 1) {
      ctx.beginPath();
      ctx.ellipse(proj.screenX, sy + lakeH / 2, lakeW / 2 - i * 8, lakeH / 2 - i * 4, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

export function renderWorld3D(ctx, width, height, world, gameState, sprites) {
  renderThreeWorld(world, gameState, width, height, ctx.canvas);

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  const ch = 8;
  ctx.beginPath();
  ctx.moveTo(width / 2 - ch, height / 2);
  ctx.lineTo(width / 2 + ch, height / 2);
  ctx.moveTo(width / 2, height / 2 - ch);
  ctx.lineTo(width / 2, height / 2 + ch);
  ctx.stroke();
}

export function buildSpriteList(world, gameState, width, height) {
  const sprites = [];

  sprites.push({
    sprite: world.campfire,
    dist: worldDistance(world.player.x, world.player.y, world.campfire.x, world.campfire.y),
    type: 'campfire',
    proj: projectSprite(world, world.campfire, width, height),
  });

  world.trees.forEach((tree) => {
    if (tree.chopped) return;
    sprites.push({
      sprite: tree,
      dist: worldDistance(world.player.x, world.player.y, tree.x, tree.y),
      type: 'tree',
      proj: projectSprite(world, tree, width, height, 'tree'),
    });
  });

  world.wildDucks.forEach((duck) => {
    if (duck.collected) return;
    const proj = projectSprite(world, duck, width, height, 'duck');
    if (proj && isLake(Math.floor(duck.x), Math.floor(duck.y))) {
      proj.groundY += height * 0.018;
    }
    sprites.push({
      sprite: { ...duck, live: true },
      dist: worldDistance(world.player.x, world.player.y, duck.x, duck.y),
      type: 'duck',
      proj,
    });
  });

  gameState.kids.forEach((kid) => {
    if (kid.defeated) return;
    sprites.push({
      sprite: kid,
      dist: worldDistance(world.player.x, world.player.y, kid.x, kid.y),
      type: 'kid',
      proj: projectSprite(world, kid, width, height),
    });
  });

  return sprites;
}

function clickToWorldAngle(world, width, clickX) {
  const normX = (clickX - width / 2) / (width / 2);
  return world.player.angle + normX * (FOV / 2);
}

export function findTreeAtClick(world, width, height, clickX, clickY) {
  const { player } = world;
  const aimAngle = clickToWorldAngle(world, width, clickX);
  let best = null;

  world.trees.forEach((tree) => {
    if (tree.chopped) return;
    const dist = worldDistance(player.x, player.y, tree.x, tree.y);
    if (dist > CHOP_RANGE) return;

    const dx = tree.x - player.x;
    const dy = tree.y - player.y;
    let angleDiff = Math.atan2(dy, dx) - aimAngle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    const hitAngle = Math.atan2(TREE_RADIUS * 3.2, Math.max(dist, 0.35));
    if (Math.abs(angleDiff) > hitAngle) return;

    const proj = projectSprite(world, tree, width, height, 'tree');
    if (proj) {
      const sx = proj.screenX;
      const gy = proj.groundY ?? height / 2 + 6;
      const sw = proj.spriteW * 1.15;
      const sh = proj.spriteH * 0.85;
      const top = gy - sh;
      if (
        clickX < sx - sw / 2 || clickX > sx + sw / 2 ||
        clickY < top || clickY > gy + sh * 0.05
      ) {
        return;
      }
    }

    if (!best || dist < best.dist) {
      best = { type: 'tree', sprite: tree, dist };
    }
  });

  return best;
}

export function findClickTarget(world, gameState, width, height, clickX, clickY) {
  const treeHit = findTreeAtClick(world, width, height, clickX, clickY);
  if (treeHit) return treeHit;

  const allSprites = buildSpriteList(world, gameState, width, height)
    .filter((s) => s.proj)
    .sort((a, b) => a.dist - b.dist);

  for (const entry of allSprites) {
    if (entry.type === 'campfire') {
      const { proj, sprite, type } = entry;
      const sx = proj.screenX;
      const gy = proj.groundY ?? height / 2 + 6;
      const sw = proj.spriteW * (type === 'campfire' ? 1 + getCampfireRadius(sprite) * 0.4 : 1);
      const sh = proj.spriteH * (type === 'campfire' ? 1 + getCampfireRadius(sprite) * 0.3 : 1);
      const top = gy - sh;
      if (
        clickX >= sx - sw / 2 && clickX <= sx + sw / 2 &&
        clickY >= top && clickY <= gy + sh * 0.1
      ) {
        return { type, sprite, dist: entry.dist };
      }
    }
  }

  const kids = allSprites
    .filter((s) => s.type === 'kid')
    .sort((a, b) => a.dist - b.dist);

  for (const entry of kids) {
    const { proj, sprite } = entry;
    const sx = proj.screenX;
    const gy = proj.groundY ?? height / 2 + 6;
    const sw = proj.spriteW;
    const sh = proj.spriteH;
    if (
      clickX >= sx - sw / 2 && clickX <= sx + sw / 2 &&
      clickY >= gy - sh * 0.55 && clickY <= gy + sh * 0.1
    ) {
      return { type: 'kid', sprite, dist: entry.dist };
    }
  }

  if (gameState.phase === 'DAY' || gameState.phase === 'NIGHT') {
    for (const duck of world.wildDucks) {
      if (duck.collected) continue;
      const proj = projectSprite(world, duck, width, height, 'duck');
      if (!proj) continue;
      const sx = proj.screenX;
      const gy = proj.groundY ?? height / 2 + 6;
      const sw = proj.spriteW;
      const sh = proj.spriteH;
      if (
        clickX >= sx - sw / 2 && clickX <= sx + sw / 2 &&
        clickY >= gy - sh * 0.35 && clickY <= gy + sh * 0.08
      ) {
        return { type: 'duck', sprite: duck, dist: worldDistance(world.player.x, world.player.y, duck.x, duck.y) };
      }
    }
  }

  return null;
}

export function updateWildDucks(world, delta) {
  world.wildDucks.forEach((duck) => {
    if (duck.collected) {
      duck.respawnTimer -= delta;
      if (duck.respawnTimer <= 0) {
        duck.collected = false;
        duck.x = (duck.minX + duck.maxX) / 2;
        duck.y = (duck.minY + duck.maxY) / 2;
      }
      return;
    }

    duck.waddle += delta * 1.5;
    duck.x += Math.sin(duck.waddle) * delta * 0.25;
    duck.y += Math.cos(duck.waddle * 0.8) * delta * 0.2;

    duck.x = Math.max(duck.minX, Math.min(duck.maxX, duck.x));
    duck.y = Math.max(duck.minY, Math.min(duck.maxY, duck.y));
  });
}

export function chopTree(world, tree) {
  if (tree.chopped) return false;
  tree.chopped = true;
  return true;
}

export function updateCampfire(world, delta) {
  if (world.campfire.expandFlash > 0) {
    world.campfire.expandFlash -= delta;
  }
  tryExpandCampfire(world.campfire, world);
}

export function collectDuck(duck) {
  if (duck.collected) return false;
  duck.collected = true;
  duck.respawnTimer = 45;
  return true;
}
