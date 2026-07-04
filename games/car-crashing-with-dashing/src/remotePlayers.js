import { createPlayer, syncPlayerMesh } from './player.js';

const REMOTE_COLORS = [0xef4444, 0xf97316, 0xeab308, 0x22c55e, 0x06b6d4, 0xa855f7, 0xec4899];

export function createRemotePlayers(scene) {
  const peers = new Map();
  let colorIdx = 0;

  function nextColor() {
    const c = REMOTE_COLORS[colorIdx % REMOTE_COLORS.length];
    colorIdx += 1;
    return c;
  }

  function ensure(id) {
    if (peers.has(id)) return peers.get(id);
    const color = nextColor();
    const player = createPlayer(0, 0, color);
    player.mesh.userData.remoteId = id;
    scene.add(player.mesh);
    const entry = { player, target: { x: 0, z: 0, facing: 0, walkPhase: 0, isMoving: false } };
    peers.set(id, entry);
    return entry;
  }

  function applyPose(id, pose) {
    const entry = ensure(id);
    Object.assign(entry.target, pose);
    const p = entry.player;
    p.x = pose.x;
    p.z = pose.z;
    p.facing = pose.facing ?? 0;
    p.walkPhase = pose.walkPhase ?? 0;
    p.isMoving = Boolean(pose.isMoving);
    syncPlayerMesh(p);
  }

  function remove(id) {
    const entry = peers.get(id);
    if (!entry) return;
    scene.remove(entry.player.mesh);
    peers.delete(id);
  }

  function lerpAll(delta) {
    const t = Math.min(1, delta * 12);
    for (const [, entry] of peers) {
      const p = entry.player;
      const tgt = entry.target;
      p.x += (tgt.x - p.x) * t;
      p.z += (tgt.z - p.z) * t;
      p.facing += (tgt.facing - p.facing) * t;
      p.walkPhase = tgt.walkPhase;
      p.isMoving = tgt.isMoving;
      syncPlayerMesh(p);
    }
  }

  function clear() {
    for (const id of [...peers.keys()]) remove(id);
  }

  function forEach(callback) {
    for (const [id, entry] of peers) {
      callback(id, entry.player, entry.target);
    }
  }

  function tryShred(id, vehicle, { minSpeed, cooldownSec, onShred }) {
    const entry = peers.get(id);
    if (!entry) return false;
    entry.shredCooldown = entry.shredCooldown ?? 0;
    if (entry.shredCooldown > 0) return false;
    const speed = Math.abs(vehicle.speed);
    if (speed < minSpeed) return false;
    const dx = vehicle.x - entry.player.x;
    const dz = vehicle.z - entry.player.z;
    if (Math.hypot(dx, dz) > 3.8) return false;
    entry.shredCooldown = cooldownSec;
    onShred?.(id, entry.player);
    return true;
  }

  function tryGunHit(id, cooldownSec, onHit) {
    const entry = peers.get(id);
    if (!entry) return false;
    entry.shredCooldown = entry.shredCooldown ?? 0;
    if (entry.shredCooldown > 0) return false;
    entry.shredCooldown = cooldownSec;
    onHit?.(id, entry.player);
    return true;
  }

  function tickCooldowns(delta) {
    for (const [, entry] of peers) {
      if (entry.shredCooldown > 0) entry.shredCooldown = Math.max(0, entry.shredCooldown - delta);
    }
  }

  return { applyPose, remove, lerpAll, clear, count: () => peers.size, forEach, tryShred, tryGunHit, tickCooldowns };
}
