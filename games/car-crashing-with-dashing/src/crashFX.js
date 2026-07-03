import * as THREE from 'three';

const EXPLODE_SPEED = 20;
const DENT_SPEED = 7;

export { EXPLODE_SPEED, DENT_SPEED };

export function impactSeverity(speed) {
  return Math.abs(speed);
}

export function shouldExplode(speed) {
  return impactSeverity(speed) >= EXPLODE_SPEED;
}

export function shouldDent(speed) {
  return impactSeverity(speed) >= DENT_SPEED;
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

export function spawnExplosion(scene, x, z) {
  const group = new THREE.Group();
  group.position.set(x, 1.2, z);
  const colors = [0xff6600, 0xff2200, 0xffaa00, 0x333333];
  for (let i = 0; i < 28; i++) {
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(0.2 + Math.random() * 0.5, 0.2 + Math.random() * 0.5, 0.2 + Math.random() * 0.5),
      new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.8,
      }),
    );
    p.userData.vel = new THREE.Vector3(
      (Math.random() - 0.5) * 14,
      2 + Math.random() * 10,
      (Math.random() - 0.5) * 14,
    );
    group.add(p);
  }
  scene.add(group);
  return { group, life: 1.2 };
}

export function updateExplosion(fx, delta) {
  if (!fx) return false;
  fx.life -= delta;
  for (const p of fx.group.children) {
    p.position.addScaledVector(p.userData.vel, delta);
    p.userData.vel.y -= 18 * delta;
    p.rotation.x += delta * 4;
    p.rotation.z += delta * 3;
  }
  if (fx.life <= 0) {
    fx.group.parent?.remove(fx.group);
    return false;
  }
  return true;
}
