import * as THREE from 'three';
import { getCarProfile } from './carProfiles.js';
import { buildCockpit, buildEngineBay, prepareWheels, applyEnvironmentToCar } from './carRealism.js';

function blockPaint(color, metal = 0.12, rough = 0.52) {
  return new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
}

function blockGlass() {
  return new THREE.MeshStandardMaterial({
    color: 0xb8d4f0,
    metalness: 0.05,
    roughness: 0.15,
    transparent: true,
    opacity: 0.5,
  });
}

function chrome() {
  return new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.85, roughness: 0.2 });
}

function rubber() {
  return new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.02, roughness: 0.95 });
}

function plastic(color = 0x1a1a1a) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.08, roughness: 0.75 });
}

function lensMat() {
  return new THREE.MeshStandardMaterial({
    color: 0xffffee,
    emissive: 0xfff4cc,
    emissiveIntensity: 0.65,
    roughness: 0.2,
  });
}

function tailLens() {
  return new THREE.MeshStandardMaterial({
    color: 0xff3333,
    emissive: 0xff1111,
    emissiveIntensity: 0.7,
    roughness: 0.25,
  });
}

function stainless(color = 0xb8bdc4) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.18 });
}

function seamMat() {
  return new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.05, roughness: 0.9 });
}

function tagPart(node, partId, opts = {}) {
  node.userData.carPart = partId;
  if (opts.detachable !== false) node.userData.detachable = true;
  if (opts.dentPanel) node.userData.dentPanel = 'front';
  return node;
}

function part(w, h, d, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function finalizeCar(group, seat = { x: 0.32, y: 0.78, z: 0.05 }) {
  group.userData.driverSeat = seat;
  if (!group.userData.wheels) {
    const found = [];
    group.traverse((c) => { if (c.userData?.isWheel) found.push(c); });
    group.userData.wheels = found;
  }
  buildCockpit(group, seat);
  buildEngineBay(group, seat);
  prepareWheels(group);
  return group;
}

export function finishCarMesh(mesh, envMap) {
  applyEnvironmentToCar(mesh, envMap);
  return mesh;
}

function blockWheel(radius = 0.36) {
  const g = new THREE.Group();
  g.userData.isWheel = true;
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.28, 8), rubber);
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  tire.receiveShadow = true;
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.24, 8),
    plastic(0x777777),
  );
  rim.rotation.z = Math.PI / 2;
  rim.castShadow = true;
  g.add(tire, rim);
  return g;
}

function addWheels(g, p) {
  const wheels = [];
  const r = p.wheelR ?? 0.36;
  const wx = p.wheelX ?? 0.86;
  const wz = p.wheelZ ?? 1.32;
  for (const [x, z, id] of [[-wx, wz, 'wheel_fl'], [wx, wz, 'wheel_fr'], [-wx, -wz, 'wheel_rl'], [wx, -wz, 'wheel_rr']]) {
    const w = blockWheel(r);
    w.position.set(x, r, z);
    w.userData.carPart = id;
    w.userData.detachable = true;
    g.add(w);
    wheels.push(w);
  }
  g.userData.wheels = wheels;
}

function addPanelSeam(g, w, h, d, x, y, z) {
  const seam = part(w, h, d, seamMat());
  seam.position.set(x, y, z);
  g.add(seam);
}

function addBlockLights(g, p, fz, rz) {
  const hy = p.ride + 0.14;
  const inset = p.width * 0.42;
  for (const [x, side] of [[-inset, 'l'], [inset, 'r']]) {
    const head = new THREE.Group();
    const housing = part(0.34, 0.22, 0.14, plastic());
    const lens = part(0.28, 0.16, 0.06, lensMat());
    lens.position.z = 0.07;
    head.add(housing, lens);
    head.position.set(x, hy, fz);
    g.add(tagPart(head, 'headlight'));

    const tail = new THREE.Group();
    const tailBody = part(0.36, 0.18, 0.12, plastic(0x330000));
    const tl = part(0.3, 0.14, 0.05, tailLens());
    tl.position.z = 0.06;
    tail.add(tailBody, tl);
    tail.position.set(x, hy + 0.06, rz);
    g.add(tagPart(tail, 'taillight'));
  }

  if (p.pixelLights) {
    for (const x of [-p.width * 0.18, p.width * 0.18]) {
      const px = part(0.12, 0.12, 0.08, lensMat());
      px.position.set(x, hy - 0.02, fz - 0.02);
      g.add(px);
    }
  }
}

