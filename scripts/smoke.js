const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const required = [
  'package.json',
  'src/main/main.js',
  'src/main/preload.js',
  'src/main/store.js',
  'src/main/exporter.js',
  'src/renderer/index.html',
  'src/renderer/styles.css',
  'src/renderer/app.js',
  'src/renderer/markdown-editor.js',
  'src/renderer/markdown-editor.bundle.js',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.join('\n'));
  process.exit(1);
}

console.log('Smoke check passed. Required files exist.');
