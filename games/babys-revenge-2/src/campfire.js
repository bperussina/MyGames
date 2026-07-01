export const LOGS_PER_LEVEL = 25;
export const LOGS_PER_TREE = 5;
export const MAX_CAMPFIRE_LEVEL = 6;
export const CAMPFIRE_INTERACT_RANGE = 2.8;
export const GROWTH_PER_LOG = 0.045;

/** Gray barrier square — expands each level (not too big at start). */
export const BARRIER_BOUNDS = [
  { minX: 7, maxX: 17, minY: 8, maxY: 15 },
  { minX: 6, maxX: 18, minY: 7, maxY: 16 },
  { minX: 5, maxX: 19, minY: 6, maxY: 17 },
  { minX: 4, maxX: 20, minY: 5, maxY: 18 },
  { minX: 3, maxX: 21, minY: 4, maxY: 19 },
  { minX: 2, maxX: 22, minY: 3, maxY: 20 },
  { minX: 1, maxX: 22, minY: 2, maxY: 21 },
];

/** Two corner "legs" north of the top-left and top-right barrier corners. */
export function getBarrierLegs(level) {
  const b = BARRIER_BOUNDS[Math.min(level, BARRIER_BOUNDS.length - 1)];
  const legY = b.minY - 1;
  return [
    { x: b.minX, y: legY },
    { x: b.minX + 1, y: legY },
    { x: b.maxX - 1, y: legY },
    { x: b.maxX, y: legY },
  ];
}

export function isBarrierCell(tx, ty, world) {
  const bounds = world.barrierBounds;
  if (tx < bounds.minX || tx > bounds.maxX || ty < bounds.minY || ty > bounds.maxY) {
    return getBarrierLegs(world.barrierLevel).some((leg) => leg.x === tx && leg.y === ty);
  }
  return (
    tx === bounds.minX || tx === bounds.maxX || ty === bounds.minY || ty === bounds.maxY
  );
}

export function createCampfire(x, y) {
  return {
    x,
    y,
    level: 0,
    logsInLevel: 0,
    totalLogs: 0,
    expandFlash: 0,
  };
}

export function getCampfireRadius(campfire) {
  return 0.5 + campfire.logsInLevel * GROWTH_PER_LOG + campfire.level * 0.2;
}

export function getDistanceToBarrier(campfire, barrierBounds) {
  const dx = Math.min(
    Math.abs(campfire.x - barrierBounds.minX),
    Math.abs(campfire.x - barrierBounds.maxX),
  );
  const dy = Math.min(
    Math.abs(campfire.y - barrierBounds.minY),
    Math.abs(campfire.y - barrierBounds.maxY),
  );
  return Math.min(dx, dy);
}

export function isCampfireInRange(playerX, playerY, campfire) {
  return Math.hypot(playerX - campfire.x, playerY - campfire.y) < CAMPFIRE_INTERACT_RANGE;
}

export function tryExpandCampfire(campfire, world) {
  if (campfire.level >= MAX_CAMPFIRE_LEVEL) return false;

  const radius = getCampfireRadius(campfire);
  const distToWall = getDistanceToBarrier(campfire, world.barrierBounds);

  if (radius < distToWall - 0.12) return false;

  campfire.level += 1;
  campfire.logsInLevel = 0;
  campfire.expandFlash = 2.5;
  world.barrierLevel = Math.min(MAX_CAMPFIRE_LEVEL, campfire.level);
  world.barrierBounds = { ...BARRIER_BOUNDS[world.barrierLevel] };
  return true;
}

export function feedCampfire(campfire, world, logCount) {
  if (logCount <= 0 || campfire.level >= MAX_CAMPFIRE_LEVEL) {
    return { fed: 0, expanded: false };
  }

  let fed = 0;
  let expanded = false;

  while (fed < logCount && campfire.level < MAX_CAMPFIRE_LEVEL) {
    campfire.logsInLevel += 1;
    campfire.totalLogs += 1;
    fed += 1;

    if (tryExpandCampfire(campfire, world)) {
      expanded = true;
    }
  }

  return { fed, expanded };
}

export function getCampfireProgress(campfire) {
  return {
    level: campfire.level,
    maxLevel: MAX_CAMPFIRE_LEVEL,
    logsInLevel: campfire.logsInLevel,
    logsNeeded: LOGS_PER_LEVEL,
    radius: getCampfireRadius(campfire),
  };
}
