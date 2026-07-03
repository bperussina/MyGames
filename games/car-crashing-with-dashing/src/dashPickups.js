import * as THREE from 'three';

const PICKUP_COUNT = 10;
const SPAWN_CHANCE = 0.5;
const COLLECT_RADIUS = 2.4;
const LABEL_HEIGHT = 2.2;
const SUPER_MAX_SPEED = 92;
const SUPER_ACCEL_MULT = 1.6;

const PICKUP_SPOTS = [
  [24, 18], [-30, 22], [45, -35], [-50, 40], [12, -55],
  [-65, -20], [70, 55], [-15, 75], [88, -12], [-40, -70],
];

function makeDashingLabel() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const c = canvas.getContext('2d');
  c.fillStyle = 'rgba(15,23,42,0.55)';
  c.beginPath();
  c.roundRect(8, 8, 240, 56, 10);
  c.fill();
  c.fillStyle = '#ffffff';
  c.font = 'bold 34px system-ui,sans-serif';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('Dashing', 128, 38);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.6, 1.0, 1);
  sprite.renderOrder = 10;
  return sprite;
}

function makePickupMesh() {
  const group = new THREE.Group();
  const disk = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.15, 0.18, 28),
    new THREE.MeshLambertMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      flatShading: true,
    }),
  );
  disk.position.y = 0.1;
  group.add(disk);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.08, 8, 28),
    new THREE.MeshLambertMaterial({ color: 0x60a5fa, flatShading: true }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.18;
  group.add(ring);

  const label = makeDashingLabel();
  label.position.y = LABEL_HEIGHT;
  group.add(label);

  return group;
}

function seededRand(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createDashSystem(scene, { getPlayerId, isHost, send, relay }) {
  const group = new THREE.Group();
  group.name = 'dash-pickups';
  scene.add(group);

  let pickups = [];
  let scores = {};
  let superDashOn = false;
  let bobT = 0;
  let sessionActive = false;

  function playerId() {
    return getPlayerId?.() ?? 'local';
  }

  function broadcastState() {
    send?.({
      t: 'dashState',
      pickups: pickups.map((p) => ({ id: p.id, x: p.x, z: p.z, active: p.active })),
      scores,
    });
  }

  function reset(seed = Date.now()) {
    pickups = [];
    scores = {};
    superDashOn = false;
    sessionActive = false;
    while (group.children.length) group.remove(group.children[0]);

    const rand = seededRand(seed);
    sessionActive = true;

    for (let i = 0; i < PICKUP_COUNT; i++) {
      if (rand() >= SPAWN_CHANCE) continue;
      const [x, z] = PICKUP_SPOTS[i];
      const mesh = makePickupMesh();
      mesh.position.set(x, 0, z);
      group.add(mesh);
      pickups.push({ id: i, x, z, active: true, mesh, bob: rand() * Math.PI * 2, pending: false });
    }

    if (isHost?.()) broadcastState();
  }

  function isSessionActive() {
    return pickups.length > 0;
  }

  function applyRemoteState(msg) {
    if (!msg?.pickups) return;
    sessionActive = msg.pickups.length > 0;
    scores = { ...(msg.scores ?? {}) };
    while (group.children.length) group.remove(group.children[0]);
    pickups = msg.pickups.map((p) => {
      const mesh = p.active ? makePickupMesh() : null;
      if (mesh) {
        mesh.position.set(p.x, 0, p.z);
        group.add(mesh);
      }
      return { id: p.id, x: p.x, z: p.z, active: p.active, mesh, bob: 0, pending: false };
    });
  }

  function collect(pickup) {
    if (!pickup.active) return;
    pickup.active = false;
    if (pickup.mesh) {
      group.remove(pickup.mesh);
      pickup.mesh = null;
    }
    const id = playerId();
    scores[id] = (scores[id] ?? 0) + 1;
    showToast?.('Dashing +1!');
    if (isHost?.()) {
      broadcastState();
    } else {
      send?.({ t: 'dashCollect', pickupId: pickup.id, playerId: id });
    }
  }

  function handleCollectRequest(msg) {
    if (!isHost?.()) return;
    const pickup = pickups.find((p) => p.id === msg.pickupId && p.active);
    if (!pickup) return;
    pickup.active = false;
    if (pickup.mesh) {
      group.remove(pickup.mesh);
      pickup.mesh = null;
    }
    scores[msg.playerId] = (scores[msg.playerId] ?? 0) + 1;
    broadcastState();
  }

  function handleMessage(msg) {
    if (msg.t === 'dashState') applyRemoteState(msg);
    if (msg.t === 'dashCollect') handleCollectRequest(msg);
  }

  function getScores() {
    return { ...scores };
  }

  function getLeaderIds() {
    const entries = Object.entries(scores);
    if (!entries.length) return [];
    const max = Math.max(...entries.map(([, n]) => n));
    if (max <= 0) return [];
    return entries.filter(([, n]) => n === max).map(([id]) => id);
  }

  function isLocalLeader() {
    const leaders = getLeaderIds();
    return leaders.includes(playerId());
  }

  function toggleSuperDash() {
    if (!isLocalLeader()) return false;
    superDashOn = !superDashOn;
    return superDashOn;
  }

  function setSuperDash(on) {
    superDashOn = !!on;
  }

  function isSuperDashOn() {
    return superDashOn;
  }

  function update(delta, vehicle) {
    bobT += delta;
    for (const p of pickups) {
      if (!p.active || !p.mesh) continue;
      p.mesh.position.y = Math.sin(bobT * 2.8 + p.bob) * 0.12;
      p.mesh.children[0].rotation.y += delta * 1.6;
    }

    if (!vehicle || !sessionActive) return;
    for (const p of pickups) {
      if (!p.active) continue;
      const dx = vehicle.x - p.x;
      const dz = vehicle.z - p.z;
      if (dx * dx + dz * dz <= COLLECT_RADIUS * COLLECT_RADIUS) {
        if (p.pending) break;
        if (isHost?.() ?? true) {
          collect(p);
        } else {
          p.pending = true;
          send?.({ t: 'dashCollect', pickupId: p.id, playerId: playerId() });
        }
        break;
      }
    }
  }

  let showToast = null;
  function setToast(fn) {
    showToast = fn;
  }

  return {
    group,
    reset,
    update,
    getScores,
    getLeaderIds,
    isLocalLeader,
    isSuperDashOn,
    toggleSuperDash,
    setSuperDash,
    handleMessage,
    setToast,
    syncState: broadcastState,
    isSessionActive: () => sessionActive,
    SUPER_MAX_SPEED,
    SUPER_ACCEL_MULT,
  };
}
