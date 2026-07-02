/**
 * Volumetric pseudo-3D sprites — survival-game style trees and grounded ducks.
 */

const TREE_HEIGHT_SCALE = 6.0;
const TREE_TRUNK_RATIO = 0.36;

export function getTreeScreenSize(dist, height) {
  const spriteH = Math.min(height * 1.1, (height / dist) * TREE_HEIGHT_SCALE);
  return { spriteH, spriteW: spriteH * 0.72 };
}

export function getDuckScreenSize(dist, height) {
  const spriteH = Math.min(height * 0.12, (height / dist) * 0.26);
  return { spriteH, spriteW: spriteH * 1.35 };
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

/** Raycast strip fallback — tapered trunk + cone foliage slice. */
export function drawTreeColumn(ctx, x, groundY, w, totalH, side, depth, isNight) {
  drawTree3D(ctx, x + w / 2, groundY, w * 4, totalH, side === 0 ? Math.PI : side === 2 ? 0 : Math.PI / 2, isNight);
}

/**
 * Apocalypse-survival style pine: rooted trunk, stacked cone foliage with depth offset.
 */
export function drawTree3D(ctx, sx, groundY, sw, sh, viewAngle, isNight) {
  const light = Math.cos(viewAngle);
  const side = Math.sin(viewAngle);
  const gy = groundY;

  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, gy + 3, sw * 0.18, sh * 0.025, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isNight ? '#44403c' : '#78716c';
  ctx.beginPath();
  ctx.ellipse(sx, gy + 1, sw * 0.14, sh * 0.018, 0, 0, Math.PI * 2);
  ctx.fill();

  const trunkH = sh * TREE_TRUNK_RATIO;
  const trunkBot = gy;
  const trunkTop = gy - trunkH;
  const trunkWBot = sw * 0.16;
  const trunkWTop = sw * 0.09;
  const lean = side * sw * 0.04;

  const barkDark = isNight ? '#2c1810' : '#3e2723';
  const barkMid = isNight ? '#4a2f1a' : '#5d4037';
  const barkLit = isNight ? '#5c3d2e' : '#6d4c41';

  ctx.fillStyle = light < -0.15 ? barkDark : light > 0.15 ? barkLit : barkMid;
  ctx.beginPath();
  ctx.moveTo(sx - trunkWBot + lean, trunkBot);
  ctx.lineTo(sx + trunkWBot + lean, trunkBot);
  ctx.lineTo(sx + trunkWTop + lean, trunkTop);
  ctx.lineTo(sx - trunkWTop + lean, trunkTop);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = light > 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.25)';
  ctx.fillRect(sx - trunkWTop * 0.4 + lean, trunkTop, trunkWTop * 0.35, trunkH);

  const coneCount = 7;
  const foliageH = sh - trunkH;
  const foliageTop = trunkTop - sh * 0.02;

  for (let i = 0; i < coneCount; i += 1) {
    const t = i / (coneCount - 1);
    const coneTipY = foliageTop - foliageH * t * 0.92;
    const coneBaseY = coneTipY + foliageH / coneCount + sh * 0.035;
    const coneW = sw * (1.0 - t * 0.58);
    const depthOff = side * coneW * 0.14 * (1 - t * 0.5);
    const cx = sx + depthOff;

    const dark = isNight ? '#14291c' : '#1b4332';
    const mid = isNight ? '#1f4d35' : '#2d6a4f';
    const lit = isNight ? '#2d6a4f' : '#40916c';
    const coneColor = side < -0.25 ? dark : side > 0.25 ? lit : mid;

    ctx.fillStyle = coneColor;
    ctx.beginPath();
    ctx.moveTo(cx, coneTipY);
    ctx.lineTo(cx - coneW / 2, coneBaseY);
    ctx.lineTo(cx + coneW / 2, coneBaseY);
    ctx.closePath();
    ctx.fill();

    if (i < coneCount - 1) {
      ctx.fillStyle = isNight ? '#0f1f15' : '#163325';
      ctx.beginPath();
      ctx.moveTo(cx, coneBaseY - sh * 0.01);
      ctx.lineTo(cx - coneW * 0.42, coneBaseY + sh * 0.012);
      ctx.lineTo(cx + coneW * 0.42, coneBaseY + sh * 0.012);
      ctx.closePath();
      ctx.fill();
    }
  }

  ctx.fillStyle = isNight ? '#1f4d35' : '#2d6a4f';
  ctx.beginPath();
  ctx.moveTo(sx + side * sw * 0.05, foliageTop - foliageH * 0.95);
  ctx.lineTo(sx - sw * 0.04, foliageTop - foliageH * 0.82);
  ctx.lineTo(sx + sw * 0.04, foliageTop - foliageH * 0.82);
  ctx.closePath();
  ctx.fill();
}

