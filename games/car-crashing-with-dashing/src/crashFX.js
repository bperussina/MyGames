import * as THREE from 'three';
import { rbxPlastic, rbxDebrisMaterial } from './blockStyle.js';

const CHIP_SPEED = 5;
const DENT_SPEED = 28;
const SCOOP_SPEED = 38;
const PART_FLY_SPEED = 30;
const HEADLIGHT_BREAK_SPEED = 18;

export { DENT_SPEED, SCOOP_SPEED };

export function createDefaultPartHealth() {
  return {
    engine: 100,
    body: 100,
    hood: 100,
    windshield: 100,
    wheel_fl: 100,
    wheel_fr: 100,
    wheel_rl: 100,
    wheel_rr: 100,
  };
}

function findPartById(root, partId) {
  let found = null;
  root.traverse((child) => {
    if (child.userData?.carPart === partId && !child.userData.detached) found = child;
  });
  return found;
}

function damagePartHealth(vehicle, partId, amount) {
  if (!vehicle.partHealth) vehicle.partHealth = createDefaultPartHealth();
  const h = vehicle.partHealth;
  const map = {
    headlight: 'body',
    grille: 'body',
    bumper_front: 'body',
    hood: 'hood',
    windshield: 'windshield',
    door_l: 'body',
    door_r: 'body',
    wheel_fl: 'wheel_fl',
    wheel_fr: 'wheel_fr',
    wheel_rl: 'wheel_rl',
    wheel_rr: 'wheel_rr',
  };
  const key = map[partId] ?? 'body';
  if (h[key] != null) h[key] = Math.max(0, h[key] - amount);
  if (partId === 'hood' || partId === 'bumper_front' || partId === 'grille') {
    h.engine = Math.max(0, h.engine - amount * 0.45);
  }
}

export function shouldDent(speed) {
  return Math.abs(speed) >= DENT_SPEED;
}

function dentSeverity(speed) {
  if (!shouldDent(speed)) return 0;
  return Math.min(1, (Math.abs(speed) - DENT_SPEED) / (52 - DENT_SPEED));
}

function panelSize(panel) {
  const p = panel?.geometry?.parameters ?? {};
  return { width: p.width ?? 2, height: p.height ?? 0.6, depth: p.depth ?? 1.2 };
}

function boundsFromOrig(orig) {
  const bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    minZ: Infinity,
    maxZ: -Infinity,
  };
  for (let i = 0; i < orig.length; i += 3) {
    bounds.minX = Math.min(bounds.minX, orig[i]);
    bounds.maxX = Math.max(bounds.maxX, orig[i]);
    bounds.minY = Math.min(bounds.minY, orig[i + 1]);
    bounds.maxY = Math.max(bounds.maxY, orig[i + 1]);
    bounds.minZ = Math.min(bounds.minZ, orig[i + 2]);
    bounds.maxZ = Math.max(bounds.maxZ, orig[i + 2]);
  }
  return bounds;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function ensureDenseGeometry(panel) {
  if (panel.userData.dentDense) return;
  const geo = panel.geometry;
  const p = geo?.parameters;
  if (!p?.width) return;

  const { width, height, depth } = p;
  const segW = Math.max(10, Math.ceil(width * 14));
  const segH = Math.max(10, Math.ceil(height * 14));
  const segD = Math.max(5, Math.ceil(depth * 12));
  const dense = new THREE.BoxGeometry(width, height, depth, segW, segH, segD);
  panel.geometry.dispose();
  panel.geometry = dense;
  panel.userData.dentOriginal = null;
  panel.userData.dentColorOriginal = null;
  panel.userData.dentDense = true;
}

export function findFrontDentPanel(root) {
  const panels = [];
  root.traverse((child) => {
    if (child.isMesh && child.userData.dentPanel === 'front') panels.push(child);
  });
  if (!panels.length) return null;

  root.updateWorldMatrix(true, true);
  const local = new THREE.Vector3();
  let best = panels[0];
  let bestZ = -Infinity;
  for (const panel of panels) {
    panel.getWorldPosition(local);
    root.worldToLocal(local);
    if (local.z > bestZ) {
      bestZ = local.z;
      best = panel;
    }
  }
  return best;
}

function collectDetachableParts(root) {
  const parts = [];
  root.traverse((child) => {
    if (child === root) return;
    if (!child.userData?.detachable || child.userData.detached) return;
    if (child.parent?.userData?.detachable) return;
    parts.push(child);
  });
  return parts;
}

