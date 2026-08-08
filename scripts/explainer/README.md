# Homepage explainer video — source

Source pipeline for `public/videos/vespera-explainer.mp4` (56s, 1920×1080, 30fps,
synthesized backing track). Everything is deterministic — same inputs, same video.

## Files

- `video.html` — the whole animation as one seekable timeline. `window.SEEK(t)`
  renders the frame at second `t`; scene timings live in the `SEEK` function.
  Expects `geist.woff2` and `geist-mono.woff2` next to it — copy the two
  `*-s.p*.woff2` files from `.next/static/media/` (hashes change per build; the
  Geist file is the one referenced by `font-family:Geist` in `.next/static/css/*.css`).
- `capture.mjs` — steps SEEK frame by frame through Playwright Chromium and writes
  `frames/f%05d.png`. Edit the `SCRATCH` working-dir constant, then `node capture.mjs`.
- `music.py` — renders `music.wav` with the Python stdlib (no deps): 112 BPM,
  A minor; pad/sub/kick/hats/arp entrances match the scene timings. `python3 music.py`.

## Rebuild

```bash
node capture.mjs && python3 music.py
ffmpeg -framerate 30 -i frames/f%05d.png -i music.wav \
  -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart -shortest vespera-explainer.mp4
ffmpeg -ss 8.2 -i vespera-explainer.mp4 -frames:v 1 -q:v 3 vespera-explainer-poster.jpg
```

Copy both outputs to `public/videos/`.
