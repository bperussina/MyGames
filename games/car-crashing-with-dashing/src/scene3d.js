import * as THREE from 'three';
import { getMouseLookOffset } from './mouseLook.js';
import { buildCity } from './city.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createScene3d(parent = document.body) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.id = 'world-canvas';
  renderer.domElement.style.display = 'none';
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.inset = '0';
  parent.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#87a8c4');
  scene.fog = new THREE.Fog('#9eb4c8', 65, 145);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 220);

  const hemi = new THREE.HemisphereLight('#dce8ff', '#3d4a5c', 0.55);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff8ee', 1.45);
  sun.position.set(30, 48, 18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -60;
  sun.shadow.camera.right = 60;
  sun.shadow.camera.top = 60;
  sun.shadow.camera.bottom = -60;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  const fill = new THREE.DirectionalLight('#a8b8d0', 0.35);
  fill.position.set(-22, 18, -14);
  scene.add(fill);

  const rim = new THREE.DirectionalLight('#ffeedd', 0.25);
  rim.position.set(-10, 8, 30);
  scene.add(rim);

  const city = buildCity(scene);

  const camSmooth = { x: 0, z: 0, lookY: 1.05 };
  let cameraYaw = 0;
  const camDist = 14;
  const camHeight = 9;

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', resize);

  function updateCamera(targetX, targetZ, rotY = 0) {
    const look = getMouseLookOffset();
    const yaw = rotY + cameraYaw + look.yaw;
    const pitch = look.pitch;
    const horiz = Math.cos(pitch) * camDist;
    const camX = targetX - Math.sin(yaw) * horiz;
    const camZ = targetZ - Math.cos(yaw) * horiz;
    const camY = camHeight + Math.sin(pitch) * camDist * 0.45;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(targetX, 1.2 + pitch * 1.5, targetZ);
  }

  function updateDrivingCamera(targetX, targetZ, rotY, shake = 0) {
    camSmooth.x += (targetX - camSmooth.x) * 0.14;
    camSmooth.z += (targetZ - camSmooth.z) * 0.14;
    camSmooth.lookY += (1.05 - camSmooth.lookY) * 0.1;

    const look = getMouseLookOffset();
    const dist = 9.5;
    const height = 4.6;
    const yaw = rotY + look.yaw;
    const pitch = look.pitch;
    const horiz = Math.cos(pitch) * dist;
    const shakeX = shake > 0 ? (Math.random() - 0.5) * shake * 0.28 : 0;
    const shakeY = shake > 0 ? (Math.random() - 0.5) * shake * 0.2 : 0;
    const camX = camSmooth.x - Math.sin(yaw) * horiz + shakeX;
    const camZ = camSmooth.z - Math.cos(yaw) * horiz + shakeX * 0.4;
    const camY = height + Math.sin(pitch) * dist * 0.32 + shakeY;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(camSmooth.x, camSmooth.lookY + shakeY * 0.25, camSmooth.z);
  }

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
    const h = city.worldHalf - 2;
    return {
      x: Math.max(-h, Math.min(h, x)),
      z: Math.max(-h, Math.min(h, z)),
    };
  }

  return {
    scene,
    camera,
    renderer,
    city,
    envTex,
    show,
    hide,
    resize,
    render,
    updateCamera,
    updateDrivingCamera,
    clampPosition,
    worldHalf: city.worldHalf,
  };
}