const FRONT_PART_PRIORITY = {
  headlight: 100,
  grille: 85,
  front_panel: 82,
  bumper_front: 78,
  hood: 72,
  windshield: 65,
  mirror_l: 50,
  mirror_r: 50,
  door_l: 40,
  door_r: 40,
  window_l: 38,
  window_r: 38,
  bumper_rear: 20,
  taillight: 18,
  spoiler: 15,
};

function partPriority(part) {
  const id = part.userData.carPart ?? '';
  if (FRONT_PART_PRIORITY[id] != null) return FRONT_PART_PRIORITY[id];
  if (id.startsWith('wheel_')) return 35;
  return 12;
}

function isFrontPart(part, root) {
  const local = new THREE.Vector3();
  part.getWorldPosition(local);
  root.worldToLocal(local);
  const id = part.userData.carPart ?? '';
  if (id === 'headlight' || id === 'grille' || id === 'bumper_front' || id === 'hood' || id === 'front_panel') {
    return true;
  }
  return local.z > 0.15;
}

function shatterGlass(part, severity = 0.5) {
  if (!part || part.userData.shattered) return;
  part.userData.shattered = true;
  const crackMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const cracks = new THREE.Group();
  cracks.name = 'cracks';
  const count = 10 + Math.floor(severity * 16);
  for (let i = 0; i < count; i++) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15 + Math.random() * 0.55, 0.012 + Math.random() * 0.02),
      crackMat,
    );
    line.position.set((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 0.9, 0.03 + Math.random() * 0.02);
    line.rotation.z = Math.random() * Math.PI;
    cracks.add(line);
  }
  part.add(cracks);
  if (part.material && !Array.isArray(part.material)) {
    part.material = part.material.clone();
    part.material.opacity = Math.min(part.material.opacity ?? 0.4, 0.35);
    part.material.transmission = 0.25;
    part.material.needsUpdate = true;
  }
}

function hangDoorOpen(part, side = 1) {
  if (!part || part.userData.hung || part.userData.detached) return;
  part.userData.hung = true;
  part.rotation.y = side * (0.55 + Math.random() * 0.35);
  part.position.x += side * 0.08;
}

function spawnVoxelScoop(scene, vehicle, panel, hitX, hitY, severity, impactSpeed, debris) {
  if (!panel?.geometry) return;
  const bounds = boundsFromOrig(saveOriginalVertices(panel));
  const outerZ = bounds.maxZ;
  const span = 0.28 + severity * 0.42;
  const grid = 5 + Math.floor(severity * 4);
  const baseColor = new THREE.Color(vehicle.spec?.color ?? 0xb8bdc4);
  const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
  const local = new THREE.Vector3();
  const speed = Math.abs(impactSpeed);

  for (let ix = 0; ix < grid; ix++) {
    for (let iy = 0; iy < grid; iy++) {
      const u = (ix / (grid - 1) - 0.5) * 2;
      const v = (iy / (grid - 1) - 0.5) * 2;
      const dist = Math.hypot(u, v);
      if (dist > 1) continue;
      const core = 1 - dist;
      if (core < 0.25 && Math.random() > severity * 0.85) continue;

      local.set(hitX + u * span, hitY + v * span * 0.85, outerZ);
      panel.localToWorld(local);

      const sx = 0.1 + Math.random() * 0.14;
      const sy = 0.08 + Math.random() * 0.12;
      const sz = 0.09 + Math.random() * 0.13;
      const mat = rbxDebrisMaterial(
        baseColor.clone().lerp(new THREE.Color(0x555555), 0.15 + Math.random() * 0.25),
      );
      const voxel = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      voxel.position.copy(local);
      voxel.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(voxel);

      const vel = forward
        .clone()
        .multiplyScalar(2 + speed * 0.05 * core)
        .add(new THREE.Vector3((Math.random() - 0.5) * 3, 1.5 + Math.random() * 3, (Math.random() - 0.5) * 2));
      debris.push({
        mesh: voxel,
        vel,
        life: 5 + Math.random() * 2,
        bounce: 0.28,
        spin: new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
      });
    }
  }
}

