"""Synthesized backing track for the vespera explainer — 56s, dark minimal tech.

Pure stdlib (no numpy). 44.1kHz stereo 16-bit WAV.
Structure mirrors the video: sparse intro -> pulse under hero -> beat enters with
terminal scene (10.6s) -> full groove through results (21.2s) -> lift at audience
(38.2s) -> outro pad + fade under CTA (45.6 -> 56s).
"""
import math, wave, struct, array

SR = 44100
DUR = 56.0
N = int(SR * DUR)
L = array.array('f', [0.0]) * 0
L = array.array('f', bytes(4 * N))
R = array.array('f', bytes(4 * N))

BPM = 112.0
BEAT = 60.0 / BPM          # 0.5357s
BAR = 4 * BEAT

def add(buf, start, samples, gain=1.0):
    i0 = int(start * SR)
    for j, v in enumerate(samples):
        i = i0 + j
        if 0 <= i < N:
            buf[i] += v * gain

def env_ar(n, a, r):
    """attack/release envelope over n samples (a, r in samples)."""
    out = array.array('f', bytes(4 * n))
    for i in range(n):
        if i < a:
            out[i] = i / a
        else:
            out[i] = math.exp(-(i - a) / r)
    return out

# ---------- voices ----------

def kick(t0, gain=1.0):
    n = int(0.16 * SR)
    s = array.array('f', bytes(4 * n))
    ph = 0.0
    for i in range(n):
        f = 38 + 92 * math.exp(-i / (0.012 * SR))   # 130 -> 38 Hz drop
        ph += 2 * math.pi * f / SR
        e = math.exp(-i / (0.05 * SR))
        s[i] = math.sin(ph) * e
    add(L, t0, s, 0.60 * gain); add(R, t0, s, 0.60 * gain)

RNG = 1234567
def rnd():
    global RNG
    RNG = (RNG * 1103515245 + 12345) & 0x7fffffff
    return RNG / 0x7fffffff * 2 - 1

def hat(t0, gain=1.0, open_=False):
    n = int((0.09 if open_ else 0.035) * SR)
    s = array.array('f', bytes(4 * n))
    hp = 0.0
    prev = 0.0
    for i in range(n):
        w = rnd()
        hp = w - prev + 0.94 * hp   # crude high-pass
        prev = w
        s[i] = hp * math.exp(-i / ((0.03 if open_ else 0.008) * SR))
    add(L, t0, s, 0.10 * gain * 0.9); add(R, t0, s, 0.10 * gain * 1.1)

def sub(t0, freq, dur, gain=1.0):
    n = int(dur * SR)
    s = array.array('f', bytes(4 * n))
    a = int(0.008 * SR); rel = int(0.10 * SR)
    for i in range(n):
        e = (i / a) if i < a else (1.0 if i < n - rel else (n - i) / rel)
        s[i] = math.sin(2 * math.pi * freq * i / SR) * e
    add(L, t0, s, 0.30 * gain); add(R, t0, s, 0.30 * gain)

def pluck(t0, freq, gain=1.0, pan=0.0):
    n = int(0.30 * SR)
    s = array.array('f', bytes(4 * n))
    for i in range(n):
        e = math.exp(-i / (0.055 * SR))
        x = 2 * math.pi * freq * i / SR
        s[i] = (math.sin(x) + 0.35 * math.sin(2 * x)) * e
    gl = gain * (1 - max(0, pan)); gr = gain * (1 + min(0, pan))
    add(L, t0, s, 0.16 * gl); add(R, t0, s, 0.16 * gr)

def pad_chord(t0, freqs, dur, gain=1.0):
    n = int(dur * SR)
    s_l = array.array('f', bytes(4 * n))
    s_r = array.array('f', bytes(4 * n))
    a = int(1.6 * SR); rel = int(2.2 * SR)
    for k, f in enumerate(freqs):
        det = 1.0 + (0.0015 if k % 2 else -0.0015)
        w = 2 * math.pi * f * det / SR
        w2 = 2 * math.pi * f * (2 - det) / SR   # slight chorus partner
        lfo_ph = k * 1.3
        for i in range(n):
            if i < a: e = i / a
            elif i > n - rel: e = (n - i) / rel
            else: e = 1.0
            tri = math.asin(math.sin(w * i)) * (2 / math.pi)   # triangle-ish, soft
            v = (0.7 * tri + 0.3 * math.sin(w2 * i)) * e
            lfo = 0.5 + 0.5 * math.sin(2 * math.pi * 0.22 * i / SR + lfo_ph)
            if k % 2:
                s_l[i] += v * (0.45 + 0.25 * lfo); s_r[i] += v * (0.70 - 0.25 * lfo)
            else:
                s_l[i] += v * (0.70 - 0.25 * lfo); s_r[i] += v * (0.45 + 0.25 * lfo)
    g = 0.065 * gain / max(1, len(freqs)) * 3
    add(L, t0, s_l, g); add(R, t0, s_r, g)

