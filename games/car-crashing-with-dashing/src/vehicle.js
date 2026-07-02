import { buildCarMesh } from './carMesh.js';

const MAX_SPEED = 22;
const ACCEL = 28;
const BRAKE = 40;
const STEER_SPEED = 2.2;
const FRICTION = 10;

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

/**
 * @param {{ throttle: number, brake: number, steer: number }} drive -1..1
 */
export function updateVehicle(vehicle, drive, delta, clampPosition) {
  const { throttle, brake, steer } = drive;

  vehicle.steer += (steer * STEER_SPEED - vehicle.steer) * Math.min(1, delta * 8);
  vehicle.rotY -= vehicle.steer * delta * (0.8 + Math.abs(vehicle.speed) * 0.06);

  if (throttle > 0) {
    vehicle.speed += throttle * ACCEL * delta;
  }
  if (brake > 0) {
    vehicle.speed -= brake * BRAKE * delta;
  }

  if (throttle <= 0 && brake <= 0) {
    if (Math.abs(vehicle.speed) < 0.5) vehicle.speed = 0;
    else vehicle.speed -= Math.sign(vehicle.speed) * FRICTION * delta;
  }

  vehicle.speed = Math.max(-MAX_SPEED * 0.35, Math.min(MAX_SPEED, vehicle.speed));

  const dx = Math.sin(vehicle.rotY) * vehicle.speed * delta;
  const dz = Math.cos(vehicle.rotY) * vehicle.speed * delta;
  const next = clampPosition(vehicle.x + dx, vehicle.z + dz);
  vehicle.x = next.x;
  vehicle.z = next.z;

  syncVehicleMesh(vehicle);
}

export function spawnInFrontOfPlayer(player, spec, clampPosition) {
  const dist = 4;
  const sx = player.x + Math.sin(player.facing) * dist;
  const sz = player.z + Math.cos(player.facing) * dist;
  const clamped = clampPosition(sx, sz);
  return createVehicleState(spec, clamped.x, clamped.z, player.facing);
}
