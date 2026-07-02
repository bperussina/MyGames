import { createMultiplayerRoom, generateRoomCode, buildShareLink } from './multiplayer.js';

let overlay = null;
let room = null;
let onEnterWorld = null;

export function getRoom() {
  return room;
}

export function createLobby(onEnterWorldCallback) {
  onEnterWorld = onEnterWorldCallback;

  overlay = document.createElement('div');
  overlay.id = 'multiplayer-lobby';
  overlay.innerHTML = `
    <div class="lobby-panel">
      <h1 class="lobby-title">MULTIPLAYER</h1>
      <p class="lobby-sub">Play with family — any internet, anywhere.</p>

      <button type="button" class="lobby-btn lobby-btn-host" id="btn-generate">Generate Code</button>

      <div class="lobby-host-info" id="host-info" hidden>
        <p class="lobby-label">Your room code</p>
        <p class="lobby-code" id="room-code"></p>
        <p class="lobby-label">Share this link (works on any Wi‑Fi)</p>
        <div class="lobby-link-row">
          <input type="text" class="lobby-link" id="share-link" readonly />
          <button type="button" class="lobby-copy" id="btn-copy">Copy</button>
        </div>
        <button type="button" class="lobby-btn lobby-btn-go" id="btn-enter-host">Enter World</button>
      </div>

      <div class="lobby-divider">or join a friend</div>

      <div class="lobby-join-row">
        <input type="text" class="lobby-code-input" id="join-code" placeholder="Enter code" maxlength="8" autocomplete="off" />
        <button type="button" class="lobby-btn lobby-btn-join" id="btn-join">Join Code</button>
      </div>

      <p class="lobby-status" id="lobby-status"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  const statusEl = overlay.querySelector('#lobby-status');
  const hostInfo = overlay.querySelector('#host-info');
  const codeEl = overlay.querySelector('#room-code');
  const linkEl = overlay.querySelector('#share-link');

  function setStatus(t) {
    if (statusEl) statusEl.textContent = t;
  }

  overlay.querySelector('#btn-generate').addEventListener('click', async () => {
    try {
      if (room) room.close();
      room = createMultiplayerRoom();
      room.onStatus = setStatus;
      const code = generateRoomCode();
      const info = await room.host(code);
      codeEl.textContent = info.code;
      linkEl.value = info.link;
      hostInfo.hidden = false;
      history.replaceState(null, '', info.link);
      hideLobby();
      onEnterWorld?.({ room, isHost: true });
    } catch {
      setStatus('Could not create room — try again.');
    }
  });

  overlay.querySelector('#btn-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(linkEl.value);
      setStatus('Link copied! Send it to your family.');
    } catch {
      linkEl.select();
      setStatus('Select the link and copy it.');
    }
  });

  overlay.querySelector('#btn-enter-host').addEventListener('click', () => {
    if (!room || room.role !== 'host') return;
    hideLobby();
    onEnterWorld?.({ room, isHost: true });
  });

  overlay.querySelector('#btn-join').addEventListener('click', () => tryJoin());

  overlay.querySelector('#join-code').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryJoin();
  });

  async function tryJoin() {
    const code = overlay.querySelector('#join-code').value.trim();
    if (!code) {
      setStatus('Type a room code first.');
      return;
    }
    try {
      if (room) room.close();
      room = createMultiplayerRoom();
      room.onStatus = setStatus;
      await room.join(code);
      hideLobby();
      onEnterWorld?.({ room, isHost: false });
    } catch {
      /* status set in multiplayer */
    }
  }

  const urlCode = new URLSearchParams(window.location.search).get('room');
  if (urlCode) {
    overlay.querySelector('#join-code').value = urlCode;
    setStatus('Joining from your link…');
    setTimeout(() => tryJoin(), 400);
  }

  return overlay;
}

export function hideLobby() {
  if (overlay) overlay.style.display = 'none';
}

export function showLobby() {
  if (overlay) overlay.style.display = 'flex';
}

export function isLobbyVisible() {
  return overlay?.style.display !== 'none';
}

export { buildShareLink };
