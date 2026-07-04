import * as THREE from 'three';
import { worldSpaceHalfExtents, aabbOverlaps } from './carCollision.js';

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

/** Alley walls with fixed gap widths — slim cars squeeze through, wide cars don't. */
function buildNarrowAlleys(group, colliders) {
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.88, metalness: 0.05 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.5, emissive: 0x422006, emissiveIntensity: 0.15 });

  const alleys = [
    { cx: -52, cz: 12, gap: 1.72, len: 28, axis: 'x', label: 'Ultra-tight' },
    { cx: 48, cz: -38, gap: 2.05, len: 24, axis: 'x', label: 'Narrow' },
    { cx: -18, cz: -58, gap: 2.45, len: 22, axis: 'z', label: 'Tight' },
    { cx: 62, cz: 48, gap: 2.85, len: 26, axis: 'z', label: 'Medium' },
    { cx: -72, cz: -28, gap: 1.72, len: 20, axis: 'x', label: 'Ultra-tight' },
    { cx: 28, cz: 68, gap: 2.05, len: 22, axis: 'z', label: 'Narrow' },
  ];

  for (const alley of alleys) {
    const h = 5.5;
    const thick = 1.1;
    const halfGap = alley.gap * 0.5;
    const halfLen = alley.len * 0.5;

    if (alley.axis === 'x') {
      for (const side of [-1, 1]) {
        const wx = alley.cx + side * (halfGap + thick * 0.5);
        const wall = new THREE.Mesh(new THREE.BoxGeometry(thick, h, alley.len), wallMat);
        wall.position.set(wx, h / 2, alley.cz);
        wall.castShadow = true;
        group.add(wall);
        colliders.push({
          minX: wx - thick / 2,
          maxX: wx + thick / 2,
          minZ: alley.cz - halfLen,
          maxZ: alley.cz + halfLen,
          alley: true,
        });
      }
      const sign = new THREE.Mesh(new THREE.BoxGeometry(alley.gap * 0.85, 0.35, 0.12), trimMat);
      sign.position.set(alley.cx, h + 0.6, alley.cz - halfLen + 1.2);
      group.add(sign);
    } else {
      for (const side of [-1, 1]) {
        const wz = alley.cz + side * (halfGap + thick * 0.5);
        const wall = new THREE.Mesh(new THREE.BoxGeometry(alley.len, h, thick), wallMat);
        wall.position.set(alley.cx, h / 2, wz);
        wall.castShadow = true;
        group.add(wall);
        colliders.push({
          minX: alley.cx - halfLen,
          maxX: alley.cx + halfLen,
          minZ: wz - thick / 2,
          maxZ: wz + thick / 2,
          alley: true,
        });
      }
      const sign = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, alley.gap * 0.85), trimMat);
      sign.position.set(alley.cx - halfLen + 1.2, h + 0.6, alley.cz);
      group.add(sign);
    }
  }
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
  asphalt.position.y = 0.04;
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

  buildNarrowAlleys(group, colliders);

  scene.add(group);

  function checkCarCollision(x, z, rotY = 0, hw = 1.15, hd = 2.25) {
    const { halfX, halfZ } = worldSpaceHalfExtents(rotY, hw, hd);

    if (Math.abs(x) + halfX > WORLD_HALF || Math.abs(z) + halfZ > WORLD_HALF) {
      return { kind: 'wall' };
    }

    for (const b of colliders) {
      if (aabbOverlaps(x, z, halfX, halfZ, b)) {
        return { kind: 'building', collider: b, alley: b.alley === true };
      }
    }
    return null;
  }

  function isInCity(x, z) {
    return Math.abs(x) <= WORLD_HALF && Math.abs(z) <= WORLD_HALF;
  }

  return { group, colliders, checkCarCollision, isInCity, worldHalf: WORLD_HALF };
}