function carvePanelHole(panel, hitX, hitY, severity) {
  const orig = saveOriginalVertices(panel);
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;
  const span = 0.25 + severity * 0.4;
  const innerZ = boundsFromOrig(orig).minZ;
  for (let i = 0; i < pos.count; i++) {
    const ox = orig[i * 3];
    const oy = orig[i * 3 + 1];
    const oz = orig[i * 3 + 2];
    const dist = Math.hypot(ox - hitX, oy - hitY);
    if (dist > span) continue;
    const t = 1 - dist / span;
    if (t > 0.55 + severity * 0.25) {
      pos.setXYZ(i, hitX + (ox - hitX) * 0.15, hitY + (oy - hitY) * 0.15, innerZ - 0.02);
    }
  }
  pos.needsUpdate = true;
  panel.geometry.computeVertexNormals();
}

function detachFrontImpactParts(vehicle, scene, impactSpeed, debris) {
  const speed = Math.abs(impactSpeed);
  if (speed < HEADLIGHT_BREAK_SPEED) return;

  const root = vehicle.mesh;
  const severity = dentSeverity(impactSpeed);
  const tryDetach = (partId, minSpeed, dmg = 18) => {
    if (speed < minSpeed) return false;
    const part = findPartById(root, partId);
    if (!part) return false;
    detachPart(vehicle, scene, part, impactSpeed, debris);
    damagePartHealth(vehicle, partId, dmg + severity * 22);
    return true;
  };

  const headlights = collectDetachableParts(root).filter((p) => p.userData.carPart === 'headlight');
  for (const lamp of headlights) {
    detachPart(vehicle, scene, lamp, impactSpeed, debris);
    damagePartHealth(vehicle, 'headlight', 10);
  }

  if (speed >= DENT_SPEED - 4) {
    tryDetach('bumper_front', DENT_SPEED - 4, 15);
    tryDetach('grille', DENT_SPEED - 2, 12);
  }

  const windshield = findPartById(root, 'windshield');
  if (windshield && speed >= DENT_SPEED - 6) {
    shatterGlass(windshield, severity);
    damagePartHealth(vehicle, 'windshield', 20 + severity * 30);
  }
  if (windshield && speed >= PART_FLY_SPEED) {
    tryDetach('windshield', PART_FLY_SPEED, 35);
  }

  if (speed >= DENT_SPEED) {
    tryDetach('hood', DENT_SPEED, 25);
  }

  if (speed >= PART_FLY_SPEED + 4) {
    const doorL = findPartById(root, 'door_l');
    const doorR = findPartById(root, 'door_r');
    if (doorL && !doorL.userData.detached && Math.random() < 0.7) {
      if (speed >= SCOOP_SPEED) tryDetach('door_l', SCOOP_SPEED, 20);
      else hangDoorOpen(doorL, -1);
    }
    if (doorR && !doorR.userData.detached && Math.random() < 0.7) {
      if (speed >= SCOOP_SPEED) tryDetach('door_r', SCOOP_SPEED, 20);
      else hangDoorOpen(doorR, 1);
    }
  }

  if (speed >= SCOOP_SPEED) {
    for (const id of ['wheel_fl', 'wheel_fr']) {
      if (Math.random() < 0.35 + severity * 0.25) tryDetach(id, SCOOP_SPEED, 30);
    }
  }

  let budget = speed >= SCOOP_SPEED ? 3 : speed >= PART_FLY_SPEED ? 2 : 0;
  const extras = collectDetachableParts(root)
    .filter((p) => isFrontPart(p, root))
    .sort((a, b) => partPriority(b) - partPriority(a));
  for (const part of extras) {
    if (budget <= 0) break;
    if (part.userData.detached) continue;
    detachPart(vehicle, scene, part, impactSpeed, debris);
    damagePartHealth(vehicle, part.userData.carPart ?? 'body', 15);
    budget--;
  }
}

function detachRandomParts(vehicle, scene, impactSpeed, debris, count) {
  const pool = collectDetachableParts(vehicle.mesh);
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    detachPart(vehicle, scene, pool[idx], impactSpeed, debris);
    pool.splice(idx, 1);
  }
}

function saveOriginalVertices(panel) {
  if (panel.userData.dentOriginal) return panel.userData.dentOriginal;
  const pos = panel.geometry?.attributes?.position;
  if (!pos) return null;
  panel.userData.dentOriginal = Float32Array.from(pos.array);
  return panel.userData.dentOriginal;
}

