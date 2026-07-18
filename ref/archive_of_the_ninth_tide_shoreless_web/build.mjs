import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });

await build({
  absWorkingDir: root,
  bundle: true,
  entryPoints: ['src/main.js'],
  format: 'iife',
  minify: true,
  outfile: 'dist/app.js',
  platform: 'browser',
  target: 'es2020',
});

await Promise.all(
  ['index.html', 'archive.mp3', 'LICENSE_THREE.txt'].map((file) =>
    copyFile(join(root, file), join(dist, file)),
  ),
);
