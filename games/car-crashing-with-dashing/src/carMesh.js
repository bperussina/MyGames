import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { buildCockpit, prepareWheels, applyEnvironmentToCar } from './carRealism.js';

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
    opacity: 0.4,
    transmission: 0.55,
    thickness: 0.15,
  });
}

function driverGlass() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xc8ddf0,
    metalness: 0.2,
    roughness: 0.02,
    transparent: true,
    opacity: 0.28,
    transmission: 0.82,
    thickness: 0.25,
    ior: 1.45,
    envMapIntensity: 1.5,
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

function tagPart(mesh, partId, opts = {}) {
  mesh.userData.carPart = partId;
  if (opts.detachable) mesh.userData.detachable = true;
  if (opts.dentPanel) mesh.userData.dentPanel = 'front';
  return mesh;
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
  g.userData.isWheel = true;
  const brake = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.5, radius * 0.5, 0.055, 18), chrome());
  brake.rotation.z = Math.PI / 2;
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.26, 24), rubber());
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.28, 18), chrome());
  rim.rotation.z = Math.PI / 2;
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, 0.3, 10), plastic(0x333333));
  hub.rotation.z = Math.PI / 2;
  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.55, 0.07, 0.16), chrome());
    spoke.rotation.x = (i / 5) * Math.PI * 2;
    spoke.rotation.z = Math.PI / 2;
    g.add(spoke);
  }
  for (let i = 0; i < 8; i++) {
    const tread = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.14), rubber());
    tread.position.set(0, Math.cos((i / 8) * Math.PI * 2) * radius, Math.sin((i / 8) * Math.PI * 2) * radius);
    tread.rotation.x = (i / 8) * Math.PI * 2;
    g.add(tread);
  }
  g.add(brake, tire, rim, hub);
  return g;
}

function addWheelSet(group, wx, wz, r = 0.36) {
  const wheels = [];
  const spots = [
    [-wx, wz, 'wheel_fl'],
    [wx, wz, 'wheel_fr'],
    [-wx, -wz, 'wheel_rl'],
    [wx, -wz, 'wheel_rr'],
  ];
  for (const [x, z, id] of spots) {
    const w = wheel(r);
    w.position.set(x, r, z);
    w.userData.carPart = id;
    group.add(w);
    wheels.push(w);
  }
  group.userData.wheels = wheels;
  return wheels;
}

function addLights(group, width, frontZ, rearZ) {
  const hw = width * 0.38;
  for (const x of [-hw, hw]) {
    const head = tagPart(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.12), glow(0xfff4d6, 1.4)), 'headlight', {
      detachable: true,
    });
    head.position.set(x, 0.52, frontZ);
    head.castShadow = true;
    group.add(head);
    const tail = tagPart(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.1), glow(0xff2222, 0.9)), 'taillight');
    tail.position.set(x, 0.58, rearZ);
    group.add(tail);
  }
}

function addBumpers(group, width, frontZ, rearZ) {
  const bumper = (z, id) => {
    const b = tagPart(roundBox(width * 0.92, 0.22, 0.28, plastic(0x222222), 0.28, 0.04), id, {
      detachable: true,
    });
    b.position.z = z;
    return b;
  };
  group.add(bumper(frontZ, 'bumper_front'), bumper(rearZ, 'bumper_rear'));
}

function addMirrors(group, width, z) {
  for (const [x, id] of [
    [-width * 0.52, 'mirror_l'],
    [width * 0.52, 'mirror_r'],
  ]) {
    const mirror = tagPart(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.18), paint(0x111111, 0.5, 0.3)), id, {
      detachable: true,
    });
    mirror.position.set(x, 1.05, z);
    group.add(mirror);
  }
}

function addGrille(group, width, z) {
  const grille = tagPart(roundBox(width * 0.55, 0.35, 0.08, plastic(0x0a0a0a), 0.48, 0.02), 'grille', {
    detachable: true,
  });
  grille.position.z = z;
  group.add(grille);
}

