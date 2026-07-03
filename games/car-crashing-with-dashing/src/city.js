import * as THREE from 'three';

const WORLD_HALF = 80;

function buildingMat(hue) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(hue, 0.15, 0.35 + Math.random() * 0.15),
    roughness: 0.75,
    metalness: 0.08,
  });
}

function windowMat() {
  return new THREE.MeshStandardMaterial({
    color: 0x88bbee,
    emissive: 0x223344,
    emissiveIntensity: 0.35,
    roughness: 0.2,
    metalness: 0.4,
  });
}

export function buildCity(scene) {
  const group = new THREE.Group();
  group.name = 'city';
  const colliders = [];

  const asphalt = new THREE.Mesh(
    new THREE.PlaneGeometry(WORLD_HALF * 2, WORLD_HALF * 2),
    new THREE.MeshStandardMaterial({ color: '#2e3238', roughness: 0.78, metalness: 0.18 }),
  );
  asphalt.rotation.x = -Math.PI / 2;
  asphalt.receiveShadow = true;
  group.add(asphalt);

  // Road markings
  for (let i = -3; i <= 3; i++) {
    const stripeH = new THREE.Mesh(
      new THREE.PlaneGeometry(WORLD_HALF * 2, 0.35),
      new THREE.MeshStandardMaterial({ color: '#d4d4d8' }),
    );
    stripeH.rotation.x = -Math.PI / 2;
    stripeH.position.set(0, 0.02, i * 18);
    group.add(stripeH);
    const stripeV = stripeH.clone();
    stripeV.rotation.z = Math.PI / 2;
    stripeV.position.set(i * 18, 0.02, 0);
    group.add(stripeV);
  }

  const rng = (seed) => {
    let s = seed;
    return () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const rand = rng(42);

  for (let gx = -3; gx <= 3; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      if (gx === 0 && gz === 0) continue; // spawn plaza at center
      const cx = gx * 22 + (rand() - 0.5) * 4;
      const cz = gz * 22 + (rand() - 0.5) * 4;
      if (Math.abs(cx) < 8 && Math.abs(cz) < 8) continue;

      const w = 8 + rand() * 6;
      const d = 8 + rand() * 6;
      const h = 6 + rand() * 22;
      const hue = 0.55 + rand() * 0.12;

      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat(hue));
      b.position.set(cx, h / 2, cz);
      b.castShadow = true;
      b.receiveShadow = true;
      group.add(b);

      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(w + 1.2, 0.22, d + 1.2),
        new THREE.MeshStandardMaterial({ color: '#6b7280', roughness: 0.85 }),
      );
      curb.position.set(cx, 0.11, cz);
      curb.receiveShadow = true;
      group.add(curb);

      // Windows
      const rows = Math.floor(h / 2.5);
      const cols = Math.floor(w / 2.2);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() > 0.72) continue;
          const win = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), windowMat());
          win.position.set(
            cx - w / 2 + 1.2 + c * 2.2,
            1.5 + r * 2.5,
            cz + d / 2 + 0.06,
          );
          win.rotation.y = 0;
          group.add(win);
        }
      }

      colliders.push({
        minX: cx - w / 2,
        maxX: cx + w / 2,
        minZ: cz - d / 2,
        maxZ: cz + d / 2,
        mesh: b,
      });
    }
  }

  scene.add(group);

  function checkCarCollision(x, z) {
    const hw = 1.15;
    const hd = 2.25;
    for (const b of colliders) {
      if (x + hw > b.minX && x - hw < b.maxX && z + hd > b.minZ && z - hd < b.maxZ) {
        return b;
      }
    }
    return null;
  }

  return { group, colliders, checkCarCollision, worldHalf: WORLD_HALF };
}
