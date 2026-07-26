/**
 * Generate IterSelf app icons without external dependencies.
 * Produces build/icon.png (256px) and build/icon.ico (16..256 multi-size).
 * Pure Node: draws RGBA pixel buffers, encodes PNG (zlib) and ICO (PNG-embedded).
 */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const OUT_DIR = path.join(__dirname, '..', 'build');

// ---------- tiny PNG encoder ----------
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i += 1) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // raw scanlines with filter byte 0
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- drawing helpers ----------
function makeCanvas(size) {
  return { size, data: Buffer.alloc(size * size * 4) };
}

function setPx(canvas, x, y, [r, g, b, a]) {
  if (x < 0 || y < 0 || x >= canvas.size || y >= canvas.size) return;
  const i = (y * canvas.size + x) * 4;
  canvas.data[i] = r;
  canvas.data[i + 1] = g;
  canvas.data[i + 2] = b;
  canvas.data[i + 3] = a;
}

function fillRoundedRect(canvas, x0, y0, x1, y1, radius, color) {
  for (let y = Math.floor(y0); y <= Math.ceil(y1); y += 1) {
    for (let x = Math.floor(x0); x <= Math.ceil(x1); x += 1) {
      const inX = x >= x0 + radius && x <= x1 - radius;
      const inY = y >= y0 + radius && y <= y1 - radius;
      let inside = false;
      if (inX || inY) inside = x >= x0 && x <= x1 && y >= y0 && y <= y1;
      else {
        const cx = x < x0 + radius ? x0 + radius : x1 - radius;
        const cy = y < y0 + radius ? y0 + radius : y1 - radius;
        inside = (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2;
      }
      if (inside) setPx(canvas, x, y, color);
    }
  }
}

function fillCircle(canvas, cx, cy, r, color) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += 1) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += 1) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2) setPx(canvas, x, y, color);
    }
  }
}

function strokeCircle(canvas, cx, cy, r, width, color) {
  const rOut = r + width / 2;
  const rIn = r - width / 2;
  for (let y = Math.floor(cy - rOut); y <= Math.ceil(cy + rOut); y += 1) {
    for (let x = Math.floor(cx - rOut); x <= Math.ceil(cx + rOut); x += 1) {
      const d2 = (x - cx) ** 2 + (y - cy) ** 2;
      if (d2 <= rOut ** 2 && d2 >= rIn ** 2) setPx(canvas, x, y, color);
    }
  }
}

function drawIcon(size) {
  const canvas = makeCanvas(size);
  const m = size / 16;
  const bg = [31, 61, 53, 255];
  const cream = [254, 247, 226, 255];

  fillRoundedRect(canvas, m, m, size - m, size - m, size / 5, bg);

  // ascending bars
  const barW = size / 8;
  const baseY = size - size / 4;
  const heights = [size / 5, size / 3, size / 2];
  const startX = size / 5;
  const gap = size / 12;
  heights.forEach((h, i) => {
    const x0 = startX + i * (barW + gap);
    fillRoundedRect(canvas, x0, baseY - h, x0 + barW, baseY, Math.max(2, barW / 3), cream);
  });

  // loop dot top-right
  const r = size / 11;
  const cx = size - size / 4;
  const cy = size / 4 + r / 2;
  strokeCircle(canvas, cx, cy, r, Math.max(2, size / 26), cream);
  fillCircle(canvas, cx + r * 0.15, cy - r, r / 3.2, cream);

  return canvas;
}

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

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const pngs = sizes.map((size) => {
    const canvas = drawIcon(size);
    return encodePng(size, size, canvas.data);
  });

  const canvas512 = drawIcon(512);
  fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), encodePng(512, 512, canvas512.data));
  fs.writeFileSync(path.join(OUT_DIR, 'icon.ico'), encodeIco(pngs, sizes));
  console.log('Icons written to', OUT_DIR);
}

main();
