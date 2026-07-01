import { drawText, drawRect } from '@mygames/shared';
import { MAX_NIGHTS } from './gameplay.js';
import { getMaxHealth } from './shop.js';

export function createAdminState() {
  return {
    open: false,
    godMode: false,
    speedMultiplier: 1,
  };
}

export function updateAdmin(admin, input, gameState, setGameState) {
  if (input.isPressed('`', 'backquote')) {
    admin.open = !admin.open;
  }

  if (!admin.open) {
    return admin;
  }

  return admin;
}

export function handleAdminClick(admin, gameState, setGameState, x, y, width, height) {
  if (!admin.open) return;

  const panelX = width / 2 - 160;
  const panelY = height / 2 - 200;
  const btnW = 300;
  const btnH = 36;
  const gap = 8;
  let by = panelY + 60;

  const buttons = [
    {
      label: admin.godMode ? '✓ God Mode ON' : 'God Mode OFF',
      action: () => { admin.godMode = !admin.godMode; },
    },
    {
      label: `Speed: ${admin.speedMultiplier}x`,
      action: () => {
        const speeds = [1, 2, 5, 10];
        const idx = speeds.indexOf(admin.speedMultiplier);
        admin.speedMultiplier = speeds[(idx + 1) % speeds.length];
      },
    },
    {
      label: 'Skip Phase (Day↔Night)',
      action: () => {
        setGameState((s) => {
          if (s.phase === 'DAY') {
            const next = { ...s, phaseTimer: 0 };
            return next;
          }
          return { ...s, phaseTimer: 0 };
        });
      },
    },
    {
      label: 'Skip to Next Night',
      action: () => {
        setGameState((s) => ({
          ...s,
          night: Math.min(MAX_NIGHTS, s.night + 1),
          phase: 'DAY',
          phaseTimer: 0.1,
          health: getMaxHealth(s.shop),
          kids: [],
          thrownToys: [],
          incomingToys: [],
          lost: false,
        }));
      },
    },
    {
      label: 'Win Instantly (Night 20)',
      action: () => {
        setGameState((s) => ({ ...s, won: true, night: MAX_NIGHTS }));
      },
    },
    {
      label: 'Reset Game',
      action: () => {
        window.location.reload();
      },
    },
    {
      label: 'Close Admin',
      action: () => { admin.open = false; },
    },
  ];

  buttons.forEach((btn) => {
    if (x >= panelX + 10 && x <= panelX + 10 + btnW && y >= by && y <= by + btnH) {
      btn.action();
    }
    by += btnH + gap;
  });

  const nightY = panelY + 30;
  if (y >= nightY && y <= nightY + 20) {
    const sliderX = panelX + 10;
    if (x >= sliderX && x <= sliderX + btnW) {
      const night = Math.max(1, Math.min(MAX_NIGHTS, Math.ceil(((x - sliderX) / btnW) * MAX_NIGHTS)));
      setGameState((s) => ({ ...s, night }));
    }
  }
}

export function renderAdmin(admin, ctx, width, height, gameState) {
  if (!admin.open) {
    drawText(ctx, '` Admin', width - 70, height - 90, { size: 12, color: '#94a3b8' });
    return;
  }

  const panelX = width / 2 - 160;
  const panelY = height / 2 - 200;
  const panelW = 320;
  const panelH = 400;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 3;
  ctx.strokeRect(panelX, panelY, panelW, panelH);

  drawText(ctx, '🛠️ ADMIN PANEL', width / 2, panelY + 22, { size: 22, color: '#facc15' });
  drawText(ctx, `Night: ${gameState.night} / ${MAX_NIGHTS} (click bar)`, width / 2, panelY + 48, {
    size: 14,
    color: '#94a3b8',
  });

  ctx.fillStyle = '#334155';
  ctx.fillRect(panelX + 10, panelY + 55, 300, 8);
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(panelX + 10, panelY + 55, 300 * (gameState.night / MAX_NIGHTS), 8);

  const buttons = [
    admin.godMode ? '✓ God Mode ON' : 'God Mode OFF',
    `Speed: ${admin.speedMultiplier}x`,
    'Skip Phase (Day↔Night)',
    'Skip to Next Night',
    'Win Instantly (Night 20)',
    'Reset Game',
    'Close Admin',
  ];

  let by = panelY + 75;
  buttons.forEach((label) => {
    drawRect(ctx, panelX + 10, by, 300, 36, '#475569');
    drawText(ctx, label, width / 2, by + 18, { size: 16, color: '#f1f5f9' });
    by += 44;
  });
}
