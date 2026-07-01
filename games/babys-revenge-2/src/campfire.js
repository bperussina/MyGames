export const LOGS_PER_LEVEL = 25;
export const LOGS_PER_TREE = 5;
export const MAX_CAMPFIRE_LEVEL = 6;
export const CAMPFIRE_INTERACT_RANGE = 2.8;
export const GROWTH_PER_LOG = 0.018;

/** Playable area inside gray barrier walls — expands each campfire level. */
export const BARRIER_BOUNDS = [
  { minX: 8, maxX: 15, minY: 7, maxY: 14 },
  { minX: 6, maxX: 17, minY: 5, maxY: 16 },
  { minX: 5, maxX: 18, minY: 4, maxY: 17 },
  { minX: 4, maxX: 19, minY: 3, maxY: 18 },
  { minX: 3, maxX: 20, minY: 2, maxY: 19 },
  { minX: 2, maxX: 21, minY: 2, maxY: 20 },
  { minX: 1, maxX: 22, minY: 1, maxY: 21 },
];

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
  return 0.35 + campfire.logsInLevel * GROWTH_PER_LOG + campfire.level * 0.15;
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

    const radius = getCampfireRadius(campfire);
    const distToWall = getDistanceToBarrier(campfire, world.barrierBounds);

    if (campfire.logsInLevel >= LOGS_PER_LEVEL && radius >= distToWall - 0.1) {
      campfire.level += 1;
      campfire.logsInLevel = 0;
      campfire.expandFlash = 2.5;
      world.barrierLevel = Math.min(MAX_CAMPFIRE_LEVEL, campfire.level);
      world.barrierBounds = { ...BARRIER_BOUNDS[world.barrierLevel] };
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
