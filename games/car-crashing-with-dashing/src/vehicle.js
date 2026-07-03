import { buildCarMesh, finishCarMesh } from './carMesh.js';
import { clearDents, createDefaultPartHealth, DENT_SPEED, SCOOP_SPEED } from './crashFX.js';

const MAX_SPEED = 52;
const CRUISE_MAX = 22;
const ACCEL = 32;
const BOOST_ACCEL = 48;
const BRAKE = 42;
const STEER_SPEED = 2.4;
const FRICTION = 8;
const CHARGE_STEER_MAX = 0.38;
const REVERSE_ACCEL = 28;
const REVERSE_MAX = 14;
const REVERSE_CHARGE_RATE = 0.9;
const REVERSE_LAUNCH = 26;
const DANCE_SPEED = 38;

export function createVehicleState(spec, x, z, rotY = 0, envMap = null) {
  const mesh = buildCarMesh(spec);
  finishCarMesh(mesh, envMap);
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
    partHealth: createDefaultPartHealth(),
    dents: [],
    prevX: x,
    prevZ: z,
    reverseCharge: 0,
    knockTilt: 0,
    wheelSpin: 0,
    suspensionT: 0,
    bodyRoll: 0,
    debris: [],
  };
}

export function addVehicleToScene(scene, vehicle) {
  scene.add(vehicle.mesh);
}

export function removeVehicleFromScene(scene, vehicle) {
  if (vehicle?.mesh) scene.remove(vehicle.mesh);
}

export function enterDriverSeat(player, vehicle) {
  const seat = vehicle.mesh.userData.driverSeat ?? { x: 0.35, y: 0.78, z: 0.05 };
  vehicle.mesh.attach(player.mesh);
  player.mesh.position.set(seat.x, seat.y, seat.z);
  player.mesh.rotation.set(0, 0, 0);
  player.mesh.scale.setScalar(0.42);
  player.mesh.visible = true;
  player.inVehicle = vehicle;
}

export function exitDriverSeat(player, vehicle) {
  const scene = vehicle.mesh.parent;
  const exitX = vehicle.x - Math.sin(vehicle.rotY) * 2.5;
  const exitZ = vehicle.z - Math.cos(vehicle.rotY) * 2.5;
  if (scene) scene.attach(player.mesh);
  player.mesh.scale.setScalar(1);
  player.x = exitX;
  player.z = exitZ;
  player.mesh.visible = true;
  player.inVehicle = null;
  syncPlayerPosition(player);
}

export function syncPlayerPosition(player) {
  player.mesh.position.set(player.x, player.mesh.position.y, player.z);
}

export function spinWheels(vehicle, delta) {
  const wheels = vehicle.mesh.userData.wheels ?? [];
  const speed = vehicle.speed;
  const spin = speed * delta * 2.6;
  vehicle.wheelSpin = (vehicle.wheelSpin ?? 0) + spin;
  vehicle.suspensionT = (vehicle.suspensionT ?? 0) + delta * (6 + Math.abs(speed) * 0.5);

  const bounce = Math.abs(speed) * 0.004;
  wheels.forEach((w, i) => {
    if (w.userData.detached) return;
    const baseY = w.userData.baseY ?? w.position.y;
    w.position.y = baseY + Math.sin(vehicle.suspensionT + i * 1.7) * bounce;
    w.rotation.x = vehicle.wheelSpin;
    if (w.userData.steerable) {
      w.rotation.y = -vehicle.steer * 0.42;
    }
  });
}

export function syncVehicleMesh(vehicle) {
  vehicle.mesh.position.x = vehicle.x;
  vehicle.mesh.position.z = vehicle.z;
  vehicle.mesh.rotation.y = vehicle.rotY;
}

/** Wobble at extreme speed, or brief pitch from a hard bounce. */
export function applyVehicleEffects(vehicle, time, delta) {
  if (!vehicle?.mesh) return;

  let rx = 0;
  let rz = 0;
  let y = 0;

  vehicle.bodyRoll += (-vehicle.steer * 0.08 * Math.min(1, Math.abs(vehicle.speed) / 18) - vehicle.bodyRoll) * Math.min(1, delta * 6);
  rz = vehicle.bodyRoll;

  if ((vehicle.knockTilt ?? 0) > 0.01) {
    rx = -vehicle.knockTilt;
    vehicle.knockTilt *= Math.exp(-7 * delta);
  } else {
    vehicle.knockTilt = 0;
    const speed = Math.abs(vehicle.speed);
    if (speed >= DANCE_SPEED) {
      const t = time * 0.012;
      const intensity = Math.min(1, (speed - DANCE_SPEED) / 12);
      y = Math.abs(Math.sin(t * 5)) * 0.12 * intensity;
      rx = Math.sin(t * 4) * 0.07 * intensity;
      rz = Math.cos(t * 3.2) * 0.09 * intensity;
    }
  }

  vehicle.mesh.position.y = y;
  vehicle.mesh.rotation.x = rx;
  vehicle.mesh.rotation.z = rz;
}

