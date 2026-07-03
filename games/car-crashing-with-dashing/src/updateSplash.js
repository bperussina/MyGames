const BUILD_KEY = 'ccwd-build';
const SHOW_KEY = 'ccwd-show-update';

const UPDATE_HEADLINE = 'MEGA UPDATE';
const UPDATE_TAGLINE = 'The game just got way bigger.';

const UPDATE_FEATURES = [
  { icon: '🪟', title: 'Real windows & glass', desc: 'Big blue side windows, windshield, rear glass, mirrors, and chrome trim.' },
  { icon: '💥', title: 'Parts fly off', desc: 'Headlights, hood, doors, and wheels break loose in crashes.' },
  { icon: '🏙️', title: 'Huge city + countryside', desc: 'Drive through the city gates into infinite green hills.' },
  { icon: '📊', title: 'Damage HUD', desc: 'Live bars for engine, body, hood, glass, and wheels.' },
  { icon: '🖱️', title: 'Mouse-look driving', desc: 'Look around while you drive and smash buildings.' },
  { icon: '🔄', title: 'Auto-updates', desc: 'Reload and you always get the newest version — like right now.' },
];

let overlayEl = null;

function seenKey(v) {
  return `ccwd-seen-${v}`;
}

async function fetchVersion() {
  const res = await fetch(`./version.json?_=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

function stripUpdateParam() {
  const url = new URL(location.href);
  if (!url.searchParams.has('__v')) return;
  url.searchParams.delete('__v');
  history.replaceState(null, '', url.pathname + url.search + url.hash);
}

function buildOverlay(version) {
  const el = document.createElement('div');
  el.id = 'update-splash';
  el.innerHTML = `
    <div class="update-bg"></div>
    <div class="update-rays"></div>
    <div class="update-panel">
      <p class="update-eyebrow">NEW VERSION LOADED</p>
      <h1 class="update-headline">${UPDATE_HEADLINE}</h1>
      <p class="update-tagline">${UPDATE_TAGLINE}</p>
      <p class="update-version">Build <strong>${version}</strong></p>
      <ul class="update-features">
        ${UPDATE_FEATURES.map(
          (f) => `
          <li>
            <span class="update-feature-icon">${f.icon}</span>
            <span class="update-feature-text">
              <strong>${f.title}</strong>
              <span>${f.desc}</span>
            </span>
          </li>`,
        ).join('')}
      </ul>
      <button type="button" class="update-play-btn" id="update-splash-dismiss">LET'S GO!</button>
    </div>
  `;
  return el;
}

function waitForDismiss(el) {
  return new Promise((resolve) => {
    const btn = el.querySelector('#update-splash-dismiss');
    const done = () => {
      el.classList.add('update-splash-out');
      setTimeout(() => {
        el.remove();
        overlayEl = null;
        resolve();
      }, 420);
    };
    btn.addEventListener('click', done, { once: true });
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.removeEventListener('keydown', onKey);
        done();
      }
    };
    window.addEventListener('keydown', onKey);
  });
}

/** Full-screen splash when the player loads a version they have not seen yet. */
export async function maybeShowUpdateSplash() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

  let data;
  try {
    data = await fetchVersion();
  } catch {
    return;
  }
  const v = data?.v;
  if (!v) return;

  const forced = localStorage.getItem(SHOW_KEY) === '1';
  const alreadySeen = localStorage.getItem(seenKey(v)) === '1';
  if (!forced && alreadySeen) {
    localStorage.setItem(BUILD_KEY, v);
    stripUpdateParam();
    return;
  }

  localStorage.removeItem(SHOW_KEY);
  localStorage.setItem(BUILD_KEY, v);
  localStorage.setItem(seenKey(v), '1');
  stripUpdateParam();

  overlayEl = buildOverlay(v);
  document.body.appendChild(overlayEl);
  requestAnimationFrame(() => overlayEl.classList.add('update-splash-in'));
  await waitForDismiss(overlayEl);
}

export function markPendingUpdateReload() {
  localStorage.setItem(SHOW_KEY, '1');
}
