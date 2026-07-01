/**
 * Real WebGL 3D world — volumetric meshes with sprite-pack textures.
 */
import * as THREE from 'three';
import { getSpritePack } from './spritePack.js';
import {
  MAP_W,
  MAP_H,
  getHeightAt,
  isLake,
  worldTileAt,
  worldIsWall,
  worldIsBarrier,
} from './world3d.js';
import { getCampfireRadius } from './campfire.js';

const FOV_DEG = (Math.PI / 2.6) * (180 / Math.PI);

let renderer = null;
let scene = null;
let camera = null;
let sun = null;
let ambient = null;
let webglCanvas = null;

let staticGroup = null;
let entityGroup = null;
let lastBarrierKey = '';
const treeMeshes = new Map();
const duckMeshes = new Map();
let campfireMesh = null;
let campfireRangeRing = null;
const kidMeshes = new Map();
let kidMaterial = null;

function mapToWorld(x, y, elev = 0) {
  return new THREE.Vector3(x, elev, y);
}

export function createTreeMesh(materials) {
  const group = new THREE.Group();
  group.name = 'tree';

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.48, 4.2, 10),
    materials.bark,
  );
  trunk.position.y = 2.1;
  trunk.castShadow = true;
  group.add(trunk);

  const layers = [
    { r: 2.1, h: 2.4, y: 4.0 },
    { r: 1.75, h: 2.1, y: 5.8 },
    { r: 1.4, h: 1.8, y: 7.3 },
    { r: 1.05, h: 1.5, y: 8.5 },
    { r: 0.65, h: 1.1, y: 9.6 },
  ];

  layers.forEach((layer) => {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(layer.r, layer.h, 10),
      materials.leaves,
    );
    cone.position.y = layer.y;
    cone.castShadow = true;
    group.add(cone);
  });

  const roots = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.25, 8),
    materials.bark,
  );
  roots.position.y = 0.12;
  group.add(roots);

  return group;
}

export function createDuckMesh(materials) {
  const group = new THREE.Group();
  group.name = 'duck';

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 14, 12),
    materials.duckBody,
  );
  body.scale.set(1.35, 0.72, 1.05);
  body.position.y = 0.22;
  body.castShadow = true;
  group.add(body);

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.09, 0.22, 8),
    materials.duckBody,
  );
  neck.position.set(0.28, 0.38, 0);
  neck.rotation.z = -0.35;
  group.add(neck);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 12, 10),
    materials.duckBody,
  );
  head.position.set(0.42, 0.48, 0);
  group.add(head);

  const bill = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.18, 6),
    materials.duckBill,
  );
  bill.rotation.z = Math.PI / 2;
  bill.position.set(0.58, 0.46, 0);
  group.add(bill);

  const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 6, 6),
    materials.duckEye,
  );
  eye.position.set(0.48, 0.52, 0.08);
  group.add(eye);

  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.18, 4),
    materials.duckBody,
  );
  tail.rotation.x = Math.PI / 2.5;
  tail.position.set(-0.38, 0.28, 0);
  group.add(tail);

  return group;
}

function initRenderer(width, height, overlayCanvas) {
  webglCanvas = document.createElement('canvas');
  webglCanvas.id = 'world-webgl';
  webglCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;display:block';
  overlayCanvas.style.position = 'fixed';
  overlayCanvas.style.zIndex = '1';
  overlayCanvas.style.pointerEvents = 'auto';
  document.body.insertBefore(webglCanvas, overlayCanvas);

  renderer = new THREE.WebGLRenderer({ canvas: webglCanvas, antialias: true });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7dd3fc);
  scene.fog = new THREE.Fog(0xbbf7d0, 18, 42);

  camera = new THREE.PerspectiveCamera(FOV_DEG, width / height, 0.08, 80);
  camera.rotation.order = 'YXZ';

  ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  sun = new THREE.DirectionalLight(0xfff4d6, 0.85);
  sun.position.set(12, 22, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 50;
  sun.shadow.camera.left = -20;
  sun.shadow.camera.right = 20;
  sun.shadow.camera.top = 20;
  sun.shadow.camera.bottom = -20;
  scene.add(sun);

  staticGroup = new THREE.Group();
  entityGroup = new THREE.Group();
  scene.add(staticGroup);
  scene.add(entityGroup);
}

