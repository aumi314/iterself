const esbuild = require('esbuild');
const path = require('node:path');

const root = path.join(__dirname, '..');

esbuild.buildSync({
  entryPoints: [path.join(root, 'src', 'renderer', 'markdown-editor.js')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  outfile: path.join(root, 'src', 'renderer', 'markdown-editor.bundle.js'),
  sourcemap: false,
  logLevel: 'info',
});
