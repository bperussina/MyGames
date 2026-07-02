import * as THREE from 'three';

const WORLD_HALF = 80;

export function createScene3d(parent = document.body) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.id = 'world-canvas';
  renderer.domElement.style.display = 'none';
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.inset = '0';
  parent.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#87ceeb');
  scene.fog = new THREE.Fog('#87ceeb', 40, 120);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);

  const hemi = new THREE.HemisphereLight('#dff6ff', '#3d7a36', 0.85);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff8e7', 1.1);
  sun.position.set(20, 35, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -50;
  sun.shadow.camera.right = 50;
  sun.shadow.camera.top = 50;
  sun.shadow.camera.bottom = -50;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(WORLD_HALF * 2, WORLD_HALF * 2),
    new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.92 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(WORLD_HALF * 2, 40, '#15803d', '#16a34a');
  grid.position.y = 0.02;
  scene.add(grid);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', resize);

  function updateCamera(targetX, targetZ, rotY = 0) {
    const yaw = rotY + cameraYaw;
    const camX = targetX - Math.sin(yaw) * camDist;
    const camZ = targetZ - Math.cos(yaw) * camDist;
    camera.position.set(camX, camHeight, camZ);
    camera.lookAt(targetX, 1.2, targetZ);
  }

  function updateDrivingCamera(targetX, targetZ, rotY) {
    const dist = 10;
    const height = 5;
    const camX = targetX - Math.sin(rotY) * dist;
    const camZ = targetZ - Math.cos(rotY) * dist;
    camera.position.set(camX, height, camZ);
    camera.lookAt(targetX, 1.0, targetZ);
  }

  let cameraYaw = 0;
  const camDist = 14;
  const camHeight = 9;

  function show() {
    renderer.domElement.style.display = 'block';
  }

  function hide() {
    renderer.domElement.style.display = 'none';
  }

  function render() {
    renderer.render(scene, camera);
  }

  function clampPosition(x, z) {
    return {
      x: Math.max(-WORLD_HALF + 2, Math.min(WORLD_HALF - 2, x)),
      z: Math.max(-WORLD_HALF + 2, Math.min(WORLD_HALF - 2, z)),
    };
  }

  return {
    scene,
    camera,
    renderer,
    show,
    hide,
    resize,
    render,
    updateCamera,
    updateDrivingCamera,
    clampPosition,
    worldHalf: WORLD_HALF,
  };
}
