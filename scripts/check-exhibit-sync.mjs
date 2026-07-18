import { execFile } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { stdout } = await run(
  'git',
  [
    'status',
    '--porcelain=v1',
    '--untracked-files=all',
    '--',
    'public/exhibits',
  ],
  { cwd: root },
);

if (stdout.trim()) {
  throw new Error(
    `public/exhibits is not synchronized with ref builds:\n${stdout.trim()}`,
  );
}

console.log('public/exhibits matches the committed ref builds.');
