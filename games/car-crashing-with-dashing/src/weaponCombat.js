import * as THREE from 'three';
import { getRamHitZone } from './carWeapons.js';

const raycaster = new THREE.Raycaster();
const mouseNdc = new THREE.Vector2();
const tracers = [];

const MINIGUN_COOLDOWN = 0.09;
const SAW_MIN_SPEED = 8;
const CHAINSAW_MIN_SPEED = 6;
const RAM_COOLDOWN = 0.35;

let fireHeld = false;
let fireCooldown = 0;
let pointerDown = false;
let pointerDragged = false;
let aimX = 0;
let aimY = 0;
let pressX = 0;
let pressY = 0;
let isFiring = false;

export function initWeaponInput(canvas) {
  if (!canvas) return;

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointerDown = true;
    pointerDragged = false;
    pressX = e.clientX;
    pressY = e.clientY;
    aimX = e.clientX;
    aimY = e.clientY;
    fireHeld = true;
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!pointerDown) return;
    aimX = e.clientX;
    aimY = e.clientY;
    if (Math.hypot(e.clientX - pressX, e.clientY - pressY) > 10) {
      pointerDragged = true;
      fireHeld = false;
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    if (e.button !== 0) return;
    fireHeld = false;
    pointerDown = false;
  });

  canvas.addEventListener('pointerleave', () => {
    fireHeld = false;
    pointerDown = false;
  });
}

export function wantsMinigunFire() {
  return fireHeld && !pointerDragged;
}

export function updateWeaponCombat(delta, ctx) {
  const {
    vehicle,
    camera,
    renderer,
    scene,
    shredTargets,
    remotePlayers,
    onTargetHit,
    onPlayerShred,
  } = ctx;

  fireCooldown = Math.max(0, fireCooldown - delta);
  updateTracers(scene, delta);

  const weapons = vehicle?.equippedWeapons ?? [];
  if (!weapons.length) return { firing: false };

  const miniGun = weapons.find((w) => w.type === 'mini_gun');
  if (miniGun && wantsMinigunFire() && fireCooldown <= 0) {
    if (typeof ctx.canFireMinigun === 'function' && !ctx.canFireMinigun()) {
      isFiring = false;
    } else {
      fireCooldown = MINIGUN_COOLDOWN;
      isFiring = true;
      const hit = fireMinigunRay({
        vehicle,
        camera,
        renderer,
        shredTargets,
        remotePlayers,
        scene,
        weapon: miniGun,
        onPlayerShred,
      });
      if (hit?.coins) onTargetHit?.(hit.coins, hit.kind);
      return { firing: true };
    }
  } else {
    isFiring = false;
  }

  for (const weapon of weapons) {
    if (weapon.type === 'saw_blade' || weapon.type === 'chainsaw') {
      applyRamWeaponHits(vehicle, weapon, shredTargets, remotePlayers, onTargetHit, onPlayerShred);
    }
  }

  return { firing: isFiring };
}

function fireMinigunRay({
  vehicle, camera, renderer, shredTargets, remotePlayers, scene, weapon, onPlayerShred,
}) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseNdc.x = ((aimX - rect.left) / rect.width) * 2 - 1;
  mouseNdc.y = -((aimY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouseNdc, camera);

  const targetHit = shredTargets?.raycast?.(raycaster);
  const bonus = weapon.shredBonus ?? 1;

  if (targetHit) {
    const dmg = 14 * bonus;
    const destroyed = shredTargets.damageTarget(targetHit, dmg);
    spawnTracer(scene, vehicle, targetHit.mesh.position);
    if (!destroyed) return { coins: Math.round(4 * bonus), kind: 'chip' };
    return null;
  }

  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const ground = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(plane, ground)) {
    spawnTracer(scene, vehicle, ground);
  }

  remotePlayers?.forEach?.((id, remote) => {
    const toPlayer = new THREE.Vector3(remote.x, 1, remote.z);
    const aimDist = raycaster.ray.origin.distanceTo(toPlayer);
    if (aimDist > 55) return;
    const dir = toPlayer.clone().sub(raycaster.ray.origin).normalize();
    if (raycaster.ray.direction.dot(dir) > 0.985) {
      remotePlayers.tryGunHit(id, 1.5, () => onPlayerShred?.(id));
    }
  });

  return null;
}

function applyRamWeaponHits(vehicle, weapon, shredTargets, remotePlayers, onTargetHit, onPlayerShred) {
  const speed = Math.abs(vehicle.speed);
  const bonus = weapon.shredBonus ?? 1;

  shredTargets?.forEachTarget?.((t) => {
    if (!t.alive || t.hitCooldown > 0) return;
    const dist = Math.hypot(vehicle.x - t.x, vehicle.z - t.z);
    if (dist > 3.5) return;

    const zone = getRamHitZone(vehicle, t.x, t.z);
    let ok = false;
    if (weapon.type === 'saw_blade' && zone === 'front' && speed >= SAW_MIN_SPEED) ok = true;
    if (weapon.type === 'chainsaw' && (zone === 'left' || zone === 'right' || zone === 'rear') && speed >= CHAINSAW_MIN_SPEED) ok = true;
    if (!ok) return;

    const dmg = speed * 0.85 * bonus;
    t.hitCooldown = RAM_COOLDOWN;
    shredTargets.damageTarget(t, dmg);
  });

  if (weapon.type === 'saw_blade' && speed >= SAW_MIN_SPEED) {
    remotePlayers?.forEach?.((id, remote) => {
      if (getRamHitZone(vehicle, remote.x, remote.z) !== 'front') return;
      remotePlayers.tryShred(id, vehicle, {
        minSpeed: SAW_MIN_SPEED,
        cooldownSec: 4,
        onShred: () => onPlayerShred?.(id),
      });
    });
  }

  if (weapon.type === 'chainsaw' && speed >= CHAINSAW_MIN_SPEED) {
    remotePlayers?.forEach?.((id, remote) => {
      const zone = getRamHitZone(vehicle, remote.x, remote.z);
      if (zone !== 'left' && zone !== 'right' && zone !== 'rear') return;
      remotePlayers.tryShred(id, vehicle, {
        minSpeed: CHAINSAW_MIN_SPEED,
        cooldownSec: 4,
        onShred: () => onPlayerShred?.(id),
      });
    });
  }
}

function spawnTracer(scene, vehicle, endVec) {
  const start = new THREE.Vector3(vehicle.x, 0.9, vehicle.z);
  const gun = vehicle.mesh?.getObjectByName('car-weapons')?.getObjectByName('weapon-mini_gun');
  if (gun) gun.getWorldPosition(start);

  const geo = new THREE.BufferGeometry().setFromPoints([start, endVec.clone()]);
  const mat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.9 });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  tracers.push({ mesh: line, life: 0.08 });
}

function updateTracers(scene, delta) {
  for (let i = tracers.length - 1; i >= 0; i--) {
    tracers[i].life -= delta;
    if (tracers[i].life <= 0) {
      scene.remove(tracers[i].mesh);
      tracers[i].mesh.geometry.dispose();
      tracers[i].mesh.material.dispose();
      tracers.splice(i, 1);
    }
  }
}

export function isMinigunFiring() {
  return isFiring;
}
