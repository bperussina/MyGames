import * as THREE from 'three';

/** Below this speed, wall taps do nothing. Hard hits leave a dent. */
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

function dentMetalMaterial(dark = false) {
  return new THREE.MeshPhysicalMaterial({
    color: dark ? 0x0c0c0c : 0x252525,
    metalness: 0.88,
    roughness: dark ? 0.92 : 0.72,
    clearcoat: dark ? 0 : 0.15,
    clearcoatRoughness: 0.4,
  });
}

function paintChipMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    metalness: 0.55,
    roughness: 0.78,
    side: THREE.DoubleSide,
  });
}

/**
 * Crushed-metal dent: sunken crater, stress folds, and paint chips on the impact panel.
 */
export function addDentToVehicle(vehicle, impactSpeed) {
  if (!vehicle?.mesh) return;

  const severity = dentSeverity(impactSpeed);
  const huge = isHugeDent(impactSpeed);
  const scale = huge ? 1.45 : 0.75 + severity * 0.65;

  const dent = new THREE.Group();
  dent.name = 'dent';

  const radius = (0.22 + severity * 0.32) * scale;

  // Main inward crater — partial sphere pressed into the panel
  const crater = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52),
    dentMetalMaterial(false),
  );
  crater.rotation.x = Math.PI / 2;
  crater.scale.set(1.15, 0.32 + severity * 0.22, 1.05);
  crater.position.z = -0.05 - severity * 0.1;
  crater.castShadow = true;
  dent.add(crater);

  // Deep shadow pocket at the center of the fold
  const pocket = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.62, 12, 10),
    dentMetalMaterial(true),
  );
  pocket.scale.set(1, 0.18 + severity * 0.12, 1);
  pocket.position.z = -0.1 - severity * 0.14;
  dent.add(pocket);

  // Buckled rim where paint cracked away from the metal
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.92, 0.035 + severity * 0.025, 8, 20),
    paintChipMaterial(),
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.z = -0.02;
  dent.add(rim);

  // Radiating crease lines — metal folding under impact
  const foldCount = huge ? 6 : 3 + Math.floor(severity * 2);
  for (let i = 0; i < foldCount; i++) {
    const foldLen = (0.28 + severity * 0.45) * scale;
    const fold = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.018, foldLen),
      dentMetalMaterial(i % 2 === 0),
    );
    const angle = (i / foldCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
    fold.position.set(
      Math.cos(angle) * radius * 0.75,
      (Math.random() - 0.5) * 0.08,
      Math.sin(angle) * radius * 0.35 - 0.03,
    );
    fold.rotation.y = angle;
    fold.rotation.x = -0.55 - severity * 0.35 - Math.random() * 0.15;
    dent.add(fold);
  }

  // Extra jagged tear on huge impacts
  if (huge) {
    for (let i = 0; i < 3; i++) {
      const tear = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.025, 0.2 + Math.random() * 0.35),
        dentMetalMaterial(true),
      );
      tear.position.set((Math.random() - 0.5) * radius * 1.4, 0.05, radius * 0.2);
      tear.rotation.set(-0.8, Math.random() * 0.8, Math.random() * 0.5);
      dent.add(tear);
    }
  }

  // Place on the front panel where head-on hits land
  const sideX = (Math.random() - 0.5) * (huge ? 1.1 : 0.75);
  dent.position.set(sideX, 0.5 + severity * 0.42, 1.55 + Math.random() * 0.4);
  dent.rotation.y = (Math.random() - 0.5) * 0.3;
  dent.rotation.x = -0.08 - severity * 0.12;

  vehicle.mesh.add(dent);
  if (!vehicle.dents) vehicle.dents = [];
  vehicle.dents.push(dent);
  vehicle.damage = (vehicle.damage ?? 0) + (huge ? 35 : 18) + severity * 22;
}

export function clearDents(vehicle) {
  if (!vehicle?.dents) return;
  for (const d of vehicle.dents) vehicle.mesh.remove(d);
  vehicle.dents = [];
  vehicle.damage = 0;
}
