import * as THREE from 'three';

const CHIP_SPEED = 5;
const DENT_SPEED = 28;
const SCOOP_SPEED = 38;
const PART_FLY_SPEED = 34;

export { DENT_SPEED, SCOOP_SPEED };

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
    if (child.isMesh && child.userData.detachable && !child.userData.detached) parts.push(child);
  });
  return parts;
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
    const mat = new THREE.MeshStandardMaterial({
      color: base.clone().lerp(new THREE.Color(0x888888), 0.35 + Math.random() * 0.4),
      metalness: 0.7,
      roughness: 0.45,
    });
    const chunk = new THREE.Mesh(
      new THREE.BoxGeometry(0.04 + Math.random() * 0.08, 0.02 + Math.random() * 0.04, 0.05 + Math.random() * 0.07),
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
    const mat = new THREE.MeshStandardMaterial({
      color: chipColor,
      metalness: 0.45 + Math.random() * 0.35,
      roughness: 0.25 + Math.random() * 0.3,
    });
    const chip = new THREE.Mesh(
      new THREE.BoxGeometry(0.03 + Math.random() * 0.06, 0.008 + Math.random() * 0.012, 0.04 + Math.random() * 0.05),
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
  if (!part?.parent) return;
  const worldPos = new THREE.Vector3();
  const worldQuat = new THREE.Quaternion();
  part.getWorldPosition(worldPos);
  part.getWorldQuaternion(worldQuat);
  part.parent.remove(part);
  part.userData.detached = true;
  scene.add(part);
  part.position.copy(worldPos);
  part.quaternion.copy(worldQuat);

  const speed = Math.abs(impactSpeed);
  const vel = new THREE.Vector3((Math.random() - 0.5) * 2, 1.5 + Math.random() * 2, 2.5 + Math.random() * 2);
  vel.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
  vel.multiplyScalar(0.06 + speed * 0.014);

  debris.push({
    mesh: part,
    vel,
    life: 4,
    isPart: true,
    bounce: 0.28,
    spin: new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6),
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
      vehicle.damage = (vehicle.damage ?? 0) + 35 + severity * 40;
      if (severity > 0.35) spawnScoopDebris(scene, vehicle, origin, severity, debris);
    }
    if (speed >= SCOOP_SPEED) spawnSparks(scene, origin, 8 + Math.floor(severity * 8), debris);
  }

  if (speed >= PART_FLY_SPEED && Math.random() < 0.42) {
    const parts = collectDetachableParts(vehicle.mesh);
    if (parts.length) {
      detachPart(vehicle, scene, parts[Math.floor(Math.random() * parts.length)], impactSpeed, debris);
    }
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
}
