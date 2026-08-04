/**
 * Verify the packaged app.asar contains the files the app needs at runtime.
 * Uses the local asar dependency (ships with electron-builder).
 * Usage: node scripts/verify-package.js [distDir]  (default: dist)
 */
const path = require('node:path');
const fs = require('node:fs');

const projectRoot = path.join(__dirname, '..');
const asar = require(path.join(projectRoot, 'node_modules', '@electron', 'asar'));

function findArchive(distDir) {
  const locations = [
    path.join('win-unpacked', 'resources', 'app.asar'),
    path.join('mac', 'IterSelf.app', 'Contents', 'Resources', 'app.asar'),
    path.join('mac-x64', 'IterSelf.app', 'Contents', 'Resources', 'app.asar'),
    path.join('mac-arm64', 'IterSelf.app', 'Contents', 'Resources', 'app.asar'),
    path.join('mac-universal', 'IterSelf.app', 'Contents', 'Resources', 'app.asar'),
  ];
  return locations
    .map((location) => path.join(distDir, location))
    .find((archive) => fs.existsSync(archive));
}

// Pick the newest dist* directory containing a packaged app when no arg is given.
function resolveDistDir() {
  const arg = process.argv[2];
  if (arg) return path.join(projectRoot, arg);
  const candidates = fs
    .readdirSync(projectRoot)
    .filter((name) => name === 'dist' || name.startsWith('dist-'))
    .map((name) => path.join(projectRoot, name))
    .filter((dir) => findArchive(dir))
    .sort((a, b) => fs.statSync(findArchive(b)).mtimeMs - fs.statSync(findArchive(a)).mtimeMs);
  if (!candidates.length) {
    console.error('No packaged app.asar found under dist*. Run a platform build first.');
    process.exit(1);
  }
  return candidates[0];
}

const distDir = resolveDistDir();
const archive = findArchive(distDir);
if (!archive) {
  console.error(`No packaged app.asar found under ${distDir}.`);
  process.exit(1);
}
const files = asar.listPackage(archive, {});

const required = [
  path.join('src', 'main', 'main.js'),
  path.join('src', 'main', 'preload.js'),
  path.join('src', 'main', 'store.js'),
  path.join('src', 'main', 'exporter.js'),
  path.join('src', 'renderer', 'index.html'),
  path.join('src', 'renderer', 'styles.css'),
  path.join('src', 'renderer', 'app.js'),
  path.join('build', 'icon.png'),
  'package.json',
];

const normalized = new Set(files.map((file) => file.replace(/^[\\/]/, '')));
const missing = required.filter((file) => !normalized.has(file));

if (missing.length) {
  console.error('MISSING from app.asar:');
  for (const file of missing) console.error(' -', file);
  process.exit(1);
}

console.log(`Verified: ${archive}`);
console.log(`app.asar OK: ${files.length} entries, all ${required.length} required files present.`);
