import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire('/Users/danielmolloy/code/vespera-systems/vespera.systems/package.json');
const { chromium } = require('playwright');

const SCRATCH = '/private/tmp/claude-501/-Users-danielmolloy-code-vespera-systems/195f7928-e362-489c-aa1f-3db6f73d0b6d/scratchpad';
const FPS = 30, DUR = 56;
const FRAMES = FPS * DUR;
mkdirSync(`${SCRATCH}/frames`, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(`file://${SCRATCH}/video.html`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

const t0 = Date.now();
for (let i = 0; i < FRAMES; i++) {
  const t = i / FPS;
  await page.evaluate((tt) => window.SEEK(tt), t);
  await page.screenshot({ path: `${SCRATCH}/frames/f${String(i).padStart(5, '0')}.png` });
  if (i % 150 === 0) console.log(`frame ${i}/${FRAMES} (${((Date.now()-t0)/1000).toFixed(0)}s elapsed)`);
}
console.log(`done: ${FRAMES} frames in ${((Date.now()-t0)/1000).toFixed(0)}s`);
await browser.close();
