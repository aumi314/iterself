/**
 * Build wrapper: forces the electron-builder cache onto the same drive as the
 * project to avoid EXDEV cross-device rename failures, then runs the Windows build.
 */
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const projectRoot = path.join(__dirname, '..');
const cacheDir = path.join(projectRoot, '.builder-cache');
fs.mkdirSync(cacheDir, { recursive: true });

// A previously launched packaged app can hold locks on dist/win-unpacked.
// Prefer cleaning it; if locked, fall back to a fresh output directory so the
// build still succeeds without needing to kill any process.
let outputDir = 'dist';
const unpackedDir = path.join(projectRoot, 'dist', 'win-unpacked');
if (fs.existsSync(unpackedDir)) {
  try {
    fs.rmSync(unpackedDir, { recursive: true, force: true });
  } catch (error) {
    outputDir = `dist-${Date.now().toString(36)}`;
    console.warn(`dist/win-unpacked is locked (${error.code}). Building into ${outputDir}/ instead.`);
    console.warn('Close running IterSelf.exe to reuse dist/ next time.');
  }
}

const builderCli = path.join(projectRoot, 'node_modules', 'electron-builder', 'out', 'cli', 'cli.js');

const result = spawnSync(process.execPath, [builderCli, '--win', '--x64', `--config.directories.output=${outputDir}`], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    ELECTRON_BUILDER_CACHE: cacheDir,
    // keep temp on the same drive as the cache so renames are not cross-device
    TMP: path.join(cacheDir, 'tmp'),
    TEMP: path.join(cacheDir, 'tmp'),
  },
});

process.exit(result.status ?? 1);
