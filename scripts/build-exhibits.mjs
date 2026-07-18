import { execFile } from 'node:child_process';
import { access, cp, mkdir, rm } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = join(root, 'public', 'exhibits');
const pnpmCli = process.env.npm_execpath;

if (!pnpmCli || !isAbsolute(pnpmCli)) {
  throw new Error('Run this build through `pnpm exhibits:build`.');
}

const exhibits = [
  {
    packageName: 'anime-liquid-orb-exhibit',
    source: join(root, 'ref', 'mizu-kokoro-2-source', 'dist'),
    target: join(publicRoot, 'anime-liquid-orb'),
    supplements: [
      join(root, 'ref', 'mizu-kokoro-2-source', 'THIRD_PARTY_NOTICES.md'),
    ],
  },
  {
    packageName: 'archive-of-the-ninth-tide-shoreless-layer',
    source: join(
      root,
      'ref',
      'archive_of_the_ninth_tide_shoreless_web',
      'dist',
    ),
    target: join(publicRoot, 'ninth-tide-archive'),
    supplements: [],
  },
];

for (const exhibit of exhibits) {
  const { stderr, stdout } = await run(
    process.execPath,
    [pnpmCli, '--filter', exhibit.packageName, 'run', 'build'],
    { cwd: root },
  );
  process.stdout.write(stdout);
  process.stderr.write(stderr);
}

for (const exhibit of exhibits) {
  await access(exhibit.source);
  await Promise.all(exhibit.supplements.map((file) => access(file)));
}

await mkdir(publicRoot, { recursive: true });

for (const exhibit of exhibits) {
  const targetRelative = relative(publicRoot, exhibit.target);
  if (
    targetRelative === '' ||
    targetRelative.startsWith('..') ||
    isAbsolute(targetRelative)
  ) {
    throw new Error(`Refusing to replace invalid exhibit target: ${exhibit.target}`);
  }

  await rm(exhibit.target, { force: true, recursive: true });
  await cp(exhibit.source, exhibit.target, { recursive: true });

  for (const supplement of exhibit.supplements) {
    await cp(supplement, join(exhibit.target, supplement.split(/[\\/]/).at(-1)));
  }
}

console.log('Published ref builds to public/exhibits.');
