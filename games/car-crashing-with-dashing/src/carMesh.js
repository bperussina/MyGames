import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { getCarProfile } from './carProfiles.js';
import { buildCockpit, buildEngineBay, prepareWheels, applyEnvironmentToCar } from './carRealism.js';

function paint(color, metal = 0.78, rough = 0.16) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: metal,
    roughness: rough,
    clearcoat: 0.95,
    clearcoatRoughness: 0.06,
  });
}

function driverGlass() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xc8ddf0,
    metalness: 0.15,
    roughness: 0.02,
    transparent: true,
    opacity: 0.22,
    transmission: 0.88,
    thickness: 0.3,
    ior: 1.52,
    envMapIntensity: 1.6,
  });
}

function chrome() {
  return new THREE.MeshStandardMaterial({ color: 0xe8e8ec, metalness: 0.96, roughness: 0.12 });
}

function rubber() {
  return new THREE.MeshStandardMaterial({ color: 0x0e0e0e, metalness: 0.04, roughness: 0.94 });
}

function plastic(color = 0x141414) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.12, roughness: 0.68 });
}

function stainless(color = 0xb8bdc4) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.97,
    roughness: 0.12,
    clearcoat: 0.6,
    clearcoatRoughness: 0.05,
  });
}

function matteBlack() {
  return new THREE.MeshStandardMaterial({ color: 0x0c0c0c, metalness: 0.3, roughness: 0.58 });
}

function lensMat(intensity = 0.4) {
  return new THREE.MeshPhysicalMaterial({
    color: 0xfff8e8,
    emissive: 0xfff0cc,
    emissiveIntensity: intensity,
    metalness: 0.05,
    roughness: 0.04,
    transparent: true,
    opacity: 0.9,
  });
}

function tailLens() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xff2222,
    emissive: 0xff1111,
    emissiveIntensity: 0.55,
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.92,
  });
}

function tagPart(node, partId, opts = {}) {
  node.userData.carPart = partId;
  if (opts.detachable !== false) node.userData.detachable = true;
  if (opts.dentPanel) node.userData.dentPanel = 'front';
  return node;
}

function mesh(geo, mat, cast = true) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}

function box(w, h, d, mat, y = h / 2, x = 0, z = 0, rx = 0, ry = 0) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, 0);
  return m;
}

function roundBox(w, h, d, mat, y = h / 2, radius = 0.08) {
  const m = mesh(new RoundedBoxGeometry(w, h, d, 5, radius), mat, true);
  m.position.y = y;
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

function wheel(radius = 0.36, sport = false) {
  const g = new THREE.Group();
  g.userData.isWheel = true;
  const tire = mesh(new THREE.CylinderGeometry(radius, radius, sport ? 0.3 : 0.26, 28), rubber);
  tire.rotation.z = Math.PI / 2;
  const rim = mesh(new THREE.CylinderGeometry(radius * 0.68, radius * 0.68, sport ? 0.26 : 0.24, 20), chrome);
  rim.rotation.z = Math.PI / 2;
  const hub = mesh(new THREE.CylinderGeometry(radius * 0.2, radius * 0.2, sport ? 0.28 : 0.26, 12), plastic(0x2a2a2a));
  hub.rotation.z = Math.PI / 2;
  const spokes = sport ? 7 : 5;
  for (let i = 0; i < spokes; i++) {
    const spoke = mesh(new THREE.BoxGeometry(radius * 0.58, 0.06, sport ? 0.12 : 0.14), chrome);
    spoke.rotation.x = (i / spokes) * Math.PI * 2;
    spoke.rotation.z = Math.PI / 2;
    g.add(spoke);
  }
  const disc = mesh(new THREE.CylinderGeometry(radius * 0.48, radius * 0.48, 0.05, 16), plastic(0x333333));
  disc.rotation.z = Math.PI / 2;
  g.add(tire, rim, hub, disc);
  return g;
}

function addWheels(group, p) {
  const wheels = [];
  const r = p.wheelR ?? 0.36;
  const wx = p.wheelX ?? 0.86;
  const wz = p.wheelZ ?? 1.32;
  const sport = p.low || p.bodyShape === 'supercar';
  for (const [x, z, id] of [[-wx, wz, 'wheel_fl'], [wx, wz, 'wheel_fr'], [-wx, -wz, 'wheel_rl'], [wx, -wz, 'wheel_rr']]) {
    const w = wheel(r, sport);
    w.position.set(x, r, z);
    w.userData.carPart = id;
    w.userData.detachable = true;
    group.add(w);
    wheels.push(w);
  }
  group.userData.wheels = wheels;
}

function addWheelArch(group, x, z, r, color) {
  const arch = mesh(
    new THREE.TorusGeometry(r * 1.02, r * 0.14, 8, 16, Math.PI),
    paint(color, 0.7, 0.22),
  );
  arch.rotation.x = Math.PI / 2;
  arch.rotation.z = x < 0 ? Math.PI : 0;
  arch.position.set(x, r * 0.92, z);
  group.add(tagPart(arch, `arch_${x < 0 ? 'l' : 'r'}_${z > 0 ? 'f' : 'r'}`));
}

function addHeadlight(group, x, y, z, round = false) {
  const h = new THREE.Group();
  if (round) {
    h.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.12, 18), plastic()));
    const lens = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 18), lensMat(0.45));
    lens.rotation.z = Math.PI / 2;
    lens.position.x = 0.065;
    h.add(lens);
    h.rotation.z = Math.PI / 2;
  } else {
    h.add(mesh(new THREE.BoxGeometry(0.34, 0.15, 0.1), plastic()));
    h.add(mesh(new THREE.BoxGeometry(0.28, 0.11, 0.04), lensMat(0.42)));
    h.children[1].position.z = 0.06;
  }
  h.position.set(x, y, z);
  group.add(tagPart(h, 'headlight', { detachable: true }));
}

