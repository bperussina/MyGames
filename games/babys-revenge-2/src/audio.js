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

export function playAnnoyingSound(intensity = 1) {
  const ctx = initAudio();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = Math.random() > 0.5 ? 'sawtooth' : 'square';
  osc.frequency.setValueAtTime(200 + Math.random() * 800 * intensity, now);
  osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 400, now + 0.15);

  filter.type = 'bandpass';
  filter.frequency.value = 800 + Math.random() * 2000;

  gain.gain.setValueAtTime(0.15 * intensity, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

export function playQuack() {
  const ctx = initAudio();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}