function addDoorsAndWindows(group, color, width, cabinZ = -0.15) {
  const bodyCol = paint(color);
  const doorL = tagPart(roundBox(0.1, 0.74, 1.18, bodyCol, 0.62, 0.04), 'door_l', { detachable: true });
  doorL.position.set(-width * 0.5, 0, cabinZ);
  const doorR = tagPart(roundBox(0.1, 0.74, 1.18, bodyCol, 0.62, 0.04), 'door_r', { detachable: true });
  doorR.position.set(width * 0.5, 0, cabinZ);
  group.add(doorL, doorR);

  const winL = tagPart(roundBox(0.05, 0.5, 0.92, driverGlass(), 0.48, 0.02), 'window_l');
  winL.position.set(-width * 0.46, 0.95, cabinZ + 0.05);
  const winR = tagPart(roundBox(0.05, 0.5, 0.92, driverGlass(), 0.48, 0.02), 'window_r');
  winR.position.set(width * 0.46, 0.95, cabinZ + 0.05);
  group.add(winL, winR);

  const interior = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.82, 0.65, 1.35),
    new THREE.MeshStandardMaterial({ color: 0x1a1a22, roughness: 0.9 }),
  );
  interior.position.set(0, 0.72, cabinZ);
  group.add(interior);
}

function cabin(width, height, depth, zOff, roofColor = 0x223344) {
  const g = new THREE.Group();
  const body = roundBox(width, height, depth, paint(roofColor, 0.35, 0.25), height / 2 + 0.5, 0.08);
  body.position.z = zOff;
  const windshield = tagPart(
    roundBox(width * 0.88, height * 0.72, depth * 0.42, driverGlass(), height / 2 + 0.62, 0.05),
    'windshield',
    { detachable: true },
  );
  windshield.position.set(0, 0, zOff + depth * 0.18);
  windshield.rotation.x = -0.22;
  g.add(body, windshield);
  return g;
}

function cyberWheel(x, z, r = 0.4) {
  const g = new THREE.Group();
  g.userData.isWheel = true;
  const cover = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.88, r * 0.88, 0.18, 6), matteBlack());
  cover.rotation.z = Math.PI / 2;
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.24, 14), rubber());
  tire.rotation.z = Math.PI / 2;
  g.add(cover, tire);
  g.position.set(x, r * 0.92, z);
  return g;
}

function addCyberWheels(group) {
  const wheels = [];
  for (const [x, z, id] of [
    [-1.02, 1.48, 'wheel_fl'],
    [1.02, 1.48, 'wheel_fr'],
    [-1.02, -1.48, 'wheel_rl'],
    [1.02, -1.48, 'wheel_rr'],
  ]) {
    const w = cyberWheel(x, z);
    w.userData.carPart = id;
    group.add(w);
    wheels.push(w);
  }
  group.userData.wheels = wheels;
}

function finalizeCar(group, driverSeat = { x: 0.32, y: 0.78, z: 0.05 }) {
  group.userData.driverSeat = driverSeat;
  if (!group.userData.wheels) {
    const found = [];
    group.traverse((c) => {
      if (c.userData?.isWheel) found.push(c);
    });
    group.userData.wheels = found;
  }
  buildCockpit(group, driverSeat);
  prepareWheels(group);
  return group;
}

export function finishCarMesh(mesh, envMap) {
  applyEnvironmentToCar(mesh, envMap);
  return mesh;
}

