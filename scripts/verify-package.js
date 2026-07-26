/**
 * Verify the packaged app.asar contains the files the app needs at runtime.
 * Uses the local asar dependency (ships with electron-builder).
 * Usage: node scripts/verify-package.js [distDir]  (default: dist)
 */
const path = require('node:path');
const fs = require('node:fs');

const projectRoot = path.join(__dirname, '..');
const asar = require(path.join(projectRoot, 'node_modules', '@electron', 'asar'));

// Pick the newest dist* directory containing win-unpacked when no arg given.
function resolveDistDir() {
  const arg = process.argv[2];
  if (arg) return path.join(projectRoot, arg);
  const candidates = fs
    .readdirSync(projectRoot)
    .filter((name) => name === 'dist' || name.startsWith('dist-'))
    .map((name) => path.join(projectRoot, name))
    .filter((dir) => fs.existsSync(path.join(dir, 'win-unpacked', 'resources', 'app.asar')))
    .sort((a, b) => fs.statSync(path.join(b, 'win-unpacked', 'resources', 'app.asar')).mtimeMs
      - fs.statSync(path.join(a, 'win-unpacked', 'resources', 'app.asar')).mtimeMs);
  if (!candidates.length) {
    console.error('No dist*/win-unpacked/resources/app.asar found. Run npm run build first.');
    process.exit(1);
  }
  return candidates[0];
}

const distDir = resolveDistDir();
const archive = path.join(distDir, 'win-unpacked', 'resources', 'app.asar');
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