function addBlockBumpers(g, p, fz, rz) {
  const mk = (z, id) => {
    const isFront = id === 'bumper_front';
    const b = tagPart(part(p.width * 0.96, 0.2, 0.26, plastic(0x222222)), id, { dentPanel: isFront });
    b.position.set(0, p.ride * 0.32, z);
    return b;
  };
  g.add(mk(fz + 0.04, 'bumper_front'), mk(rz - 0.04, 'bumper_rear'));
}

function addBlockGrille(g, p, fz) {
  if (p.noGrille) {
    const lip = part(p.width * 0.7, 0.08, 0.1, plastic(0x111111));
    lip.position.set(0, p.ride * 0.4, fz);
    g.add(lip);
    return;
  }
  const grille = tagPart(part(p.width * 0.58, 0.4, 0.12, plastic(0x0a0a0a)), 'grille');
  grille.position.set(0, p.ride * 0.44, fz);
  g.add(grille);
  for (let i = -2; i <= 2; i++) {
    const bar = part(0.05, 0.34, 0.05, chrome());
    bar.position.set(i * p.width * 0.1, p.ride * 0.44, fz + 0.02);
    g.add(bar);
  }
}

function addBlockMirrors(g, p, z) {
  for (const [x, id] of [[-p.width * 0.52, 'mirror_l'], [p.width * 0.52, 'mirror_r']]) {
    const m = tagPart(part(0.14, 0.1, 0.12, plastic(0x222222)), id);
    m.position.set(x, p.ride + p.cabinH * 0.52, z);
    g.add(m);
  }
}

function addDoorsWindows(g, p, cabinZ) {
  const col = blockPaint(p.color);
  const hw = p.width * 0.5;
  for (const [x, id] of [[-hw, 'door_l'], [hw, 'door_r']]) {
    const door = tagPart(part(0.1, p.cabinH * 0.82, p.cabinLen * 0.48, col), id);
    door.position.set(x, p.ride + p.cabinH * 0.42, cabinZ);
    g.add(door);
    const win = tagPart(part(0.06, p.cabinH * 0.55, p.cabinLen * 0.4, blockGlass()), id === 'door_l' ? 'window_l' : 'window_r');
    win.position.set(x * 0.94, p.ride + p.cabinH * 0.52, cabinZ + 0.02);
    g.add(win);
  }
}

function addWindshield(g, p, cabinZ, tilt = -0.42) {
  const ws = tagPart(part(p.width * 0.76, p.cabinH * 0.58, 0.1, blockGlass()), 'windshield');
  ws.position.set(0, p.ride + p.cabinH * 0.48, cabinZ + p.cabinLen * 0.22);
  ws.rotation.x = tilt;
  g.add(ws);
  const rear = part(p.width * 0.7, p.cabinH * 0.45, 0.08, blockGlass());
  rear.position.set(0, p.ride + p.cabinH * 0.46, cabinZ - p.cabinLen * 0.32);
  rear.rotation.x = 0.38;
  g.add(rear);
}

function fz(p) {
  return p.length * 0.5 - 0.1;
}

function rz(p) {
  return -p.length * 0.5 + 0.1;
}

function buildRoundBody(g, p, col) {
  const rh = p.roundH ?? 0.9;
  const cabinZ = p.cabinZ ?? -0.05;
  const layers = [
    { w: 0.92, h: 0.22, d: 0.88, y: 0.18 },
    { w: 0.98, h: 0.28, d: 0.95, y: 0.38 },
    { w: 1.0, h: 0.32, d: 1.0, y: 0.58 },
    { w: 0.95, h: 0.28, d: 0.92, y: 0.78 },
    { w: 0.82, h: 0.22, d: 0.78, y: 0.95 },
  ];
  for (const layer of layers) {
    const block = part(p.width * layer.w, rh * layer.h, p.length * layer.d * 0.55, col);
    block.position.set(0, p.ride + rh * layer.y, cabinZ);
    g.add(block);
  }
  const nose = tagPart(part(p.width * 0.88, rh * 0.2, p.hoodLen ?? 0.85, col), 'hood', { dentPanel: true });
  nose.position.set(0, p.ride + rh * 0.22, p.length * 0.32);
  g.add(nose);
  const rear = part(p.width * 0.86, rh * 0.18, 0.65, col);
  rear.position.set(0, p.ride + rh * 0.2, -p.length * 0.32);
  g.add(rear);
}