function rebuildStatic(world, materials) {
  const key = `${world.barrierLevel}-${world.barrierBounds.minX}-${world.barrierBounds.maxX}-${world.barrierBounds.minY}-${world.barrierBounds.maxY}`;
  if (key === lastBarrierKey && staticGroup.children.length > 0) return;
  lastBarrierKey = key;

  while (staticGroup.children.length) staticGroup.remove(staticGroup.children[0]);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP_W, MAP_H),
    materials.grass,
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(MAP_W / 2, 0, MAP_H / 2);
  ground.receiveShadow = true;
  staticGroup.add(ground);

  for (let ty = 0; ty < MAP_H; ty += 1) {
    for (let tx = 0; tx < MAP_W; tx += 1) {
      const elev = getHeightAt(tx, ty);
      const tile = worldTileAt(tx, ty);

      if (isLake(tx, ty)) {
        const water = new THREE.Mesh(
          new THREE.BoxGeometry(0.98, 0.12, 0.98),
          materials.water,
        );
        water.position.set(tx + 0.5, -0.04, ty + 0.5);
        staticGroup.add(water);
        continue;
      }

      if (tile === 'T') {
        const moundH = elev >= 3 ? 2.8 : elev >= 2 ? 1.6 : 0.9;
        const rock = new THREE.Mesh(
          new THREE.ConeGeometry(0.85 + elev * 0.15, moundH, 6),
          materials.mountain,
        );
        rock.position.set(tx + 0.5, moundH / 2, ty + 0.5);
        staticGroup.add(rock);
        continue;
      }

      if (worldIsBarrier(tx, ty, world)) {
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(1, 2.4, 1),
          materials.barrier,
        );
        wall.position.set(tx + 0.5, 1.2, ty + 0.5);
        wall.castShadow = true;
        staticGroup.add(wall);
        continue;
      }

      if (worldIsWall(tx, ty, world) && tile === 'M') {
        const wallH = 2.2 + elev * 0.4;
        const mat = (tx + ty) % 2 ? materials.wallAlt : materials.wall;
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(1, wallH, 1),
          mat,
        );
        wall.position.set(tx + 0.5, wallH / 2, ty + 0.5);
        wall.castShadow = true;
        staticGroup.add(wall);
      }
    }
  }
}

function syncTrees(world, materials) {
  const active = new Set();

  world.trees.forEach((tree) => {
    if (tree.chopped) return;
    active.add(tree.id);

    if (!treeMeshes.has(tree.id)) {
      const mesh = createTreeMesh(materials);
      treeMeshes.set(tree.id, mesh);
      entityGroup.add(mesh);
    }

    const mesh = treeMeshes.get(tree.id);
    mesh.position.set(tree.x, 0, tree.y);
    const progress = tree.chopProgress ?? 0;
    mesh.rotation.z = Math.sin(progress * Math.PI) * 0.4;
    mesh.scale.set(1, 1 - progress * 0.2, 1);
    mesh.visible = true;
  });

  treeMeshes.forEach((mesh, id) => {
    if (!active.has(id)) {
      mesh.visible = false;
    }
  });
}

function syncDucks(world, materials) {
  const active = new Set();

  world.wildDucks.forEach((duck) => {
    if (duck.collected) return;
    active.add(duck.id);

    if (!duckMeshes.has(duck.id)) {
      const mesh = createDuckMesh(materials);
      duckMeshes.set(duck.id, mesh);
      entityGroup.add(mesh);
    }

    const mesh = duckMeshes.get(duck.id);
    const onWater = !duck.onLand && isLake(Math.floor(duck.x), Math.floor(duck.y));
    mesh.position.set(duck.x, onWater ? -0.02 : 0, duck.y);
    mesh.rotation.y = -duck.waddle * 0.3;
    mesh.visible = true;
  });

  duckMeshes.forEach((mesh, id) => {
    if (!active.has(id)) mesh.visible = false;
  });
}

