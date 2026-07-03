import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

function paint(color, metal = 0.72, rough = 0.18) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: metal,
    roughness: rough,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
  });
}

function glass() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x88aacc,
    metalness: 0.05,
    roughness: 0.05,
    transparent: true,
    opacity: 0.45,
    transmission: 0.35,
  });
}

function chrome() {
  return new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.15 });
}

function rubber() {
  return new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.05, roughness: 0.92 });
}

function plastic(color = 0x1a1a1a) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.15, roughness: 0.65 });
}

function glow(color, intensity = 1.2) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    metalness: 0.2,
    roughness: 0.4,
  });
}

function sharpBox(w, h, d, mat, y, x = 0, z = 0, rotX = 0, rotY = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.set(rotX, rotY, 0);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function stainless(color = 0xb8bdc4) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.96,
    roughness: 0.14,
    clearcoat: 0.55,
    clearcoatRoughness: 0.06,
  });
}

function matteBlack() {
  return new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.35, roughness: 0.55 });
}
function roundBox(w, h, d, mat, y = h / 2, radius = 0.1) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, radius), mat);
  m.position.y = y;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function wheel(radius = 0.36) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.26, 18), rubber());
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.28, 16), chrome());
  rim.rotation.z = Math.PI / 2;

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, 0.3, 10), plastic(0x333333));
  hub.rotation.z = Math.PI / 2;

  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.55, 0.07, 0.16), chrome());
    spoke.rotation.x = (i / 5) * Math.PI * 2;
    spoke.rotation.z = Math.PI / 2;
    g.add(spoke);
  }

  g.add(tire, rim, hub);
  return g;
}

function addWheels(group, wx, wz, r = 0.36) {
  for (const [x, z] of [
    [-wx, wz],
    [wx, wz],
    [-wx, -wz],
    [wx, -wz],
  ]) {
    const w = wheel(r);
    w.position.set(x, r, z);
    group.add(w);
  }
}

function addLights(group, width, frontZ, rearZ) {
  const hw = width * 0.38;
  for (const x of [-hw, hw]) {
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.12), glow(0xfff4d6, 1.4));
    head.position.set(x, 0.52, frontZ);
    head.castShadow = true;
    group.add(head);

    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.1), glow(0xff2222, 0.9));
    tail.position.set(x, 0.58, rearZ);
    group.add(tail);
  }
}

function addBumpers(group, width, frontZ, rearZ) {
  const bumper = (z) => {
    const b = roundBox(width * 0.92, 0.22, 0.28, plastic(0x222222), 0.28, 0.04);
    b.position.z = z;
    return b;
  };
  group.add(bumper(frontZ), bumper(rearZ));
}

function addMirrors(group, width, z) {
  for (const x of [-width * 0.52, width * 0.52]) {
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.18), paint(0x111111, 0.5, 0.3));
    mirror.position.set(x, 1.05, z);
    group.add(mirror);
  }
}

function addGrille(group, width, z) {
  const grille = roundBox(width * 0.55, 0.35, 0.08, plastic(0x0a0a0a), 0.48, 0.02);
  grille.position.z = z;
  group.add(grille);
}

function cabin(width, height, depth, zOff, roofColor = 0x223344) {
  const g = new THREE.Group();
  const body = roundBox(width, height, depth, paint(roofColor, 0.35, 0.25), height / 2 + 0.5, 0.08);
  body.position.z = zOff;
  const windshield = roundBox(width * 0.88, height * 0.72, depth * 0.42, glass(), height / 2 + 0.62, 0.05);
  windshield.position.set(0, 0, zOff + depth * 0.18);
  windshield.rotation.x = -0.22;
  g.add(body, windshield);
  return g;
}

function cyberWheel(x, z, r = 0.4) {
  const g = new THREE.Group();
  const cover = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.88, r * 0.88, 0.18, 6), matteBlack());
  cover.rotation.z = Math.PI / 2;
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.24, 14), rubber());
  tire.rotation.z = Math.PI / 2;
  g.add(cover, tire);
  g.position.set(x, r * 0.92, z);
  return g;
}