function buildCybertruck(color) {
  const g = new THREE.Group();
  const steel = stainless(color ?? 0xb8bdc4);
  const steelDark = stainless(0x9aa0a8);

  const skirt = sharpBox(2.28, 0.42, 5.05, steelDark, 0.48, 0, 0);
  const belly = sharpBox(2.18, 0.55, 4.85, steel, 0.78, 0, 0.05);
  const hood = tagPart(sharpBox(2.12, 0.28, 1.55, steel, 0.98, 0, 1.55, -0.08, 0), 'hood', { dentPanel: true });
  const front = tagPart(sharpBox(2.22, 0.72, 0.22, steel, 0.72, 0, 2.42), 'front_panel', { dentPanel: true });
  const lightBar = sharpBox(2.05, 0.1, 0.08, glow(0xffffff, 1.6), 0.62, 0, 2.52);
  const bumper = tagPart(sharpBox(2.24, 0.18, 0.2, matteBlack(), 0.22, 0, 2.58), 'bumper_front', {
    detachable: true,
  });

  const roofFront = sharpBox(2.02, 0.52, 2.05, steel, 1.42, 0, -0.15, -0.32, 0);
  const roofRear = sharpBox(2.02, 0.48, 1.85, steel, 1.55, 0, -1.55, 0.28, 0);
  const sailL = tagPart(sharpBox(0.12, 0.95, 3.35, steelDark, 1.05, -1.1, -0.35, 0, 0.12), 'door_l', {
    detachable: true,
  });
  const sailR = tagPart(sharpBox(0.12, 0.95, 3.35, steelDark, 1.05, 1.1, -0.35, 0, -0.12), 'door_r', {
    detachable: true,
  });

  const glassBand = sharpBox(1.92, 0.38, 2.45, matteBlack(), 1.18, 0, -0.05);
  const windshield = tagPart(sharpBox(1.75, 0.32, 1.15, driverGlass(), 1.12, 0, 0.55, -0.42, 0), 'windshield', {
    detachable: true,
  });

  const interior = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.7, 2.1), matteBlack());
  interior.position.set(0, 0.95, -0.1);
  g.add(interior);

  const bedFloor = sharpBox(2.12, 0.18, 2.15, steelDark, 0.52, 0, -1.75);
  const bedLeft = sharpBox(0.14, 0.42, 2.15, steel, 0.78, -1.08, -1.75);
  const bedRight = sharpBox(0.14, 0.42, 2.15, steel, 0.78, 1.08, -1.75);
  const tailBar = sharpBox(2.02, 0.08, 0.08, glow(0xff2222, 0.85), 0.58, 0, -2.72);

  for (const x of [-1.02, 1.02]) {
    g.add(sharpBox(0.55, 0.22, 0.85, matteBlack(), 0.52, x, 1.45));
    g.add(sharpBox(0.55, 0.22, 0.85, matteBlack(), 0.52, x, -1.45));
  }

  g.add(
    skirt, belly, hood, front, lightBar, bumper,
    roofFront, roofRear, sailL, sailR,
    glassBand, windshield,
    bedFloor, bedLeft, bedRight, tailBar,
  );
  addCyberWheels(g);
  return finalizeCar(g, { x: 0.28, y: 0.88, z: 0.12 });
}

function buildSedan(color) {
  const g = new THREE.Group();
  g.add(roundBox(1.95, 0.58, 4.25, paint(color), 0.52, 0.1));
  g.add(cabin(1.62, 0.78, 2.05, -0.15));
  addDoorsAndWindows(g, color, 1.95, -0.15);
  const hood = tagPart(roundBox(1.75, 0.18, 1.35, paint(color, 0.78, 0.2), 0.62, 0.06), 'hood', {
    dentPanel: true,
  });
  hood.position.z = 1.35;
  g.add(hood);
  addGrille(g, 1.95, 2.05);
  addLights(g, 1.95, 2.12, -2.12);
  addBumpers(g, 1.95, 2.18, -2.18);
  addMirrors(g, 1.95, 0.1);
  addWheelSet(g, 0.88, 1.38, 0.36);
  return finalizeCar(g, { x: 0.35, y: 0.78, z: 0.05 });
}