function addTaillight(group, x, y, z) {
  const t = new THREE.Group();
  t.add(mesh(new THREE.BoxGeometry(0.36, 0.14, 0.08), plastic(0x220000)));
  const lens = mesh(new THREE.BoxGeometry(0.3, 0.1, 0.03), tailLens());
  lens.position.z = 0.045;
  t.add(lens);
  t.position.set(x, y, z);
  group.add(tagPart(t, 'taillight'));
}

function addLights(group, p, frontZ, rearZ) {
  const hw = p.width * 0.38;
  const round = p.roundLights;
  for (const x of [-hw, hw]) {
    addHeadlight(group, x, p.ride + 0.02, frontZ, round);
    addTaillight(group, x, p.ride + 0.12, rearZ);
  }
}

function addBumpers(group, p, frontZ, rearZ) {
  const mk = (z, id) => {
    const isFront = id === 'bumper_front';
    const b = tagPart(roundBox(p.width * 0.94, 0.2, 0.26, plastic(0x1a1a1a), 0.2, 0.03), id, {
      detachable: true,
      dentPanel: isFront,
    });
    b.position.z = z;
    return b;
  };
  group.add(mk(frontZ, 'bumper_front'), mk(rearZ, 'bumper_rear'));
}

function addGrille(group, p, z, tall = false) {
  if (p.noGrille) {
    const lip = box(p.width * 0.7, 0.06, 0.06, plastic(0x111111), p.ride * 0.55, 0, z);
    group.add(lip);
    return;
  }
  const h = tall ? 0.48 : 0.36;
  const grille = tagPart(roundBox(p.width * 0.58, h, 0.08, plastic(0x080808), h / 2 + 0.08, 0.02), 'grille', {
    detachable: true,
  });
  grille.position.z = z;
  group.add(grille);
  for (let i = -2; i <= 2; i++) {
    const bar = box(0.04, h * 0.85, 0.02, chrome(), p.ride * 0.55 + h * 0.08, i * p.width * 0.1, z + 0.02);
    group.add(bar);
  }
}

function addMirrors(group, p, z) {
  for (const [x, id] of [[-p.width * 0.52, 'mirror_l'], [p.width * 0.52, 'mirror_r']]) {
    const m = tagPart(mesh(new THREE.BoxGeometry(0.12, 0.08, 0.16), paint(p.color, 0.55, 0.28)), id, { detachable: true });
    m.position.set(x, p.ride + p.cabinH * 0.55, z);
    group.add(m);
  }
}

