/** Below this speed, wall taps do nothing. Hard hits leave a visible dent. */
const DENT_SPEED = 32;
const HUGE_DENT_SPEED = 40;

export { DENT_SPEED, HUGE_DENT_SPEED };

export function shouldDent(speed) {
  return Math.abs(speed) >= DENT_SPEED;
}

export function isHugeDent(speed) {
  return Math.abs(speed) >= HUGE_DENT_SPEED;
}

export function dentSeverity(speed) {
  if (!shouldDent(speed)) return 0;
  return Math.min(1, (Math.abs(speed) - DENT_SPEED) / (52 - DENT_SPEED));
}

function panelSize(panel) {
  const p = panel?.geometry?.parameters ?? {};
  return {
    width: p.width ?? 2,
    height: p.height ?? 0.6,
    depth: p.depth ?? 1.2,
  };
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Pick the largest front body panel (hood / front body). */
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
  if (panel.material?.roughness !== undefined) {
    panel.material.roughness = panel.userData.baseRoughness ?? panel.material.roughness;
  }
}

/** Push panel vertices inward — an actual dent in the mesh, not a sticker on top. */
function applyDentToPanel(panel, hitX, hitY, severity, huge) {
  const orig = saveOriginalVertices(panel);
  const pos = panel.geometry?.attributes?.position;
  if (!orig || !pos) return;

  const { width, height, depth } = panelSize(panel);
  const halfD = depth * 0.5;
  const radius = (huge ? 0.32 : 0.18) + severity * (huge ? 0.14 : 0.1);
  const maxDepth = (huge ? 0.14 : 0.06) + severity * (huge ? 0.08 : 0.05);

  if (panel.material && panel.userData.baseRoughness === undefined) {
    panel.userData.baseRoughness = panel.material.roughness ?? 0.2;
  }
  if (panel.material?.roughness !== undefined) {
    panel.material.roughness = Math.min(
      0.92,
      (panel.userData.baseRoughness ?? 0.2) + severity * 0.22 + (huge ? 0.12 : 0),
    );
  }

  for (let i = 0; i < pos.count; i++) {
    const ox = orig[i * 3];
    const oy = orig[i * 3 + 1];
    const oz = orig[i * 3 + 2];

    const dx = ox - hitX;
    const dy = oy - hitY;
    const dist = Math.hypot(dx, dy);
    if (dist > radius * 1.2) {
      pos.setXYZ(i, ox, oy, oz);
      continue;
    }

    const surface = smoothstep(halfD - 0.35, halfD - 0.02, oz);
    if (surface <= 0) {
      pos.setXYZ(i, ox, oy, oz);
      continue;
    }

    const falloff = 1 - dist / (radius * 1.2);
    const bowl = falloff * falloff * maxDepth * surface;

    const crumple = bowl * 0.22;
    const nx = ox - (dx / (dist + 0.0001)) * crumple;
    const ny = oy - (dy / (dist + 0.0001)) * crumple;
    const nz = oz - bowl;

    pos.setXYZ(i, nx, ny, nz);
  }

  pos.needsUpdate = true;
  panel.geometry.computeVertexNormals();
}

function rebuildPanelFromDents(panel, dentRecords) {
  restorePanel(panel);
  for (const d of dentRecords) {
    if (d.panel === panel) {
      applyDentToPanel(panel, d.hitX, d.hitY, d.severity, d.huge);
    }
  }
}

/** Dent the actual car body mesh — crushed panel, not a floating shape. */
export function addDentToVehicle(vehicle, impactSpeed) {
  if (!vehicle?.mesh) return;

  const severity = dentSeverity(impactSpeed);
  const huge = isHugeDent(impactSpeed);
  const panel = findFrontDentPanel(vehicle.mesh);
  if (!panel) return;

  const { width, height } = panelSize(panel);
  const hitX = (Math.random() - 0.5) * width * 0.42;
  const hitY = (Math.random() - 0.5) * height * 0.32;

  const record = { panel, hitX, hitY, severity, huge };
  if (!vehicle.dents) vehicle.dents = [];
  vehicle.dents.push(record);

  rebuildPanelFromDents(panel, vehicle.dents);
  vehicle.damage = (vehicle.damage ?? 0) + (huge ? 35 : 18) + severity * 22;
}

export function clearDents(vehicle) {
  if (!vehicle?.dents?.length) return;
  const panels = new Set(vehicle.dents.map((d) => d.panel).filter(Boolean));
  for (const panel of panels) restorePanel(panel);
  vehicle.dents = [];
  vehicle.damage = 0;
}
