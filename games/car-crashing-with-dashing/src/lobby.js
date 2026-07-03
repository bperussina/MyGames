import { createMultiplayerRoom, generateRoomCode, buildShareLink } from './multiplayer.js';

const NAME_KEY = 'ccwd-player-name';
const HOST_KEY = 'ccwd-host-room';

let overlay = null;
let room = null;
let onEnterWorld = null;
let roster = new Map();

export function getRoom() {
  return room;
}

export function getPlayerName() {
  if (!overlay) return 'Player';
  const el = overlay.querySelector('#player-name');
  const typed = el?.value.trim();
  if (typed) return typed;
  try {
    return localStorage.getItem(NAME_KEY) || 'Player';
  } catch {
    return 'Player';
  }
}

function savePlayerName(name) {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    /* storage blocked */
  }
}

export function createLobby(onEnterWorldCallback) {
  onEnterWorld = onEnterWorldCallback;

  overlay = document.createElement('div');
  overlay.id = 'multiplayer-lobby';
  overlay.innerHTML = `
    <div class="lobby-panel">
      <button type="button" class="lobby-x" id="lobby-x" aria-label="Close">✕</button>

      <h1 class="lobby-title">MULTIPLAYER</h1>
      <p class="lobby-sub">Play with family — any internet, anywhere.</p>

      <label class="lobby-label" for="player-name">Your name</label>
      <input type="text" class="lobby-name-input" id="player-name" placeholder="Type your name" maxlength="24" autocomplete="nickname" />

      <div class="lobby-people-box">
        <p class="lobby-label">People in the lobby</p>
        <ul class="lobby-people-list" id="lobby-people-list"></ul>
      </div>

      <button type="button" class="lobby-btn lobby-btn-host" id="btn-generate">Generate Code</button>

      <div class="lobby-host-info" id="host-info" hidden>
        <p class="lobby-label">Your room code</p>
        <p class="lobby-code" id="room-code"></p>
        <p class="lobby-label">Share this link (opens the real game — any phone or Wi‑Fi)</p>
        <div class="lobby-link-row">
          <input type="text" class="lobby-link" id="share-link" readonly />
          <button type="button" class="lobby-copy" id="btn-copy">Copy</button>
        </div>
      </div>

      <div class="lobby-divider">or join a friend</div>

      <div class="lobby-join-row">
        <input type="text" class="lobby-code-input" id="join-code" placeholder="Enter code" maxlength="8" autocomplete="off" />
        <button type="button" class="lobby-btn lobby-btn-join" id="btn-join">Join Code</button>
      </div>

      <button type="button" class="lobby-btn lobby-btn-go" id="btn-enter" hidden>Enter World</button>

      <p class="lobby-status" id="lobby-status"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  const statusEl = overlay.querySelector('#lobby-status');
  const hostInfo = overlay.querySelector('#host-info');
  const codeEl = overlay.querySelector('#room-code');
  const linkEl = overlay.querySelector('#share-link');
  const nameEl = overlay.querySelector('#player-name');
  const peopleList = overlay.querySelector('#lobby-people-list');
  const enterBtn = overlay.querySelector('#btn-enter');

  try {
    const saved = localStorage.getItem(NAME_KEY);
    if (saved) nameEl.value = saved;
  } catch {
    /* ignore */
  }

  function setStatus(t) {
    if (statusEl) statusEl.textContent = t;
  }

  function renderPeopleList(people) {
    if (!peopleList) return;
    peopleList.innerHTML = '';
    if (!people.length) {
      const li = document.createElement('li');
      li.className = 'lobby-person empty';
      li.textContent = 'Nobody here yet';
      peopleList.appendChild(li);
      return;
    }
    for (const p of people) {
      const li = document.createElement('li');
      li.className = 'lobby-person';
      li.textContent = p.you ? `${p.name} (you)` : p.name;
      peopleList.appendChild(li);
    }
  }

  function localPeople() {
    return [{ id: 'local', name: getPlayerName(), you: true }];
  }

  function hostRosterPeople() {
    if (!room?.id) return localPeople();
    const people = [{ id: room.id, name: getPlayerName(), you: true }];
    for (const [id, name] of roster) {
      people.push({ id, name, you: false });
    }
    return people;
  }

  function refreshPeople() {
    if (room?.role === 'host') {
      renderPeopleList(hostRosterPeople());
    } else if (room?.role === 'client') {
      /* roster comes from host broadcast */
    } else {
      renderPeopleList(localPeople());
    }
  }

  function broadcastRoster() {
    if (room?.role !== 'host') return;
    const people = hostRosterPeople();
    renderPeopleList(people);
    room.send({ t: 'roster', people });
  }

  function wireRoom(r) {
    room = r;
    roster.clear();

    room.onMessage = (msg, fromId) => {
      if (room.role === 'host') {
        if (msg.t === 'hello' && fromId) {
          roster.set(fromId, msg.name || 'Player');
          broadcastRoster();
          setStatus(`${msg.name || 'Someone'} joined the lobby`);
        }
        if (msg.t === 'setName' && fromId) {
          roster.set(fromId, msg.name || 'Player');
          broadcastRoster();
        }
        if (msg.t === 'leave') {
          const leftId = fromId || msg.id;
          if (leftId) {
            roster.delete(leftId);
            broadcastRoster();
            setStatus('Someone left the lobby');
          }
        }
      }
      if (msg.t === 'roster' && Array.isArray(msg.people)) {
        renderPeopleList(msg.people);
      }
    };

    room.onPeerCount = () => refreshPeople();
  }

  function announceName() {
    const name = getPlayerName();
    savePlayerName(name);
    if (!room) {
      refreshPeople();
      return;
    }
    if (room.role === 'host') {
      broadcastRoster();
    } else if (room.role === 'client') {
      room.send({ t: 'setName', name });
    }
  }

  function showEnterButton() {
    enterBtn.hidden = false;
  }

  nameEl.addEventListener('input', () => {
    announceName();
  });

  overlay.querySelector('#btn-generate').addEventListener('click', async () => {
    try {
      if (room) room.close();
      roster.clear();
      const r = createMultiplayerRoom();
      r.onStatus = setStatus;
      wireRoom(r);
      const code = generateRoomCode();
      const info = await r.host(code);
      codeEl.textContent = info.code;
      linkEl.value = info.link;
      hostInfo.hidden = false;
      try {
        sessionStorage.setItem(HOST_KEY, info.code);
      } catch {
        /* ignore */
      }
      history.replaceState(null, '', `?room=${encodeURIComponent(info.code)}`);
      announceName();
      showEnterButton();
      setStatus('Share the link — friends appear in the lobby when they join.');
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

  overlay.querySelector('#btn-join').addEventListener('click', () => tryJoin());

  overlay.querySelector('#join-code').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryJoin();
  });

  async function tryJoin({ fromLink = false } = {}) {
    const code = overlay.querySelector('#join-code').value.trim();
    if (!code) {
      setStatus('Type a room code first.');
      return;
    }
    try {
      if (room) room.close();
      roster.clear();
      const r = createMultiplayerRoom();
      r.onStatus = setStatus;
      wireRoom(r);
      await r.join(code);
      r.send({ t: 'hello', name: getPlayerName() });
      showEnterButton();
      setStatus("You're in the game!");
      if (fromLink) {
        setTimeout(() => enterWorld(), 500);
      }
    } catch {
      /* status set in multiplayer */
    }
  }

  function enterWorld() {
    if (!room) return;
    savePlayerName(getPlayerName());
    hideLobby();
    onEnterWorld?.({ room, isHost: room.role === 'host', playerName: getPlayerName() });
  }

  enterBtn.addEventListener('click', enterWorld);

  function closeLobby() {
    if (room) room.close();
    room = null;
    roster.clear();
    enterBtn.hidden = true;
    hostInfo.hidden = true;
    try {
      sessionStorage.removeItem(HOST_KEY);
    } catch {
      /* ignore */
    }
    hideLobby();
    refreshPeople();
  }

  overlay.querySelector('#lobby-x').addEventListener('click', closeLobby);

  const urlCode = new URLSearchParams(window.location.search).get('room');
  if (urlCode) {
    overlay.querySelector('#join-code').value = urlCode;
  }
  hideLobby();
  refreshPeople();

  return overlay;
}

export function hideLobby() {
  if (overlay) overlay.classList.remove('open');
}

export function showLobby() {
  if (overlay) {
    overlay.classList.add('open');
    const nameEl = overlay.querySelector('#player-name');
    if (nameEl) {
      try {
        const saved = localStorage.getItem(NAME_KEY);
        if (saved && !nameEl.value) nameEl.value = saved;
      } catch {
        /* ignore */
      }
    }
    const peopleList = overlay.querySelector('#lobby-people-list');
    if (peopleList && !room) {
      const list = [{ id: 'local', name: getPlayerName(), you: true }];
      peopleList.innerHTML = '';
      const li = document.createElement('li');
      li.className = 'lobby-person';
      li.textContent = `${getPlayerName()} (you)`;
      peopleList.appendChild(li);
    }
  }
}

export function isLobbyVisible() {
  return overlay?.classList.contains('open') ?? false;
}

export { buildShareLink };
