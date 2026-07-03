import * as THREE from 'three';

/** Flat Roblox-style plastic paint — no glossy PBR. */
export function rbxPaint(color) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export function rbxPlastic(color = 0x1a1a1a) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export function rbxChrome() {
  return new THREE.MeshLambertMaterial({ color: 0xdddddd, flatShading: true });
}

export function rbxRubber() {
  return new THREE.MeshLambertMaterial({ color: 0x141414, flatShading: true });
}

/** Blue-tinted cabin glass — visible from outside like the reference pictures. */
export function rbxGlass() {
  const mat = new THREE.MeshLambertMaterial({
    color: 0x8ec8e8,
    flatShading: true,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  return mat;
}

export function rbxLens() {
  return new THREE.MeshLambertMaterial({
    color: 0xffffcc,
    emissive: 0xffee99,
    emissiveIntensity: 0.55,
    flatShading: true,
  });
}

export function rbxTailLens() {
  return new THREE.MeshLambertMaterial({
    color: 0xff3333,
    emissive: 0xff1111,
    emissiveIntensity: 0.65,
    flatShading: true,
  });
}

export function rbxSeam() {
  return new THREE.MeshLambertMaterial({ color: 0x111111, flatShading: true });
}

export function rbxStainless(color = 0xb8bdc4) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export function rbxPart(w, h, d, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function rbxCylinder(radius, height, mat, segments = 8) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, segments), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

const edgeMat = new THREE.LineBasicMaterial({ color: 0x111111 });

export function markNoEdges(mesh) {
  mesh.userData.skipBlockEdges = true;
  return mesh;
}

/** Black outline on body panels — not on glass. */
export function addBlockEdges(mesh, thresholdAngle = 12) {
  if (!mesh?.geometry || mesh.userData.hasBlockEdges || mesh.userData.skipBlockEdges) return mesh;
  const edges = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
  const lines = new THREE.LineSegments(edges, edgeMat);
  lines.renderOrder = 1;
  mesh.add(lines);
  mesh.userData.hasBlockEdges = true;
  return mesh;
}

export function applyBlockOutlines(root) {
  root.traverse((child) => {
    if (child.isMesh && child.geometry && !child.userData.skipBlockEdges) {
      addBlockEdges(child);
    }
  });
}

export function rbxDebrisMaterial(color) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

/** Glass panel with thin black frame — reads clearly like the reference cars. */
export function glassPanel(w, h, d, partId, opts = {}) {
  const group = new THREE.Group();
  if (partId) tagGlassPart(group, partId, opts);

  const glass = rbxPart(w, h, d, rbxGlass());
  markNoEdges(glass);
  glass.renderOrder = 2;
  group.add(glass);

  const frameT = 0.05;
  const frameMat = rbxPlastic(0x141414);
  const top = rbxPart(w + frameT * 2, frameT, d + frameT, frameMat);
  top.position.y = h / 2 + frameT / 2;
  const bottom = top.clone();
  bottom.position.y = -h / 2 - frameT / 2;
  const left = rbxPart(frameT, h, d, frameMat);
  left.position.x = -w / 2 - frameT / 2;
  const right = left.clone();
  right.position.x = w / 2 + frameT / 2;
  group.add(top, bottom, left, right);

  return group;
}

function tagGlassPart(node, partId, opts = {}) {
  node.userData.carPart = partId;
  if (opts.detachable !== false) node.userData.detachable = true;
  return node;
}
