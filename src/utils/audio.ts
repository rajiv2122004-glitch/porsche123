/**
 * Procedural Porsche Powertrain Sound Synthesizer via Web Audio API.
 * Synthesizes Flat-6 naturally aspirated 9,000 RPM boxer growl,
 * Twin-turbo V8 deep rumble, and Taycan 800V high-frequency inverter whine.
 * Zero external audio file dependencies.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playEngineRev(type: 'boxer-na' | 'boxer-turbo' | 'v8-turbo' | 'taycan-electric' = 'boxer-na'): () => void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.connect(ctx.destination);

    if (type === 'taycan-electric') {
      // High-tech electric hypercar pitch rise with dual inverter oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      // Base idle tone transitioning to high-rpm turbine surge
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(780, now + 1.2);
      osc1.frequency.exponentialRampToValueAtTime(320, now + 2.5);

      osc2.frequency.setValueAtTime(280, now);
      osc2.frequency.exponentialRampToValueAtTime(1560, now + 1.2);
      osc2.frequency.exponentialRampToValueAtTime(640, now + 2.5);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 1.2);
      filter.Q.value = 4.0;

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.18, now + 0.3);
      masterGain.gain.exponentialRampToValueAtTime(0.24, now + 1.2);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.6);
      osc2.stop(now + 2.6);

      return () => {
        try {
          masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        } catch {
          // ignore
        }
      };
    }

    // Boxer or V8 combustion engine synthesis
    const baseFreq = type === 'boxer-na' ? 120 : type === 'v8-turbo' ? 85 : 105;
    const peakFreq = type === 'boxer-na' ? 380 : type === 'v8-turbo' ? 240 : 310;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    subOsc.type = 'sine';

    // Rev throttle profile: Idle -> Rapid Rise -> Peak screaming redline -> Overrun burble
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(peakFreq, now + 0.8);
    osc1.frequency.exponentialRampToValueAtTime(peakFreq * 1.1, now + 1.2);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 2.4);

    osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(peakFreq * 1.5, now + 0.8);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 2.4);

    subOsc.frequency.setValueAtTime(baseFreq * 0.5, now);
    subOsc.frequency.exponentialRampToValueAtTime(peakFreq * 0.5, now + 0.8);
    subOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 2.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(2600, now + 1.1);
    filter.frequency.exponentialRampToValueAtTime(500, now + 2.4);
    filter.Q.value = 3.0;

    // Distortion wave shaper for raw exhaust rasp
    const waveShaper = ctx.createWaveShaper();
    const n_samples = 256;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    const k = type === 'boxer-na' ? 45 : 30;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    waveShaper.curve = curve;

    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.22, now + 0.2);
    masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(filter);
    filter.connect(waveShaper);
    waveShaper.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);
    osc1.stop(now + 2.5);
    osc2.stop(now + 2.5);
    subOsc.stop(now + 2.5);

    return () => {
      try {
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      } catch {
        // ignore
      }
    };
  } catch {
    return () => {};
  }
}
