/**
 * Outdoor green platform world with climbable hills — raycasting.
 */

const MAP = [
  'MMMMMMMMMMMMMMMMMMMMMMMM',
  'Mgg..............ggggggM',
  'Mg....................gM',
  'Mg...GGG....GGG.......gM',
  'Mg..G...G..G...G......gM',
  'Mg..G.@.G..G...G......gM',
  'Mg..G...G..G...G......gM',
  'Mg...GGG....GGG.......gM',
  'Mg....................gM',
  'Mg......LLLL..........gM',
  'Mg.....LLLLL..........gM',
  'Mg.....LLLLL....D.....gM',
  'Mg......LLLL..........gM',
  'Mg.........LLLL.......gM',
  'Mg.........LLLLL......gM',
  'Mg.........LLLLL......gM',
  'Mg...GGG........GGG...gM',
  'Mg..G...G......G...G..gM',
  'Mg..G...G..D..G...G...gM',
  'Mg..G...G......G...G..gM',
  'Mg...GGG........GGG...gM',
  'MggggggggggggggggggggggM',
  'MMMMMMMMMMMMMMMMMMMMMMMM',
];

const HEIGHT = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,2,2,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,2,2,2,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,2,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,3],
  [3,1,0,0,0,2,2,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,3],
  [3,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];

const MAP_H = MAP.length;
const MAP_W = MAP[0].length;
const FOV = Math.PI / 2.6;
const MAX_DEPTH = 28;
const WALL_HEIGHT = 1.1;

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

function isWall(tx, ty) {
  const t = tileAt(tx, ty);
  return t === 'M' || t === 'G';
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
    const count = 1 + (lakeIndex % 2);
    for (let i = 0; i < count; i += 1) {
      ducks.push({
        id: `duck-${lake.id}-${i}`,
        lakeId: lake.id,
        x: lake.centerX + (i - 0.5) * 0.8,
        y: lake.centerY + (i % 2) * 0.5,
        minX: lake.minX + 0.3,
        maxX: lake.maxX + 0.7,
        minY: lake.minY + 0.3,
        maxY: lake.maxY + 0.7,
        waddle: Math.random() * Math.PI * 2,
        collected: false,
        respawnTimer: 0,
      });
    }
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

function wallColor(wx, wy, side, isNight, elevation) {
  const base = elevation >= 2 ? '#14532d' : elevation >= 1 ? '#16a34a' : '#22c55e';
  if (isNight) {
    return side === 0 ? '#14532d' : '#052e16';
  }
  const stripe = (Math.floor(wx) + Math.floor(wy)) % 2;
  if (stripe) {
    return side === 0 ? base : '#15803d';
  }
  return side === 0 ? '#4ade80' : base;
}

export function createWorld3D() {
  const spawn = getSpawn();
  return {
    player: { x: spawn.x, y: spawn.y, angle: spawn.angle, height: spawn.height },
    doors: getDoorPositions(),
    lakes: getLakeRegions(),
    wildDucks: spawnDucksInLakes(),
  };
}

export function resetPlayer(world) {
  const spawn = getSpawn();
  world.player.x = spawn.x;
  world.player.y = spawn.y;
  world.player.angle = spawn.angle;
  world.player.height = spawn.height;
}

function castRay(px, py, angle, playerHeight) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let depth = 0.05;

  while (depth < MAX_DEPTH) {
    const rx = px + cos * depth;
    const ry = py + sin * depth;
    const tx = Math.floor(rx);
    const ty = Math.floor(ry);

    if (isWall(tx, ty)) {
      const side = Math.abs(rx - tx - 0.5) > Math.abs(ry - ty - 0.5) ? 0 : 1;
      const elev = getHeightAt(tx, ty);
      return { depth, wallX: rx, wallY: ry, mapX: tx, mapY: ty, side, elev };
    }
    depth += 0.02;
  }

  return { depth: MAX_DEPTH, wallX: 0, wallY: 0, mapX: 0, mapY: 0, side: 0, elev: 0 };
}

