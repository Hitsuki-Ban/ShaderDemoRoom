import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(
  readFileSync(resolve('package.json'), 'utf8'),
);
const directDependencies = {
  ...manifest.dependencies,
  ...manifest.devDependencies,
};
const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

describe('dependency policy', () => {
  it('exact-pins every direct registry dependency', () => {
    for (const [name, version] of Object.entries(directDependencies)) {
      expect(version, `${name} must use an exact version`).toMatch(exactVersionPattern);
    }
  });

  it('keeps Three.js runtime and types on the same revision', () => {
    const threeRevision = manifest.dependencies.three.split('.').slice(0, 2).join('.');
    const typesRevision = manifest.devDependencies['@types/three'].split('.').slice(0, 2).join('.');

    expect(typesRevision).toBe(threeRevision);
  });
});