function addDoorsWindows(group, p, cabinZ) {
  const col = paint(p.color);
  const doorL = tagPart(roundBox(0.08, p.cabinH * 0.92, p.cabinLen * 0.55, col, p.cabinH * 0.46, 0.03), 'door_l', { detachable: true });
  doorL.position.set(-p.width * 0.5, 0, cabinZ);
  const doorR = doorL.clone();
  doorR.position.x = p.width * 0.5;
  group.add(doorL, doorR);
  const winL = tagPart(roundBox(0.04, p.cabinH * 0.62, p.cabinLen * 0.48, driverGlass(), p.cabinH * 0.38, 0.015), 'window_l');
  winL.position.set(-p.width * 0.47, p.ride + p.cabinH * 0.55, cabinZ);
  const winR = tagPart(roundBox(0.04, p.cabinH * 0.62, p.cabinLen * 0.48, driverGlass(), p.cabinH * 0.38, 0.015), 'window_r');
  group.add(winL, winR);
}

function addCabin(group, p, zOff, tint = null) {
  const roofCol = tint ?? p.color;
  const body = roundBox(p.width * 0.88, p.cabinH, p.cabinLen, paint(roofCol, 0.55, 0.2), p.cabinH / 2 + p.ride, 0.07);
  body.position.z = zOff;
  const windshield = tagPart(
    roundBox(p.width * 0.82, p.cabinH * 0.68, p.cabinLen * 0.38, driverGlass(), p.cabinH * 0.42 + p.ride, 0.04),
    'windshield',
    { detachable: true },
  );
  windshield.position.set(0, 0, zOff + p.cabinLen * 0.16);
  windshield.rotation.x = -0.28;
  const rearGlass = roundBox(p.width * 0.78, p.cabinH * 0.55, p.cabinLen * 0.22, driverGlass(), p.cabinH * 0.38 + p.ride, 0.03);
  rearGlass.position.set(0, 0, zOff - p.cabinLen * 0.38);
  rearGlass.rotation.x = 0.32;
  group.add(body, windshield, rearGlass);
}

function addArchesAll(group, p) {
  const wx = p.wheelX ?? 0.86;
  const wz = p.wheelZ ?? 1.32;
  const r = p.wheelR ?? 0.36;
  for (const [x, z] of [[-wx, wz], [wx, wz], [-wx, -wz], [wx, -wz]]) {
    addWheelArch(group, x, z, r, p.color);
  }
}

function frontZ(p) {
  return p.length * 0.5 - 0.08;
}

function rearZ(p) {
  return -p.length * 0.5 + 0.08;
}

function buildCybertruck(p) {
  const g = new THREE.Group();
  const steel = stainless(p.color);
  const dark = stainless(0x9aa0a8);
  g.add(box(2.28, 0.42, 5.05, dark, 0.48));
  g.add(box(2.18, 0.55, 4.85, steel, 0.78, 0, 0.05));
  g.add(tagPart(box(2.12, 0.28, 1.55, steel, 0.98, 0, 1.55, -0.08), 'hood', { dentPanel: true }));
  g.add(tagPart(box(2.22, 0.72, 0.22, steel, 0.72, 0, 2.42), 'front_panel', { dentPanel: true }));
  g.add(tagPart(box(2.05, 0.1, 0.08, lensMat(1.4), 0.62, 0, 2.52), 'headlight'));
  g.add(tagPart(box(2.24, 0.18, 0.2, matteBlack(), 0.22, 0, 2.58), 'bumper_front', { detachable: true, dentPanel: true }));
  g.add(box(2.02, 0.52, 2.05, steel, 1.42, 0, -0.15, -0.32));
  g.add(box(2.02, 0.48, 1.85, steel, 1.55, 0, -1.55, 0.28));
  g.add(tagPart(box(0.12, 0.95, 3.35, dark, 1.05, -1.1, -0.35, 0, 0.12), 'door_l', { detachable: true }));
  g.add(tagPart(box(0.12, 0.95, 3.35, dark, 1.05, 1.1, -0.35, 0, -0.12), 'door_r', { detachable: true }));
  g.add(tagPart(box(1.75, 0.32, 1.15, driverGlass(), 1.12, 0, 0.55, -0.42), 'windshield', { detachable: true }));
  g.add(box(2.12, 0.18, 2.15, dark, 0.52, 0, -1.75));
  g.add(box(0.14, 0.42, 2.15, steel, 0.78, -1.08, -1.75));
  g.add(box(0.14, 0.42, 2.15, steel, 0.78, 1.08, -1.75));
  for (const x of [-1.02, 1.02]) {
    const cover = mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.18, 6), matteBlack());
    cover.rotation.z = Math.PI / 2;
    cover.position.set(x, 0.38, 1.48);
    g.add(cover);
    const cover2 = cover.clone();
    cover2.position.z = -1.48;
    g.add(cover2);
  }
  const wheels = [];
  for (const [x, z, id] of [[-1.02, 1.48, 'wheel_fl'], [1.02, 1.48, 'wheel_fr'], [-1.02, -1.48, 'wheel_rl'], [1.02, -1.48, 'wheel_rr']]) {
    const w = wheel(0.4, false);
    w.position.set(x, 0.38, z);
    w.userData.carPart = id;
    w.userData.detachable = true;
    g.add(w);
    wheels.push(w);
  }
  g.userData.wheels = wheels;
  return finalizeCar(g, { x: 0.28, y: 0.88, z: 0.12 });
}

