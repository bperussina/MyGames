const STORAGE_KEY = 'ccwd-design-sketch';
const GRID = 28;

const PALETTE = [
  { name: 'Stainless', hex: '#b8bdc4' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#eab308' },
];

let overlay = null;
let paper = null;
let pctx = null;
let visible = false;
let tool = 'draw';
let color = PALETTE[0].hex;
let drawing = false;
let lastPt = null;
let onExitCallback = null;

function saveSketch() {
  if (!paper) return;
  try {
    localStorage.setItem(STORAGE_KEY, paper.toDataURL('image/png'));
  } catch {
    /* storage blocked */
  }
}

function loadSketch() {
  if (!paper || !pctx) return;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const img = new Image();
    img.onload = () => {
      pctx.drawImage(img, 0, 0, paper.width, paper.height);
    };
    img.src = data;
  } catch {
    /* ignore */
  }
}

function resizePaper() {
  if (!paper || !pctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  paper.width = Math.floor(w * dpr);
  paper.height = Math.floor(h * dpr);
  paper.style.width = `${w}px`;
  paper.style.height = `${h}px`;
  pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pctx.fillStyle = '#ffffff';
  pctx.fillRect(0, 0, w, h);
  loadSketch();
}

function snap(n) {
  return Math.round(n / GRID) * GRID;
}

function canvasPoint(clientX, clientY) {
  const r = paper.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
}

function placeCube(x, y) {
  const sx = snap(x);
  const sy = snap(y);
  pctx.fillStyle = color;
  pctx.fillRect(sx, sy, GRID, GRID);
  pctx.strokeStyle = 'rgba(0,0,0,0.12)';
  pctx.lineWidth = 1;
  pctx.strokeRect(sx + 0.5, sy + 0.5, GRID - 1, GRID - 1);
}

function exitToGame() {
  saveSketch();
  hideDrawPaper();
  onExitCallback?.();
}

export function isDrawPaperVisible() {
  return visible;
}

export function hideDrawPaper() {
  if (!overlay) return;
  visible = false;
  overlay.hidden = true;
}

export function showDrawPaper() {
  if (!overlay) return;
  visible = true;
  overlay.hidden = false;
  resizePaper();
}

export function shouldShowDrawPaperOnLoad() {
  const params = new URLSearchParams(window.location.search);
  return !params.has('play') && !params.has('room') && !params.has('teleport') && !params.has('skipdraw');
}

export function createDrawPaper(onExit) {
  onExitCallback = onExit;

  overlay = document.createElement('div');
  overlay.id = 'draw-paper';
  overlay.innerHTML = `
    <canvas id="draw-paper-canvas" aria-label="Design paper"></canvas>
    <div class="draw-toolbar">
      <p class="draw-title">Draw your Cybertruck</p>
      <div class="draw-tools">
        <button type="button" class="draw-tool active" data-tool="draw">Draw</button>
        <button type="button" class="draw-tool" data-tool="cube">Cubes</button>
        <button type="button" class="draw-tool" data-tool="erase">Eraser</button>
      </div>
      <div class="draw-colors" id="draw-colors"></div>
      <button type="button" class="draw-clear" id="draw-clear">Clear paper</button>
    </div>
    <div class="draw-footer">
      <p class="draw-hint">Type <strong>undo</strong> and press Enter to play the game</p>
      <input type="text" class="draw-undo-input" id="draw-undo-input" placeholder="undo" autocomplete="off" />
      <button type="button" class="draw-play-btn" id="draw-play-btn">Play game</button>
    </div>
  `;
  document.body.appendChild(overlay);

  paper = overlay.querySelector('#draw-paper-canvas');
  pctx = paper.getContext('2d');

  const colorsEl = overlay.querySelector('#draw-colors');
  for (const swatch of PALETTE) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'draw-swatch';
    btn.style.background = swatch.hex;
    btn.title = swatch.name;
    btn.dataset.color = swatch.hex;
    if (swatch.hex === color) btn.classList.add('active');
    btn.addEventListener('click', () => {
      color = swatch.hex;
      colorsEl.querySelectorAll('.draw-swatch').forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
      if (tool === 'erase') setTool('draw');
    });
    colorsEl.appendChild(btn);
  }

  function setTool(next) {
    tool = next;
    overlay.querySelectorAll('.draw-tool').forEach((el) => {
      el.classList.toggle('active', el.dataset.tool === next);
    });
  }

  overlay.querySelectorAll('.draw-tool').forEach((btn) => {
    btn.addEventListener('click', () => setTool(btn.dataset.tool));
  });

  overlay.querySelector('#draw-clear').addEventListener('click', () => {
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(0, 0, paper.width, paper.height);
    saveSketch();
  });

  overlay.querySelector('#draw-play-btn').addEventListener('click', exitToGame);

  const undoInput = overlay.querySelector('#draw-undo-input');
  undoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && undoInput.value.trim().toLowerCase() === 'undo') {
      exitToGame();
    }
  });

  function onPointerDown(e) {
    if (e.target.closest('.draw-toolbar, .draw-footer')) return;
    e.preventDefault();
    drawing = true;
    const pt = canvasPoint(e.clientX, e.clientY);
    lastPt = pt;
    if (tool === 'cube') {
      placeCube(pt.x, pt.y);
      saveSketch();
    } else if (tool === 'erase') {
      pctx.strokeStyle = '#ffffff';
      pctx.lineWidth = 20;
      pctx.lineCap = 'round';
      pctx.beginPath();
      pctx.moveTo(pt.x, pt.y);
    } else {
      pctx.strokeStyle = color;
      pctx.lineWidth = 4;
      pctx.lineCap = 'round';
      pctx.beginPath();
      pctx.moveTo(pt.x, pt.y);
    }
    paper.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drawing) return;
    const pt = canvasPoint(e.clientX, e.clientY);
    if (tool === 'cube') return;
    pctx.lineTo(pt.x, pt.y);
    pctx.stroke();
    lastPt = pt;
  }

  function onPointerUp(e) {
    if (!drawing) return;
    drawing = false;
    lastPt = null;
    saveSketch();
    try {
      paper.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  paper.addEventListener('pointerdown', onPointerDown);
  paper.addEventListener('pointermove', onPointerMove);
  paper.addEventListener('pointerup', onPointerUp);
  paper.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', () => {
    if (visible) resizePaper();
  });

  overlay.hidden = true;
  return overlay;
}
