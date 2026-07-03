import * as THREE from 'three';

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

/** Pick the largest front body panel so dents land on hood/doors — not buried inside. */
export function findFrontDentPanel(root) {
  const panels = [];
  root.traverse((child) => {
    if (child.isMesh && child.userData.dentPanel === 'front') panels.push(child);
  });
  if (!panels.length) return null;
  return panels.reduce((best, panel) => {
    const a = panelSize(best);
    const b = panelSize(panel);
    return b.width * b.height >= a.width * a.height ? panel : best;
  });
}

/**
 * Obvious crushed-metal dent sitting ON the car surface — dark bowl, silver crumple lip, scratches.
 */
export function addDentToVehicle(vehicle, impactSpeed) {
  if (!vehicle?.mesh) return;

  const severity = dentSeverity(impactSpeed);
  const huge = isHugeDent(impactSpeed);
  const scale = huge ? 1.7 : 1.1 + severity * 0.75;
  const radius = (0.34 + severity * 0.3) * scale;

  const panel = findFrontDentPanel(vehicle.mesh);
  const parent = panel ?? vehicle.mesh;
  const { width, height, depth } = panelSize(panel);

  const dent = new THREE.Group();
  dent.name = 'dent';
  dent.renderOrder = 2;

  const lipMat = new THREE.MeshPhysicalMaterial({
    color: huge ? 0xd1d5db : 0xb8bec8,
    metalness: 0.94,
    roughness: 0.38,
    clearcoat: 0.45,
    clearcoatRoughness: 0.2,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const craterMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.75,
    roughness: 0.9,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  // Crumpled lip bulging outward — easy to spot from the camera
  const lip = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 14), lipMat);
  lip.scale.set(1.25, 0.42 + severity * 0.28, 1.15);
  lip.position.z = radius * 0.22;
  lip.castShadow = true;
  dent.add(lip);

  // Deep black crushed center
  const bowl = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.78, 14, 12), craterMat);
  bowl.scale.set(1, 0.28 + severity * 0.18, 1);
  bowl.position.z = -radius * 0.08;
  dent.add(bowl);

  // Buckled ring around the impact
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.95, 0.05 + severity * 0.035, 10, 24),
    lipMat,
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.z = radius * 0.08;
  dent.add(ring);

  // Silver paint scratches
  const scratchCount = huge ? 6 : 4;
  for (let i = 0; i < scratchCount; i++) {
    const scratch = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.022, radius * (0.9 + Math.random() * 0.8)),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.3 }),
    );
    const angle = (i / scratchCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    scratch.position.set(
      Math.cos(angle) * radius * 0.7,
      Math.sin(angle) * radius * 0.35,
      radius * 0.12,
    );
    scratch.rotation.y = angle;
    scratch.rotation.x = -0.35 - Math.random() * 0.25;
    dent.add(scratch);
  }

  // Fold creases on huge hits
  if (huge) {
    for (let i = 0; i < 4; i++) {
      const crease = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.025, radius * 1.1),
        craterMat,
      );
      const angle = (i / 4) * Math.PI + 0.4;
      crease.position.set(Math.cos(angle) * radius * 0.85, Math.sin(angle) * radius * 0.4, 0.05);
      crease.rotation.y = angle;
      crease.rotation.x = -0.7;
      dent.add(crease);
    }
  }

  const halfW = width * 0.5;
  const halfH = height * 0.5;
  const halfD = depth * 0.5;

  if (panel) {
    dent.position.set(
      (Math.random() - 0.5) * halfW * 0.75,
      (Math.random() - 0.5) * halfH * 0.45,
      halfD + 0.08,
    );
    dent.rotation.y = (Math.random() - 0.5) * 0.2;
    dent.rotation.x = -0.05 - severity * 0.08;
  } else {
    dent.position.set((Math.random() - 0.5) * 0.9, 0.55 + severity * 0.2, 2.05);
  }

  parent.add(dent);
  if (!vehicle.dents) vehicle.dents = [];
  vehicle.dents.push(dent);
  vehicle.damage = (vehicle.damage ?? 0) + (huge ? 35 : 18) + severity * 22;
}

export function clearDents(vehicle) {
  if (!vehicle?.dents) return;
  for (const d of vehicle.dents) {
    d.parent?.remove(d);
  }
  vehicle.dents = [];
  vehicle.damage = 0;
}
