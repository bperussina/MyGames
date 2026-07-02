let audioContext = null;

export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function playTone({ type = 'square', freqStart, freqEnd, duration, volume = 0.2, delay = 0 }) {
  const ctx = initAudio();
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, now);
  if (freqEnd) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), now + duration);
  }
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function playNoise(duration, volume = 0.15) {
  const ctx = initAudio();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

/** Loud annoying sound-maker — layered rattle + squeak + horn */
export function playSoundMaker(intensity = 1) {
  const vol = 0.22 + intensity * 0.18;
  playTone({ type: 'sawtooth', freqStart: 180 + Math.random() * 120, freqEnd: 90, duration: 0.12, volume: vol });
  playTone({ type: 'square', freqStart: 600 + Math.random() * 400, freqEnd: 300, duration: 0.1, volume: vol * 0.8, delay: 0.02 });
  playNoise(0.08, vol * 0.5);
  if (intensity > 0.5) {
    playTone({ type: 'triangle', freqStart: 900, freqEnd: 200, duration: 0.18, volume: vol * 0.7, delay: 0.04 });
  }
}

export function playAnnoyingSound(intensity = 1) {
  playSoundMaker(intensity);
}

/** Bonk when sound maker hits / annoys a big kid */
export function playHitKid() {
  playTone({ type: 'square', freqStart: 220, freqEnd: 80, duration: 0.14, volume: 0.35 });
  playTone({ type: 'triangle', freqStart: 140, freqEnd: 60, duration: 0.1, volume: 0.25, delay: 0.02 });
  playNoise(0.06, 0.2);
}

/** Ouch when a toy or kid hits the baby */
export function playPlayerHit() {
  playTone({ type: 'sawtooth', freqStart: 160, freqEnd: 50, duration: 0.2, volume: 0.4 });
  playTone({ type: 'sine', freqStart: 90, freqEnd: 40, duration: 0.25, volume: 0.35, delay: 0.03 });
  playNoise(0.1, 0.25);
}

export function playQuack() {
  const ctx = initAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}
