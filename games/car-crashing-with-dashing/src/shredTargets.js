import * as THREE from 'three';
import { rbxPaint, rbxPlastic } from './blockStyle.js';

const SHRED_SPOTS = [
  { x: 28, z: 18, kind: 'box' },
  { x: -32, z: 24, kind: 'box' },
  { x: 45, z: -35, kind: 'barrel' },
  { x: -55, z: -20, kind: 'barrel' },
  { x: 62, z: 40, kind: 'junk' },
  { x: -70, z: 55, kind: 'junk' },
  { x: 18, z: -62, kind: 'box' },
  { x: -22, z: -48, kind: 'barrel' },
  { x: 80, z: -10, kind: 'junk' },
  { x: -85, z: 12, kind: 'box' },
  { x: 12, z: 75, kind: 'barrel' },
  { x: -15, z: -78, kind: 'junk' },
  { x: 38, z: -55, kind: 'box' },
  { x: -48, z: 68, kind: 'barrel' },
  { x: 72, z: 62, kind: 'junk' },
  { x: -62, z: -65, kind: 'box' },
];

const KINDS = {
  box: { hp: 40, coins: 30, color: 0xc4a574, w: 2.2, h: 2, d: 2.2 },
  barrel: { hp: 70, coins: 55, color: 0x64748b, w: 1.6, h: 2.4, d: 1.6 },
  junk: { hp: 100, coins: 80, color: 0x78716c, w: 3, h: 1.8, d: 2.5 },
};

function buildTargetMesh(kind) {
  const def = KINDS[kind];
  const g = new THREE.Group();
  g.name = 'shred-target';

  if (kind === 'barrel') {
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(def.w * 0.5, def.w * 0.5, def.h, 10),
      rbxPaint(def.color),
    );
    body.position.y = def.h / 2;
    body.castShadow = true;
    g.add(body);
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(def.w * 0.52, def.w * 0.52, 0.15, 10),
      rbxPlastic(0x334155),
    );
    band.position.y = def.h * 0.65;
    g.add(band);
  } else {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(def.w, def.h, def.d),
      rbxPaint(def.color),
    );
    body.position.y = def.h / 2;
    body.castShadow = true;
    g.add(body);
    if (kind === 'junk') {
      const scrap = new THREE.Mesh(
        new THREE.BoxGeometry(def.w * 0.6, def.h * 0.5, def.d * 0.4),
        rbxPlastic(0x44403c),
      );
      scrap.position.set(0.4, def.h * 0.9, 0.2);
      scrap.rotation.y = 0.4;
      g.add(scrap);
    }
  }

  return g;
}

export function createShredTargets(scene) {
  const group = new THREE.Group();
  group.name = 'shred-targets';
  scene.add(group);

  let targets = [];
  let onDestroyed = null;

  function spawnAll() {
    clearAll();
    for (const spot of SHRED_SPOTS) {
      const def = KINDS[spot.kind];
      const mesh = buildTargetMesh(spot.kind);
      mesh.position.set(spot.x, 0, spot.z);
      group.add(mesh);
      targets.push({
        mesh,
        x: spot.x,
        z: spot.z,
        kind: spot.kind,
        health: def.hp,
        maxHealth: def.hp,
        coinValue: def.coins,
        alive: true,
        hitCooldown: 0,
      });
    }
  }

  function clearAll() {
    for (const t of targets) {
      if (t.mesh.parent) group.remove(t.mesh);
    }
    targets = [];
  }

  function reset() {
    spawnAll();
  }

  function setOnDestroyed(cb) {
    onDestroyed = cb;
  }

  function destroyTarget(t) {
    if (!t.alive) return;
    t.alive = false;
    group.remove(t.mesh);
    onDestroyed?.(t);
  }

  function update(delta, vehicle, weaponBonus = 1) {
    if (!vehicle) return [];
    const destroyed = [];
    const speed = Math.abs(vehicle.speed);
    const hw = 1.4;
    const hd = 2.6;
    const minSpeed = 12;

    for (const t of targets) {
      if (!t.alive) continue;
      t.hitCooldown = Math.max(0, t.hitCooldown - delta);
      const dx = vehicle.x - t.x;
      const dz = vehicle.z - t.z;
      if (Math.abs(dx) > hw + 2 || Math.abs(dz) > hd + 2) continue;
      if (Math.abs(dx) > hw || Math.abs(dz) > hd) continue;
      if (speed < minSpeed || t.hitCooldown > 0) continue;

      const dmg = speed * 0.8 * weaponBonus;
      t.health -= dmg;
      t.hitCooldown = 0.15;
      t.mesh.rotation.y += 0.2;
      t.mesh.position.y = Math.sin(Date.now() * 0.02) * 0.05;

      if (t.health <= 0) {
        destroyTarget(t);
        destroyed.push(t);
      }
    }
    return destroyed;
  }

  spawnAll();

  return { reset, update, setOnDestroyed, count: () => targets.filter((t) => t.alive).length };
}

export const PLAYER_SHRED_COINS = 150;
export const PLAYER_SHRED_SPEED = 22;
export const PLAYER_SHRED_COOLDOWN = 4;
