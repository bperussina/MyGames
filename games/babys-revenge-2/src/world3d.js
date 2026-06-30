/**
 * First-person 3D nursery (raycasting) — Baby's Revenge 1 style.
 */

const MAP = [
  '####################',
  '#......##..........#',
  '#..T...##...T......#',
  '#......D#D.........#',
  '#......##..........#',
  '#......##..........#',
  '####....##....######',
  '#........#.........#',
  '#...@....#....D....#',
  '#........#.........#',
  '####....##....######',
  '#......##..........#',
  '#..D...##...D......#',
  '#......##..........#',
  '#......##..........#',
  '####################',
];

const MAP_H = MAP.length;
const MAP_W = MAP[0].length;
const FOV = Math.PI / 2.8;
const MAX_DEPTH = 22;
const WALL_HEIGHT = 1;

export const DOOR_TILES = new Set(['D']);

export function getSpawn() {
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === '@') {
        return { x: x + 0.5, y: y + 0.5, angle: 0 };
      }
    }
  }
  return { x: 2.5, y: 2.5, angle: 0 };
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
  return doors;
}

export function getToyBoxPositions() {
  const boxes = [];
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      if (MAP[y][x] === 'T') {
        boxes.push({ x: x + 0.5, y: y + 0.5, id: `t${x}-${y}` });
      }
    }
  }
  return boxes;
}

function isWall(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) {
    return true;
  }
  const c = MAP[ty][tx];
  return c === '#' || c === 'D';
}

function wallColor(wx, wy, side, isNight) {
  const stripe = (Math.floor(wx) + Math.floor(wy)) % 2;
  if (isNight) {
    return side === 0
      ? (stripe ? '#4c1d95' : '#5b21b6')
      : (stripe ? '#3b0764' : '#4c1d95');
  }
  return side === 0
    ? (stripe ? '#fbcfe8' : '#f9a8d4')
    : (stripe ? '#fda4af' : '#fb7185');
}

export function createWorld3D() {
  const spawn = getSpawn();
  return {
    player: { x: spawn.x, y: spawn.y, angle: spawn.angle },
    doors: getDoorPositions(),
    toyBoxes: getToyBoxPositions(),
  };
}

export function resetPlayer(world) {
  const spawn = getSpawn();
  world.player.x = spawn.x;
  world.player.y = spawn.y;
  world.player.angle = spawn.angle;
}

function castRay(px, py, angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let depth = 0.05;

  while (depth < MAX_DEPTH) {
    const rx = px + cos * depth;
    const ry = py + sin * depth;
    const tx = Math.floor(rx);
    const ty = Math.floor(ry);

    if (isWall(tx, ty)) {
      const side =
        Math.abs(rx - tx - 0.5) > Math.abs(ry - ty - 0.5) ? 0 : 1;
      return { depth, wallX: rx, wallY: ry, mapX: tx, mapY: ty, side };
    }
    depth += 0.02;
  }

  return { depth: MAX_DEPTH, wallX: 0, wallY: 0, mapX: 0, mapY: 0, side: 0 };
}

function tryMove(world, dx, dy) {
  const margin = 0.22;
  const nx = world.player.x + dx;
  const ny = world.player.y + dy;

  if (!isWall(Math.floor(nx - margin), Math.floor(world.player.y))) {
    world.player.x = nx;
  }
  if (!isWall(Math.floor(world.player.x), Math.floor(ny - margin))) {
    world.player.y = ny;
  }
}

export function updateWorldMovement(world, delta, input, moveSpeed = 3.8, rotSpeed = 2.8) {
  const { player } = world;

  if (input.isPressed('arrowleft', 'a')) {
    player.angle -= rotSpeed * delta;
  }
  if (input.isPressed('arrowright', 'd')) {
    player.angle += rotSpeed * delta;
  }

  let move = 0;
  if (input.isPressed('arrowup', 'w')) move += 1;
  if (input.isPressed('arrowdown', 's')) move -= 1;

  if (move !== 0) {
    const speed = moveSpeed * delta * move;
    tryMove(world, Math.cos(player.angle) * speed, Math.sin(player.angle) * speed);
  }
}

export function worldDistance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

