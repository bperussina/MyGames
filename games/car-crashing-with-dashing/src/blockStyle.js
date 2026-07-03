import * as THREE from 'three';

/** Flat Roblox-style plastic paint — no glossy PBR. */
export function rbxPaint(color) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export function rbxPlastic(color = 0x1a1a1a) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export function rbxChrome() {
  return new THREE.MeshLambertMaterial({ color: 0xcccccc, flatShading: true });
}

export function rbxRubber() {
  return new THREE.MeshLambertMaterial({ color: 0x141414, flatShading: true });
}

export function rbxGlass() {
  return new THREE.MeshLambertMaterial({
    color: 0xa8d4f8,
    flatShading: true,
    transparent: true,
    opacity: 0.45,
  });
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

/** Black outline on every sharp edge — classic block-game look. */
export function addBlockEdges(mesh, thresholdAngle = 12) {
  if (!mesh?.geometry || mesh.userData.hasBlockEdges) return mesh;
  const geo = mesh.geometry;
  const edges = new THREE.EdgesGeometry(geo, thresholdAngle);
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