/** Roblox / BeamNG-style block panel car — all models share this look. */
function buildBlockCar(p) {
  const g = new THREE.Group();
  const col = blockPaint(p.color);
  const dark = blockPaint(p.color, 0.08, 0.65);
  const L = p.length;
  const W = p.width;
  const ride = p.ride;
  const cabinH = p.cabinH ?? 0.72;
  const cabinLen = p.cabinLen ?? 2.0;
  const hoodLen = p.hoodLen ?? 1.2;
  const cabinZ = p.cabinZ ?? -0.08;
  const frontZ = fz(p);
  const rearZ = rz(p);

  if (p.bodyShape === 'round') {
    buildRoundBody(g, p, col);
    addWindshield(g, p, cabinZ, -0.38);
    addDoorsWindows(g, p, cabinZ);
    addBlockGrille(g, p, frontZ);
    addBlockLights(g, p, frontZ + 0.02, rearZ);
    addBlockBumpers(g, p, frontZ + 0.08, rearZ - 0.08);
    addBlockMirrors(g, p, cabinZ * 0.2);
    addWheels(g, p);
    return finalizeCar(g, { x: W * 0.15, y: ride + 0.42, z: 0 });
  }

  const sill = part(W, 0.28, L * 0.9, dark);
  sill.position.set(0, ride * 0.4, 0);
  g.add(sill);

  const hoodZ = L * 0.5 - hoodLen * 0.5 - 0.1;
  const hood = tagPart(part(W * 0.94, 0.18, hoodLen, col), 'hood', { dentPanel: true });
  hood.position.set(0, ride + 0.1, hoodZ);
  g.add(hood);

  for (const x of [-1, 1]) {
    const fender = part(0.22, 0.36, hoodLen * 0.78, col);
    fender.position.set(x * W * 0.48, ride + 0.16, hoodZ);
    g.add(fender);
  }

  const cabinBody = part(W * 0.9, cabinH * 0.54, cabinLen, col);
  cabinBody.position.set(0, ride + cabinH * 0.32, cabinZ);
  g.add(cabinBody);

  const roof = part(W * 0.84, 0.16, cabinLen * 0.9, col);
  roof.position.set(0, ride + cabinH * 0.64, cabinZ);
  g.add(roof);

  addPanelSeam(g, W * 0.92, 0.04, 0.06, 0, ride + 0.08, hoodZ - hoodLen * 0.5 - 0.02);
  addPanelSeam(g, W * 0.92, 0.04, 0.06, 0, ride + cabinH * 0.28, cabinZ + cabinLen * 0.5 + 0.02);

  if (p.fastback || p.bodyShape === 'fastback' || p.bodyShape === 'supercar' || p.bodyShape === 'gullwing') {
    const slope = tagPart(part(W * 0.88, cabinH * 0.5, 1.05, col), 'trunk');
    slope.position.set(0, ride + cabinH * 0.4, -L * 0.5 + 0.7);
    slope.rotation.x = -0.5;
    g.add(slope);
  } else if (p.bodyShape !== 'truck' && p.bodyShape !== 'ev-truck' && !p.bed && p.bodyShape !== 'flat-van') {
    const trunkLen = Math.max(0.55, L - hoodLen - cabinLen - 0.3);
    const trunkZ = -L * 0.5 + trunkLen * 0.5 + 0.14;
    const trunk = part(W * 0.9, 0.2, trunkLen, col);
    trunk.position.set(0, ride + 0.12, trunkZ);
    g.add(trunk);
    addPanelSeam(g, W * 0.92, 0.04, 0.06, 0, ride + 0.08, trunkZ + trunkLen * 0.5 + 0.02);
  }

  if (p.bodyShape === 'supercar' || p.low) {
    const nose = tagPart(part(W * 0.9, 0.14, hoodLen * 0.92, col), 'front_panel', { dentPanel: true });
    nose.position.set(0, ride + 0.05, hoodZ + 0.06);
    g.add(nose);
    if (p.wide) {
      for (const x of [-1, 1]) {
        const hip = part(0.24, 0.22, 0.95, col);
        hip.position.set(x * W * 0.48, ride + 0.2, -L * 0.22);
        g.add(hip);
      }
    }
  }

  if (p.rearHump || p.bodyShape === '911') {
    const hump = part(W * 0.9, 0.3, 0.88, col);
    hump.position.set(0, ride + 0.4, -L * 0.32);
    g.add(hump);
  }

  if (p.bodyShape === 'wedge' || p.stainless) {
    const mat = p.stainless ? stainless(p.color) : col;
    const wedge = part(W * 0.9, ride * 0.72, L * 0.88, mat);
    wedge.position.set(0, ride * 0.5, 0);
    g.add(wedge);
  }

  if (p.bodyShape === 'box-suv' || p.upright || p.style === 'suv' || p.bodyShape === 'ev-suv' || p.bodyShape === 'luxury-suv') {
    const tall = part(W * 0.94, cabinH * 0.68, cabinLen * 1.08, col);
    tall.position.set(0, ride + cabinH * 0.4, cabinZ);
    g.add(tall);
    const boxRoof = part(W * 0.86, 0.18, cabinLen * 0.95, col);
    boxRoof.position.set(0, ride + cabinH * 0.78, cabinZ);
    g.add(boxRoof);
  }

  if (p.bed || p.bodyShape === 'truck' || p.bodyShape === 'ev-truck') {
    const bedLen = p.bedLen ?? 2.4;
    const bedZ = -L * 0.5 + bedLen * 0.5 + 0.22;
    const bed = part(W * 0.94, 0.22, bedLen, dark);
    bed.position.set(0, ride * 0.56, bedZ);
    g.add(bed);
    for (const x of [-W * 0.46, W * 0.46]) {
      const wall = part(0.14, 0.52, bedLen, col);
      wall.position.set(x, ride + 0.38, bedZ);
      g.add(wall);
    }
    const tail = part(W * 0.9, 0.52, 0.14, col);
    tail.position.set(0, ride + 0.38, bedZ - bedLen * 0.5 - 0.05);
    g.add(tail);
  }

  if (p.bodyShape === 'flat-van' || p.style === 'van') {
    const van = tagPart(part(W * 0.94, cabinH * 1.18, L * 0.84, col), 'body', { dentPanel: true });
    van.position.set(0, ride + cabinH * 0.6, -0.05);
    g.add(van);
    if (p.splitWindshield) {
      for (const [x, ry] of [[-W * 0.2, 0.14], [W * 0.2, -0.14]]) {
        const sw = tagPart(part(W * 0.36, cabinH * 0.52, 0.1, blockGlass()), 'windshield');
        sw.position.set(x, ride + cabinH * 0.58, frontZ - 0.18);
        sw.rotation.y = ry;
        g.add(sw);
      }
    }
  }

  if (p.spare) {
    const spare = blockWheel(0.32);
    spare.position.set(0, ride + 0.48, rearZ - 0.14);
    g.add(spare);
  }

  addWindshield(g, p, cabinZ, p.upright ? -0.35 : -0.42);
  if (!p.splitWindshield) addDoorsWindows(g, p, cabinZ);
  else {
    for (const [x, id] of [[-W * 0.5, 'door_l'], [W * 0.5, 'door_r']]) {
      const door = tagPart(part(0.1, cabinH * 0.85, cabinLen * 0.55, col), id);
      door.position.set(x, ride + cabinH * 0.45, cabinZ);
      g.add(door);
    }
  }
  addBlockGrille(g, p, frontZ);
  addBlockLights(g, p, frontZ + 0.02, rearZ);
  addBlockBumpers(g, p, frontZ + 0.08, rearZ - 0.08);
  addBlockMirrors(g, p, cabinZ * 0.3);

  if (p.scoop) {
    const scoop = part(0.4, 0.1, 0.44, plastic());
    scoop.position.set(0, ride + 0.22, hoodZ - hoodLen * 0.15);
    g.add(scoop);
  }

  if (p.spoiler || p.bodyShape === 'supercar') {
    const sp = tagPart(part(W * 0.76, 0.1, 0.32, col), 'spoiler');
    sp.position.set(0, ride + cabinH * 0.54, rearZ + 0.14);
    g.add(sp);
  }

  if (p.stripe) {
    const stripe = part(0.16, 0.05, L * 0.52, blockPaint(0xffffff, 0.2, 0.4));
    stripe.position.set(0, ride + 0.24, 0);
    g.add(stripe);
  }

  if (p.roofRails) {
    for (const x of [-W * 0.44, W * 0.44]) {
      const rail = part(0.06, 0.06, cabinLen * 0.88, chrome());
      rail.position.set(x, ride + cabinH + 0.05, cabinZ);
      g.add(rail);
    }
  }

  if (p.bodyShape === 'vintage-tall' || p.tall) {
    const cabin = part(W * 0.88, cabinH * 0.75, cabinLen * 0.95, col);
    cabin.position.set(0, ride + cabinH * 0.48, cabinZ);
    g.add(cabin);
  }

  addWheels(g, p);

  const seatY = ride + (p.low ? 0.32 : 0.4);
  const seatZ = p.bodyShape === 'truck' || p.bed ? 0.35 : 0.02;
  return finalizeCar(g, { x: W * 0.17, y: seatY + 0.38, z: seatZ });
}