function buildSports(color) {
  const g = new THREE.Group();
  g.add(roundBox(1.9, 0.38, 4.05, paint(color, 0.8, 0.12), 0.42, 0.08));
  const hood = tagPart(roundBox(1.72, 0.14, 1.55, paint(color, 0.85, 0.1), 0.5, 0.05), 'hood', {
    dentPanel: true,
  });
  hood.position.set(0, 0, 1.15);
  g.add(hood);
  g.add(cabin(1.42, 0.52, 1.45, 0.05, 0x151520));
  addDoorsAndWindows(g, color, 1.75, 0.05);
  const spoiler = tagPart(roundBox(1.6, 0.08, 0.35, paint(color, 0.7, 0.2), 0.82, 0.02), 'spoiler', {
    detachable: true,
  });
  spoiler.position.z = -1.85;
  g.add(spoiler);
  const intake = tagPart(roundBox(1.2, 0.12, 0.2, plastic(0x111111), 0.28, 0.02), 'grille', { detachable: true });
  intake.position.z = 2.0;
  g.add(intake);
  addLights(g, 1.9, 2.02, -2.02);
  addBumpers(g, 1.9, 2.08, -2.08);
  addMirrors(g, 1.9, 0.2);
  addWheelSet(g, 0.92, 1.28, 0.34);
  return finalizeCar(g, { x: 0.32, y: 0.62, z: 0.08 });
}

function buildSuv(color) {
  const g = new THREE.Group();
  g.add(tagPart(roundBox(2.05, 0.88, 4.45, paint(color), 0.68, 0.1), 'body', { dentPanel: true }));
  g.add(cabin(1.78, 0.95, 2.45, -0.22));
  addDoorsAndWindows(g, color, 2.05, -0.22);
  const railL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 2.8), chrome());
  railL.position.set(-1.02, 1.55, -0.1);
  const railR = railL.clone();
  railR.position.x = 1.02;
  g.add(railL, railR);
  addGrille(g, 2.05, 2.15);
  addLights(g, 2.05, 2.22, -2.22);
  addBumpers(g, 2.05, 2.28, -2.28);
  addMirrors(g, 2.05, 0.0);
  addWheelSet(g, 0.92, 1.48, 0.4);
  return finalizeCar(g, { x: 0.38, y: 0.92, z: 0.02 });
}

function buildTruck(color) {
  const g = new THREE.Group();
  g.add(tagPart(roundBox(2.05, 0.72, 1.85, paint(color), 0.78, 0.08), 'cab', { dentPanel: true }));
  g.add(cabin(1.72, 0.82, 1.25, 0.55));
  addDoorsAndWindows(g, color, 1.85, 0.55);
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
  addWheelSet(g, 0.96, 1.38, 0.42);
  return finalizeCar(g, { x: 0.4, y: 0.85, z: 0.45 });
}

function buildCompact(color) {
  const g = new THREE.Group();
  g.add(tagPart(roundBox(1.62, 0.52, 3.25, paint(color), 0.48, 0.09), 'body', { dentPanel: true }));
  g.add(cabin(1.38, 0.68, 1.65, -0.05));
  addDoorsAndWindows(g, color, 1.62, -0.05);
  addLights(g, 1.62, 1.58, -1.58);
  addBumpers(g, 1.62, 1.64, -1.64);
  addWheelSet(g, 0.72, 1.08, 0.32);
  return finalizeCar(g, { x: 0.3, y: 0.72, z: 0.02 });
}

function buildVintage(color) {
  const g = new THREE.Group();
  g.add(tagPart(roundBox(1.72, 0.68, 3.85, paint(color, 0.35, 0.45), 0.72, 0.12), 'body', { dentPanel: true }));
  addDoorsAndWindows(g, color, 1.72, 0.15);
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
  addWheelSet(g, 0.78, 1.22, 0.36);
  return finalizeCar(g, { x: 0.32, y: 0.75, z: 0.1 });
}

function buildVan(color) {
  const g = new THREE.Group();
  g.add(tagPart(roundBox(1.92, 1.42, 4.05, paint(color), 0.95, 0.08), 'body', { dentPanel: true }));
  const windows = tagPart(roundBox(1.72, 0.75, 2.85, driverGlass(), 1.38, 0.06), 'windshield');
  windows.position.z = -0.08;
  g.add(windows);
  addDoorsAndWindows(g, color, 1.92, -0.08);
  addLights(g, 1.92, 1.98, -1.98);
  addBumpers(g, 1.92, 2.04, -2.04);
  addMirrors(g, 1.92, 0.3);
  addWheelSet(g, 0.88, 1.38, 0.37);
  return finalizeCar(g, { x: 0.36, y: 0.95, z: -0.05 });
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
