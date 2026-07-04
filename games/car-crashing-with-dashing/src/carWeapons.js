import * as THREE from 'three';
import { rbxPaint, rbxPlastic, rbxChrome } from './blockStyle.js';
import { getWeapon } from './weapons.js';

function buildMiniGun(color) {
  const g = new THREE.Group();
  g.name = 'car-weapon';
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.5), rbxPlastic(0x334155));
  base.position.set(0, 0.15, 0);
  g.add(base);
  const barrels = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.9), rbxPaint(color));
  barrels.position.set(0, 0.35, 0.55);
  g.add(barrels);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.15), rbxChrome());
  tip.position.set(0, 0.35, 1.05);
  g.add(tip);
  return g;
}

function buildSawBlade(color) {
  const g = new THREE.Group();
  g.name = 'car-weapon';
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.7), rbxPlastic(0x334155));
  arm.position.set(0, 0.2, 0.2);
  g.add(arm);
  const blade = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 8), rbxPaint(color));
  blade.rotation.x = Math.PI / 2;
  blade.position.set(0, 0.35, 0.75);
  g.add(blade);
  const teeth = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 6), rbxPlastic(0xcbd5e1));
  teeth.rotation.x = Math.PI / 2;
  teeth.position.set(0, 0.35, 0.75);
  g.add(teeth);
  return g;
}

function buildChainsaw(color) {
  const g = new THREE.Group();
  g.name = 'car-weapon';
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 1.1), rbxPaint(color));
  body.position.set(0, 0.25, 0.35);
  g.add(body);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 1.4), rbxPlastic(0x64748b));
  bar.position.set(0, 0.2, 0.95);
  g.add(bar);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.25), rbxPlastic(0x1e293b));
  handle.position.set(0, 0.45, 0);
  g.add(handle);
  return g;
}

function buildWeaponMesh(weapon) {
  if (weapon.type === 'saw_blade') return buildSawBlade(weapon.color);
  if (weapon.type === 'chainsaw') return buildChainsaw(weapon.color);
  return buildMiniGun(weapon.color);
}

export function removeWeaponFromVehicle(vehicle) {
  if (!vehicle?.mesh) return;
  const old = vehicle.mesh.getObjectByName('car-weapon');
  if (old) vehicle.mesh.remove(old);
  vehicle.equippedWeapon = null;
}

export function attachWeaponToVehicle(vehicle, weaponId) {
  removeWeaponFromVehicle(vehicle);
  if (!weaponId || !vehicle?.mesh) return null;
  const weapon = getWeapon(weaponId);
  if (!weapon) return null;

  const mount = buildWeaponMesh(weapon);
  mount.position.set(0, 0.55, 1.85);
  mount.rotation.y = Math.PI;
  vehicle.mesh.add(mount);
  vehicle.equippedWeapon = weapon;
  return weapon;
}

export function getWeaponShredBonus(vehicle) {
  return vehicle?.equippedWeapon?.shredBonus ?? 1;
}

export function spinCarWeapon(vehicle, delta) {
  const mount = vehicle?.mesh?.getObjectByName('car-weapon');
  if (!mount || !vehicle.equippedWeapon) return;
  const speed = Math.abs(vehicle.speed);
  if (vehicle.equippedWeapon.type === 'mini_gun') {
    mount.children.forEach((c, i) => {
      if (i > 0) c.rotation.z += delta * speed * 0.15;
    });
  } else {
    mount.rotation.z += delta * (3 + speed * 0.2);
  }
}
