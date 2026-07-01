/**
 * Volumetric pseudo-3D sprite drawing for the raycast world.
 */

const TREE_HEIGHT_SCALE = 5.5;
const TREE_TRUNK_RATIO = 0.3;

export function getTreeScreenSize(dist, height) {
  const spriteH = Math.min(height * 1.05, (height / dist) * TREE_HEIGHT_SCALE);
  return { spriteH, spriteW: spriteH * 0.82 };
}

export function getDuckScreenSize(dist, height) {
  const spriteH = Math.min(height * 0.22, (height / dist) * 0.42);
  return { spriteH, spriteW: spriteH * 1.15 };
}

function shadeColor(rgb, factor) {
  const parse = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r, g, b] = parse(rgb);
  return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
}

export function drawTreeColumn(ctx, x, groundY, w, totalH, side, depth, isNight) {
  const trunkH = totalH * TREE_TRUNK_RATIO;
  const canopyH = totalH - trunkH;
  const top = groundY - totalH;

  const trunkLight = isNight ? '#5c3d2e' : '#92400e';
  const trunkMid = isNight ? '#44281a' : '#78350f';
  const trunkDark = isNight ? '#2d1810' : '#451a03';
  const trunkColor = side === 0 ? trunkDark : side === 1 ? trunkMid : trunkLight;

  ctx.fillStyle = trunkColor;
  ctx.fillRect(x, groundY - trunkH, w + 1, trunkH);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(x, groundY - trunkH, w * 0.35, trunkH);

  const layers = 7;
  for (let i = 0; i < layers; i += 1) {
    const t = i / (layers - 1);
    const layerH = canopyH / layers + 2;
    const layerY = top + canopyH * t * 0.92;
    const layerW = w * (1.15 - t * 0.55);
    const lx = x + (w - layerW) / 2;
    const greenBase = isNight ? '#14532d' : '#16a34a';
    const greenLight = isNight ? '#166534' : '#22c55e';
    const greenDark = isNight ? '#052e16' : '#15803d';
    const layerColor = side === 0 ? greenDark : i % 2 === 0 ? greenLight : greenBase;

    ctx.fillStyle = layerColor;
    ctx.beginPath();
    ctx.ellipse(lx + layerW / 2, layerY + layerH / 2, layerW / 2, layerH * 0.85, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const shade = Math.max(0.25, 1 - depth / 28);
  ctx.fillStyle = `rgba(0,0,0,${0.25 * (1 - shade)})`;
  ctx.fillRect(x, top, w + 1, totalH);
}

/** Full volumetric tree sprite — thick trunk + layered round canopy. */
export function drawTree3D(ctx, sx, groundY, sw, sh, viewAngle, isNight) {
  const light = Math.cos(viewAngle);
  const side = light < -0.2 ? 0 : light > 0.2 ? 2 : 1;
  const trunkW = sw * 0.18;
  const trunkH = sh * TREE_TRUNK_RATIO;
  const canopyH = sh - trunkH;
  const top = groundY - sh;

  const trunkLight = isNight ? '#5c3d2e' : '#92400e';
  const trunkMid = isNight ? '#44281a' : '#78350f';
  const trunkDark = isNight ? '#2d1810' : '#451a03';
  const trunkColor = side === 0 ? trunkDark : side === 1 ? trunkMid : trunkLight;

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, groundY + sh * 0.02, sw * 0.22, sh * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  const trunkX = sx - trunkW / 2 + (side === 0 ? trunkW * 0.15 : side === 2 ? -trunkW * 0.1 : 0);
  ctx.fillStyle = trunkColor;
  ctx.fillRect(trunkX, groundY - trunkH, trunkW, trunkH);
  ctx.fillStyle = side === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.12)';
  ctx.fillRect(trunkX, groundY - trunkH, trunkW * 0.35, trunkH);

  const layers = 9;
  for (let i = 0; i < layers; i += 1) {
    const t = i / (layers - 1);
    const layerY = top + canopyH * t * 0.88;
    const layerW = sw * (1.05 - t * 0.62);
    const layerH = canopyH / layers + 4;
    const lx = sx - layerW / 2 + light * layerW * 0.04;
    const greenBase = isNight ? '#14532d' : '#16a34a';
    const greenLight = isNight ? '#22c55e' : '#4ade80';
    const greenDark = isNight ? '#052e16' : '#15803d';
    const layerColor = side === 0 ? greenDark : i % 2 === 0 ? greenLight : greenBase;

    ctx.fillStyle = layerColor;
    ctx.beginPath();
    ctx.ellipse(lx + layerW / 2, layerY + layerH / 2, layerW / 2, layerH * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    if (side === 2 && i > 2) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.ellipse(lx + layerW * 0.3, layerY + layerH * 0.35, layerW * 0.12, layerH * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** Proper 3D duck — body rotates with view angle, not a flat face-on picture. */
export function drawDuck3D(ctx, sx, groundY, sw, sh, viewAngle, isNight, live = false) {
  const bounce = Math.sin(Date.now() / 320) * (sh * 0.015);
  const gy = groundY + bounce;
  const side = Math.sin(viewAngle);
  const absSide = Math.abs(side);
  const facing = side >= 0 ? 1 : -1;
  const light = Math.cos(viewAngle);

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(sx, gy + sh * 0.06, sw * (0.28 + absSide * 0.12), sh * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  const bodyLen = sw * (0.22 + absSide * 0.32);
  const bodyH = sh * 0.2;
  const bodyY = gy - sh * 0.1;
  const bodyCx = sx + facing * bodyLen * 0.06;

  const slices = 7;
  for (let i = 0; i < slices; i += 1) {
    const t = (i / (slices - 1)) - 0.5;
    const sliceX = bodyCx + t * bodyLen * 2 * facing;
    const sliceRx = bodyH * (0.5 + (1 - Math.abs(t) * 1.6) * 0.5);
    const sliceRy = bodyH * (0.85 - Math.abs(t) * 0.2);
    const shade = 0.78 + light * 0.14 - Math.abs(t) * 0.12;
    ctx.fillStyle = shadeColor('#facc15', shade);
    ctx.beginPath();
    ctx.ellipse(sliceX, bodyY, sliceRx, sliceRy, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tailX = bodyCx - facing * bodyLen * 0.95;
  const tailY = bodyY - bodyH * 0.15;
  ctx.fillStyle = shadeColor('#eab308', 0.75 + light * 0.1);
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(tailX - facing * sw * 0.1, tailY - sh * 0.14);
  ctx.lineTo(tailX - facing * sw * 0.04, tailY + bodyH * 0.3);
  ctx.closePath();
  ctx.fill();

  const neckX = bodyCx + facing * bodyLen * 0.72;
  const neckY = bodyY - sh * 0.14;
  const neckW = sw * 0.07;
  const neckH = sh * 0.16;
  ctx.fillStyle = shadeColor('#facc15', 0.82 + light * 0.1);
  ctx.fillRect(neckX - neckW / 2, neckY - neckH, neckW, neckH);

  const headX = neckX + facing * sw * 0.06;
  const headY = neckY - neckH - sh * 0.08;
  const headR = sw * 0.13;
  const headGrad = ctx.createRadialGradient(
    headX - headR * 0.35 * facing,
    headY - headR * 0.35,
    headR * 0.1,
    headX,
    headY,
    headR,
  );
  headGrad.addColorStop(0, shadeColor('#fde047', 1.05));
  headGrad.addColorStop(0.6, shadeColor('#facc15', 0.9 + light * 0.08));
  headGrad.addColorStop(1, shadeColor('#ca8a04', 0.75));
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(headX, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  const billX = headX + facing * headR * 0.85;
  const billY = headY + headR * 0.1;
  ctx.fillStyle = shadeColor('#f97316', 0.92);
  ctx.beginPath();
  ctx.ellipse(billX, billY, headR * 0.42, headR * 0.2, facing * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(headX + facing * headR * 0.3, headY - headR * 0.25, headR * 0.1, 0, Math.PI * 2);
  ctx.fill();

  const footY = gy - sh * 0.02;
  ctx.fillStyle = '#f97316';
  for (const fx of [-sw * 0.08, sw * 0.08]) {
    ctx.beginPath();
    ctx.ellipse(bodyCx + fx, footY, sw * 0.05, sh * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (live) {
    ctx.fillStyle = 'rgba(239,68,68,0.85)';
    ctx.beginPath();
    ctx.arc(headX - facing * headR * 0.5, headY - headR * 0.55, sh * 0.025, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawCampfire3D(ctx, sx, groundY, sw, sh, campfire, viewAngle, isNight) {
  const radius = campfire?.logsInLevel !== undefined
    ? 0.35 + (campfire.logsInLevel ?? 0) * 0.018 + (campfire.level ?? 0) * 0.15
    : 0.5;
  const scale = 0.8 + radius * 0.55;
  const bw = sw * scale;
  const bh = sh * scale * 0.55;
  const flicker = Math.sin(Date.now() / 120) * 5;
  const gy = groundY;

  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, gy + bh * 0.15, bw * 0.55, bh * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  const logCount = 6;
  for (let i = 0; i < logCount; i += 1) {
    const angle = (i / logCount) * Math.PI * 2 + viewAngle * 0.3;
    const lx = sx + Math.cos(angle) * bw * 0.22;
    const ly = gy + bh * 0.12;
    const depth = Math.sin(angle);
    const logW = bw * 0.14 * (0.8 + depth * 0.2);
    const logH = bh * 0.12;

    ctx.fillStyle = depth < 0 ? '#451a03' : '#92400e';
    ctx.fillRect(lx - logW / 2, ly - logH / 2, logW, logH);
    ctx.fillStyle = depth < 0 ? '#78350f' : '#a16207';
    ctx.fillRect(lx - logW / 2 + 1, ly - logH / 2 - 2, logW - 2, logH * 0.4);
  }

  const fireH = bh * (0.5 + radius * 0.35);
  const fire = ctx.createRadialGradient(sx, gy - fireH * 0.35 + flicker, 2, sx, gy - fireH * 0.2, bw * 0.5);
  if (isNight) {
    fire.addColorStop(0, '#fef08a');
    fire.addColorStop(0.35, '#f97316');
    fire.addColorStop(0.7, 'rgba(239,68,68,0.6)');
    fire.addColorStop(1, 'rgba(239,68,68,0)');
  } else {
    fire.addColorStop(0, '#fde68a');
    fire.addColorStop(0.4, '#fb923c');
    fire.addColorStop(1, 'rgba(251,146,60,0)');
  }
  ctx.fillStyle = fire;
  ctx.beginPath();
  ctx.moveTo(sx, gy - fireH + flicker);
  ctx.quadraticCurveTo(sx + bw * 0.35, gy - fireH * 0.5, sx + bw * 0.2, gy);
  ctx.quadraticCurveTo(sx, gy - fireH * 0.25, sx - bw * 0.2, gy);
  ctx.quadraticCurveTo(sx - bw * 0.35, gy - fireH * 0.5, sx, gy - fireH + flicker);
  ctx.fill();

  if (campfire?.expandFlash > 0) {
    ctx.strokeStyle = `rgba(250,204,21,${campfire.expandFlash / 2.5})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(sx, gy - bh * 0.1, bw * 0.65, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function drawKid3D(ctx, sx, groundY, sw, sh, kid, viewAngle, isNight) {
  const mood = kid.mood || 'angry';
  const light = Math.cos(viewAngle);
  const body = mood === 'scared'
    ? (isNight ? '#64748b' : '#94a3b8')
    : (isNight ? '#4338ca' : '#6366f1');
  const bodyDark = shadeColor(body, 0.72);
  const bodyLight = shadeColor(body, 1.12);
  const gy = groundY;

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, gy + sh * 0.05, sw * 0.35, sh * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  const torsoW = sw * 0.42;
  const torsoH = sh * 0.38;
  const torsoY = gy - sh * 0.15;
  ctx.fillStyle = light < 0 ? bodyDark : body;
  ctx.fillRect(sx - torsoW / 2, torsoY, torsoW, torsoH);
  ctx.fillStyle = light > 0 ? bodyLight : bodyDark;
  ctx.fillRect(sx - torsoW / 2, torsoY, torsoW * 0.25, torsoH);

  const headR = sw * 0.2;
  ctx.fillStyle = light > 0 ? bodyLight : body;
  ctx.beginPath();
  ctx.arc(sx, torsoY - headR * 0.85, headR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(sx - headR * 0.35, torsoY - headR * 1.05, headR * 0.12, 0, Math.PI * 2);
  ctx.arc(sx + headR * 0.35, torsoY - headR * 1.05, headR * 0.12, 0, Math.PI * 2);
  ctx.fill();

  const armW = sw * 0.14;
  const armH = sh * 0.28;
  ctx.fillStyle = bodyDark;
  ctx.fillRect(sx - torsoW / 2 - armW * 0.6, torsoY + sh * 0.02, armW, armH);
  ctx.fillRect(sx + torsoW / 2 - armW * 0.4, torsoY + sh * 0.02, armW, armH);

  if (kid.hitFlash > 0) {
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.strokeRect(sx - sw / 2, torsoY - headR * 2, sw, sh * 0.55);
  }
}

export { TREE_HEIGHT_SCALE, TREE_TRUNK_RATIO };
