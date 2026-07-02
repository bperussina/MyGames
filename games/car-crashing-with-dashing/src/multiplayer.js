import Peer from 'peerjs';

const PEER_PREFIX = 'ccwd-';
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Real public game URL (GitHub Pages — the actual game, not a code page). */
export const PUBLIC_PLAY_URL =
  'https://bperussina.github.io/MyGames/car-crashing-with-dashing/index.html';

/** Entry page that jumps straight into the game. */
export const PUBLIC_PLAY_ENTRY_URL =
  'https://bperussina.github.io/MyGames/car-crashing-with-dashing/play.html';

const PEER_CLOUD = {
  host: '0.peerjs.com',
  port: 443,
  path: '/',
  secure: true,
  debug: 0,
};

/** STUN + PeerJS TURN so different Wi‑Fi / phone data still connect. */
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
    {
      urls: ['turn:eu-0.turn.peerjs.com:3478', 'turn:us-0.turn.peerjs.com:3478'],
      username: 'peerjs',
      credential: 'peerjsp',
    },
  ],
};

const JOIN_ATTEMPTS = 12;
const JOIN_RETRY_MS = 2000;
const CONNECT_TIMEOUT_MS = 15000;

export function generateRoomCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return code;
}

/** Share link always uses the public game URL so friends are not sent to localhost. */
export function buildShareLink(code) {
  const url = new URL(PUBLIC_PLAY_URL);
  url.searchParams.set('room', code.toUpperCase());
  return url.toString();
}

