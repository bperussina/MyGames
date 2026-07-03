import * as THREE from 'three';

export const WORLD_HALF = 108;

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

function buildGateway(group, axisZ, zPos, xPos = 0) {
  const gate = new THREE.Group();
  gate.name = 'city-gateway';
  const stone = new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.82, metalness: 0.12 });
  const trim = new THREE.MeshStandardMaterial({ color: 0xc5cdd4, roughness: 0.55, metalness: 0.25 });
  const pillarH = 32;
  const pillarW = 7;
  const span = 42;
  const depth = 8;

  for (const x of [-span / 2 + pillarW / 2, span / 2 - pillarW / 2]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(pillarW, pillarH, depth), stone);
    pillar.position.set(x, pillarH / 2, 0);
    pillar.castShadow = true;
    gate.add(pillar);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(pillarW + 1.2, 2.5, depth + 1), trim);
    cap.position.set(x, pillarH + 1.2, 0);
    gate.add(cap);
  }

  const lintel = new THREE.Mesh(new THREE.BoxGeometry(span, 5, depth + 1.5), stone);
  lintel.position.set(0, pillarH - 1.5, 0);
  lintel.castShadow = true;
  gate.add(lintel);

  const top = new THREE.Mesh(new THREE.BoxGeometry(span + 6, 4, depth + 2), trim);
  top.position.set(0, pillarH + 3, 0);
  gate.add(top);

  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(span * 0.55, 3.5, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x14532d, emissiveIntensity: 0.35 }),
  );
  sign.position.set(0, pillarH + 3, depth / 2 + 0.3);
  gate.add(sign);

  if (axisZ) {
    gate.position.set(xPos, 0, zPos);
  } else {
    gate.rotation.y = Math.PI / 2;
    gate.position.set(xPos, 0, zPos);
  }

  group.add(gate);
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

  const curbRing = new THREE.Mesh(
    new THREE.RingGeometry(WORLD_HALF - 4, WORLD_HALF, 64),
    new THREE.MeshStandardMaterial({ color: '#6b7280', roughness: 0.85 }),
  );
  curbRing.rotation.x = -Math.PI / 2;
  curbRing.position.y = 0.03;
  group.add(curbRing);

  for (let i = -5; i <= 5; i++) {
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

  for (let gx = -5; gx <= 5; gx++) {
    for (let gz = -5; gz <= 5; gz++) {
      if (gx === 0 && gz === 0) continue;
      const cx = gx * 20 + (rand() - 0.5) * 5;
      const cz = gz * 20 + (rand() - 0.5) * 5;
      if (Math.abs(cx) < 10 && Math.abs(cz) < 10) continue;
      if (Math.abs(cx) > WORLD_HALF - 18 || Math.abs(cz) > WORLD_HALF - 18) continue;

      const w = 8 + rand() * 8;
      const d = 8 + rand() * 8;
      const h = 8 + rand() * 28;
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

      const rows = Math.floor(h / 2.5);
      const cols = Math.floor(w / 2.2);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() > 0.72) continue;
          const win = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), windowMat());
          win.position.set(cx - w / 2 + 1.2 + c * 2.2, 1.5 + r * 2.5, cz + d / 2 + 0.06);
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

  const gateZ = WORLD_HALF - 22;
  const gateX = WORLD_HALF - 22;
  buildGateway(group, true, gateZ, 0);
  buildGateway(group, true, -gateZ, 0);
  buildGateway(group, false, 0, gateX);
  buildGateway(group, false, 0, -gateX);

  scene.add(group);

  function checkCarCollision(x, z) {
    if (Math.abs(x) > WORLD_HALF || Math.abs(z) > WORLD_HALF) return null;
    const hw = 1.15;
    const hd = 2.25;
    for (const b of colliders) {
      if (x + hw > b.minX && x - hw < b.maxX && z + hd > b.minZ && z - hd < b.maxZ) {
        return b;
      }
    }
    return null;
  }

  function isInCity(x, z) {
    return Math.abs(x) <= WORLD_HALF && Math.abs(z) <= WORLD_HALF;
  }

  return { group, colliders, checkCarCollision, isInCity, worldHalf: WORLD_HALF };
}