function buildRoundCar(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.65, 0.22);
  const h = p.roundH ?? 0.95;
  const body = mesh(new THREE.SphereGeometry(p.width * 0.52, 20, 16), col);
  body.scale.set(1, h / p.width, p.length / p.width * 0.55);
  body.position.set(0, p.ride + h * 0.35, 0);
  g.add(body);
  const roof = mesh(new THREE.SphereGeometry(p.width * 0.38, 16, 12), col);
  roof.scale.set(1, 0.55, 1.1);
  roof.position.set(0, p.ride + h * 0.72, -0.05);
  g.add(roof);
  if (p.softTop) {
    const top = mesh(new THREE.SphereGeometry(p.width * 0.36, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), paint(0x2a4a2a, 0.2, 0.7));
    top.position.set(0, p.ride + h * 0.55, -0.08);
    g.add(top);
  }
  const hood = tagPart(roundBox(p.width * 0.75, 0.12, p.length * 0.28, col, 0.08, 0.05), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.08, p.length * 0.28);
  g.add(hood);
  const fz = frontZ(p);
  const rz = rearZ(p);
  for (const x of [-p.width * 0.32, p.width * 0.32]) addHeadlight(g, x, p.ride + 0.08, fz, true);
  addBumpers(g, p, fz + 0.06, rz - 0.06);
  addWheels(g, p);
  for (const [x, z] of [[-p.wheelX, p.wheelZ], [p.wheelX, p.wheelZ], [-p.wheelX, -p.wheelZ], [p.wheelX, -p.wheelZ]]) {
    const fender = mesh(new THREE.SphereGeometry(p.wheelR * 0.95, 14, 10), col);
    fender.scale.set(1, 0.5, 1.05);
    fender.position.set(x, p.wheelR * 0.75, z);
    g.add(fender);
  }
  return finalizeCar(g, { x: 0.28, y: p.ride + 0.35, z: 0 });
}

function buildFlatVan(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.6, 0.24);
  g.add(tagPart(roundBox(p.width, p.ride * 1.35, p.length * 0.92, col, p.ride * 0.85, 0.08), 'body', { dentPanel: true }));
  const fz = frontZ(p);
  if (p.splitWindshield) {
    const wl = tagPart(roundBox(p.width * 0.38, p.cabinH * 0.55, 0.08, driverGlass(), p.cabinH * 0.35, 0.03), 'windshield');
    wl.position.set(-p.width * 0.2, p.ride + p.cabinH * 0.45, fz - 0.15);
    wl.rotation.y = 0.12;
    const wr = wl.clone();
    wr.position.x = p.width * 0.2;
    wr.rotation.y = -0.12;
    g.add(wl, wr);
  }
  const sideWin = roundBox(p.width * 0.88, p.cabinH * 0.7, p.cabinLen * 0.85, driverGlass(), p.cabinH * 0.42, 0.05);
  sideWin.position.set(0, p.ride + p.cabinH * 0.5, -0.1);
  g.add(sideWin);
  addDoorsWindows(g, p, -0.1);
  addLights(g, p, fz, rearZ(p));
  addBumpers(g, p, fz + 0.06, rearZ(p) - 0.06);
  addMirrors(g, p, 0.2);
  addWheels(g, p);
  return finalizeCar(g, { x: 0.34, y: p.ride + 0.45, z: -0.1 });
}

