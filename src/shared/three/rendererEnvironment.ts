import type { WebGLRenderer } from 'three';

export type RendererEnvironmentClassification =
  | 'software'
  | 'hardware'
  | 'unknown';

export interface RendererIdentity {
  maskedVendor: string;
  maskedRenderer: string;
  unmaskedVendor: string | null;
  unmaskedRenderer: string | null;
}

export interface RendererEnvironment extends RendererIdentity {
  classification: RendererEnvironmentClassification;
  classificationReason: string;
}

interface RendererClassification {
  classification: RendererEnvironmentClassification;
  classificationReason: string;
}

const SOFTWARE_RENDERER_MARKERS = [
  'swiftshader',
  'lavapipe',
  'llvmpipe',
  'softpipe',
  'openswr',
  'warp',
  'software rasterizer',
  'microsoft basic render driver',
] as const;

const HARDWARE_RENDERER_MARKERS = [
  'nvidia',
  'geforce',
  'quadro',
  'amd',
  'radeon',
  'intel',
  'apple gpu',
  'adreno',
  'mali',
  'powervr',
  'imagination',
  'vivante',
  'tegra',
] as const;

const environmentCache = new WeakMap<WebGLRenderer, RendererEnvironment>();

export function classifyRendererEnvironment(
  identity: RendererIdentity,
): RendererClassification {
  const rawIdentity = [
    identity.maskedVendor,
    identity.maskedRenderer,
    identity.unmaskedVendor,
    identity.unmaskedRenderer,
  ]
    .filter((value): value is string => value !== null)
    .join(' ')
    .toLocaleLowerCase('en-US');
  const softwareMarker = SOFTWARE_RENDERER_MARKERS.find((marker) =>
    rawIdentity.includes(marker),
  );

  if (softwareMarker) {
    return {
      classification: 'software',
      classificationReason: `software renderer marker matched: ${softwareMarker}`,
    };
  }

  const hardwareMarker = HARDWARE_RENDERER_MARKERS.find((marker) =>
    rawIdentity.includes(marker),
  );
  if (identity.unmaskedRenderer?.trim() && hardwareMarker) {
    return {
      classification: 'hardware',
      classificationReason: `hardware renderer marker matched: ${hardwareMarker}`,
    };
  }

  return {
    classification: 'unknown',
    classificationReason: identity.unmaskedRenderer?.trim()
      ? 'unmasked renderer has no recognized hardware or software marker'
      : 'unmasked renderer unavailable',
  };
}

function readRequiredRendererString(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  parameter: number,
  label: string,
): string {
  const value: unknown = context.getParameter(parameter);
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`WebGL did not provide a valid ${label} string.`);
  }
  return value;
}

export function detectRendererEnvironment(
  renderer: WebGLRenderer,
): RendererEnvironment {
  const context = renderer.getContext();
  const debugInfo = context.getExtension('WEBGL_debug_renderer_info');
  const identity: RendererIdentity = {
    maskedVendor: readRequiredRendererString(context, context.VENDOR, 'masked vendor'),
    maskedRenderer: readRequiredRendererString(
      context,
      context.RENDERER,
      'masked renderer',
    ),
    unmaskedVendor: debugInfo
      ? readRequiredRendererString(
          context,
          debugInfo.UNMASKED_VENDOR_WEBGL,
          'unmasked vendor',
        )
      : null,
    unmaskedRenderer: debugInfo
      ? readRequiredRendererString(
          context,
          debugInfo.UNMASKED_RENDERER_WEBGL,
          'unmasked renderer',
        )
      : null,
  };

  return { ...identity, ...classifyRendererEnvironment(identity) };
}

export function getRendererEnvironment(
  renderer: WebGLRenderer,
): RendererEnvironment {
  const cached = environmentCache.get(renderer);
  if (cached) {
    return cached;
  }

  const environment = detectRendererEnvironment(renderer);
  environmentCache.set(renderer, environment);
  return environment;
}
