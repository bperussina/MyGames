import * as THREE from 'three';

const CHUNK_SIZE = 96;
const LOAD_RADIUS = 4;

function chunkSeed(cx, cz) {
  return ((cx * 73856093) ^ (cz * 19349663)) >>> 0;
}

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function tree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.28, 2.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 }),
  );
  trunk.position.y = 1.1;
  trunk.castShadow = true;
  const foliage = new THREE.Mesh(
    new THREE.ConeGeometry(1.4 + Math.random() * 0.8, 3.5 + Math.random(), 8),
    new THREE.MeshStandardMaterial({ color: 0x2d6b32, roughness: 0.88 }),
  );
  foliage.position.y = 3.2;
  foliage.castShadow = true;
  g.add(trunk, foliage);
  return g;
}

function bush() {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(0.55 + Math.random() * 0.35, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x3a7a3e, roughness: 0.92 }),
  );
  m.scale.y = 0.65;
  m.position.y = 0.35;
  m.castShadow = true;
  return m;
}

function hill(cx, cz, rand) {
  const g = new THREE.Group();
  const wx = cx * CHUNK_SIZE + CHUNK_SIZE * 0.5;
  const wz = cz * CHUNK_SIZE + CHUNK_SIZE * 0.5;
  const hx = (rand() - 0.5) * CHUNK_SIZE * 0.6;
  const hz = (rand() - 0.5) * CHUNK_SIZE * 0.6;
  const r = 8 + rand() * 14;
  const h = new THREE.Mesh(
    new THREE.SphereGeometry(r, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0x3f8f44, roughness: 0.95 }),
  );
  h.scale.y = 0.22 + rand() * 0.15;
  h.position.set(wx + hx, r * h.scale.y * 0.35, wz + hz);
  h.receiveShadow = true;
  h.castShadow = true;
  g.add(h);
  return g;
}

function makeChunk(cx, cz) {
  const g = new THREE.Group();
  g.name = `chunk_${cx}_${cz}`;
  const rand = rng(chunkSeed(cx, cz));
  const wx = cx * CHUNK_SIZE;
  const wz = cz * CHUNK_SIZE;

  const grassColors = [0x3d9b42, 0x45a84a, 0x368f3a, 0x4aad50];
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(CHUNK_SIZE, CHUNK_SIZE, 12, 12),
    new THREE.MeshStandardMaterial({
      color: grassColors[Math.abs(cx + cz) % grassColors.length],
      roughness: 0.94,
      metalness: 0.02,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  const pos = ground.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i) + wx + CHUNK_SIZE * 0.5;
    const pz = pos.getZ(i) + wz + CHUNK_SIZE * 0.5;
    const wave = Math.sin(px * 0.04) * Math.cos(pz * 0.035) * 0.35;
    const bump = Math.sin(px * 0.12 + pz * 0.08) * 0.15;
    pos.setY(i, wave + bump);
  }
  pos.needsUpdate = true;
  ground.geometry.computeVertexNormals();
  ground.position.set(wx + CHUNK_SIZE * 0.5, 0, wz + CHUNK_SIZE * 0.5);
  ground.receiveShadow = true;
  g.add(ground);

  const treeCount = 4 + Math.floor(rand() * 8);
  for (let i = 0; i < treeCount; i++) {
    const t = tree();
    t.position.set(wx + rand() * CHUNK_SIZE, 0, wz + rand() * CHUNK_SIZE);
    t.rotation.y = rand() * Math.PI * 2;
    g.add(t);
  }

  const bushCount = 6 + Math.floor(rand() * 10);
  for (let i = 0; i < bushCount; i++) {
    const b = bush();
    b.position.set(wx + rand() * CHUNK_SIZE, 0, wz + rand() * CHUNK_SIZE);
    g.add(b);
  }

  if (rand() > 0.45) g.add(hill(cx, cz, rand));

  return g;
}

export function buildCountryside(scene) {
  const group = new THREE.Group();
  group.name = 'countryside';
  scene.add(group);

  const chunks = new Map();

  function chunkKey(cx, cz) {
    return `${cx},${cz}`;
  }

  function unloadChunk(key) {
    const chunk = chunks.get(key);
    if (!chunk) return;
    group.remove(chunk);
    chunk.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose();
        if (child.material && !Array.isArray(child.material)) child.material.dispose();
      }
    });
    chunks.delete(key);
  }

  function update(x, z) {
    const ccx = Math.floor(x / CHUNK_SIZE);
    const ccz = Math.floor(z / CHUNK_SIZE);
    const needed = new Set();

    for (let dx = -LOAD_RADIUS; dx <= LOAD_RADIUS; dx++) {
      for (let dz = -LOAD_RADIUS; dz <= LOAD_RADIUS; dz++) {
        const key = chunkKey(ccx + dx, ccz + dz);
        needed.add(key);
        if (!chunks.has(key)) {
          const chunk = makeChunk(ccx + dx, ccz + dz);
          chunks.set(key, chunk);
          group.add(chunk);
        }
      }
    }

    for (const key of chunks.keys()) {
      if (!needed.has(key)) unloadChunk(key);
    }
  }

  return { group, update };
}