function build911(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.82, 0.12);
  g.add(roundBox(p.width, p.ride * 0.75, p.length * 0.88, col, p.ride * 0.55, 0.06));
  const hood = tagPart(roundBox(p.width * 0.88, 0.12, p.hoodLen, col, 0.08, 0.04), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.02, p.length * 0.28);
  g.add(hood);
  const cabin = roundBox(p.width * 0.82, p.cabinH, p.cabinLen * 0.85, col, p.cabinH / 2 + p.ride, 0.06);
  cabin.position.z = -0.05;
  g.add(cabin);
  const hump = roundBox(p.width * 0.92, 0.28, 0.85, col, 0.18, 0.05);
  hump.position.set(0, p.ride + 0.42, -p.length * 0.32);
  g.add(hump);
  addCabin(g, p, -0.05);
  const fz = frontZ(p);
  const rz = rearZ(p);
  for (const x of [-p.width * 0.36, p.width * 0.36]) addHeadlight(g, x, p.ride + 0.05, fz, true);
  for (const x of [-p.width * 0.38, p.width * 0.38]) addTaillight(g, x, p.ride + 0.1, rz);
  addBumpers(g, p, fz + 0.05, rz - 0.05);
  addMirrors(g, p, 0.15);
  addWheels(g, p);
  addArchesAll(g, p);
  return finalizeCar(g, { x: 0.32, y: p.ride + 0.35, z: 0.05 });
}

function buildFastback(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.8, 0.14);
  g.add(roundBox(p.width, p.ride * 0.72, p.length * 0.82, col, p.ride * 0.48, 0.07));
  const hood = tagPart(roundBox(p.width * 0.92, 0.14, p.hoodLen, col, 0.09, 0.04), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.02, p.length * 0.22);
  g.add(hood);
  if (p.scoop) {
    const scoop = box(0.35, 0.06, 0.45, matteBlack(), p.ride + 0.12, 0, p.length * 0.18);
    g.add(scoop);
  }
  const cabin = roundBox(p.width * 0.86, p.cabinH, p.cabinLen, paint(p.color, 0.75, 0.18), p.cabinH / 2 + p.ride, 0.06);
  cabin.position.z = -0.12;
  g.add(cabin);
  const fast = roundBox(p.width * 0.82, p.cabinH * 0.65, 1.15, col, p.cabinH * 0.38 + p.ride, 0.05);
  fast.position.set(0, 0, -p.length * 0.32);
  fast.rotation.x = -0.38;
  g.add(fast);
  addCabin(g, p, -0.1, 0x151520);
  addDoorsWindows(g, p, -0.1);
  const fz = frontZ(p);
  const rz = rearZ(p);
  addGrille(g, p, fz - 0.05);
  addLights(g, p, fz, rz);
  addBumpers(g, p, fz + 0.06, rz - 0.06);
  addMirrors(g, p, 0.12);
  addWheels(g, p);
  addArchesAll(g, p);
  const spoiler = tagPart(mesh(new THREE.BoxGeometry(p.width * 0.78, 0.06, 0.28), col), 'spoiler', { detachable: true });
  spoiler.position.set(0, p.ride + p.cabinH * 0.55, rz + 0.12);
  g.add(spoiler);
  return finalizeCar(g, { x: 0.32, y: p.ride + 0.35, z: 0.02 });
}

function buildWedge(p) {
  const g = new THREE.Group();
  const col = p.stainless ? stainless(p.color) : paint(p.color, 0.85, 0.12);
  const body = roundBox(p.width, p.ride * 0.85, p.length * 0.88, col, p.ride * 0.52, 0.05);
  g.add(body);
  const nose = roundBox(p.width * 0.92, p.ride * 0.55, 1.25, col, p.ride * 0.38, 0.04);
  nose.position.set(0, 0, p.length * 0.28);
  nose.rotation.x = -0.08;
  g.add(tagPart(nose, 'hood', { dentPanel: true }));
  const roof = roundBox(p.width * 0.78, p.cabinH * 0.55, p.cabinLen * 0.75, col, p.cabinH * 0.35 + p.ride, 0.04);
  roof.position.z = -0.05;
  roof.rotation.x = -0.15;
  g.add(roof);
  if (p.gullwing) {
    for (const x of [-p.width * 0.42, p.width * 0.42]) {
      const wing = tagPart(roundBox(0.06, p.cabinH * 0.5, p.cabinLen * 0.4, driverGlass(), p.cabinH * 0.3, 0.02), 'window_l');
      wing.position.set(x, p.ride + p.cabinH * 0.45, 0);
      wing.rotation.z = x < 0 ? 0.35 : -0.35;
      g.add(wing);
    }
  }
  const fz = frontZ(p);
  addLights(g, p, fz, rearZ(p));
  addBumpers(g, p, fz + 0.05, rearZ(p) - 0.05);
  addWheels(g, p);
  addArchesAll(g, p);
  return finalizeCar(g, { x: 0.3, y: p.ride + 0.38, z: 0.05 });
}