function buildBlockCybertruck(p) {
  const g = new THREE.Group();
  const steel = stainless(p.color);
  const dark = stainless(0x9aa0a8);
  const L = 5.05;
  const W = 2.28;

  const base = part(W, 0.42, L, dark);
  base.position.set(0, 0.48, 0);
  g.add(base);

  const belly = part(W * 0.96, 0.55, L * 0.96, steel);
  belly.position.set(0, 0.78, 0.05);
  g.add(belly);

  const hood = tagPart(part(2.12, 0.28, 1.55, steel), 'hood', { dentPanel: true });
  hood.position.set(0, 0.98, 1.55);
  hood.rotation.x = -0.08;
  g.add(hood);

  const front = tagPart(part(2.22, 0.72, 0.22, steel), 'front_panel', { dentPanel: true });
  front.position.set(0, 0.72, 2.42);
  g.add(front);

  const lightBar = tagPart(part(2.05, 0.1, 0.08, lensMat()), 'headlight');
  lightBar.position.set(0, 0.62, 2.52);
  g.add(lightBar);

  const bumper = tagPart(part(2.24, 0.18, 0.2, plastic()), 'bumper_front', { dentPanel: true });
  bumper.position.set(0, 0.22, 2.58);
  g.add(bumper);

  const roofFront = part(2.02, 0.52, 2.05, steel);
  roofFront.position.set(0, 1.42, -0.15);
  roofFront.rotation.x = -0.32;
  g.add(roofFront);

  const roofRear = part(2.02, 0.48, 1.85, steel);
  roofRear.position.set(0, 1.55, -1.55);
  roofRear.rotation.x = 0.28;
  g.add(roofRear);

  for (const x of [-1.1, 1.1]) {
    const sail = tagPart(part(0.12, 0.95, 3.35, dark), x < 0 ? 'door_l' : 'door_r');
    sail.position.set(x, 1.05, -0.35);
    sail.rotation.y = x < 0 ? 0.12 : -0.12;
    g.add(sail);
  }

  const ws = tagPart(part(1.75, 0.32, 1.15, blockGlass()), 'windshield');
  ws.position.set(0, 1.12, 0.55);
  ws.rotation.x = -0.42;
  g.add(ws);

  const bedFloor = part(2.12, 0.18, 2.15, dark);
  bedFloor.position.set(0, 0.52, -1.75);
  g.add(bedFloor);

  for (const x of [-1.08, 1.08]) {
    const bedWall = part(0.14, 0.42, 2.15, steel);
    bedWall.position.set(x, 0.78, -1.75);
    g.add(bedWall);
  }

  const wheelPositions = [
    [-1.02, 1.48, 'wheel_fl'],
    [1.02, 1.48, 'wheel_fr'],
    [-1.02, -1.48, 'wheel_rl'],
    [1.02, -1.48, 'wheel_rr'],
  ];
  const wheels = [];
  for (const [x, z, id] of wheelPositions) {
    const w = blockWheel(0.4);
    w.position.set(x, 0.38, z);
    w.userData.carPart = id;
    w.userData.detachable = true;
    g.add(w);
    wheels.push(w);
  }
  g.userData.wheels = wheels;

  return finalizeCar(g, { x: 0.28, y: 0.88, z: 0.12 });
}

export function buildCarMesh(spec) {
  const p = getCarProfile(spec);
  const mesh = p.bodyShape === 'cybertruck' ? buildBlockCybertruck(p) : buildBlockCar(p);
  mesh.userData.carId = spec.id;
  mesh.userData.carName = spec.name;
  return mesh;
}

export const DRIVER_SEAT_OFFSET = { x: 0.35, y: 0.9, z: 0.3 };
