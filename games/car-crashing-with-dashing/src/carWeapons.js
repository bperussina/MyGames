import * as THREE from 'three';
import { rbxPaint, rbxPlastic, rbxChrome } from './blockStyle.js';
import { getWeapon } from './weapons.js';

function singleChainsaw(color, barLen = 1.1) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.55), rbxPaint(color));
  body.position.y = 0.12;
  g.add(body);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, barLen), rbxPlastic(0x64748b));
  bar.position.set(0, 0.08, barLen * 0.45);
  g.add(bar);
  const chain = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, barLen * 0.92), rbxPlastic(0xcbd5e1));
  chain.position.set(0, 0.08, barLen * 0.45);
  chain.name = 'chain';
  g.add(chain);
  return g;
}

function buildMiniGunMount(color) {
  const g = new THREE.Group();
  g.name = 'weapon-mini_gun';

  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.55), rbxPlastic(0x334155));
  pedestal.position.set(0, 0.12, 0);
  g.add(pedestal);

  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.75), rbxPaint(color));
  housing.position.set(0, 0.42, 0.35);
  g.add(housing);

  const barrels = new THREE.Group();
  barrels.name = 'barrels';
  for (const x of [-0.12, 0, 0.12]) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.85, 8), rbxChrome());
    b.rotation.x = Math.PI / 2;
    b.position.set(x, 0.42, 0.95);
    barrels.add(b);
  }
  g.add(barrels);

  const shroud = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.28, 0.35), rbxPlastic(0x1e293b));
  shroud.position.set(0, 0.55, 0.55);
  g.add(shroud);

  return g;
}

function buildSawBladeMount(color) {
  const g = new THREE.Group();
  g.name = 'weapon-saw_blade';

  const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.18, 0.35), rbxPlastic(0x334155));
  bumper.position.set(0, 0.12, 0.15);
  g.add(bumper);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.2, 10), rbxPlastic(0x475569));
  hub.rotation.x = Math.PI / 2;
  hub.position.set(0, 0.28, 0.55);
  g.add(hub);

  const blade = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.1, 10), rbxPaint(color));
  blade.rotation.x = Math.PI / 2;
  blade.position.set(0, 0.28, 0.55);
  blade.name = 'blade';
  g.add(blade);

  const teeth = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.05, 8), rbxPlastic(0xe2e8f0));
  teeth.rotation.x = Math.PI / 2;
  teeth.position.set(0, 0.28, 0.55);
  teeth.name = 'teeth';
  g.add(teeth);

  return g;
}

function buildChainsawMounts(color) {
  const root = new THREE.Group();
  root.name = 'weapon-chainsaw';

  const left = singleChainsaw(color, 1.15);
  left.name = 'chainsaw-left';
  left.rotation.y = Math.PI / 2;
  root.add(left);

  const right = singleChainsaw(color, 1.15);
  right.name = 'chainsaw-right';
  right.rotation.y = -Math.PI / 2;
  root.add(right);

  const rear = singleChainsaw(color, 1.05);
  rear.name = 'chainsaw-rear';
  rear.rotation.y = Math.PI;
  root.add(rear);

  return root;
}

export function removeWeaponFromVehicle(vehicle) {
  if (!vehicle?.mesh) return;
  const root = vehicle.mesh.getObjectByName('car-weapons');
  if (root) vehicle.mesh.remove(root);
  vehicle.equippedWeapon = null;
}

export function attachWeaponToVehicle(vehicle, weaponId) {
  removeWeaponFromVehicle(vehicle);
  if (!weaponId || !vehicle?.mesh) return null;
  const weapon = getWeapon(weaponId);
  if (!weapon) return null;

  const hw = vehicle.collisionHw ?? 0.94;
  const hd = vehicle.collisionHd ?? 2.25;
  const root = new THREE.Group();
  root.name = 'car-weapons';

  if (weapon.type === 'mini_gun') {
    const mount = buildMiniGunMount(weapon.color);
    mount.position.set(0, 0.62, hd * 0.72);
    root.add(mount);
  } else if (weapon.type === 'saw_blade') {
    const mount = buildSawBladeMount(weapon.color);
    mount.position.set(0, 0.18, hd * 0.88);
    root.add(mount);
  } else if (weapon.type === 'chainsaw') {
    const mount = buildChainsawMounts(weapon.color);
    mount.children.find((c) => c.name === 'chainsaw-left')?.position.set(-hw * 0.92, 0.35, -hd * 0.05);
    mount.children.find((c) => c.name === 'chainsaw-right')?.position.set(hw * 0.92, 0.35, -hd * 0.05);
    mount.children.find((c) => c.name === 'chainsaw-rear')?.position.set(0, 0.35, -hd * 0.82);
    root.add(mount);
  }

  vehicle.mesh.add(root);
  vehicle.equippedWeapon = weapon;
  return weapon;
}

export function getWeaponShredBonus(vehicle) {
  return vehicle?.equippedWeapon?.shredBonus ?? 1;
}

export function getMuzzleWorldPosition(vehicle) {
  const root = vehicle?.mesh?.getObjectByName('car-weapons');
  const gun = root?.getObjectByName('weapon-mini_gun');
  if (!gun) return null;
  const pos = new THREE.Vector3();
  gun.getWorldPosition(pos);
  pos.y += 0.35;
  const forward = new THREE.Vector3(0, 0, 1);
  forward.applyQuaternion(vehicle.mesh.quaternion);
  pos.addScaledVector(forward, 0.9);
  return pos;
}

export function spinCarWeapon(vehicle, delta, firing = false) {
  const root = vehicle?.mesh?.getObjectByName('car-weapons');
  if (!root || !vehicle.equippedWeapon) return;
  const speed = Math.abs(vehicle.speed);
  const w = vehicle.equippedWeapon;

  if (w.type === 'mini_gun') {
    const barrels = root.getObjectByName('weapon-mini_gun')?.getObjectByName('barrels');
    if (barrels) barrels.rotation.z += delta * (firing ? 28 : 4 + speed * 0.08);
  } else if (w.type === 'saw_blade') {
    const blade = root.getObjectByName('weapon-saw_blade');
    const spin = delta * (6 + speed * 0.35);
    blade?.getObjectByName('blade')?.rotateZ(spin);
    blade?.getObjectByName('teeth')?.rotateZ(spin * 1.1);
  } else if (w.type === 'chainsaw') {
    const mount = root.getObjectByName('weapon-chainsaw');
    const spin = delta * (8 + speed * 0.25);
    for (const side of ['chainsaw-left', 'chainsaw-right', 'chainsaw-rear']) {
      mount?.getObjectByName(side)?.traverse((c) => {
        if (c.name === 'chain') c.rotation.y += spin;
      });
    }
  }
}

export function getRamHitZone(vehicle, worldX, worldZ) {
  const dx = worldX - vehicle.x;
  const dz = worldZ - vehicle.z;
  const cos = Math.cos(vehicle.rotY);
  const sin = Math.sin(vehicle.rotY);
  const localX = dx * cos - dz * sin;
  const localZ = dx * sin + dz * cos;
  const hw = vehicle.collisionHw ?? 0.94;
  const hd = vehicle.collisionHd ?? 2.25;

  if (localZ > hd * 0.25 && Math.abs(localX) < hw * 0.85) return 'front';
  if (localZ < -hd * 0.35 && Math.abs(localX) < hw * 0.9) return 'rear';
  if (localX < -hw * 0.45 && Math.abs(localZ) < hd * 0.75) return 'left';
  if (localX > hw * 0.45 && Math.abs(localZ) < hd * 0.75) return 'right';
  return 'body';
}