function syncCampfire(world, materials) {
  if (!campfireMesh) {
    const logs = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.55, 0.2, 10),
      materials.bark,
    );
    logs.rotation.x = Math.PI / 2;
    const fire = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 0.9, 8),
      new THREE.MeshBasicMaterial({ color: 0xf97316 }),
    );
    fire.position.y = 0.55;
    campfireMesh = new THREE.Group();
    campfireMesh.add(logs);
    campfireMesh.add(fire);
    entityGroup.add(campfireMesh);
  }

  const r = getCampfireRadius(world.campfire);
  campfireMesh.scale.setScalar(0.7 + r * 0.9);
  campfireMesh.position.set(world.campfire.x, 0, world.campfire.y);

  if (!campfireRangeRing) {
    campfireRangeRing = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 1, 64),
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.42,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    campfireRangeRing.rotation.x = -Math.PI / 2;
    entityGroup.add(campfireRangeRing);
  }

  const inner = Math.max(0.08, r * 0.86);
  campfireRangeRing.geometry.dispose();
  campfireRangeRing.geometry = new THREE.RingGeometry(inner, r, 72);
  campfireRangeRing.position.set(world.campfire.x, 0.07, world.campfire.y);
  const flash = world.campfire.expandFlash ?? 0;
  campfireRangeRing.material.opacity = flash > 0 ? 0.72 : 0.42;
  campfireRangeRing.material.color.setHex(flash > 0 ? 0xfbbf24 : 0xf97316);
  campfireRangeRing.scale.setScalar(flash > 0 ? 1.08 : 1);
}

function syncKids(gameState) {
  const active = new Set();
  if (!kidMaterial) kidMaterial = new THREE.MeshLambertMaterial({ color: 0x6366f1 });

  gameState.kids.forEach((kid) => {
    if (kid.defeated) return;
    active.add(kid.doorId);

    if (!kidMeshes.has(kid.doorId)) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.1, 0.35), kidMaterial);
      body.position.y = 0.55;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), kidMaterial);
      head.position.y = 1.25;
      const group = new THREE.Group();
      group.add(body);
      group.add(head);
      kidMeshes.set(kid.doorId, group);
      entityGroup.add(group);
    }

    const mesh = kidMeshes.get(kid.doorId);
    mesh.position.set(kid.x, 0, kid.y);
    mesh.visible = true;
  });

  kidMeshes.forEach((mesh, id) => {
    if (!active.has(id)) mesh.visible = false;
  });
}

function updateLighting(isNight) {
  if (isNight) {
    scene.background.set(0x0c4a6e);
    scene.fog.color.set(0x14532d);
    scene.fog.near = 10;
    ambient.intensity = 0.28;
    ambient.color.set(0x93c5fd);
    sun.intensity = 0.15;
    sun.color.set(0x7dd3fc);
  } else {
    scene.background.set(0x7dd3fc);
    scene.fog.color.set(0xbbf7d0);
    scene.fog.near = 18;
    ambient.intensity = 0.55;
    ambient.color.set(0xffffff);
    sun.intensity = 0.85;
    sun.color.set(0xfff4d6);
  }
}

function updateCamera(player) {
  const eyeY = 1.5 + player.height * 0.35;
  camera.position.set(player.x, eyeY, player.y);
  camera.rotation.y = Math.PI / 2 - player.angle;
  camera.rotation.x = 0;
}

export function renderThreeWorld(world, gameState, width, height, overlayCanvas) {
  if (!renderer) initRenderer(width, height, overlayCanvas);

  if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const { materials } = getSpritePack();
  const isNight = gameState.phase === 'NIGHT';

  rebuildStatic(world, materials);
  syncTrees(world, materials);
  syncDucks(world, materials);
  syncCampfire(world, materials);
  syncKids(gameState);
  updateLighting(isNight);
  updateCamera(world.player);

  renderer.render(scene, camera);
}

export function disposeThreeWorld() {
  if (renderer) {
    renderer.dispose();
    webglCanvas?.remove();
    renderer = null;
    scene = null;
    treeMeshes.clear();
    duckMeshes.clear();
    kidMeshes.clear();
    campfireMesh = null;
    campfireRangeRing = null;
    lastBarrierKey = '';
  }
}
