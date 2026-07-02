import Peer from 'peerjs';

const PEER_PREFIX = 'ccwd-';
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateRoomCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return code;
}

export function buildShareLink(code) {
  const url = new URL(window.location.href);
  url.searchParams.set('room', code);
  url.searchParams.delete('teleport');
  return url.toString();
}

function peerIdForCode(code) {
  return `${PEER_PREFIX}${code.toUpperCase()}`;
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

  function host(code) {
    roomCode = code.toUpperCase();
    role = 'host';
    myId = peerIdForCode(roomCode);
    setStatus('Opening your server…');

    return new Promise((resolve, reject) => {
      peer = new Peer(myId, {
        debug: 0,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });

      peer.on('open', () => {
        setStatus(`Room ${roomCode} ready — share your link!`);
        resolve({ code: roomCode, link: buildShareLink(roomCode), role: 'host', id: myId });
      });

      peer.on('connection', (conn) => {
        conn.on('open', () => {
          attachConnection(conn);
          conn.send(JSON.stringify({ t: 'welcome', host: myId, code: roomCode }));
          onMessage?.({ t: 'join', id: conn.peer });
        });
      });

      peer.on('error', (err) => {
        setStatus(`Error: ${err.type}`);
        reject(err);
      });
    });
  }

  function join(code) {
    roomCode = code.toUpperCase();
    role = 'client';
    const hostId = peerIdForCode(roomCode);
    setStatus(`Joining ${roomCode}…`);

    return new Promise((resolve, reject) => {
      peer = new Peer({
        debug: 0,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });

      peer.on('open', () => {
        myId = peer.id;
        const conn = peer.connect(hostId, { reliable: true });
        conn.on('open', () => {
          attachConnection(conn);
          setStatus(`Joined room ${roomCode}!`);
          resolve({ code: roomCode, role: 'client', id: myId });
        });
        conn.on('error', () => {
          setStatus('Could not reach that room. Check the code.');
          reject(new Error('connect failed'));
        });
      });

      peer.on('error', (err) => {
        if (err.type === 'peer-unavailable') {
          setStatus('Room not found — ask host to Generate Code first.');
        } else {
          setStatus(`Error: ${err.type}`);
        }
        reject(err);
      });
    });
  }

  function send(msg) {
    const raw = JSON.stringify(msg);
    if (role === 'host') {
      broadcast(msg);
    } else {
      const conn = connections.values().next().value;
      if (conn?.open) conn.send(raw);
    }
  }

  function relay(fromId, msg) {
    if (role !== 'host') return;
    broadcast(msg, connections.get(fromId));
  }

  function close() {
    for (const [, conn] of connections) conn.close();
    connections.clear();
    peer?.destroy();
    peer = null;
    role = null;
    roomCode = null;
  }

  return {
    host,
    join,
    send,
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
