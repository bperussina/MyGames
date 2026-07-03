import * as THREE from 'three';

/** Below this speed, wall taps do nothing. Hard hits leave a dent. */
const DENT_SPEED = 34;

export { DENT_SPEED };

export function shouldDent(speed) {
  return Math.abs(speed) >= DENT_SPEED;
}

export function addDentToVehicle(vehicle) {
  if (!vehicle?.mesh) return;
  const dent = new THREE.Mesh(
    new THREE.BoxGeometry(0.35 + Math.random() * 0.4, 0.12, 0.35 + Math.random() * 0.3),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9, metalness: 0.2 }),
  );
  dent.position.set(
    (Math.random() - 0.5) * 1.2,
    0.55 + Math.random() * 0.5,
    (Math.random() - 0.5) * 2.2,
  );
  dent.rotation.set(Math.random() * 0.4, Math.random() * 0.6, Math.random() * 0.3);
  vehicle.mesh.add(dent);
  if (!vehicle.dents) vehicle.dents = [];
  vehicle.dents.push(dent);
  vehicle.damage = (vehicle.damage ?? 0) + 12 + Math.random() * 10;
}

export function clearDents(vehicle) {
  if (!vehicle?.dents) return;
  for (const d of vehicle.dents) vehicle.mesh.remove(d);
  vehicle.dents = [];
  vehicle.damage = 0;
}

