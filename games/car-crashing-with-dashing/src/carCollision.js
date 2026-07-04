import * as THREE from 'three';

/** Car footprint in world space — thinner cars (and damaged cars) squeeze through tighter gaps. */

const _tempBox = new THREE.Box3();
const _invMatrix = new THREE.Matrix4();

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

/** Recompute hitbox from parts still on the car — broken-off pieces no longer collide. */
export function updateVehicleCollisionBounds(vehicle) {
  if (!vehicle?.mesh) return;

  const profile = vehicle.profile ?? {};
  const base = getCarCollisionBounds(profile);
  vehicle.baseCollisionHw = vehicle.baseCollisionHw ?? base.hw;
  vehicle.baseCollisionHd = vehicle.baseCollisionHd ?? base.hd;
  vehicle.baseCollisionWidth = vehicle.baseCollisionWidth ?? base.width;
  vehicle.baseCollisionLength = vehicle.baseCollisionLength ?? base.length;

  const local = computeAttachedLocalBounds(vehicle.mesh);
  if (!local) {
    applyBounds(vehicle, base);
    vehicle.collisionDamaged = false;
    return;
  }

  let hw = Math.max(0.32, Math.max(Math.abs(local.min.x), Math.abs(local.max.x)));
  let hd = Math.max(0.32, Math.max(Math.abs(local.min.z), Math.abs(local.max.z)));

  hw = Math.min(hw, vehicle.baseCollisionHw);
  hd = Math.min(hd, vehicle.baseCollisionHd);

  const width = hw * 2;
  const length = hd * 2;
  const damaged = width < vehicle.baseCollisionWidth - 0.08 || length < vehicle.baseCollisionLength - 0.12;

  vehicle.collisionHw = hw + 0.04;
  vehicle.collisionHd = hd + 0.04;
  vehicle.collisionWidth = width;
  vehicle.collisionLength = length;
  vehicle.collisionDamaged = damaged;
}

function computeAttachedLocalBounds(root) {
  const box = new THREE.Box3();
  let found = false;

  root.updateWorldMatrix(true, true);
  _invMatrix.copy(root.matrixWorld).invert();

  root.traverse((child) => {
    if (!child.isMesh || child.userData?.detached) return;
    if (child.type === 'LineSegments') return;
    const geo = child.geometry;
    if (!geo) return;
    if (!geo.boundingBox) geo.computeBoundingBox();
    if (!geo.boundingBox) return;

    _tempBox.copy(geo.boundingBox).applyMatrix4(child.matrixWorld).applyMatrix4(_invMatrix);
    box.union(_tempBox);
    found = true;
  });

  return found && !box.isEmpty() ? box : null;
}

function applyBounds(vehicle, bounds) {
  vehicle.collisionHw = bounds.hw;
  vehicle.collisionHd = bounds.hd;
  vehicle.collisionWidth = bounds.width;
  vehicle.collisionLength = bounds.length;
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

export function widthLabel(width, vehicle = null) {
  const base = vehicle?.baseCollisionWidth ?? width;
  const damaged = vehicle?.collisionDamaged && width < base - 0.08;

  if (damaged) {
    return `Parts missing — ${width.toFixed(2)}m wide now (fits tighter gaps)`;
  }
  if (width <= 1.5) return 'Ultra-slim — easier to squeeze through';
  if (width <= 1.65) return 'Slim — can squeeze through tighter spots';
  if (width <= 1.85) return 'Average width';
  if (width <= 2.0) return 'Wide body';
  return 'Extra wide — trucks & SUVs';
}