/** Hard wall hit — bounce backward and rock the car. */
export function applyCrashBounce(vehicle, impactSpeed) {
  const speed = Math.abs(impactSpeed);
  const severity = Math.min(1, Math.max(0, (speed - DENT_SPEED) / (52 - DENT_SPEED)));
  const huge = speed >= SCOOP_SPEED;

  const bounceCoeff = huge ? 0.52 : 0.26 + severity * 0.18;
  const bounceSpeed = speed * bounceCoeff;
  vehicle.speed = -Math.sign(vehicle.speed || 1) * bounceSpeed;

  const pushBack = huge ? 1.25 : 0.45 + severity * 0.4;
  vehicle.x -= Math.sin(vehicle.rotY) * pushBack;
  vehicle.z -= Math.cos(vehicle.rotY) * pushBack;

  vehicle.knockTilt = huge ? 0.48 : 0.18 + severity * 0.26;
  vehicle.prevX = vehicle.x;
  vehicle.prevZ = vehicle.z;

  return { huge, severity };
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
  vehicle.reverseCharge = 0;
  vehicle.knockTilt = 0;
  vehicle.mesh.visible = true;
  syncVehicleMesh(vehicle);
}

/**
 * Straight or slight turns charge up speed; sharp turns slow the boost.
 */
export function updateVehicle(vehicle, drive, delta, clampPosition) {
  const { throttle, brake, steer, reverse = 0 } = drive;

  vehicle.prevX = vehicle.x;
  vehicle.prevZ = vehicle.z;

  vehicle.steer += (steer * STEER_SPEED - vehicle.steer) * Math.min(1, delta * 8);
  const speedFactor = 0.85 + Math.abs(vehicle.speed) * 0.05;
  vehicle.rotY -= vehicle.steer * delta * speedFactor;

  const charging = Math.abs(steer) <= CHARGE_STEER_MAX && throttle > 0 && reverse <= 0;

  if (brake > 0) {
    vehicle.speed -= brake * BRAKE * delta;
  } else if (reverse > 0) {
    vehicle.speed -= reverse * REVERSE_ACCEL * delta;
    vehicle.speed = Math.max(vehicle.speed, -REVERSE_MAX);
    if (vehicle.speed < -3) {
      vehicle.reverseCharge = Math.min(1, (vehicle.reverseCharge ?? 0) + REVERSE_CHARGE_RATE * delta);
    }
  } else if (throttle > 0) {
    const accelMult = vehicle.superDashOn ? (vehicle.superAccelMult ?? 1.6) : 1;
    if ((vehicle.reverseCharge ?? 0) > 0.12 && vehicle.speed < 2.5) {
      vehicle.speed += vehicle.reverseCharge * REVERSE_LAUNCH * accelMult;
      vehicle.reverseCharge = 0;
    } else {
      const accel = charging ? BOOST_ACCEL * (1 + Math.min(Math.abs(vehicle.speed) / 28, 1.2)) : ACCEL * 0.75;
      vehicle.speed += throttle * accel * accelMult * delta;
    }
  }

  if (reverse <= 0 && throttle <= 0) {
    vehicle.reverseCharge = Math.max(0, (vehicle.reverseCharge ?? 0) - 0.2 * delta);
  }

  if (throttle <= 0 && brake <= 0 && reverse <= 0) {
    if (Math.abs(vehicle.speed) < 0.4) vehicle.speed = 0;
    else vehicle.speed -= Math.sign(vehicle.speed) * FRICTION * delta;
  }

  const superOn = vehicle.superDashOn;
  const speedCap = superOn ? (vehicle.superMaxSpeed ?? 92) : (charging ? MAX_SPEED : CRUISE_MAX);
  vehicle.speed = Math.max(-MAX_SPEED * 0.3, Math.min(speedCap, vehicle.speed));

  const dx = Math.sin(vehicle.rotY) * vehicle.speed * delta;
  const dz = Math.cos(vehicle.rotY) * vehicle.speed * delta;
  const next = clampPosition(vehicle.x + dx, vehicle.z + dz);
  vehicle.x = next.x;
  vehicle.z = next.z;

  syncVehicleMesh(vehicle);
  spinWheels(vehicle, delta);

  const wallHit =
    Math.abs(next.x - (vehicle.prevX + dx)) > 0.05 || Math.abs(next.z - (vehicle.prevZ + dz)) > 0.05;

  return { impactSpeed: Math.abs(vehicle.speed), charging, wallHit };
}

export function spawnInFrontOfPlayer(player, spec, clampPosition, envMap = null) {
  const dist = 4;
  const sx = player.x + Math.sin(player.facing) * dist;
  const sz = player.z + Math.cos(player.facing) * dist;
  const clamped = clampPosition(sx, sz);
  return createVehicleState(spec, clamped.x, clamped.z, player.facing, envMap);
}
