/**
 * Generate IterSelf app icons (north-star design) by rasterizing the SVG
 * source of truth with Electron's offscreen renderer, so the shipped icon
 * matches the approved design exactly. Runs under plain `node`: it
 * relaunches itself through the local Electron binary.
 * Produces build/icon.png (512px) and build/icon.ico (16..256 multi-size).
 */
const fs = require('node:fs');
const path = require('node:path');

const OUT_DIR = path.join(__dirname, '..', 'build');

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="512" height="512">
  <rect width="256" height="256" rx="58" fill="#1F3D33"/>
  <path d="M128 36 C137 90 145 98 198 106 C145 114 137 122 128 176 C119 122 111 114 58 106 C111 98 119 90 128 36 Z" fill="#F2C879"/>
  <circle cx="192" cy="56" r="9" fill="#F7F0DC"/>
  <path d="M48 208 Q128 170 208 208" stroke="#8FD0BC" stroke-width="16" stroke-linecap="round" fill="none"/>
</svg>`;

if (!process.versions.electron) {
  const { spawnSync } = require('node:child_process');
  const result = spawnSync(require('electron'), [__filename], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

const { app, BrowserWindow } = require('electron');

// ---------- ICO writer (PNG-embedded entries) ----------
function encodeIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i += 1) {
    const entry = Buffer.alloc(16);
    const size = sizes[i] >= 256 ? 0 : sizes[i];
    entry[0] = size; // width
    entry[1] = size; // height
    entry[2] = 0; // palette
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(pngBuffers[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += pngBuffers[i].length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  app.disableHardwareAcceleration();
  await app.whenReady();
  const win = new BrowserWindow({
    show: false,
    frame: false,
    transparent: true,
    width: 512,
    height: 512,
    useContentSize: true,
    webPreferences: { offscreen: true },
  });
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}svg{display:block}</style></head><body>${ICON_SVG}</body></html>`;
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  let image = await win.webContents.capturePage({ x: 0, y: 0, width: 512, height: 512 });
  // Offscreen capture can come back scaled on high-DPI setups; normalize.
  if (image.getSize().width !== 512) image = image.resize({ width: 512, height: 512, quality: 'best' });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), image.toPNG());
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const pngs = sizes.map((size) => image.resize({ width: size, height: size, quality: 'best' }).toPNG());
  fs.writeFileSync(path.join(OUT_DIR, 'icon.ico'), encodeIco(pngs, sizes));
  console.log('Icons written to', OUT_DIR);
  app.exit(0);
}

main().catch((error) => {
  console.error(error);
  app.exit(1);
});