function canMoveTo(world, nx, ny) {
  const tx = Math.floor(nx);
  const ty = Math.floor(ny);
  if (isWall(tx, ty)) return false;
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

  if (input.isPressed('arrowup')) forward += 1;
  if (input.isPressed('arrowdown')) forward -= 1;
  if (input.isPressed('arrowleft')) strafe -= 1;
  if (input.isPressed('arrowright')) strafe += 1;

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

export function projectSprite(world, sprite, width, height) {
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
  const spriteH = Math.min(height * 0.85, (height / dist) * 0.8);
  const spriteW = spriteH * 0.55;
  const heightOff = ((sprite.height ?? 0) - player.height) * 12;

  return { screenX, dist, spriteH, spriteW, angle, screenY: height / 2 + heightOff };
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

function drawWallStripes(ctx, x, y, w, h, color, depth) {
  const shade = Math.max(0.3, 1 - depth / MAX_DEPTH);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w + 1, h);
  ctx.fillStyle = `rgba(0,0,0,${0.35 * (1 - shade)})`;
  ctx.fillRect(x, y, w + 1, h);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(x, y, w + 1, 3);
}

function drawKidBillboard(ctx, sx, sy, sw, sh, kid, isNight) {
  const mood = kid.mood || 'angry';
  const body = mood === 'scared' ? '#94a3b8' : '#6366f1';
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + sh * 0.48, sw * 0.45, sh * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = body;
  ctx.fillRect(sx - sw * 0.22, sy - sh * 0.05, sw * 0.44, sh * 0.42);
  ctx.fillRect(sx - sw * 0.38, sy + sh * 0.02, sw * 0.18, sh * 0.32);
  ctx.fillRect(sx + sw * 0.2, sy + sh * 0.02, sw * 0.18, sh * 0.32);
  ctx.fillStyle = '#818cf8';
  ctx.beginPath();
  ctx.arc(sx, sy - sh * 0.22, sw * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(sx - sw * 0.08, sy - sh * 0.24, sw * 0.04, 0, Math.PI * 2);
  ctx.arc(sx + sw * 0.08, sy - sh * 0.24, sw * 0.04, 0, Math.PI * 2);
  ctx.fill();
  if (kid.hitFlash > 0) {
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.strokeRect(sx - sw / 2, sy - sh / 2, sw, sh);
  }
}

function drawDuckBillboard(ctx, sx, sy, sw, sh, live = false) {
  const bounce = Math.sin(Date.now() / 200) * 3;
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.ellipse(sx, sy + bounce, sw * 0.35, sh * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sx + sw * 0.15, sy - sh * 0.12 + bounce, sw * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(sx + sw * 0.28, sy - sh * 0.08 + bounce, sw * 0.07, 0, Math.PI * 2);
  ctx.fill();
  if (live) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(sx - sw * 0.2, sy - sh * 0.3 + bounce, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLakePatches(ctx, width, height, world, isNight) {
  world.lakes.forEach((lake) => {
    const proj = projectSprite(world, { x: lake.centerX, y: lake.centerY }, width, height);
    if (!proj) return;

    const lakeW = (lake.maxX - lake.minX + 1.2) * (proj.spriteH / 3.5);
    const lakeH = (lake.maxY - lake.minY + 1) * (proj.spriteH / 5);
    const sy = height / 2 + proj.spriteH * 0.15;

    const water = ctx.createLinearGradient(0, sy, 0, sy + lakeH);
    if (isNight) {
      water.addColorStop(0, 'rgba(12, 74, 110, 0.85)');
      water.addColorStop(1, 'rgba(8, 47, 73, 0.9)');
    } else {
      water.addColorStop(0, 'rgba(56, 189, 248, 0.75)');
      water.addColorStop(1, 'rgba(14, 165, 233, 0.85)');
    }

    ctx.fillStyle = water;
    ctx.beginPath();
    ctx.ellipse(proj.screenX, sy + lakeH / 2, lakeW / 2, lakeH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isNight ? 'rgba(125, 211, 252, 0.3)' : 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

export function renderWorld3D(ctx, width, height, world, gameState, sprites) {
  const isNight = gameState.phase === 'NIGHT';
  const { player } = world;

  drawSkyAndGround(ctx, width, height, isNight, player.height);
  drawLakePatches(ctx, width, height, world, isNight);

  const rayCount = Math.floor(width / 2);
  const stripW = width / rayCount;

  for (let i = 0; i < rayCount; i += 1) {
    const rayAngle = player.angle - FOV / 2 + (FOV * i) / rayCount;
    const hit = castRay(player.x, player.y, rayAngle, player.height);
    const corrected = hit.depth * Math.cos(rayAngle - player.angle);
    const elevScale = 1 + hit.elev * 0.15;
    const wallH = Math.min(height * 0.95, (height / corrected) * WALL_HEIGHT * elevScale);
    const wallTop = (height - wallH) / 2 - hit.elev * 8;

    const color = wallColor(hit.mapX, hit.mapY, hit.side, isNight, hit.elev);
    drawWallStripes(ctx, i * stripW, wallTop, stripW, wallH, color, corrected);
  }

  [...sprites].sort((a, b) => b.dist - a.dist).forEach(({ sprite, proj, type }) => {
    if (!proj) return;
    const sx = proj.screenX;
    const sy = (proj.screenY ?? height / 2) + proj.spriteH * 0.08;
    const sw = proj.spriteW;
    const sh = proj.spriteH;
    if (type === 'kid') drawKidBillboard(ctx, sx, sy, sw, sh, sprite, isNight);
    else if (type === 'duck') drawDuckBillboard(ctx, sx, sy, sw, sh, sprite.live);
  });

  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
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

  world.wildDucks.forEach((duck) => {
    if (duck.collected) return;
    sprites.push({
      sprite: { ...duck, live: true },
      dist: worldDistance(world.player.x, world.player.y, duck.x, duck.y),
      type: 'duck',
      proj: projectSprite(world, duck, width, height),
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

export function findClickTarget(world, gameState, width, height, clickX, clickY) {
  const sprites = buildSpriteList(world, gameState, width, height)
    .filter((s) => s.type === 'kid' && s.proj)
    .sort((a, b) => a.dist - b.dist);

  for (const entry of sprites) {
    const { proj, sprite } = entry;
    const sx = proj.screenX;
    const sy = (proj.screenY ?? height / 2) + proj.spriteH * 0.08;
    const sw = proj.spriteW;
    const sh = proj.spriteH;
    if (
      clickX >= sx - sw / 2 && clickX <= sx + sw / 2 &&
      clickY >= sy - sh / 2 && clickY <= sy + sh / 2
    ) {
      return { type: 'kid', sprite, dist: entry.dist };
    }
  }

  if (gameState.phase === 'DAY' || gameState.phase === 'NIGHT') {
    for (const duck of world.wildDucks) {
      if (duck.collected) continue;
      const proj = projectSprite(world, duck, width, height);
      if (!proj) continue;
      const sx = proj.screenX;
      const sy = (proj.screenY ?? height / 2) + proj.spriteH * 0.08;
      const sw = proj.spriteW;
      const sh = proj.spriteH;
      if (
        clickX >= sx - sw / 2 && clickX <= sx + sw / 2 &&
        clickY >= sy - sh / 2 && clickY <= sy + sh / 2
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

export function collectDuck(duck) {
  if (duck.collected) return false;
  duck.collected = true;
  duck.respawnTimer = 45;
  return true;
}