function buildCybertruck(color) {
  const g = new THREE.Group();
  const steel = stainless(color ?? 0xb8bdc4);
  const steelDark = stainless(0x9aa0a8);

  // Low angular body — trapezoid profile
  const skirt = sharpBox(2.28, 0.42, 5.05, steelDark, 0.48, 0, 0);
  const belly = sharpBox(2.18, 0.55, 4.85, steel, 0.78, 0, 0.05);
  const hood = sharpBox(2.12, 0.28, 1.55, steel, 0.98, 0, 1.55, -0.08, 0);
  const front = sharpBox(2.22, 0.72, 0.22, steel, 0.72, 0, 2.42);
  const lightBar = sharpBox(2.05, 0.1, 0.08, glow(0xffffff, 1.6), 0.62, 0, 2.52);
  const bumper = sharpBox(2.24, 0.18, 0.2, matteBlack(), 0.22, 0, 2.58);

  // Peaked roof — signature Cybertruck triangle
  const roofFront = sharpBox(2.02, 0.52, 2.05, steel, 1.42, 0, -0.15, -0.32, 0);
  const roofRear = sharpBox(2.02, 0.48, 1.85, steel, 1.55, 0, -1.55, 0.28, 0);
  const sailL = sharpBox(0.12, 0.95, 3.35, steelDark, 1.05, -1.1, -0.35, 0, 0.12);
  const sailR = sharpBox(0.12, 0.95, 3.35, steelDark, 1.05, 1.1, -0.35, 0, -0.12);

  // Black glass band
  const glassBand = sharpBox(1.92, 0.38, 2.45, matteBlack(), 1.18, 0, -0.05);
  const windshield = sharpBox(1.75, 0.32, 1.15, glass(), 1.12, 0, 0.55, -0.42, 0);

  // Vault bed
  const bedFloor = sharpBox(2.12, 0.18, 2.15, steelDark, 0.52, 0, -1.75);
  const bedLeft = sharpBox(0.14, 0.42, 2.15, steel, 0.78, -1.08, -1.75);
  const bedRight = sharpBox(0.14, 0.42, 2.15, steel, 0.78, 1.08, -1.75);
  const tailBar = sharpBox(2.02, 0.08, 0.08, glow(0xff2222, 0.85), 0.58, 0, -2.72);

  // Fender arches
  for (const x of [-1.02, 1.02]) {
    const arch = sharpBox(0.55, 0.22, 0.85, matteBlack(), 0.52, x, 1.45);
    g.add(arch);
    const archR = sharpBox(0.55, 0.22, 0.85, matteBlack(), 0.52, x, -1.45);
    g.add(archR);
  }

  g.add(
    skirt, belly, hood, front, lightBar, bumper,
    roofFront, roofRear, sailL, sailR,
    glassBand, windshield,
    bedFloor, bedLeft, bedRight, tailBar,
  );

  g.add(cyberWheel(-1.02, 1.48), cyberWheel(1.02, 1.48), cyberWheel(-1.02, -1.48), cyberWheel(1.02, -1.48));
  return g;
}

function buildSedan(color) {
  const g = new THREE.Group();
  g.add(roundBox(1.95, 0.58, 4.25, paint(color), 0.52, 0.1));
  g.add(cabin(1.62, 0.78, 2.05, -0.15));
  const hood = roundBox(1.75, 0.18, 1.35, paint(color, 0.78, 0.2), 0.62, 0.06);
  hood.position.z = 1.35;
  g.add(hood);
  addGrille(g, 1.95, 2.05);
  addLights(g, 1.95, 2.12, -2.12);
  addBumpers(g, 1.95, 2.18, -2.18);
  addMirrors(g, 1.95, 0.1);
  addWheels(g, 0.88, 1.38, 0.36);
  return g;
}

function buildSports(color) {
  const g = new THREE.Group();
  const body = roundBox(1.9, 0.38, 4.05, paint(color, 0.8, 0.12), 0.42, 0.08);
  g.add(body);
  const hood = roundBox(1.72, 0.14, 1.55, paint(color, 0.85, 0.1), 0.5, 0.05);
  hood.position.set(0, 0, 1.15);
  g.add(hood);
  g.add(cabin(1.42, 0.52, 1.45, 0.05, 0x151520));
  const spoiler = roundBox(1.6, 0.08, 0.35, paint(color, 0.7, 0.2), 0.82, 0.02);
  spoiler.position.z = -1.85;
  g.add(spoiler);
  const intake = roundBox(1.2, 0.12, 0.2, plastic(0x111111), 0.28, 0.02);
  intake.position.z = 2.0;
  g.add(intake);
  addLights(g, 1.9, 2.02, -2.02);
  addBumpers(g, 1.9, 2.08, -2.08);
  addMirrors(g, 1.9, 0.2);
  addWheels(g, 0.92, 1.28, 0.34);
  return g;
}