function buildSupercar(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.88, 0.08);
  g.add(roundBox(p.width, p.ride * 0.65, p.length * 0.85, col, p.ride * 0.42, 0.05));
  const nose = tagPart(roundBox(p.width * 0.9, 0.1, p.hoodLen * 0.95, col, 0.07, 0.03), 'hood', { dentPanel: true });
  nose.position.set(0, p.ride + 0.02, p.length * 0.26);
  g.add(nose);
  const cabin = roundBox(p.width * 0.78, p.cabinH, p.cabinLen * 0.9, paint(0x111118, 0.5, 0.3), p.cabinH / 2 + p.ride, 0.04);
  cabin.position.z = -0.02;
  g.add(cabin);
  addCabin(g, p, -0.02, 0x101018);
  if (p.wide) {
    const hipL = roundBox(0.22, 0.18, 1.05, col, 0.12, 0.03);
    hipL.position.set(-p.width * 0.48, p.ride + 0.15, -p.length * 0.22);
    const hipR = hipL.clone();
    hipR.position.x = p.width * 0.48;
    g.add(hipL, hipR);
  }
  if (p.stripe) {
    const stripe = box(0.12, 0.02, p.length * 0.55, paint(0xffffff, 0.6, 0.2), p.ride + 0.14, 0, 0);
    g.add(stripe);
  }
  const fz = frontZ(p);
  const rz = rearZ(p);
  if (p.horseshoe) {
    const hg = roundBox(p.width * 0.45, 0.22, 0.1, plastic(0x0a0a0a), 0.14, 0.02);
    hg.position.set(0, p.ride + 0.05, fz - 0.02);
    g.add(hg);
  } else addGrille(g, p, fz - 0.04);
  addLights(g, p, fz, rz);
  addBumpers(g, p, fz + 0.04, rz - 0.04);
  addWheels(g, { ...p, wheelR: p.wheelR ?? 0.35 });
  addArchesAll(g, p);
  const wing = tagPart(mesh(new THREE.BoxGeometry(p.width * 0.72, 0.05, 0.32), col), 'spoiler', { detachable: true });
  wing.position.set(0, p.ride + 0.42, rz + 0.1);
  g.add(wing);
  return finalizeCar(g, { x: 0.3, y: p.ride + 0.28, z: 0.02 });
}

function buildBoxSuv(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.55, 0.28);
  g.add(tagPart(roundBox(p.width, p.ride * 1.15, p.length * 0.9, col, p.ride * 0.72, 0.06), 'body', { dentPanel: true }));
  addCabin(g, p, -0.15);
  addDoorsWindows(g, p, -0.15);
  const fz = frontZ(p);
  const rz = rearZ(p);
  addGrille(g, p, fz - 0.04, p.tallGrille);
  addLights(g, { ...p, roundLights: true }, fz, rz);
  addBumpers(g, p, fz + 0.06, rz - 0.06);
  addMirrors(g, p, 0);
  if (p.spare) {
    const spare = wheel(0.32);
    spare.position.set(0, p.ride + 0.45, rz - 0.15);
    g.add(spare);
  }
  if (p.roofRails) {
    for (const x of [-p.width * 0.48, p.width * 0.48]) {
      const rail = mesh(new THREE.CylinderGeometry(0.025, 0.025, p.cabinLen * 0.9, 8), chrome());
      rail.rotation.x = Math.PI / 2;
      rail.position.set(x, p.ride + p.cabinH + 0.08, -0.1);
      g.add(rail);
    }
  }
  addWheels(g, p);
  return finalizeCar(g, { x: 0.36, y: p.ride + 0.42, z: 0 });
}

