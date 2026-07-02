/** Procedural cylinder person: ball head, torso, bending arms & legs. */

const SKIN = '#e8b88a';
const SKIN_SHADE = '#c9956a';
const SHIRT = '#3b82f6';
const SHIRT_SHADE = '#2563eb';
const PANTS = '#1e3a8a';
const PANTS_SHADE = '#172554';

export function createPlayer(x, y) {
  return {
    x,
    y,
    facing: -Math.PI / 2,
    walkPhase: 0,
    isMoving: false,
  };
}

export function updatePlayer(player, mx, my, delta) {
  const len = Math.hypot(mx, my);
  player.isMoving = len > 0.01;
  if (player.isMoving) {
    player.facing = Math.atan2(my, mx);
    player.walkPhase += delta * 10.5;
  }
}

function drawCylinder(ctx, x1, y1, x2, y2, radius, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const nx = Math.sin(angle) * radius;
  const ny = -Math.cos(angle) * radius;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x1, y1, radius, angle - Math.PI / 2, angle + Math.PI / 2);
  ctx.arc(x2, y2, radius, angle + Math.PI / 2, angle - Math.PI / 2 + Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawJoint(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function limbEnd(x, y, angle, upperLen, bend, lowerLen) {
  const ex = x + Math.cos(angle) * upperLen;
  const ey = y + Math.sin(angle) * upperLen;
  const lowerAngle = angle + bend;
  return {
    elbow: { x: ex, y: ey },
    hand: {
      x: ex + Math.cos(lowerAngle) * lowerLen,
      y: ey + Math.sin(lowerAngle) * lowerLen,
    },
    lowerAngle,
  };
}

function drawLimb(ctx, x, y, angle, upperLen, upperRad, lowerLen, lowerRad, bend, color, shade) {
  const { elbow, hand, lowerAngle } = limbEnd(x, y, angle, upperLen, bend, lowerLen);
  drawCylinder(ctx, x, y, elbow.x, elbow.y, upperRad, color);
  drawJoint(ctx, x, y, upperRad * 0.92, color);
  drawCylinder(ctx, elbow.x, elbow.y, hand.x, hand.y, lowerRad, shade);
  drawJoint(ctx, elbow.x, elbow.y, lowerRad * 0.9, shade);
  drawJoint(ctx, hand.x, hand.y, lowerRad * 0.85, SKIN);
  return hand;
}

function drawTorso(ctx, cx, hipY, width, height) {
  const r = width / 2;
  const topY = hipY - height;

  const grad = ctx.createLinearGradient(cx - r, topY, cx + r, hipY);
  grad.addColorStop(0, SHIRT);
  grad.addColorStop(1, SHIRT_SHADE);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(cx - r, topY, width, height, r);
  ctx.fill();
}

export function drawPlayer(ctx, player) {
  const { x, y, facing, walkPhase, isMoving } = player;
  const swing = isMoving ? Math.sin(walkPhase) : 0;
  const bob = isMoving ? Math.abs(Math.sin(walkPhase * 2)) * 1.5 : 0;

  ctx.save();
  ctx.translate(x, y - bob);
  ctx.rotate(facing + Math.PI / 2);

  const hipY = 0;
  const torsoW = 16;
  const torsoH = 24;
  const shoulderY = hipY - torsoH + 4;
  const shoulderSpread = torsoW * 0.55;
  const hipSpread = torsoW * 0.32;

  const legSwing = swing * 0.5;
  const armSwing = swing * 0.38;
  const baseLeg = -Math.PI / 2;
  const baseArm = -Math.PI / 2 + 0.35;
  const kneeBendL = isMoving ? 0.3 + Math.max(0, Math.sin(walkPhase + 0.5)) * 0.8 : 0.18;
  const kneeBendR = isMoving ? 0.3 + Math.max(0, Math.sin(walkPhase + Math.PI + 0.5)) * 0.8 : 0.18;
  const elbowBendL = isMoving ? 0.2 + Math.abs(Math.sin(walkPhase + Math.PI)) * 0.4 : 0.12;
  const elbowBendR = isMoving ? 0.2 + Math.abs(Math.sin(walkPhase)) * 0.4 : 0.12;

  const idleLeg = 0.08;
  const idleArm = 0.05;

  // Back limbs first
  drawLimb(
    ctx,
    -hipSpread,
    hipY,
    baseLeg - (isMoving ? legSwing : idleLeg),
    11,
    4.5,
    10,
    4,
    isMoving ? kneeBendL : 0.2,
    PANTS_SHADE,
    PANTS,
  );
  drawLimb(
    ctx,
    shoulderSpread,
    shoulderY,
    baseArm + (isMoving ? armSwing : idleArm),
    10,
    3.8,
    9,
    3.4,
    isMoving ? -elbowBendR : -0.12,
    SHIRT_SHADE,
    SHIRT,
  );

  drawTorso(ctx, 0, hipY, torsoW, torsoH);

  // Front limbs
  drawLimb(
    ctx,
    hipSpread,
    hipY,
    baseLeg + (isMoving ? legSwing : idleLeg),
    11,
    4.5,
    10,
    4,
    isMoving ? kneeBendR : 0.2,
    PANTS,
    PANTS_SHADE,
  );
  drawLimb(
    ctx,
    -shoulderSpread,
    shoulderY,
    baseArm - (isMoving ? armSwing : idleArm),
    10,
    3.8,
    9,
    3.4,
    isMoving ? -elbowBendL : -0.12,
    SHIRT,
    SHIRT_SHADE,
  );

  // Welded shoulder caps
  drawJoint(ctx, -shoulderSpread, shoulderY, 4.2, SHIRT);
  drawJoint(ctx, shoulderSpread, shoulderY, 4.2, SHIRT);

  const neckY = shoulderY - 3;
  drawCylinder(ctx, 0, neckY, 0, neckY - 4, 3.2, SKIN_SHADE);

  const headY = neckY - 12;
  const headR = 10;
  const headGrad = ctx.createRadialGradient(-2, headY - 2, 1, 0, headY, headR);
  headGrad.addColorStop(0, '#f5d0b5');
  headGrad.addColorStop(1, SKIN);
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(0, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