function ensureVertexColors(panel) {
  const pos = panel.geometry?.attributes?.position;
  if (!pos || panel.geometry.attributes.color) return;
  const base = new THREE.Color(panel.material?.color ?? 0xaaaaaa);
  const arr = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    arr[i * 3] = base.r;
    arr[i * 3 + 1] = base.g;
    arr[i * 3 + 2] = base.b;
  }
  panel.geometry.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  if (panel.material) {
    panel.material = panel.material.clone();
    panel.material.vertexColors = true;
  }
}

function restorePanel(panel) {
  const orig = panel.userData.dentOriginal;
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;
  pos.array.set(orig);
  pos.needsUpdate = true;
  const col = panel.geometry.attributes.color;
  if (col && panel.userData.dentColorOriginal) {
    col.array.set(panel.userData.dentColorOriginal);
    col.needsUpdate = true;
  }
  panel.geometry.computeVertexNormals();
}

function deformPanel(panel, hitX, hitY, severity, scoop) {
  ensureDenseGeometry(panel);
  const orig = saveOriginalVertices(panel);
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;

  ensureVertexColors(panel);
  const colors = panel.geometry.attributes.color;
  if (colors && !panel.userData.dentColorOriginal) {
    panel.userData.dentColorOriginal = Float32Array.from(colors.array);
  }

  const bounds = boundsFromOrig(orig);
  const innerZ = bounds.minZ;
  const outerZ = bounds.maxZ;
  const thickness = Math.max(outerZ - innerZ, 0.02);
  const { width, height } = panelSize(panel);
  const panelSpan = Math.min(width, height);
  const radius = panelSpan * (scoop ? 0.26 + severity * 0.2 : 0.14 + severity * 0.08);
  const dentReach = radius * 1.25;
  const scoopPower = scoop ? 3.2 + severity * 1.4 : 2;
  const maxInward = scoop
    ? thickness * (1.25 + severity * 1.6) + panelSpan * 0.06 * severity
    : thickness * (0.4 + severity * 0.28);
  const punchThrough = scoop ? thickness * (0.45 + severity * 0.55) : thickness * 0.08;
  const metal = new THREE.Color(0x3a3a42);
  const rust = new THREE.Color(0x5c3a28);
  const darkMetal = new THREE.Color(0x1a1a20);
  const paint = new THREE.Color(panel.material?.color ?? 0xaaaaaa);

  for (let i = 0; i < pos.count; i++) {
    const ox = orig[i * 3];
    const oy = orig[i * 3 + 1];
    const oz = orig[i * 3 + 2];
    const dx = ox - hitX;
    const dy = oy - hitY;
    const dist = Math.hypot(dx, dy);

    if (dist > dentReach) {
      pos.setXYZ(i, ox, oy, oz);
      if (colors && panel.userData.dentColorOriginal) {
        colors.setXYZ(
          i,
          panel.userData.dentColorOriginal[i * 3],
          panel.userData.dentColorOriginal[i * 3 + 1],
          panel.userData.dentColorOriginal[i * 3 + 2],
        );
      }
      continue;
    }

    const radialT = 1 - dist / dentReach;
    const bowl = radialT ** scoopPower;
    const faceT = smoothstep(innerZ, outerZ, oz);
    const rimDist = Math.abs(dist - radius * 0.88);
    const rimCrease = scoop ? Math.exp(-(rimDist * rimDist) * 90) * 0.38 : 0;
    const faceWeight = 0.12 + 0.88 * faceT;
    const backPull = scoop ? bowl * (1 - faceT) * 0.72 : bowl * (1 - faceT) * 0.25;
    const inward = bowl * maxInward * faceWeight + rimCrease * maxInward * faceT + backPull * maxInward;
    const pinch = bowl * (scoop ? 0.62 + severity * 0.28 : 0.22) * (0.35 + 0.65 * faceT);
    const nx = ox - (dx / (dist + 1e-4)) * pinch;
    const ny = oy - (dy / (dist + 1e-4)) * pinch;
    const floorZ = innerZ - punchThrough * bowl;
    const nz = Math.min(oz, Math.max(floorZ, oz - inward));

    pos.setXYZ(i, nx, ny, nz);

    if (colors) {
      const depthFactor = inward / (maxInward + 0.001);
      const c = paint.clone();
      if (depthFactor > 0.35) c.lerp(rust, (depthFactor - 0.35) * 1.6);
      if (depthFactor > 0.58) c.lerp(metal, (depthFactor - 0.58) * 2.2);
      if (depthFactor > 0.78) c.lerp(darkMetal, (depthFactor - 0.78) * 3.5);
      colors.setXYZ(i, c.r, c.g, c.b);
    }
  }

  pos.needsUpdate = true;
  if (colors) colors.needsUpdate = true;
  panel.geometry.computeVertexNormals();
}

