import * as THREE from 'three';

function mat(color, metal = 0.3, rough = 0.45) {
  return new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
}

function wheel(radius = 0.35) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.22, 14), mat(0x111111, 0.1, 0.9));
  tire.rotation.z = Math.PI / 2;
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 0.24, 10), mat(0xaaaaaa, 0.8, 0.25));
  rim.rotation.z = Math.PI / 2;
  g.add(tire, rim);
  return g;
}

function addWheels(group, wx, wz, r = 0.35) {
  const positions = [
    [-wx, r, wz],
    [wx, r, wz],
    [-wx, r, -wz],
    [wx, r, -wz],
  ];
  for (const [x, y, z] of positions) {
    const w = wheel(r);
    w.position.set(x, y, z);
    group.add(w);
  }
}

function bodyBox(w, h, d, color, y = h / 2) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  m.position.y = y;
  m.castShadow = true;
  return m;
}

function cabin(w, h, d, color, zOff = -0.1) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, 0.2, 0.35));
  m.position.set(0, h / 2 + 0.55, zOff);
  m.castShadow = true;
  return m;
}

function buildCybertruck(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 4.8), mat(color, 0.85, 0.2));
  body.position.y = 0.85;
  body.castShadow = true;
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 2.2), mat(color, 0.85, 0.2));
  roof.position.set(0, 1.35, -0.4);
  roof.rotation.x = -0.18;
  roof.castShadow = true;
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.4, 1.8), mat(0x223344, 0.6, 0.1));
  glass.position.set(0, 1.25, -0.35);
  g.add(body, roof, glass);
  addWheels(g, 0.95, 1.55, 0.38);
  return g;
}

function buildSedan(color) {
  const g = new THREE.Group();
  g.add(bodyBox(1.9, 0.55, 4.2, color));
  g.add(cabin(1.6, 0.75, 2.0, 0x334455));
  addWheels(g, 0.85, 1.35);
  return g;
}

function buildSports(color) {
  const g = new THREE.Group();
  g.add(bodyBox(1.85, 0.42, 4.0, color, 0.45));
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.2, 1.4), mat(color, 0.5, 0.3));
  hood.position.set(0, 0.55, 1.1);
  g.add(hood, cabin(1.45, 0.55, 1.5, 0x222233, 0.1));
  addWheels(g, 0.9, 1.25, 0.34);
  return g;
}

function buildSuv(color) {
  const g = new THREE.Group();
  g.add(bodyBox(2.0, 0.85, 4.4, color));
  g.add(cabin(1.75, 0.9, 2.4, 0x334455, -0.2));
  addWheels(g, 0.9, 1.45, 0.38);
  return g;
}

function buildTruck(color) {
  const g = new THREE.Group();
  g.add(bodyBox(2.0, 0.7, 1.8, color, 0.75));
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 2.4), mat(color, 0.4, 0.5));
  bed.position.set(0, 0.65, -1.9);
  g.add(bed, cabin(1.7, 0.8, 1.2, 0x334455, 0.6));
  addWheels(g, 0.95, 1.35, 0.4);
  return g;
}

function buildCompact(color) {
  const g = new THREE.Group();
  g.add(bodyBox(1.6, 0.5, 3.2, color));
  g.add(cabin(1.35, 0.65, 1.6, 0x334455));
  addWheels(g, 0.7, 1.05, 0.3);
  return g;
}

function buildVintage(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.65, 3.8), mat(color, 0.2, 0.6));
  body.position.y = 0.7;
  const fenderL = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), mat(color, 0.2, 0.6));
  fenderL.position.set(-0.95, 0.55, 1.0);
  const fenderR = fenderL.clone();
  fenderR.position.x = 0.95;
  g.add(body, fenderL, fenderR, cabin(1.3, 0.6, 1.4, 0x443322, 0.2));
  addWheels(g, 0.75, 1.2, 0.36);
  return g;
}

function buildVan(color) {
  const g = new THREE.Group();
  g.add(bodyBox(1.9, 1.4, 4.0, color));
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 2.8), mat(0x334455, 0.3, 0.2));
  win.position.set(0, 1.35, -0.1);
  g.add(win);
  addWheels(g, 0.85, 1.35, 0.36);
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