def riser(t0, dur, gain=1.0):
    n = int(dur * SR)
    s = array.array('f', bytes(4 * n))
    hp = 0.0; prev = 0.0
    for i in range(n):
        w = rnd()
        hp = w - prev + 0.9 * hp; prev = w
        e = (i / n) ** 2.2
        s[i] = hp * e
    add(L, t0, s, 0.05 * gain); add(R, t0, s, 0.05 * gain)

# ---------- arrangement ----------
# A minor: A=110. Progression per 2 bars: Am9 / Fmaj7 / Cmaj7 / G6
A2, C3, E3, G3, B3 = 110.0, 130.81, 164.81, 196.0, 246.94
F2, A3, C4, E4 = 87.31, 220.0, 261.63, 329.63
C2, G2, D3, D4 = 65.41, 98.0, 146.83, 293.66

CHORDS = [
    ("Am9",  [A2, E3, B3, C4],  A2 / 2),
    ("Fmaj7",[F2, C3, E3, A3],  F2 / 2),
    ("Cmaj7",[C2, G2, E3, B3],  C2),
    ("G6",   [G2, D3, B3, E4],  G2 / 2),
]

CHORD_SPAN = 2 * BAR   # 2 bars each ≈ 4.29s
t = 0.0
ci = 0
while t < DUR + CHORD_SPAN:
    name, freqs, root = CHORDS[ci % 4]
    pad_gain = 0.8 if t < 10 else (1.0 if t < 45.6 else 0.9)
    pad_chord(t - 0.3, freqs, CHORD_SPAN + 1.2, pad_gain)
    ci += 1
    t += CHORD_SPAN

# sub bass: eighth-note pulse following chord roots, from 4.5s
t = 4.5
while t < 54.0:
    ci_ = int(t / CHORD_SPAN) % 4
    root = CHORDS[ci_][2]
    # eighth pulses, skip just after each kick beat for pseudo-sidechain
    frac = (t % BEAT) / BEAT
    dur = BEAT * 0.42
    gain = 0.75 if t < 10.6 else 1.0
    if t > 45.6: gain = 0.6
    sub(t, root, dur, gain * (0.72 if frac < 0.1 else 1.0))
    t += BEAT / 2

# kick: four on the floor from 10.6 to 45.6, ducks at section starts
t = 10.6
while t < 45.6:
    g = 1.0
    if t < 12.0: g = 0.8
    kick(t, g)
    t += BEAT

# hats: offbeats from 21.2 (results montage), 16ths sprinkle from 32.8
t = 21.2 + BEAT / 2
while t < 45.0:
    hat(t, 1.0)
    t += BEAT
t = 32.8 + BEAT / 4
while t < 38.2:
    hat(t, 0.45)
    t += BEAT / 2

# open hat accents at phrase turns
for tt in [21.2, 27.2, 32.8, 38.2]:
    hat(tt, 0.9, open_=True)

# arp plucks: Am pentatonic pattern, from 21.2, denser from 33
PENT = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]
pat = [0, 3, 2, 5, 1, 4, 2, 3]
t = 21.2
k = 0
while t < 44.5:
    step = BEAT / 2 if t < 32.8 else BEAT / 4
    if (k % 2 == 0) or t >= 32.8:
        f = PENT[pat[k % 8]]
        pluck(t, f, gain=0.9 if t < 38.2 else 1.05, pan=(0.5 if k % 3 == 0 else -0.4))
    k += 1
    t += step

# risers into section changes
riser(8.6, 2.0, 0.8)     # into terminal
riser(19.2, 2.0, 1.0)    # into results
riser(43.6, 2.0, 0.7)    # into CTA

# final low root swell under CTA
sub(46.0, A2 / 2, 6.0, 0.5)

# ---------- master: soft clip, global fades, normalize ----------
fade_in = int(0.8 * SR)
fade_out_start = int(52.5 * SR)
peak = 0.0
for i in range(N):
    g = 1.0
    if i < fade_in: g = i / fade_in
    if i > fade_out_start: g = max(0.0, 1.0 - (i - fade_out_start) / (N - fade_out_start))
    l = math.tanh(L[i] * 1.4) * g
    r = math.tanh(R[i] * 1.4) * g
    L[i] = l; R[i] = r
    peak = max(peak, abs(l), abs(r))

norm = 0.89 / peak if peak > 0 else 1.0
out = array.array('h', bytes(2 * 2 * N))
for i in range(N):
    out[2 * i] = int(max(-1, min(1, L[i] * norm)) * 32767)
    out[2 * i + 1] = int(max(-1, min(1, R[i] * norm)) * 32767)

with wave.open('/private/tmp/claude-501/-Users-danielmolloy-code-vespera-systems/195f7928-e362-489c-aa1f-3db6f73d0b6d/scratchpad/music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(out.tobytes())
print("wrote music.wav, peak", peak)