function peerIdForCode(code) {
  return `${PEER_PREFIX}${code.toUpperCase()}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function peerOptions(id = undefined) {
  return {
    ...PEER_CLOUD,
    ...(id ? { id } : {}),
    config: ICE_SERVERS,
  };
}

export function createMultiplayerRoom() {
  let peer = null;
  let role = null;
  let roomCode = null;
  let myId = null;
  let connections = new Map();
  let onMessage = null;
  let onStatus = null;
  let onPeerCount = null;

  function setStatus(text) {
    onStatus?.(text);
  }

  function destroyPeer() {
    for (const [, conn] of connections) {
      try {
        conn.close();
      } catch {
        /* ignore */
      }
    }
    connections.clear();
    if (peer) {
      try {
        peer.destroy();
      } catch {
        /* ignore */
      }
      peer = null;
    }
  }

  function broadcast(msg, exceptConn = null) {
    const raw = JSON.stringify(msg);
    for (const [, conn] of connections) {
      if (conn !== exceptConn && conn.open) conn.send(raw);
    }
  }

  function attachConnection(conn) {
    connections.set(conn.peer, conn);
    onPeerCount?.(connections.size + (role === 'host' ? 1 : 0));

    conn.on('data', (data) => {
      try {
        const msg = typeof data === 'string' ? JSON.parse(data) : data;
        onMessage?.(msg, conn.peer);
      } catch {
        /* ignore bad packets */
      }
    });

    conn.on('close', () => {
      connections.delete(conn.peer);
      onPeerCount?.(connections.size + (role === 'host' ? 1 : 0));
      onMessage?.({ t: 'leave', id: conn.peer });
    });
  }

  function waitForPeerOpen(p) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(Object.assign(new Error('timeout'), { type: 'network' }));
      }, CONNECT_TIMEOUT_MS);

      p.once('open', (id) => {
        clearTimeout(timer);
        resolve(id);
      });

      p.once('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function host(code) {
    roomCode = code.toUpperCase();
    role = 'host';
    myId = peerIdForCode(roomCode);
    setStatus('Opening your room (works on any internet)…');

    return new Promise((resolve, reject) => {
      destroyPeer();
      peer = new Peer(myId, peerOptions(myId));

      peer.on('connection', (conn) => {
        conn.on('open', () => {
          attachConnection(conn);
          conn.send(JSON.stringify({ t: 'welcome', host: myId, code: roomCode }));
          onMessage?.({ t: 'join', id: conn.peer });
        });
      });

      waitForPeerOpen(peer)
        .then(() => {
          setStatus(`Room ${roomCode} ready — share your link!`);
          resolve({ code: roomCode, link: buildShareLink(roomCode), role: 'host', id: myId });
        })
        .catch((err) => {
          setStatus(friendlyError(err, 'host'));
          destroyPeer();
          reject(err);
        });
    });
  }

  function joinOnce(code) {
    roomCode = code.toUpperCase();
    role = 'client';
    const hostId = peerIdForCode(roomCode);

    return new Promise((resolve, reject) => {
      destroyPeer();
      peer = new Peer(peerOptions());

      waitForPeerOpen(peer)
        .then((id) => {
          myId = id;
          const conn = peer.connect(hostId, { reliable: true });

          const timer = setTimeout(() => {
            reject(Object.assign(new Error('connect failed'), { type: 'peer-unavailable' }));
          }, CONNECT_TIMEOUT_MS);

          conn.on('open', () => {
            clearTimeout(timer);
            attachConnection(conn);
            setStatus("You're in the game!");
            resolve({ code: roomCode, role: 'client', id: myId });
          });

          conn.on('error', () => {
            clearTimeout(timer);
            reject(Object.assign(new Error('connect failed'), { type: 'peer-unavailable' }));
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function isRetryableJoinError(err) {
    const type = err?.type ?? '';
    return type === 'peer-unavailable' || type === 'network' || type === 'disconnected';
  }

  async function join(code) {
    roomCode = code.toUpperCase();
    role = 'client';
    setStatus(`Joining ${roomCode}…`);

    let lastError = null;
    for (let attempt = 1; attempt <= JOIN_ATTEMPTS; attempt++) {
      try {
        if (attempt > 1) {
          setStatus(`Still connecting… (${attempt}/${JOIN_ATTEMPTS}) — ask host to keep the game open`);
        }
        return await joinOnce(code);
      } catch (err) {
        lastError = err;
        destroyPeer();
        if (attempt < JOIN_ATTEMPTS && isRetryableJoinError(err)) {
          await sleep(JOIN_RETRY_MS);
          continue;
        }
        setStatus(friendlyError(err, 'join'));
        throw err;
      }
    }
    setStatus(friendlyError(lastError, 'join'));
    throw lastError;
  }

  function friendlyError(err, mode) {
    const type = err?.type ?? '';
    if (type === 'peer-unavailable') {
      return mode === 'join'
        ? 'Room not open yet — ask host to tap Generate Code and keep the game open.'
        : 'That room code is taken — tap Generate Code again.';
    }
    if (type === 'unavailable-id') {
      return 'That room code is taken — tap Generate Code again.';
    }
    if (type === 'network' || type === 'disconnected') {
      return 'Internet hiccup — check Wi‑Fi or data and try again.';
    }
    if (type === 'browser-incompatible') {
      return 'Try Chrome, Safari, or Edge for multiplayer.';
    }
    return mode === 'join'
      ? 'Could not connect — make sure the host shared the link and left the game open.'
      : `Could not open room (${type || 'error'}) — try again.`;
  }

  function send(msg) {
    if (role === 'host') {
      broadcast(msg);
    } else {
      const conn = connections.values().next().value;
      if (conn?.open) conn.send(JSON.stringify(msg));
    }
  }

  function sendToHost(msg) {
    if (role === 'host') {
      onMessage?.(msg, myId);
    } else {
      const conn = connections.values().next().value;
      if (conn?.open) conn.send(JSON.stringify(msg));
    }
  }

  function relay(fromId, msg) {
    if (role !== 'host') return;
    broadcast(msg, connections.get(fromId));
  }

  function close() {
    destroyPeer();
    role = null;
    roomCode = null;
    myId = null;
  }

  return {
    host,
    join,
    send,
    sendToHost,
    relay,
    close,
    get role() {
      return role;
    },
    get code() {
      return roomCode;
    },
    get id() {
      return myId;
    },
    set onMessage(cb) {
      onMessage = cb;
    },
    set onStatus(cb) {
      onStatus = cb;
    },
    set onPeerCount(cb) {
      onPeerCount = cb;
    },
  };
}
