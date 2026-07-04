/** Car footprint in world space — thinner cars squeeze through tighter gaps. */

export function getCarCollisionBounds(profile) {
  const width = profile.width ?? 1.88;
  const length = profile.length ?? 4.55;
  return {
    hw: width * 0.5 + 0.06,
    hd: length * 0.5 + 0.08,
    width,
    length,
  };
}

/** Rotated car AABB half-extents on the ground plane. */
export function worldSpaceHalfExtents(rotY, hw, hd) {
  const c = Math.abs(Math.cos(rotY));
  const s = Math.abs(Math.sin(rotY));
  return {
    halfX: hw * c + hd * s,
    halfZ: hw * s + hd * c,
  };
}

export function aabbOverlaps(x, z, halfX, halfZ, box) {
  return (
    x + halfX > box.minX
    && x - halfX < box.maxX
    && z + halfZ > box.minZ
    && z - halfZ < box.maxZ
  );
}

/** Clear gap width needed when driving straight through (aligned with gap). */
export function clearanceWidth(hw) {
  return hw * 2;
}

export function widthLabel(width) {
  if (width <= 1.5) return 'Ultra-slim profile';
  if (width <= 1.65) return 'Slim profile';
  if (width <= 1.85) return 'Average width';
  if (width <= 2.0) return 'Wide body';
  return 'Extra wide — trucks & SUVs';
}