function rebuildPanel(panel, records) {
  restorePanel(panel);
  for (const d of records) {
    if (d.panel === panel) deformPanel(panel, d.hitX, d.hitY, d.severity, d.scoop);
  }
}

function worldImpactPoint(vehicle) {
  const p = new THREE.Vector3(0, 0.75, 2.1);
  vehicle.mesh.localToWorld(p);
  return p;
}

function panelLocalHit(panel, vehicle) {
  const local = worldImpactPoint(vehicle);
  panel.worldToLocal(local);
  return { x: local.x, y: local.y };
}

function spawnScoopDebris(scene, vehicle, origin, severity, debris) {
  const count = 3 + Math.floor(severity * 6);
  const base = new THREE.Color(vehicle.spec?.color ?? 0xb8bdc4);
  for (let i = 0; i < count; i++) {
    const mat = rbxDebrisMaterial(
      base.clone().lerp(new THREE.Color(0x888888), 0.2 + Math.random() * 0.35),
    );
    const chunk = new THREE.Mesh(
      new THREE.BoxGeometry(0.06 + Math.random() * 0.12, 0.04 + Math.random() * 0.08, 0.08 + Math.random() * 0.1),
      mat,
    );
    chunk.position.copy(origin);
    chunk.position.x += (Math.random() - 0.5) * 0.35;
    chunk.position.y += (Math.random() - 0.5) * 0.25;
    chunk.position.z += (Math.random() - 0.5) * 0.2;
    chunk.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(chunk);
    const vel = new THREE.Vector3((Math.random() - 0.5) * 5, 2 + Math.random() * 4, 1 + Math.random() * 4);
    vel.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
    debris.push({ mesh: chunk, vel, life: 1.2 + Math.random() * 0.8, bounce: 0.25 });
  }
}

function spawnPaintChips(scene, vehicle, count, debris) {
  const color = vehicle.spec?.color ?? 0xb8bdc4;
  const origin = worldImpactPoint(vehicle);
  const base = new THREE.Color(color);

  for (let i = 0; i < count; i++) {
    const chipColor = base.clone().lerp(new THREE.Color(0xffffff), 0.1 + Math.random() * 0.35);
    const mat = rbxDebrisMaterial(chipColor);
    const chip = new THREE.Mesh(
      new THREE.BoxGeometry(0.04 + Math.random() * 0.08, 0.012 + Math.random() * 0.016, 0.05 + Math.random() * 0.06),
      mat,
    );
    chip.position.copy(origin);
    chip.position.x += (Math.random() - 0.5) * 0.55;
    chip.position.y += (Math.random() - 0.5) * 0.4;
    chip.position.z += (Math.random() - 0.5) * 0.3;
    chip.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(chip);

    const vel = new THREE.Vector3((Math.random() - 0.5) * 4, 1.8 + Math.random() * 3.5, (Math.random() - 0.2) * 4);
    vel.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
    debris.push({ mesh: chip, vel, life: 0.9 + Math.random() * 0.6, bounce: 0.32 });
  }
}

function spawnSparks(scene, origin, count, debris) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffaa44,
    emissive: 0xff6600,
    emissiveIntensity: 2,
    metalness: 0.8,
    roughness: 0.3,
  });
  for (let i = 0; i < count; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.025 + Math.random() * 0.03, 6, 6), mat);
    s.position.copy(origin);
    scene.add(s);
    debris.push({
      mesh: s,
      vel: new THREE.Vector3((Math.random() - 0.5) * 8, 2 + Math.random() * 6, (Math.random() - 0.5) * 8),
      life: 0.15 + Math.random() * 0.2,
      sparkle: true,
    });
  }
}