function buildSuv(color) {
  const g = new THREE.Group();
  g.add(roundBox(2.05, 0.88, 4.45, paint(color), 0.68, 0.1));
  g.add(cabin(1.78, 0.95, 2.45, -0.22));
  const railL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 2.8), chrome());
  railL.position.set(-1.02, 1.55, -0.1);
  const railR = railL.clone();
  railR.position.x = 1.02;
  g.add(railL, railR);
  addGrille(g, 2.05, 2.15);
  addLights(g, 2.05, 2.22, -2.22);
  addBumpers(g, 2.05, 2.28, -2.28);
  addMirrors(g, 2.05, 0.0);
  addWheels(g, 0.92, 1.48, 0.4);
  return g;
}

function buildTruck(color) {
  const g = new THREE.Group();
  g.add(roundBox(2.05, 0.72, 1.85, paint(color), 0.78, 0.08));
  g.add(cabin(1.72, 0.82, 1.25, 0.55));
  const bedFloor = roundBox(2.05, 0.2, 2.45, paint(color, 0.5, 0.35), 0.52, 0.04);
  bedFloor.position.z = -1.95;
  const bedWallL = roundBox(0.12, 0.55, 2.45, paint(color, 0.55, 0.3), 0.78, 0.02);
  bedWallL.position.set(-0.98, 0, -1.95);
  const bedWallR = bedWallL.clone();
  bedWallR.position.x = 0.98;
  const bedWallBack = roundBox(2.05, 0.55, 0.12, paint(color, 0.55, 0.3), 0.78, 0.02);
  bedWallBack.position.z = -3.12;
  g.add(bedFloor, bedWallL, bedWallR, bedWallBack);
  addGrille(g, 2.05, 1.85);
  addLights(g, 2.05, 1.92, -3.05);
  addBumpers(g, 2.05, 1.98, -3.15);
  addMirrors(g, 2.05, 0.5);
  addWheels(g, 0.96, 1.38, 0.42);
  return g;
}

function buildCompact(color) {
  const g = new THREE.Group();
  g.add(roundBox(1.62, 0.52, 3.25, paint(color), 0.48, 0.09));
  g.add(cabin(1.38, 0.68, 1.65, -0.05));
  addLights(g, 1.62, 1.58, -1.58);
  addBumpers(g, 1.62, 1.64, -1.64);
  addWheels(g, 0.72, 1.08, 0.32);
  return g;
}

function buildVintage(color) {
  const g = new THREE.Group();
  const body = roundBox(1.72, 0.68, 3.85, paint(color, 0.35, 0.45), 0.72, 0.12);
  g.add(body);
  const fenderL = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 10), paint(color, 0.3, 0.5));
  fenderL.scale.set(1, 0.55, 1.1);
  fenderL.position.set(-0.98, 0.58, 1.0);
  const fenderR = fenderL.clone();
  fenderR.position.x = 0.98;
  g.add(fenderL, fenderR);
  g.add(cabin(1.32, 0.62, 1.45, 0.15, 0x4a3525));
  const spare = wheel(0.28);
  spare.position.set(0, 0.55, -1.75);
  g.add(spare);
  addLights(g, 1.72, 1.88, -1.88);
  addWheels(g, 0.78, 1.22, 0.36);
  return g;
}

function buildVan(color) {
  const g = new THREE.Group();
  g.add(roundBox(1.92, 1.42, 4.05, paint(color), 0.95, 0.08));
  const windows = roundBox(1.72, 0.75, 2.85, glass(), 1.38, 0.06);
  windows.position.z = -0.08;
  g.add(windows);
  addLights(g, 1.92, 1.98, -1.98);
  addBumpers(g, 1.92, 2.04, -2.04);
  addMirrors(g, 1.92, 0.3);
  addWheels(g, 0.88, 1.38, 0.37);
  return g;
}

const BUILDERS = {
  cybertruck: buildCybertruck,
  sedan: buildSedan,
  sports: buildSports,
  suv: buildSuv,
  truck: buildTruck,
  compact: buildCompact,
  vintage: buildVintage,
  van: buildVan,
};

export function buildCarMesh(spec) {
  const fn = BUILDERS[spec.style] ?? buildSedan;
  const mesh = fn(spec.color);
  mesh.userData.carId = spec.id;
  return mesh;
}

export const DRIVER_SEAT_OFFSET = { x: 0.35, y: 0.9, z: 0.3 };
