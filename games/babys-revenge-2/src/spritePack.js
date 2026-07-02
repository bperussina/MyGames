/**
 * Procedural sprite-pack textures applied to real 3D mesh materials.
 */
import * as THREE from 'three';

function paintTexture(draw, size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBarkTexture() {
  return paintTexture((ctx, s) => {
    ctx.fillStyle = '#4a2f1a';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 40; i += 1) {
      ctx.strokeStyle = `rgba(0,0,0,${0.15 + Math.random() * 0.2})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(Math.random() * s, 0);
      ctx.lineTo(Math.random() * s, s);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i += 1) {
      ctx.fillStyle = `rgba(90,55,30,${0.3 + Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 4 + Math.random() * 8, 2);
    }
  });
}

function makeLeavesTexture() {
  return paintTexture((ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, '#2d6a4f');
    g.addColorStop(0.5, '#40916c');
    g.addColorStop(1, '#1b4332');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 80; i += 1) {
      ctx.fillStyle = `rgba(${30 + Math.random() * 40},${100 + Math.random() * 80},${50 + Math.random() * 40},0.35)`;
      ctx.beginPath();
      ctx.ellipse(Math.random() * s, Math.random() * s, 3 + Math.random() * 6, 2 + Math.random() * 4, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function makeDuckBodyTexture() {
  return paintTexture((ctx, s) => {
    const g = ctx.createRadialGradient(s * 0.35, s * 0.35, 4, s * 0.5, s * 0.5, s * 0.55);
    g.addColorStop(0, '#fde047');
    g.addColorStop(0.55, '#eab308');
    g.addColorStop(1, '#a16207');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.ellipse(s * 0.35, s * 0.3, s * 0.15, s * 0.08, -0.5, 0, Math.PI * 2);
    ctx.fill();
  }, 64);
}

function makeDuckBillTexture() {
  return paintTexture((ctx, s) => {
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(0, s * 0.5, s, s * 0.5);
  }, 32);
}

function makeWaterTexture() {
  return paintTexture((ctx, s) => {
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 6) {
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + (y % 12) * 0.01})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= s; x += 8) {
        ctx.lineTo(x, y + Math.sin(x * 0.15) * 2);
      }
      ctx.stroke();
    }
  });
}

function makeGrassTexture() {
  return paintTexture((ctx, s) => {
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 120; i += 1) {
      ctx.strokeStyle = `rgba(21,${100 + Math.random() * 80},${40 + Math.random() * 40},0.5)`;
      const x = Math.random() * s;
      const y = Math.random() * s;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 4, y - 3 - Math.random() * 5);
      ctx.stroke();
    }
  });
}

let pack = null;

export function getSpritePack() {
  if (pack) return pack;

  const bark = makeBarkTexture();
  bark.wrapS = bark.wrapT = THREE.RepeatWrapping;
  bark.repeat.set(1, 3);

  const leaves = makeLeavesTexture();
  leaves.wrapS = leaves.wrapT = THREE.RepeatWrapping;

  const grass = makeGrassTexture();
  grass.wrapS = grass.wrapT = THREE.RepeatWrapping;
  grass.repeat.set(8, 8);

  const water = makeWaterTexture();
  water.wrapS = water.wrapT = THREE.RepeatWrapping;
  water.repeat.set(2, 2);

  pack = {
    materials: {
      bark: new THREE.MeshLambertMaterial({ map: bark }),
      leaves: new THREE.MeshLambertMaterial({ map: leaves }),
      duckBody: new THREE.MeshLambertMaterial({ map: makeDuckBodyTexture() }),
      duckBill: new THREE.MeshLambertMaterial({ map: makeDuckBillTexture(), color: 0xff8c42 }),
      duckEye: new THREE.MeshLambertMaterial({ color: 0x1c1917 }),
      grass: new THREE.MeshLambertMaterial({ map: grass }),
      water: new THREE.MeshLambertMaterial({
        map: water,
        transparent: true,
        opacity: 0.88,
        color: 0x38bdf8,
      }),
      wall: new THREE.MeshLambertMaterial({ color: 0x166534 }),
      wallAlt: new THREE.MeshLambertMaterial({ color: 0x15803d }),
      barrier: new THREE.MeshLambertMaterial({ color: 0x94a3b8 }),
      mountain: new THREE.MeshLambertMaterial({ color: 0x64748b }),
    },
  };
  return pack;
}
