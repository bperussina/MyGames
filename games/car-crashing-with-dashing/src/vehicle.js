import { buildCarMesh } from './carMesh.js';
import { clearDents } from './crashFX.js';

const MAX_SPEED = 52;
const CRUISE_MAX = 22;
const ACCEL = 32;
const BOOST_ACCEL = 48;
const BRAKE = 42;
const STEER_SPEED = 2.4;
const FRICTION = 8;
const CHARGE_STEER_MAX = 0.38;

export function createVehicleState(spec, x, z, rotY = 0) {
  const mesh = buildCarMesh(spec);
  mesh.position.set(x, 0, z);
  mesh.rotation.y = rotY;

  return {
    spec,
    mesh,
    x,
    z,
    rotY,
    speed: 0,
    steer: 0,
    damage: 0,
    dents: [],
    prevX: x,
    prevZ: z,
  };
}

export function addVehicleToScene(scene, vehicle) {
  scene.add(vehicle.mesh);
}

export function removeVehicleFromScene(scene, vehicle) {
  if (vehicle?.mesh) scene.remove(vehicle.mesh);
}

export function enterDriverSeat(player, vehicle) {
  player.mesh.visible = false;
  player.inVehicle = vehicle;
}

export function exitDriverSeat(player, vehicle) {
  const exitX = vehicle.x - Math.sin(vehicle.rotY) * 2.5;
  const exitZ = vehicle.z - Math.cos(vehicle.rotY) * 2.5;
  player.x = exitX;
  player.z = exitZ;
  player.mesh.visible = true;
  player.inVehicle = null;
  syncPlayerPosition(player);
}

export function syncPlayerPosition(player) {
  player.mesh.position.set(player.x, player.mesh.position.y, player.z);
}

export function syncVehicleMesh(vehicle) {
  vehicle.mesh.position.set(vehicle.x, 0, vehicle.z);
  vehicle.mesh.rotation.y = vehicle.rotY;
}

export function resetVehicleAt(vehicle, x, z, rotY = 0) {
  clearDents(vehicle);
  vehicle.x = x;
  vehicle.z = z;
  vehicle.rotY = rotY;
  vehicle.speed = 0;
  vehicle.steer = 0;
  vehicle.prevX = x;
  vehicle.prevZ = z;
  vehicle.mesh.visible = true;
  syncVehicleMesh(vehicle);
}

/**
 * Straight or slight turns charge up speed; sharp turns slow the boost.
 */
export function updateVehicle(vehicle, drive, delta, clampPosition) {
  const { throttle, brake, steer } = drive;

  vehicle.prevX = vehicle.x;
  vehicle.prevZ = vehicle.z;

  vehicle.steer += (steer * STEER_SPEED - vehicle.steer) * Math.min(1, delta * 8);
  vehicle.rotY -= vehicle.steer * delta * (0.85 + Math.abs(vehicle.speed) * 0.05);

  const charging = Math.abs(steer) <= CHARGE_STEER_MAX && throttle > 0;

  if (throttle > 0) {
    const accel = charging ? BOOST_ACCEL * (1 + Math.min(Math.abs(vehicle.speed) / 28, 1.2)) : ACCEL * 0.75;
    vehicle.speed += throttle * accel * delta;
  }
  if (brake > 0) {
    vehicle.speed -= brake * BRAKE * delta;
  }

  if (throttle <= 0 && brake <= 0) {
    if (Math.abs(vehicle.speed) < 0.4) vehicle.speed = 0;
    else vehicle.speed -= Math.sign(vehicle.speed) * FRICTION * delta;
  }

  const cap = charging ? MAX_SPEED : CRUISE_MAX;
  vehicle.speed = Math.max(-MAX_SPEED * 0.3, Math.min(cap, vehicle.speed));

  const dx = Math.sin(vehicle.rotY) * vehicle.speed * delta;
  const dz = Math.cos(vehicle.rotY) * vehicle.speed * delta;
  const next = clampPosition(vehicle.x + dx, vehicle.z + dz);
  vehicle.x = next.x;
  vehicle.z = next.z;

  syncVehicleMesh(vehicle);

  const wallHit =
    Math.abs(next.x - (vehicle.prevX + dx)) > 0.05 || Math.abs(next.z - (vehicle.prevZ + dz)) > 0.05;

  return { impactSpeed: Math.abs(vehicle.speed), charging, wallHit };
}

export function spawnInFrontOfPlayer(player, spec, clampPosition) {
  const dist = 4;
  const sx = player.x + Math.sin(player.facing) * dist;
  const sz = player.z + Math.cos(player.facing) * dist;
  const clamped = clampPosition(sx, sz);
  return createVehicleState(spec, clamped.x, clamped.z, player.facing);
}
