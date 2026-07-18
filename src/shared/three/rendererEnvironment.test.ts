import { describe, expect, it, vi } from 'vitest';
import type { WebGLRenderer } from 'three';
import {
  classifyRendererEnvironment,
  getRendererEnvironment,
} from './rendererEnvironment';

describe('classifyRendererEnvironment', () => {
  it.each([
    'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)))',
    'Mesa lavapipe (LLVM 20.1.0)',
    'Mesa llvmpipe (LLVM 18.1.8, 256 bits)',
    'softpipe',
    'OpenSWR',
    'Microsoft WARP Renderer',
    'Software Rasterizer',
    'Microsoft Basic Render Driver',
  ])('classifies an explicit software marker: %s', (unmaskedRenderer) => {
    expect(
      classifyRendererEnvironment({
        maskedVendor: 'WebKit',
        maskedRenderer: 'WebKit WebGL',
        unmaskedVendor: 'Vendor',
        unmaskedRenderer,
      }),
    ).toEqual(
      expect.objectContaining({
        classification: 'software',
      }),
    );
  });

  it('classifies a non-software unmasked renderer as hardware', () => {
    expect(
      classifyRendererEnvironment({
        maskedVendor: 'WebKit',
        maskedRenderer: 'WebKit WebGL',
        unmaskedVendor: 'NVIDIA Corporation',
        unmaskedRenderer: 'NVIDIA GeForce RTX 4070',
      }),
    ).toEqual({
      classification: 'hardware',
      classificationReason: 'hardware renderer marker matched: nvidia',
    });
  });

  it('does not infer hardware from an unrecognized unmasked renderer', () => {
    expect(
      classifyRendererEnvironment({
        maskedVendor: 'WebKit',
        maskedRenderer: 'WebKit WebGL',
        unmaskedVendor: 'Example Vendor',
        unmaskedRenderer: 'Virtual GPU 123',
      }),
    ).toEqual({
      classification: 'unknown',
      classificationReason:
        'unmasked renderer has no recognized hardware or software marker',
    });
  });

  it('does not infer hardware from masked strings alone', () => {
    expect(
      classifyRendererEnvironment({
        maskedVendor: 'WebKit',
        maskedRenderer: 'WebKit WebGL',
        unmaskedVendor: null,
        unmaskedRenderer: null,
      }),
    ).toEqual({
      classification: 'unknown',
      classificationReason: 'unmasked renderer unavailable',
    });
  });

  it('reads masked and unmasked identity once per renderer', () => {
    const context = {
      VENDOR: 1,
      RENDERER: 2,
      getExtension: vi.fn(() => ({
        UNMASKED_VENDOR_WEBGL: 3,
        UNMASKED_RENDERER_WEBGL: 4,
      })),
      getParameter: vi.fn((parameter: number) =>
        new Map([
          [1, 'WebKit'],
          [2, 'WebKit WebGL'],
          [3, 'NVIDIA Corporation'],
          [4, 'NVIDIA GeForce RTX 4070'],
        ]).get(parameter),
      ),
    };
    const renderer = {
      getContext: vi.fn(() => context),
    } as unknown as WebGLRenderer;

    const first = getRendererEnvironment(renderer);
    const second = getRendererEnvironment(renderer);

    expect(first).toEqual({
      maskedVendor: 'WebKit',
      maskedRenderer: 'WebKit WebGL',
      unmaskedVendor: 'NVIDIA Corporation',
      unmaskedRenderer: 'NVIDIA GeForce RTX 4070',
      classification: 'hardware',
      classificationReason: 'hardware renderer marker matched: nvidia',
    });
    expect(second).toBe(first);
    expect(renderer.getContext).toHaveBeenCalledOnce();
  });
});