export function projectSprite(world, sprite, width, height) {
  const { player } = world;
  const dx = sprite.x - player.x;
  const dy = sprite.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.15) {
    return null;
  }

  let angle = Math.atan2(dy, dx) - player.angle;
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;

  if (Math.abs(angle) > FOV / 2 + 0.3) {
    return null;
  }

  const screenX = width / 2 + (angle / (FOV / 2)) * (width / 2);
  const spriteH = Math.min(height * 0.9, (height / dist) * 0.75);
  const spriteW = spriteH * 0.55;

  return { screenX, dist, spriteH, spriteW, angle };
}

function drawCeilingFloor(ctx, width, height, isNight) {
  const ceilGrad = ctx.createLinearGradient(0, 0, 0, height / 2);
  const floorGrad = ctx.createLinearGradient(0, height / 2, 0, height);

  if (isNight) {
    ceilGrad.addColorStop(0, '#0f172a');
    ceilGrad.addColorStop(1, '#1e1b4b');
    floorGrad.addColorStop(0, '#1e293b');
    floorGrad.addColorStop(1, '#312e81');
  } else {
    ceilGrad.addColorStop(0, '#bae6fd');
    ceilGrad.addColorStop(1, '#e0f2fe');
    floorGrad.addColorStop(0, '#fde68a');
    floorGrad.addColorStop(1, '#d4a574');
  }

  ctx.fillStyle = ceilGrad;
  ctx.fillRect(0, 0, width, height / 2);
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, height / 2, width, height / 2);

  if (!isNight) {
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 12; i += 1) {
      const fy = height / 2 + 20 + i * 28;
      ctx.fillRect(0, fy, width, 2);
    }
  }
}

function drawWallStripes(ctx, x, y, w, h, color, depth, isNight) {
  const shade = Math.max(0.25, 1 - depth / MAX_DEPTH);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w + 1, h);

  const stripeCount = Math.max(2, Math.floor(h / 18));
  for (let i = 0; i < stripeCount; i += 1) {
    const sy = y + (h / stripeCount) * i;
    ctx.fillStyle = `rgba(0,0,0,${isNight ? 0.15 : 0.06})`;
    ctx.fillRect(x, sy, w + 1, 2);
  }

  ctx.fillStyle = `rgba(0,0,0,${0.45 * (1 - shade)})`;
  ctx.fillRect(x, y, w + 1, h);
}

