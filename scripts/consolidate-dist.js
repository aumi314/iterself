/**
 * Consolidate the newest dist-* build into dist/ when dist/ is not locked.
 * Safe to re-run; prints what happened.
 */
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.join(__dirname, '..');

function newestAltDist() {
  return fs
    .readdirSync(projectRoot)
    .filter((name) => name.startsWith('dist-'))
    .map((name) => path.join(projectRoot, name))
    .filter((dir) => fs.existsSync(path.join(dir, 'win-unpacked', 'resources', 'app.asar')))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
}

const alt = newestAltDist();
if (!alt) {
  console.log('No dist-* build to consolidate.');
  process.exit(0);
}

const dist = path.join(projectRoot, 'dist');
if (fs.existsSync(dist)) {
  try {
    fs.rmSync(dist, { recursive: true, force: true });
  } catch (error) {
    console.error(`dist/ still locked (${error.code}). Close IterSelf.exe, then re-run: node scripts/consolidate-dist.js`);
    process.exit(1);
  }
}

fs.renameSync(alt, dist);
console.log(`Moved ${path.basename(alt)} -> dist/`);