function detachPart(vehicle, scene, part, impactSpeed, debris) {
  if (!part?.parent || part.userData.detached) return;
  const worldPos = new THREE.Vector3();
  const worldQuat = new THREE.Quaternion();
  const worldScale = new THREE.Vector3();
  part.updateWorldMatrix(true, false);
  part.matrixWorld.decompose(worldPos, worldQuat, worldScale);
  part.parent.remove(part);
  part.traverse((child) => {
    if (child.userData) child.userData.detached = true;
  });
  scene.add(part);
  part.position.copy(worldPos);
  part.quaternion.copy(worldQuat);
  part.scale.copy(worldScale);

  const speed = Math.abs(impactSpeed);
  const id = part.userData.carPart ?? '';
  damagePartHealth(vehicle, id, 12 + speed * 0.35);
  const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
  const vel = forward
    .clone()
    .multiplyScalar(1.5 + speed * 0.045)
    .add(new THREE.Vector3((Math.random() - 0.5) * 2, 1.2 + Math.random() * 2.5, (Math.random() - 0.5) * 1.5));

  if (id.startsWith('wheel_')) {
    vel.y += 1.5;
    vel.multiplyScalar(1.2);
  }

  debris.push({
    mesh: part,
    vel,
    life: 6,
    isPart: true,
    bounce: 0.32,
    spin: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8),
  });
}

export function handleCrash(vehicle, scene, impactSpeed, debris) {
  const speed = Math.abs(impactSpeed);
  if (speed < CHIP_SPEED) return;

  const origin = worldImpactPoint(vehicle);
  const chipCount = Math.min(18, 3 + Math.floor(speed * 0.28));
  spawnPaintChips(scene, vehicle, chipCount, debris);

  if (speed >= DENT_SPEED) {
    const severity = dentSeverity(impactSpeed);
    const scoop = true;
    const panel = findFrontDentPanel(vehicle.mesh);
    if (panel) {
      const { x: hitX, y: hitY } = panelLocalHit(panel, vehicle);
      const record = { panel, hitX, hitY, severity, scoop };
      if (!vehicle.dents) vehicle.dents = [];
      vehicle.dents.push(record);
      rebuildPanel(panel, vehicle.dents);
      carvePanelHole(panel, hitX, hitY, severity);
      spawnVoxelScoop(scene, vehicle, panel, hitX, hitY, severity, impactSpeed, debris);
      vehicle.damage = (vehicle.damage ?? 0) + 35 + severity * 40;
      if (!vehicle.partHealth) vehicle.partHealth = createDefaultPartHealth();
      vehicle.partHealth.body = Math.max(0, vehicle.partHealth.body - 15 - severity * 35);
      vehicle.partHealth.engine = Math.max(0, vehicle.partHealth.engine - severity * 20);
    }
    if (speed >= SCOOP_SPEED) spawnSparks(scene, origin, 8 + Math.floor(severity * 8), debris);
  }

  detachFrontImpactParts(vehicle, scene, impactSpeed, debris);

  if (speed >= SCOOP_SPEED) {
    detachRandomParts(vehicle, scene, impactSpeed, debris, 1 + Math.floor(dentSeverity(impactSpeed) * 2));
  }
}

export function updateCrashDebris(debris, delta) {
  for (let i = debris.length - 1; i >= 0; i--) {
    const p = debris[i];
    p.life -= delta;
    p.vel.y -= 16 * delta;
    p.mesh.position.addScaledVector(p.vel, delta);

    if (!p.sparkle && p.mesh.position.y < 0.04) {
      p.mesh.position.y = 0.04;
      if (p.vel.y < 0) p.vel.y = -p.vel.y * (p.bounce ?? 0.3);
      p.vel.x *= 0.72;
      p.vel.z *= 0.72;
    }

    if (p.spin) {
      p.mesh.rotation.x += p.spin.x * delta;
      p.mesh.rotation.y += p.spin.y * delta;
      p.mesh.rotation.z += p.spin.z * delta;
    }

    if (p.sparkle && p.mesh.material?.emissiveIntensity > 0) {
      p.mesh.material.emissiveIntensity = Math.max(0, p.mesh.material.emissiveIntensity - delta * 8);
    }

    if (p.life <= 0) {
      p.mesh.parent?.remove(p.mesh);
      debris.splice(i, 1);
    }
  }
}

export function addDentToVehicle(vehicle, impactSpeed) {
  handleCrash(vehicle, vehicle.mesh.parent, impactSpeed, vehicle.debris ?? (vehicle.debris = []));
}

export function clearDents(vehicle) {
  if (!vehicle?.dents?.length) return;
  const panels = new Set(vehicle.dents.map((d) => d.panel).filter(Boolean));
  for (const panel of panels) restorePanel(panel);
  vehicle.dents = [];
  vehicle.damage = 0;
  vehicle.partHealth = createDefaultPartHealth();
}
