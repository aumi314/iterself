/**
 * Kill leftover IterSelf.exe processes that this workspace launched for
 * verification, so the build can clean dist/win-unpacked.
 */
const { execFileSync } = require('node:child_process');

try {
  const out = execFileSync('taskkill', ['/IM', 'IterSelf.exe', '/F'], { encoding: 'utf8' });
  console.log(out.trim());
} catch (error) {
  const message = `${error.stdout || ''}${error.stderr || ''}`.trim() || error.message;
  console.log(`No IterSelf.exe killed: ${message}`);
}