function drawKidBillboard(ctx, sx, sy, sw, sh, kid, isNight) {
  const mood = kid.mood || 'angry';
  const body = mood === 'scared' ? '#94a3b8' : (isNight ? '#4338ca' : '#6366f1');
  const head = mood === 'scared' ? '#cbd5e1' : '#818cf8';

  ctx.fillStyle = `rgba(0,0,0,0.35)`;
  ctx.beginPath();
  ctx.ellipse(sx, sy + sh * 0.48, sw * 0.45, sh * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = body;
  ctx.fillRect(sx - sw * 0.22, sy - sh * 0.05, sw * 0.44, sh * 0.42);
  ctx.fillRect(sx - sw * 0.38, sy + sh * 0.02, sw * 0.18, sh * 0.32);
  ctx.fillRect(sx + sw * 0.2, sy + sh * 0.02, sw * 0.18, sh * 0.32);

  ctx.fillStyle = head;
  ctx.beginPath();
  ctx.arc(sx, sy - sh * 0.22, sw * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(sx - sw * 0.08, sy - sh * 0.24, sw * 0.04, 0, Math.PI * 2);
  ctx.arc(sx + sw * 0.08, sy - sh * 0.24, sw * 0.04, 0, Math.PI * 2);
  ctx.fill();

  if (mood === 'angry') {
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - sw * 0.14, sy - sh * 0.3);
    ctx.lineTo(sx - sw * 0.04, sy - sh * 0.26);
    ctx.moveTo(sx + sw * 0.14, sy - sh * 0.3);
    ctx.lineTo(sx + sw * 0.04, sy - sh * 0.26);
    ctx.stroke();
  }

  if (kid.holdingToy) {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(sx + sw * 0.25, sy - sh * 0.1, sw * 0.15, sw * 0.15);
  }
}

function drawDuckBillboard(ctx, sx, sy, sw, sh) {
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.ellipse(sx, sy, sw * 0.35, sh * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sx + sw * 0.15, sy - sh * 0.12, sw * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(sx + sw * 0.28, sy - sh * 0.08, sw * 0.07, 0, Math.PI * 2);
  ctx.fill();
}

function drawToyBoxBillboard(ctx, sx, sy, sw, sh, glowing) {
  ctx.fillStyle = glowing ? '#fbbf24' : '#b45309';
  ctx.fillRect(sx - sw / 2, sy - sh / 2, sw, sh);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(sx - sw / 2 + 4, sy - sh / 2 + 4, sw - 8, sh - 8);
  ctx.fillStyle = '#fef3c7';
  ctx.font = `bold ${Math.max(10, sh * 0.18)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TOYS', sx, sy);
  if (glowing) {
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.strokeRect(sx - sw / 2 - 3, sy - sh / 2 - 3, sw + 6, sh + 6);
  }
}

export function renderWorld3D(ctx, width, height, world, gameState, sprites) {
  const isNight = gameState.phase === 'NIGHT';
  const { player } = world;

  drawCeilingFloor(ctx, width, height, isNight);

  const rayCount = Math.floor(width / 2);
  const stripW = width / rayCount;

  for (let i = 0; i < rayCount; i += 1) {
    const rayAngle = player.angle - FOV / 2 + (FOV * i) / rayCount;
    const hit = castRay(player.x, player.y, rayAngle);
    const corrected = hit.depth * Math.cos(rayAngle - player.angle);
    const wallH = Math.min(height, (height / corrected) * WALL_HEIGHT);
    const wallTop = (height - wallH) / 2;

    const color = wallColor(hit.mapX, hit.mapY, hit.side, isNight);
    drawWallStripes(ctx, i * stripW, wallTop, stripW, wallH, color, corrected, isNight);
  }

  const sorted = [...sprites].sort((a, b) => b.dist - a.dist);
  sorted.forEach((entry) => {
    const { sprite, proj, type } = entry;
    if (!proj) return;

    const sx = proj.screenX;
    const sy = height / 2 + proj.spriteH * 0.08;
    const sw = proj.spriteW;
    const sh = proj.spriteH;

    if (type === 'kid') {
      drawKidBillboard(ctx, sx, sy, sw, sh, sprite, isNight);
    } else if (type === 'duck') {
      drawDuckBillboard(ctx, sx, sy, sw, sh);
    } else if (type === 'toybox') {
      drawToyBoxBillboard(ctx, sx, sy, sw, sh, sprite.glowing);
    }
  });

  if (isNight) {
    const vig = ctx.createRadialGradient(
      width / 2, height / 2, height * 0.2,
      width / 2, height / 2, height * 0.85
    );
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.strokeStyle = isNight ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.35)';
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
  const isNight = gameState.phase === 'NIGHT';

  if (!isNight) {
    world.toyBoxes.forEach((box) => {
      const dist = worldDistance(world.player.x, world.player.y, box.x, box.y);
      sprites.push({
        sprite: { ...box, glowing: false },
        dist,
        type: 'toybox',
        proj: projectSprite(world, box, width, height),
      });
    });

    const duckSpots = [
      { x: 4.5, y: 2.5 },
      { x: 15.5, y: 2.5 },
      { x: 10.5, y: 13.5 },
    ];
    duckSpots.forEach((d) => {
      const dist = worldDistance(world.player.x, world.player.y, d.x, d.y);
      sprites.push({
        sprite: d,
        dist,
        type: 'duck',
        proj: projectSprite(world, d, width, height),
      });
    });
  }

  gameState.kids.forEach((kid) => {
    const dist = worldDistance(world.player.x, world.player.y, kid.x, kid.y);
    sprites.push({
      sprite: kid,
      dist,
      type: 'kid',
      proj: projectSprite(world, kid, width, height),
    });
  });

  if (gameState.toyBoxVisible && gameState.toyBoxWorld) {
    const dist = worldDistance(
      world.player.x,
      world.player.y,
      gameState.toyBoxWorld.x,
      gameState.toyBoxWorld.y
    );
    sprites.push({
      sprite: { ...gameState.toyBoxWorld, glowing: true },
      dist,
      type: 'toybox',
      proj: projectSprite(world, gameState.toyBoxWorld, width, height),
    });
  }

  return sprites;
}

export function getNearestToyBox(world) {
  let best = null;
  let bestDist = Infinity;
  world.toyBoxes.forEach((box) => {
    const d = worldDistance(world.player.x, world.player.y, box.x, box.y);
    if (d < bestDist) {
      bestDist = d;
      best = box;
    }
  });
  return { box: best, dist: bestDist };
}
