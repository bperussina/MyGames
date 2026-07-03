import * as THREE from 'three';

const leather = new THREE.MeshStandardMaterial({ color: 0x2a2520, roughness: 0.82, metalness: 0.05 });
const dashMat = new THREE.MeshStandardMaterial({ color: 0x141820, roughness: 0.55, metalness: 0.15 });
const chromeInt = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 });

/** Steering wheel, dash, seats — visible through glass. */
export function buildCockpit(group, seat = { x: 0.32, y: 0.78, z: 0.05 }) {
  const cockpit = new THREE.Group();
  cockpit.name = 'cockpit';

  const dash = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.38, 0.55), dashMat);
  dash.position.set(0.05, seat.y + 0.08, seat.z + 0.42);
  dash.rotation.x = -0.35;
  cockpit.add(dash);

  const cluster = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.18, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x0a1520, emissive: 0x224466, emissiveIntensity: 0.35 }),
  );
  cluster.position.set(0.12, seat.y + 0.22, seat.z + 0.52);
  cluster.rotation.x = -0.35;
  cockpit.add(cluster);

  const wheelCol = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.028, 10, 20), chromeInt);
  rim.rotation.x = Math.PI / 2;
  const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.025, 0.04), chromeInt);
  wheelCol.add(rim, spoke);
  wheelCol.position.set(seat.x, seat.y + 0.02, seat.z + 0.28);
  wheelCol.rotation.x = -0.55;
  cockpit.add(wheelCol);

  const seatCushion = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.42), leather);
  seatCushion.position.set(seat.x, seat.y - 0.08, seat.z);
  const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.1), leather);
  seatBack.position.set(seat.x, seat.y + 0.12, seat.z - 0.16);
  seatBack.rotation.x = -0.2;
  const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.08), leather);
  headrest.position.set(seat.x, seat.y + 0.38, seat.z - 0.18);
  cockpit.add(seatCushion, seatBack, headrest);

  group.add(cockpit);
  return cockpit;
}

export function prepareWheels(group) {
  const wheels = group.userData.wheels ?? [];
  for (const w of wheels) {
    w.userData.baseY = w.position.y;
    w.userData.baseX = w.position.x;
    w.userData.steerable = String(w.userData.carPart ?? '').includes('_f');
  }
}

export function applyEnvironmentToCar(group, envMap) {
  if (!envMap) return;
  group.traverse((child) => {
    if (!child.isMesh || !child.material) return;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const m of mats) {
      if (m.isMeshPhysicalMaterial || m.isMeshStandardMaterial) {
        m.envMap = envMap;
        m.envMapIntensity =
          String(child.userData.carPart ?? '').includes('window') || child.userData.carPart === 'windshield'
            ? 1.5
            : 0.65;
        m.needsUpdate = true;
      }
    }
  });
}
