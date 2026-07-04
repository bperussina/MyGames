import * as THREE from 'three';
import { WORLD_HALF } from './city.js';
import { rbxPaint, rbxPlastic } from './blockStyle.js';

/** Rings just outside the city walls — countryside target range. */
const RINGS = [
  { radius: WORLD_HALF + 24, coins: 18 },
  { radius: WORLD_HALF + 38, coins: 24 },
  { radius: WORLD_HALF + 52, coins: 32 },
];

const TARGET_COUNT = 28;
const HIT_COOLDOWN = 1.4;

function generateSpots() {
  const spots = [];
  for (let i = 0; i < TARGET_COUNT; i++) {
    const angle = (i / TARGET_COUNT) * Math.PI * 2 + 0.18;
    const ring = RINGS[i % RINGS.length];
    spots.push({
      x: Math.cos(angle) * ring.radius,
      z: Math.sin(angle) * ring.radius,
      coins: ring.coins,
    });
  }
  return spots;
}

const SHRED_SPOTS = generateSpots();

function buildBullseyeTarget() {
  const g = new THREE.Group();
  g.name = 'shred-target';

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.18, 2.6, 8),
    rbxPlastic(0x6b4423),
  );
  post.position.y = 1.3;
  post.castShadow = true;
  g.add(post);

  const board = new THREE.Group();
  board.position.y = 2.55;

  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.4, 0.12),
    rbxPlastic(0xf8fafc),
  );
  board.add(backing);

  const rings = [
    { r: 1.05, color: 0xdc2626, z: 0.07 },
    { r: 0.72, color: 0xffffff, z: 0.08 },
    { r: 0.38, color: 0xdc2626, z: 0.09 },
    { r: 0.14, color: 0xffffff, z: 0.1 },
  ];

  for (const ring of rings) {
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(ring.r, ring.r, 0.08, 24),
      rbxPaint(ring.color),
    );
    disc.rotation.x = Math.PI / 2;
    disc.position.z = ring.z;
    board.add(disc);
  }

  g.add(board);
  g.userData.board = board;
  return g;
}

export function createShredTargets(scene) {
  const group = new THREE.Group();
  group.name = 'shred-targets';
  scene.add(group);

  let targets = [];
  let onDestroyed = null;
  const rayMeshes = [];

  function rebuildRayMeshes() {
    rayMeshes.length = 0;
    for (const t of targets) {
      if (!t.alive) continue;
      t.mesh.traverse((c) => {
        if (c.isMesh) {
          c.userData.shredTarget = t;
          rayMeshes.push(c);
        }
      });
    }
  }

  function spawnAll() {
    clearAll();
    for (const spot of SHRED_SPOTS) {
      const mesh = buildBullseyeTarget();
      mesh.position.set(spot.x, 0, spot.z);
      mesh.rotation.y = Math.atan2(-spot.x, -spot.z);
      group.add(mesh);
      targets.push({
        mesh,
        x: spot.x,
        z: spot.z,
        health: 50,
        maxHealth: 50,
        coinValue: spot.coins,
        alive: true,
        hitCooldown: 0,
        wobble: 0,
      });
    }
    rebuildRayMeshes();
  }

  function clearAll() {
    for (const t of targets) {
      if (t.mesh.parent) group.remove(t.mesh);
    }
    targets = [];
    rayMeshes.length = 0;
  }

  function reset() {
    spawnAll();
  }

  function setOnDestroyed(cb) {
    onDestroyed = cb;
  }

  function destroyTarget(t) {
    if (!t.alive) return false;
    t.alive = false;
    group.remove(t.mesh);
    rebuildRayMeshes();
    onDestroyed?.(t);
    return true;
  }

  function damageTarget(t, dmg) {
    if (!t?.alive) return false;
    t.health -= dmg;
    t.wobble = 1;
    if (t.health <= 0) return destroyTarget(t);
    return false;
  }

  function raycast(raycaster) {
    const hits = raycaster.intersectObjects(rayMeshes, false);
    if (!hits.length) return null;
    return hits[0].object.userData.shredTarget ?? null;
  }

  function forEachTarget(fn) {
    for (const t of targets) fn(t);
  }

  function update(delta) {
    for (const t of targets) {
      if (!t.alive) continue;
      t.hitCooldown = Math.max(0, t.hitCooldown - delta);
      if (t.wobble > 0) {
        t.wobble = Math.max(0, t.wobble - delta * 5);
        const board = t.mesh.userData.board;
        if (board) board.rotation.z = Math.sin(t.wobble * 18) * t.wobble * 0.35;
      }
    }
  }

  spawnAll();

  return {
    reset,
    update,
    setOnDestroyed,
    damageTarget,
    raycast,
    forEachTarget,
    count: () => targets.filter((t) => t.alive).length,
  };
}

export const PLAYER_SHRED_COINS = 150;
export const PLAYER_SHRED_SPEED = 22;
export const PLAYER_SHRED_COOLDOWN = 4;
