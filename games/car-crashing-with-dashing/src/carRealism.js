import * as THREE from 'three';
import { rbxPlastic, applyBlockOutlines } from './blockStyle.js';

const leather = rbxPlastic(0x2a2520);
const dashMat = rbxPlastic(0x141820);
const chromeInt = rbxPlastic(0xcccccc);

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
    new THREE.MeshLambertMaterial({ color: 0x0a1520, emissive: 0x224466, emissiveIntensity: 0.35, flatShading: true }),
  );
  cluster.position.set(0.12, seat.y + 0.22, seat.z + 0.52);
  cluster.rotation.x = -0.35;
  cockpit.add(cluster);

  const wheelCol = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.028, 8, 16), chromeInt);
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
  applyBlockOutlines(cockpit);
  return cockpit;
}

/** Engine block visible when the hood tears off in a crash. */
export function buildEngineBay(group, seat = { x: 0.32, y: 0.78, z: 0.05 }) {
  const engine = new THREE.Group();
  engine.name = 'engine';
  engine.userData.carPart = 'engine';
  engine.userData.detachable = false;

  const metal = rbxPlastic(0x3a3a42);
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.85), metal);
  block.position.y = 0.21;
  block.castShadow = true;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.48), rbxPlastic(0x2a2a32));
  head.position.set(0, 0.48, 0.12);
  const manifold = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.08, 0.35), rbxPlastic(0x555560));
  manifold.position.set(0, 0.38, -0.22);
  for (const x of [-0.18, 0.18]) {
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8),
      rbxPlastic(0x4a4a55),
    );
    cyl.position.set(x, 0.52, 0.05);
    engine.add(cyl);
  }
  engine.add(block, head, manifold);
  engine.position.set(0.02, seat.y - 0.42, seat.z + 0.55);
  group.add(engine);
  applyBlockOutlines(engine);
  return engine;
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
      if (m.isMeshLambertMaterial) {
        m.envMap = null;
        m.needsUpdate = true;
      }
    }
  });
}
