import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const manifestPaths = [
  'package.json',
  'ref/mizu-kokoro-2-source/package.json',
  'ref/archive_of_the_ninth_tide_shoreless_web/package.json',
];
const manifests = manifestPaths.map((path) => ({
  path,
  value: JSON.parse(readFileSync(resolve(path), 'utf8')),
}));
const manifest = manifests[0].value;
const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

describe('dependency policy', () => {
  it('exact-pins every direct registry dependency', () => {
    for (const { path, value } of manifests) {
      const directDependencies = {
        ...value.dependencies,
        ...value.devDependencies,
      };

      for (const [name, version] of Object.entries(directDependencies)) {
        expect(version, `${path}: ${name} must use an exact version`).toMatch(
          exactVersionPattern,
        );
      }
    }
  });

  it('keeps Three.js runtime and types on the same revision', () => {
    const threeRevision = manifest.dependencies.three.split('.').slice(0, 2).join('.');
    const typesRevision = manifest.devDependencies['@types/three'].split('.').slice(0, 2).join('.');

    expect(typesRevision).toBe(threeRevision);
  });
});