function buildEvSedan(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.82, 0.1);
  const body = roundBox(p.width, p.ride * 0.95, p.length * 0.92, col, p.ride * 0.55, 0.09);
  g.add(tagPart(body, 'body', { dentPanel: true }));
  const hood = tagPart(roundBox(p.width * 0.88, 0.1, p.hoodLen * 0.9, col, 0.07, 0.05), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.02, p.length * 0.28);
  g.add(hood);
  addCabin(g, p, -0.12);
  addDoorsWindows(g, p, -0.12);
  const fz = frontZ(p);
  const rz = rearZ(p);
  const lip = box(p.width * 0.75, 0.05, 0.08, plastic(0x111111), p.ride * 0.45, 0, fz - 0.02);
  g.add(lip);
  addLights(g, p, fz, rz);
  addBumpers(g, p, fz + 0.05, rz - 0.05);
  addMirrors(g, p, 0.05);
  addWheels(g, p);
  addArchesAll(g, p);
  return finalizeCar(g, { x: 0.34, y: p.ride + 0.38, z: 0.02 });
}

function buildEvSuv(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.78, 0.14);
  g.add(tagPart(roundBox(p.width, p.ride * 1.05, p.length * 0.9, col, p.ride * 0.65, 0.1), 'body', { dentPanel: true }));
  addCabin(g, p, -0.18);
  addDoorsWindows(g, p, -0.18);
  const fz = frontZ(p);
  addLights(g, p, fz, rearZ(p));
  addBumpers(g, p, fz + 0.06, rearZ(p) - 0.06);
  addMirrors(g, p, -0.02);
  if (p.falcon) {
    for (const x of [-p.width * 0.42, p.width * 0.42]) {
      const falcon = tagPart(roundBox(0.08, 0.06, 0.45, col, 0.04, 0.02), 'door_l');
      falcon.position.set(x, p.ride + p.cabinH + 0.02, 0.1);
      falcon.rotation.z = x < 0 ? 0.4 : -0.4;
      g.add(falcon);
    }
  }
  addWheels(g, p);
  addArchesAll(g, p);
  return finalizeCar(g, { x: 0.36, y: p.ride + 0.48, z: -0.02 });
}

function buildVintageTall(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.4, 0.42);
  g.add(tagPart(roundBox(p.width, p.ride * 1.05, p.length * 0.88, col, p.ride * 0.65, 0.1), 'body', { dentPanel: true }));
  if (p.longHood) {
    const hood = tagPart(roundBox(p.width * 0.85, 0.18, p.hoodLen, col, 0.12, 0.06), 'hood', { dentPanel: true });
    hood.position.set(0, p.ride + 0.05, p.length * 0.22);
    g.add(hood);
  }
  addCabin(g, p, 0.12, 0x3a2a1a);
  addDoorsWindows(g, p, 0.12);
  for (const x of [-p.width * 0.5, p.width * 0.5]) {
    const fender = mesh(new THREE.SphereGeometry(0.36, 14, 10), col);
    fender.scale.set(1, 0.52, 1.08);
    fender.position.set(x, p.ride + 0.15, p.length * 0.15);
    g.add(fender);
  }
  const fz = frontZ(p);
  addGrille(g, p, fz - 0.04);
  addLights(g, { ...p, roundLights: true }, fz, rearZ(p));
  addBumpers(g, p, fz + 0.06, rearZ(p) - 0.06);
  addWheels(g, p);
  return finalizeCar(g, { x: 0.3, y: p.ride + 0.4, z: 0.08 });
}

function buildLuxurySedan(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.85, 0.1);
  g.add(tagPart(roundBox(p.width, p.ride * 0.95, p.length * 0.94, col, p.ride * 0.58, 0.1), 'body', { dentPanel: true }));
  const hood = tagPart(roundBox(p.width * 0.9, 0.14, p.hoodLen * 1.1, col, 0.1, 0.05), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.03, p.length * 0.26);
  g.add(hood);
  addCabin(g, p, -0.1);
  addDoorsWindows(g, p, -0.1);
  const fz = frontZ(p);
  addGrille(g, p, fz - 0.04, true);
  addLights(g, p, fz, rearZ(p));
  addBumpers(g, p, fz + 0.05, rearZ(p) - 0.05);
  addMirrors(g, p, 0.05);
  const trim = box(p.width * 0.96, 0.04, p.length * 0.88, chrome(), p.ride * 0.35, 0, 0);
  g.add(trim);
  addWheels(g, p);
  addArchesAll(g, p);
  return finalizeCar(g, { x: 0.34, y: p.ride + 0.42, z: 0.02 });
}