/**
 * Grounded lake duck — low profile, planted in water, no inflated balloon body.
 */
export function drawDuck3D(ctx, sx, groundY, sw, sh, viewAngle, isNight, live = false) {
  const side = Math.sin(viewAngle);
  const absSide = Math.abs(side);
  const facing = side >= 0 ? 1 : -1;
  const light = Math.cos(viewAngle);
  const waterY = groundY;

  ctx.strokeStyle = isNight ? 'rgba(125,211,252,0.2)' : 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 1;
  for (let r = 0; r < 3; r += 1) {
    ctx.beginPath();
    ctx.ellipse(sx, waterY + sh * 0.04, sw * (0.2 + r * 0.08), sh * 0.025, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  const bodyLen = sw * (0.28 + absSide * 0.22);
  const bodyH = sh * 0.09;
  const bodyCx = sx + facing * bodyLen * 0.04;
  const bodyCy = waterY - bodyH * 0.55;

  ctx.fillStyle = isNight ? 'rgba(8,47,73,0.55)' : 'rgba(14,116,144,0.4)';
  ctx.beginPath();
  ctx.ellipse(bodyCx, waterY + bodyH * 0.2, bodyLen * 0.52, bodyH * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  const bodyColor = shadeColor('#c9a006', 0.82 + light * 0.12);
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(bodyCx, bodyCy, bodyLen * 0.5, bodyH, 0, Math.PI, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = shadeColor('#a67c00', 0.75 + light * 0.08);
  ctx.beginPath();
  ctx.ellipse(bodyCx - facing * bodyLen * 0.15, bodyCy + bodyH * 0.15, bodyLen * 0.35, bodyH * 0.45, 0, 0, Math.PI);
  ctx.fill();

  const neckX = bodyCx + facing * bodyLen * 0.42;
  const neckBase = bodyCy - bodyH * 0.3;
  ctx.fillStyle = shadeColor('#c9a006', 0.8 + light * 0.1);
  ctx.fillRect(neckX - sw * 0.025, neckBase - sh * 0.1, sw * 0.05, sh * 0.1);

  const headX = neckX + facing * sw * 0.03;
  const headY = neckBase - sh * 0.13;
  const headR = sw * 0.07;
  ctx.fillStyle = shadeColor('#d4a80a', 0.88 + light * 0.08);
  ctx.beginPath();
  ctx.arc(headX, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e85d04';
  ctx.beginPath();
  ctx.moveTo(headX + facing * headR, headY + headR * 0.1);
  ctx.lineTo(headX + facing * (headR + sw * 0.07), headY + headR * 0.2);
  ctx.lineTo(headX + facing * headR, headY + headR * 0.35);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(headX + facing * headR * 0.35, headY - headR * 0.2, headR * 0.18, 0, Math.PI * 2);
  ctx.fill();

  if (live) {
    ctx.fillStyle = 'rgba(220,38,38,0.7)';
    ctx.beginPath();
    ctx.arc(headX - facing * headR * 0.6, headY - headR * 0.5, sh * 0.018, 0, Math.PI * 2);
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
