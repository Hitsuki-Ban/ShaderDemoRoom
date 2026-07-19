import type { WebGLRenderer } from 'three';

export interface RendererProfile {
  readonly transmissionResolutionScale: number;
}

const rendererProfileKeys = ['transmissionResolutionScale'] as const;

export function validateRendererProfile(
  profile: unknown,
): asserts profile is RendererProfile {
  if (typeof profile !== 'object' || profile === null || Array.isArray(profile)) {
    throw new Error('Renderer profile must be an object.');
  }

  const keys = Reflect.ownKeys(profile);
  if (
    keys.length !== rendererProfileKeys.length ||
    keys[0] !== rendererProfileKeys[0]
  ) {
    throw new Error(
      'Renderer profile must contain exactly transmissionResolutionScale.',
    );
  }

  const transmissionResolutionScale = (
    profile as Record<string, unknown>
  ).transmissionResolutionScale;
  if (
    typeof transmissionResolutionScale !== 'number' ||
    !Number.isFinite(transmissionResolutionScale) ||
    transmissionResolutionScale <= 0 ||
    transmissionResolutionScale > 1
  ) {
    throw new Error(
      'Renderer profile transmissionResolutionScale must be finite and greater than 0 and at most 1.',
    );
  }
}

export function applyRendererProfile(
  renderer: WebGLRenderer,
  profile: RendererProfile,
): void {
  renderer.transmissionResolutionScale = profile.transmissionResolutionScale;
}
