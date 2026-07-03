import * as THREE from 'three';
import { getMouseLookOffset } from './mouseLook.js';
import { buildCity } from './city.js';

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
  scene.background = new THREE.Color('#6b8cae');
  scene.fog = new THREE.Fog('#8aa4c0', 50, 130);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);

  const hemi = new THREE.HemisphereLight('#c8e0ff', '#4a5568', 0.75);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff4e0', 1.2);
  sun.position.set(25, 40, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -55;
  sun.shadow.camera.right = 55;
  sun.shadow.camera.top = 55;
  sun.shadow.camera.bottom = -55;
  sun.shadow.bias = -0.0002;
  scene.add(sun);

  const fill = new THREE.DirectionalLight('#8899bb', 0.4);
  fill.position.set(-18, 14, -12);
  scene.add(fill);

  const city = buildCity(scene);

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
    const look = getMouseLookOffset();
    const dist = 10;
    const height = 5;
    const yaw = rotY + look.yaw;
    const pitch = look.pitch;
    const horiz = Math.cos(pitch) * dist;
    const shakeX = shake > 0 ? (Math.random() - 0.5) * shake * 0.35 : 0;
    const shakeY = shake > 0 ? (Math.random() - 0.5) * shake * 0.25 : 0;
    const camX = targetX - Math.sin(yaw) * horiz + shakeX;
    const camZ = targetZ - Math.cos(yaw) * horiz + shakeX * 0.5;
    const camY = height + Math.sin(pitch) * dist * 0.35 + shakeY;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(targetX, 1.0 + shakeY * 0.3, targetZ);
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
