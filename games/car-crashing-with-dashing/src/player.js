import * as THREE from 'three';

const SKIN = 0xe8b88a;
const SHIRT = 0x3b82f6;
const SHIRT_DARK = 0x2563eb;
const PANTS = 0x1e3a8a;
const PANTS_DARK = 0x172554;

function mat(color, roughness = 0.55) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 });
}

function limbMesh(length, radius, color) {
  const geo = new THREE.CylinderGeometry(radius, radius * 0.95, length, 10);
  geo.translate(0, -length / 2, 0);
  const mesh = new THREE.Mesh(geo, mat(color));
  mesh.castShadow = true;
  return mesh;
}

function jointBall(radius, color) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 10, 10), mat(color));
  mesh.castShadow = true;
  return mesh;
}

function buildLimb(upperLen, upperRad, lowerLen, lowerRad, colors) {
  const root = new THREE.Group();
  const upper = limbMesh(upperLen, upperRad, colors[0]);
  root.add(upper);

  const knee = new THREE.Group();
  knee.position.y = -upperLen;
  const lower = limbMesh(lowerLen, lowerRad, colors[1]);
  knee.add(lower);

  const foot = jointBall(lowerRad * 0.85, SKIN);
  foot.position.y = -lowerLen;
  knee.add(foot);

  root.add(knee);
  return { root, knee };
}

function shirtShade(color) {
  const c = new THREE.Color(color);
  c.multiplyScalar(0.75);
  return c.getHex();
}

export function createPlayer(x = 0, z = 0, shirtColor = SHIRT) {
  const shirtDark = shirtShade(shirtColor);
  const mesh = new THREE.Group();

  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.48, 1.35, 14),
    mat(shirtColor),
  );
  torso.position.y = 1.35;
  torso.castShadow = true;
  mesh.add(torso);

  const neck = limbMesh(0.22, 0.14, SKIN);
  neck.position.y = 2.05;
  mesh.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), mat(SKIN, 0.48));
  head.position.y = 2.45;
  head.castShadow = true;
  mesh.add(head);

  const shoulderY = 1.95;
  const hipY = 0.72;
  const shoulderSpread = 0.48;
  const hipSpread = 0.28;

  const armL = buildLimb(0.42, 0.13, 0.38, 0.11, [shirtColor, shirtDark]);
  armL.root.position.set(-shoulderSpread, shoulderY, 0);
  mesh.add(armL.root);
  const armCapL = jointBall(0.14, shirtColor);
  armCapL.position.set(-shoulderSpread, shoulderY, 0);
  mesh.add(armCapL);

  const armR = buildLimb(0.42, 0.13, 0.38, 0.11, [shirtDark, shirtColor]);
  armR.root.position.set(shoulderSpread, shoulderY, 0);
  mesh.add(armR.root);
  const armCapR = jointBall(0.14, shirtColor);
  armCapR.position.set(shoulderSpread, shoulderY, 0);
  mesh.add(armCapR);

  const legL = buildLimb(0.48, 0.15, 0.44, 0.13, [PANTS_DARK, PANTS]);
  legL.root.position.set(-hipSpread, hipY, 0);
  mesh.add(legL.root);

  const legR = buildLimb(0.48, 0.15, 0.44, 0.13, [PANTS, PANTS_DARK]);
  legR.root.position.set(hipSpread, hipY, 0);
  mesh.add(legR.root);

  mesh.position.set(x, 0, z);

  return {
    x,
    z,
    facing: 0,
    walkPhase: 0,
    isMoving: false,
    inVehicle: null,
    dead: false,
    mesh,
    limbs: { armL, armR, legL, legR },
  };
}

export function updatePlayer(player, mx, mz, delta) {
  const len = Math.hypot(mx, mz);
  player.isMoving = len > 0.01;
  if (player.isMoving) {
    player.facing = Math.atan2(-mx, -mz);
    player.walkPhase += delta * 10.5;
  }
}

export function syncPlayerMesh(player) {
  const { mesh, limbs, walkPhase, isMoving, facing } = player;
  if (player.dead) {
    mesh.position.set(player.x, 0.12, player.z);
    mesh.rotation.y = facing;
    return;
  }
  if (player.inVehicle) return;

  mesh.position.set(player.x, 0, player.z);
  mesh.rotation.y = facing;

  const swing = isMoving ? Math.sin(walkPhase) : 0;
  const legSwing = swing * 0.55;
  const armSwing = swing * 0.42;
  const kneeL = isMoving ? 0.35 + Math.max(0, Math.sin(walkPhase + 0.5)) * 0.9 : 0.15;
  const kneeR = isMoving ? 0.35 + Math.max(0, Math.sin(walkPhase + Math.PI + 0.5)) * 0.9 : 0.15;
  const elbowL = isMoving ? 0.25 + Math.abs(Math.sin(walkPhase + Math.PI)) * 0.45 : 0.1;
  const elbowR = isMoving ? 0.25 + Math.abs(Math.sin(walkPhase)) * 0.45 : 0.1;

  limbs.legL.root.rotation.x = legSwing;
  limbs.legR.root.rotation.x = -legSwing;
  limbs.legL.knee.rotation.x = kneeL;
  limbs.legR.knee.rotation.x = kneeR;

  limbs.armL.root.rotation.x = -armSwing;
  limbs.armR.root.rotation.x = armSwing;
  limbs.armL.knee.rotation.x = -elbowL;
  limbs.armR.knee.rotation.x = -elbowR;

  const bob = isMoving ? Math.abs(Math.sin(walkPhase * 2)) * 0.06 : 0;
  mesh.position.y = bob;
}

export function addPlayerToScene(scene, player) {
  scene.add(player.mesh);
}
