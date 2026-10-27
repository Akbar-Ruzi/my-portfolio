// Hero gourd sounds (components/hero/HeroGourd.jsx), made with Web Audio, so there are no audio files.
// Browsers only allow audio after a user gesture, so call these from a click handler

let ctx;

// one shared AudioContext, created on the first click; null if the browser has no Web Audio
const audio = () => {
	if (!ctx) {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		if (!AudioContext) return null;
		ctx = new AudioContext();
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
};

// volume envelope: quick rise to peak, then fade out
const envelope = (gain, t, peak, attack, decay) => {
	gain.gain.setValueAtTime(0.0001, t);
	gain.gain.exponentialRampToValueAtTime(peak, t + attack);
	gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
};

// a tone that glides from f0 to f1 Hz
const tone = (c, out, { type, f0, f1, t, peak, attack, decay, glide }) => {
	const osc = c.createOscillator();
	const gain = c.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(f0, t);
	osc.frequency.exponentialRampToValueAtTime(f1, t + glide);
	envelope(gain, t, peak, attack, decay);
	osc.connect(gain).connect(out);
	osc.start(t);
	osc.stop(t + attack + decay + 0.05);
};

// a short burst of white noise, shaped by a filter
const noise = (c, out, { t, duration, filter: filterType, frequency, peak, attack, decay }) => {
	const buffer = c.createBuffer(1, Math.floor(c.sampleRate * duration), c.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	const source = c.createBufferSource();
	source.buffer = buffer;
	const filter = c.createBiquadFilter();
	const gain = c.createGain();
	filter.type = filterType;
	filter.frequency.value = frequency;
	envelope(gain, t, peak, attack, decay);
	source.connect(filter).connect(gain).connect(out);
	source.start(t);
	return filter;
};

// cork pop: a falling "pop" tone plus a puff of noise
const cork = (c, out, t) => {
	tone(c, out, { type: "sine", f0: 620, f1: 150, t, peak: 0.7, attack: 0.003, decay: 0.12, glide: 0.09 });
	const filter = noise(c, out, { t, duration: 0.08, filter: "bandpass", frequency: 1800, peak: 0.5, attack: 0.001, decay: 0.05 });
	filter.frequency.setValueAtTime(1800, t);
	filter.frequency.exponentialRampToValueAtTime(600, t + 0.06);
	filter.Q.value = 1.2;
};

// wood knock: a dull thud, a little noise, then a light second tap
const wood = (c, out, t) => {
	tone(c, out, { type: "triangle", f0: 320, f1: 190, t, peak: 0.6, attack: 0.002, decay: 0.09, glide: 0.05 });
	noise(c, out, { t, duration: 0.05, filter: "lowpass", frequency: 900, peak: 0.35, attack: 0.001, decay: 0.03 });
	tone(c, out, { type: "triangle", f0: 480, f1: 470, t: t + 0.11, peak: 0.25, attack: 0.002, decay: 0.06, glide: 0.05 });
};

// plays one sound `delay` seconds from now; no sound is fine, it never breaks the animation
const play = (sound, delay, volume = 0.55) => {
	try {
		const c = audio();
		if (!c) return;
		const out = c.createGain();
		out.gain.value = volume;
		out.connect(c.destination);
		sound(c, out, c.currentTime + delay);
	} catch {
		// ignore
	}
};

// cork pop as the lid comes off (about 0.67s after "Open me" is clicked)
export const playOpen = () => play(cork, 0.67);

// wood knock as the lid lands back on (about 3.77s after "Back into the gourd" is clicked)
export const playClose = () => play(wood, 3.77);

// softer cork pop right away when a tech chip is clicked
export const playPick = () => play(cork, 0.02, 0.35);
