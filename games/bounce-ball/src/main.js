import {
  createCanvas,
  clearCanvas,
  drawCircle,
  drawText,
  Input,
  loop,
} from '@mygames/shared';

const { ctx } = createCanvas();
const input = new Input();

const ball = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 30,
  speedX: 220,
  speedY: 180,
  color: '#ff6b6b',
};

let score = 0;

function resetBall() {
  ball.x = ctx.canvas.width / 2;
  ball.y = ctx.canvas.height / 2;
  ball.speedX = 220 * (Math.random() > 0.5 ? 1 : -1);
  ball.speedY = 180 * (Math.random() > 0.5 ? 1 : -1);
}

function update(delta) {
  ball.x += ball.speedX * delta;
  ball.y += ball.speedY * delta;

  const left = ball.radius;
  const right = ctx.canvas.width - ball.radius;
  const top = ball.radius;
  const bottom = ctx.canvas.height - ball.radius;

  if (ball.x <= left || ball.x >= right) {
    ball.speedX *= -1;
    ball.x = Math.max(left, Math.min(right, ball.x));
    score += 1;
    ball.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }

  if (ball.y <= top || ball.y >= bottom) {
    ball.speedY *= -1;
    ball.y = Math.max(top, Math.min(bottom, ball.y));
    score += 1;
    ball.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }

  if (input.isPressed('r')) {
    score = 0;
    resetBall();
  }

  clearCanvas(ctx, '#1a1a2e');
  drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
  drawText(ctx, `Bounces: ${score}`, 120, 40, { align: 'left', size: 28 });
  drawText(ctx, 'Press R to reset', 120, 75, { align: 'left', size: 18, color: '#a2d2ff' });
}

loop(update);
