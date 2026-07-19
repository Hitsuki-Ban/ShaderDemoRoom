import { describe, expect, it } from 'vitest';
import type { WebGLRenderer } from 'three';
import {
  applyRendererProfile,
  validateRendererProfile,
} from './rendererProfile';

describe('renderer profile', () => {
  it('accepts the exact governed renderer field and applies it', () => {
    const profile: unknown = { transmissionResolutionScale: 0.5 };
    const renderer = { transmissionResolutionScale: 1 } as WebGLRenderer;

    validateRendererProfile(profile);
    applyRendererProfile(renderer, profile);

    expect(renderer.transmissionResolutionScale).toBe(0.5);
  });

  it.each([
    undefined,
    null,
    [],
    {},
    { transmissionResolutionScale: 0.5, toneMappingExposure: 2 },
  ])('rejects missing, malformed, or additional fields: %j', (profile) => {
    expect(() => validateRendererProfile(profile)).toThrow();
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -0.1, 0, 1.01, '0.5'])(
    'rejects an invalid transmission resolution scale: %j',
    (transmissionResolutionScale) => {
      expect(() =>
        validateRendererProfile({ transmissionResolutionScale }),
      ).toThrow();
    },
  );

  it.each([Number.MIN_VALUE, 0.5, 1])(
    'accepts a finite scale in the governed range: %d',
    (transmissionResolutionScale) => {
      expect(() =>
        validateRendererProfile({ transmissionResolutionScale }),
      ).not.toThrow();
    },
  );
});
