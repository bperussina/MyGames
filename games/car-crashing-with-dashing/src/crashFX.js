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

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function findFrontDentPanel(root) {
  const panels = [];
  root.traverse((child) => {
    if (child.isMesh && child.userData.dentPanel === 'front') panels.push(child);
  });
  if (!panels.length) return null;
  return panels.reduce((best, panel) => {
    const a = panelSize(best);
    const b = panelSize(panel);
    return b.width * b.height >= a.width * b.height ? panel : best;
  });
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

function restorePanel(panel) {
  const orig = panel.userData.dentOriginal;
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;
  pos.array.set(orig);
  pos.needsUpdate = true;
  panel.geometry.computeVertexNormals();
}

function deformPanel(panel, hitX, hitY, severity, scoop) {
  const orig = saveOriginalVertices(panel);
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;

  const { width, height, depth } = panelSize(panel);
  const halfD = depth * 0.5;
  const radius = scoop ? 0.38 + severity * 0.22 : 0.2 + severity * 0.14;
  const maxDepth = scoop ? 0.26 + severity * 0.22 : 0.08 + severity * 0.07;

  for (let i = 0; i < pos.count; i++) {
    const ox = orig[i * 3];
    const oy = orig[i * 3 + 1];
    const oz = orig[i * 3 + 2];
    const dx = ox - hitX;
    const dy = oy - hitY;
    const dist = Math.hypot(dx, dy);
    if (dist > radius * 1.25) {
      pos.setXYZ(i, ox, oy, oz);
      continue;
    }

    const surface = smoothstep(halfD - 0.4, halfD - 0.01, oz);
    if (surface <= 0) {
      pos.setXYZ(i, ox, oy, oz);
      continue;
    }

    const t = 1 - dist / (radius * 1.25);
    const bowl = (scoop ? t * t * t : t * t) * maxDepth * surface;
    const pinch = scoop ? bowl * 0.45 : bowl * 0.2;
    const nx = ox - (dx / (dist + 0.0001)) * pinch;
    const ny = oy - (dy / (dist + 0.0001)) * pinch;
    const nz = oz - bowl;
    pos.setXYZ(i, nx, ny, nz);
  }

  pos.needsUpdate = true;
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

function spawnPaintChips(scene, vehicle, count, debris) {
  const color = vehicle.spec?.color ?? 0xb8bdc4;
  const origin = worldImpactPoint(vehicle);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.15 + Math.random() * 0.2),
    metalness: 0.55,
    roughness: 0.35,
  });

  for (let i = 0; i < count; i++) {
    const chip = new THREE.Mesh(new THREE.BoxGeometry(0.04 + Math.random() * 0.07, 0.015, 0.05 + Math.random() * 0.06), mat);
    chip.position.copy(origin);
    chip.position.x += (Math.random() - 0.5) * 0.5;
    chip.position.y += (Math.random() - 0.5) * 0.35;
    chip.position.z += (Math.random() - 0.5) * 0.25;
    chip.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(chip);
    debris.push({
      mesh: chip,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        1.5 + Math.random() * 3,
        (Math.random() - 0.3) * 4,
      ),
      life: 0.7 + Math.random() * 0.5,
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
  part.scale.multiplyScalar(1);

  const speed = Math.abs(impactSpeed);
  const vel = new THREE.Vector3(
    (Math.random() - 0.5) * 3,
    1.2 + Math.random() * 2.5,
    2 + Math.random() * 3,
  );
  vel.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotY);
  vel.multiplyScalar(0.08 + speed * 0.012);

  debris.push({
    mesh: part,
    vel,
    life: 3.5,
    isPart: true,
    spin: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8),
  });
}

/** Full crash: paint chips, scoop dents, part fly-off — no text. */
export function handleCrash(vehicle, scene, impactSpeed, debris) {
  const speed = Math.abs(impactSpeed);
  if (speed < CHIP_SPEED) return;

  const chipCount = Math.min(14, 2 + Math.floor(speed * 0.22));
  spawnPaintChips(scene, vehicle, chipCount, debris);

  if (speed < DENT_SPEED) return;

  const severity = dentSeverity(impactSpeed);
  const scoop = speed >= SCOOP_SPEED && Math.random() < 0.62;
  const panel = findFrontDentPanel(vehicle.mesh);
  if (panel) {
    const { width, height } = panelSize(panel);
    const hitX = (Math.random() - 0.5) * width * 0.4;
    const hitY = (Math.random() - 0.5) * height * 0.3;
    const record = { panel, hitX, hitY, severity, scoop };
    if (!vehicle.dents) vehicle.dents = [];
    vehicle.dents.push(record);
    rebuildPanel(panel, vehicle.dents);
    vehicle.damage = (vehicle.damage ?? 0) + (scoop ? 40 : 20) + severity * 20;
  }

  if (speed >= PART_FLY_SPEED && Math.random() < 0.38) {
    const parts = collectDetachableParts(vehicle.mesh);
    if (parts.length) {
      const part = parts[Math.floor(Math.random() * parts.length)];
      detachPart(vehicle, scene, part, impactSpeed, debris);
    }
  }
}

export function updateCrashDebris(debris, delta) {
  for (let i = debris.length - 1; i >= 0; i--) {
    const p = debris[i];
    p.life -= delta;
    p.mesh.position.addScaledVector(p.vel, delta);
    p.vel.y -= 14 * delta;
    if (p.spin) {
      p.mesh.rotation.x += p.spin.x * delta;
      p.mesh.rotation.y += p.spin.y * delta;
      p.mesh.rotation.z += p.spin.z * delta;
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