function buildTruck(p) {
  const g = new THREE.Group();
  const col = paint(p.color, 0.62, 0.26);
  const cabLen = p.cabinLen ?? 1.55;
  g.add(tagPart(roundBox(p.width, p.ride * 1.05, cabLen, col, p.ride * 0.78, 0.08), 'cab', { dentPanel: true }));
  addCabin(g, p, 0.45);
  addDoorsWindows(g, p, 0.45);
  const bedLen = p.bedLen ?? 2.45;
  const bedZ = -cabLen * 0.5 - bedLen * 0.5 + 0.2;
  g.add(roundBox(p.width, 0.2, bedLen, paint(p.color, 0.5, 0.35), 0.52, 0.04));
  g.children[g.children.length - 1].position.z = bedZ;
  for (const x of [-p.width * 0.48, p.width * 0.48]) {
    const wall = roundBox(0.1, 0.52, bedLen, col, 0.78, 0.02);
    wall.position.set(x, 0, bedZ);
    g.add(wall);
  }
  const fz = frontZ(p);
  const rz = rearZ(p);
  addGrille(g, p, fz - 0.04, p.tallGrille);
  addLights(g, p, fz, rz);
  addBumpers(g, p, fz + 0.06, rz - 0.06);
  addMirrors(g, p, 0.45);
  addWheels(g, p);
  return finalizeCar(g, { x: 0.38, y: p.ride + 0.45, z: 0.4 });
}

function buildGeneric(p) {
  const g = new THREE.Group();
  const col = paint(p.color);
  g.add(tagPart(roundBox(p.width, p.ride * 0.95, p.length * 0.9, col, p.ride * 0.55, 0.08), 'body', { dentPanel: true }));
  const hood = tagPart(roundBox(p.width * 0.86, 0.12, p.hoodLen, col, 0.08, 0.05), 'hood', { dentPanel: true });
  hood.position.set(0, p.ride + 0.02, p.length * 0.28);
  g.add(hood);
  addCabin(g, p, -0.12);
  addDoorsWindows(g, p, -0.12);
  const fz = frontZ(p);
  const rz = rearZ(p);
  addGrille(g, p, fz - 0.04);
  addLights(g, p, fz, rz);
  addBumpers(g, p, fz + 0.06, rz - 0.06);
  addMirrors(g, p, 0.05);
  if (p.roofRails) {
    for (const x of [-p.width * 0.48, p.width * 0.48]) {
      const rail = mesh(new THREE.BoxGeometry(0.05, 0.05, p.cabinLen * 0.85), chrome());
      rail.position.set(x, p.ride + p.cabinH + 0.05, -0.1);
      g.add(rail);
    }
  }
  if (p.spoiler) {
    const sp = tagPart(mesh(new THREE.BoxGeometry(p.width * 0.72, 0.06, 0.28), col), 'spoiler', { detachable: true });
    sp.position.set(0, p.ride + p.cabinH * 0.5, rz + 0.1);
    g.add(sp);
  }
  addWheels(g, p);
  addArchesAll(g, p);
  const seatY = p.ride + (p.low ? 0.28 : 0.38);
  return finalizeCar(g, { x: 0.32, y: seatY, z: 0.02 });
}

const SHAPE_BUILDERS = {
  cybertruck: buildCybertruck,
  round: buildRoundCar,
  'flat-van': buildFlatVan,
  911: build911,
  fastback: buildFastback,
  wedge: buildWedge,
  supercar: buildSupercar,
  'box-suv': buildBoxSuv,
  'ev-sedan': buildEvSedan,
  'ev-suv': buildEvSuv,
  'ev-truck': buildTruck,
  'vintage-tall': buildVintageTall,
  'luxury-sedan': buildLuxurySedan,
  'luxury-suv': buildBoxSuv,
  gullwing: buildWedge,
  hybrid: buildEvSedan,
  truck: buildTruck,
  sedan: buildGeneric,
  sports: buildGeneric,
  suv: buildGeneric,
  compact: buildGeneric,
  vintage: buildVintageTall,
  van: buildFlatVan,
};

export function buildCarMesh(spec) {
  const profile = getCarProfile(spec);
  const fn = SHAPE_BUILDERS[profile.bodyShape] ?? buildGeneric;
  const mesh = fn(profile);
  mesh.userData.carId = spec.id;
  mesh.userData.carName = spec.name;
  return mesh;
}

export const DRIVER_SEAT_OFFSET = { x: 0.35, y: 0.9, z: 0.3 };
